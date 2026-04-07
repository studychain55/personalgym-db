#!/usr/bin/env node
// Phase 4: pas0na.com scraper - aggregate listing pages (no individual detail pages)
// Gym entries are under h3 headings: "01.【おすすめ】BEYOND / パーソナルジム東京"
import { load } from 'cheerio';
import { CONFIG, PASONA_AREAS } from './config.mjs';
import { fetchWithRetry, sleep, appendToFile, log, loadCheckpoint, saveCheckpoint, stripTags } from './utils.mjs';

const OUTPUT = `${CONFIG.outputDir}/pasona_studios.jsonl`;

async function scrapeAreaPage(areaSlug) {
  const url = `https://pas0na.com/area/${areaSlug}/`;
  log(`Fetching ${url}`);
  const html = await fetchWithRetry(url);
  if (!html) return [];

  const $ = load(html);
  const gyms = [];

  // Gym entries are under h3 tags with format: "01.【おすすめ】GYM_NAME / パーソナルジムAREA"
  const headings = $('h3').toArray();

  for (const heading of headings) {
    const $h = $(heading);
    const rawText = $h.text().trim();

    // Match pattern: number + gym name (with possible 【おすすめ】 prefix)
    const nameMatch = rawText.match(/^\d+\.\s*(?:【[^】]*】\s*)?(.+?)(?:\s*\/\s*パーソナルジム.*)?$/);
    if (!nameMatch) continue;

    const name = nameMatch[1].trim();
    if (!name || name.length < 2 || name.length > 80) continue;

    // Get content between this h3 and next h3/h2
    let content = '';
    let $next = $h.next();
    while ($next.length && !$next.is('h2, h3')) {
      content += $.html($next);
      $next = $next.next();
    }

    if (!content) continue;
    const $content = load(content);
    const text = stripTags(content);

    const gym = {
      source: 'pasona',
      name: name,
      area: areaSlug,
      url: url,
    };

    // Parse tables for structured data
    // Look for "人気プラン" table: plan name, sessions, price, entry fee, trial price
    const tables = $content('table').toArray();
    for (const table of tables) {
      const tableText = $(table).text();

      if (/人気プラン|プラン名/.test(tableText)) {
        // Price extraction from plan table
        const planPriceMatch = tableText.match(/料金[^\d]*(\d[\d,]+)円/);
        if (planPriceMatch) gym.plan_price = parseInt(planPriceMatch[1].replace(/,/g, ''));

        const sessionsMatch = tableText.match(/(\d+)回/);
        if (sessionsMatch) gym.sessions = parseInt(sessionsMatch[1]);

        const durationMatch = tableText.match(/(\d+)分/);
        if (durationMatch) gym.session_duration = parseInt(durationMatch[1]);

        const entryMatch = tableText.match(/入会金[^\d]*(\d[\d,]+)円/);
        if (entryMatch) gym.entry_fee = parseInt(entryMatch[1].replace(/,/g, ''));
        if (/入会金[^。]*?(無料|0円)/.test(tableText)) gym.entry_fee = 0;

        const trialMatch = tableText.match(/体験料[^\d]*(\d[\d,]+)円/);
        if (trialMatch) gym.trial_price = parseInt(trialMatch[1].replace(/,/g, ''));
        if (/体験[^。]*?無料|無料体験/.test(tableText)) gym.trial_free = true;
      }

      if (/オプション|貸しウェア|貸しタオル/.test(tableText)) {
        gym.amenities = [];
        if (/貸しウェア|ウェア[^。]*?[○◎✓あり]/.test(tableText)) gym.amenities.push('rental_wear');
        if (/貸しタオル|タオル[^。]*?[○◎✓あり]/.test(tableText)) gym.amenities.push('rental_towel');
        if (/シャワー[^。]*?[○◎✓あり]/.test(tableText)) gym.amenities.push('shower');
        if (/食事指導|食事管理/.test(tableText)) gym.amenities.push('meal_guidance');
        if (/プロテイン/.test(tableText)) gym.amenities.push('protein');
        if (/個室|プライベート/.test(tableText)) gym.amenities.push('private_room');
        if (/女性専用/.test(tableText)) gym.amenities.push('women_only');
        if (/子連れ|託児|キッズ/.test(tableText)) gym.amenities.push('childcare');
      }

      if (/基本情報|住所|エリア/.test(tableText)) {
        const locationMatch = tableText.match(/(?:エリア|住所|場所)[^\n]*?((?:東京|大阪|名古屋|横浜|福岡|札幌|仙台|神戸|京都|広島)[^\n,]{0,50})/);
        if (locationMatch) gym.location = locationMatch[1].trim();
      }
    }

    // Fallback price extraction from text
    if (!gym.plan_price) {
      const priceMatch = text.match(/(\d[\d,]+)円/g);
      if (priceMatch) {
        const prices = priceMatch.map(p => parseInt(p.replace(/[円,]/g, ''))).filter(p => p >= 1000);
        if (prices.length > 0) {
          gym.price_min = Math.min(...prices);
          gym.price_max = Math.max(...prices);
        }
      }
    }

    // Extract external link (website)
    $content('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.includes('pas0na.com') && href.startsWith('http') && !gym.website) {
        gym.website = href;
      }
    });

    // Description from first paragraph
    const desc = $content('p').first().text().trim();
    if (desc && desc.length > 10) gym.description = desc.substring(0, 500);

    // Additional from full text
    if (/女性専用/.test(text) && !gym.amenities?.includes('women_only')) {
      gym.amenities = gym.amenities || [];
      gym.amenities.push('women_only');
    }

    gyms.push(gym);
  }

  return gyms;
}

