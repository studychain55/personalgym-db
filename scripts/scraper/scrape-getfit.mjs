#!/usr/bin/env node
// Phase 2: getfit.jp scraper - area listings + detail pages
import { load } from 'cheerio';
import { CONFIG, GETFIT_AREAS } from './config.mjs';
import { fetchWithRetry, sleep, appendToFile, log, loadCheckpoint, saveCheckpoint, stripTags } from './utils.mjs';

const OUTPUT = `${CONFIG.outputDir}/getfit_studios.jsonl`;

async function scrapeAreaPage(areaSlug) {
  const url = `https://getfit.jp/gym/a-${areaSlug}`;
  log(`Fetching ${url}`);
  const html = await fetchWithRetry(url);
  if (!html) return [];

  const $ = load(html);
  const gymUrls = [];

  // Find gym detail links - pattern: /shop/{slug}
  $('a[href*="/shop/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && /\/shop\/[a-z0-9-]+/.test(href)) {
      const fullUrl = href.startsWith('http') ? href : `https://getfit.jp${href}`;
      // Remove query params for dedup
      const cleanUrl = fullUrl.split('?')[0];
      if (!gymUrls.includes(cleanUrl)) gymUrls.push(cleanUrl);
    }
  });

  return gymUrls;
}

async function scrapeDetailPage(url) {
  const html = await fetchWithRetry(url);
  if (!html) return null;

  const $ = load(html);
  const gym = {
    source: 'getfit',
    source_url: url,
    source_slug: url.match(/\/shop\/([^/?]+)/)?.[1] || '',
  };

  // Name
  gym.name = $('h1').first().text().trim();
  if (!gym.name) {
    gym.name = $('title').text().split('|')[0].split('-')[0].trim();
  }
  if (!gym.name) return null;

  // Structured data
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html());
      if (json['@type'] === 'LocalBusiness' || json['@type'] === 'HealthClub' || json['@type'] === 'SportsActivityLocation') {
        if (json.address) {
          gym.address = `${json.address.addressRegion || ''} ${json.address.addressLocality || ''} ${json.address.streetAddress || ''}`.trim();
          gym.prefecture = json.address.addressRegion;
        }
        if (json.telephone) gym.phone = json.telephone;
        if (json.geo) {
          gym.lat = json.geo.latitude;
          gym.lng = json.geo.longitude;
        }
        if (json.aggregateRating) {
          gym.rating = parseFloat(json.aggregateRating.ratingValue);
          gym.review_count = parseInt(json.aggregateRating.reviewCount);
        }
        if (json.openingHours) gym.hours = json.openingHours;
        if (json.image) gym.image = typeof json.image === 'string' ? json.image : json.image[0];
      }
    } catch {}
  });

  const fullText = $('body').text().replace(/\s+/g, ' ');

  // Address from page
  if (!gym.address) {
    const addrMatch = fullText.match(/住所[^\n]*?(〒?\d{3}-?\d{4})?[\s]*(東京都|大阪府|北海道|京都府|.{2,3}県)[^\n]{5,80}/);
    if (addrMatch) gym.address = addrMatch[0].replace(/住所[：:\s]*/, '').trim();
  }

  // Prefecture
  if (!gym.prefecture) {
    const prefMatch = (gym.address || fullText).match(/(北海道|東京都|大阪府|京都府|.{2,3}県)/);
    if (prefMatch) gym.prefecture = prefMatch[1];
  }

  // Access
  const accessMatch = fullText.match(/アクセス[：:\s]*([^\n。]{5,60})/);
  if (accessMatch) gym.access = accessMatch[1].trim();
  if (!gym.access) {
    const stationMatch = fullText.match(/([\u3000-\u9FFF]+駅[^\n。]{0,30}徒歩[^\n。]{0,15})/);
    if (stationMatch) gym.access = stationMatch[1].trim();
  }

  // Phone
  if (!gym.phone) {
    const phoneMatch = fullText.match(/(?:電話|TEL)[^\d]*(\d{2,4}-?\d{2,4}-?\d{3,4})/i);
    if (phoneMatch) gym.phone = phoneMatch[1];
  }

  // Hours
  if (!gym.hours) {
    const hoursMatch = fullText.match(/営業時間[^\d]*(\d{1,2}:\d{2}[\s～〜~-]+\d{1,2}:\d{2})/);
    if (hoursMatch) gym.hours = hoursMatch[1];
  }

  // Pricing - look for structured price tables
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

  // Entry fee
  const entryMatch = fullText.match(/入会金[^。\n]*?(\d[\d,]+)円/);
  if (entryMatch) gym.entry_fee = parseInt(entryMatch[1].replace(/,/g, ''));
  if (/入会金[^。]*?(無料|0円)/.test(fullText)) gym.entry_fee = 0;

  // Trial
  if (/無料[^。]*?(体験|カウンセリング)|体験[^。]*?無料|カウンセリング.*?無料/.test(fullText)) gym.trial_free = true;

  // Cashback (Getfit specific)
  const cashbackMatch = fullText.match(/キャッシュバック[^。]*?(\d[\d,]+)円/);
  if (cashbackMatch) gym.cashback = parseInt(cashbackMatch[1].replace(/,/g, ''));

  // Amenities
  gym.amenities = [];
  if (/シャワー/.test(fullText)) gym.amenities.push('shower');
  if (/個室|プライベート/.test(fullText)) gym.amenities.push('private_room');
  if (/ウェア.*?(レンタル|無料|貸出)|(レンタル|無料|貸出).*?ウェア/.test(fullText)) gym.amenities.push('rental_wear');
  if (/タオル.*?(レンタル|無料)/.test(fullText)) gym.amenities.push('rental_towel');
  if (/食事指導|食事管理|栄養指導|食事サポート/.test(fullText)) gym.amenities.push('meal_guidance');
  if (/女性専用/.test(fullText)) gym.amenities.push('women_only');
  if (/子連れ|託児/.test(fullText)) gym.amenities.push('childcare');
  if (/駐車場/.test(fullText)) gym.amenities.push('parking');
  if (/プロテイン/.test(fullText)) gym.amenities.push('protein');

  // Programs
  gym.programs = [];
  if (/ダイエット|減量|痩/.test(fullText)) gym.programs.push('diet');
  if (/ボディメイク|筋トレ|筋力/.test(fullText)) gym.programs.push('bodymake');
  if (/姿勢/.test(fullText)) gym.programs.push('posture');
  if (/ストレッチ/.test(fullText)) gym.programs.push('stretch');
  if (/産後/.test(fullText)) gym.programs.push('postnatal');
  if (/ブライダル/.test(fullText)) gym.programs.push('bridal');

  // Description
  gym.description = $('meta[name="description"]').attr('content') || '';

  return gym;
}

