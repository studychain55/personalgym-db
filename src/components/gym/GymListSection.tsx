import React from "react";
import GymCard from "@/features/gym/components/GymCard";
import type { GymListItem } from "@/types";
import { getRankingSectionMode } from "@/utils/zeroResults";

interface GymListSectionProps {
  gyms: GymListItem[];
  totalCount: number;
  title?: string;
  /** trueならランキング表示を試みる（件数によりlist/hiddenに自動切替） */
  enableRanking?: boolean;
}

/**
 * ジム一覧/ランキング表示セクション（0件制御内蔵）
 */
const GymListSection: React.FC<GymListSectionProps> = ({
  gyms,
  totalCount,
  title,
  enableRanking = false,
}) => {
  const mode = enableRanking ? getRankingSectionMode(totalCount) : "list";

  if (mode === "hidden" || gyms.length === 0) return null;

  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {mode === "ranking" ? `${title}ランキング` : title}
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({totalCount}件)
          </span>
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map((gym, index) => (
          <div key={gym.id} className="relative">
            {mode === "ranking" && (
              <div className="absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center text-sm font-bold shadow">
                {index + 1}
              </div>
            )}
            <GymCard gym={gym} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GymListSection;
