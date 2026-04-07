import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
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

        {/* ソート・フィルタバー */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* ソートセレクト */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">並び順:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
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
              フィルタ {activeFilterCount > 0 && <span className="text-[#FF6B35] font-bold">({activeFilterCount})</span>}
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
                      className="w-4 h-4 text-[#FF6B35] rounded focus:ring-[#FF6B35]"
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
                    className="w-4 h-4 text-[#FF6B35] rounded focus:ring-[#FF6B35]"
                  />
                  <span className="text-sm text-gray-700">女性専用</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.hasTrialAvailable}
                    onChange={() => handleFeatureToggle("hasTrialAvailable")}
                    className="w-4 h-4 text-[#FF6B35] rounded focus:ring-[#FF6B35]"
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
                    className="w-4 h-4 text-[#FF6B35] rounded focus:ring-[#FF6B35]"
                  />
                  <span className="text-sm text-gray-700">返金保証</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.hasDiet}
                    onChange={() => handleFeatureToggle("hasDiet")}
                    className="w-4 h-4 text-[#FF6B35] rounded focus:ring-[#FF6B35]"
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

        {/* 検索結果表示 */}
        <div className="mt-4 text-sm text-gray-600">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
              className="mt-4 px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-medium hover:bg-[#e55a25] transition-colors"
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
      </div>
    </Layout>
  );
}
