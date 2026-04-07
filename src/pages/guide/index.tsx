import type { GetServerSideProps } from "next";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbs, JsonLDFaq } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { fetchRegionsWithPrefectureCounts } from "@/utils/supabase/fetchPrefectures";
import { fetchAllFeatures, type FeatureWithCount } from "@/utils/supabase/fetchFeatures";
import { getRegionSlug } from "@/utils/regionMapping";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymFaq, RegionWithPrefectures } from "@/types";

interface GuidePageProps {
  regions: RegionWithPrefectures[];
  features: FeatureWithCount[];
  faqs: GymFaq[];
}

export const getServerSideProps: GetServerSideProps<GuidePageProps> = async ({ res }) => {
  const [regions, features] = await Promise.all([
    fetchRegionsWithPrefectureCounts(),
    fetchAllFeatures(),
  ]);

  // Generate FAQs
  const faqs: GymFaq[] = generateGuideFaqs();

  // Cache this page for a reasonable time
  setConditionalCacheHeaders(res, 1); // Always cache guide pages

  return {
    props: {
      regions,
      features,
      faqs,
    },
  };
};

/**
 * Generate FAQs for guide page
 */
function generateGuideFaqs(): GymFaq[] {
  return [
    {
      id: 1,
      gym_id: null,
      question: "パーソナルジムとフィットネスジムの違いは？",
      answer:
        "フィットネスジムは自分でトレーニングメニューを組み立てて行うのに対し、パーソナルジムはトレーナーがマンツーマンで指導してくれます。正しいフォームで効率的にトレーニングでき、短期間で目標達成できるのがパーソナルジムの特徴です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "パーソナルトレーニングの効果はどのくらいで出ますか？",
      answer:
        "一般的に2～4週間で体の変化を感じ始める人が多いです。ただし効果には個人差があり、トレーニング頻度と食事管理が大きく影響します。週2～3回のトレーニングと食事指導を組み合わせることで、より早く目標達成できます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "パーソナルジムは何回通う必要がありますか？",
      answer:
        "目的によって異なりますが、ダイエットの場合は週2～3回、3～4ヶ月が目安です。週1回でも効果はありますが、変化が遅くなります。多くのジムでは月4回～8回のプランが人気で、自分のペースに合わせて選べます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "食事指導なしでパーソナルジムに通っても効果ありますか？",
      answer:
        "トレーニングだけでも多少の効果は期待できますが、目標達成には食事管理が不可欠です。特にダイエットの場合、トレーニングが3割で食事が7割と言われています。食事指導が付いているジムを選ぶことをおすすめします。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "パーソナルジムで怪我のリスクはありますか？",
      answer:
        "正しいフォームで適切な重量のトレーニングを行えば、怪我のリスクは低いです。むしろパーソナルトレーナーが正しいフォームを指導してくれるため、自己流でトレーニングするより怪我のリスクは低いです。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルジムのカウンセリング・体験は有料ですか？",
      answer:
        "多くのジムでは無料カウンセリングと有料体験（1,000円～5,000円程度）を提供しています。複数のジムの体験を受けることで、自分に合ったジムが見つかりやすくなります。",
      sort_order: 6,
      is_global: false,
    },
  ];
}

