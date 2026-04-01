import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem } from "@/types";

const PER_PAGE = 20;

interface AllGymsProps {
  gyms: GymListItem[];
  totalCount: number;
  page: number;
}

export const getServerSideProps: GetServerSideProps<AllGymsProps> = async ({ query, res }) => {
  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const result = await fetchGyms({ page, limit: PER_PAGE });

  setConditionalCacheHeaders(res, result.totalCount);

  return { props: { gyms: result.gyms, totalCount: result.totalCount, page } };
};

export default function AllGyms({ gyms, totalCount, page }: AllGymsProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: "/all/", query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`全国のパーソナルジム一覧${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`全国${totalCount.toLocaleString()}件のパーソナルジムを一覧で比較。料金・口コミ・特徴で自分に合ったジムを見つけよう。`}
        path={`/all/${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title="全国のパーソナルジム一覧"
        description="パーソナルジム全件リスト"
        path="/all/"
        items={gyms}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[{ label: "ジム一覧" }]}
        />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          全国のパーソナルジム一覧
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
            パーソナルジムが見つかりませんでした。
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
