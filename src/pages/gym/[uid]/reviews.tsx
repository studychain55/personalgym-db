import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbList } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { fetchGymByUid, fetchGymReviewsPaginated } from "@/utils/supabase/fetchGymDetail";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import supabase from "@/utils/supabase/index";
import Pagination from "@mui/material/Pagination";
import type { GymLocation, GymReview } from "@/types";

const PER_PAGE = 20;

interface GymReviewsPageProps {
  gym: GymLocation;
  reviews: GymReview[];
  totalCount: number;
  page: number;
  sortBy: "newest" | "rating-high" | "rating-low";
  prefectureName: string;
  prefectureSlug: string;
}

export const getServerSideProps: GetServerSideProps<GymReviewsPageProps> = async ({
  params,
  query,
  res,
}) => {
  const uid = String(params?.uid || "");
  const gym = await fetchGymByUid(uid);
  if (!gym) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const sortBy = (query.sort as "newest" | "rating-high" | "rating-low") || "newest";

  const { reviews, totalCount } = await fetchGymReviewsPaginated(gym.id, page, PER_PAGE, sortBy);

  let prefectureName = "";
  let prefectureSlug = "";
  if (gym.prefecture_id) {
    const { data } = await supabase
      .from("Prefecture")
      .select("title, slug")
      .eq("id", gym.prefecture_id)
      .single();
    if (data) {
      prefectureName = data.title;
      prefectureSlug = data.slug;
    }
  }

  setConditionalCacheHeaders(res, totalCount);

  return {
    props: {
      gym,
      reviews,
      totalCount,
      page,
      sortBy,
      prefectureName,
      prefectureSlug,
    },
  };
};

export default function GymReviewsPage({
  gym,
  reviews,
  totalCount,
  page,
  sortBy,
  prefectureName,
  prefectureSlug,
}: GymReviewsPageProps) {
  const router = useRouter();

  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    ...(prefectureName ? [{ label: prefectureName, href: `/p-${prefectureSlug}/` }] : []),
    { label: gym.name, href: `/gym/${gym.uid}/` },
    { label: "全口コミ" },
  ];

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    if (sortBy !== "newest") {
      params.set("sort", sortBy);
    }
    router.push(`/gym/${gym.uid}/reviews?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (newSort !== "newest") {
      params.set("sort", newSort);
    }
    router.push(`/gym/${gym.uid}/reviews?${params.toString()}`);
  };

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return (
    <Layout>
      <SEO
        title={`${gym.name}の全${totalCount}件の口コミ・評判`}
        description={`${gym.name}の評価・口コミを全件表示。実際の利用者の声を参考に、自分に合ったジムを選びましょう。`}
        path={`/gym/${gym.uid}/reviews/`}
        ogImage={gym.image_url || undefined}
      />
      <JsonLDBreadcrumbList items={breadcrumbItems} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="mt-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {gym.name}の口コミ一覧
          </h1>
          <p className="text-gray-600 mb-1">全{totalCount}件の口コミ</p>
          <NextLink href={`/gym/${gym.uid}/`} className="text-[#FF6B35] hover:underline text-sm font-medium">
            ← ジム詳細ページへ戻る
          </NextLink>
        </div>

        {/* Rating Summary */}
        {gym.review_average_rating > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">
                  ★ {gym.review_average_rating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">{gym.total_review_count}件の評価</div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                  const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-10">{rating}つ星</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-gray-600 w-10 text-right">
                        {count}件
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Sort Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <span className="text-gray-600 text-sm font-medium">並び替え:</span>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleSortChange("newest")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortBy === "newest"
                  ? "bg-[#FF6B35] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              新着順
            </button>
            <button
              onClick={() => handleSortChange("rating-high")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortBy === "rating-high"
                  ? "bg-[#FF6B35] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              評価高い順
            </button>
            <button
              onClick={() => handleSortChange("rating-low")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortBy === "rating-low"
                  ? "bg-[#FF6B35] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              評価低い順
            </button>
          </div>
        </div>

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-4 mb-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-5">
                {/* Rating and Meta */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 font-bold text-lg">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">{review.rating}.0</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap justify-end">
                    {review.author_name && <span>{review.author_name}</span>}
                    {review.author_gender && <span>{review.author_gender}</span>}
                    {review.author_age_group && <span>{review.author_age_group}</span>}
                  </div>
                </div>

                {/* Purpose */}
                {review.purpose && (
                  <div className="mb-2 text-xs text-gray-500">目的: {review.purpose}</div>
                )}

                {/* Title */}
                {review.title && (
                  <h3 className="font-bold text-gray-900 mb-2 text-base">{review.title}</h3>
                )}

                {/* Content */}
                <p className="text-gray-700 text-sm whitespace-pre-line mb-3">
                  {review.content}
                </p>

                {/* Weight Loss Achievement */}
                {review.weight_loss_kg != null && review.weight_loss_kg > 0 && (
                  <div className="mb-3 text-sm text-red-600 font-bold">
                    -{review.weight_loss_kg}kg達成
                  </div>
                )}

                {/* Detailed Ratings */}
                <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-3 text-xs text-gray-600">
                  {review.rating_trainer && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      トレーナー: {review.rating_trainer}/5
                    </span>
                  )}
                  {review.rating_facility && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      設備: {review.rating_facility}/5
                    </span>
                  )}
                  {review.rating_price && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      価格: {review.rating_price}/5
                    </span>
                  )}
                  {review.rating_access && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      アクセス: {review.rating_access}/5
                    </span>
                  )}
                  {review.rating_meal_guidance && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      食事指導: {review.rating_meal_guidance}/5
                    </span>
                  )}
                  {review.rating_goal_achievement && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      目標達成: {review.rating_goal_achievement}/5
                    </span>
                  )}
                  {review.rating_cleanliness && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      清潔感: {review.rating_cleanliness}/5
                    </span>
                  )}
                  {review.rating_atmosphere && (
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      雰囲気: {review.rating_atmosphere}/5
                    </span>
                  )}
                </div>

                {/* Posted Date */}
                <div className="text-xs text-gray-400 mt-3">
                  {new Date(review.created_at).toLocaleDateString("ja-JP")}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center mb-8">
            <p className="text-gray-600">まだ口コミがありません。</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="standard"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#666",
                  "&.Mui-selected": {
                    backgroundColor: "#FF6B35",
                    color: "white",
                  },
                },
              }}
            />
          </div>
        )}

        {/* CTA */}
        {(gym.trial_available || gym.website_url) && (
          <div className="mt-10 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-xl p-6 text-center text-white">
            <h3 className="text-lg font-bold mb-2">気になったら無料体験へ</h3>
            <p className="text-sm mb-4 opacity-95">まずは実際のジムを体験してみましょう</p>
            <div className="flex gap-3 flex-col md:flex-row">
              {gym.trial_available && (
                <a
                  href={gym.website_url || "#"}
                  className="flex-1 bg-white text-[#FF6B35] py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition"
                >
                  無料体験を予約
                </a>
              )}
              {gym.website_url && (
                <a
                  href={gym.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white bg-opacity-20 text-white py-3 rounded-lg font-bold text-center hover:bg-opacity-30 transition border border-white border-opacity-30"
                >
                  公式サイトへ
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
