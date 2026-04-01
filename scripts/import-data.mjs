#!/usr/bin/env node
/**
 * pas0na_raw.json → gym_locations テーブルへのデータ投入スクリプト
 * 各ブランドを1ジムエントリとして登録（展開は後で）
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://tbtwegsiupiskevhgfjs.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHdlZ3NpdXBpc2tldmhnZmpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQ1NzU0OSwiZXhwIjoyMDUxMDMzNTQ5fQ.tdxdjFOpP7IAgG_mjfrG_nxWsUFAEOPlafIULEWMcE0";

const sb = createClient(SUPABASE_URL, SERVICE_KEY);

// Prefecture slug mapping
const PREF_MAP = {
  "Tokyo": "tokyo",
  "Osaka": "osaka",
  "Aichi": "aichi",
  "Kanagawa": "kanagawa",
  "Chiba": "chiba",
  "Fukuoka": "fukuoka",
  "Hyogo": "hyogo",
  "Saitama": "saitama",
  "Hokkaido": "hokkaido",
  "Kyoto": "kyoto",
  "Hiroshima": "hiroshima",
  "Miyagi": "miyagi",
};

function parsePrice(str) {
  if (!str) return null;
  if (str === "Free" || str.toLowerCase().includes("free")) return 0;
  const match = str.replace(/,/g, "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || `gym-${Date.now()}`;
}

async function getPrefectureId(slug) {
  const { data } = await sb
    .from("Prefecture")
    .select("id")
    .eq("slug", slug)
    .single();
  return data?.id || null;
}

async function run() {
  const raw = JSON.parse(readFileSync(join(__dirname, "../data/pas0na_raw.json"), "utf8"));
  console.log(`Loaded ${raw.gyms.length} gyms from pas0na_raw.json`);

  // Fetch all prefectures for mapping
  const { data: allPrefs } = await sb.from("Prefecture").select("id, slug");
  const prefIdMap = {};
  for (const p of allPrefs || []) {
    prefIdMap[p.slug] = p.id;
  }

  let inserted = 0;
  let skipped = 0;

  for (const gym of raw.gyms) {
    // Determine primary prefecture
    const primaryPrefSlug = PREF_MAP[gym.prefectures?.[0]] || "tokyo";
    const prefId = prefIdMap[primaryPrefSlug] || prefIdMap["tokyo"];

    const uid = toSlug(gym.name);

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
      catchphrase: gym.features?.[0] || null,
      description: gym.plan_details || null,
      prefecture_id: prefId,
      price_trial: parsePrice(gym.price_trial),
      price_enrollment: parsePrice(gym.price_enrollment),
      price_plan_name: gym.plan_name || null,
      price_plan_amount: parsePrice(gym.plan_price),
      price_plan_details: gym.plan_duration || null,
      trial_available: gym.price_trial?.toLowerCase()?.includes("free") || false,
      online_available: false,
      options_wear: gym.options?.wear?.toLowerCase()?.includes("free") || false,
      options_shoes: gym.options?.shoes?.toLowerCase()?.includes("free") || false,
      options_protein: !!gym.options?.protein,
      options_diet: !!gym.options?.diet,
      target_users: gym.target_users || [],
      areas: gym.sub_areas || gym.areas || [],
      programs: gym.features || [],
      is_display: true,
      search_priority: 0,
    };

    const { error } = await sb.from("gym_locations").insert(record);
    if (error) {
      console.error(`Failed to insert ${gym.name}:`, error.message);
    } else {
      inserted++;
    }
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}`);

  // Verify
  const { count } = await sb.from("gym_locations").select("id", { count: "exact" });
  console.log(`Total gym_locations in DB: ${count}`);
}

run().catch(console.error);
