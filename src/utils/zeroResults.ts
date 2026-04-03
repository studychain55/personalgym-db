/**
 * 0件ページ・空ランキング制御ユーティリティ
 *
 * 他カテゴリにも横展開できる共通設計:
 * - MIN_COUNT_FOR_PAGE: ページ生成に必要な最低掲載件数
 * - MIN_COUNT_FOR_RANKING: ランキング表示に必要な最低件数
 * - shouldNoindex: noindex判定
 * - getDisplayMode: 表示モード判定（ranking / list / redirect / noindex）
 */

/** ページを生成する最低掲載件数 */
export const MIN_COUNT_FOR_PAGE = 3;

/** ランキング表示する最低件数 */
export const MIN_COUNT_FOR_RANKING = 3;

/** ページ内セクション表示の最低件数 */
export const MIN_COUNT_FOR_SECTION = 1;

export type DisplayMode = "ranking" | "list" | "empty_with_suggestions" | "noindex" | "redirect";

/**
 * 掲載件数に基づいて表示モードを判定
 */
export function getDisplayMode(count: number): DisplayMode {
  if (count === 0) return "empty_with_suggestions";
  if (count < MIN_COUNT_FOR_PAGE) return "list"; // 少数件数はランキングではなく一覧
  if (count < MIN_COUNT_FOR_RANKING) return "list";
  return "ranking";
}

/**
 * noindexにすべきか判定
 */
export function shouldNoindex(count: number, isPageTwo: boolean = false): boolean {
  if (isPageTwo) return true;
  if (count === 0) return true;
  return false;
}

/**
 * リダイレクト先を決定（0件ページ用）
 * 市区町村が0件 → 都道府県ページ
 * 都道府県×条件が0件 → 都道府県ページ
 */
export function getRedirectTarget(params: {
  prefectureSlug: string;
  citySlug?: string;
  conditionSlug?: string;
  count: number;
}): string | null {
  const { prefectureSlug, citySlug, conditionSlug, count } = params;
  if (count > 0) return null;

  // 市区町村×条件 → 都道府県×条件
  if (citySlug && conditionSlug) {
    return `/gym/${prefectureSlug}/${conditionSlug}/`;
  }
  // 市区町村 → 都道府県
  if (citySlug) {
    return `/gym/${prefectureSlug}/`;
  }
  // 都道府県×条件 → 都道府県
  if (conditionSlug) {
    return `/gym/${prefectureSlug}/`;
  }

  return null;
}

/**
 * ランキングセクションの表示可否
 * 0件 → 非表示、1-2件 → 一覧に切替、3件以上 → ランキング
 */
export function getRankingSectionMode(count: number): "hidden" | "list" | "ranking" {
  if (count === 0) return "hidden";
  if (count < MIN_COUNT_FOR_RANKING) return "list";
  return "ranking";
}
