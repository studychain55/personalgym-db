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

  return (
    <NextLink
      href={`/gym/${gym.uid}/`}
      className="block no-underline group"
    >
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
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
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {gym.trial_available && (
              <span className="bg-[#FF6B35] text-white text-xs font-bold px-2 py-1 rounded">
                体験あり
              </span>
            )}
            {gym.has_female_only && (
              <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                女性専用
              </span>
            )}
            {gym.has_money_back && (
              <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                返金保証
              </span>
            )}
          </div>
          {gym.brand && (
            <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {gym.brand.name}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors line-clamp-1">
            {gym.name}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            {area && <span>{area}</span>}
            {gym.nearest_station && (
              <span>
                {gym.nearest_station}駅 徒歩{gym.walk_minutes ?? "?"}分
              </span>
            )}
          </div>

          {gym.catchphrase && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {gym.catchphrase}
            </p>
          )}

          {/* Price */}
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {(gym.price_min || gym.price_max) && (
              <div className="text-sm">
                <span className="text-gray-500">月額</span>
                <span className="ml-1 font-bold text-[#FF6B35]">
                  {formatPrice(gym.price_min)}
                  {gym.price_max && gym.price_min !== gym.price_max && `〜${formatPrice(gym.price_max)}`}
                </span>
              </div>
            )}
            {gym.price_per_session && (
              <div className="text-xs text-gray-500">
                1回あたり {formatPrice(gym.price_per_session)}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="mt-2 flex flex-wrap gap-1">
            {gym.price_trial != null && gym.price_trial === 0 && (
              <span className="text-xs bg-green-50 text-green-700 font-medium px-2 py-0.5 rounded">
                無料体験
              </span>
            )}
            {gym.options_diet && (
              <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded">
                食事指導あり
              </span>
            )}
          </div>

          {/* Rating */}
          {gym.review_average_rating > 0 && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{gym.review_average_rating.toFixed(1)}</span>
              <span className="text-gray-400">({gym.total_review_count}件)</span>
            </div>
          )}

          {/* Tags */}
          {recommendedTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {recommendedTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-orange-50 text-[#FF6B35] px-2 py-0.5 rounded-full"
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
