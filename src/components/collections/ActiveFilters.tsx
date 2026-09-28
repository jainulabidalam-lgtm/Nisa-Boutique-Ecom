import React from "react";
import { FilterState } from "@/types/product";
import { formatINR } from "@/lib/utils/currency";

interface ActiveFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function ActiveFilters({ filters, setFilters }: ActiveFiltersProps) {
  const hasFilters =
    filters.category ||
    filters.sizes.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice > 0 ||
    filters.onlyInStock;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 pb-4 border-b border-[#eee7da]">
      <span className="text-[10px] uppercase tracking-widest text-[#777777] mr-2 font-sans">
        Active Filters:
      </span>

      {filters.category && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#f5f1e8] text-[#181818] border border-[#e5ded0]">
          {filters.category.replace("-", " ")}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: "" }))}
            className="text-[#999999] hover:text-[#181818]"
          >
            &times;
          </button>
        </span>
      )}

      {filters.sizes.map((size) => (
        <span
          key={size}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#f5f1e8] text-[#181818] border border-[#e5ded0]"
        >
          Size: {size}
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                sizes: prev.sizes.filter((s) => s !== size),
              }))
            }
            className="text-[#999999] hover:text-[#181818]"
          >
            &times;
          </button>
        </span>
      ))}

      {(filters.minPrice > 0 || filters.maxPrice > 0) && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#f5f1e8] text-[#181818] border border-[#e5ded0]">
          Price: {formatINR(filters.minPrice || 0)} - {filters.maxPrice ? formatINR(filters.maxPrice) : "Any"}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 0 }))}
            className="text-[#999999] hover:text-[#181818]"
          >
            &times;
          </button>
        </span>
      )}

      {filters.onlyInStock && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#f5f1e8] text-[#181818] border border-[#e5ded0]">
          In Stock
          <button
            onClick={() => setFilters((prev) => ({ ...prev, onlyInStock: false }))}
            className="text-[#999999] hover:text-[#181818]"
          >
            &times;
          </button>
        </span>
      )}

      <button
        onClick={() =>
          setFilters({
            category: "",
            sizes: [],
            minPrice: 0,
            maxPrice: 0,
            onlyInStock: false,
          })
        }
        className="text-[10px] uppercase tracking-wider text-[#9f7d39] hover:text-[#7d5b2c] underline ml-2 font-sans font-medium"
      >
        Clear All
      </button>
    </div>
  );
}
