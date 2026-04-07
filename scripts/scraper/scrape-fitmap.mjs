#!/usr/bin/env node
// Phase 1: fitmap.jp scraper - area listings + detail pages
import { load } from 'cheerio';
import { CONFIG, FITMAP_AREAS } from './config.mjs';
import { fetchWithRetry, sleep, appendToFile, log, loadCheckpoint, saveCheckpoint, stripTags } from './utils.mjs';

const OUTPUT = `${CONFIG.outputDir}/fitmap_studios.jsonl`;

async function scrapeListPage(areaId, page = 1) {
  const url = page === 1
    ? `https://fitmap.jp/area/${areaId}/?gymtag=personal`
    : `https://fitmap.jp/area/${areaId}/page/${page}/?gymtag=personal`;

  log(`  Fetching ${url}`);
  const html = await fetchWithRetry(url);
  if (!html) return { gymUrls: [], hasNext: false };

  const $ = load(html);
  const gymUrls = [];

  // Find gym detail links - pattern: /gym/{id}/
  $('a[href*="/gym/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && /\/gym\/\d+/.test(href)) {
      const fullUrl = href.startsWith('http') ? href : `https://fitmap.jp${href}`;
      const cleanUrl = fullUrl.split('?')[0];
      if (!gymUrls.includes(cleanUrl)) gymUrls.push(cleanUrl);
    }
  });

  // Check for next page
  const hasNext = $('a[href*="/page/"]').toArray().some(el => {
    const href = $(el).attr('href') || '';
    return href.includes(`/page/${page + 1}/`);
  });

  return { gymUrls, hasNext };
}

async function scrapeDetailPage(url) {
  const html = await fetchWithRetry(url);
  if (!html) return null;

  const $ = load(html);
  const gym = {
    source: 'fitmap',
    source_url: url,
    source_id: url.match(/\/gym\/(\d+)/)?.[1] || '',
  };

  // Name
  gym.name = $('h1').first().text().trim();
  if (!gym.name) gym.name = $('title').text().split('|')[0].split('-')[0].trim();
  if (!gym.name) return null;

  // Structured data
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html());
      const biz = json['@type'] === 'LocalBusiness' || json['@type'] === 'HealthClub' || json['@type'] === 'SportsActivityLocation' ? json : null;
      if (biz) {
        if (biz.address) {
          gym.address = typeof biz.address === 'string' ? biz.address :
            `${biz.address.addressRegion || ''} ${biz.address.addressLocality || ''} ${biz.address.streetAddress || ''}`.trim();
          gym.prefecture = biz.address.addressRegion;
          gym.postal_code = biz.address.postalCode;
        }
        if (biz.telephone) gym.phone = biz.telephone;
        if (biz.geo) {
          gym.lat = parseFloat(biz.geo.latitude);
          gym.lng = parseFloat(biz.geo.longitude);
        }
        if (biz.aggregateRating) {
          gym.rating = parseFloat(biz.aggregateRating.ratingValue);
          gym.review_count = parseInt(biz.aggregateRating.reviewCount);
        }
        if (biz.openingHours) gym.hours = Array.isArray(biz.openingHours) ? biz.openingHours.join(', ') : biz.openingHours;
        if (biz.image) gym.image = typeof biz.image === 'string' ? biz.image : (biz.image.url || biz.image[0]);
      }
    } catch {}
  });

  const fullText = $('body').text().replace(/\s+/g, ' ');

  // Address from page
  if (!gym.address) {
    const addrMatch = fullText.match(/(〒\d{3}-?\d{4})\s*(.*?(?:都|道|府|県).*?(?:市|区|町|村)[^\n]{3,40})/);
    if (addrMatch) {
      gym.postal_code = addrMatch[1];
      gym.address = addrMatch[2].trim();
    }
  }

  // Prefecture
  if (!gym.prefecture) {
    const prefMatch = (gym.address || fullText).match(/(北海道|東京都|大阪府|京都府|.{2,3}県)/);
    if (prefMatch) gym.prefecture = prefMatch[1];
  }

  // Access / nearest station
  const accessMatch = fullText.match(/(?:アクセス|最寄り駅)[：:\s]*([^\n。]{5,80})/);
  if (accessMatch) gym.access = accessMatch[1].trim();
  if (!gym.access) {
    const stationMatch = fullText.match(/([\u3000-\u9FFF]+駅[^\n。]{0,20}徒歩[^\n。]{0,15})/);
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

  // Holidays
  const holidayMatch = fullText.match(/(?:定休日|休館日)[：:\s]*([^\n。]{2,40})/);
  if (holidayMatch) gym.holidays = holidayMatch[1].trim();

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

  // Entry fee
  const entryMatch = fullText.match(/(?:入会金|登録料)[^。\n]*?(\d[\d,]+)円/);
  if (entryMatch) gym.entry_fee = parseInt(entryMatch[1].replace(/,/g, ''));
  if (/(?:入会金|登録料)[^。]*?(無料|0円)/.test(fullText)) gym.entry_fee = 0;

  // Trial
  if (/無料[^。]*?体験|体験[^。]*?無料/.test(fullText)) gym.trial_free = true;
  const trialMatch = fullText.match(/体験[^。]*?(\d[\d,]+)円/);
  if (trialMatch) gym.trial_price = parseInt(trialMatch[1].replace(/,/g, ''));

  // Amenities
  gym.amenities = [];
  if (/シャワー/.test(fullText)) gym.amenities.push('shower');
  if (/個室|プライベート/.test(fullText)) gym.amenities.push('private_room');
  if (/ウェア.*?(レンタル|無料|貸出)|(レンタル|無料|貸出).*?ウェア/.test(fullText)) gym.amenities.push('rental_wear');
  if (/タオル.*?(レンタル|無料)/.test(fullText)) gym.amenities.push('rental_towel');
  if (/食事指導|食事管理|栄養指導/.test(fullText)) gym.amenities.push('meal_guidance');
  if (/女性専用/.test(fullText)) gym.amenities.push('women_only');
  if (/駐車場/.test(fullText)) gym.amenities.push('parking');
  if (/プロテイン/.test(fullText)) gym.amenities.push('protein');
  if (/手ぶら/.test(fullText)) gym.amenities.push('hands_free');

  // Description
  gym.description = $('meta[name="description"]').attr('content') || '';

  return gym;
}

