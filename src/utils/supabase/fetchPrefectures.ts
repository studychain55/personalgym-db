import supabase from "./index";
import type { Prefecture, Region, PrefectureWithCount, RegionWithPrefectures } from "@/types";

function normalizeRegionLabel(value: string) {
  return value.replace(/\s+/g, "").replace(/地方$/, "");
}

export async function fetchPrefectures(): Promise<Prefecture[]> {
  const { data, error } = await supabase
    .from("Prefecture")
    .select("id, title, slug, region_id")
    .order("id", { ascending: true });

  if (error) return [];
  return (data as Prefecture[]) || [];
}

export async function fetchPrefectureBySlug(slug: string): Promise<Prefecture | null> {
  const { data, error } = await supabase
    .from("Prefecture")
    .select("id, title, slug, region_id")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Prefecture;
}

export async function fetchRegionsWithPrefectureCounts(): Promise<RegionWithPrefectures[]> {
  // Fetch regions
  const { data: regions, error: regErr } = await supabase
    .from("Region")
    .select("id, name")
    .order("id", { ascending: true });

  if (regErr || !regions) return [];

  // Fetch prefectures
  const { data: prefectures, error: prefErr } = await supabase
    .from("Prefecture")
    .select("id, title, slug, region_id")
    .order("id", { ascending: true });

  if (prefErr || !prefectures) return [];

  // Fetch gym counts per prefecture
  const { data: gymCounts, error: countErr } = await supabase
    .from("gym_locations")
    .select("prefecture_id")
    .eq("is_display", true);

  const countMap: Record<number, number> = {};
  if (!countErr && gymCounts) {
    for (const g of gymCounts) {
      if (g.prefecture_id) {
        countMap[g.prefecture_id] = (countMap[g.prefecture_id] || 0) + 1;
      }
    }
  }

  return (regions as Region[]).map((region) => ({
    ...region,
    prefectures: (prefectures as Prefecture[])
      .filter((p) => p.region_id === region.id)
      .map((p) => ({ ...p, gym_count: countMap[p.id] || 0 })),
  }));
}

export async function fetchRegionByName(regionName: string): Promise<Region | null> {
  const normalizedRegionName = normalizeRegionLabel(regionName);
  const candidates = Array.from(
    new Set([regionName, normalizedRegionName, `${normalizedRegionName}地方`]),
  );

  for (const candidate of candidates) {
    const { data, error } = await supabase
      .from("Region")
      .select("id, name")
      .eq("name", candidate)
      .maybeSingle();

    if (!error && data) {
      return data as Region;
    }
  }

  const { data, error } = await supabase
    .from("Region")
    .select("id, name")
    .order("id", { ascending: true });

  if (error || !data) return null;

  const matchedRegion = (data as Region[]).find(
    (region) => normalizeRegionLabel(region.name) === normalizedRegionName,
  );

  return matchedRegion || null;
}

export async function fetchPrefecturesByRegionId(regionId: number): Promise<PrefectureWithCount[]> {
  const { data: prefectures, error: prefErr } = await supabase
    .from("Prefecture")
    .select("id, title, slug, region_id")
    .eq("region_id", regionId)
    .order("id", { ascending: true });

  if (prefErr || !prefectures) return [];

  // Fetch gym counts per prefecture
  const { data: gymCounts, error: countErr } = await supabase
    .from("gym_locations")
    .select("prefecture_id")
    .eq("is_display", true);

  const countMap: Record<number, number> = {};
  if (!countErr && gymCounts) {
    for (const g of gymCounts) {
      if (g.prefecture_id) {
        countMap[g.prefecture_id] = (countMap[g.prefecture_id] || 0) + 1;
      }
    }
  }

  return (prefectures as Prefecture[]).map((p) => ({
    ...p,
    gym_count: countMap[p.id] || 0,
  }));
}
