import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage, JsonLDFaq } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, GymFaq } from "@/types";

const PER_PAGE = 20;

type SortOption = "priority" | "price_asc" | "price_desc" | "rating" | "review_count";
type PriceBand = "all" | "budget" | "mid" | "premium";

interface AllGymsProps {
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  sortBy: SortOption;
  priceBand: PriceBand;
  features: {
    hasFemaleOnly: boolean;
    hasMoneyBack: boolean;
    hasDiet: boolean;
    hasTrialAvailable: boolean;
  };
  faqs: GymFaq[];
}

/**
 * Generate FAQs for all gyms page
 */
function generateAllGymsPageFaqs(totalCount: number): GymFaq[] {
  return [
    {
      id: 1,
      gym_id: null,
      question: "全国のパーソナルジムの料金相場は？",
      answer: "全国のパーソナルジムの料金は、1回あたり5,000円～15,000円が相場です。都心部は比較的高めで、地方は手頃な価格となっていることが多いです。入会金は0円～50,000円程度。体験レッスンは1,000円～5,000円で受けられるジムが大多数です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "パーソナルジムの選び方は？",
      answer: "パーソナルジムを選ぶ際は、①料金・立地、②トレーナーの経験・実績、③食事指導の有無、④返金保証があるか、を確認しましょう。当サイトでは料金・評価・口コミを一覧で比較できるため、複数のジムを検討した上で体験レッスンを受けることをおすすめします。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "パーソナルジムで本当に痩せられますか？",
      answer: "正しいトレーニングと栄養指導を組み合わせることで、多くの人が目標の体重に到達しています。特に「食事指導」が付いているパーソナルジムを選ぶことが重要です。3ヶ月～6ヶ月の継続で、目に見える変化を感じられる人が多いです。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "女性向けのパーソナルジムはありますか？",
      answer: "はい、多くのパーソナルジムで女性向けプランを提供しています。女性専用施設や女性トレーナーの指導を受けたい場合は、当サイトで「女性向け」タグで検索すると簡単に見つかります。女性ならではのボディメイク目標を達成できるジムが多くあります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "初心者でもパーソナルジムに通えますか？",
      answer: "もちろんです。むしろ初心者こそパーソナルトレーニングがおすすめです。専門的なトレーナーが正しいフォームを指導してくれるので、怪我のリスクが低く、効果的に身体を変えることができます。当サイトで「初心者向け」タグで検索すると、初心者プログラムが充実しているジムが見つかります。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "返金保証があるパーソナルジムを選ぶメリットは？",
      answer: "返金保証があるジムは、ジム側が結果に自信を持っていることを示しています。万が一、トレーニング効果や満足度が期待値以下の場合、返金してもらえるため安心です。当サイトで「返金保証」タグで絞り込むと、返金保証対応のジムが簡単に見つかります。",
      sort_order: 6,
      is_global: false,
    },
  ];
}

export const getServerSideProps: GetServerSideProps<AllGymsProps> = async ({ query, res }) => {
  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const sortBy = (query.sort as SortOption) || "priority";
  const priceBand = (query.price as PriceBand) || "all";
  const hasFemaleOnly = query.female === "1";
  const hasMoneyBack = query.moneyback === "1";
  const hasDiet = query.diet === "1";
  const hasTrialAvailable = query.trial === "1";

  const result = await fetchGyms({
    page,
    limit: PER_PAGE,
    sortBy,
    hasFemaleOnly,
    hasMoneyBack,
    hasDiet,
    hasTrialAvailable,
  });

  const faqs: GymFaq[] = generateAllGymsPageFaqs(result.totalCount);

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      sortBy,
      priceBand,
      features: {
        hasFemaleOnly,
        hasMoneyBack,
        hasDiet,
        hasTrialAvailable,
      },
      faqs,
    },
  };
};

