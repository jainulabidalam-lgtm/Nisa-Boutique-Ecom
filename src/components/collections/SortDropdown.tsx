import React from "react";
import { SortOption } from "@/types/product";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#777777] hidden sm:block">
        Sort By
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-[#fdfbf7] border border-[#e5ded0] text-[#181818] text-xs uppercase tracking-wider font-medium px-4 py-2.5 pr-10 focus:outline-none focus:border-[#c6a15b] transition-colors cursor-pointer"
        >
          <option value="featured">Featured / Curated</option>
          <option value="newest">New Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#9f7d39]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
