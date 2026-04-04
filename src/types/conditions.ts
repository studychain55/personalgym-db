/**
 * 検索条件の定義（パーソナルジム特化 + 横展開対応）
 * 他カテゴリ追加時はこのファイルに条件を追加するだけ
 */

export interface SearchCondition {
  slug: string;
  label: string;
  shortLabel: string;
  /** Supabaseクエリに渡すフィルター定義 */
  filter: ConditionFilter;
  /** SEO用のキーワード */
  seoKeyword: string;
  /** metaタイトルテンプレート（{area}が置換される） */
  titleTemplate: string;
  /** meta descriptionテンプレート */
  descriptionTemplate: string;
}

export type ConditionFilter =
  | { type: "boolean"; column: string; value: true }
  | { type: "range"; column: string; max: number }
  | { type: "array_contains"; column: string; value: string }
  | { type: "composite"; filters: ConditionFilter[] };

/**
 * パーソナルジム用の検索条件マスター
 */
export const GYM_CONDITIONS: SearchCondition[] = [
  {
    slug: "cheap",
    label: "料金が安い",
    shortLabel: "安い",
    filter: { type: "range", column: "price_min", max: 100000 },
    seoKeyword: "安い",
    titleTemplate: "{area}の安いパーソナルジム",
    descriptionTemplate: "{area}で月額10万円以下の安いパーソナルジムを比較。コスパ重視で選びたい方におすすめ。",
  },
  {
    slug: "women",
    label: "女性向け・女性専用",
    shortLabel: "女性向け",
    filter: { type: "array_contains", column: "target_users", value: "女性" },
    seoKeyword: "女性",
    titleTemplate: "{area}の女性向けパーソナルジム",
    descriptionTemplate: "{area}で女性におすすめのパーソナルジムを比較。女性専用・女性トレーナー在籍のジムも掲載。",
  },
  {
    slug: "beginner",
    label: "初心者向け",
    shortLabel: "初心者",
    filter: { type: "array_contains", column: "target_users", value: "初心者" },
    seoKeyword: "初心者",
    titleTemplate: "{area}の初心者向けパーソナルジム",
    descriptionTemplate: "{area}で初心者におすすめのパーソナルジムを比較。運動未経験でも安心して通えるジムを厳選。",
  },
  {
    slug: "diet",
    label: "ダイエット特化",
    shortLabel: "ダイエット",
    filter: { type: "array_contains", column: "programs", value: "ダイエット" },
    seoKeyword: "ダイエット",
    titleTemplate: "{area}のダイエット向けパーソナルジム",
    descriptionTemplate: "{area}でダイエットにおすすめのパーソナルジムを比較。食事指導付きで確実に痩せたい方に。",
  },
  {
    slug: "private",
    label: "完全個室",
    shortLabel: "個室",
    filter: { type: "boolean", column: "is_private_room", value: true },
    seoKeyword: "個室",
    titleTemplate: "{area}の完全個室パーソナルジム",
    descriptionTemplate: "{area}で完全個室のパーソナルジムを比較。周りの目を気にせずトレーニングしたい方に。",
  },
  {
    slug: "refund",
    label: "返金保証あり",
    shortLabel: "返金保証",
    filter: { type: "boolean", column: "has_refund_guarantee", value: true },
    seoKeyword: "返金保証",
    titleTemplate: "{area}の返金保証付きパーソナルジム",
    descriptionTemplate: "{area}で返金保証付きのパーソナルジムを比較。万が一効果が出なくても安心。",
  },
  {
    slug: "women-only",
    label: "女性専用",
    shortLabel: "女性専用",
    filter: { type: "boolean", column: "is_women_only", value: true },
    seoKeyword: "女性専用",
    titleTemplate: "{area}の女性専用パーソナルジム",
    descriptionTemplate: "{area}の女性専用パーソナルジムを比較。男性の目を気にせずトレーニングできるジムを厳選。",
  },
  {
    slug: "meal",
    label: "食事指導あり",
    shortLabel: "食事指導",
    filter: { type: "boolean", column: "options_diet", value: true },
    seoKeyword: "食事指導",
    titleTemplate: "{area}の食事指導付きパーソナルジム",
    descriptionTemplate: "{area}で食事指導付きのパーソナルジムを比較。トレーニングと食事管理で効率よくボディメイク。",
  },
  {
    slug: "hands-free",
    label: "手ぶらOK",
    shortLabel: "手ぶら",
    filter: {
      type: "composite",
      filters: [
        { type: "boolean", column: "options_wear", value: true },
        { type: "boolean", column: "options_shoes", value: true },
      ],
    },
    seoKeyword: "手ぶら",
    titleTemplate: "{area}の手ぶらOKパーソナルジム",
    descriptionTemplate: "{area}でウェア・シューズ無料レンタルの手ぶらで通えるパーソナルジムを比較。仕事帰りに便利。",
  },
  {
    slug: "trial",
    label: "体験トレーニングあり",
    shortLabel: "体験あり",
    filter: { type: "boolean", column: "trial_available", value: true },
    seoKeyword: "体験",
    titleTemplate: "{area}の体験できるパーソナルジム",
    descriptionTemplate: "{area}で体験トレーニングができるパーソナルジムを比較。まずは無料体験から始めよう。",
  },
];

/** slug → SearchCondition のルックアップ */
export const CONDITION_MAP = new Map(
  GYM_CONDITIONS.map((c) => [c.slug, c])
);

/** 有効な条件slugの一覧 */
export const VALID_CONDITION_SLUGS = new Set(GYM_CONDITIONS.map((c) => c.slug));
