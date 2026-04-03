import React from "react";
import NextLink from "next/link";
import { GYM_CONDITIONS } from "@/types/conditions";

interface ConditionLinksProps {
  prefectureSlug: string;
  citySlug?: string;
  areaName: string;
}

/**
 * 条件絞り込みリンク一覧
 * エリアページに配置し、条件ページへの内部リンクを生成
 */
const ConditionLinks: React.FC<ConditionLinksProps> = ({
  prefectureSlug,
  citySlug,
  areaName,
}) => {
  const basePath = citySlug
    ? `/gym/area/${prefectureSlug}/${citySlug}`
    : `/gym/area/${prefectureSlug}`;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold text-gray-700 mb-2">条件で絞り込む</h3>
      <div className="flex flex-wrap gap-2">
        {GYM_CONDITIONS.map((condition) => (
          <NextLink
            key={condition.slug}
            href={`${basePath}/${condition.slug}/`}
            className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-orange-50 hover:text-[#FF6B35] transition-colors no-underline"
          >
            {condition.shortLabel}
          </NextLink>
        ))}
      </div>
    </div>
  );
};

export default ConditionLinks;
