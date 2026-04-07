#!/usr/bin/env node
// Phase 5: beauty.hotpepper.jp scraper - パーソナルトレーニング/ジム
// Genre: kgkw125 (スポーツジム・フィットネスクラブ)
import { load } from 'cheerio';
import { CONFIG, HP_PREFECTURES } from './config.mjs';
import { fetchWithRetry, sleep, appendToFile, log, loadCheckpoint, saveCheckpoint, stripTags } from './utils.mjs';

const OUTPUT = `${CONFIG.outputDir}/hotpepper_studios.jsonl`;
const GENRES = ['kgkw125']; // Sports gym/fitness - includes personal training

async function scrapeListPage(genre, prefCode, page = 1) {
  const url = page === 1
    ? `https://beauty.hotpepper.jp/genre/${genre}/${prefCode}/`
    : `https://beauty.hotpepper.jp/genre/${genre}/${prefCode}/PN${page}/`;

  log(`  ${url}`);
  const html = await fetchWithRetry(url);
  if (!html) return { salonUrls: [], hasNext: false, total: 0 };

  const $ = load(html);
  const salonUrls = [];

  // Find salon detail links - pattern: /kr/slnH{id}/
  $('a[href*="/kr/sln"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && /\/kr\/sln[A-Z]\d+/.test(href)) {
      const fullUrl = href.startsWith('http') ? href : `https://beauty.hotpepper.jp${href}`;
      const cleanUrl = fullUrl.split('?')[0].replace(/\/$/, '') + '/';
      if (!salonUrls.includes(cleanUrl)) salonUrls.push(cleanUrl);
    }
  });

  // Check for next page
  const hasNext = $(`a[href*="PN${page + 1}"]`).length > 0 ||
    $('a:contains("次の")').length > 0;

  // Try to get total count
  const totalMatch = $('body').text().match(/(\d+)件/);
  const total = totalMatch ? parseInt(totalMatch[1]) : 0;

  return { salonUrls, hasNext, total };
}

async function scrapeDetailPage(url) {
  const html = await fetchWithRetry(url);
  if (!html) return null;

  const $ = load(html);
  const gym = {
    source: 'hotpepper',
    source_url: url,
    source_id: url.match(/\/kr\/(sln[A-Z]\d+)/)?.[1] || '',
  };

  // Name
  gym.name = $('h1').first().text().trim();
  if (!gym.name) gym.name = $('title').text().split('|')[0].split('｜')[0].trim();
  if (!gym.name) return null;

  // Structured data (JSON-LD)
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html());
      const items = Array.isArray(json) ? json : [json];
      for (const item of items) {
        if (item['@type'] === 'LocalBusiness' || item['@type'] === 'HealthClub' || item['@type'] === 'SportsActivityLocation') {
          if (item.address) {
            gym.address = typeof item.address === 'string' ? item.address :
              `${item.address.addressRegion || ''} ${item.address.addressLocality || ''} ${item.address.streetAddress || ''}`.trim();
            gym.prefecture = item.address.addressRegion;
            gym.postal_code = item.address.postalCode;
          }
          if (item.telephone) gym.phone = item.telephone;
          if (item.geo) {
            gym.lat = parseFloat(item.geo.latitude);
            gym.lng = parseFloat(item.geo.longitude);
          }
          if (item.aggregateRating) {
            gym.rating = parseFloat(item.aggregateRating.ratingValue);
            gym.review_count = parseInt(item.aggregateRating.reviewCount);
          }
          if (item.image) gym.image = typeof item.image === 'string' ? item.image : (item.image.url || item.image[0]);
        }
      }
    } catch {}
  });

  const fullText = $('body').text().replace(/\s+/g, ' ');

  // Address
  if (!gym.address) {
    // HotPepper specific: look in salon info table
    $('th:contains("住所"), td:contains("住所")').each((_, el) => {
      const next = $(el).next('td').text().trim() || $(el).parent().next().text().trim();
      if (next && next.length > 5) gym.address = next;
    });
  }
  if (!gym.address) {
    const addrMatch = fullText.match(/(〒\d{3}-?\d{4})\s*(.*?(?:都|道|府|県).*?(?:市|区|町|村)[^\n]{3,40})/);
    if (addrMatch) {
      gym.postal_code = gym.postal_code || addrMatch[1];
      gym.address = addrMatch[2].trim();
    }
  }

  // Prefecture
  if (!gym.prefecture) {
    const prefMatch = (gym.address || '').match(/(北海道|東京都|大阪府|京都府|.{2,3}県)/);
    if (prefMatch) gym.prefecture = prefMatch[1];
  }

  // Access
  $('th:contains("アクセス"), th:contains("道案内")').each((_, el) => {
    const next = $(el).next('td').text().trim();
    if (next) gym.access = next.substring(0, 200);
  });

  // Phone
  if (!gym.phone) {
    const phoneMatch = fullText.match(/(?:電話|TEL)[^\d]*(\d{2,4}-?\d{2,4}-?\d{3,4})/i);
    if (phoneMatch) gym.phone = phoneMatch[1];
  }

  // Hours
  $('th:contains("営業時間")').each((_, el) => {
    const next = $(el).next('td').text().trim();
    if (next) gym.hours = next.substring(0, 100);
  });
  if (!gym.hours) {
    const hoursMatch = fullText.match(/営業時間[^\d]*(\d{1,2}:\d{2}[\s～〜~-]+\d{1,2}:\d{2})/);
    if (hoursMatch) gym.hours = hoursMatch[1];
  }

  // Holidays
  $('th:contains("定休日")').each((_, el) => {
    const next = $(el).next('td').text().trim();
    if (next) gym.holidays = next.substring(0, 100);
  });

  // Pricing
  const prices = [];
  const priceRegex = /(\d[\d,]+)円/g;
  let m;
  while ((m = priceRegex.exec(fullText)) !== null) {
    const p = parseInt(m[1].replace(/,/g, ''));
    if (p >= 1000 && p <= 2000000) prices.push(p);
  }
  if (prices.length > 0) {
    gym.price_min = Math.min(...prices);
    gym.price_max = Math.max(...prices);
  }

  // Staff count
  const staffMatch = fullText.match(/総数\s*(\d+)\s*人/);
  if (staffMatch) gym.staff_count = parseInt(staffMatch[1]);

  // Seats/beds
  const bedMatch = fullText.match(/(\d+)\s*(?:席|ベッド|台|ルーム)/);
  if (bedMatch) gym.capacity = parseInt(bedMatch[1]);

  // Amenities
  gym.amenities = [];
  if (/シャワー/.test(fullText)) gym.amenities.push('shower');
  if (/個室|プライベート/.test(fullText)) gym.amenities.push('private_room');
  if (/ウェア.*?(レンタル|無料|貸出)|(レンタル|無料|貸出).*?ウェア/.test(fullText)) gym.amenities.push('rental_wear');
  if (/タオル/.test(fullText)) gym.amenities.push('rental_towel');
  if (/食事指導|食事管理|栄養指導/.test(fullText)) gym.amenities.push('meal_guidance');
  if (/女性専用/.test(fullText)) gym.amenities.push('women_only');
  if (/駐車場/.test(fullText)) gym.amenities.push('parking');
  if (/プロテイン/.test(fullText)) gym.amenities.push('protein');
  if (/メイクルーム/.test(fullText)) gym.amenities.push('makeup_room');
  if (/ロッカー/.test(fullText)) gym.amenities.push('locker');

  // Services tags
  gym.services = [];
  $('.tag, .genre-tag, .keyword-tag, [class*="tag"]').each((_, el) => {
    const tag = $(el).text().trim();
    if (tag && tag.length < 30) gym.services.push(tag);
  });

  // Coupons
  const couponMatch = fullText.match(/クーポン[^\d]*(\d+)\s*件/);
  if (couponMatch) gym.coupon_count = parseInt(couponMatch[1]);

  // Description
  gym.description = $('meta[name="description"]').attr('content') || '';

  return gym;
}

