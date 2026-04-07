import supabase from "./index";
import type { GymListItem } from "@/types";

export interface FeatureWithCount {
  slug: string;
  label: string;
  gym_count: number;
}

export interface CityWithCountGlobal {
  id: number;
  title: string;
  slug: string;
  prefecture_id: number;
  gym_count: number;
}

/**
 * Fetch all unique features (from programs array) with gym counts
 * Returns a normalized list of common program/feature names
 */
export async function fetchAllFeatures(): Promise<FeatureWithCount[]> {
  const { data: gyms, error } = await supabase
    .from("gym_locations")
    .select("programs")
    .eq("is_display", true);

  if (error || !gyms) return [];

  const featureMap: Record<string, number> = {};

  // Collect all programs and count occurrences
  for (const gym of gyms) {
    if (gym.programs && Array.isArray(gym.programs)) {
      for (const program of gym.programs) {
        const slug = program.toLowerCase().replace(/\s+/g, "-");
        featureMap[slug] = (featureMap[slug] || 0) + 1;
      }
    }
  }

  // Convert to sorted array
  return Object.entries(featureMap)
    .map(([slug, count]) => ({
      slug,
      label: slug.replace(/-/g, " ").charAt(0).toUpperCase() + slug.replace(/-/g, " ").slice(1),
      gym_count: count,
    }))
    .filter((f) => f.gym_count >= 2) // Only features with 2+ gyms
    .sort((a, b) => b.gym_count - a.gym_count);
}

/**
 * Fetch gyms by feature/program slug
 */
export async function fetchGymsByFeature(
  featureSlug: string,
  page: number = 1,
  limit: number = 20
): Promise<{ gyms: GymListItem[]; totalCount: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

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

  // Fetch all gyms and filter by feature
  const { data: allGyms, error } = await supabase
    .from("gym_locations")
    .select(LIST_COLUMNS)
    .eq("is_display", true)
    .order("search_priority", { ascending: false })
    .order("review_average_rating", { ascending: false });

  if (error) {
    console.error("fetchGymsByFeature error:", error);
    return { gyms: [], totalCount: 0 };
  }

  // Filter gyms that have this program
  const filteredGyms = (allGyms || []).filter((gym: any) => {
    if (!gym.programs || !Array.isArray(gym.programs)) return false;
    return gym.programs.some(
      (p: string) => p.toLowerCase().replace(/\s+/g, "-") === featureSlug.toLowerCase()
    );
  });

  const totalCount = filteredGyms.length;
  const paginatedGyms = filteredGyms.slice(from, to + 1);

  return { gyms: (paginatedGyms as unknown as GymListItem[]) || [], totalCount };
}

/**
 * Fetch all cities globally with gym counts (across all prefectures)
 */
export async function fetchAllCitiesWithCount(): Promise<CityWithCountGlobal[]> {
  const { data: cities, error: cityErr } = await supabase
    .from("City")
    .select("id, title, slug, prefecture_id")
    .order("id", { ascending: true });

  if (cityErr || !cities) return [];

  const { data: gymCounts, error: countErr } = await supabase
    .from("gym_locations")
    .select("city_id, prefecture_id")
    .eq("is_display", true);

  const countMap: Record<number, number> = {};
  if (!countErr && gymCounts) {
    for (const g of gymCounts) {
      if (g.city_id) {
        countMap[g.city_id] = (countMap[g.city_id] || 0) + 1;
      }
    }
  }

  return (cities as CityWithCountGlobal[])
    .map((c) => ({ ...c, gym_count: countMap[c.id] || 0 }))
    .filter((c) => c.gym_count > 0)
    .sort((a, b) => b.gym_count - a.gym_count);
}

/**
 * Fetch gyms by city slug globally
 */
export async function fetchGymsByCity(
  citySlug: string,
  page: number = 1,
  limit: number = 20
): Promise<{ gyms: GymListItem[]; city: CityWithCountGlobal | null; totalCount: number }> {
  // First find the city
  const { data: cities, error: cityErr } = await supabase
    .from("City")
    .select("id, title, slug, prefecture_id")
    .eq("slug", citySlug)
    .limit(1);

  if (cityErr || !cities || cities.length === 0) {
    return { gyms: [], city: null, totalCount: 0 };
  }

  const city = cities[0];
  const from = (page - 1) * limit;
  const to = from + limit - 1;

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

  const { data: gyms, count, error } = await supabase
    .from("gym_locations")
    .select(LIST_COLUMNS, { count: "exact" })
    .eq("is_display", true)
    .eq("city_id", city.id)
    .range(from, to)
    .order("search_priority", { ascending: false })
    .order("review_average_rating", { ascending: false });

  if (error) {
    console.error("fetchGymsByCity error:", error);
    return { gyms: [], city: { ...city, gym_count: count || 0 }, totalCount: count || 0 };
  }

  return {
    gyms: (gyms as unknown as GymListItem[]) || [],
    city: { ...city, gym_count: count || 0 },
    totalCount: count || 0,
  };
}