async function main() {
  log('=== Getfit Scraper Start ===');
  const checkpoint = loadCheckpoint();
  const completedAreas = checkpoint.getfit_completed || [];
  const completedDetails = new Set(checkpoint.getfit_details || []);
  let totalGyms = 0;
  const allGymUrls = [];

  // Phase 1: Collect gym URLs
  log('Phase 1: Collecting gym URLs from area pages...');
  for (const area of GETFIT_AREAS) {
    if (completedAreas.includes(area)) {
      log(`  [SKIP] ${area} (already done)`);
      continue;
    }

    try {
      const urls = await scrapeAreaPage(area);
      allGymUrls.push(...urls);
      log(`  ${area}: ${urls.length} gym URLs`);

      completedAreas.push(area);
      checkpoint.getfit_completed = completedAreas;
      saveCheckpoint(checkpoint);
    } catch (err) {
      log(`  [ERROR] ${area}: ${err.message}`);
    }

    await sleep(1500);
  }

  // Deduplicate
  const uniqueUrls = [...new Set(allGymUrls)].filter(u => !completedDetails.has(u));
  log(`Total unique gym URLs: ${uniqueUrls.length}`);

  // Phase 2: Scrape details
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
      checkpoint.getfit_details = [...completedDetails];
      if (totalGyms % 20 === 0) saveCheckpoint(checkpoint);
    } catch (err) {
      log(`  [ERROR] ${url}: ${err.message}`);
    }
    await sleep(CONFIG.requestDelay);
  }

  saveCheckpoint(checkpoint);
  log(`=== Getfit Complete: ${totalGyms} gyms ===`);
}

main().catch(console.error);