async function main() {
  log('=== HotPepper Beauty Scraper Start ===');
  const checkpoint = loadCheckpoint();
  const completedPrefs = checkpoint.hotpepper_completed || [];
  const completedDetails = new Set(checkpoint.hotpepper_details || []);
  let totalGyms = 0;
  const allSalonUrls = [];

  // Phase 1: Collect salon URLs from prefecture listing pages
  log('Phase 1: Collecting salon URLs...');

  for (const genre of GENRES) {
    const prefCodes = Object.keys(HP_PREFECTURES);

    for (const prefCode of prefCodes) {
      const key = `${genre}_${prefCode}`;
      if (completedPrefs.includes(key)) {
        log(`  [SKIP] ${HP_PREFECTURES[prefCode]} (already done)`);
        continue;
      }

      let page = 1;
      let prefUrls = [];
      let hasNext = true;

      while (hasNext) {
        try {
          const result = await scrapeListPage(genre, prefCode, page);
          prefUrls.push(...result.salonUrls);
          hasNext = result.hasNext && result.salonUrls.length > 0;
          if (page === 1 && result.total > 0) {
            log(`  ${HP_PREFECTURES[prefCode]}: ${result.total} total listings`);
          }
          page++;
          await sleep(2500); // Respect HotPepper rate limits
        } catch (err) {
          log(`  [ERROR] ${prefCode} page ${page}: ${err.message}`);
          hasNext = false;
        }

        if (page > 30) break;
      }

      const unique = [...new Set(prefUrls)];
      allSalonUrls.push(...unique);
      log(`  ${HP_PREFECTURES[prefCode]}: ${unique.length} URLs across ${page - 1} pages`);

      completedPrefs.push(key);
      checkpoint.hotpepper_completed = completedPrefs;
      saveCheckpoint(checkpoint);
    }
  }

  // Deduplicate
  const uniqueUrls = [...new Set(allSalonUrls)].filter(u => !completedDetails.has(u));
  log(`Total unique salon URLs: ${uniqueUrls.length}`);

  // Phase 2: Scrape detail pages
  log('Phase 2: Scraping detail pages...');
  for (const url of uniqueUrls) {
    try {
      const gym = await scrapeDetailPage(url);
      if (gym && gym.name) {
        appendToFile(OUTPUT, gym);
        totalGyms++;
        if (totalGyms % 50 === 0) log(`  Progress: ${totalGyms} gyms`);
      }
      completedDetails.add(url);
      checkpoint.hotpepper_details = [...completedDetails];
      if (totalGyms % 30 === 0) saveCheckpoint(checkpoint);
    } catch (err) {
      log(`  [ERROR] ${url}: ${err.message}`);
    }
    await sleep(2500); // Respect rate limits
  }

  saveCheckpoint(checkpoint);
  log(`=== HotPepper Complete: ${totalGyms} gyms ===`);
}

main().catch(console.error);
