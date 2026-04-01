#!/usr/bin/env node
/**
 * additional_gyms.json → gym_locations テーブルへの追加データ投入
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://tbtwegsiupiskevhgfjs.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHdlZ3NpdXBpc2tldmhnZmpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQ1NzU0OSwiZXhwIjoyMDUxMDMzNTQ5fQ.tdxdjFOpP7IAgG_mjfrG_nxWsUFAEOPlafIULEWMcE0";

const sb = createClient(SUPABASE_URL, SERVICE_KEY);

function toSlug(name) {
  // Japanese → romaji-ish slug
  return name
    .toLowerCase()
    .replace(/[ー〜～]/g, "-")
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60) || `gym-${Date.now()}`;
}

async function run() {
  const raw = JSON.parse(
    readFileSync(join(__dirname, "../data/additional_gyms.json"), "utf8")
  );
  console.log(`Loaded ${raw.gyms.length} additional gyms`);

  // Get prefecture mapping
  const { data: allPrefs } = await sb.from("Prefecture").select("id, slug, title");
  const prefSlugMap = {};
  const prefTitleMap = {};
  for (const p of allPrefs || []) {
    prefSlugMap[p.slug] = p.id;
    prefTitleMap[p.title] = p.id;
  }

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const gym of raw.gyms) {
    const uid = toSlug(gym.name);

    // Get prefecture ID
    let prefId = null;
    if (gym.prefecture_slug) {
      prefId = prefSlugMap[gym.prefecture_slug] || null;
    }
    if (!prefId && gym.prefecture) {
      prefId = prefTitleMap[gym.prefecture] || null;
    }

    // Check if already exists
    const { data: existing } = await sb
      .from("gym_locations")
      .select("id")
      .eq("uid", uid)
      .single();

    if (existing) {
      skipped++;
      continue;
    }

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
      console.error(`Failed: ${gym.name}: ${error.message}`);
      errors++;
    } else {
      inserted++;
    }
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}, Errors: ${errors}`);
  const { count } = await sb.from("gym_locations").select("id", { count: "exact" });
  console.log(`Total gym_locations: ${count}`);
}

run().catch(console.error);
