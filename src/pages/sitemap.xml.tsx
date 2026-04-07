import type { GetServerSideProps } from "next";
import { baseSiteUrl } from "@/utils/config";
import { fetchAllGymUids } from "@/utils/supabase/fetchGyms";
import { fetchPrefectures } from "@/utils/supabase/fetchPrefectures";
import { fetchAllFeatures, fetchAllCitiesWithCount } from "@/utils/supabase/fetchFeatures";

function SitemapXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [gyms, prefectures, features, cities] = await Promise.all([
    fetchAllGymUids(),
    fetchPrefectures(),
    fetchAllFeatures(),
    fetchAllCitiesWithCount(),
  ]);

  const today = new Date().toISOString().split("T")[0];

  const urls = [
    { loc: "/", changefreq: "daily", priority: "1.0" },
    { loc: "/all/", changefreq: "daily", priority: "0.8" },
    { loc: "/area/", changefreq: "weekly", priority: "0.75" },
    { loc: "/brand/", changefreq: "weekly", priority: "0.75" },
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
