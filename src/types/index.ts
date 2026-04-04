export interface GymLocation {
  id: number;
  uid: string;
  name: string;
  description: string | null;
  catchphrase: string | null;
  prefecture_id: number | null;
  city_id: number | null;
  postal_code: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  price_trial: number | null;
  price_enrollment: number | null;
  price_min: number | null;
  price_max: number | null;
  price_plan_name: string | null;
  price_plan_amount: number | null;
  price_plan_details: string | null;
  trial_available: boolean;
  online_available: boolean;
  opening_hours: string | null;
  closed_days: string | null;
  parking: string | null;
  access_info: string | null;
  session_duration: number | null;
  trainer_count: number | null;
  programs: string[] | null;
  equipment_list: string[] | null;
  options_wear: boolean;
  options_shoes: boolean;
  options_protein: boolean;
  options_diet: boolean;
  target_users: string[] | null;
  areas: string[] | null;
  image_url: string | null;
  logo_url: string | null;
  review_average_rating: number;
  total_review_count: number;
  is_display: boolean;
  search_priority: number;
  created_at: string;
  updated_at: string;
  // Phase 3: 競合パリティ追加カラム
  brand_id: number | null;
  nearest_station: string | null;
  walk_minutes: number | null;
  nearest_station_2: string | null;
  walk_minutes_2: number | null;
  nearest_station_3: string | null;
  walk_minutes_3: number | null;
  price_counseling: number | null;
  counseling_duration_min: number | null;
  price_per_session: number | null;
  has_female_only: boolean;
  has_money_back: boolean;
  has_towel_rental: boolean;
  has_water_service: boolean;
  has_amenity: boolean;
  has_child_friendly: boolean;
  has_installment: boolean;
  has_visiting_training: boolean;
  payment_methods: string[] | null;
  booth_count: number | null;
  total_area_sqm: number | null;
  purposes: string[] | null;
  atmosphere: string | null;
  video_url: string | null;
}

export interface GymListItem {
  id: number;
  uid: string;
  name: string;
  catchphrase: string | null;
  address: string | null;
  price_min: number | null;
  price_max: number | null;
  price_trial: number | null;
  price_per_session: number | null;
  trial_available: boolean;
  online_available: boolean;
  options_diet: boolean;
  has_female_only: boolean;
  has_money_back: boolean;
  session_duration: number | null;
  trainer_count: number | null;
  image_url: string | null;
  review_average_rating: number;
  total_review_count: number;
  areas: string[] | null;
  programs: string[] | null;
  target_users: string[] | null;
  nearest_station: string | null;
  walk_minutes: number | null;
  prefecture?: { id: number; title: string; slug: string };
  city?: { id: number; title: string; slug: string };
  brand?: { id: number; name: string; slug: string } | null;
}

export interface GymReview {
  id: number;
  gym_id: number;
  rating: number;
  title: string | null;
  content: string;
  author_name: string | null;
  rating_trainer: number | null;
  rating_facility: number | null;
  rating_price: number | null;
  rating_access: number | null;
  rating_meal_guidance: number | null;
  rating_goal_achievement: number | null;
  rating_cleanliness: number | null;
  rating_atmosphere: number | null;
  author_gender: string | null;
  author_age_group: string | null;
  author_occupation: string | null;
  purpose: string | null;
  weight_loss_kg: number | null;
  is_display: boolean;
  created_at: string;
}

export interface GymImage {
  id: number;
  gym_id: number;
  image_url: string;
  role: string;
  sort_order: number;
}

export interface GymFaq {
  id: number;
  gym_id: number | null;
  question: string;
  answer: string;
  sort_order: number;
  is_global: boolean;
}

export interface GymBrand {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  founded_year: number | null;
  total_locations: number | null;
  is_display: boolean;
}

export interface GymPlan {
  id: number;
  gym_id: number;
  name: string;
  sessions_per_month: number | null;
  session_minutes: number | null;
  duration_months: number | null;
  price_monthly: number | null;
  price_total: number | null;
  price_enrollment: number | null;
  has_installment: boolean;
  installment_monthly: number | null;
  is_trial: boolean;
  trial_price: number | null;
  target_audience: string | null;
  features: string[] | null;
  sort_order: number;
}

export interface GymTrainer {
  id: number;
  gym_id: number;
  name: string;
  role: string | null;
  bio: string | null;
  certifications: string[] | null;
  achievements: string[] | null;
  image_url: string | null;
  sort_order: number;
}

export interface GymBeforeAfter {
  id: number;
  gym_id: number;
  age: number | null;
  gender: string | null;
  duration_months: number | null;
  weight_before: number | null;
  weight_after: number | null;
  body_fat_before: number | null;
  body_fat_after: number | null;
  comment: string | null;
  image_before: string | null;
  image_after: string | null;
  sort_order: number;
}

export interface GymCampaign {
  id: number;
  gym_id: number;
  title: string;
  discount_type: "fixed" | "percent" | "free_enrollment" | "free_trial" | "cashback";
  discount_amount: number | null;
  original_price: number | null;
  campaign_price: number | null;
  start_date: string | null;
  end_date: string | null;
  conditions: string | null;
  is_active: boolean;
}

export interface Prefecture {
  id: number;
  title: string;
  slug: string;
  region_id: number;
}

export interface Region {
  id: number;
  name: string;
  sort_order: number;
}

export interface City {
  id: number;
  title: string;
  slug: string;
  prefecture_id: number;
}

export interface PrefectureWithCount extends Prefecture {
  gym_count: number;
}

export interface RegionWithPrefectures extends Region {
  prefectures: PrefectureWithCount[];
}
