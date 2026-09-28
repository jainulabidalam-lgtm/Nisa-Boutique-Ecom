"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Product, ProductCategory } from "@/types/product";
import { fetchProducts } from "@/lib/firebase/productRepository";
import { ProductListTable } from "@/components/admin/ProductListTable";

type AvailabilityFilter = "all" | "available" | "unavailable";
type FeaturedFilter = "all" | "featured" | "unfeatured";
type CategoryFilter = "all" | ProductCategory;
type SortType = "newest" | "name-asc" | "price-asc" | "price-desc";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search & Filter controls
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("all");
  const [featuredFilter, setFeaturedFilter] = useState<FeaturedFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sortOption, setSortOption] = useState<SortType>("newest");

  // Load products from Firestore on mount
  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((items) => {
        if (isMounted) {
          setProducts(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setErrorMessage(
            err instanceof Error
              ? err.message
              : "Unable to retrieve catalogue from Firestore. Please verify your connection or admin permissions."
          );
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Manual refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    setErrorMessage(null);
    try {
      const items = await fetchProducts();
      setProducts(items);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to retrieve catalogue from Firestore. Please verify your connection or admin permissions."
      );
    } finally {
      setRefreshing(false);
    }
  };

  // Retry handler
  const handleRetry = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const items = await fetchProducts();
      setProducts(items);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to retrieve catalogue from Firestore. Please verify your connection or admin permissions."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle local state update when availability or featured toggle is clicked in table
  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Filtered & Sorted products pipeline
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Query (name, categoryName, category, slug)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // 2. Availability Filter
    if (availabilityFilter === "available") {
      result = result.filter((p) => p.available);
    } else if (availabilityFilter === "unavailable") {
      result = result.filter((p) => !p.available);
    }

    // 3. Featured Filter
    if (featuredFilter === "featured") {
      result = result.filter((p) => p.featured);
    } else if (featuredFilter === "unfeatured") {
      result = result.filter((p) => !p.featured);
    }

    // 4. Category Filter
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // 5. Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
        default: {
          const timeA = a.updatedAt
            ? new Date(a.updatedAt).getTime()
            : a.createdAt
            ? new Date(a.createdAt).getTime()
            : 0;
          const timeB = b.updatedAt
            ? new Date(b.updatedAt).getTime()
            : b.createdAt
            ? new Date(b.createdAt).getTime()
            : 0;
          if (timeA !== timeB) return timeB - timeA;
          return a.id.localeCompare(b.id);
        }
      }
    });

    return result;
  }, [
    products,
    searchQuery,
    availabilityFilter,
    featuredFilter,
    categoryFilter,
    sortOption,
  ]);

  const countLabel =
    filteredProducts.length === 1
      ? "1 product"
      : `${filteredProducts.length} products`;

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#fdfbf7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Breadcrumb & Return to Dashboard */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="text-xs uppercase tracking-widest font-sans font-semibold text-[#887a6c] hover:text-[#9f7d39] transition-colors flex items-center gap-1.5"
          >
            <span>&larr;</span> Admin Portal
          </Link>
          <span className="text-[11px] font-mono text-[#887a6c]">
            Database: Firestore
          </span>
        </div>

        {/* Header Bar */}
        <div className="bg-white border border-[#eee7da] p-6 sm:p-8 rounded-sm shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#9f7d39] mb-1">
              NISA Boutique &bull; Management Console
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#181818]">
              Product Catalogue
            </h1>
            <p className="text-sm font-sans text-[#666666] mt-1">
              Manage inventory, availability, and showcase items across the
              boutique.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              type="button"
              id="admin-products-refresh-btn"
              disabled={loading || refreshing}
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-sans font-semibold border border-[#eee7da] text-[#4a3f35] bg-[#fdfbf7] hover:bg-[#f5efe4] transition-colors rounded-sm disabled:opacity-50"
              title="Refresh catalogue from Firestore"
            >
              <svg
                className={`w-4 h-4 text-[#9f7d39] ${
                  refreshing ? "animate-spin" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            {/* Add Product Button */}
            <Link
              href="/admin/products/new"
              id="admin-products-add-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-sans font-semibold bg-[#181818] text-[#f5f1e8] hover:bg-[#333333] transition-colors rounded-sm shadow-sm"
            >
              <span>+</span> Add Product
            </Link>
          </div>
        </div>

        {/* 1. Loading State */}
        {loading && (
          <div className="bg-white border border-[#eee7da] p-16 text-center rounded-sm">
            <div className="w-10 h-10 border-2 border-[#eee7da] border-t-[#c6a15b] rounded-full animate-spin mx-auto mb-4" />
            <p className="font-serif text-lg text-[#181818] tracking-wide">
              Loading Catalogue
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-[#9f7d39] font-sans mt-1">
              Connecting to Firestore&hellip;
            </p>
          </div>
        )}

        {/* 2. Error State */}
        {!loading && errorMessage && (
          <div className="bg-white border border-red-200 p-8 rounded-sm text-center shadow-sm">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#181818] mb-1">
              Catalogue Load Failed
            </h3>
            <p className="text-sm font-sans text-red-700 max-w-md mx-auto mb-5">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-5 py-2 text-xs uppercase tracking-widest font-sans font-semibold bg-[#181818] text-[#f5f1e8] hover:bg-[#333333] transition-colors rounded-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* 3. Empty Catalogue State (No products in Firestore yet) */}
        {!loading && !errorMessage && products.length === 0 && (
          <div className="bg-white border border-[#eee7da] p-12 sm:p-16 text-center rounded-sm shadow-sm space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#fdf4e7] border border-[#f0dfc2] text-[#c6a15b] flex items-center justify-center">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#181818]">
              Catalogue is Empty
            </h2>
            <p className="text-sm font-sans text-[#666666] max-w-md mx-auto">
              There are currently no products saved in Firestore. Click below to
              add your first boutique item.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest font-sans font-semibold bg-[#c6a15b] text-[#181818] hover:bg-[#b59048] transition-colors rounded-sm shadow-sm"
              >
                + Add First Product
              </Link>
            </div>
          </div>
        )}

        {/* 4. Loaded Catalogue with Filters & Table */}
        {!loading && !errorMessage && products.length > 0 && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="bg-white border border-[#eee7da] p-4 sm:p-5 rounded-sm shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search Field */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label
                    htmlFor="admin-search-input"
                    className="block text-[10px] uppercase tracking-wider font-semibold text-[#887a6c] mb-1 font-sans"
                  >
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      id="admin-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Name, category, slug..."
                      className="w-full text-sm font-sans px-3 py-2 pl-9 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] placeholder-[#999999] focus:outline-none focus:border-[#c6a15b]"
                    />
                    <svg
                      className="w-4 h-4 text-[#999999] absolute left-3 top-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label
                    htmlFor="admin-category-filter"
                    className="block text-[10px] uppercase tracking-wider font-semibold text-[#887a6c] mb-1 font-sans"
                  >
                    Category
                  </label>
                  <select
                    id="admin-category-filter"
                    value={categoryFilter}
                    onChange={(e) =>
                      setCategoryFilter(e.target.value as CategoryFilter)
                    }
                    className="w-full text-sm font-sans px-3 py-2 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                  >
                    <option value="all">All Categories</option>
                    <option value="pakistani-suits">Pakistani Suits</option>
                    <option value="handwork">Handwork Suits</option>
                    <option value="cotton">Cotton Suits</option>
                    <option value="boutique-pieces">Boutique Pieces</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label
                    htmlFor="admin-availability-filter"
                    className="block text-[10px] uppercase tracking-wider font-semibold text-[#887a6c] mb-1 font-sans"
                  >
                    Availability
                  </label>
                  <select
                    id="admin-availability-filter"
                    value={availabilityFilter}
                    onChange={(e) =>
                      setAvailabilityFilter(
                        e.target.value as AvailabilityFilter
                      )
                    }
                    className="w-full text-sm font-sans px-3 py-2 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                  >
                    <option value="all">All Availability</option>
                    <option value="available">Available (In Stock)</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>

                {/* Featured Filter */}
                <div>
                  <label
                    htmlFor="admin-featured-filter"
                    className="block text-[10px] uppercase tracking-wider font-semibold text-[#887a6c] mb-1 font-sans"
                  >
                    Featured
                  </label>
                  <select
                    id="admin-featured-filter"
                    value={featuredFilter}
                    onChange={(e) =>
                      setFeaturedFilter(e.target.value as FeaturedFilter)
                    }
                    className="w-full text-sm font-sans px-3 py-2 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                  >
                    <option value="all">All Items</option>
                    <option value="featured">Featured Only</option>
                    <option value="unfeatured">Not Featured</option>
                  </select>
                </div>
              </div>

              {/* Bottom Row: Sort & Count */}
              <div className="pt-3 border-t border-[#f0ebe2] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wider font-semibold text-[#887a6c]">
                    Sort By:
                  </span>
                  <select
                    id="admin-sort-selector"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortType)}
                    className="text-xs font-sans px-2.5 py-1 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="name-asc">Name (A &rarr; Z)</option>
                    <option value="price-asc">Price (Low &rarr; High)</option>
                    <option value="price-desc">Price (High &rarr; Low)</option>
                  </select>
                </div>

                <div className="text-xs uppercase tracking-wider font-semibold text-[#887a6c] font-mono">
                  Showing {countLabel}
                </div>
              </div>
            </div>

            {/* Table / Cards */}
            <ProductListTable
              products={filteredProducts}
              onProductUpdated={handleProductUpdated}
            />
          </div>
        )}
      </div>
    </div>
  );
}
