import React, { useEffect } from "react";
import { FilterState, ProductSize } from "@/types/product";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "@/components/ui/Button";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableSizes: ProductSize[];
  resultCount: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  availableSizes,
  resultCount,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#fdfbf7] shadow-2xl h-full flex flex-col animate-in slide-in-from-left duration-300">
        <div className="px-5 py-4 border-b border-[#e5ded0] flex items-center justify-between bg-white">
          <h2 className="font-serif text-lg font-semibold text-[#181818]">Filter & Sort</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-[#666666] hover:text-[#181818]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <FilterSidebar filters={filters} setFilters={setFilters} availableSizes={availableSizes} />
        </div>

        <div className="p-5 border-t border-[#e5ded0] bg-white flex flex-col gap-3">
          <Button variant="primary" size="md" fullWidth onClick={onClose}>
            View {resultCount} {resultCount === 1 ? "Result" : "Results"}
          </Button>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => {
              setFilters({
                category: "",
                sizes: [],
                minPrice: 0,
                maxPrice: 0,
                onlyInStock: false,
              });
            }}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
