import type { GetServerSideProps } from "next";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDGymDetail } from "@/components/UI/JsonLD";
import JsonLDFaq from "@/components/UI/JsonLDFaq";
import JsonLDBreadcrumb from "@/components/UI/JsonLDBreadcrumb";
import Breadcrumb from "@/components/UI/BreadCrumb";
import InlineCTA from "@/components/cta/InlineCTA";
import AnxietyRelief from "@/components/cta/AnxietyRelief";
import GymCard from "@/features/gym/components/GymCard";
import { fetchGymByUid, fetchGymReviews, fetchGymImages, fetchGymFaqs } from "@/utils/supabase/fetchGymDetail";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { setVeryLongCacheHeaders } from "@/utils/cacheHeaders";
import supabase from "@/utils/supabase/index";
import type { GymLocation, GymReview, GymImage, GymFaq, GymListItem } from "@/types";

interface GymDetailProps {
  gym: GymLocation;
  reviews: GymReview[];
  images: GymImage[];
  faqs: GymFaq[];
  prefectureName: string;
  prefectureSlug: string;
  nearbyGyms: GymListItem[];
}

export const getServerSideProps: GetServerSideProps<GymDetailProps> = async ({ params, res }) => {
  const uid = String(params?.uid || "");
  const gym = await fetchGymByUid(uid);
  if (!gym) return { notFound: true };

  const [reviews, images, faqs] = await Promise.all([
    fetchGymReviews(gym.id),
    fetchGymImages(gym.id),
    fetchGymFaqs(gym.id),
  ]);

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

  // 近隣ジム取得
  let nearbyGyms: GymListItem[] = [];
  if (gym.prefecture_id) {
    const result = await fetchGyms({
      prefectureId: gym.prefecture_id,
      limit: 4,
    });
    nearbyGyms = result.gyms.filter((g) => g.uid !== gym.uid).slice(0, 3);
  }

  setVeryLongCacheHeaders(res);

  return { props: { gym, reviews, images, faqs, prefectureName, prefectureSlug, nearbyGyms } };
};

const formatPrice = (price: number | null, label: string) => {
  if (price == null) return null;
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold">{price === 0 ? "無料" : `¥${price.toLocaleString()}`}</span>
    </div>
  );
};

