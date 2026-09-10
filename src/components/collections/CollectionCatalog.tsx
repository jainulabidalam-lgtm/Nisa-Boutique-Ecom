"use client";

import React, { useState, useMemo } from "react";
import { Product, FilterState, ProductSize, SortOption } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterSidebar } from "./FilterSidebar";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { SortDropdown } from "./SortDropdown";
import { ActiveFilters } from "./ActiveFilters";

interface CollectionCatalogProps {
  initialProducts: Product[];
  categorySlug?: string;
  categoryName?: string;
  categoryDesc?: string;
}

const AVAILABLE_SIZES: ProductSize[] = ["XS", "S", "M", "L", "XL", "Unstitched", "Custom"];

export function CollectionCatalog({
  initialProducts,
  categorySlug,
  categoryName,
  categoryDesc,
}: CollectionCatalogProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    category: categorySlug || "",
    sizes: [],
    minPrice: 0,
    maxPrice: 0,
    onlyInStock: false,
  });

  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (filters.category && filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filter by Size
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        filters.sizes.some((size) => p.sizes.includes(size))
      );
    }

    // Filter by Price
    if (filters.minPrice > 0) {
      result = result.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice > 0) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    // Filter by Availability
    if (filters.onlyInStock) {
      result = result.filter((p) => p.available);
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "featured":
      default:
        result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }

    return result;
  }, [initialProducts, filters, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181818] mb-4">
          {categoryName || "Boutique Collection"}
        </h1>
        <p className="text-sm sm:text-base text-[#666666] font-sans">
          {categoryDesc ||
            "Explore our complete curation of exquisite Pakistani dresses, handwork sets, and exclusive pieces."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            availableSizes={AVAILABLE_SIZES}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex items-center justify-between border-b border-[#eee7da] pb-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#181818]"
            >
              <svg className="w-5 h-5 text-[#9f7d39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>

            {/* Desktop Result Count */}
            <p className="hidden lg:block text-xs uppercase tracking-widest text-[#777777] font-medium font-sans">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}
            </p>

            {/* Sort Dropdown */}
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>

          <ActiveFilters filters={filters} setFilters={setFilters} />

          {/* Product Grid */}
          <div className="pt-8">
            <ProductGrid products={filteredProducts} columns={3} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        availableSizes={AVAILABLE_SIZES}
        resultCount={filteredProducts.length}
      />
    </div>
  );
}
