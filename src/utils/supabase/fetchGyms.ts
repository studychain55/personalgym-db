import supabase from "./index";
import type { GymListItem } from "@/types";

const LIST_COLUMNS = `
  id, uid, name, catchphrase, address,
  price_min, price_max, price_trial,
  trial_available, online_available,
  image_url, review_average_rating, total_review_count,
  areas, programs,
  prefecture:Prefecture!gym_locations_prefecture_id_fkey(id, title, slug),
  city:City!gym_locations_city_id_fkey(id, title, slug)
`;

interface FetchGymsOptions {
  prefectureId?: number;
  cityId?: number;
  page?: number;
  limit?: number;
}

interface FetchGymsResult {
  gyms: GymListItem[];
  totalCount: number;
}

export async function fetchGyms(options: FetchGymsOptions = {}): Promise<FetchGymsResult> {
  const { prefectureId, cityId, page = 1, limit = 20 } = options;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("gym_locations")
    .select(LIST_COLUMNS, { count: "exact" })
    .eq("is_display", true)
    .order("search_priority", { ascending: false })
    .order("review_average_rating", { ascending: false })
    .range(from, to);

  if (prefectureId) query = query.eq("prefecture_id", prefectureId);
  if (cityId) query = query.eq("city_id", cityId);

  const { data, count, error } = await query;

  if (error) {
    console.error("fetchGyms error:", error);
    return { gyms: [], totalCount: 0 };
  }

  return {
    gyms: (data as unknown as GymListItem[]) || [],
    totalCount: count || 0,
  };
}

export async function fetchAllGymUids(): Promise<{ uid: string }[]> {
  const { data, error } = await supabase
    .from("gym_locations")
    .select("uid")
    .eq("is_display", true);

  if (error) {
    console.error("fetchAllGymUids error:", error);
    return [];
  }
  return data || [];
}