async function main() {
  log('=== FitMap Scraper Start ===');
  const checkpoint = loadCheckpoint();
  const completedAreas = checkpoint.fitmap_completed || [];
  const completedDetails = new Set(checkpoint.fitmap_details || []);
  let totalGyms = 0;
  const allGymUrls = [];

  // Phase 1: Collect gym URLs from all area pages
  log('Phase 1: Collecting gym URLs...');
  const areaIds = Object.keys(FITMAP_AREAS).map(Number);

  for (const areaId of areaIds) {
    if (completedAreas.includes(areaId)) {
      log(`  [SKIP] area ${areaId} (already done)`);
      continue;
    }

    let page = 1;
    let areaUrls = [];
    let hasNext = true;

    while (hasNext) {
      try {
        const result = await scrapeListPage(areaId, page);
        areaUrls.push(...result.gymUrls);
        hasNext = result.hasNext && result.gymUrls.length > 0;
        page++;
        await sleep(1500);
      } catch (err) {
        log(`  [ERROR] area ${areaId} page ${page}: ${err.message}`);
        hasNext = false;
      }

      if (page > 30) break; // safety
    }

    const unique = [...new Set(areaUrls)];
    allGymUrls.push(...unique);
    log(`  Area ${areaId} (${FITMAP_AREAS[areaId]}): ${unique.length} gyms across ${page - 1} pages`);

    completedAreas.push(areaId);
    checkpoint.fitmap_completed = completedAreas;
    saveCheckpoint(checkpoint);
  }

  // Deduplicate
  const uniqueUrls = [...new Set(allGymUrls)].filter(u => !completedDetails.has(u));
  log(`Total unique gym URLs: ${uniqueUrls.length}`);

  // Phase 2: Scrape detail pages
  log('Phase 2: Scraping detail pages...');
  for (const url of uniqueUrls) {
    try {
      const gym = await scrapeDetailPage(url);
      if (gym && gym.name) {
        appendToFile(OUTPUT, gym);
        totalGyms++;
        if (totalGyms % 100 === 0) log(`  Progress: ${totalGyms} gyms`);
      }
      completedDetails.add(url);
      checkpoint.fitmap_details = [...completedDetails];
      if (totalGyms % 50 === 0) saveCheckpoint(checkpoint);
    } catch (err) {
      log(`  [ERROR] ${url}: ${err.message}`);
    }
    await sleep(CONFIG.requestDelay);
  }

  saveCheckpoint(checkpoint);
  log(`=== FitMap Complete: ${totalGyms} gyms ===`);
}

main().catch(console.error);
