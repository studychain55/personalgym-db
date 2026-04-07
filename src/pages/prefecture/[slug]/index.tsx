import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbs, JsonLDListPage, JsonLDFaq } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { PURPOSE_DEFINITIONS } from "@/constants/purposes";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchPrefectureBySlug } from "@/utils/supabase/fetchPrefectures";
import { fetchCitiesWithCountByPrefecture } from "@/utils/supabase/fetchCities";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, Prefecture, CityWithCount, GymFaq } from "@/types";

const PER_PAGE = 20;

interface PrefecturePageProps {
  prefecture: Prefecture;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  topRatedGyms: GymListItem[];
  cities: CityWithCount[];
  faqs: GymFaq[];
}

export const getServerSideProps: GetServerSideProps<PrefecturePageProps> = async ({
  params,
  query,
  res,
}) => {
  const slug = String(params?.slug || "");
  const prefecture = await fetchPrefectureBySlug(slug);
  if (!prefecture) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const result = await fetchGyms({ prefectureId: prefecture.id, page, limit: PER_PAGE });
  const topRatedResult = await fetchGyms({
    prefectureId: prefecture.id,
    sortBy: "rating",
    limit: 5,
  });
  const cities = await fetchCitiesWithCountByPrefecture(prefecture.id);

  // Generate FAQs dynamically
  const faqs: GymFaq[] = generatePrefectureFaqs(prefecture.title, result.totalCount);

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      prefecture,
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      topRatedGyms: topRatedResult.gyms,
      cities,
      faqs,
    },
  };
};

/**
 * Generate dynamic FAQs for prefecture page
 */
function generatePrefectureFaqs(prefectureName: string, totalCount: number): GymFaq[] {
  return [
    {
      id: 1,
      gym_id: null,
      question: `${prefectureName}のパーソナルジムの料金相場は？`,
      answer: `${prefectureName}のパーソナルジムの料金は、1回あたり5,000円～15,000円が相場です。入会金は0円～50,000円程度となっています。体験レッスンは1,000円～5,000円で受けられるジムが多いため、まずは体験から始めることをおすすめします。`,
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: `${prefectureName}でおすすめのパーソナルジムは？`,
      answer: `${prefectureName}には${totalCount}件のパーソナルジムが登録されています。評価が高いジムを「人気ジム」セクションで表示しているので、そちらをご参照ください。また、目的別（ダイエット・女性向けなど）で探すことで、あなたにぴったりのジムが見つかりやすくなります。`,
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: `${prefectureName}のパーソナルジムで女性向けプランはありますか？`,
      answer: `${prefectureName}の多くのパーソナルジムで女性向けプランや女性専用レッスンを提供しています。当サイトで「女性向け」のタグが付いているジムを検索することで、女性向けプランがあるジムが簡単に見つかります。`,
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: `初心者でもパーソナルジムに通えますか？`,
      answer: `もちろんです。むしろ初心者こそパーソナルトレーニングがおすすめです。専門的なトレーナーが正しいフォームを指導してくれるので、怪我のリスクが低く、効果的に身体を変えることができます。当サイトで「初心者向け」タグが付いているジムから選ぶと、初心者向けのプログラムが充実しているジムが見つかります。`,
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: `パーソナルジムで本当に痩せられますか？`,
      answer: `正しいトレーニングと栄養指導を組み合わせることで、多くの人が目標の体重に到達しています。特に「食事指導」が付いているパーソナルジムを選ぶことが重要です。実績が気になる場合は、ジムの詳細ページでビフォーアフターや口コミを確認してください。`,
      sort_order: 5,
      is_global: false,
    },
  ];
}

