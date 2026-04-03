import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import InlineCTA from "@/components/cta/InlineCTA";
import Pagination from "@mui/material/Pagination";
import { fetchGyms, type SortKey } from "@/utils/supabase/fetchGyms";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import { CONDITION_MAP, GYM_CONDITIONS } from "@/types/conditions";
import type { GymListItem } from "@/types";
import type { SearchCondition } from "@/types/conditions";

const PER_PAGE = 20;
const VALID_SORTS: SortKey[] = ["priority", "price_asc", "price_desc", "rating", "review_count"];

interface AllGymsProps {
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  sort: SortKey;
  condition: SearchCondition | null;
}

export const getServerSideProps: GetServerSideProps<AllGymsProps> = async ({ query, res }) => {
  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const sortParam = String(query.sort || "priority");
  const sort: SortKey = VALID_SORTS.includes(sortParam as SortKey) ? (sortParam as SortKey) : "priority";
  const condSlug = String(query.condition || "");
  const condition = CONDITION_MAP.get(condSlug) || null;

  const result = await fetchGyms({
    page,
    limit: PER_PAGE,
    sort,
    conditionFilter: condition?.filter,
  });

  setConditionalCacheHeaders(res, result.totalCount);

  return {
    props: {
      gyms: result.gyms,
      totalCount: result.totalCount,
      page,
      sort,
      condition: condition ? { ...condition, filter: condition.filter } : null,
    },
  };
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "priority", label: "おすすめ順" },
  { value: "price_asc", label: "料金が安い順" },
  { value: "price_desc", label: "料金が高い順" },
  { value: "rating", label: "口コミ評価順" },
  { value: "review_count", label: "口コミ件数順" },
];

export default function AllGyms({ gyms, totalCount, page, sort, condition }: AllGymsProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const buildQuery = (overrides: Record<string, string | undefined>) => {
    const q: Record<string, string> = {};
    if (sort !== "priority" && !overrides.sort) q.sort = sort;
    if (condition && !overrides.condition) q.condition = condition.slug;
    for (const [k, v] of Object.entries(overrides)) {
      if (v) q[k] = v;
    }
    return q;
  };

  const handlePageChange = (_: unknown, value: number) => {
    router.push({
      pathname: "/all/",
      query: buildQuery(value > 1 ? { page: String(value) } : {}),
    });
  };

  const handleSortChange = (newSort: SortKey) => {
    router.push({
      pathname: "/all/",
      query: buildQuery({ sort: newSort === "priority" ? undefined : newSort }),
    });
  };

  const handleConditionToggle = (slug: string) => {
    const isActive = condition?.slug === slug;
    router.push({
      pathname: "/all/",
      query: buildQuery({ condition: isActive ? undefined : slug }),
    });
  };

  const titleSuffix = condition ? `（${condition.label}）` : "";
  const pageTitle = `全国のパーソナルジム一覧${titleSuffix}`;

  return (
    <Layout>
      <SEO
        title={`${pageTitle}${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`全国${totalCount.toLocaleString()}件のパーソナルジムを一覧で比較。料金・口コミ・特徴で自分に合ったジムを見つけよう。`}
        path={`/all/${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={pageTitle}
        description="パーソナルジム全件リスト"
        path="/all/"
        items={gyms}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "ジム一覧" }]} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {pageTitle}
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {GYM_CONDITIONS.map((cond) => {
            const isActive = condition?.slug === cond.slug;
            return (
              <button
                key={cond.slug}
                type="button"
                onClick={() => handleConditionToggle(cond.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  isActive
                    ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                }`}
              >
                {cond.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="mt-4 flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-gray-600 shrink-0">
            並び替え:
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortKey)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <InlineCTA className="mt-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            条件に一致するパーソナルジムが見つかりませんでした。
          </div>
        )}

        {/* CTA: 中盤 */}
        {gyms.length > 6 && (
          <InlineCTA variant="secondary" className="mt-8" />
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
