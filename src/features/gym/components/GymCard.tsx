import React from "react";
import NextLink from "next/link";
import type { GymListItem } from "@/types";
import { getRecommendedTags } from "@/utils/gymPurpose";

const formatPrice = (price: number | null) => {
  if (!price) return null;
  return `¥${price.toLocaleString()}`;
};

interface GymCardProps {
  gym: GymListItem;
}

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  const prefName = gym.prefecture?.title || "";
  const cityName = gym.city?.title || "";
  const area = [prefName, cityName].filter(Boolean).join(" ");
  const recommendedTags = getRecommendedTags(gym, 3);

  // バッジを動的に生成
  const featureBadges = [];
  if (gym.trial_available) {
    featureBadges.push({ label: "無料体験あり", color: "bg-green-500" });
  }
  if (gym.has_female_only) {
    featureBadges.push({ label: "女性専用", color: "bg-pink-500" });
  }
  if (gym.has_money_back) {
    featureBadges.push({ label: "返金保証", color: "bg-emerald-600" });
  }

  return (
    <NextLink
      href={`/gym/${gym.uid}/`}
      className="block no-underline group"
    >
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/9] bg-gray-100">
          {gym.image_url ? (
            <img
              src={gym.image_url}
              alt={gym.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
              </svg>
            </div>
          )}
          {/* Feature Badges - 左上に配置 */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {featureBadges.map((badge, idx) => (
              <span
                key={idx}
                className={`${badge.color} text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm`}
              >
                {badge.label}
              </span>
            ))}
          </div>
          {/* Brand Badge - 右上に配置 */}
          {gym.brand && (
            <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
              {gym.brand.name}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors line-clamp-2">
            {gym.name}
          </h3>

          {/* Location & Station Info */}
          <div className="mt-2 space-y-1">
            {area && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{area}</span>
              </div>
            )}
            {gym.nearest_station && (
              <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H9.5A1.5 1.5 0 008 3v2.379l-.894-1.789A1.5 1.5 0 005.553 2.5H4.447a1.5 1.5 0 00-1.342 2.25l3 6c.226.453.681.75 1.195.75h5.4c.514 0 .969-.297 1.195-.75l3-6a1.5 1.5 0 00-1.342-2.25H14.447a1.5 1.5 0 00-1.553 1.09L12 5.379V3a1.5 1.5 0 00-1.5-1.5z" />
                </svg>
                <span>{gym.nearest_station}駅</span>
                {gym.walk_minutes != null && <span className="text-gray-500">徒歩{gym.walk_minutes}分</span>}
              </div>
            )}
          </div>

          {/* Catchphrase */}
          {gym.catchphrase && (
            <p className="text-xs text-gray-600 mt-2 line-clamp-2">
              {gym.catchphrase}
            </p>
          )}

          {/* Price - 目立つ表示 */}
          {(gym.price_min || gym.price_max) && (
            <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-xs text-gray-600 mb-1">月額料金</div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[#FF6B35]">
                  {formatPrice(gym.price_min)}
                </span>
                {gym.price_max && gym.price_min !== gym.price_max && (
                  <span className="text-xs text-gray-700">
                    〜{formatPrice(gym.price_max)}
                  </span>
                )}
              </div>
              {gym.price_per_session && (
                <div className="mt-1 text-xs text-gray-600">
                  1回あたり {formatPrice(gym.price_per_session)}
                </div>
              )}
            </div>
          )}

          {/* Service Badges */}
          <div className="mt-3 flex flex-wrap gap-1">
            {gym.price_trial != null && gym.price_trial === 0 && (
              <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full border border-green-300">
                無料体験
              </span>
            )}
            {gym.options_diet && (
              <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded-full border border-blue-300">
                食事指導
              </span>
            )}
          </div>

          {/* Rating */}
          {gym.review_average_rating > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                <span className="text-yellow-500 text-base">★</span>
                <span className="font-bold text-gray-900">{gym.review_average_rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-500">({gym.total_review_count}件)</span>
            </div>
          )}

          {/* Tags */}
          {recommendedTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {recommendedTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-orange-50 text-[#FF6B35] px-2 py-0.5 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </NextLink>
  );
};

export default GymCard;
