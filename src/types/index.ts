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
  // アクセス（競合全サイト共通 + ダイコン複数駅対応）
  nearest_station: string | null;
  walk_minutes: number | null;
  nearest_station_2: string | null;
  walk_minutes_2: number | null;
  nearest_station_3: string | null;
  walk_minutes_3: number | null;
  // 料金（競合比較軸）
  price_trial: number | null;
  price_enrollment: number | null;
  price_min: number | null;
  price_max: number | null;
  price_2month_total: number | null;
  price_per_session: number | null;
  price_counseling: number | null;
  counseling_duration_min: number | null;
  price_plan_name: string | null;
  price_plan_amount: number | null;
  price_plan_details: string | null;
  payment_type: string | null;
  payment_methods: string[] | null;
  // 基本属性
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
  // サービス・設備（全競合統合）
  options_wear: boolean;
  options_shoes: boolean;
  options_protein: boolean;
  options_diet: boolean;
  // 競合ギャップ項目
  is_women_only: boolean;
  is_private_room: boolean;
  has_refund_guarantee: boolean;
  has_pair_training: boolean;
  has_rebound_support: boolean;
  has_shower: boolean;
  has_free_trial: boolean;
  has_monitor_plan: boolean;
  has_female_trainer: boolean;
  is_early_morning: boolean;
  is_late_night: boolean;
  // Phase3追加: 競合完全パリティ
  has_towel_rental: boolean;
  has_water_service: boolean;
  has_amenity: boolean;
  has_child_friendly: boolean;
  has_installment: boolean;
  has_visiting_training: boolean;
  // 施設情報（HPB）
  booth_count: number | null;
  total_area_sqm: number | null;
  // 目的タグ（ダイコン/pas0na: 目的別検索）
  purposes: string[] | null;
  // 雰囲気・動画（FitMap）
  atmosphere: string | null;
  video_url: string | null;
  // ブランド
  brand_id: number | null;
  // ターゲット
  target_users: string[] | null;
  areas: string[] | null;
  // メディア
  image_url: string | null;
  logo_url: string | null;
  // 評価
  review_average_rating: number;
  total_review_count: number;
  // 表示制御
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
  nearest_station: string | null;
  walk_minutes: number | null;
  price_min: number | null;
  price_max: number | null;
  price_trial: number | null;
  price_2month_total: number | null;
  trial_available: boolean;
  online_available: boolean;
  is_women_only: boolean;
  is_private_room: boolean;
  has_refund_guarantee: boolean;
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

export interface GymPlan {
  id: number;
  gym_id: number;
  name: string;
  duration_months: number | null;
  sessions: number | null;
  session_duration_min: number | null;
  price: number;
  price_enrollment: number | null;
  price_per_session: number | null;
  has_meal_guidance: boolean;
  description: string | null;
  is_popular: boolean;
  sort_order: number;
}

export interface GymTrainer {
  id: number;
  gym_id: number;
  name: string;
  photo_url: string | null;
  bio: string | null;
  qualifications: string[] | null;
  specialties: string[] | null;
  is_female: boolean;
  sort_order: number;
}

export interface GymBeforeAfter {
  id: number;
  gym_id: number;
  before_image_url: string | null;
  after_image_url: string | null;
  duration: string | null;
  weight_before: number | null;
  weight_after: number | null;
  body_fat_before: number | null;
  body_fat_after: number | null;
  age: number | null;
  gender: string | null;
  comment: string | null;
  sort_order: number;
}

export interface GymBrand {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  founded_year: number | null;
  total_stores: number | null;
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
  rating_booking: number | null;
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
