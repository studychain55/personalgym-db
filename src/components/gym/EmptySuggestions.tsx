import React from "react";
import NextLink from "next/link";
import type { GymListItem } from "@/types";
import GymCard from "@/features/gym/components/GymCard";

interface EmptySuggestionsProps {
  /** 現在の検索エリア名 */
  areaName: string;
  /** 近隣エリアのジム */
  nearbyGyms?: GymListItem[];
  /** 上位エリアへのリンク */
  parentAreaLink?: { label: string; href: string };
  /** 条件違いのリンク一覧 */
  alternativeLinks?: { label: string; href: string }[];
}

/**
 * 0件時の代替表示コンポーネント
 * - 近隣エリアのジムを表示
 * - 上位エリアへの誘導
 * - 条件変更の提案
 */
const EmptySuggestions: React.FC<EmptySuggestionsProps> = ({
  areaName,
  nearbyGyms,
  parentAreaLink,
  alternativeLinks,
}) => {
  return (
    <div className="py-10">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-lg">
          {areaName}に該当するパーソナルジムは現在掲載されていません。
        </p>
        <p className="text-gray-500 mt-2">
          以下の方法でお探しください。
        </p>
      </div>

      {parentAreaLink && (
        <div className="text-center mb-8">
          <NextLink
            href={parentAreaLink.href}
            className="inline-block bg-[#FF6B35] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#E55E2F] transition-colors no-underline"
          >
            {parentAreaLink.label}で探す →
          </NextLink>
        </div>
      )}

      {alternativeLinks && alternativeLinks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3">条件を変えて探す</h3>
          <div className="flex flex-wrap gap-2">
            {alternativeLinks.map((link) => (
              <NextLink
                key={link.href}
                href={link.href}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-orange-50 hover:text-[#FF6B35] transition-colors no-underline"
              >
                {link.label}
              </NextLink>
            ))}
          </div>
        </div>
      )}

      {nearbyGyms && nearbyGyms.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">近隣エリアのパーソナルジム</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptySuggestions;
