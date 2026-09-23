import supabase from "./index";
import type { GymListItem } from "@/types";
import { matchesGymPurpose } from "@/utils/gymPurpose";

const LIST_COLUMNS = `
  id, uid, name, catchphrase, address,
  price_enrollment, price_min, price_max, price_trial, price_per_session,
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

interface FetchGymsOptions {
  prefectureId?: number;
  cityId?: number;
  brandId?: number;
  page?: number;
  limit?: number;
  purposeSlug?: string;
  hasFemaleOnly?: boolean;
  hasMoneyBack?: boolean;
  hasDiet?: boolean;
  hasTrialAvailable?: boolean;
  sortBy?: "priority" | "price_asc" | "price_desc" | "rating" | "review_count";
}

interface FetchGymsResult {
  gyms: GymListItem[];
  totalCount: number;
}

interface FetchGymsByPurposeOptions {
  purposeSlug: string;
  prefectureId?: number;
  regionId?: number;
  page?: number;
  limit?: number;
}

export async function fetchGyms(options: FetchGymsOptions = {}): Promise<FetchGymsResult> {
  const {
    prefectureId, cityId, brandId,
    page = 1, limit = 20,
    purposeSlug, hasFemaleOnly, hasMoneyBack, hasDiet, hasTrialAvailable,
    sortBy = "priority",
  } = options;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("gym_locations")
    .select(LIST_COLUMNS, { count: "exact" })
    .eq("is_display", true)
    .range(from, to);

  if (prefectureId) query = query.eq("prefecture_id", prefectureId);
  if (cityId) query = query.eq("city_id", cityId);
  if (brandId) query = query.eq("brand_id", brandId);
  if (hasFemaleOnly) query = query.eq("has_female_only", true);
  if (hasMoneyBack) query = query.eq("has_money_back", true);
  if (hasDiet) query = query.eq("options_diet", true);
  if (hasTrialAvailable) query = query.eq("trial_available", true);
  if (purposeSlug) query = query.contains("purposes", [purposeSlug]);

  switch (sortBy) {
    case "price_asc":
      query = query.order("price_min", { ascending: true, nullsFirst: false });
      break;
    case "price_desc":
      query = query.order("price_min", { ascending: false });
      break;
    case "rating":
      query = query.order("review_average_rating", { ascending: false });
      break;
    case "review_count":
      query = query.order("total_review_count", { ascending: false });
      break;
    default:
      query = query
        .order("search_priority", { ascending: false })
        .order("review_average_rating", { ascending: false });
  }

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

export async function fetchGymsByPurpose(
  options: FetchGymsByPurposeOptions,
): Promise<FetchGymsResult> {
  const {
    purposeSlug,
    prefectureId,
    regionId,
    page = 1,
    limit = 20,
  } = options;

  let prefectureIds: number[] | undefined;

  if (regionId) {
    const { data: prefectures, error: prefectureError } = await supabase
      .from("Prefecture")
      .select("id")
      .eq("region_id", regionId);

    if (prefectureError || !prefectures || prefectures.length === 0) {
      return { gyms: [], totalCount: 0 };
    }

    prefectureIds = prefectures.map((prefecture: { id: number }) => prefecture.id);
  }

  let query = supabase
    .from("gym_locations")
    .select(LIST_COLUMNS)
    .eq("is_display", true)
    .order("search_priority", { ascending: false })
    .order("review_average_rating", { ascending: false });

  if (prefectureId) {
    query = query.eq("prefecture_id", prefectureId);
  }

  if (prefectureIds) {
    query = query.in("prefecture_id", prefectureIds);
  }

  const { data, error } = await query;

  if (error) {
    console.error("fetchGymsByPurpose error:", error);
    return { gyms: [], totalCount: 0 };
  }

  const filteredGyms = ((data as unknown as GymListItem[]) || []).filter((gym) =>
    matchesGymPurpose(gym, purposeSlug),
  );
  const from = (page - 1) * limit;
  const to = from + limit;

  return {
    gyms: filteredGyms.slice(from, to),
    totalCount: filteredGyms.length,
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

export async function fetchGymsByRegion(
  regionId: number,
  page: number = 1,
  limit: number = 20,
  purposeSlug?: string,
): Promise<FetchGymsResult> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // First get prefecture IDs for this region
  const { data: prefectures, error: prefErr } = await supabase
    .from("Prefecture")
    .select("id")
    .eq("region_id", regionId);

  if (prefErr || !prefectures || prefectures.length === 0) {
    return { gyms: [], totalCount: 0 };
  }

  const prefectureIds = prefectures.map((p: { id: number }) => p.id);

  // Then fetch gyms for these prefectures
  let query = supabase
    .from("gym_locations")
    .select(LIST_COLUMNS, { count: "exact" })
    .eq("is_display", true)
    .in("prefecture_id", prefectureIds)
    .range(from, to)
    .order("search_priority", { ascending: false })
    .order("review_average_rating", { ascending: false });

  if (purposeSlug) {
    query = query.contains("purposes", [purposeSlug]);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("fetchGymsByRegion error:", error);
    return { gyms: [], totalCount: 0 };
  }

  return {
    gyms: (data as unknown as GymListItem[]) || [],
    totalCount: count || 0,
  };
}
