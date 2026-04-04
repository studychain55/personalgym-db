-- ============================================================
-- 003: 競合5サイト完全パリティ — カラム追加 + 新テーブル
-- ============================================================

-- === gym_locations 追加カラム ===
ALTER TABLE "gym_locations"
  ADD COLUMN IF NOT EXISTS brand_id INT,
  ADD COLUMN IF NOT EXISTS nearest_station TEXT,
  ADD COLUMN IF NOT EXISTS walk_minutes INT,
  ADD COLUMN IF NOT EXISTS nearest_station_2 TEXT,
  ADD COLUMN IF NOT EXISTS walk_minutes_2 INT,
  ADD COLUMN IF NOT EXISTS nearest_station_3 TEXT,
  ADD COLUMN IF NOT EXISTS walk_minutes_3 INT,
  ADD COLUMN IF NOT EXISTS price_counseling INT,
  ADD COLUMN IF NOT EXISTS counseling_duration_min INT,
  ADD COLUMN IF NOT EXISTS price_per_session INT,
  ADD COLUMN IF NOT EXISTS has_female_only BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_money_back BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_towel_rental BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_water_service BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_amenity BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_child_friendly BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_installment BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_visiting_training BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS payment_methods TEXT[],
  ADD COLUMN IF NOT EXISTS booth_count INT,
  ADD COLUMN IF NOT EXISTS total_area_sqm INT,
  ADD COLUMN IF NOT EXISTS purposes TEXT[],
  ADD COLUMN IF NOT EXISTS atmosphere TEXT,
  ADD COLUMN IF NOT EXISTS video_url TEXT;

-- === gym_reviews 追加カラム ===
ALTER TABLE "gym_reviews"
  ADD COLUMN IF NOT EXISTS author_gender TEXT,
  ADD COLUMN IF NOT EXISTS author_age_group TEXT,
  ADD COLUMN IF NOT EXISTS author_occupation TEXT,
  ADD COLUMN IF NOT EXISTS purpose TEXT,
  ADD COLUMN IF NOT EXISTS weight_loss_kg DECIMAL(4,1),
  ADD COLUMN IF NOT EXISTS rating_meal_guidance INT CHECK (rating_meal_guidance BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS rating_goal_achievement INT CHECK (rating_goal_achievement BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS rating_cleanliness INT CHECK (rating_cleanliness BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS rating_atmosphere INT CHECK (rating_atmosphere BETWEEN 1 AND 5);

-- === gym_brands テーブル ===
CREATE TABLE IF NOT EXISTS "gym_brands" (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  founded_year INT,
  total_locations INT,
  is_display BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "gym_brands" ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='gym_brands' AND policyname='Public read gym_brands') THEN
    CREATE POLICY "Public read gym_brands" ON "gym_brands" FOR SELECT USING (true);
  END IF;
END $$;

-- gym_locations.brand_id FK
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'gym_locations_brand_id_fkey'
  ) THEN
    ALTER TABLE "gym_locations"
      ADD CONSTRAINT gym_locations_brand_id_fkey
      FOREIGN KEY (brand_id) REFERENCES "gym_brands"(id);
  END IF;
END $$;

-- === gym_plans テーブル ===
CREATE TABLE IF NOT EXISTS "gym_plans" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sessions_per_month INT,
  session_minutes INT,
  duration_months INT,
  price_monthly INT,
  price_total INT,
  price_enrollment INT,
  has_installment BOOLEAN DEFAULT false,
  installment_monthly INT,
  is_trial BOOLEAN DEFAULT false,
  trial_price INT,
  target_audience TEXT,
  features TEXT[],
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "gym_plans" ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='gym_plans' AND policyname='Public read gym_plans') THEN
    CREATE POLICY "Public read gym_plans" ON "gym_plans" FOR SELECT USING (true);
  END IF;
END $$;

-- === gym_trainers テーブル ===
CREATE TABLE IF NOT EXISTS "gym_trainers" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  certifications TEXT[],
  achievements TEXT[],
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "gym_trainers" ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='gym_trainers' AND policyname='Public read gym_trainers') THEN
    CREATE POLICY "Public read gym_trainers" ON "gym_trainers" FOR SELECT USING (true);
  END IF;
END $$;

-- === gym_before_afters テーブル ===
CREATE TABLE IF NOT EXISTS "gym_before_afters" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  age INT,
  gender TEXT,
  duration_months INT,
  weight_before DECIMAL(4,1),
  weight_after DECIMAL(4,1),
  body_fat_before DECIMAL(4,1),
  body_fat_after DECIMAL(4,1),
  comment TEXT,
  image_before TEXT,
  image_after TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "gym_before_afters" ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='gym_before_afters' AND policyname='Public read gym_before_afters') THEN
    CREATE POLICY "Public read gym_before_afters" ON "gym_before_afters" FOR SELECT USING (true);
  END IF;
END $$;

-- === gym_campaigns テーブル ===
CREATE TABLE IF NOT EXISTS "gym_campaigns" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('fixed','percent','free_enrollment','free_trial','cashback')),
  discount_amount INT,
  original_price INT,
  campaign_price INT,
  start_date DATE,
  end_date DATE,
  conditions TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "gym_campaigns" ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='gym_campaigns' AND policyname='Public read gym_campaigns') THEN
    CREATE POLICY "Public read gym_campaigns" ON "gym_campaigns" FOR SELECT USING (true);
  END IF;
END $$;

-- === インデックス ===
CREATE INDEX IF NOT EXISTS idx_gymloc_brand ON "gym_locations"(brand_id) WHERE is_display = true;
CREATE INDEX IF NOT EXISTS idx_gymplans_gym ON "gym_plans"(gym_id);
CREATE INDEX IF NOT EXISTS idx_gymtrainers_gym ON "gym_trainers"(gym_id);
CREATE INDEX IF NOT EXISTS idx_gymba_gym ON "gym_before_afters"(gym_id);
CREATE INDEX IF NOT EXISTS idx_gymcamp_gym ON "gym_campaigns"(gym_id) WHERE is_active = true;

-- PostgREST cache reload
NOTIFY pgrst, 'reload schema';