export default function AllGyms({
  gyms,
  totalCount,
  page,
  sortBy,
  priceBand,
  features,
  faqs,
}: AllGymsProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const handlePageChange = (_: unknown, value: number) => {
    const query = buildQueryString({
      sort: sortBy,
      price: priceBand,
      female: features.hasFemaleOnly ? "1" : undefined,
      moneyback: features.hasMoneyBack ? "1" : undefined,
      diet: features.hasDiet ? "1" : undefined,
      trial: features.hasTrialAvailable ? "1" : undefined,
      page: value > 1 ? String(value) : undefined,
    });
    router.push({ pathname: "/all/", query });
  };

  const handleSortChange = (newSort: SortOption) => {
    const query = buildQueryString({
      sort: newSort,
      price: priceBand,
      female: features.hasFemaleOnly ? "1" : undefined,
      moneyback: features.hasMoneyBack ? "1" : undefined,
      diet: features.hasDiet ? "1" : undefined,
      trial: features.hasTrialAvailable ? "1" : undefined,
    });
    router.push({ pathname: "/all/", query });
  };

  const handleFeatureToggle = (feature: keyof typeof features) => {
    const newFeatures = { ...features, [feature]: !features[feature] };
    const query = buildQueryString({
      sort: sortBy,
      price: priceBand,
      female: newFeatures.hasFemaleOnly ? "1" : undefined,
      moneyback: newFeatures.hasMoneyBack ? "1" : undefined,
      diet: newFeatures.hasDiet ? "1" : undefined,
      trial: newFeatures.hasTrialAvailable ? "1" : undefined,
    });
    router.push({ pathname: "/all/", query });
  };

  const handlePriceBandChange = (newPriceBand: PriceBand) => {
    const query = buildQueryString({
      sort: sortBy,
      price: newPriceBand,
      female: features.hasFemaleOnly ? "1" : undefined,
      moneyback: features.hasMoneyBack ? "1" : undefined,
      diet: features.hasDiet ? "1" : undefined,
      trial: features.hasTrialAvailable ? "1" : undefined,
    });
    router.push({ pathname: "/all/", query });
  };

  const handleResetFilters = () => {
    router.push({ pathname: "/all/" });
  };

  const buildQueryString = (params: Record<string, string | undefined>) => {
    return Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));
  };

  const activeFilterCount = Object.values(features).filter(Boolean).length + (priceBand !== "all" ? 1 : 0);

  const getSortLabel = (sort: SortOption) => {
    const labels: Record<SortOption, string> = {
      priority: "おすすめ順",
      rating: "評価の高い順",
      review_count: "口コミが多い順",
      price_asc: "料金が安い順",
      price_desc: "料金が高い順",
    };
    return labels[sort];
  };

  const getPriceBandLabel = (band: PriceBand) => {
    const labels: Record<PriceBand, string> = {
      all: "全て",
      budget: "〜5万円",
      mid: "5〜10万円",
      premium: "10万円〜",
    };
    return labels[band];
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
      <JsonLDFaq faqs={faqs} />

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

        {/* SEO Description Section */}
        <section className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            全国のパーソナルジムについて
          </h2>
          <p className="text-gray-700 mb-2">
            全国には{totalCount}
            件以上のパーソナルジムが存在します。ダイエット・ボディメイク・健康増進など、様々な目的に対応したジムが揃っています。プロのトレーナーによるマンツーマン指導で、効率的に目標を達成することができます。
          </p>
          <p className="text-gray-700 mb-2">
            都心部から地方まで、異なる料金体系・設備・サービスを提供するジムが多くあります。体験レッスンを利用して、複数のジムを比較し、自分に合ったジムを見つけることをおすすめします。
          </p>
          <p className="text-gray-700">
            当サイトでは、全国の主要パーソナルジムを掲載しており、料金・口コミ・評価・特徴を一覧で比較できます。フィルタ機能を使って、女性向け・初心者向け・返金保証ありなど、自分の条件に合ったジムを素早く見つけられます。
          </p>
        </section>

        {/* ソート・フィルタバー */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* ソートセレクト */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">並び順:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
              >
                <option value="priority">おすすめ順</option>
                <option value="rating">評価の高い順</option>
                <option value="review_count">口コミが多い順</option>
                <option value="price_asc">料金が安い順</option>
                <option value="price_desc">料金が高い順</option>
              </select>
            </div>

            {/* フィルタトグルボタン */}
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="lg:hidden px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              フィルタ {activeFilterCount > 0 && <span className="text-[#1e782d] font-bold">({activeFilterCount})</span>}
            </button>
          </div>

          {/* フィルタセクション */}
          <div className={`mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${!isFilterExpanded && "hidden lg:grid"}`}>
            {/* 価格帯フィルタ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">月額料金</label>
              <div className="space-y-2">
                {(["all", "budget", "mid", "premium"] as PriceBand[]).map((band) => (
                  <label key={band} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value={band}
                      checked={priceBand === band}
                      onChange={() => handlePriceBandChange(band)}
                      className="w-4 h-4 text-[#1e782d] rounded focus:ring-[#1e782d]"
                    />
                    <span className="text-sm text-gray-700">{getPriceBandLabel(band)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 特徴フィルタ1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">設備・サービス</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.hasFemaleOnly}
                    onChange={() => handleFeatureToggle("hasFemaleOnly")}
                    className="w-4 h-4 text-[#1e782d] rounded focus:ring-[#1e782d]"
                  />
                  <span className="text-sm text-gray-700">女性専用</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.hasTrialAvailable}
                    onChange={() => handleFeatureToggle("hasTrialAvailable")}
                    className="w-4 h-4 text-[#1e782d] rounded focus:ring-[#1e782d]"
                  />
                  <span className="text-sm text-gray-700">体験あり</span>
                </label>
              </div>
            </div>

            {/* 特徴フィルタ2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">保証・オプション</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.hasMoneyBack}
                    onChange={() => handleFeatureToggle("hasMoneyBack")}
                    className="w-4 h-4 text-[#1e782d] rounded focus:ring-[#1e782d]"
                  />
                  <span className="text-sm text-gray-700">返金保証</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.hasDiet}
                    onChange={() => handleFeatureToggle("hasDiet")}
                    className="w-4 h-4 text-[#1e782d] rounded focus:ring-[#1e782d]"
                  />
                  <span className="text-sm text-gray-700">食事指導あり</span>
                </label>
              </div>
            </div>

            {/* リセットボタン */}
            <div className="flex items-end">
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  フィルタリセット
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 件数表示 */}
        <div className="flex items-center justify-between mb-4 mt-4">
          {totalCount > 0 ? (
            <p className="text-sm text-gray-600">
              <span className="font-bold text-[#1e782d]">{totalCount.toLocaleString()}件</span>
              {" "}中 {(page - 1) * PER_PAGE + 1}〜{Math.min(page * PER_PAGE, totalCount)}件を表示
            </p>
          ) : (
            <p className="text-sm text-gray-500">0件</p>
          )}
          {activeFilterCount > 0 && (
            <NextLink href="/all/" className="text-xs text-[#E53935] border border-[#E53935] rounded-full px-3 py-1 hover:bg-red-50 transition-colors">
              絞り込みをリセット
            </NextLink>
          )}
        </div>

        {/* 検索結果表示 */}
        <div className="text-sm text-gray-600">
          {activeFilterCount > 0 && (
            <p>
              フィルタ適用中: <span className="font-medium text-gray-900">{getSortLabel(sortBy)}</span>
              {priceBand !== "all" && ` / ${getPriceBandLabel(priceBand)}`}
              {features.hasFemaleOnly && " / 女性専用"}
              {features.hasTrialAvailable && " / 体験あり"}
              {features.hasMoneyBack && " / 返金保証"}
              {features.hasDiet && " / 食事指導あり"}
            </p>
          )}
        </div>

        {/* ジム一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500">条件に合うパーソナルジムが見つかりませんでした。</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-[#1e782d] text-white rounded-lg text-sm font-medium hover:bg-[#e55a25] transition-colors"
            >
              フィルタをリセット
            </button>
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                女性向けパーソナルジムの選び方
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                女性専用・混合の違いと安心して通うためのポイント。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-trial/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                無料体験・体験入会の活用ガイド
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                体験レッスンを最大限に活かす方法と注意点。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-trainer/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルトレーナーの選び方と資格の見方
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                優秀なトレーナーを見分けるポイントと資格について。
              </p>
            </NextLink>
            <NextLink
              href="/column/gym-bodymake/"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#1e782d] transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                パーソナルジムで体が変わるまでの期間と目安
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                ボディメイク成功の期間目安と効果的な進め方。
              </p>
            </NextLink>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
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
      </div>
    </Layout>
  );
}
