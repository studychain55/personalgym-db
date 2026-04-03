import supabase from "./index";
import type { City } from "@/types";

export interface CityWithCount extends City {
  gym_count: number;
}

export async function fetchCityBySlug(slug: string, prefectureId: number): Promise<City | null> {
  const { data, error } = await supabase
    .from("City")
    .select("id, title, slug, prefecture_id")
    .eq("slug", slug)
    .eq("prefecture_id", prefectureId)
    .single();

  if (error || !data) return null;
  return data as City;
}

export async function fetchCitiesWithCounts(prefectureId: number): Promise<CityWithCount[]> {
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
    .filter((c) => c.gym_count > 0);
}
