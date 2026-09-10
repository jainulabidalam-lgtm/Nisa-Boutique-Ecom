import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group flex flex-col h-full bg-[#ffffff] border border-[#eee7da] hover:border-[#c6a15b]/60 transition-all duration-300">
      {/* Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#181818] block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <Badge variant="charcoal" size="sm">
              {product.badge}
            </Badge>
          )}
          {product.isNew && !product.badge && (
            <Badge variant="gold" size="sm">
              New
            </Badge>
          )}
        </div>

        {/* Availability tag if low or out of stock */}
        {!product.available && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-white px-3 py-1 bg-[#181818] border border-[#999999]">
              Made to Order Only
            </span>
          </div>
        )}

        {/* Quick View Prompt Bar on Hover */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-[#181818]/90 text-[#f5f1e8] text-[11px] font-sans uppercase tracking-[0.2em] text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
          View Boutique Piece &rarr;
        </div>
      </Link>

      {/* Info Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#fdfbf7]">
        <div>
          {/* Category */}
          <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#9f7d39] font-medium mb-1">
            {product.categoryName}
          </p>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#181818] group-hover:text-[#9f7d39] transition-colors leading-snug line-clamp-2">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Fabric subtitle */}
          <p className="text-xs text-[#777777] mt-1 line-clamp-1 font-sans">
            {product.fabric}
          </p>
        </div>

        {/* Price & Sizes */}
        <div className="pt-4 mt-4 border-t border-[#eee7da] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-semibold text-[#181818]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#999999] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Available Sizes preview */}
          <div className="text-[10px] tracking-wider text-[#888888] uppercase font-sans">
            {product.sizes.length} Sizes
          </div>
        </div>
      </div>
    </article>
  );
}
