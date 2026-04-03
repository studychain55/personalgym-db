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
  trial_available: boolean;
  online_available: boolean;
  image_url: string | null;
  review_average_rating: number;
  total_review_count: number;
  areas: string[] | null;
  programs: string[] | null;
  options_wear: boolean;
  options_shoes: boolean;
  options_diet: boolean;
  target_users: string[] | null;
  prefecture?: { id: number; title: string; slug: string };
  city?: { id: number; title: string; slug: string };
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
