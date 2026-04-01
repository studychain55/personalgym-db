import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchPrefectureBySlug } from "@/utils/supabase/fetchPrefectures";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, Prefecture } from "@/types";

const PER_PAGE = 20;

interface PrefecturePageProps {
  prefecture: Prefecture;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
}

export const getServerSideProps: GetServerSideProps<PrefecturePageProps> = async ({
  params,
  query,
  res,
}) => {
  const slug = String(params?.prefectureSlug || "").replace(/^p-/, "");
  const prefecture = await fetchPrefectureBySlug(slug);
  if (!prefecture) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const result = await fetchGyms({ prefectureId: prefecture.id, page, limit: PER_PAGE });

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      prefecture,
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
    },
  };
};

export default function PrefecturePage({ prefecture, gyms, totalCount, page }: PrefecturePageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/p-${prefecture.slug}/`;

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${prefecture.title}のパーソナルジム${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`${prefecture.title}のパーソナルジム${totalCount}件を比較。料金・口コミ・特徴で${prefecture.title}のあなたにぴったりのジムが見つかる。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={`${prefecture.title}のパーソナルジム`}
        description={`${prefecture.title}のパーソナルジム一覧`}
        path={basePath}
        items={gyms}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: "ジム一覧", href: "/all/" },
            { label: `${prefecture.title}` },
          ]}
        />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {prefecture.title}のパーソナルジム
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {prefecture.title}にはまだパーソナルジムが登録されていません。
          </div>
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
      </div>
    </Layout>
  );
}
