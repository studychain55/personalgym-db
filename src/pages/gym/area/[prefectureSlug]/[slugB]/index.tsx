import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import GymListSection from "@/components/gym/GymListSection";
import ConditionLinks from "@/components/gym/ConditionLinks";
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

type PageType = "city" | "condition";

interface Props {
  pageType: PageType;
  prefecture: Prefecture;
  city: City | null;
  condition: SearchCondition | null;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  areaName: string;
  parentGyms: GymListItem[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
  res,
}) => {
  const prefSlug = String(params?.prefectureSlug || "");
  const slugB = String(params?.slugB || "");

  const prefecture = await fetchPrefectureBySlug(prefSlug);
  if (!prefecture) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);

  // slugBが条件slugか市区町村slugか判定
  const isCondition = VALID_CONDITION_SLUGS.has(slugB);
  let city: City | null = null;
  let condition: SearchCondition | null = null;
  let pageType: PageType;

  if (isCondition) {
    pageType = "condition";
    condition = CONDITION_MAP.get(slugB)!;
  } else {
    pageType = "city";
    city = await fetchCityBySlug(slugB, prefecture.id);
    if (!city) return { notFound: true };
  }

  const result = await fetchGyms({
    prefectureId: prefecture.id,
    cityId: city?.id,
    conditionFilter: condition?.filter,
    page,
    limit: PER_PAGE,
  });

  // 0件リダイレクト
  const redirectTarget = getRedirectTarget({
    prefectureSlug: prefSlug,
    citySlug: city?.slug,
    conditionSlug: condition?.slug,
    count: result.totalCount,
  });

  if (redirectTarget) {
    return { redirect: { destination: redirectTarget, permanent: false } };
  }

  // 0件で近隣データ表示用に親エリアのジムを取得
  let parentGyms: GymListItem[] = [];
  if (result.totalCount === 0) {
    const parentResult = await fetchGyms({
      prefectureId: prefecture.id,
      limit: 6,
    });
    parentGyms = parentResult.gyms;
  }

  setConditionalCacheHeaders(res, result.totalCount);

  const areaName = city
    ? `${prefecture.title}${city.title}`
    : prefecture.title;

  return {
    props: {
      pageType,
      prefecture,
      city,
      condition: condition ? { ...condition, filter: condition.filter } : null,
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      areaName,
      parentGyms,
    },
  };
};

export default function SlugBPage({
  pageType,
  prefecture,
  city,
  condition,
  gyms,
  totalCount,
  page,
  areaName,
  parentGyms,
}: Props) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const basePath = `/gym/area/${prefecture.slug}/${city?.slug || condition?.slug}/`;
  const noindex = shouldNoindex(totalCount, page > 1);

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  const pageTitle = condition
    ? condition.titleTemplate.replace("{area}", areaName)
    : `${areaName}のパーソナルジム`;

  const pageDescription = condition
    ? condition.descriptionTemplate.replace("{area}", areaName)
    : `${areaName}のパーソナルジム${totalCount}件を比較。料金・口コミ・特徴であなたにぴったりのジムが見つかる。`;

  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: prefecture.title, href: `/gym/area/${prefecture.slug}/` },
    ...(city ? [{ label: city.title }] : []),
    ...(condition ? [{ label: condition.label }] : []),
  ];

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
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {pageTitle}
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>

        {/* 条件リンク（市区町村ページの場合のみ） */}
        {pageType === "city" && city && (
          <ConditionLinks
            prefectureSlug={prefecture.slug}
            citySlug={city.slug}
            areaName={`${prefecture.title}${city.title}`}
          />
        )}

        {/* CTA */}
        <InlineCTA areaName={areaName} className="mt-6" />

        {/* ジム一覧 or 0件表示 */}
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
              label: prefecture.title,
              href: `/gym/area/${prefecture.slug}/`,
            }}
            alternativeLinks={GYM_CONDITIONS.filter(
              (c) => c.slug !== condition?.slug
            ).map((c) => ({
              label: c.titleTemplate.replace("{area}", prefecture.title),
              href: `/gym/area/${prefecture.slug}/${c.slug}/`,
            }))}
          />
        )}
      </div>
    </Layout>
  );
}
