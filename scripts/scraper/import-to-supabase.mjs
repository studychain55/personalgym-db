#!/usr/bin/env node
/**
 * Import all scraped JSONL data into Supabase gym_locations table
 * - Reads all *_studios.jsonl files
 * - Deduplicates by name + area
 * - Maps prefecture → prefecture_id
 * - Upserts by uid
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = 'https://tbtwegsiupiskevhgfjs.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHdlZ3NpdXBpc2tldmhnZmpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQ1NzU0OSwiZXhwIjoyMDUxMDMzNTQ5fQ.tdxdjFOpP7IAgG_mjfrG_nxWsUFAEOPlafIULEWMcE0';
const sb = createClient(SUPABASE_URL, SERVICE_KEY);

const DATA_DIR = '/Users/80dr/personalgym-db/scripts/scraper/data';
const BATCH_SIZE = 50;

// Prefecture mapping: title/slug → id
const PREF_MAP = {"新潟県":15,"nigata":15,"北海道":1,"hokkaido":1,"青森県":2,"aomori":2,"岩手県":3,"iwate":3,"宮城県":4,"miyagi":4,"秋田県":5,"akita":5,"山形県":6,"yamagata":6,"群馬県":10,"gunma":10,"福島県":7,"fukushima":7,"茨城県":8,"ibaraki":8,"栃木県":9,"tochigi":9,"埼玉県":11,"saitama":11,"千葉県":12,"chiba":12,"東京都":13,"tokyo":13,"神奈川県":14,"kanagawa":14,"富山県":16,"toyama":16,"石川県":17,"ishikawa":17,"福井県":18,"fukui":18,"山梨県":19,"yamanashi":19,"長野県":20,"nagano":20,"岐阜県":21,"gifu":21,"静岡県":22,"shizuoka":22,"愛知県":23,"aichi":23,"三重県":24,"mie":24,"滋賀県":25,"shiga":25,"京都府":26,"kyoto":26,"大阪府":27,"osaka":27,"兵庫県":28,"hyogo":28,"奈良県":29,"nara":29,"和歌山県":30,"wakayama":30,"鳥取県":31,"tottori":31,"島根県":32,"shimane":32,"岡山県":33,"okayama":33,"広島県":34,"hiroshima":34,"山口県":35,"yamaguchi":35,"徳島県":36,"tokushima":36,"香川県":37,"kagawa":37,"愛媛県":38,"ehime":38,"高知県":39,"kochi":39,"福岡県":40,"fukuoka":40,"佐賀県":41,"saga":41,"長崎県":42,"nagasaki":42,"熊本県":43,"kumamoto":43,"大分県":44,"oita":44,"宮崎県":45,"miyazaki":45,"鹿児島県":46,"kagoshima":46,"沖縄県":47,"okinawa":47};

// Extra area → prefecture slug mappings
const AREA_PREF_MAP = {
  'nagoya': 'aichi', 'yokohama': 'kanagawa', 'kobe': 'hyogo',
  'sendai': 'miyagi', 'sapporo': 'hokkaido', 'kanazawa': 'ishikawa',
  'kawasaki': 'kanagawa', 'machida': 'tokyo', 'tachikawa': 'tokyo',
  'ikebukuro': 'tokyo', 'shinjuku': 'tokyo', 'shibuya': 'tokyo',
  'ginza': 'tokyo', 'roppongi': 'tokyo', 'akasaka': 'tokyo',
  'ebisu': 'tokyo', 'meguro': 'tokyo', 'gotanda': 'tokyo',
  'shinagawa': 'tokyo', 'ueno': 'tokyo', 'akihabara': 'tokyo',
  'kinshicho': 'tokyo', 'kitasenju': 'tokyo',
  'omiya': 'saitama', 'urawa': 'saitama',
  'funabashi': 'chiba', 'kashiwa': 'chiba',
  'umeda': 'osaka', 'namba': 'osaka', 'tennoji': 'osaka',
  'sakai': 'osaka', 'takatsuki': 'osaka',
  'sannomiya': 'hyogo', 'nishinomiya': 'hyogo', 'himeji': 'hyogo',
  'hakata': 'fukuoka', 'tenjin': 'fukuoka', 'kokura': 'fukuoka',
  'mito': 'ibaraki', 'utsunomiya': 'tochigi', 'maebashi': 'gunma',
  'kofu': 'yamanashi', 'tsu': 'mie', 'takasaki': 'gunma',
  'takamatsu': 'kagawa', 'matsuyama': 'ehime', 'otsu': 'shiga',
};

function readJsonl(filepath) {
  if (!existsSync(filepath)) return [];
  return readFileSync(filepath, 'utf-8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => { try { return JSON.parse(line); } catch { return null; } })
    .filter(Boolean);
}

function toUid(name, area) {
  // Create a unique identifier from name + area
  const base = `${name}-${area || ''}`.toLowerCase()
    .replace(/[（）()【】\[\]「」『』]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u3000-\u9FFF\u30A0-\u30FF\u3040-\u309F-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base || `gym-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function resolvePrefectureId(entry) {
  // Try direct prefecture field
  if (entry.prefecture) {
    const id = PREF_MAP[entry.prefecture];
    if (id) return id;
  }

  // Try area field
  if (entry.area) {
    const slug = AREA_PREF_MAP[entry.area] || entry.area;
    const id = PREF_MAP[slug];
    if (id) return id;
  }

  // Try extracting from address
  if (entry.address) {
    const match = entry.address.match(/(北海道|東京都|大阪府|京都府|.{2,3}県)/);
    if (match) {
      const id = PREF_MAP[match[1]];
      if (id) return id;
    }
  }

  return null;
}

function mapToRecord(entry) {
  const prefId = resolvePrefectureId(entry);
  if (!prefId) return null; // Skip entries without prefecture

  const area = entry.area || entry.prefecture || '';
  const uid = toUid(entry.name, area);

  const record = {
    uid,
    name: entry.name.substring(0, 200),
    prefecture_id: prefId,
    is_display: true,
    search_priority: 0,
  };

  // Address
  if (entry.address) record.address = entry.address.substring(0, 300);
  if (entry.postal_code) record.postal_code = entry.postal_code;

  // Geo
  if (entry.lat && entry.lng) {
    record.latitude = entry.lat;
    record.longitude = entry.lng;
  }

  // Contact
  if (entry.phone) record.phone = entry.phone;
  if (entry.website) record.website_url = entry.website;

  // Pricing
  if (entry.price_min != null) record.price_min = entry.price_min;
  if (entry.price_max != null) record.price_max = entry.price_max;
  if (entry.plan_price) record.price_plan_amount = entry.plan_price;
  if (entry.entry_fee != null) record.price_enrollment = entry.entry_fee;
  if (entry.trial_price != null) record.price_trial = entry.trial_price;
  if (entry.trial_free) {
    record.trial_available = true;
    record.price_trial = 0;
  }

  // Hours
  if (entry.hours) record.opening_hours = entry.hours;
  if (entry.holidays) record.closed_days = entry.holidays;

  // Access
  if (entry.access) record.access_info = entry.access;

  // Session
  if (entry.session_duration) record.session_duration = entry.session_duration;
  if (entry.sessions) record.price_plan_details = `${entry.sessions}回`;

  // Rating
  if (entry.rating) record.review_average_rating = entry.rating;
  if (entry.review_count) record.total_review_count = entry.review_count;

  // Image
  if (entry.image) record.image_url = entry.image;

  // Description
  if (entry.description) record.description = entry.description.substring(0, 1000);
  if (entry.catchphrase) record.catchphrase = entry.catchphrase.substring(0, 300);

  // Amenities
  const amenities = entry.amenities || [];
  record.options_wear = amenities.includes('rental_wear');
  record.has_towel_rental = amenities.includes('rental_towel');
  record.options_protein = amenities.includes('protein');
  record.options_diet = amenities.includes('meal_guidance');
  record.has_female_only = amenities.includes('women_only');
  record.has_child_friendly = amenities.includes('childcare');
  if (amenities.includes('parking')) record.parking = 'あり';
  if (amenities.includes('shower')) record.has_amenity = true;

  // Programs
  if (entry.programs && entry.programs.length > 0) {
    record.programs = entry.programs;
  }

  // Staff
  if (entry.staff_count) record.trainer_count = entry.staff_count;

  return record;
}

async function main() {
  console.log('=== Import to Supabase Start ===');

  // Read all JSONL files
  const files = [
    'getfit_studios.jsonl',    // Best quality data - import first (priority)
    'fitmap_studios.jsonl',    // Good quality
    'hotpepper_studios.jsonl', // Large volume
    'concierge_studios.jsonl', // Medium quality
    'pasona_studios.jsonl',    // Name + area only (no addresses)
  ];

  let allEntries = [];
  for (const file of files) {
    const entries = readJsonl(join(DATA_DIR, file));
    console.log(`  ${file}: ${entries.length} entries`);
    allEntries.push(...entries);
  }
  console.log(`Total raw entries: ${allEntries.length}`);

  // Deduplicate by uid
  const seen = new Map();
  const records = [];

  for (const entry of allEntries) {
    if (!entry.name) continue;

    const record = mapToRecord(entry);
    if (!record) continue;

    // Keep the first (highest-priority source) version
    if (seen.has(record.uid)) continue;
    seen.set(record.uid, true);
    records.push(record);
  }

  console.log(`Unique records to upsert: ${records.length}`);

  // Upsert in batches
  let upserted = 0;
  let errors = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);

    const { error } = await sb
      .from('gym_locations')
      .upsert(batch, { onConflict: 'uid', ignoreDuplicates: false });

    if (error) {
      console.error(`  Batch ${i / BATCH_SIZE + 1} error: ${error.message}`);
      // Try individual inserts for this batch
      for (const rec of batch) {
        const { error: singleError } = await sb
          .from('gym_locations')
          .upsert(rec, { onConflict: 'uid', ignoreDuplicates: false });
        if (singleError) {
          console.error(`    Failed: ${rec.name} - ${singleError.message}`);
          errors++;
        } else {
          upserted++;
        }
      }
    } else {
      upserted += batch.length;
    }

    if ((i / BATCH_SIZE + 1) % 10 === 0) {
      console.log(`  Progress: ${upserted} upserted, ${errors} errors`);
    }
  }

  // Final count
  const { count } = await sb.from('gym_locations').select('id', { count: 'exact' });
  console.log(`\n=== Import Complete ===`);
  console.log(`Upserted: ${upserted}, Errors: ${errors}`);
  console.log(`Total gym_locations in DB: ${count}`);
}

main().catch(console.error);
