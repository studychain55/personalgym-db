import supabase from "./index";
import type { GymListItem } from "@/types";
import type { ConditionFilter } from "@/types/conditions";

const LIST_COLUMNS = `
  id, uid, name, catchphrase, address,
  price_min, price_max, price_trial,
  trial_available, online_available,
  image_url, review_average_rating, total_review_count,
  areas, programs, options_wear, options_shoes, options_diet,
  target_users,
  prefecture:Prefecture!gym_locations_prefecture_id_fkey(id, title, slug),
  city:City!gym_locations_city_id_fkey(id, title, slug)
`;

export type SortKey = "priority" | "price_asc" | "price_desc" | "rating" | "review_count";

interface FetchGymsOptions {
  prefectureId?: number;
  cityId?: number;
  conditionFilter?: ConditionFilter;
  sort?: SortKey;
  page?: number;
  limit?: number;
}

interface FetchGymsResult {
  gyms: GymListItem[];
  totalCount: number;
}

/** Supabaseクエリに条件フィルタを適用 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyConditionFilter(query: any, filter: ConditionFilter): any {
  switch (filter.type) {
    case "boolean":
      return query.eq(filter.column, filter.value);
    case "range":
      return query.not(filter.column, "is", null).lte(filter.column, filter.max);
    case "array_contains":
      return query.contains(filter.column, [filter.value]);
    case "composite":
      let q = query;
      for (const f of filter.filters) {
        q = applyConditionFilter(q, f) as typeof q;
      }
      return q;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applySorting(query: any, sort: SortKey): any {
  switch (sort) {
    case "price_asc":
      return query
        .order("price_min", { ascending: true, nullsFirst: false })
        .order("search_priority", { ascending: false });
    case "price_desc":
      return query
        .order("price_min", { ascending: false })
        .order("search_priority", { ascending: false });
    case "rating":
      return query
        .order("review_average_rating", { ascending: false })
        .order("total_review_count", { ascending: false });
    case "review_count":
      return query
        .order("total_review_count", { ascending: false })
        .order("review_average_rating", { ascending: false });
    case "priority":
    default:
      return query
        .order("search_priority", { ascending: false })
        .order("review_average_rating", { ascending: false });
  }
}

export async function fetchGyms(options: FetchGymsOptions = {}): Promise<FetchGymsResult> {
  const { prefectureId, cityId, conditionFilter, sort = "priority", page = 1, limit = 20 } = options;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("gym_locations")
    .select(LIST_COLUMNS, { count: "exact" })
    .eq("is_display", true);

  if (prefectureId) query = query.eq("prefecture_id", prefectureId);
  if (cityId) query = query.eq("city_id", cityId);
  if (conditionFilter) query = applyConditionFilter(query, conditionFilter) as typeof query;

  query = applySorting(query, sort) as typeof query;
  query = query.range(from, to);

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

/** 指定条件の件数だけを高速に取得（ページ生成判定用） */
export async function fetchGymCount(options: {
  prefectureId?: number;
  cityId?: number;
  conditionFilter?: ConditionFilter;
}): Promise<number> {
  const { prefectureId, cityId, conditionFilter } = options;

  let query = supabase
    .from("gym_locations")
    .select("id", { count: "exact", head: true })
    .eq("is_display", true);

  if (prefectureId) query = query.eq("prefecture_id", prefectureId);
  if (cityId) query = query.eq("city_id", cityId);
  if (conditionFilter) query = applyConditionFilter(query, conditionFilter) as typeof query;

  const { count, error } = await query;
  if (error) return 0;
  return count || 0;
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
