-- ============================================================
-- パーソナルジムDB テーブル定義（pg_ prefix: gym_）
-- 既存studychainテーブルとの衝突を避ける
-- ============================================================

-- メインエンティティ: パーソナルジム
CREATE TABLE IF NOT EXISTS "gym_locations" (
  id SERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  catchphrase TEXT,

  -- 位置情報
  prefecture_id INT REFERENCES "Prefecture"(id),
  city_id INT REFERENCES "City"(id),
  postal_code TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- 連絡先
  phone TEXT,
  email TEXT,
  website_url TEXT,

  -- パーソナルジム固有
  price_trial INT,
  price_enrollment INT,
  price_min INT,
  price_max INT,
  price_plan_name TEXT,
  price_plan_amount INT,
  price_plan_details TEXT,
  trial_available BOOLEAN DEFAULT false,
  online_available BOOLEAN DEFAULT false,
  opening_hours TEXT,
  closed_days TEXT,
  parking TEXT,
  access_info TEXT,
  session_duration INT,
  trainer_count INT,
  programs TEXT[],
  equipment_list TEXT[],
  options_wear BOOLEAN DEFAULT false,
  options_shoes BOOLEAN DEFAULT false,
  options_protein BOOLEAN DEFAULT false,
  options_diet BOOLEAN DEFAULT false,
  target_users TEXT[],
  areas TEXT[],

  -- 画像
  image_url TEXT,
  logo_url TEXT,

  -- 評価
  review_average_rating DECIMAL(2, 1) DEFAULT 0,
  total_review_count INT DEFAULT 0,

  -- 表示制御
  is_display BOOLEAN DEFAULT true,
  search_priority INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gymloc_prefecture ON "gym_locations"(prefecture_id) WHERE is_display = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_city ON "gym_locations"(city_id) WHERE is_display = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_display ON "gym_locations"(is_display, search_priority DESC);
CREATE INDEX IF NOT EXISTS idx_gymloc_uid ON "gym_locations"(uid);

-- ジム×特徴（多対多）
CREATE TABLE IF NOT EXISTS "gym_features" (
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  feature_id INT NOT NULL REFERENCES "Feature"(id) ON DELETE CASCADE,
  PRIMARY KEY (gym_id, feature_id)
);

-- ジム画像
CREATE TABLE IF NOT EXISTS "gym_images" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  role TEXT DEFAULT 'GALLERY',
  sort_order INT DEFAULT 0
);

-- ジム口コミ
CREATE TABLE IF NOT EXISTS "gym_reviews" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  content TEXT NOT NULL,
  author_name TEXT,
  rating_trainer INT CHECK (rating_trainer BETWEEN 1 AND 5),
  rating_facility INT CHECK (rating_facility BETWEEN 1 AND 5),
  rating_price INT CHECK (rating_price BETWEEN 1 AND 5),
  rating_access INT CHECK (rating_access BETWEEN 1 AND 5),
  is_display BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gymrev_gym ON "gym_reviews"(gym_id) WHERE is_display = true;

-- ジムFAQ
CREATE TABLE IF NOT EXISTS "gym_faqs" (
  id SERIAL PRIMARY KEY,
  gym_id INT REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_global BOOLEAN DEFAULT false
);

-- SEOゲートウェイ（パーソナルジム用）
CREATE TABLE IF NOT EXISTS "gym_gateways" (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  h1 TEXT,
  description TEXT,
  content TEXT
);

-- ============================================================
-- RLS ポリシー
-- ============================================================
ALTER TABLE "gym_locations" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_locations" ON "gym_locations" FOR SELECT USING (true);

ALTER TABLE "gym_features" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_features" ON "gym_features" FOR SELECT USING (true);

ALTER TABLE "gym_images" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_images" ON "gym_images" FOR SELECT USING (true);

ALTER TABLE "gym_reviews" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_reviews" ON "gym_reviews" FOR SELECT USING (true);

ALTER TABLE "gym_faqs" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_faqs" ON "gym_faqs" FOR SELECT USING (true);

ALTER TABLE "gym_gateways" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_gateways" ON "gym_gateways" FOR SELECT USING (true);
