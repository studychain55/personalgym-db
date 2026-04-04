import supabase from "./index";
import type { GymLocation, GymReview, GymImage, GymFaq, GymPlan, GymTrainer, GymBeforeAfter } from "@/types";

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

export async function fetchGymBeforeAfter(gymId: number): Promise<GymBeforeAfter[]> {
  const { data, error } = await supabase
    .from("gym_before_after")
    .select("*")
    .eq("gym_id", gymId)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as GymBeforeAfter[]) || [];
}
