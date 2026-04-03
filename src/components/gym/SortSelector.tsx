import React from "react";
import type { SortKey } from "@/utils/supabase/fetchGyms";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "priority", label: "おすすめ順" },
  { value: "price_asc", label: "料金が安い順" },
  { value: "price_desc", label: "料金が高い順" },
  { value: "rating", label: "口コミ評価順" },
  { value: "review_count", label: "口コミ件数順" },
];

interface SortSelectorProps {
  current: SortKey;
  onChange: (sort: SortKey) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ current, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-gray-600 shrink-0">
        並び替え:
      </label>
      <select
        id="sort-select"
        value={current}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;
