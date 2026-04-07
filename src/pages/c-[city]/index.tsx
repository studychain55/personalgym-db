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
import { fetchGymsByCity, fetchAllCitiesWithCount } from "@/utils/supabase/fetchFeatures";
import { fetchPrefectures } from "@/utils/supabase/fetchPrefectures";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, GymFaq } from "@/types";

const PER_PAGE = 20;

interface CityPageProps {
  city: { id: number; title: string; slug: string; prefecture_id: number };
  prefecture: { id: number; title: string; slug: string } | null;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  faqs: GymFaq[];
}

/**
 * Generate dynamic FAQs for city page
 */
function generateCityFaqs(cityName: string, prefectureName: string | null, totalCount: number): GymFaq[] {
  const prefectureStr = prefectureName ? `（${prefectureName}）` : "";
  const prefectureLink = prefectureName ? `${prefectureName}の` : "";

  return [
    {
      id: 1,
      gym_id: null,
      question: `${cityName}${prefectureStr}のパーソナルジムの料金相場は？`,
      answer: `${cityName}のパーソナルジムの料金は、1回あたり5,000円～15,000円が相場です。入会金は0円～50,000円程度となっています。体験レッスンは1,000円～5,000円で受けられるジムが多いため、まずは体験から始めることをおすすめします。`,
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: `${cityName}でおすすめのパーソナルジムは？`,
      answer: `${cityName}には${totalCount}件のパーソナルジムが登録されています。評価が高いジムや実績が豊富なジムを当サイトで比較できます。各ジムの詳細ページで実際の利用者の口コミも確認できるため、参考にしてください。`,
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
      question: `パーソナルジムで本当に痩せられますか？`,
      answer: `正しいトレーニングと栄養指導を組み合わせることで、多くの人が目標の体重に到達しています。特に「食事指導」が付いているパーソナルジムを選ぶことが重要です。実績が気になる場合は、ジムの詳細ページでビフォーアフターや口コミを確認してください。`,
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
  const citySlug = String(params?.city || "");
  const result = await fetchGymsByCity(citySlug, 1, 1);

  if (!result.city) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const gymResult = await fetchGymsByCity(citySlug, page, PER_PAGE);

  // Fetch prefecture info for breadcrumb
  const prefectures = await fetchPrefectures();
  const prefecture = prefectures.find((p) => p.id === result.city!.prefecture_id) || null;

  // Generate FAQs dynamically
  const faqs: GymFaq[] = generateCityFaqs(result.city.title, prefecture?.title || null, gymResult.totalCount);

  setConditionalCacheHeaders(res, gymResult.totalCount);

  return {
    props: {
      city: {
        id: result.city.id,
        title: result.city.title,
        slug: result.city.slug,
        prefecture_id: result.city.prefecture_id,
      },
      prefecture: prefecture
        ? {
            id: prefecture.id,
            title: prefecture.title,
            slug: prefecture.slug,
          }
        : null,
      gyms: gymResult.gyms,
      totalCount: gymResult.totalCount,
      page,
      faqs,
    },
  };
};

export default function CityPage({
  city,
  prefecture,
  gyms,
  totalCount,
  page,
  faqs,
}: CityPageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/c-${city.slug}/`;
  const prefectureStr = prefecture ? `（${prefecture.title}）` : "";

  const breadcrumbItems = [
    { label: "エリアから探す", href: "/area/" },
    ...(prefecture ? [{ label: prefecture.title, href: `/p-${prefecture.slug}/` }] : []),
    { label: `${city.title}${prefectureStr}` },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${city.title}${prefectureStr}のパーソナルジム${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`${city.title}${prefectureStr}のパーソナルジム${totalCount}件を比較。料金・口コミ・特徴で${city.title}のあなたにぴったりのジムが見つかる。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={`${city.title}${prefectureStr}のパーソナルジム`}
        description={`${city.title}のパーソナルジム一覧`}
        path={basePath}
        items={gyms}
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />
      <JsonLDFaq faqs={faqs} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {city.title}
          {prefectureStr}のパーソナルジム
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
            {city.title}
            {prefectureStr}のパーソナルジムについて
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

        {/* Top 3 Recommended Gyms */}
        {gyms.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {city.title}{prefectureStr}のおすすめジム TOP3
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gyms.slice(0, 3).map((gym, idx) => (
                <NextLink
                  key={gym.id}
                  href={`/gym/${gym.uid}/`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-[#FF6B35] hover:shadow-lg transition"
                >
                  <div className="relative">
                    {gym.image_url && (
                      <img src={gym.image_url} alt={gym.name} className="w-full h-40 object-cover" loading="lazy" />
                    )}
                    <div className="absolute top-2 left-2 bg-[#FF6B35] text-white font-bold text-sm rounded-full w-8 h-8 flex items-center justify-center">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{gym.name}</h3>
                    <div className="text-sm text-gray-600 mb-3">
                      {gym.address && <p className="line-clamp-1 text-xs">📍 {gym.address}</p>}
                      {gym.nearest_station && <p className="line-clamp-1 text-xs">🚃 {gym.nearest_station}駅 徒歩{gym.walk_minutes}分</p>}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      {gym.review_average_rating > 0 && (
                        <span className="text-yellow-600 font-bold">★ {gym.review_average_rating.toFixed(1)}</span>
                      )}
                      {gym.price_min && (
                        <span className="text-[#FF6B35] font-bold">¥{gym.price_min.toLocaleString()}〜</span>
                      )}
                    </div>
                  </div>
                </NextLink>
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
                href={`/${purpose.slug}/`}
                className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-[#FF6B35] no-underline hover:bg-orange-100 transition-colors"
              >
                {purpose.shortLabel}
              </NextLink>
            ))}
          </div>
        </section>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          {city.title}
          {prefectureStr}全体のジム一覧
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* 関連コラム */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">関連コラム</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NextLink
              href="/column/gym-beginner/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジム初心者ガイド
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                初心者がパーソナルジムを選ぶときのポイントと注意点を解説。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-choosing/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジムの選び方
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                あなたに合ったジムを見つけるための選定基準と比較ポイント。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-cost/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジムの費用相場
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                料金相場と費用内訳、安く通うコツについて説明。
              </p>
            </NextLink>
            <NextLink
              href="/column/diet-gym/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                ダイエット目的のパーソナルジム活用法
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                ダイエット成功のための効果的なトレーニング方法。
              </p>
            </NextLink>
            <NextLink
              href="/column/training-frequency/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルトレーニングの頻度
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                目的別のトレーニング頻度と通う期間の目安。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-nutrition/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジムでの食事管理
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                栄養指導と食事改善で結果を出すためのポイント。
              </p>
            </NextLink>
            <NextLink
              href="/column/women-gym/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                女性専用パーソナルジムの選び方
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                女性が安心して通えるパーソナルジムの選び方を解説。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-trial/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                体験入会でジムを賢く選ぼう
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                パーソナルジムの無料体験・体験入会を最大限活用する方法。
              </p>
            </NextLink>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {city.title}
              {prefectureStr}のパーソナルジムについてよくある質問
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
