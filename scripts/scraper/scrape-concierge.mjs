#!/usr/bin/env node
// Phase 3: concierge.diet scraper - area listings + detail pages
import { load } from 'cheerio';
import { CONFIG, CONCIERGE_PREFECTURES } from './config.mjs';
import { fetchWithRetry, sleep, appendToFile, log, loadCheckpoint, saveCheckpoint, stripTags } from './utils.mjs';

const OUTPUT = `${CONFIG.outputDir}/concierge_studios.jsonl`;

async function scrapeListPage(url) {
  const html = await fetchWithRetry(url);
  if (!html) return { gymUrls: [], nextPage: null };

  const $ = load(html);
  const gymUrls = [];

  // Find gym detail links - pattern: /shops/{id}/
  $('a[href*="/shops/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && /\/shops\/\d+/.test(href)) {
      const fullUrl = href.startsWith('http') ? href : `https://concierge.diet${href}`;
      if (!gymUrls.includes(fullUrl)) gymUrls.push(fullUrl);
    }
  });

  // Find next page link
  let nextPage = null;
  $('a[rel="next"], .pagination a, .nav-links a').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text();
    if (href && (text.includes('次') || text.includes('›') || text.includes('»') || /^\d+$/.test(text.trim()))) {
      // Only take the "next" link
      if (text.includes('次') || text.includes('›') || text.includes('»')) {
        nextPage = href.startsWith('http') ? href : `https://concierge.diet${href}`;
      }
    }
  });

  return { gymUrls, nextPage };
}

async function scrapeDetailPage(url) {
  const html = await fetchWithRetry(url);
  if (!html) return null;

  const $ = load(html);
  const gym = {
    source: 'concierge',
    source_url: url,
    source_id: url.match(/\/shops\/(\d+)/)?.[1] || '',
  };

  // Name
  gym.name = $('h1').first().text().trim() ||
    $('title').text().split('|')[0].trim() ||
    '';

  if (!gym.name) return null;

  // Address
  const addressBlock = $('*:contains("住所")').filter((_, el) => $(el).children().length === 0);
  addressBlock.each((_, el) => {
    const parent = $(el).parent();
    const text = parent.text();
    const addrMatch = text.match(/(〒?\d{3}-?\d{4})?[\s]*(東京都|大阪府|北海道|京都府|.{2,3}県)[^\n]{5,80}/);
    if (addrMatch && !gym.address) {
      gym.address = addrMatch[0].trim();
    }
  });

  // Also try meta/structured data
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html());
      if (json.address) {
        gym.address = gym.address || `${json.address.addressRegion || ''} ${json.address.addressLocality || ''} ${json.address.streetAddress || ''}`.trim();
      }
      if (json.name) gym.name = gym.name || json.name;
      if (json.telephone) gym.phone = json.telephone;
      if (json.geo) {
        gym.lat = json.geo.latitude;
        gym.lng = json.geo.longitude;
      }
      if (json.aggregateRating) {
        gym.rating = json.aggregateRating.ratingValue;
        gym.review_count = json.aggregateRating.reviewCount;
      }
    } catch {}
  });

  // Full page text for extraction
  const fullText = $('body').text().replace(/\s+/g, ' ');

  // Prefecture from address
  const prefMatch = (gym.address || fullText).match(/(北海道|東京都|大阪府|京都府|.{2,3}県)/);
  if (prefMatch) gym.prefecture = prefMatch[1];

  // Access/station
  const accessMatch = fullText.match(/([\w\u3000-\u9FFF]+駅[^\n。]{0,30})/);
  if (accessMatch) gym.access = accessMatch[1].trim();

  // Phone
  if (!gym.phone) {
    const phoneMatch = fullText.match(/(?:電話|TEL|tel)[^\d]*(\d{2,4}-?\d{2,4}-?\d{3,4})/);
    if (phoneMatch) gym.phone = phoneMatch[1];
  }

  // Hours
  const hoursMatch = fullText.match(/営業時間[^\d]*(\d{1,2}:\d{2}[\s～〜~-]+\d{1,2}:\d{2})/);
  if (hoursMatch) gym.hours = hoursMatch[1];

  // Pricing
  const prices = [];
  const priceRegex = /(\d[\d,]+)円/g;
  let m;
  while ((m = priceRegex.exec(fullText)) !== null) {
    prices.push(parseInt(m[1].replace(/,/g, '')));
  }
  if (prices.length > 0) {
    gym.price_min = Math.min(...prices.filter(p => p >= 1000));
    gym.price_max = Math.max(...prices);
  }

  // Entry fee
  const entryMatch = fullText.match(/入会金[^。\n]*?(\d[\d,]+)円/);
  if (entryMatch) gym.entry_fee = parseInt(entryMatch[1].replace(/,/g, ''));
  if (/入会金[^。]*?(無料|0円)/.test(fullText)) gym.entry_fee = 0;

  // Trial
  if (/無料[^。]*?(体験|カウンセリング)|体験[^。]*?無料/.test(fullText)) gym.trial_free = true;
  const trialPriceMatch = fullText.match(/体験[^。]*?(\d[\d,]+)円/);
  if (trialPriceMatch) gym.trial_price = parseInt(trialPriceMatch[1].replace(/,/g, ''));

  // Rating from page
  if (!gym.rating) {
    const ratingMatch = fullText.match(/(\d\.\d{1,2})\s*\/?\s*5|★\s*(\d\.\d{1,2})/);
    if (ratingMatch) gym.rating = parseFloat(ratingMatch[1] || ratingMatch[2]);
  }

  // Amenities
  gym.amenities = [];
  if (/シャワー/.test(fullText)) gym.amenities.push('shower');
  if (/個室|プライベート/.test(fullText)) gym.amenities.push('private_room');
  if (/ウェア.*?(レンタル|無料|貸出)|(レンタル|無料|貸出).*?ウェア/.test(fullText)) gym.amenities.push('rental_wear');
  if (/タオル.*?(レンタル|無料|貸出)/.test(fullText)) gym.amenities.push('rental_towel');
  if (/食事指導|食事管理|栄養指導|食事サポート/.test(fullText)) gym.amenities.push('meal_guidance');
  if (/女性専用/.test(fullText)) gym.amenities.push('women_only');
  if (/子連れ|託児|キッズ/.test(fullText)) gym.amenities.push('childcare');
  if (/駐車場/.test(fullText)) gym.amenities.push('parking');

  // Description (meta description or first paragraph)
  gym.description = $('meta[name="description"]').attr('content') ||
    $('p').first().text().trim().substring(0, 300) || '';

  return gym;
}

