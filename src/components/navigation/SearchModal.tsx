"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { PRODUCTS, mergeProducts } from "@/data/products";
import { fetchProducts } from "@/lib/firebase/productRepository";
import { formatINR } from "@/lib/utils/currency";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<Product[]>(PRODUCTS);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";

      // Fetch live products when search modal opens
      let isMounted = true;
      fetchProducts()
        .then((firestoreProducts) => {
          if (isMounted && firestoreProducts.length > 0) {
            setCatalog(mergeProducts(firestoreProducts, PRODUCTS));
          }
        })
        .catch((err) => {
          console.warn("Search modal Firestore sync:", err);
        });

      return () => {
        isMounted = false;
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setQuery("");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? catalog.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Boutique Catalog"
      className="fixed inset-0 z-50 flex flex-col items-center bg-black/70 backdrop-blur-sm transition-opacity"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl mt-12 sm:mt-20 mx-4 bg-[#fdfbf7] border border-[#e2d8c7] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#e5ded0] bg-[#ffffff]">
          <svg
            className="w-5 h-5 text-[#9f7d39] mr-3 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suits, fabrics, embroidery (e.g. Silk, Chiffon, Lawn)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#181818] placeholder-[#888888] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-[#888888] hover:text-[#181818] px-2 py-1 mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleClose}
            aria-label="Close search"
            className="p-1 text-[#666666] hover:text-[#181818] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 bg-[#fdfbf7]">
          {query.trim() === "" ? (
            <div className="py-8 text-center">
              <p className="text-xs tracking-widest text-[#9f7d39] uppercase mb-3">Popular Boutique Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Pakistani Suits", "Raw Silk", "Zari Handwork", "Swiss Lawn", "Peshwas"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 bg-[#f5f1e8] hover:bg-[#e8decb] border border-[#e2d8c7] text-[#181818] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#777777] mb-3">
                Found {results.length} boutique piece{results.length > 1 ? "s" : ""}
              </p>
              <div className="divide-y divide-[#eee7da]">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={handleClose}
                    className="flex items-center gap-4 py-3 group hover:bg-[#f5f1e8] px-2 rounded transition-colors"
                  >
                    <div className="relative w-14 h-16 bg-[#181818] shrink-0 overflow-hidden border border-[#e2d8c7]">
                      <Image
                        src={
                          Array.isArray(product.images) && product.images.length > 0
                            ? product.images[0]
                            : "/images/products/zari-raw-silk-1.svg"
                        }
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#9f7d39] uppercase tracking-wider font-medium">
                        {product.categoryName}
                      </p>
                      <h4 className="text-sm font-serif font-semibold text-[#181818] truncate group-hover:text-[#9f7d39] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#666666] truncate">{product.fabric}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-semibold text-[#181818] font-mono">
                        {formatINR(product.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-[#777777]">
              <p className="text-sm">No boutique pieces found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-[#999999]">Try searching for &ldquo;silk&rdquo;, &ldquo;handwork&rdquo;, or &ldquo;lawn&rdquo;.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
