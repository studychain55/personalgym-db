import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Pagination from "@mui/material/Pagination";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbs, JsonLDListPage } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import GymCard from "@/features/gym/components/GymCard";
import { PURPOSE_DEFINITIONS, getPurposeDefinition, type PurposeDefinition } from "@/constants/purposes";
import { fetchGymsByPurpose } from "@/utils/supabase/fetchGyms";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem } from "@/types";

const PER_PAGE = 20;

interface PurposePageProps {
  purpose: PurposeDefinition;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
}

export const getServerSideProps: GetServerSideProps<PurposePageProps> = async ({
  params,
  query,
  res,
}) => {
  const purposeSlug = String(params?.purpose || "");
  const purpose = getPurposeDefinition(purposeSlug);

  if (!purpose) {
    return { notFound: true };
  }

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const result = await fetchGymsByPurpose({
    page,
    limit: PER_PAGE,
    purposeSlug,
  });

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      purpose,
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
    },
  };
};

export default function PurposePage({
  purpose,
  gyms,
  totalCount,
  page,
}: PurposePageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/${purpose.slug}/`;
  const title = `${purpose.seoTitleSuffix}一覧`;
  const description = `${purpose.description} 全国${totalCount.toLocaleString()}件のパーソナルジムを比較できます。`;
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: purpose.shortLabel },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${title}${page > 1 ? `（${page}ページ目）` : ""}`}
        description={description}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={title}
        description={description}
        path={basePath}
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

        <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <h2 className="text-lg font-bold text-gray-900">比較しやすいポイント</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {purpose.comparisonPoints.map((point) => (
              <span
                key={point}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
              >
                {point}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#ffedd5] bg-[#fff7ed] p-5">
          <h2 className="text-lg font-bold text-gray-900">他の目的から探す</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {PURPOSE_DEFINITIONS.map((item) => (
              <NextLink
                key={item.slug}
                href={`/${item.slug}/`}
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
            <p className="text-lg font-bold text-gray-900">該当するジムはまだ掲載されていません。</p>
            <p className="mt-2 text-sm text-gray-600">
              条件を変えて探す場合は全国一覧やエリア一覧もご利用ください。
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <NextLink
                href="/all/"
                className="inline-flex items-center rounded-lg bg-[#ea580c] px-4 py-2 text-sm font-medium text-white no-underline hover:bg-[#165c21] transition-colors"
              >
                全国一覧を見る
              </NextLink>
              <NextLink
                href="/area/"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 no-underline hover:bg-gray-50 transition-colors"
              >
                エリアから探す
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
