"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchaseBox } from "@/components/products/ProductPurchaseBox";
import { ProductBreadcrumbs } from "@/components/products/ProductBreadcrumbs";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fetchProductBySlug, fetchProducts } from "@/lib/firebase/productRepository";
import { getProductBySlug, getRelatedProducts, mergeProducts } from "@/data/products";
import { formatINR } from "@/lib/utils/currency";

interface ProductDetailViewProps {
  slug: string;
  initialProduct?: Product | null;
}

export function ProductDetailView({ slug, initialProduct }: ProductDetailViewProps) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(() => {
    if (initialProduct) {
      return getRelatedProducts(initialProduct.slug, initialProduct.category, 4);
    }
    return [];
  });
  const [loading, setLoading] = useState<boolean>(!initialProduct);

  useEffect(() => {
    let isMounted = true;

    async function loadProductData() {
      try {
        // Try fetching the product directly by slug from Firestore
        const liveProduct = await fetchProductBySlug(slug);
        
        if (isMounted && liveProduct) {
          setProduct(liveProduct);
          
          // Fetch catalogue for related products in the same category
          try {
            const allProducts = await fetchProducts();
            const merged = mergeProducts(allProducts);
            const related = merged
              .filter((p) => p.slug !== liveProduct.slug && p.category === liveProduct.category)
              .slice(0, 4);
            if (isMounted) {
              setRelatedProducts(related);
            }
          } catch {
            // Fallback related products from static list
            if (isMounted) {
              setRelatedProducts(getRelatedProducts(liveProduct.slug, liveProduct.category, 4));
            }
          }
          setLoading(false);
          return;
        }

        // Check static fallback data if Firestore document was not found
        const fallback = getProductBySlug(slug);
        if (isMounted) {
          if (fallback) {
            setProduct(fallback);
            setRelatedProducts(getRelatedProducts(fallback.slug, fallback.category, 4));
          } else {
            setProduct(null);
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn("Error fetching product by slug:", err);
        if (isMounted) {
          const fallback = getProductBySlug(slug) || null;
          setProduct(fallback);
          if (fallback) {
            setRelatedProducts(getRelatedProducts(fallback.slug, fallback.category, 4));
          }
          setLoading(false);
        }
      }
    }

    loadProductData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Loading skeleton state
  if (loading) {
    return (
      <div className="bg-[#fdfbf7] min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-48 bg-[#eee7da] animate-pulse rounded-sm mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="aspect-[4/5] bg-[#eee7da] animate-pulse rounded-sm" />
            <div className="space-y-6 pt-4">
              <div className="h-4 w-24 bg-[#eee7da] animate-pulse rounded-sm" />
              <div className="h-10 w-3/4 bg-[#eee7da] animate-pulse rounded-sm" />
              <div className="h-6 w-32 bg-[#eee7da] animate-pulse rounded-sm" />
              <div className="h-24 w-full bg-[#eee7da] animate-pulse rounded-sm" />
              <div className="h-32 w-full bg-[#eee7da] animate-pulse rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="bg-[#fdfbf7] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white border border-[#eee7da] p-8 sm:p-12 text-center rounded-sm shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#fdf9f4] border border-[#eee7da] flex items-center justify-center text-[#9f7d39]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#181818] mb-2">
            Piece Not Found
          </h1>
          <p className="text-sm font-sans text-[#666666] mb-6">
            The requested boutique piece &ldquo;{slug}&rdquo; could not be found or has been archived.
          </p>
          <Button variant="primary" size="md" href="/shop">
            Browse Full Collection
          </Button>
        </div>
      </div>
    );
  }

  const hasImages = Array.isArray(product.images) && product.images.length > 0;
  const displayImages = hasImages ? product.images : ["/images/products/zari-raw-silk-1.svg"];

  return (
    <div className="bg-[#fdfbf7] min-h-screen pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <ProductBreadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            {
              label: product.categoryName || product.category,
              href: `/collections/${product.category}`,
            },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Gallery */}
          <div className="sticky top-28">
            <ProductGallery images={displayImages} productName={product.name} />
          </div>

          {/* Right: Product Details & Purchase Box */}
          <div className="flex flex-col pt-2 lg:pt-8">
            {/* Header / Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.badge && <Badge variant="charcoal">{product.badge}</Badge>}
              {product.isNew && !product.badge && <Badge variant="gold">New Arrival</Badge>}
              {!product.available && <Badge variant="outline">Made to Order</Badge>}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#181818] leading-tight mb-2">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm uppercase tracking-widest font-sans font-medium text-[#9f7d39] mb-4">
                {product.tagline}
              </p>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold text-[#181818] font-mono">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-[#999999] line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="h-px w-full bg-[#eee7da] mb-6" />

            {product.description && (
              <div className="prose prose-sm text-[#4a4a4a] font-sans leading-relaxed mb-6 max-w-none">
                <p>{product.description}</p>
              </div>
            )}

            {/* Product Details List */}
            {(product.details?.length > 0 || product.fabric || product.careInstructions) && (
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181818] mb-3 font-sans">
                  Product Details
                </h3>
                <ul className="space-y-2 text-sm text-[#666666] font-sans">
                  {Array.isArray(product.details) &&
                    product.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#c6a15b]">&bull;</span>
                        {detail}
                      </li>
                    ))}
                  {product.fabric && (
                    <li className="flex gap-2">
                      <span className="text-[#c6a15b]">&bull;</span>
                      <span className="font-medium text-[#181818]">Fabric:</span> {product.fabric}
                    </li>
                  )}
                  {product.careInstructions && (
                    <li className="flex gap-2">
                      <span className="text-[#c6a15b]">&bull;</span>
                      <span className="font-medium text-[#181818]">Care:</span> {product.careInstructions}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Purchase UI */}
            <div className="border-t border-[#eee7da]">
              <ProductPurchaseBox product={product} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-[#eee7da]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181818]">
                Complete the Collection
              </h2>
              <Link
                href={`/collections/${product.category}`}
                className="text-xs uppercase tracking-widest font-sans font-semibold text-[#9f7d39] hover:text-[#7a5f27] transition-colors"
              >
                View Category &rarr;
              </Link>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
