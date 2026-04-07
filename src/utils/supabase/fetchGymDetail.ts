import supabase from "./index";
import type { GymLocation, GymReview, GymImage, GymFaq, GymPlan, GymTrainer, GymBeforeAfter, GymCampaign } from "@/types";

export async function fetchGymByUid(uid: string): Promise<GymLocation | null> {
  const { data, error } = await supabase
    .from("gym_locations")
    .select("*")
    .eq("uid", uid)
    .eq("is_display", true)
    .single();

  if (error || !data) return null;
  return data as GymLocation;
}

export async function fetchGymReviews(gymId: number): Promise<GymReview[]> {
  const { data, error } = await supabase
    .from("gym_reviews")
    .select("*")
    .eq("gym_id", gymId)
    .eq("is_display", true)
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data as GymReview[]) || [];
}

export async function fetchGymImages(gymId: number): Promise<GymImage[]> {
  const { data, error } = await supabase
    .from("gym_images")
    .select("*")
    .eq("gym_id", gymId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as GymImage[]) || [];
}

export async function fetchGymFaqs(gymId: number): Promise<GymFaq[]> {
  const { data, error } = await supabase
    .from("gym_faqs")
    .select("*")
    .eq("gym_id", gymId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as GymFaq[]) || [];
}

export async function fetchGlobalFaqs(): Promise<GymFaq[]> {
  const { data, error } = await supabase
    .from("gym_faqs")
    .select("*")
    .eq("is_global", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as GymFaq[]) || [];
}

export async function fetchGymPlans(gymId: number): Promise<GymPlan[]> {
  const { data, error } = await supabase
    .from("gym_plans")
    .select("*")
    .eq("gym_id", gymId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as GymPlan[]) || [];
}

export async function fetchGymTrainers(gymId: number): Promise<GymTrainer[]> {
  const { data, error } = await supabase
    .from("gym_trainers")
    .select("*")
    .eq("gym_id", gymId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as GymTrainer[]) || [];
}

export async function fetchGymBeforeAfters(gymId: number): Promise<GymBeforeAfter[]> {
  const { data, error } = await supabase
    .from("gym_before_afters")
    .select("*")
    .eq("gym_id", gymId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as GymBeforeAfter[]) || [];
}

export async function fetchGymCampaigns(gymId: number): Promise<GymCampaign[]> {
  const { data, error } = await supabase
    .from("gym_campaigns")
    .select("*")
    .eq("gym_id", gymId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data as GymCampaign[]) || [];
}

export async function fetchRelatedGyms(
  gymId: number,
  prefectureId: number | null,
  priceMin: number | null,
  priceMax: number | null,
  limit: number = 4
): Promise<GymLocation[]> {
  if (!prefectureId) return [];

  // 同じ都道府県で、同じ価格帯のジムを検索
  let query = supabase
    .from("gym_locations")
    .select("*")
    .eq("prefecture_id", prefectureId)
    .eq("is_display", true)
    .neq("id", gymId)
    .order("review_average_rating", { ascending: false })
    .limit(limit);

  // 価格帯でフィルタ（price_min がほぼ同じ範囲）
  if (priceMin !== null) {
    const minThreshold = Math.floor(priceMin * 0.7); // ±30%の幅
    const maxThreshold = Math.ceil(priceMin * 1.3);
    query = query.gte("price_min", minThreshold).lte("price_min", maxThreshold);
  }

  const { data, error } = await query;

  if (error) return [];
  return (data as GymLocation[]) || [];
}