async function main() {
  log('=== Concierge.diet Scraper Start ===');
  const checkpoint = loadCheckpoint();
  const completedAreas = checkpoint.concierge_completed || [];
  const completedDetails = new Set(checkpoint.concierge_details || []);
  let totalGyms = 0;
  const allGymUrls = [];

  // Phase 1: Collect gym URLs from area pages
  log('Phase 1: Collecting gym URLs from area pages...');
  for (const pref of CONCIERGE_PREFECTURES) {
    if (completedAreas.includes(pref)) {
      log(`  [SKIP] ${pref} (already done)`);
      continue;
    }

    let pageUrl = `https://concierge.diet/area/${pref}/`;
    let pageNum = 1;
    let areaGymUrls = [];

    while (pageUrl) {
      log(`  ${pref} page ${pageNum}: ${pageUrl}`);
      const { gymUrls, nextPage } = await scrapeListPage(pageUrl);
      areaGymUrls.push(...gymUrls);
      pageUrl = nextPage;
      pageNum++;
      await sleep(CONFIG.requestDelay);

      if (pageNum > 50) break; // safety limit
    }

    // Deduplicate
    const unique = [...new Set(areaGymUrls)];
    allGymUrls.push(...unique);
    log(`  ${pref}: ${unique.length} gym URLs found`);

    completedAreas.push(pref);
    checkpoint.concierge_completed = completedAreas;
    saveCheckpoint(checkpoint);
  }

  log(`Total gym URLs collected: ${allGymUrls.length}`);

  // Deduplicate all URLs
  const uniqueUrls = [...new Set(allGymUrls)].filter(u => !completedDetails.has(u));
  log(`Unique URLs to scrape: ${uniqueUrls.length}`);

  // Phase 2: Scrape detail pages
  log('Phase 2: Scraping detail pages...');
  for (const url of uniqueUrls) {
    try {
      const gym = await scrapeDetailPage(url);
      if (gym && gym.name) {
        appendToFile(OUTPUT, gym);
        totalGyms++;
        if (totalGyms % 50 === 0) log(`  Progress: ${totalGyms} gyms scraped`);
      }
      completedDetails.add(url);
      checkpoint.concierge_details = [...completedDetails];
      if (totalGyms % 20 === 0) saveCheckpoint(checkpoint);
    } catch (err) {
      log(`  [ERROR] ${url}: ${err.message}`);
    }
    await sleep(CONFIG.requestDelay);
  }

  saveCheckpoint(checkpoint);
  log(`=== Concierge Complete: ${totalGyms} gyms ===`);
}

main().catch(console.error);
