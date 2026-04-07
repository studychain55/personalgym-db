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
import { fetchGymsByFeature, fetchAllFeatures } from "@/utils/supabase/fetchFeatures";
import { fetchPrefectures } from "@/utils/supabase/fetchPrefectures";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, GymFaq } from "@/types";

const PER_PAGE = 20;

interface FeaturePageProps {
  feature: { slug: string; label: string };
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  topRatedGyms: GymListItem[];
  faqs: GymFaq[];
}

/**
 * Generate dynamic FAQs for feature page
 */
function generateFeatureFaqs(featureName: string, totalCount: number): GymFaq[] {
  return [
    {
      id: 1,
      gym_id: null,
      question: `「${featureName}」のプログラムがあるパーソナルジムの料金相場は？`,
      answer: `${featureName}プログラムを提供しているパーソナルジムの料金は、1回あたり5,000円～15,000円が相場です。入会金は0円～50,000円程度となっています。体験レッスンは1,000円～5,000円で受けられるジムが多いため、まずは体験から始めることをおすすめします。`,
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: `${featureName}プログラムで評判のいいパーソナルジムは？`,
      answer: `${totalCount}件のパーソナルジムが${featureName}プログラムを提供しています。評価が高いジムを確認することで、実績が豊富なジムから選べます。各ジムの詳細ページで実際の利用者の口コミも確認できるため、参考にしてください。`,
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: `${featureName}プログラムに食事指導は含まれていますか？`,
      answer: `多くのジムでは${featureName}プログラムに食事指導をオプションで追加できます。食事指導の有無は各ジムによって異なるため、当サイトの各ジム詳細ページで確認することをおすすめします。短期間での成果を望む場合は、食事指導付きのプランを選ぶことが重要です。`,
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: `初心者でも${featureName}プログラムに参加できますか？`,
      answer: `もちろんです。${featureName}プログラムは、初心者から上級者まで対応しているジムがほとんどです。パーソナルトレーニングなので、個人の体力レベルに合わせてプログラムをカスタマイズしてくれます。まずは無料体験を受けて、トレーナーに現在の状態と目標を相談することをおすすめします。`,
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: `${featureName}プログラムの効果は期待できますか？`,
      answer: `${featureName}プログラムは実績が豊富で、多くの人が目標を達成しています。効果を最大化するには、正しいトレーニングと食事管理の組み合わせが重要です。当サイトで掲載されているジムのビフォーアフターや口コミを参考にして、実績のあるジムを選ぶことが成功の鍵です。`,
      sort_order: 5,
      is_global: false,
    },
  ];
}

export const getServerSideProps: GetServerSideProps<FeaturePageProps> = async ({
  params,
  query,
  res,
}) => {
  const featureSlug = String(params?.feature || "");
  const allFeatures = await fetchAllFeatures();
  const feature = allFeatures.find((f) => f.slug === featureSlug);

  if (!feature) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const result = await fetchGymsByFeature(featureSlug, page, PER_PAGE);

  // Fetch top rated gyms for this feature
  const topRatedResult = await fetchGymsByFeature(featureSlug, 1, 5);

  // Generate FAQs dynamically
  const faqs: GymFaq[] = generateFeatureFaqs(feature.label, result.totalCount);

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      feature,
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      topRatedGyms: topRatedResult.gyms
        .sort((a, b) => (b.review_average_rating || 0) - (a.review_average_rating || 0))
        .slice(0, 5),
      faqs,
    },
  };
};

export default function FeaturePage({
  feature,
  gyms,
  totalCount,
  page,
  topRatedGyms,
  faqs,
}: FeaturePageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/f-${feature.slug}/`;
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: `${feature.label}` },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${feature.label}のパーソナルジム${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`${feature.label}のパーソナルジム${totalCount}件を比較。料金・口コミ・特徴で${feature.label}のあなたにぴったりのジムが見つかる。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={`${feature.label}のパーソナルジム`}
        description={`${feature.label}のパーソナルジム一覧`}
        path={basePath}
        items={gyms}
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />
      <JsonLDFaq faqs={faqs} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {feature.label}のパーソナルジム
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3">
          {feature.label}プログラムを提供しているパーソナルジムを比較。料金・体験・食事指導・評価で
          {feature.label}のあなたにぴったりのジムが見つかります。
        </p>

        {/* SEO Description Section */}
        <section className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {feature.label}のパーソナルジムについて
          </h2>
          <p className="text-gray-700 mb-2">
            {feature.label}は、パーソナルジムの主要なプログラムの一つです。専門的なトレーナーによるマンツーマン指導で、{totalCount}
            件のジムが${feature.label}プログラムを提供しており、効率的に目標を達成することができます。
          </p>
          <p className="text-gray-700 mb-2">
            料金・入会金・食事指導の有無など、ジムごとに特徴が異なります。体験レッスンを受けて、自分に合ったジムを見つけることをおすすめします。
          </p>
          <p className="text-gray-700">
            当サイトでは、${feature.label}プログラムを提供する主要パーソナルジムを掲載しており、口コミ・評価・料金を一覧で比較できます。
          </p>
        </section>

        {/* Top Rated Gyms Section */}
        {topRatedGyms.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {feature.label}プログラムの人気ジム（評価順Top5）
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
                href={`/${purpose.slug}/`}
                className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-[#FF6B35] no-underline hover:bg-orange-100 transition-colors"
              >
                {purpose.shortLabel}
              </NextLink>
            ))}
          </div>
        </section>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{feature.label}プログラムのジム一覧</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {feature.label}プログラムを提供するパーソナルジムが見つかりません。
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
              href="/column/gym-muscle/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                筋トレ効果を高めるパーソナルジム活用法
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                有酸素運動との組み合わせと筋肥大のコツ。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-senior/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                シニア・50代からのパーソナルジム
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                安全な始め方と健康寿命延伸の効果。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-student/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                学生・20代向けパーソナルジムの選び方
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                費用を抑えるコツと効率的な投資方法。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-continuing/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジムを続けるコツ
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                モチベーション維持と挫折防止の実践的方法。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-compare/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジムを複数比較する方法
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                体験レッスン活用と最適なジム選びの方法。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-rebound/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジム卒業後のリバウンド防止
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                食事管理と継続トレーニングでリバウンド防止。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-age/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#FF6B35] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                40代・50代からのパーソナルジム
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                年齢別の効果と安全な始め方を完全解説。
              </p>
            </NextLink>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {feature.label}のパーソナルジムについてよくある質問
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
