import React from "react";
import NextLink from "next/link";
import type { GymListItem } from "@/types";
import { buildGymDetailHref, formatGymPrice } from "@/utils/gymRouting";

interface GymCompareTableProps {
  gyms: GymListItem[];
  title?: string;
}

const yes = (v: boolean) => v ? "✓" : "-";

const GymCompareTable: React.FC<GymCompareTableProps> = ({ gyms, title }) => {
  if (gyms.length === 0) return null;

  return (
    <section className="mt-8">
      {title && <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-3 font-bold border-b sticky left-0 bg-gray-50 z-10">ジム名</th>
              <th className="text-right py-3 px-3 font-bold border-b">月額料金</th>
              <th className="text-right py-3 px-3 font-bold border-b">入会金</th>
              <th className="text-right py-3 px-3 font-bold border-b">体験料金</th>
              <th className="text-center py-3 px-3 font-bold border-b">食事指導</th>
              <th className="text-center py-3 px-3 font-bold border-b">返金保証</th>
              <th className="text-center py-3 px-3 font-bold border-b">女性専用</th>
              <th className="text-center py-3 px-3 font-bold border-b">評価</th>
              <th className="text-center py-3 px-3 font-bold border-b">最寄駅</th>
            </tr>
          </thead>
          <tbody>
            {gyms.map((gym) => (
              <tr key={gym.id} className="border-b border-gray-100 hover:bg-orange-50/30">
                <td className="py-3 px-3 sticky left-0 bg-white z-10">
                  <NextLink href={buildGymDetailHref(gym.uid)} className="text-[#ea580c] font-medium hover:underline no-underline">
                    {gym.name}
                  </NextLink>
                  {gym.brand && <div className="text-xs text-gray-400">{gym.brand.name}</div>}
                </td>
                <td className="py-3 px-3 text-right font-bold text-[#ea580c]">
                  {formatGymPrice(gym.price_min) ?? "-"}
                  {gym.price_max != null &&
                    gym.price_max !== gym.price_min &&
                    formatGymPrice(gym.price_max) && (
                      <span className="text-xs text-gray-400">〜{formatGymPrice(gym.price_max)}</span>
                    )}
                </td>
                <td className="py-3 px-3 text-right">{formatGymPrice(gym.price_enrollment) ?? "-"}</td>
                <td className="py-3 px-3 text-right">
                  {gym.price_trial != null ? (
                    gym.price_trial === 0 ? <span className="text-green-600 font-bold">無料</span> : formatGymPrice(gym.price_trial)
                  ) : "-"}
                </td>
                <td className="py-3 px-3 text-center">{yes(gym.options_diet)}</td>
                <td className="py-3 px-3 text-center">{yes(gym.has_money_back)}</td>
                <td className="py-3 px-3 text-center">{yes(gym.has_female_only)}</td>
                <td className="py-3 px-3 text-center">
                  {gym.review_average_rating > 0 ? (
                    <span>★ {gym.review_average_rating.toFixed(1)}</span>
                  ) : "-"}
                </td>
                <td className="py-3 px-3 text-center text-xs">
                  {gym.nearest_station ? `${gym.nearest_station} ${gym.walk_minutes ?? "?"}分` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GymCompareTable;