export default function GymDetail({ gym, reviews, images, faqs, prefectureName, prefectureSlug, nearbyGyms }: GymDetailProps) {
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    ...(prefectureName ? [{ label: prefectureName, href: `/gym/area/${prefectureSlug}/` }] : []),
    { label: gym.name },
  ];

  return (
    <Layout>
      <SEO
        title={`${gym.name}の料金・口コミ・特徴`}
        description={gym.description || gym.catchphrase || `${gym.name}の料金、口コミ、トレーニング内容、アクセス情報を詳しく紹介。`}
        path={`/gym/${gym.uid}/`}
        ogImage={gym.image_url || undefined}
      />
      <JsonLDGymDetail gym={gym} />
      <JsonLDFaq faqs={faqs} />
      <JsonLDBreadcrumb items={breadcrumbItems} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="mt-4">
          {gym.catchphrase && (
            <p className="text-sm text-[#FF6B35] font-medium">{gym.catchphrase}</p>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{gym.name}</h1>
          {gym.address && <p className="text-sm text-gray-500 mt-1">{gym.address}</p>}
        </div>

        {/* CTA: ファーストビュー */}
        <InlineCTA areaName={gym.name} className="mt-4" />

        {/* Images */}
        {(gym.image_url || images.length > 0) && (
          <div className="mt-6">
            <div className="rounded-lg overflow-hidden">
              <img
                src={images[0]?.image_url || gym.image_url || ""}
                alt={gym.name}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.slice(1, 5).map((img) => (
                  <img
                    key={img.id}
                    src={img.image_url}
                    alt={`${gym.name}の写真`}
                    className="w-full aspect-square object-cover rounded"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Info */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {gym.review_average_rating > 0 && (
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">★ {gym.review_average_rating.toFixed(1)}</div>
              <div className="text-xs text-gray-500">{gym.total_review_count}件の口コミ</div>
            </div>
          )}
          {gym.trial_available && (
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-green-700">体験あり</div>
              {gym.price_trial != null && (
                <div className="text-xs text-gray-500">
                  {gym.price_trial === 0 ? "無料" : `¥${gym.price_trial.toLocaleString()}`}
                </div>
              )}
            </div>
          )}
          {gym.online_available && (
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-blue-700">オンライン対応</div>
            </div>
          )}
          {gym.session_duration && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-gray-700">{gym.session_duration}分</div>
              <div className="text-xs text-gray-500">1セッション</div>
            </div>
          )}
        </div>

        {/* こんな方におすすめ */}
        {gym.target_users && gym.target_users.length > 0 && (
          <section className="mt-8 bg-orange-50 rounded-lg p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">こんな方におすすめ</h2>
            <div className="flex flex-wrap gap-2">
              {gym.target_users.map((user) => (
                <span key={user} className="bg-white text-[#FF6B35] px-3 py-1.5 rounded-full text-sm font-medium border border-orange-200">
                  {user}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        {gym.description && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">ジムについて</h2>
            <p className="text-gray-600 whitespace-pre-line">{gym.description}</p>
          </section>
        )}

        {/* Price */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">料金情報</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            {formatPrice(gym.price_enrollment, "入会金")}
            {formatPrice(gym.price_trial, "体験料金")}
            {formatPrice(gym.price_min, "最低月額料金")}
            {formatPrice(gym.price_max, "最高月額料金")}
            {gym.price_plan_name && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="font-bold text-gray-800">{gym.price_plan_name}</div>
                {gym.price_plan_amount && (
                  <div className="text-[#FF6B35] font-bold text-lg">
                    ¥{gym.price_plan_amount.toLocaleString()}
                  </div>
                )}
                {gym.price_plan_details && (
                  <p className="text-sm text-gray-600 mt-1">{gym.price_plan_details}</p>
                )}
              </div>
            )}
          </div>
          {/* CTA after price section */}
          <div className="mt-4 text-center">
            <a
              href="#counseling"
              className="inline-block bg-[#FF6B35] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#E55E2F] transition-colors no-underline"
            >
              無料カウンセリングで料金を詳しく聞く
            </a>
          </div>
        </section>

        {/* Programs */}
        {gym.programs && gym.programs.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">プログラム・メニュー</h2>
            <div className="flex flex-wrap gap-2">
              {gym.programs.map((p) => (
                <span key={p} className="bg-orange-50 text-[#FF6B35] px-3 py-1.5 rounded-full text-sm font-medium">
                  {p}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Options */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">サービス・設備</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "ウェアレンタル", active: gym.options_wear },
              { label: "シューズレンタル", active: gym.options_shoes },
              { label: "プロテイン提供", active: gym.options_protein },
              { label: "食事指導", active: gym.options_diet },
            ].map((opt) => (
              <div
                key={opt.label}
                className={`rounded-lg p-3 text-center text-sm font-medium ${
                  opt.active ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"
                }`}
              >
                {opt.active ? "✓" : "−"} {opt.label}
              </div>
            ))}
          </div>
        </section>

        {/* CTA: 中盤 */}
        <InlineCTA areaName={gym.name} variant="secondary" className="mt-8" />

        {/* Access */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">アクセス・基本情報</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {gym.address && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium w-28">住所</td>
                    <td className="py-3 px-4">{gym.address}</td>
                  </tr>
                )}
                {gym.phone && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">電話番号</td>
                    <td className="py-3 px-4">{gym.phone}</td>
                  </tr>
                )}
                {gym.opening_hours && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">営業時間</td>
                    <td className="py-3 px-4 whitespace-pre-line">{gym.opening_hours}</td>
                  </tr>
                )}
                {gym.closed_days && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">定休日</td>
                    <td className="py-3 px-4">{gym.closed_days}</td>
                  </tr>
                )}
                {gym.access_info && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">アクセス</td>
                    <td className="py-3 px-4">{gym.access_info}</td>
                  </tr>
                )}
                {gym.parking && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">駐車場</td>
                    <td className="py-3 px-4">{gym.parking}</td>
                  </tr>
                )}
                {gym.website_url && (
                  <tr>
                    <td className="py-3 px-4 bg-gray-50 font-medium">公式サイト</td>
                    <td className="py-3 px-4">
                      <a href={gym.website_url} target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">
                        公式サイトを見る →
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">口コミ・評判</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-bold">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                      </span>
                      <span className="text-sm text-gray-500">{review.rating}.0</span>
                    </div>
                    {review.author_name && (
                      <span className="text-sm text-gray-400">{review.author_name}</span>
                    )}
                  </div>
                  {review.title && (
                    <h4 className="font-bold text-gray-800 mt-2">{review.title}</h4>
                  )}
                  <p className="text-gray-600 mt-2 text-sm whitespace-pre-line">{review.content}</p>
                  {(review.rating_trainer || review.rating_facility || review.rating_price || review.rating_access) && (
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                      {review.rating_trainer && <span>トレーナー: {review.rating_trainer}/5</span>}
                      {review.rating_facility && <span>設備: {review.rating_facility}/5</span>}
                      {review.rating_price && <span>価格: {review.rating_price}/5</span>}
                      {review.rating_access && <span>アクセス: {review.rating_access}/5</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">よくある質問</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
                  <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none flex justify-between items-center">
                    <span>Q. {faq.question}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600">
                    A. {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 不安解消セクション */}
        <AnxietyRelief className="mt-10" />

        {/* 近隣のジム */}
        {nearbyGyms.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {prefectureName}の他のパーソナルジム
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {nearbyGyms.map((g) => (
                <GymCard key={g.id} gym={g} />
              ))}
            </div>
          </section>
        )}

        {/* CTA: 最下部 */}
        <InlineCTA areaName={gym.name} className="mt-10" />
      </div>
    </Layout>
  );
}