export default function GuidePage({
  regions,
  features,
  faqs,
}: GuidePageProps) {
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: "選び方ガイド" },
  ];

  // Get region slugs
  const regionSlugs: Record<string, string> = {};
  regions.forEach((region) => {
    const slug = getRegionSlug(region.name);
    if (slug) {
      regionSlugs[region.name] = slug;
    }
  });

  return (
    <Layout>
      <SEO
        title="パーソナルジムの選び方ガイド | パーソナルジムDB"
        description="パーソナルジムの選び方、料金相場、メリット・デメリット、選ぶポイントを徹底解説。初心者向けの完全ガイドです。"
        path="/guide/"
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />
      <JsonLDFaq faqs={faqs} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          パーソナルジムの選び方ガイド
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          パーソナルジムを選ぶときのポイントをご紹介します。
        </p>

        {/* パーソナルジムとは */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">パーソナルジムとは</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700 mb-3">
              パーソナルジムは、専門的なトレーニング知識を持つトレーナーが、あなたの目標や体力に合わせて、マンツーマンでトレーニング指導を行うジムです。
            </p>
            <p className="text-gray-700 mb-3">
              通常のフィットネスジムでは自分でトレーニングメニューを組み立てる必要がありますが、パーソナルジムではトレーナーが全てをサポートしてくれるため、初心者でも安心です。
            </p>
            <p className="text-gray-700">
              ダイエット、ボディメイク、健康増進など、様々な目的に対応した指導が可能なため、効率的に目標を達成できます。
            </p>
          </div>
        </section>

        {/* 料金の相場 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">料金の相場</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2">入会金</h3>
              <p className="text-gray-700">0円～50,000円</p>
              <p className="text-sm text-gray-600 mt-1">無料のジムも増えています</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2">1回あたりの料金</h3>
              <p className="text-gray-700">5,000円～15,000円</p>
              <p className="text-sm text-gray-600 mt-1">回数制・月額制で変動</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2">体験レッスン</h3>
              <p className="text-gray-700">1,000円～5,000円</p>
              <p className="text-sm text-gray-600 mt-1">無料の場合もあります</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2">月額（目安）</h3>
              <p className="text-gray-700">40,000円～120,000円</p>
              <p className="text-sm text-gray-600 mt-1">月4～8回のプランが主流</p>
            </div>
          </div>
          <p className="text-gray-700">
            料金はジムの場所、設備、トレーナーの経歴によって大きく異なります。初めは複数のジムで体験を受けて、自分の予算と目標に合ったジムを選ぶことをおすすめします。
          </p>
        </section>

        {/* メリット・デメリット */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">パーソナルジムのメリット・デメリット</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3">メリット</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span className="text-gray-700">正しいフォームで効率的にトレーニングできる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span className="text-gray-700">短期間で目標達成しやすい</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span className="text-gray-700">食事指導で生活習慣が改善される</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span className="text-gray-700">初心者でも安心して始められる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span className="text-gray-700">怪我のリスクが低い</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span className="text-gray-700">モチベーションが維持しやすい</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-700 mb-3">デメリット</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span className="text-gray-700">費用が高い</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span className="text-gray-700">トレーナーとの相性が重要</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span className="text-gray-700">通える時間が限られる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span className="text-gray-700">スケジュール調整が必要</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span className="text-gray-700">結果は努力次第で変わる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span className="text-gray-700">継続期間を決める必要がある</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 選び方のポイント */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">パーソナルジム選びのポイント5選</h2>

          <div className="space-y-6">
            {/* ポイント1 */}
            <div className="border-l-4 border-orange-500 pl-5 py-3">
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. 目的に合ったジムを選ぶ</h3>
              <p className="text-gray-700 mb-2">
                パーソナルジムによって、専門とする目的が異なります。ダイエット、ボディメイク、健康増進など、自分の目的に特化したジムを選ぶことが重要です。
              </p>
              <p className="text-sm text-gray-600">
                例：ダイエット目的なら、食事指導が充実しているジムを選ぶ。
              </p>
            </div>

            {/* ポイント2 */}
            <div className="border-l-4 border-orange-500 pl-5 py-3">
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. アクセスと営業時間を確認</h3>
              <p className="text-gray-700 mb-2">
                通いやすい立地と営業時間が重要です。通勤・通学路にあるジムを選ぶと、継続しやすくなります。早朝や夜間営業しているジムも多いため、自分のライフスタイルに合わせて選びましょう。
              </p>
              <p className="text-sm text-gray-600">
                例：仕事帰りに通いたいなら、駅近で夜間営業しているジムを選ぶ。
              </p>
            </div>

            {/* ポイント3 */}
            <div className="border-l-4 border-orange-500 pl-5 py-3">
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. 料金プランを比較</h3>
              <p className="text-gray-700 mb-2">
                入会金、1回あたりの料金、月額料金など、トータルの費用を比較することが大切です。安いだけでなく、サービス内容と料金のバランスを見極めましょう。
              </p>
              <p className="text-sm text-gray-600">
                例：入会金が無料でも、1回あたりの料金が高いジムもあります。
              </p>
            </div>

            {/* ポイント4 */}
            <div className="border-l-4 border-orange-500 pl-5 py-3">
              <h3 className="text-xl font-bold text-gray-900 mb-2">4. トレーナーの質と相性</h3>
              <p className="text-gray-700 mb-2">
                トレーナーの経歴、資格、指導スタイルが重要です。体験レッスンを受けて、トレーナーとの相性を確認しましょう。複数のトレーナーから選べるジムもあります。
              </p>
              <p className="text-sm text-gray-600">
                例：体験時にトレーナーの説明が分かりやすいか、目的に対して的確なアドバイスをしているか確認する。
              </p>
            </div>

            {/* ポイント5 */}
            <div className="border-l-4 border-orange-500 pl-5 py-3">
              <h3 className="text-xl font-bold text-gray-900 mb-2">5. 設備と施設を確認</h3>
              <p className="text-gray-700 mb-2">
                器材の充実度、清潔さ、更衣室やシャワーの有無などを確認しましょう。体験レッスンで実際に訪問し、施設全体の雰囲気を感じることが重要です。
              </p>
              <p className="text-sm text-gray-600">
                例：仕事帰りに通う場合は、シャワーやロッカーが充実しているか確認する。
              </p>
            </div>
          </div>
        </section>

        {/* 特徴から探す */}
        {features.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">特徴から探す</h2>
            <p className="text-gray-700 mb-4">
              以下の特徴から、自分に合ったジムを探すことができます。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {features.map((feature) => (
                <NextLink
                  key={feature.slug}
                  href={`/f-${feature.slug}/`}
                  className="inline-block px-4 py-2 rounded-lg border border-blue-300 bg-blue-50 text-blue-700 font-medium no-underline hover:bg-blue-100 transition-colors"
                >
                  {feature.label}
                </NextLink>
              ))}
            </div>
          </section>
        )}

        {/* 地域から探す */}
        {regions.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">地域から探す</h2>
            <p className="text-gray-700 mb-4">
              以下の地域から、パーソナルジムを探すことができます。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {regions.map((region) => {
                const slug = regionSlugs[region.name];
                if (!slug) return null;
                const totalGyms = region.prefectures.reduce((acc, p) => acc + p.gym_count, 0);
                return (
                  <NextLink
                    key={region.id}
                    href={`/r-${slug}/`}
                    className="inline-block px-4 py-2 rounded-lg border border-purple-300 bg-purple-50 text-purple-700 font-medium no-underline hover:bg-purple-100 transition-colors"
                  >
                    {region.name}
                    <span className="text-xs ml-1">({totalGyms})</span>
                  </NextLink>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              パーソナルジムについてよくある質問
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

        {/* Related Articles Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">関連コラム記事</h2>
          <p className="text-gray-700 mb-4">
            パーソナルジム選びに役立つコラム記事をご紹介します。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NextLink
              href="/column/gym-beginner/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              初心者向けガイド
            </NextLink>
            <NextLink
              href="/column/gym-choosing/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              ジム選びのポイント
            </NextLink>
            <NextLink
              href="/column/gym-cost/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              費用相場と選び方
            </NextLink>
            <NextLink
              href="/column/gym-price/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              料金相場と費用を抑えるコツ
            </NextLink>
            <NextLink
              href="/column/gym-nutrition/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              栄養と食事指導
            </NextLink>
            <NextLink
              href="/column/training-frequency/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              トレーニング頻度
            </NextLink>
            <NextLink
              href="/column/gym-diet/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              ダイエット成功方法
            </NextLink>
            <NextLink
              href="/column/diet-gym/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              ダイエット効果
            </NextLink>
            <NextLink
              href="/column/women-gym/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              女性向けジム
            </NextLink>
            <NextLink
              href="/column/gym-trial/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              無料体験の活用法
            </NextLink>
            <NextLink
              href="/column/gym-trainer/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              パーソナルトレーナーの選び方
            </NextLink>
            <NextLink
              href="/column/gym-bodymake/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              体が変わるまでの期間と目安
            </NextLink>
            <NextLink
              href="/column/gym-continuing/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              パーソナルジムを続けるコツ
            </NextLink>
            <NextLink
              href="/column/gym-compare/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              複数ジム比較の方法
            </NextLink>
            <NextLink
              href="/column/gym-rebound/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              卒業後のリバウンド防止
            </NextLink>
            <NextLink
              href="/column/gym-age/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              40代・50代からのジム
            </NextLink>
            <NextLink
              href="/column/gym-shokuji/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              食事指導で結果を最大化
            </NextLink>
            <NextLink
              href="/column/gym-online/"
              className="block p-4 border border-orange-200 rounded-lg bg-orange-50 text-orange-700 font-medium no-underline hover:bg-orange-100 transition-colors"
            >
              オンラインと通いの比較
            </NextLink>
          </div>
        </section>

        {/* Popular Prefectures Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">人気の都道府県から探す</h2>
          <p className="text-gray-700 mb-4">
            全国の人気エリアからパーソナルジムを探す。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <NextLink
              href="/prefecture/tokyo/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              東京
            </NextLink>
            <NextLink
              href="/prefecture/kanagawa/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              神奈川
            </NextLink>
            <NextLink
              href="/prefecture/osaka/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              大阪
            </NextLink>
            <NextLink
              href="/prefecture/aichi/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              愛知
            </NextLink>
            <NextLink
              href="/prefecture/saitama/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              埼玉
            </NextLink>
            <NextLink
              href="/prefecture/chiba/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              千葉
            </NextLink>
            <NextLink
              href="/prefecture/hyogo/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              兵庫
            </NextLink>
            <NextLink
              href="/prefecture/fukuoka/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              福岡
            </NextLink>
            <NextLink
              href="/prefecture/hokkaido/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              北海道
            </NextLink>
            <NextLink
              href="/prefecture/kyoto/"
              className="block p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium no-underline hover:bg-gray-100 transition-colors text-center"
            >
              京都
            </NextLink>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">パーソナルジムを探してみましょう</h2>
          <p className="mb-4 text-orange-100">
            このガイドを参考に、あなたにぴったりのパーソナルジムが見つかるといいですね。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <NextLink
              href="/all/"
              className="inline-block px-6 py-3 bg-white text-orange-600 font-bold rounded-lg no-underline hover:bg-orange-50 transition-colors text-center"
            >
              全ジムを見る
            </NextLink>
            <NextLink
              href="/area/"
              className="inline-block px-6 py-3 border-2 border-white text-white font-bold rounded-lg no-underline hover:bg-white hover:text-orange-600 transition-colors text-center"
            >
              地域から探す
            </NextLink>
          </div>
        </section>
      </div>
    </Layout>
  );
}
