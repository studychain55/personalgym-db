import supabase from "./index";
import type {
  City,
  CityWithCount,
  Prefecture,
  Region,
  RegionWithPrefecturesAndCities,
} from "@/types";

export async function fetchCityBySlug(
  slug: string,
  prefectureId: number
): Promise<City | null> {
  const { data, error } = await supabase
    .from("City")
    .select("id, title, slug, prefecture_id")
    .eq("slug", slug)
    .eq("prefecture_id", prefectureId)
    .single();

  if (error || !data) return null;
  return data as City;
}

export async function fetchCitiesWithCountByPrefecture(
  prefectureId: number
): Promise<CityWithCount[]> {
  const { data: cities, error: cityErr } = await supabase
    .from("City")
    .select("id, title, slug, prefecture_id")
    .eq("prefecture_id", prefectureId)
    .order("id", { ascending: true });

  if (cityErr || !cities) return [];

  const { data: gymCounts, error: countErr } = await supabase
    .from("gym_locations")
    .select("city_id")
    .eq("is_display", true)
    .eq("prefecture_id", prefectureId);

  const countMap: Record<number, number> = {};
  if (!countErr && gymCounts) {
    for (const g of gymCounts) {
      if (g.city_id) {
        countMap[g.city_id] = (countMap[g.city_id] || 0) + 1;
      }
    }
  }

  return (cities as City[])
    .map((c) => ({ ...c, gym_count: countMap[c.id] || 0 }))
    .filter((c) => c.gym_count > 0)
    .sort((a, b) => b.gym_count - a.gym_count);
}

export async function fetchRegionsWithPrefecturesAndCities(): Promise<
  RegionWithPrefecturesAndCities[]
> {
  const [
    { data: regions, error: regErr },
    { data: prefectures, error: prefErr },
    { data: cities, error: cityErr },
    { data: gymCounts, error: countErr },
  ] = await Promise.all([
    supabase
      .from("Region")
      .select("id, name, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("Prefecture")
      .select("id, title, slug, region_id")
      .order("id", { ascending: true }),
    supabase
      .from("City")
      .select("id, title, slug, prefecture_id")
      .order("id", { ascending: true }),
    supabase
      .from("gym_locations")
      .select("prefecture_id, city_id")
      .eq("is_display", true),
  ]);

  if (regErr || !regions || prefErr || !prefectures) return [];

  const prefCountMap: Record<number, number> = {};
  const cityCountMap: Record<number, number> = {};
  if (!countErr && gymCounts) {
    for (const g of gymCounts) {
      if (g.prefecture_id) {
        prefCountMap[g.prefecture_id] = (prefCountMap[g.prefecture_id] || 0) + 1;
      }
      if (g.city_id) {
        cityCountMap[g.city_id] = (cityCountMap[g.city_id] || 0) + 1;
      }
    }
  }

  const cityList = (!cityErr && cities ? cities : []) as City[];

  return (regions as Region[]).map((region) => ({
    ...region,
    prefectures: (prefectures as Prefecture[])
      .filter((p) => p.region_id === region.id)
      .map((p) => ({
        ...p,
        gym_count: prefCountMap[p.id] || 0,
        cities: cityList
          .filter((c) => c.prefecture_id === p.id)
          .map((c) => ({ ...c, gym_count: cityCountMap[c.id] || 0 }))
          .filter((c) => c.gym_count > 0)
          .sort((a, b) => b.gym_count - a.gym_count),
      })),
  }));
}
