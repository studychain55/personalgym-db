import type { GetServerSidePropsContext } from "next";

/**
 * CDNキャッシュヘッダーを設定する
 * - s-maxage=3600: CDNで1時間キャッシュ
 * - stale-while-revalidate=86400: 期限切れ後も24時間はstaleを返しつつバックグラウンドで再生成
 */
export const setCacheHeaders = (res: GetServerSidePropsContext["res"]) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
};

/**
 * 市区町村レベルのリストページ用CDNキャッシュヘッダー
 * - s-maxage=14400: CDNで4時間キャッシュ
 * - stale-while-revalidate=86400: 期限切れ後も24時間はstaleを返しつつバックグラウンドで再生成
 */
export const setMediumCacheHeaders = (
  res: GetServerSidePropsContext["res"]
) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=14400, stale-while-revalidate=86400"
  );
};

/**
 * 更新頻度が低い安定ルート用のCDNキャッシュヘッダー
 * - s-maxage=86400: CDNで24時間キャッシュ
 * - stale-while-revalidate=604800: 期限切れ後も7日間はstaleを返しつつバックグラウンドで再生成
 */
export const setLongCacheHeaders = (res: GetServerSidePropsContext["res"]) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800"
  );
};

/**
 * ほぼ変更されない静的データ用のCDNキャッシュヘッダー（学校DB詳細ページ等）
 * - s-maxage=259200: CDNで3日間キャッシュ
 * - stale-while-revalidate=1209600: 期限切れ後も14日間はstaleを返しつつバックグラウンドで再生成
 */
export const setVeryLongCacheHeaders = (
  res: GetServerSidePropsContext["res"]
) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=259200, stale-while-revalidate=1209600"
  );
};

/**
 * 空結果用のキャッシュヘッダー（短期）
 * 0件結果はキャッシュしない or 短期キャッシュのみ
 * - s-maxage=300: CDNで5分キャッシュ（短期）
 * - stale-while-revalidate=600: 期限切れ後も10分はstaleを返す
 *
 * 目的: 0件ページが長期キャッシュされるのを防ぐ（迅速な回復を実現）
 * 例: データが追加されると5分で反映される
 */
export const setShortCacheHeadersForZeroResults = (
  res: GetServerSidePropsContext["res"]
) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
};

/**
 * データが空かどうかに基づいてキャッシュヘッダーを条件付きで設定
 * - dataCount > 0: setLongCacheHeaders（24時間）
 * - dataCount == 0: setShortCacheHeadersForZeroResults（5分）
 */
export const setConditionalCacheHeaders = (
  res: GetServerSidePropsContext["res"],
  dataCount: number
) => {
  if (dataCount === 0) {
    setShortCacheHeadersForZeroResults(res);
  } else {
    setLongCacheHeaders(res);
  }
};
