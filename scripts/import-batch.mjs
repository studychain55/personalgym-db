#!/usr/bin/env node
/**
 * 複数のデータファイルからgym_locationsへ一括インポート
 * Usage: node scripts/import-batch.mjs [file1.json] [file2.json] ...
 * If no args, imports all data/*.json files except pas0na_raw.json and additional_gyms.json
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "../data");

const SUPABASE_URL = "https://tbtwegsiupiskevhgfjs.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHdlZ3NpdXBpc2tldmhnZmpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQ1NzU0OSwiZXhwIjoyMDUxMDMzNTQ5fQ.tdxdjFOpP7IAgG_mjfrG_nxWsUFAEOPlafIULEWMcE0";

const sb = createClient(SUPABASE_URL, SERVICE_KEY);

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[ー〜～]/g, "-")
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60) || `gym-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
}

async function run() {
  // Determine files to import
  const alreadyImported = new Set(["pas0na_raw.json", "additional_gyms.json"]);
  let files = process.argv.slice(2);

  if (files.length === 0) {
    // Auto-discover new JSON files
    files = readdirSync(dataDir)
      .filter(f => f.endsWith(".json") && !alreadyImported.has(f))
      .map(f => join(dataDir, f));
    console.log(`Auto-discovered ${files.length} data files`);
  }

  if (files.length === 0) {
    console.log("No new data files to import.");
    return;
  }

  // Get prefecture mapping
  const { data: allPrefs } = await sb.from("Prefecture").select("id, slug, title");
  const prefSlugMap = {};
  const prefTitleMap = {};
  for (const p of allPrefs || []) {
    prefSlugMap[p.slug] = p.id;
    prefTitleMap[p.title] = p.id;
  }

  // Get existing UIDs to avoid duplicates
  const { data: existingGyms } = await sb.from("gym_locations").select("uid");
  const existingUids = new Set((existingGyms || []).map(g => g.uid));

  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const file of files) {
    const filePath = file.startsWith("/") ? file : join(dataDir, file);
    console.log(`\nProcessing: ${filePath}`);

    let raw;
    try {
      raw = JSON.parse(readFileSync(filePath, "utf8"));
    } catch (e) {
      console.error(`  Failed to read/parse: ${e.message}`);
      continue;
    }

    const gyms = raw.gyms || [];
    let inserted = 0, skipped = 0, errors = 0;

    for (const gym of gyms) {
      if (!gym.name) { skipped++; continue; }

      const uid = toSlug(gym.name);

      if (existingUids.has(uid)) {
        skipped++;
        continue;
      }

      let prefId = null;
      if (gym.prefecture_slug) prefId = prefSlugMap[gym.prefecture_slug] || null;
      if (!prefId && gym.prefecture) prefId = prefTitleMap[gym.prefecture] || null;

      const record = {
        uid,
        name: gym.name,
        catchphrase: gym.catchphrase || null,
        description: gym.description || null,
        prefecture_id: prefId,
        address: gym.address || null,
        phone: gym.phone || null,
        website_url: gym.website_url || null,
        price_trial: gym.price_trial ?? null,
        price_enrollment: gym.price_enrollment ?? null,
        price_min: gym.price_min ?? null,
        price_max: gym.price_max ?? null,
        trial_available: gym.trial_available ?? false,
        online_available: gym.online_available ?? false,
        options_wear: gym.options_wear ?? false,
        options_shoes: gym.options_shoes ?? false,
        options_protein: gym.options_protein ?? false,
        options_diet: gym.options_diet ?? false,
        programs: gym.programs || [],
        target_users: gym.target_users || [],
        areas: gym.areas || [],
        is_display: true,
        search_priority: 0,
      };

      const { error } = await sb.from("gym_locations").insert(record);
      if (error) {
        console.error(`  Failed: ${gym.name}: ${error.message}`);
        errors++;
      } else {
        inserted++;
        existingUids.add(uid); // Track to avoid dups within batch
      }
    }

    console.log(`  Results: +${inserted} inserted, ${skipped} skipped, ${errors} errors`);
    totalInserted += inserted;
    totalSkipped += skipped;
    totalErrors += errors;
  }

  console.log(`\n========================================`);
  console.log(`Total: +${totalInserted} inserted, ${totalSkipped} skipped, ${totalErrors} errors`);
  const { count } = await sb.from("gym_locations").select("id", { count: "exact" });
  console.log(`Total gym_locations in DB: ${count}`);
}

run().catch(console.error);
