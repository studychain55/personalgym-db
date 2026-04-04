-- ============================================================
-- 003: 競合5サイト完全網羅 - フィールドパリティ達成
-- HPB / Getfit / FitMap / ダイコン / pas0na の全フィールドを統合
-- ============================================================

-- ============================================================
-- 1. gym_locations: 競合ギャップ追加カラム
-- ============================================================

-- カウンセリング・体験（ダイコン/pas0na）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS price_counseling INT;           -- カウンセリング料金（0=無料）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS counseling_duration_min INT;    -- カウンセリング所要時間

-- 設備・サービス追加（HPB/Getfit/ダイコン/FitMap）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_towel_rental BOOLEAN DEFAULT false;     -- タオルレンタル
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_water_service BOOLEAN DEFAULT false;    -- ウォーターサーバー/水素水
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_amenity BOOLEAN DEFAULT false;          -- アメニティ充実
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_child_friendly BOOLEAN DEFAULT false;   -- 子連れOK
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_installment BOOLEAN DEFAULT false;      -- 分割払い対応
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS has_visiting_training BOOLEAN DEFAULT false; -- 出張トレーニング

-- 支払い方法（HPB/FitMap/ダイコン）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS payment_methods TEXT[];  -- ['cash','credit','debit','qr','e-money']

-- 施設情報（HPB）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS booth_count INT;         -- ブース数/席数
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS total_area_sqm INT;      -- 施設面積(㎡)

-- 目的タグ（ダイコン/pas0na: 目的別検索対応）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS purposes TEXT[];
-- ['ダイエット','ボディメイク','筋力増加','健康維持','姿勢改善','産後ダイエット','ブライダル','脚やせ','美尻','くびれ']

-- 雰囲気（FitMap）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS atmosphere TEXT;         -- 施設の雰囲気テキスト

-- 動画URL（FitMap）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS video_url TEXT;

-- 2つ目3つ目の最寄り駅（ダイコン: 複数駅対応）
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS nearest_station_2 TEXT;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS walk_minutes_2 INT;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS nearest_station_3 TEXT;
ALTER TABLE "gym_locations" ADD COLUMN IF NOT EXISTS walk_minutes_3 INT;

-- ============================================================
-- 2. gym_reviews: 口コミ投稿者属性 + 追加評価軸
-- ============================================================

-- 投稿者属性（ダイコン: 性別/年代/職業/目的）
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS author_gender TEXT;          -- male/female/other
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS author_age_group TEXT;       -- 20代/30代/40代/50代
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS author_occupation TEXT;      -- 会社員/主婦/学生 等
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS purpose TEXT;                -- ダイエット/ボディメイク/筋力増加 等

-- ダイエット結果（Getfit: 減量データ）
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS weight_loss_kg DECIMAL(4,1); -- 減量kg

-- 追加評価軸（ダイコン: 食事指導/目標達成度, FitMap: 清潔度/雰囲気, HPB: 雰囲気/接客）
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS rating_meal_guidance INT CHECK (rating_meal_guidance BETWEEN 1 AND 5);
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS rating_goal_achievement INT CHECK (rating_goal_achievement BETWEEN 1 AND 5);
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS rating_cleanliness INT CHECK (rating_cleanliness BETWEEN 1 AND 5);
ALTER TABLE "gym_reviews" ADD COLUMN IF NOT EXISTS rating_atmosphere INT CHECK (rating_atmosphere BETWEEN 1 AND 5);

-- ============================================================
-- 3. gym_plans: 追加カラム
-- ============================================================

-- 総額表示（ダイコン: 入会金+コース料金合計）
ALTER TABLE "gym_plans" ADD COLUMN IF NOT EXISTS price_total INT;              -- 入会金込み総額
ALTER TABLE "gym_plans" ADD COLUMN IF NOT EXISTS has_installment BOOLEAN DEFAULT false; -- 分割払い対応
ALTER TABLE "gym_plans" ADD COLUMN IF NOT EXISTS installment_monthly INT;      -- 分割時月額目安
ALTER TABLE "gym_plans" ADD COLUMN IF NOT EXISTS is_trial BOOLEAN DEFAULT false; -- 体験プランフラグ
ALTER TABLE "gym_plans" ADD COLUMN IF NOT EXISTS trial_price INT;              -- 体験料金（0=無料）
ALTER TABLE "gym_plans" ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'all'; -- new/repeat/all

-- ============================================================
-- 4. gym_trainers: 追加カラム
-- ============================================================

ALTER TABLE "gym_trainers" ADD COLUMN IF NOT EXISTS role TEXT;                 -- 肩書き（代表, チーフトレーナー等）
ALTER TABLE "gym_trainers" ADD COLUMN IF NOT EXISTS achievements TEXT[];       -- 大会実績

-- ============================================================
-- 5. gym_campaigns テーブル（HPB/Getfit/ダイコン: キャンペーン・クーポン）
-- ============================================================
CREATE TABLE IF NOT EXISTS "gym_campaigns" (
  id SERIAL PRIMARY KEY,
  gym_id INT NOT NULL REFERENCES "gym_locations"(id) ON DELETE CASCADE,
  title TEXT NOT NULL,                    -- キャンペーン名
  description TEXT,                       -- 詳細
  discount_type TEXT NOT NULL DEFAULT 'fixed', -- fixed/percent/free_enrollment/free_trial
  discount_amount INT,                    -- 割引額（円）or 割引率（%）
  original_price INT,                     -- 通常価格
  campaign_price INT,                     -- キャンペーン価格
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  conditions TEXT,                        -- 適用条件
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gymcampaign_gym ON "gym_campaigns"(gym_id);
CREATE INDEX IF NOT EXISTS idx_gymcampaign_active ON "gym_campaigns"(is_active) WHERE is_active = true;

ALTER TABLE "gym_campaigns" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gym_campaigns" ON "gym_campaigns" FOR SELECT USING (true);

-- ============================================================
-- 6. gym_brands: 追加カラム
-- ============================================================
ALTER TABLE "gym_brands" ADD COLUMN IF NOT EXISTS catchphrase TEXT;
ALTER TABLE "gym_brands" ADD COLUMN IF NOT EXISTS feature_summary TEXT;
ALTER TABLE "gym_brands" ADD COLUMN IF NOT EXISTS areas_covered TEXT[];         -- 展開エリア

-- ============================================================
-- 7. 追加インデックス
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_gymloc_purposes ON "gym_locations" USING GIN(purposes) WHERE is_display = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_payment ON "gym_locations" USING GIN(payment_methods) WHERE is_display = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_child ON "gym_locations"(has_child_friendly) WHERE is_display = true AND has_child_friendly = true;
CREATE INDEX IF NOT EXISTS idx_gymloc_installment ON "gym_locations"(has_installment) WHERE is_display = true AND has_installment = true;
CREATE INDEX IF NOT EXISTS idx_gymreview_gender ON "gym_reviews"(author_gender) WHERE author_gender IS NOT NULL;
