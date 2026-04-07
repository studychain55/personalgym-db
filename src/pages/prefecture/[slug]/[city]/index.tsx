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
import { fetchCityBySlug, fetchCitiesWithCountByPrefecture } from "@/utils/supabase/fetchCities";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, Prefecture, City, CityWithCount, GymFaq } from "@/types";

const PER_PAGE = 20;

interface CityPageProps {
  prefecture: Prefecture;
  city: City;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  otherCities: CityWithCount[];
  faqs: GymFaq[];
}

/**
 * Generate dynamic FAQs for city page
 */
function generateCityFaqs(cityName: string, prefectureName: string, totalCount: number): GymFaq[] {
  return [
    {
      id: 1,
      gym_id: null,
      question: `${cityName}（${prefectureName}）のパーソナルジムの料金相場は？`,
      answer: `${cityName}のパーソナルジムの料金は、1回あたり5,000円～15,000円が相場です。入会金は0円～50,000円程度となっています。体験レッスンは1,000円～5,000円で受けられるジムが多いため、まずは体験から始めることをおすすめします。`,
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: `${cityName}でおすすめのパーソナルジムは？`,
      answer: `${cityName}には${totalCount}件のパーソナルジムが登録されています。評価が高いジムや実績が豊富なジムを「${cityName}全体のジム一覧」で表示しているので、そちらをご参照ください。目的別（ダイエット・女性向けなど）で探すことで、あなたにぴったりのジムが見つかりやすくなります。`,
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: `${cityName}のパーソナルジムで女性向けプランはありますか？`,
      answer: `${cityName}の多くのパーソナルジムで女性向けプランや女性専用レッスンを提供しています。当サイトで「女性向け」のタグが付いているジムを検索することで、女性向けプランがあるジムが簡単に見つかります。`,
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: `${cityName}で初心者向けのパーソナルジムはありますか？`,
      answer: `${cityName}の多くのパーソナルジムが初心者向けプログラムを用意しています。初心者こそパーソナルトレーニングがおすすめです。専門的なトレーナーが正しいフォームを指導してくれるので、怪我のリスクが低く、効果的に身体を変えることができます。当サイトで「初心者向け」タグで検索すると、初心者向けプログラムが充実しているジムが見つかります。`,
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: `${prefectureName}の他のエリアのパーソナルジムも比較したい`,
      answer: `${prefectureName}には複数の市区町村にパーソナルジムが存在します。当サイトのサイドバーやエリア選択から他のエリアを選択すると、別の市区町村のジムを比較できます。${prefectureName}全体で最適なジムを探したい場合は、都道府県ページから検索してください。`,
      sort_order: 5,
      is_global: false,
    },
  ];
}

export const getServerSideProps: GetServerSideProps<CityPageProps> = async ({
  params,
  query,
  res,
}) => {
  const prefSlug = String(params?.slug || "");
  const citySlug = String(params?.city || "");

  const prefecture = await fetchPrefectureBySlug(prefSlug);
  if (!prefecture) return { notFound: true };

  const city = await fetchCityBySlug(citySlug, prefecture.id);
  if (!city) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);

  const [result, otherCities] = await Promise.all([
    fetchGyms({ prefectureId: prefecture.id, cityId: city.id, page, limit: PER_PAGE }),
    fetchCitiesWithCountByPrefecture(prefecture.id),
  ]);

  // Generate FAQs dynamically
  const faqs: GymFaq[] = generateCityFaqs(city.title, prefecture.title, result.totalCount);

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      prefecture,
      city,
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      otherCities: otherCities.filter((c) => c.id !== city.id).slice(0, 12),
      faqs,
    },
  };
};

export default function CityPage({
  prefecture,
  city,
  gyms,
  totalCount,
  page,
  otherCities,
  faqs,
}: CityPageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/p-${prefecture.slug}/c-${city.slug}/`;

  const breadcrumbItems = [
    { label: "エリアから探す", href: "/area/" },
    { label: prefecture.title, href: `/p-${prefecture.slug}/` },
    { label: city.title },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${city.title}（${prefecture.title}）のパーソナルジム${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`${city.title}（${prefecture.title}）のパーソナルジム${totalCount}件を比較。料金・口コミ・特徴で${city.title}のあなたにぴったりのジムが見つかる。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={`${city.title}（${prefecture.title}）のパーソナルジム`}
        description={`${city.title}のパーソナルジム一覧`}
        path={basePath}
        items={gyms}
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />
      <JsonLDFaq faqs={faqs} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {city.title}（{prefecture.title}）のパーソナルジム
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3">
          {city.title}で料金・体験・食事指導・目的別の違いを比較しやすいように、主要情報が分かるジムを一覧化しています。
        </p>

        {/* SEO Description Section */}
        <section className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {city.title}（{prefecture.title}）のパーソナルジムについて
          </h2>
          <p className="text-gray-700 mb-2">
            {city.title}には、ダイエット・ボディメイク・健康増進など、様々な目的に対応したパーソナルジムが{totalCount}
            件あります。プロのトレーナーによるマンツーマン指導で、効率的に目標を達成することができます。
          </p>
          <p className="text-gray-700 mb-2">
            料金・入会金・食事指導の有無など、ジムごとに特徴が異なります。体験レッスンを受けて、自分に合ったジムを見つけることをおすすめします。
          </p>
          <p className="text-gray-700">
            当サイトでは、{city.title}の主要パーソナルジムを掲載しており、口コミ・評価・料金を一覧で比較できます。
          </p>
        </section>

        <section className="mt-6 rounded-xl border border-orange-100 bg-orange-50/70 p-5">
          <h2 className="text-lg font-bold text-gray-900">目的から探す</h2>
          <p className="text-sm text-gray-600 mt-2">
            「ダイエット」「女性向け」「初心者向け」など、検討目的に近い一覧へすぐ移動できます。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PURPOSE_DEFINITIONS.map((purpose) => (
              <NextLink
                key={purpose.slug}
                href={`/p-${prefecture.slug}/${purpose.slug}/`}
                className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-[#FF6B35] no-underline hover:bg-orange-100 transition-colors"
              >
                {purpose.shortLabel}
              </NextLink>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {city.title}にはまだパーソナルジムが登録されていません。
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

        {/* Other cities in the same prefecture */}
        {otherCities.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {prefecture.title}の他のエリア
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <NextLink
                  key={c.id}
                  href={`/p-${prefecture.slug}/c-${c.slug}/`}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 no-underline hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                >
                  {c.title}
                  <span className="text-xs text-gray-400 ml-1">({c.gym_count})</span>
                </NextLink>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {city.title}（{prefecture.title}）のパーソナルジムについてよくある質問
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
