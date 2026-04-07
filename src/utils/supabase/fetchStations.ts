import supabase from "./index";
import type { GymListItem } from "@/types";

export interface StationWithCount {
  station: string;
  gym_count: number;
}

const LIST_COLUMNS = `
  id, uid, name, catchphrase, address,
  price_min, price_max, price_trial, price_per_session,
  trial_available, online_available, options_diet,
  has_female_only, has_money_back,
  session_duration, trainer_count,
  image_url, review_average_rating, total_review_count,
  areas, programs, target_users,
  nearest_station, walk_minutes,
  prefecture:Prefecture!gym_locations_prefecture_id_fkey(id, title, slug),
  city:City!gym_locations_city_id_fkey(id, title, slug),
  brand:gym_brands!gym_locations_brand_id_fkey(id, name, slug)
`;

/**
 * Fetch all unique stations with gym counts
 */
export async function fetchAllStationsWithCount(): Promise<StationWithCount[]> {
  const { data: gyms, error } = await supabase
    .from("gym_locations")
    .select("nearest_station")
    .eq("is_display", true);

  if (error || !gyms) return [];

  const stationMap: Record<string, number> = {};

  // Collect all stations and count occurrences
  for (const gym of gyms) {
    if (gym.nearest_station && gym.nearest_station.trim()) {
      stationMap[gym.nearest_station] = (stationMap[gym.nearest_station] || 0) + 1;
    }
  }

  // Convert to sorted array
  return Object.entries(stationMap)
    .map(([station, count]) => ({
      station,
      gym_count: count,
    }))
    .filter((s) => s.gym_count >= 1)
    .sort((a, b) => b.gym_count - a.gym_count);
}

/**
 * Fetch gyms by station name
 */
export async function fetchGymsByStation(
  stationName: string,
  page: number = 1,
  limit: number = 20
): Promise<{ gyms: GymListItem[]; station: StationWithCount | null; totalCount: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Fetch all gyms with this station (case-insensitive)
  const { data: gyms, error } = await supabase
    .from("gym_locations")
    .select(LIST_COLUMNS)
    .eq("is_display", true)
    .ilike("nearest_station", `%${stationName}%`)
    .range(from, to)
    .order("walk_minutes", { ascending: true, nullsFirst: false })
    .order("search_priority", { ascending: false })
    .order("review_average_rating", { ascending: false });

  if (error) {
    console.error("fetchGymsByStation error:", error);
    return { gyms: [], station: null, totalCount: 0 };
  }

  // Get total count
  const { count, error: countError } = await supabase
    .from("gym_locations")
    .select("id", { count: "exact" })
    .eq("is_display", true)
    .ilike("nearest_station", `%${stationName}%`);

  if (countError) {
    console.error("fetchGymsByStation count error:", countError);
  }

  return {
    gyms: (gyms as unknown as GymListItem[]) || [],
    station: { station: stationName, gym_count: count || 0 },
    totalCount: count || 0,
  };
}
