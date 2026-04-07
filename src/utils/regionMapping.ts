/**
 * Region name to slug mapping
 */
export const REGION_SLUG_MAP: Record<string, string> = {
  "北海道": "hokkaido",
  "東北": "tohoku",
  "関東": "kanto",
  "中部": "chubu",
  "近畿": "kinki",
  "中国": "chugoku",
  "四国": "shikoku",
  "九州": "kyushu",
  "沖縄": "okinawa",
};

/**
 * Slug to region name reverse mapping
 */
export const SLUG_TO_REGION_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(REGION_SLUG_MAP).map(([region, slug]) => [slug, region])
);

/**
 * Get slug from region name
 */
export function getRegionSlug(regionName: string): string | undefined {
  return REGION_SLUG_MAP[regionName];
}

/**
 * Get region name from slug
 */
export function getRegionName(slug: string): string | undefined {
  return SLUG_TO_REGION_MAP[slug];
}
