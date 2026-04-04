import supabase from "./index";
import type { GymBrand } from "@/types";

export async function fetchAllBrands(): Promise<GymBrand[]> {
  const { data, error } = await supabase
    .from("gym_brands")
    .select("*")
    .eq("is_display", true)
    .order("total_locations", { ascending: false });

  if (error) return [];
  return (data as GymBrand[]) || [];
}

export async function fetchBrandBySlug(slug: string): Promise<GymBrand | null> {
  const { data, error } = await supabase
    .from("gym_brands")
    .select("*")
    .eq("slug", slug)
    .eq("is_display", true)
    .single();

  if (error || !data) return null;
  return data as GymBrand;
}
