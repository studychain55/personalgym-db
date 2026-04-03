import React, { useState } from "react";
import { GYM_CONDITIONS } from "@/types/conditions";

interface FilterPanelProps {
  activeConditions: string[];
  onFilterChange: (conditions: string[]) => void;
  className?: string;
}

/**
 * フィルターパネル - 条件で絞り込むUI
 * モバイルではボトムシート風の開閉式
 */
const FilterPanel: React.FC<FilterPanelProps> = ({
  activeConditions,
  onFilterChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCondition = (slug: string) => {
    const next = activeConditions.includes(slug)
      ? activeConditions.filter((c) => c !== slug)
      : [...activeConditions, slug];
    onFilterChange(next);
  };

  return (
    <div className={className}>
      {/* モバイル: 開閉ボタン */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700"
      >
        <span>
          条件で絞り込む
          {activeConditions.length > 0 && (
            <span className="ml-1 text-[#FF6B35]">({activeConditions.length})</span>
          )}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {/* フィルター内容 */}
      <div className={`${isOpen ? "block" : "hidden"} md:block mt-2 md:mt-0`}>
        <div className="flex flex-wrap gap-2">
          {GYM_CONDITIONS.map((condition) => {
            const isActive = activeConditions.includes(condition.slug);
            return (
              <button
                key={condition.slug}
                type="button"
                onClick={() => toggleCondition(condition.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  isActive
                    ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                }`}
              >
                {condition.shortLabel}
              </button>
            );
          })}
        </div>

        {activeConditions.length > 0 && (
          <button
            type="button"
            onClick={() => onFilterChange([])}
            className="mt-2 text-xs text-gray-500 hover:text-[#FF6B35] transition-colors"
          >
            条件をクリア
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