export default function PrefecturePage({
  prefecture,
  gyms,
  totalCount,
  page,
  topRatedGyms,
  cities,
  faqs,
}: PrefecturePageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/p-${prefecture.slug}/`;
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: `${prefecture.title}` },
  ];

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
      <JsonLDBreadcrumbs items={breadcrumbItems} />
      <JsonLDFaq faqs={faqs} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {prefecture.title}のパーソナルジム
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3">
          {prefecture.title}で料金・体験・食事指導・目的別の違いを比較しやすいように、主要情報が分かるジムを一覧化しています。
        </p>

        {/* SEO Description Section */}
        <section className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {prefecture.title}のパーソナルジムについて
          </h2>
          <p className="text-gray-700 mb-2">
            {prefecture.title}には、ダイエット・ボディメイク・健康増進など、様々な目的に対応したパーソナルジムが{totalCount}
            件あります。プロのトレーナーによるマンツーマン指導で、効率的に目標を達成することができます。
          </p>
          <p className="text-gray-700 mb-2">
            料金・入会金・食事指導の有無など、ジムごとに特徴が異なります。体験レッスンを受けて、自分に合ったジムを見つけることをおすすめします。
          </p>
          <p className="text-gray-700">
            当サイトでは、{prefecture.title}の主要パーソナルジムを掲載しており、口コミ・評価・料金を一覧で比較できます。
          </p>
        </section>

        {/* Top Rated Gyms Section */}
        {topRatedGyms.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {prefecture.title}の人気ジム（評価順Top5）
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRatedGyms.map((gym, index) => (
                <div key={gym.id} className="relative">
                  <div className="absolute -top-2 -left-2 bg-yellow-400 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <GymCard gym={gym} />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 rounded-xl border border-orange-100 bg-orange-50/70 p-5">
          <h2 className="text-lg font-bold text-gray-900">目的から探す</h2>
          <p className="text-sm text-gray-600 mt-2">
            「ダイエット」「女性向け」「初心者向け」など、検討目的に近い一覧へすぐ移動できます。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PURPOSE_DEFINITIONS.map((purpose) => (
              <NextLink
                key={purpose.slug}
                href={`${basePath}${purpose.slug}/`}
                className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-[#FF6B35] no-underline hover:bg-orange-100 transition-colors"
              >
                {purpose.shortLabel}
              </NextLink>
            ))}
          </div>
        </section>

        {/* Cities Links Section */}
        {cities.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {prefecture.title}の市区町村から探す
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.slice(0, 10).map((city) => (
                <NextLink
                  key={city.id}
                  href={`${basePath}c-${city.slug}/`}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 transition-colors"
                >
                  {city.title}
                  <span className="ml-1 text-xs text-gray-500">({city.gym_count})</span>
                </NextLink>
              ))}
              {cities.length > 10 && (
                <span className="text-sm text-gray-500 px-3 py-2">
                  他 {cities.length - 10} 市区町村
                </span>
              )}
            </div>
          </section>
        )}

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{prefecture.title}全体のジム一覧</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Column Articles Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            パーソナルジムのお役立ちコラム
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/column/gym-beginner/", title: "パーソナルジム初心者ガイド｜始め方と選び方" },
              { href: "/column/gym-cost/", title: "パーソナルジムの料金相場｜費用を抑える方法" },
              { href: "/column/gym-choosing/", title: "パーソナルジムの選び方｜失敗しない7つのポイント" },
              { href: "/column/diet-gym/", title: "ダイエット目的のジム選び｜効果的な活用法" },
              { href: "/column/gym-nutrition/", title: "ジムと食事管理｜トレーナーに聞いた栄養ガイド" },
              { href: "/column/training-frequency/", title: "通う頻度の目安｜週何回が最適か" },
            ].map((article) => (
              <NextLink
                key={article.href}
                href={article.href}
                className="block p-4 border border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors no-underline"
              >
                <span className="text-sm font-medium text-orange-600 hover:text-orange-700">
                  {article.title}
                </span>
              </NextLink>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {prefecture.title}のパーソナルジムについてよくある質問
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group border border-gray-300 rounded-lg p-4 hover:border-orange-300 transition-colors"
                >
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                    {faq.question}
                    <span className="ml-2 text-lg group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
