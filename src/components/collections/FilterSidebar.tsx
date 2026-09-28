import React from "react";
import { FilterState, ProductSize } from "@/types/product";

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableSizes: ProductSize[];
  className?: string;
}

export function FilterSidebar({ filters, setFilters, availableSizes, className = "" }: FilterSidebarProps) {
  const toggleSize = (size: ProductSize) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const val = parseInt(e.target.value) || 0;
    setFilters((prev) => ({
      ...prev,
      [type === "min" ? "minPrice" : "maxPrice"]: val,
    }));
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#181818] mb-4">Category</h3>
        <div className="space-y-3 font-sans text-sm text-[#4a4a4a]">
          {["All", "Pakistani Suits", "Handwork Suits", "Cotton Suits", "Boutique Pieces"].map((cat) => {
            const catValue = cat === "All" ? "all" : cat.toLowerCase().replace(" ", "-");
            const isSelected = filters.category === catValue || (cat === "All" && filters.category === "");
            return (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${isSelected ? "border-[#c6a15b] bg-[#c6a15b]" : "border-[#cccccc] group-hover:border-[#c6a15b]"}`}>
                  {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={isSelected ? "text-[#181818] font-medium" : "group-hover:text-[#181818]"}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-[#eee7da] w-full" />

      {/* Size Filter */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#181818] mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`min-w-[40px] px-2 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors border ${
                  isSelected ? "bg-[#181818] text-[#f5f1e8] border-[#181818]" : "bg-white text-[#666666] border-[#d8cfc0] hover:border-[#181818] hover:text-[#181818]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-[#eee7da] w-full" />

      {/* Price Filter */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#181818] mb-4">Price Range</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] font-mono text-sm">₹</span>
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handlePriceChange(e, "min")}
              className="w-full bg-white border border-[#e5ded0] pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-[#c6a15b]"
            />
          </div>
          <span className="text-[#888888]">-</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] font-mono text-sm">₹</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handlePriceChange(e, "max")}
              className="w-full bg-white border border-[#e5ded0] pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-[#c6a15b]"
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-[#eee7da] w-full" />

      {/* Availability Filter */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${filters.onlyInStock ? "border-[#c6a15b] bg-[#c6a15b]" : "border-[#cccccc] group-hover:border-[#c6a15b]"}`}>
            {filters.onlyInStock && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          </div>
          <span className={`text-sm ${filters.onlyInStock ? "text-[#181818] font-medium" : "text-[#4a4a4a] group-hover:text-[#181818]"}`}>In Stock Ready to Ship</span>
        </label>
      </div>
    </div>
  );
}
