import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import type { GymListItem } from "@/types";
import { getRecommendedTags } from "@/utils/gymPurpose";

const formatPrice = (price: number | null) => {
  if (!price) return null;
  return `¥${price.toLocaleString()}`;
};

interface GymCardProps {
  gym: GymListItem;
}

const PinIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const TrainIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V8h5v3zm2 0V8h5v3h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  const prefName = gym.prefecture?.title || "";
  const cityName = gym.city?.title || "";
  const area = [prefName, cityName].filter(Boolean).join(" ");
  const recommendedTags = getRecommendedTags(gym, 4);

  return (
    <NextLink href={`/gym/${gym.uid}/`} className="block no-underline group">
      <article className="bg-white rounded-xl border border-[#e9e9e9] overflow-hidden hover:shadow-lg hover:border-[#1e782d]/30 transition-all duration-200 hover:-translate-y-0.5 flex flex-col h-full">
        {/* 画像エリア */}
        <div className="relative aspect-[16/9] bg-[#f0f6f0] overflow-hidden flex-shrink-0">
          {gym.image_url ? (
            <Image
              src={gym.image_url}
              alt={gym.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#8fbc96]">
              <svg className="w-10 h-10 mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
              </svg>
              <span className="text-xs text-[#aaaaaa]">画像準備中</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

          {/* バッジ（左上） */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {gym.trial_available && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1e782d] text-white shadow-sm">
                無料体験あり
              </span>
            )}
            {gym.has_female_only && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white shadow-sm">
                女性専用
              </span>
            )}
            {gym.has_money_back && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-sm">
                返金保証
              </span>
            )}
          </div>

          {/* ブランド（右上） */}
          {gym.brand && (
            <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
              {gym.brand.name}
            </span>
          )}

          {/* 料金バッジ（右下） */}
          {gym.price_min && (
            <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
              <span className="text-xs font-bold text-[#1e782d]">{formatPrice(gym.price_min)}〜/月</span>
            </div>
          )}
        </div>

        {/* コンテンツエリア */}
        <div className="p-3 flex flex-col flex-1 gap-1.5">
          {/* 名前 */}
          <h3 className="font-bold text-sm leading-snug line-clamp-2 text-[#121212] group-hover:text-[#1e782d] transition-colors">
            {gym.name}
          </h3>

          {/* 場所 */}
          <div className="flex flex-col gap-0.5">
            {area && (
              <p className="text-xs text-[#828282] flex items-center gap-1">
                <PinIcon />
                <span>{area}</span>
              </p>
            )}
            {gym.nearest_station && (
              <p className="text-xs text-[#828282] flex items-center gap-1">
                <TrainIcon />
                <span>
                  {gym.nearest_station}駅
                  {gym.walk_minutes != null && (
                    <span className="ml-1">徒歩{gym.walk_minutes}分</span>
                  )}
                </span>
              </p>
            )}
          </div>

          {/* キャッチフレーズ */}
          {gym.catchphrase && (
            <p className="text-[11px] text-[#595959] line-clamp-2 pl-2 border-l-2 border-[#1e782d]">
              {gym.catchphrase}
            </p>
          )}

          {/* 月額料金ブロック */}
          {(gym.price_min || gym.price_max) && (
            <div className="p-2 bg-[#f0f6f0] rounded-lg border border-[#bcd7c0]">
              <div className="text-[10px] text-[#828282] mb-0.5">月額料金</div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-[#1e782d]">
                  {formatPrice(gym.price_min)}
                </span>
                {gym.price_max && gym.price_min !== gym.price_max && (
                  <span className="text-xs text-[#595959]">
                    〜{formatPrice(gym.price_max)}
                  </span>
                )}
              </div>
              {gym.price_per_session && (
                <div className="text-[10px] text-[#828282] mt-0.5">
                  1回あたり {formatPrice(gym.price_per_session)}
                </div>
              )}
            </div>
          )}

          {/* 評価 */}
          {gym.review_average_rating > 0 && (
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-bold text-[#121212]">{gym.review_average_rating.toFixed(1)}</span>
              <span className="text-xs text-[#aaaaaa]">({gym.total_review_count}件)</span>
            </div>
          )}

          {/* サービスバッジ */}
          <div className="flex flex-wrap gap-1">
            {gym.price_trial != null && gym.price_trial === 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e9f2ea] text-[#1e782d] font-medium">
                無料体験
              </span>
            )}
            {gym.options_diet && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0f6f0] text-[#1e782d] font-medium">
                食事指導
              </span>
            )}
            {recommendedTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#e9f2ea] text-[#1e782d] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAボタン */}
          <div className="mt-auto pt-2">
            <div className={`w-full text-center text-xs font-bold py-2 px-3 rounded-lg text-white transition-colors ${gym.trial_available ? "bg-[#E55E2F] group-hover:bg-[#c94d24]" : "bg-[#1e782d] group-hover:bg-[#155420]"}`}>
              {gym.trial_available ? "無料体験を予約する →" : "詳細を見る →"}
            </div>
          </div>
        </div>
      </article>
    </NextLink>
  );
};

export default GymCard;
