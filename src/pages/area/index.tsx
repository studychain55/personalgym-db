import type { GetServerSideProps } from "next";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbs } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { fetchRegionsWithPrefecturesAndCities } from "@/utils/supabase/fetchCities";
import { setLongCacheHeaders } from "@/utils/cacheHeaders";
import type { RegionWithPrefecturesAndCities } from "@/types";

interface AreaPageProps {
  regions: RegionWithPrefecturesAndCities[];
  totalGymCount: number;
}

export const getServerSideProps: GetServerSideProps<AreaPageProps> = async ({ res }) => {
  const regions = await fetchRegionsWithPrefecturesAndCities();
  const totalGymCount = regions.reduce(
    (sum, r) => sum + r.prefectures.reduce((s, p) => s + p.gym_count, 0),
    0
  );

  setLongCacheHeaders(res);

  return { props: { regions, totalGymCount } };
};

export default function AreaPage({ regions, totalGymCount }: AreaPageProps) {
  const breadcrumbItems = [{ label: "エリアから探す" }];

  return (
    <Layout>
      <SEO
        title="エリアからパーソナルジムを探す"
        description={`全国${totalGymCount.toLocaleString()}件のパーソナルジムをエリア別に検索。都道府県・市区町村からあなたの近くのパーソナルジムを探せます。`}
        path="/area/"
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          エリアからパーソナルジムを探す
          <span className="text-base font-normal text-gray-500 ml-2">
            (全国{totalGymCount.toLocaleString()}件)
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3">
          都道府県・市区町村からパーソナルジムを検索できます。お住まいの地域や通いやすいエリアから、あなたにぴったりのジムを見つけましょう。
        </p>

        <div className="mt-8 space-y-10">
          {regions.map((region) => (
            <section key={region.id}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#FF6B35]">
                {region.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {region.prefectures.map((pref) => (
                  <div
                    key={pref.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#FF6B35] transition-colors"
                  >
                    <NextLink
                      href={`/p-${pref.slug}/`}
                      className="text-lg font-bold text-gray-900 hover:text-[#FF6B35] no-underline transition-colors"
                    >
                      {pref.title}
                      {pref.gym_count > 0 && (
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          ({pref.gym_count}件)
                        </span>
                      )}
                    </NextLink>
                    {pref.cities.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {pref.cities.slice(0, 10).map((city) => (
                          <NextLink
                            key={city.id}
                            href={`/p-${pref.slug}/c-${city.slug}/`}
                            className="text-sm text-gray-600 hover:text-[#FF6B35] no-underline transition-colors"
                          >
                            {city.title}
                            <span className="text-xs text-gray-400 ml-0.5">
                              ({city.gym_count})
                            </span>
                          </NextLink>
                        ))}
                        {pref.cities.length > 10 && (
                          <NextLink
                            href={`/p-${pref.slug}/`}
                            className="text-sm text-[#FF6B35] hover:underline no-underline"
                          >
                            他{pref.cities.length - 10}エリア →
                          </NextLink>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
