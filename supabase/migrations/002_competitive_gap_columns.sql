-- ============================================================
-- 002: 競合分析に基づくカラム・テーブル追加
-- 競合5サイト（GetFit, ダイコン, ZERO BODY, みんパソ, 比較ナビ）の
-- 掲載情報を網羅するための拡張
-- ============================================================

-- ============================================================
-- 1. gym_locations に競合差分カラムを追加
-- ============================================================

-- アクセス情報の強化（競合全サイトが保有）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS nearest_station TEXT;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS walk_minutes INT;

-- 料金情報の強化（みんパソ/比較ナビの比較軸）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS price_2month_total INT;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS price_per_session INT;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS payment_type TEXT; -- monthly/per_session/package/subscription

-- 特徴フラグの拡充（ダイコン/Getfitが保有）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS is_women_only BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS is_private_room BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_refund_guarantee BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_pair_training BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_rebound_support BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_shower BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_free_trial BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_monitor_plan BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_female_trainer BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS is_early_morning BOOLEAN DEFAULT false;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS is_late_night BOOLEAN DEFAULT false;

-- ブランド情報（チェーン展開対応）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS brand_id INT;

-- 口コミ5軸評価（Getfit式）
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS rating_booking INT CHECK (rating_booking BETWEEN 1 AND 5);

-- ============================================================
-- 2. ブランドテーブル（店舗とブランドの分離）
-- ============================================================
CREATE TABLE IF NOT EXISTS "gym_brands" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  founded_year INT,
  total_stores INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "gym_brands" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_brands" ON "gym_brands" FOR SELECT USING (true);

-- gym_locationsにブランド外部キー追加
-- (ALTER TABLE ADD CONSTRAINT は IF NOT EXISTS 非対応のため DO ブロックで)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_gym_brand'
  ) THEN
    ALTER TABLE "gym_locations"
      ADD CONSTRAINT fk_gym_brand
      FOREIGN KEY (brand_id) REFERENCES "gym_brands"(id);
  END IF;
END $$;

-- ============================================================
-- 3. 料金プランテーブル（正規化: 複数コース対応）
-- Getfit/ダイコン/ZERO BODYが保有する「コース一覧」を再現
-- ============================================================
CREATE TABLE IF NOT EXISTS "gym_plans" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,                  -- コース名（例: 2ヶ月集中コース）
  duration_months INT,                 -- 期間（月）
  sessions INT,                        -- 回数
  session_duration_min INT,            -- 1回あたり時間（分）
  price INT NOT NULL,                  -- コース料金（税込）
  price_enrollment INT,                -- 入会金（コース別の場合）
  price_per_session INT,               -- 1回あたり単価（計算値）
  has_meal_guidance BOOLEAN DEFAULT false, -- 食事指導込み
  description TEXT,                    -- コース説明
  is_popular BOOLEAN DEFAULT false,    -- 人気プランフラグ
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gymplan_gym ON "gym_plans"(gym_id);

ALTER TABLE "gym_plans" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_plans" ON "gym_plans" FOR SELECT USING (true);

-- ============================================================
-- 4. トレーナーテーブル（正規化）
-- ダイコンが詳細に保有、Getfitも一部保有
-- ============================================================
CREATE TABLE IF NOT EXISTS "gym_trainers" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  photo_url TEXT,
  bio TEXT,                            -- 経歴
  qualifications TEXT[],               -- 資格一覧（NSCA-CPT, NESTA-PFT等）
  specialties TEXT[],                  -- 得意分野（ダイエット, ボディメイク等）
  is_female BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gymtrainer_gym ON "gym_trainers"(gym_id);

ALTER TABLE "gym_trainers" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_trainers" ON "gym_trainers" FOR SELECT USING (true);

-- ============================================================
-- 5. ビフォーアフターテーブル（Getfit/ZERO BODY保有）
-- ============================================================
CREATE TABLE IF NOT EXISTS "gym_before_after" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  before_image_url TEXT,
  after_image_url TEXT,
  duration TEXT,                        -- 期間（例: 2ヶ月）
  weight_before DECIMAL(5,1),           -- 体重Before
  weight_after DECIMAL(5,1),            -- 体重After
  body_fat_before DECIMAL(4,1),         -- 体脂肪率Before
  body_fat_after DECIMAL(4,1),          -- 体脂肪率After
  age INT,
  gender TEXT,                          -- male/female
  comment TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gymba_gym ON "gym_before_after"(gym_id);

ALTER TABLE "gym_before_after" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_before_after" ON "gym_before_after" FOR SELECT USING (true);

-- ============================================================
-- 6. 追加インデックス
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_gymloc_station ON "gym_locations"(nearest_station) WHERE is_display = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_women ON "gym_locations"(is_women_only) WHERE is_display = true AND is_women_only = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_private ON "gym_locations"(is_private_room) WHERE is_display = true AND is_private_room = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_brand ON "gym_locations"(brand_id) WHERE brand_id IS NOT NULL;
