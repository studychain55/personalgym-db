import React from "react";
import NextLink from "next/link";
import type { CityWithCount } from "@/utils/supabase/fetchCities";

interface CityLinksProps {
  prefectureSlug: string;
  cities: CityWithCount[];
}

/**
 * 市区町村リンク一覧
 * 都道府県ページに配置
 */
const CityLinks: React.FC<CityLinksProps> = ({ prefectureSlug, cities }) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold text-gray-700 mb-2">市区町村から探す</h3>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <NextLink
            key={city.id}
            href={`/gym/area/${prefectureSlug}/${city.slug}/`}
            className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-orange-50 hover:text-[#FF6B35] transition-colors no-underline"
          >
            {city.title}
            <span className="text-gray-400 ml-1">({city.gym_count})</span>
          </NextLink>
        ))}
      </div>
    </div>
  );
};

export default CityLinks;
