import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import type { ComponentType } from "react";
import NextLink from "next/link";
import Pagination from "@mui/material/Pagination";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbs, JsonLDListPage } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import GymCard from "@/features/gym/components/GymCard";
import {
  PURPOSE_DEFINITIONS,
  getPurposeDefinition,
  type PurposeDefinition,
} from "@/constants/purposes";
import { fetchGymsByPurpose } from "@/utils/supabase/fetchGyms";
import { fetchPrefectureBySlug, fetchRegionByName } from "@/utils/supabase/fetchPrefectures";
import { getRegionName } from "@/utils/regionMapping";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import PrefectureCityPage, {
  getServerSideProps as getPrefectureCityServerSideProps,
} from "@/pages/prefecture/[slug]/[city]/index";
import type { GymListItem } from "@/types";

const PER_PAGE = 20;

type RouteType = "prefectureCity" | "prefecturePurpose" | "regionPurpose";

interface ScopeData {
  name: string;
  basePath: string;
}

interface ScopedPurposePageProps {
  __routeType: "prefecturePurpose" | "regionPurpose";
  scope: ScopeData;
  purpose: PurposeDefinition;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
}

const PAGE_COMPONENTS: Record<"prefectureCity", ComponentType<Record<string, unknown>>> = {
  prefectureCity: PrefectureCityPage as unknown as ComponentType<Record<string, unknown>>,
};

async function injectRouteType<T extends object>(
  result: GetServerSidePropsResult<T>,
  routeType: RouteType,
) {
  if (!("props" in result)) {
    return result;
  }

  const props = await result.props;

  return {
    ...result,
    props: {
      ...props,
      __routeType: routeType,
    },
  };
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const dynamicRoute = String(context.params?.dynamicRoute || "");
  const subroute = String(context.params?.subroute || "");
  const page = Math.max(1, parseInt(String(context.query.page || "1"), 10) || 1);

  if (dynamicRoute.startsWith("p-")) {
    const prefectureSlug = dynamicRoute.slice(2);

    if (subroute.startsWith("c-")) {
      return injectRouteType(
        await getPrefectureCityServerSideProps({
          ...context,
          params: {
            ...context.params,
            slug: prefectureSlug,
            city: subroute.slice(2),
          },
        }),
        "prefectureCity",
      );
    }

    const purpose = getPurposeDefinition(subroute);
    if (purpose) {
      const prefecture = await fetchPrefectureBySlug(prefectureSlug);
      if (!prefecture) {
        return { notFound: true };
      }

      const result = await fetchGymsByPurpose({
        prefectureId: prefecture.id,
        page,
        limit: PER_PAGE,
        purposeSlug: purpose.slug,
      });

      setConditionalCacheHeaders(context.res, result.totalCount);

      return {
        props: {
          __routeType: "prefecturePurpose",
          scope: {
            name: prefecture.title,
            basePath: `/p-${prefecture.slug}/`,
          },
          purpose,
          gyms: result.gyms,
          totalCount: result.totalCount,
          page,
        },
      };
    }
  }

  if (dynamicRoute.startsWith("r-")) {
    const purpose = getPurposeDefinition(subroute);
    const regionSlug = dynamicRoute.slice(2);
    const regionName = getRegionName(regionSlug);

    if (!purpose || !regionName) {
      return { notFound: true };
    }

    const region = await fetchRegionByName(regionName);
    if (!region) {
      return { notFound: true };
    }

    const result = await fetchGymsByPurpose({
      regionId: region.id,
      page,
      limit: PER_PAGE,
      purposeSlug: purpose.slug,
    });
    setConditionalCacheHeaders(context.res, result.totalCount);

    return {
      props: {
        __routeType: "regionPurpose",
        scope: {
          name: region.name,
          basePath: `/r-${regionSlug}/`,
        },
        purpose,
        gyms: result.gyms,
        totalCount: result.totalCount,
        page,
      },
    };
  }

  return { notFound: true };
};

function ScopedPurposePage({
  scope,
  purpose,
  gyms,
  totalCount,
  page,
}: ScopedPurposePageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const pagePath = `${scope.basePath}${purpose.slug}/`;
  const title = `${scope.name}の${purpose.seoTitleSuffix}`;
  const description = `${scope.name}で${purpose.description} パーソナルジム${totalCount.toLocaleString()}件を比較できます。`;
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: scope.name, href: scope.basePath },
    { label: purpose.shortLabel },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: pagePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${title}${page > 1 ? `（${page}ページ目）` : ""}`}
        description={description}
        path={`${pagePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={title}
        description={description}
        path={pagePath}
        items={gyms}
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {title}
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3">{purpose.intro}</p>

        <section className="mt-8 rounded-xl border border-[#ffedd5] bg-[#fff7ed] p-5">
          <h2 className="text-lg font-bold text-gray-900">他の目的から探す</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {PURPOSE_DEFINITIONS.map((item) => (
              <NextLink
                key={item.slug}
                href={`${scope.basePath}${item.slug}/`}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium no-underline transition-colors ${
                  item.slug === purpose.slug
                    ? "border-[#ea580c] bg-[#ea580c] text-white"
                    : "border-orange-200 bg-white text-[#ea580c] hover:bg-orange-100"
                }`}
              >
                {item.shortLabel}
              </NextLink>
            ))}
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-lg font-bold text-gray-900">この条件に合うジムはまだ掲載されていません。</p>
            <p className="mt-2 text-sm text-gray-600">
              条件を変える場合は親一覧や全国一覧から再検索できます。
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <NextLink
                href={scope.basePath}
                className="inline-flex items-center rounded-lg bg-[#ea580c] px-4 py-2 text-sm font-medium text-white no-underline hover:bg-[#165c21] transition-colors"
              >
                親一覧へ戻る
              </NextLink>
              <NextLink
                href="/all/"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 no-underline hover:bg-gray-50 transition-colors"
              >
                全国一覧を見る
              </NextLink>
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              size="large"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function DynamicSubroutePage(
  props: Record<string, unknown> & { __routeType: RouteType },
) {
  if (props.__routeType === "prefectureCity") {
    const { __routeType, ...pageProps } = props;
    const PageComponent = PAGE_COMPONENTS[__routeType];
    return <PageComponent {...pageProps} />;
  }

  return <ScopedPurposePage {...(props as unknown as ScopedPurposePageProps)} />;
}