async function main() {
  log('=== Pasona (pas0na.com) Scraper Start ===');

  // Also try city-level URLs that the site actually uses
  const cityUrls = [
    'tokyo', 'osaka', 'nagoya', 'yokohama', 'chiba', 'saitama', 'kobe',
    'kyoto', 'fukuoka', 'hiroshima', 'sendai', 'sapporo', 'niigata',
    'shizuoka', 'okayama', 'kumamoto', 'kagoshima', 'okinawa',
    'hokkaido', 'aomori', 'iwate', 'akita', 'miyagi', 'yamagata', 'fukushima',
    'ibaraki', 'tochigi', 'gunma', 'kanagawa',
    'toyama', 'kanazawa', 'fukui', 'yamanashi', 'nagano',
    'gifu', 'mie', 'shiga', 'nara', 'wakayama',
    'tottori', 'shimane', 'yamaguchi',
    'tokushima', 'kagawa', 'ehime', 'kochi',
    'saga', 'nagasaki', 'oita', 'miyazaki',
  ];

  const checkpoint = loadCheckpoint();
  const completed = checkpoint.pasona_completed2 || [];
  let totalGyms = 0;

  // Try both /area/ and direct /{city}/ patterns
  const urlPatterns = [
    ...cityUrls.map(c => ({ slug: c, url: `https://pas0na.com/area/${c}/` })),
    ...cityUrls.map(c => ({ slug: `city_${c}`, url: `https://pas0na.com/${c}/` })),
  ];

  for (const { slug, url } of urlPatterns) {
    if (completed.includes(slug)) {
      continue;
    }

    try {
      log(`Fetching ${url}`);
      const html = await fetchWithRetry(url);
      if (!html) {
        completed.push(slug);
        checkpoint.pasona_completed2 = completed;
        saveCheckpoint(checkpoint);
        continue;
      }

      const $ = load(html);
      const headings = $('h3').toArray();
      const gyms = [];

      for (const heading of headings) {
        const $h = $(heading);
        const rawText = $h.text().trim();

        const nameMatch = rawText.match(/^\d+\.\s*(?:【[^】]*】\s*)?(.+?)(?:\s*\/\s*パーソナルジム.*)?$/);
        if (!nameMatch) continue;

        const name = nameMatch[1].trim();
        if (!name || name.length < 2 || name.length > 80) continue;

        let content = '';
        let $next = $h.next();
        while ($next.length && !$next.is('h2, h3')) {
          content += $.html($next);
          $next = $next.next();
        }

        if (!content) continue;
        const $c = load(content);
        const text = stripTags(content);

        const gym = {
          source: 'pasona',
          name,
          area: slug.replace('city_', ''),
          url,
        };

        // Prices
        const priceMatches = text.match(/(\d[\d,]+)円/g);
        if (priceMatches) {
          const prices = priceMatches.map(p => parseInt(p.replace(/[円,]/g, ''))).filter(p => p >= 1000);
          if (prices.length > 0) {
            gym.price_min = Math.min(...prices);
            gym.price_max = Math.max(...prices);
          }
        }

        // Entry fee
        const entryMatch = text.match(/入会金[^\d]*(\d[\d,]+)円/);
        if (entryMatch) gym.entry_fee = parseInt(entryMatch[1].replace(/,/g, ''));
        if (/入会金[^。]*?(無料|0円)/.test(text)) gym.entry_fee = 0;

        // Trial
        if (/無料[^。]*?体験|体験[^。]*?無料|無料カウンセリング/.test(text)) gym.trial_free = true;
        const trialMatch = text.match(/体験[^\d]*(\d[\d,]+)円/);
        if (trialMatch) gym.trial_price = parseInt(trialMatch[1].replace(/,/g, ''));

        // Sessions
        const sessionsMatch = text.match(/(\d+)回[/／](\d+)分/);
        if (sessionsMatch) {
          gym.sessions = parseInt(sessionsMatch[1]);
          gym.session_duration = parseInt(sessionsMatch[2]);
        }

        // Amenities
        gym.amenities = [];
        if (/貸しウェア|ウェア.*?無料|ウェア.*?レンタル/.test(text)) gym.amenities.push('rental_wear');
        if (/貸しタオル|タオル.*?無料/.test(text)) gym.amenities.push('rental_towel');
        if (/シャワー/.test(text)) gym.amenities.push('shower');
        if (/食事指導|食事管理|栄養指導/.test(text)) gym.amenities.push('meal_guidance');
        if (/女性専用/.test(text)) gym.amenities.push('women_only');
        if (/個室|プライベート/.test(text)) gym.amenities.push('private_room');
        if (/子連れ|託児/.test(text)) gym.amenities.push('childcare');

        // Description
        const desc = $c('p').first().text().trim();
        if (desc && desc.length > 10) gym.description = desc.substring(0, 500);

        // Website
        $c('a[href]').each((_, el) => {
          const href = $c(el).attr('href');
          if (href && !href.includes('pas0na.com') && href.startsWith('http') && !gym.website) {
            gym.website = href;
          }
        });

        gyms.push(gym);
      }

      for (const gym of gyms) {
        appendToFile(OUTPUT, gym);
      }
      totalGyms += gyms.length;
      if (gyms.length > 0) log(`  ${slug}: ${gyms.length} gyms (total: ${totalGyms})`);

      completed.push(slug);
      checkpoint.pasona_completed2 = completed;
      saveCheckpoint(checkpoint);
    } catch (err) {
      log(`  [ERROR] ${slug}: ${err.message}`);
    }

    await sleep(1500);
  }

  log(`=== Pasona Complete: ${totalGyms} gyms ===`);
}

main().catch(console.error);
