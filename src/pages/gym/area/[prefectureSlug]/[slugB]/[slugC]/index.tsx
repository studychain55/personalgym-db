import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import GymListSection from "@/components/gym/GymListSection";
import EmptySuggestions from "@/components/gym/EmptySuggestions";
import InlineCTA from "@/components/cta/InlineCTA";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchPrefectureBySlug } from "@/utils/supabase/fetchPrefectures";
import { fetchCityBySlug } from "@/utils/supabase/fetchCities";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import { shouldNoindex, getRedirectTarget } from "@/utils/zeroResults";
import { CONDITION_MAP, VALID_CONDITION_SLUGS, GYM_CONDITIONS } from "@/types/conditions";
import type { GymListItem, Prefecture, City } from "@/types";
import type { SearchCondition } from "@/types/conditions";

const PER_PAGE = 20;

interface Props {
  prefecture: Prefecture;
  city: City;
  condition: SearchCondition;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  parentGyms: GymListItem[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
  res,
}) => {
  const prefSlug = String(params?.prefectureSlug || "");
  const slugB = String(params?.slugB || "");
  const slugC = String(params?.slugC || "");

  const prefecture = await fetchPrefectureBySlug(prefSlug);
  if (!prefecture) return { notFound: true };

  // slugB = city, slugC = condition
  if (!VALID_CONDITION_SLUGS.has(slugC)) return { notFound: true };

  const city = await fetchCityBySlug(slugB, prefecture.id);
  if (!city) return { notFound: true };

  const condition = CONDITION_MAP.get(slugC)!;
  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);

  const result = await fetchGyms({
    prefectureId: prefecture.id,
    cityId: city.id,
    conditionFilter: condition.filter,
    page,
    limit: PER_PAGE,
  });

  // 0件リダイレクト: 市区町村×条件 → 都道府県×条件
  const redirectTarget = getRedirectTarget({
    prefectureSlug: prefSlug,
    citySlug: slugB,
    conditionSlug: slugC,
    count: result.totalCount,
  });

  if (redirectTarget) {
    return { redirect: { destination: redirectTarget, permanent: false } };
  }

  let parentGyms: GymListItem[] = [];
  if (result.totalCount === 0) {
    const parentResult = await fetchGyms({
      prefectureId: prefecture.id,
      conditionFilter: condition.filter,
      limit: 6,
    });
    parentGyms = parentResult.gyms;
  }

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      prefecture,
      city,
      condition: { ...condition, filter: condition.filter },
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      parentGyms,
    },
  };
};

export default function CityConditionPage({
  prefecture,
  city,
  condition,
  gyms,
  totalCount,
  page,
  parentGyms,
}: Props) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const areaName = `${prefecture.title}${city.title}`;
  const basePath = `/gym/area/${prefecture.slug}/${city.slug}/${condition.slug}/`;
  const noindex = shouldNoindex(totalCount, page > 1);

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  const pageTitle = condition.titleTemplate.replace("{area}", areaName);
  const pageDescription = condition.descriptionTemplate.replace("{area}", areaName);

  return (
    <Layout>
      <SEO
        title={`${pageTitle}${page > 1 ? `（${page}ページ目）` : ""}`}
        description={pageDescription}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={noindex}
      />
      {!noindex && gyms.length > 0 && (
        <JsonLDListPage
          title={pageTitle}
          description={pageDescription}
          path={basePath}
          items={gyms}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: "ジム一覧", href: "/all/" },
            { label: prefecture.title, href: `/gym/area/${prefecture.slug}/` },
            { label: city.title, href: `/gym/area/${prefecture.slug}/${city.slug}/` },
            { label: condition.label },
          ]}
        />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {pageTitle}
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>

        <InlineCTA areaName={areaName} className="mt-6" />

        {totalCount > 0 ? (
          <>
            <div className="mt-6">
              <GymListSection
                gyms={gyms}
                totalCount={totalCount}
                enableRanking={page === 1}
              />
            </div>

            {gyms.length > 6 && (
              <InlineCTA areaName={areaName} variant="secondary" className="mt-8" />
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  shape="rounded"
                  size="large"
                />
              </div>
            )}
          </>
        ) : (
          <EmptySuggestions
            areaName={pageTitle}
            nearbyGyms={parentGyms}
            parentAreaLink={{
              label: `${prefecture.title}の${condition.label}ジム`,
              href: `/gym/area/${prefecture.slug}/${condition.slug}/`,
            }}
            alternativeLinks={GYM_CONDITIONS.filter(
              (c) => c.slug !== condition.slug
            ).map((c) => ({
              label: c.titleTemplate.replace("{area}", areaName),
              href: `/gym/area/${prefecture.slug}/${city.slug}/${c.slug}/`,
            }))}
          />
        )}
      </div>
    </Layout>
  );
}
