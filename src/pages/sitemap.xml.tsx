import type { GetServerSideProps } from "next";
import { baseSiteUrl } from "@/utils/config";
import { fetchAllGymUids } from "@/utils/supabase/fetchGyms";
import { fetchPrefectures, fetchRegionsWithPrefectureCounts } from "@/utils/supabase/fetchPrefectures";
import { fetchAllFeatures, fetchAllCitiesWithCount } from "@/utils/supabase/fetchFeatures";
import { fetchAllStationsWithCount } from "@/utils/supabase/fetchStations";
import { getRegionSlug } from "@/utils/regionMapping";

function SitemapXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [gyms, prefectures, regions, features, cities, stations] = await Promise.all([
    fetchAllGymUids(),
    fetchPrefectures(),
    fetchRegionsWithPrefectureCounts(),
    fetchAllFeatures(),
    fetchAllCitiesWithCount(),
    fetchAllStationsWithCount(),
  ]);

  const today = new Date().toISOString().split("T")[0];

  const regionUrls = regions
    .map((region) => {
      const slug = getRegionSlug(region.name);
      return slug
        ? {
            loc: `/r-${slug}/`,
            changefreq: "weekly" as const,
            priority: "0.75",
          }
        : null;
    })
    .filter((url) => url !== null);

  const urls = [
    { loc: "/", changefreq: "daily", priority: "1.0" },
    { loc: "/all/", changefreq: "daily", priority: "0.8" },
    { loc: "/area/", changefreq: "weekly", priority: "0.75" },
    { loc: "/brand/", changefreq: "weekly", priority: "0.75" },
    { loc: "/station/", changefreq: "weekly", priority: "0.75" },
    { loc: "/guide/", changefreq: "monthly", priority: "0.8" },
    { loc: "/column/", changefreq: "weekly", priority: "0.8" },
    { loc: "/column/gym-beginner/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-cost/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-choosing/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-trainer/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-bodymake/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/diet-gym/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-diet/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/training-frequency/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-nutrition/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/women-gym/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-trial/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-price/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-muscle/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-senior/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-student/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-continuing/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-compare/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-rebound/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-age/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-shokuji/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-online/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-kuchikomi/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-tanki/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-women-50/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-stretch/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-back/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-metabolic/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-sport/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-trial/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-protein/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-fascia/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-facility/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-diet-success/", changefreq: "monthly", priority: "0.7" },
    { loc: "/column/gym-injury/", changefreq: "monthly", priority: "0.7" },
    ...regionUrls,
    ...prefectures.map((p) => ({
      loc: `/p-${p.slug}/`,
      changefreq: "weekly" as const,
      priority: "0.75",
    })),
    ...features.map((f) => ({
      loc: `/f-${f.slug}/`,
      changefreq: "weekly" as const,
      priority: "0.70",
    })),
    ...cities.map((c) => ({
      loc: `/c-${c.slug}/`,
      changefreq: "weekly" as const,
      priority: "0.70",
    })),
    ...stations.map((s) => ({
      loc: `/station/${encodeURIComponent(s.station)}/`,
      changefreq: "weekly" as const,
      priority: "0.70",
    })),
    ...gyms.flatMap((g) => [
      {
        loc: `/gym/${g.uid}/`,
        changefreq: "monthly" as const,
        priority: "0.6",
      },
      {
        loc: `/gym/${g.uid}/reviews/`,
        changefreq: "weekly" as const,
        priority: "0.5",
      },
    ]),
  ];

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
