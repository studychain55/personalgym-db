import type { GetServerSideProps } from "next";
import { baseSiteUrl } from "@/utils/config";
import { fetchAllGymUids, fetchGymCount } from "@/utils/supabase/fetchGyms";
import { fetchPrefectures } from "@/utils/supabase/fetchPrefectures";
import { fetchCitiesWithCounts } from "@/utils/supabase/fetchCities";
import { GYM_CONDITIONS } from "@/types/conditions";
import { MIN_COUNT_FOR_PAGE } from "@/utils/zeroResults";

function SitemapXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [gyms, prefectures] = await Promise.all([
    fetchAllGymUids(),
    fetchPrefectures(),
  ]);

  const today = new Date().toISOString().split("T")[0];

  const urls: { loc: string; changefreq: string; priority: string }[] = [
    { loc: "/", changefreq: "daily", priority: "1.0" },
    { loc: "/all/", changefreq: "daily", priority: "0.8" },
  ];

  // 都道府県ページ + 新URL構造
  for (const p of prefectures) {
    // 旧URL（互換）
    urls.push({ loc: `/p-${p.slug}/`, changefreq: "weekly", priority: "0.7" });
    // 新URL
    urls.push({ loc: `/gym/area/${p.slug}/`, changefreq: "weekly", priority: "0.7" });

    // 市区町村ページ（件数がある場合のみ）
    const cities = await fetchCitiesWithCounts(p.id);
    for (const city of cities) {
      if (city.gym_count >= MIN_COUNT_FOR_PAGE) {
        urls.push({
          loc: `/gym/area/${p.slug}/${city.slug}/`,
          changefreq: "weekly",
          priority: "0.6",
        });
      }
    }

    // 条件ページ（データが存在する場合のみ）
    for (const cond of GYM_CONDITIONS) {
      const count = await fetchGymCount({
        prefectureId: p.id,
        conditionFilter: cond.filter,
      });
      if (count >= MIN_COUNT_FOR_PAGE) {
        urls.push({
          loc: `/gym/area/${p.slug}/${cond.slug}/`,
          changefreq: "weekly",
          priority: "0.6",
        });
      }
    }
  }

  // ジム詳細
  for (const g of gyms) {
    urls.push({
      loc: `/gym/${g.uid}/`,
      changefreq: "monthly",
      priority: "0.6",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${baseSiteUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default SitemapXml;
