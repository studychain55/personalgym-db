import type { GetServerSideProps } from "next";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDGymDetail, JsonLDFaq, JsonLDBreadcrumbList, JsonLDDynamicFaq } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import {
  fetchGymByUid, fetchGymReviews, fetchGymImages, fetchGymFaqs,
  fetchGymPlans, fetchGymTrainers, fetchGymBeforeAfters, fetchGymCampaigns,
  fetchRelatedGyms,
} from "@/utils/supabase/fetchGymDetail";
import { setVeryLongCacheHeaders } from "@/utils/cacheHeaders";
import supabase from "@/utils/supabase/index";
import type { GymLocation, GymReview, GymImage, GymFaq, GymPlan, GymTrainer, GymBeforeAfter, GymCampaign } from "@/types";

interface GymDetailProps {
  gym: GymLocation;
  reviews: GymReview[];
  images: GymImage[];
  faqs: GymFaq[];
  plans: GymPlan[];
  trainers: GymTrainer[];
  beforeAfters: GymBeforeAfter[];
  campaigns: GymCampaign[];
  relatedGyms: GymLocation[];
  prefectureName: string;
  prefectureSlug: string;
}

export const getServerSideProps: GetServerSideProps<GymDetailProps> = async ({ params, res }) => {
  const uid = String(params?.uid || "");
  const gym = await fetchGymByUid(uid);
  if (!gym) return { notFound: true };

  const [reviews, images, faqs, plans, trainers, beforeAfters, campaigns, relatedGyms] = await Promise.all([
    fetchGymReviews(gym.id),
    fetchGymImages(gym.id),
    fetchGymFaqs(gym.id),
    fetchGymPlans(gym.id),
    fetchGymTrainers(gym.id),
    fetchGymBeforeAfters(gym.id),
    fetchGymCampaigns(gym.id),
    fetchRelatedGyms(gym.id, gym.prefecture_id, gym.price_min, gym.price_max, 4),
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

  setVeryLongCacheHeaders(res);

  return { props: { gym, reviews, images, faqs, plans, trainers, beforeAfters, campaigns, relatedGyms, prefectureName, prefectureSlug } };
};

const fmtPrice = (price: number | null, label: string) => {
  if (price == null) return null;
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold">{price === 0 ? "無料" : `¥${price.toLocaleString()}`}</span>
    </div>
  );
};

export default function GymDetail({ gym, reviews, images, faqs, plans, trainers, beforeAfters, campaigns, relatedGyms, prefectureName, prefectureSlug }: GymDetailProps) {
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    ...(prefectureName ? [{ label: prefectureName, href: `/p-${prefectureSlug}/` }] : []),
    { label: gym.name },
  ];

  const stationInfo = [
    gym.nearest_station && `${gym.nearest_station}駅 徒歩${gym.walk_minutes ?? "?"}分`,
    gym.nearest_station_2 && `${gym.nearest_station_2}駅 徒歩${gym.walk_minutes_2 ?? "?"}分`,
    gym.nearest_station_3 && `${gym.nearest_station_3}駅 徒歩${gym.walk_minutes_3 ?? "?"}分`,
  ].filter(Boolean);

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
      <JsonLDDynamicFaq gym={gym} />
      <JsonLDBreadcrumbList items={breadcrumbItems} />

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg z-40 md:hidden">
        <div className="flex gap-2">
          {gym.trial_available && (
            <a href={gym.website_url || "#"} className="flex-1 bg-[#FF6B35] text-white py-2.5 rounded-lg font-bold text-center text-sm hover:bg-orange-600 transition">
              無料体験を予約
            </a>
          )}
          {gym.website_url && (
            <a href={gym.website_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gray-100 text-gray-800 py-2.5 rounded-lg font-bold text-center text-sm hover:bg-gray-200 transition">
              公式サイト
            </a>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="mt-4">
          {gym.catchphrase && (
            <p className="text-sm text-[#FF6B35] font-medium">{gym.catchphrase}</p>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{gym.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {gym.address && <span className="text-sm text-gray-500">📍 {gym.address}</span>}
            {stationInfo.length > 0 && (
              <span className="text-sm text-gray-500">🚃 {stationInfo.join(" / ")}</span>
            )}
          </div>
          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {gym.has_female_only && <span className="text-xs bg-pink-100 text-pink-700 font-bold px-3 py-1 rounded-full">女性専用</span>}
            {gym.has_money_back && <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full">返金保証あり</span>}
            {gym.has_installment && <span className="text-xs bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full">分割払いOK</span>}
            {gym.has_child_friendly && <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full">子連れOK</span>}
            {gym.has_visiting_training && <span className="text-xs bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full">出張対応</span>}
          </div>
        </div>

        {/* Campaigns */}
        {campaigns.length > 0 && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-lg font-bold text-red-700 mb-2">キャンペーン実施中</h2>
            {campaigns.map((c) => (
              <div key={c.id} className="mb-2 last:mb-0">
                <div className="font-bold text-red-800">{c.title}</div>
                {c.original_price != null && c.campaign_price != null && (
                  <div className="text-sm">
                    <span className="line-through text-gray-400">¥{c.original_price.toLocaleString()}</span>
                    <span className="ml-2 text-red-700 font-bold text-lg">→ ¥{c.campaign_price.toLocaleString()}</span>
                  </div>
                )}
                {c.conditions && <p className="text-xs text-gray-500 mt-1">{c.conditions}</p>}
                {c.end_date && <p className="text-xs text-red-600 mt-1">〜{c.end_date}まで</p>}
              </div>
            ))}
          </div>
        )}

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
          {gym.price_per_session && (
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-[#FF6B35]">¥{gym.price_per_session.toLocaleString()}</div>
              <div className="text-xs text-gray-500">1回あたり</div>
            </div>
          )}
          {gym.session_duration && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-gray-700">{gym.session_duration}分</div>
              <div className="text-xs text-gray-500">1セッション</div>
            </div>
          )}
        </div>

        {/* Description */}
        {gym.description && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">ジムについて</h2>
            <p className="text-gray-600 whitespace-pre-line">{gym.description}</p>
          </section>
        )}

        {/* Atmosphere */}
        {gym.atmosphere && (
          <section className="mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">雰囲気</h3>
            <p className="text-gray-600">{gym.atmosphere}</p>
          </section>
        )}

        {/* Video */}
        {gym.video_url && (
          <section className="mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">紹介動画</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={gym.video_url}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                title={`${gym.name}の紹介動画`}
              />
            </div>
          </section>
        )}

        {/* CTA Section (Desktop) */}
        {(gym.trial_available || gym.website_url) && (
          <div className="hidden md:flex gap-3 mt-6">
            {gym.trial_available && (
              <a href={gym.website_url || "#"} className="flex-1 bg-[#FF6B35] text-white py-3 rounded-lg font-bold text-center hover:bg-orange-600 transition">
                無料体験を予約する
              </a>
            )}
            {gym.website_url && (
              <a href={gym.website_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-bold text-center hover:bg-gray-200 transition">
                公式サイトを見る
              </a>
            )}
          </div>
        )}

        {/* Plans Table */}
        {plans.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">料金プラン</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-bold border-b">プラン名</th>
                    <th className="text-right py-3 px-4 font-bold border-b">月額</th>
                    <th className="text-right py-3 px-4 font-bold border-b">総額</th>
                    <th className="text-center py-3 px-4 font-bold border-b">回数/月</th>
                    <th className="text-center py-3 px-4 font-bold border-b">時間</th>
                    <th className="text-center py-3 px-4 font-bold border-b">期間</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{plan.name}</div>
                        {plan.is_trial && <span className="text-xs text-green-600 font-bold">体験プラン</span>}
                        {plan.target_audience && <div className="text-xs text-gray-400">{plan.target_audience}</div>}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#FF6B35]">
                        {plan.price_monthly != null ? `¥${plan.price_monthly.toLocaleString()}` : "-"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {plan.price_total != null ? `¥${plan.price_total.toLocaleString()}` : "-"}
                      </td>
                      <td className="py-3 px-4 text-center">{plan.sessions_per_month ?? "-"}</td>
                      <td className="py-3 px-4 text-center">{plan.session_minutes ? `${plan.session_minutes}分` : "-"}</td>
                      <td className="py-3 px-4 text-center">{plan.duration_months ? `${plan.duration_months}ヶ月` : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Legacy Price (shown if no plans) */}
        {plans.length === 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">料金情報</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              {fmtPrice(gym.price_enrollment, "入会金")}
              {fmtPrice(gym.price_trial, "体験料金")}
              {fmtPrice(gym.price_counseling, "カウンセリング料金")}
              {fmtPrice(gym.price_min, "最低月額料金")}
              {fmtPrice(gym.price_max, "最高月額料金")}
              {fmtPrice(gym.price_per_session, "1回あたり料金")}
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
          </section>
        )}

        {/* Trainers */}
        {trainers.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">トレーナー紹介</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainers.map((t) => (
                <div key={t.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                  {t.image_url && (
                    <img src={t.image_url} alt={t.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" loading="lazy" />
                  )}
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    {t.role && <div className="text-xs text-[#FF6B35] font-medium">{t.role}</div>}
                    {t.bio && <p className="text-sm text-gray-600 mt-1 line-clamp-3">{t.bio}</p>}
                    {t.certifications && t.certifications.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {t.certifications.map((c) => (
                          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c}</span>
                        ))}
                      </div>
                    )}
                    {t.achievements && t.achievements.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {t.achievements.map((a) => (
                          <span key={a} className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Before/After */}
        {beforeAfters.length > 0 && (
          <section className="mt-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">トレーニング実績ギャラリー</h2>
              <p className="text-gray-600 mb-6">実際のお客様の変化を見てみてください</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {beforeAfters.map((ba) => (
                  <div key={ba.id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                    {/* Images */}
                    <div className="flex gap-2 mb-4">
                      <div className="w-1/2">
                        {ba.image_before ? (
                          <img src={ba.image_before} alt="Before" className="w-full rounded-lg object-cover aspect-[3/4]" loading="lazy" />
                        ) : (
                          <div className="w-full rounded-lg bg-gray-100 aspect-[3/4] flex items-center justify-center text-gray-400 text-sm">Before</div>
                        )}
                        <p className="text-xs text-gray-500 text-center mt-1 font-bold">Before</p>
                      </div>
                      <div className="w-1/2">
                        {ba.image_after ? (
                          <img src={ba.image_after} alt="After" className="w-full rounded-lg object-cover aspect-[3/4]" loading="lazy" />
                        ) : (
                          <div className="w-full rounded-lg bg-gray-100 aspect-[3/4] flex items-center justify-center text-gray-400 text-sm">After</div>
                        )}
                        <p className="text-xs text-gray-500 text-center mt-1 font-bold">After</p>
                      </div>
                    </div>

                    {/* Profile */}
                    <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-600">
                      {ba.gender && <span className="bg-gray-100 px-2.5 py-1 rounded-full">{ba.gender}</span>}
                      {ba.age && <span className="bg-gray-100 px-2.5 py-1 rounded-full">{ba.age}歳</span>}
                      {ba.duration_months && <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold">{ba.duration_months}ヶ月</span>}
                    </div>

                    {/* Results */}
                    <div className="space-y-2 py-3 border-t border-gray-100">
                      {ba.weight_before != null && ba.weight_after != null && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">体重</span>
                          <span className="font-bold">
                            {ba.weight_before}kg → <span className="text-red-600">{ba.weight_after}kg</span>
                          </span>
                        </div>
                      )}
                      {ba.body_fat_before != null && ba.body_fat_after != null && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">体脂肪率</span>
                          <span className="font-bold">
                            {ba.body_fat_before}% → <span className="text-red-600">{ba.body_fat_after}%</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Comment */}
                    {ba.comment && <p className="text-xs text-gray-600 italic">{ba.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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

        {/* Options & Services */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">サービス・設備</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "ウェアレンタル", active: gym.options_wear },
              { label: "シューズレンタル", active: gym.options_shoes },
              { label: "プロテイン提供", active: gym.options_protein },
              { label: "食事指導", active: gym.options_diet },
              { label: "タオルレンタル", active: gym.has_towel_rental },
              { label: "ウォーターサービス", active: gym.has_water_service },
              { label: "アメニティ", active: gym.has_amenity },
              { label: "子連れOK", active: gym.has_child_friendly },
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
          {gym.payment_methods && gym.payment_methods.length > 0 && (
            <div className="mt-3">
              <span className="text-sm text-gray-500">支払い方法: </span>
              <span className="text-sm font-medium">{gym.payment_methods.join(" / ")}</span>
            </div>
          )}
        </section>

        {/* Access */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">アクセス・基本情報</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {gym.address && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium w-28">住所</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>{gym.address}</span>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF6B35] hover:underline text-xs font-bold ml-2 whitespace-nowrap"
                        >
                          地図で見る →
                        </a>
                      </div>
                    </td>
                  </tr>
                )}
                {stationInfo.length > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">最寄り駅</td>
                    <td className="py-3 px-4">{stationInfo.join(" / ")}</td>
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
                {gym.booth_count && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">ブース数</td>
                    <td className="py-3 px-4">{gym.booth_count}室</td>
                  </tr>
                )}
                {gym.total_area_sqm && (
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 bg-gray-50 font-medium">面積</td>
                    <td className="py-3 px-4">{gym.total_area_sqm}㎡</td>
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

            {/* Rating Distribution Bar */}
            {gym.review_average_rating > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600">★ {gym.review_average_rating.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">{gym.total_review_count}件の評価</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = reviews.filter((r) => r.rating === rating).length;
                      const percentage = gym.total_review_count > 0 ? (count / gym.total_review_count) * 100 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 w-10">{rating}つ星</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-xs text-gray-600 w-8 text-right">{count}件</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-bold">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                      </span>
                      <span className="text-sm text-gray-500">{review.rating}.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      {review.author_name && <span>{review.author_name}</span>}
                      {review.author_gender && <span>{review.author_gender}</span>}
                      {review.author_age_group && <span>{review.author_age_group}</span>}
                    </div>
                  </div>
                  {review.purpose && (
                    <div className="mt-1 text-xs text-gray-500">目的: {review.purpose}</div>
                  )}
                  {review.title && (
                    <h4 className="font-bold text-gray-800 mt-2">{review.title}</h4>
                  )}
                  <p className="text-gray-600 mt-2 text-sm whitespace-pre-line">{review.content}</p>
                  {review.weight_loss_kg != null && review.weight_loss_kg > 0 && (
                    <div className="mt-2 text-sm text-red-600 font-bold">
                      -{review.weight_loss_kg}kg達成
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                    {review.rating_trainer && <span>トレーナー: {review.rating_trainer}/5</span>}
                    {review.rating_facility && <span>設備: {review.rating_facility}/5</span>}
                    {review.rating_price && <span>価格: {review.rating_price}/5</span>}
                    {review.rating_access && <span>アクセス: {review.rating_access}/5</span>}
                    {review.rating_meal_guidance && <span>食事指導: {review.rating_meal_guidance}/5</span>}
                    {review.rating_goal_achievement && <span>目標達成: {review.rating_goal_achievement}/5</span>}
                    {review.rating_cleanliness && <span>清潔感: {review.rating_cleanliness}/5</span>}
                    {review.rating_atmosphere && <span>雰囲気: {review.rating_atmosphere}/5</span>}
                  </div>
                </div>
              ))}
            </div>

            {reviews.length > 5 && (
              <div className="mt-4 text-center">
                <a
                  href={`/gym/${gym.uid}/reviews/`}
                  className="inline-block bg-[#FF6B35] text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
                >
                  全{gym.total_review_count}件の口コミを見る →
                </a>
              </div>
            )}
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

        {/* Dynamic FAQ Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">よくある質問（利用前のご不安をお答えします）</h2>
          <div className="space-y-3">
            {/* 料金について */}
            {(gym.price_min || gym.price_max) && (
              <details className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg overflow-hidden group">
                <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-orange-100 list-none flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="text-[#FF6B35] font-bold">💰</span>
                    <span>Q. 料金について</span>
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-700 bg-white bg-opacity-50">
                  A. {gym.name}の料金は、月額{gym.price_min ? `¥${gym.price_min.toLocaleString()}` : ""}
                  {gym.price_max ? `～¥${gym.price_max.toLocaleString()}` : ""}です。
                  {gym.trial_available && gym.price_trial !== null ? ` 体験レッスンは${gym.price_trial === 0 ? "無料" : `¥${gym.price_trial.toLocaleString()}`}で受けられます。` : ""}
                  詳細な料金プランについては、上記の料金プランセクションをご参照ください。
                </div>
              </details>
            )}

            {/* 体験レッスンについて */}
            {gym.trial_available && (
              <details className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg overflow-hidden group">
                <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-green-100 list-none flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">🎯</span>
                    <span>Q. 体験レッスンについて</span>
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-700 bg-white bg-opacity-50">
                  A. はい、{gym.name}では体験レッスンをご用意しています。
                  {gym.price_trial !== null ? ` 体験料金は${gym.price_trial === 0 ? "無料" : `¥${gym.price_trial.toLocaleString()}`}です。` : ""}
                  お気軽にお問い合わせいただくか、公式サイトからご予約ください。
                </div>
              </details>
            )}

            {/* アクセスについて */}
            {(gym.nearest_station || gym.address) && (
              <details className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg overflow-hidden group">
                <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-blue-100 list-none flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">📍</span>
                    <span>Q. アクセスについて</span>
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-700 bg-white bg-opacity-50">
                  A. {gym.nearest_station ? (
                    <>
                      {gym.name}は{gym.nearest_station}駅から徒歩{gym.walk_minutes ?? ""}分の好立地にあります。
                      {gym.address ? ` 住所は${gym.address}です。` : ""}
                      {gym.access_info ? ` 詳細：${gym.access_info}` : ""}
                    </>
                  ) : gym.address ? (
                    <>
                      {gym.name}は{gym.address}に位置しています。詳細なアクセス方法については、公式サイトをご確認ください。
                    </>
                  ) : (
                    "アクセス方法について詳しくは、公式サイトをご確認ください。"
                  )}
                </div>
              </details>
            )}
          </div>
        </section>

        {/* Related Articles */}
        <section className="mt-10 bg-blue-50 rounded-xl border border-blue-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">関連コラムを読む</h2>
          <p className="text-sm text-gray-600 mb-5">パーソナルジムで目標を達成するための基礎知識</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/column/gym-beginner/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">初心者向け</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">パーソナルジム初心者ガイド｜始め方・準備すること</h3>
              <p className="text-xs text-gray-600 line-clamp-2">パーソナルジムが初めての方へ。始める前に必要な準備をまとめました。</p>
            </a>
            <a href="/column/gym-cost/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">費用</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">パーソナルジムの料金相場を解説</h3>
              <p className="text-xs text-gray-600 line-clamp-2">パーソナルジムの料金体系を徹底解説。相場費用をまとめた比較表。</p>
            </a>
            <a href="/column/diet-gym/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">ダイエット</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">ダイエットにパーソナルジムをおすすめする理由</h3>
              <p className="text-xs text-gray-600 line-clamp-2">ダイエット成功率が高いパーソナルジムの秘訣を解説します。</p>
            </a>
            <a href="/column/women-gym/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">女性向け</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">女性専用パーソナルジムの選び方</h3>
              <p className="text-xs text-gray-600 line-clamp-2">女性が安心して通えるジムの選び方を解説します。</p>
            </a>
            <a href="/column/gym-trial/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">体験入会</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">パーソナルジムの体験入会を活用しよう</h3>
              <p className="text-xs text-gray-600 line-clamp-2">無料体験でジムの雰囲気を確認する方法を解説します。</p>
            </a>
            <a href="/column/gym-trainer/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">トレーナー</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">パーソナルトレーナーの選び方と資格の見方</h3>
              <p className="text-xs text-gray-600 line-clamp-2">優秀なトレーナーを見極めるポイントと資格の重要性を解説。</p>
            </a>
            <a href="/column/gym-bodymake/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">ボディメイク</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">パーソナルジムで体が変わるまでの期間と目安</h3>
              <p className="text-xs text-gray-600 line-clamp-2">効果が出るまでの期間と実感できるタイミングを解説します。</p>
            </a>
            <a href="/column/gym-diet/" className="bg-white border border-blue-100 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-md transition">
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">ダイエット</div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">パーソナルジムでダイエットを成功させる方法</h3>
              <p className="text-xs text-gray-600 line-clamp-2">ダイエット成功のための実践的な方法と継続のコツ。</p>
            </a>
          </div>
          <div className="text-center mt-5">
            <a href="/column/" className="text-blue-700 font-semibold text-sm hover:underline">
              すべてのコラムを見る →
            </a>
          </div>
        </section>

        {/* Related Gyms */}
        {relatedGyms.length > 0 && (
          <section className="mt-10">
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">近くのパーソナルジム</h2>
              <p className="text-sm text-gray-600 mb-5">{prefectureName}のその他のおすすめジム</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedGyms.map((relatedGym) => (
                  <a key={relatedGym.id} href={`/gym/${relatedGym.uid}/`} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#FF6B35] hover:shadow-lg transition">
                    {relatedGym.image_url && (
                      <img src={relatedGym.image_url} alt={relatedGym.name} className="w-full h-32 object-cover rounded-lg mb-3" loading="lazy" />
                    )}
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{relatedGym.name}</h3>
                    <div className="text-sm text-gray-600 mb-2">
                      {relatedGym.address && <p className="line-clamp-1">📍 {relatedGym.address}</p>}
                      {relatedGym.nearest_station && <p className="line-clamp-1">🚃 {relatedGym.nearest_station}駅 徒歩{relatedGym.walk_minutes ?? "?"}分</p>}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      {relatedGym.review_average_rating > 0 && (
                        <span className="text-yellow-600 font-bold">★ {relatedGym.review_average_rating.toFixed(1)}</span>
                      )}
                      {relatedGym.price_min && (
                        <span className="text-[#FF6B35] font-bold">¥{relatedGym.price_min.toLocaleString()}〜</span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        {(gym.trial_available || gym.website_url) && (
          <div className="mt-10 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-xl p-6 text-center text-white">
            <h3 className="text-lg font-bold mb-2">今すぐお問い合わせ</h3>
            <p className="text-sm mb-4 opacity-95">無料カウンセリング・体験トレーニングを受けてみませんか？</p>
            <div className="flex gap-3 flex-col md:flex-row">
              {gym.trial_available && (
                <a href={gym.website_url || "#"} className="flex-1 bg-white text-[#FF6B35] py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition">
                  無料体験を予約
                </a>
              )}
              {gym.website_url && (
                <a href={gym.website_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white bg-opacity-20 text-white py-3 rounded-lg font-bold text-center hover:bg-opacity-30 transition border border-white border-opacity-30">
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
