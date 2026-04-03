import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import GymListSection from "@/components/gym/GymListSection";
import ConditionLinks from "@/components/gym/ConditionLinks";
import CityLinks from "@/components/gym/CityLinks";
import InlineCTA from "@/components/cta/InlineCTA";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchPrefectureBySlug } from "@/utils/supabase/fetchPrefectures";
import { fetchCitiesWithCounts, type CityWithCount } from "@/utils/supabase/fetchCities";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import { shouldNoindex } from "@/utils/zeroResults";
import type { GymListItem, Prefecture } from "@/types";

const PER_PAGE = 20;

interface Props {
  prefecture: Prefecture;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  cities: CityWithCount[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
  res,
}) => {
  const slug = String(params?.prefectureSlug || "");
  const prefecture = await fetchPrefectureBySlug(slug);
  if (!prefecture) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);

  const [result, cities] = await Promise.all([
    fetchGyms({ prefectureId: prefecture.id, page, limit: PER_PAGE }),
    fetchCitiesWithCounts(prefecture.id),
  ]);

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      prefecture,
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      cities,
    },
  };
};

export default function PrefectureAreaPage({ prefecture, gyms, totalCount, page, cities }: Props) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/gym/area/${prefecture.slug}/`;
  const noindex = shouldNoindex(totalCount, page > 1);

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${prefecture.title}のパーソナルジム${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`${prefecture.title}のパーソナルジム${totalCount}件を料金・口コミ・特徴で徹底比較。あなたにぴったりのジムが見つかる。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={noindex}
      />
      {!noindex && (
        <JsonLDListPage
          title={`${prefecture.title}のパーソナルジム`}
          description={`${prefecture.title}のパーソナルジム一覧`}
          path={basePath}
          items={gyms}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: "ジム一覧", href: "/all/" },
            { label: prefecture.title },
          ]}
        />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {prefecture.title}のパーソナルジム
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>

        {/* 条件で絞り込むリンク */}
        <ConditionLinks
          prefectureSlug={prefecture.slug}
          areaName={prefecture.title}
        />

        {/* 市区町村リンク */}
        {cities.length > 0 && (
          <CityLinks
            prefectureSlug={prefecture.slug}
            cities={cities}
          />
        )}

        {/* CTA: ファーストビュー */}
        <InlineCTA areaName={prefecture.title} className="mt-6" />

        {/* ジム一覧 */}
        <div className="mt-6">
          <GymListSection
            gyms={gyms}
            totalCount={totalCount}
            enableRanking={page === 1}
          />
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {prefecture.title}にはまだパーソナルジムが登録されていません。
          </div>
        )}

        {/* CTA: 中盤 */}
        {gyms.length > 6 && (
          <InlineCTA areaName={prefecture.title} variant="secondary" className="mt-8" />
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

        {/* SEOテキスト */}
        <section className="mt-10 prose prose-gray max-w-none text-gray-600">
          <h2 className="text-lg font-bold text-gray-900">
            {prefecture.title}でパーソナルジムを選ぶポイント
          </h2>
          <p>
            {prefecture.title}には{totalCount}件のパーソナルジムがあります。
            料金プラン、トレーナーの質、アクセスの良さ、食事指導の有無などを比較して、
            あなたの目標に合ったジムを選びましょう。
            まずは無料カウンセリングや体験トレーニングで実際の雰囲気を確認することをおすすめします。
          </p>
        </section>
      </div>
    </Layout>
  );
}
