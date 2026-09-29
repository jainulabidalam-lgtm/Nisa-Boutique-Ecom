"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import {
  toggleProductAvailability,
  toggleProductFeatured,
} from "@/lib/firebase/productRepository";
import { formatINR } from "@/lib/utils/currency";

interface ProductListTableProps {
  products: Product[];
  onProductUpdated: (updatedProduct: Product) => void;
}

export function ProductListTable({
  products,
  onProductUpdated,
}: ProductListTableProps) {
  // Track ongoing toggle actions per product: { [productId]: "availability" | "featured" }
  const [loadingActions, setLoadingActions] = useState<
    Record<string, "availability" | "featured" | undefined>
  >({});
  const [toggleError, setToggleError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  const handleToggleAvailability = async (product: Product) => {
    if (loadingActions[product.id]) return;

    setLoadingActions((prev) => ({ ...prev, [product.id]: "availability" }));
    setToggleError(null);

    const newStatus = !product.available;
    try {
      await toggleProductAvailability(product.id, newStatus);
      onProductUpdated({ ...product, available: newStatus });
    } catch (err) {
      setToggleError({
        id: product.id,
        message:
          err instanceof Error
            ? err.message
            : "Failed to update availability. Please try again.",
      });
    } finally {
      setLoadingActions((prev) => ({ ...prev, [product.id]: undefined }));
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    if (loadingActions[product.id]) return;

    setLoadingActions((prev) => ({ ...prev, [product.id]: "featured" }));
    setToggleError(null);

    const newStatus = !product.featured;
    try {
      await toggleProductFeatured(product.id, newStatus);
      onProductUpdated({ ...product, featured: newStatus });
    } catch (err) {
      setToggleError({
        id: product.id,
        message:
          err instanceof Error
            ? err.message
            : "Failed to update featured status. Please try again.",
      });
    } finally {
      setLoadingActions((prev) => ({ ...prev, [product.id]: undefined }));
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white border border-[#eee7da] p-12 text-center rounded-sm">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#fdf9f4] border border-[#eee7da] flex items-center justify-center text-[#9f7d39]">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="font-serif text-lg font-semibold text-[#181818] mb-1">
          No Products Found
        </h3>
        <p className="text-sm font-sans text-[#777777] max-w-sm mx-auto">
          No items match your selected filters or search keywords. Try adjusting
          your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Inline Notification Banner for Toggle Errors */}
      {toggleError && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-2.5 rounded-sm flex items-center justify-between">
          <span>{toggleError.message}</span>
          <button
            type="button"
            onClick={() => setToggleError(null)}
            className="text-red-600 hover:text-red-900 font-bold ml-4"
          >
            &times;
          </button>
        </div>
      )}

      {/* Desktop Table View (visible md and up) */}
      <div className="hidden md:block overflow-x-auto bg-white border border-[#eee7da] rounded-sm shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fcfaf7] border-b border-[#eee7da] text-[11px] uppercase tracking-[0.18em] text-[#887a6c] font-sans font-semibold">
              <th className="py-3.5 px-4 w-16 text-center">Image</th>
              <th className="py-3.5 px-4">Product Details</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4 text-right">Price (INR)</th>
              <th className="py-3.5 px-4 text-center">Availability</th>
              <th className="py-3.5 px-4 text-center">Featured</th>
              <th className="py-3.5 px-4 text-right w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee7da] text-sm font-sans">
            {products.map((product) => {
              const hasImage =
                Array.isArray(product.images) && product.images.length > 0;
              const primaryImage = hasImage ? product.images[0] : null;
              const isActionBusy = Boolean(loadingActions[product.id]);
              const busyAction = loadingActions[product.id];

              return (
                <tr
                  key={product.id}
                  className="hover:bg-[#fdfbf7] transition-colors"
                >
                  {/* Image Column */}
                  <td className="py-3 px-4 text-center">
                    <div className="relative w-12 h-14 bg-[#181818] rounded-sm overflow-hidden mx-auto border border-[#e5ded0] flex items-center justify-center">
                      {primaryImage ? (
                        <Image
                          src={primaryImage}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-[10px] uppercase font-mono text-[#888888] text-center px-1">
                          No Pic
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Product Details Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-semibold text-[#181818] text-base hover:text-[#9f7d39] transition-colors">
                        {product.name}
                      </span>
                      {product.isNew && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#fdf4e7] text-[#9f7d39] border border-[#f0dfc2]">
                          New
                        </span>
                      )}
                    </div>
                    {product.tagline && (
                      <p className="text-xs text-[#777777] line-clamp-1 mt-0.5">
                        {product.tagline}
                      </p>
                    )}
                    <span className="text-[11px] font-mono text-[#999999]">
                      ID: {product.id} &bull; /{product.slug}
                    </span>
                  </td>

                  {/* Category Column */}
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-1 text-xs font-sans rounded-sm bg-[#f5f1e8] text-[#4a3f35] border border-[#e8dfcf]">
                      {product.categoryName || product.category}
                    </span>
                  </td>

                  {/* Price Column */}
                  <td className="py-3 px-4 text-right">
                    <div className="font-semibold text-[#181818] font-mono text-sm">
                      {formatINR(product.price)}
                    </div>
                    {product.originalPrice && product.price > 0 && product.originalPrice > product.price && (
                      <div className="text-xs text-[#999999] line-through font-mono">
                        {formatINR(product.originalPrice)}
                      </div>
                    )}
                  </td>

                  {/* Availability Column */}
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      disabled={isActionBusy}
                      onClick={() => handleToggleAvailability(product)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all border ${
                        product.available
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                          : "bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      title="Click to toggle availability"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.available ? "bg-emerald-500" : "bg-stone-400"
                        }`}
                      />
                      {busyAction === "availability" ? (
                        <span className="animate-pulse">Saving...</span>
                      ) : product.available ? (
                        "Available"
                      ) : (
                        "Unavailable"
                      )}
                    </button>
                  </td>

                  {/* Featured Column */}
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      disabled={isActionBusy}
                      onClick={() => handleToggleFeatured(product)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all border ${
                        product.featured
                          ? "bg-[#fdf4e7] text-[#9f7d39] border-[#e8cf9c] hover:bg-[#faebd0]"
                          : "bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      title="Click to toggle featured status"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.featured ? "bg-[#c6a15b]" : "bg-stone-400"
                        }`}
                      />
                      {busyAction === "featured" ? (
                        <span className="animate-pulse">Saving...</span>
                      ) : product.featured ? (
                        "Featured"
                      ) : (
                        "Not Featured"
                      )}
                    </button>
                  </td>

                  {/* Edit Column */}
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/products/edit?id=${encodeURIComponent(product.id)}`}
                      className="inline-flex items-center justify-center px-3 py-1 text-xs uppercase tracking-wider font-semibold border border-[#181818] text-[#181818] hover:bg-[#181818] hover:text-[#f5f1e8] transition-colors rounded-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (visible below md) */}
      <div className="md:hidden space-y-3">
        {products.map((product) => {
          const hasImage =
            Array.isArray(product.images) && product.images.length > 0;
          const primaryImage = hasImage ? product.images[0] : null;
          const isActionBusy = Boolean(loadingActions[product.id]);
          const busyAction = loadingActions[product.id];

          return (
            <div
              key={product.id}
              className="bg-white border border-[#eee7da] p-4 rounded-sm shadow-sm space-y-3"
            >
              <div className="flex gap-3">
                <div className="relative w-16 h-20 bg-[#181818] rounded-sm overflow-hidden shrink-0 border border-[#e5ded0] flex items-center justify-center">
                  {primaryImage ? (
                    <Image
                      src={primaryImage}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-[10px] uppercase font-mono text-[#888888] text-center px-1">
                      No Pic
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-sm text-[#181818] truncate">
                      {product.name}
                    </h4>
                    {product.isNew && (
                      <span className="shrink-0 px-1.5 py-0.2 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-[#fdf4e7] text-[#9f7d39] border border-[#f0dfc2]">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#887a6c] font-sans mt-0.5">
                    {product.categoryName || product.category}
                  </p>
                  <p className="font-mono text-sm font-semibold text-[#181818] mt-1">
                    {formatINR(product.price)}
                  </p>
                </div>
              </div>

              {/* Toggles & Edit Bar on Mobile */}
              <div className="pt-2 border-t border-[#f0ebe2] flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={isActionBusy}
                    onClick={() => handleToggleAvailability(product)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      product.available
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-stone-100 text-stone-600 border-stone-300"
                    } disabled:opacity-50`}
                  >
                    {busyAction === "availability"
                      ? "Saving..."
                      : product.available
                      ? "Available"
                      : "Unavailable"}
                  </button>

                  <button
                    type="button"
                    disabled={isActionBusy}
                    onClick={() => handleToggleFeatured(product)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      product.featured
                        ? "bg-[#fdf4e7] text-[#9f7d39] border-[#e8cf9c]"
                        : "bg-stone-100 text-stone-500 border-stone-200"
                    } disabled:opacity-50`}
                  >
                    {busyAction === "featured"
                      ? "Saving..."
                      : product.featured
                      ? "Featured"
                      : "Standard"}
                  </button>
                </div>

                <Link
                  href={`/admin/products/edit?id=${encodeURIComponent(product.id)}`}
                  className="px-3 py-1 text-xs uppercase tracking-wider font-semibold border border-[#181818] text-[#181818] hover:bg-[#181818] hover:text-[#f5f1e8] transition-colors rounded-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
