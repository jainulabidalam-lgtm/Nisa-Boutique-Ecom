import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-[#ffffff] border border-[#eee7da] p-8">
        <h3 className="font-serif text-xl text-[#181818] mb-2">
          No Suits Found
        </h3>
        <p className="text-sm text-[#777777] max-w-md mx-auto font-sans">
          We couldn&rsquo;t find any items matching your selected criteria. Try adjusting your
          filters or exploring our full catalog.
        </p>
      </div>
    );
  }

  const colClass =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${colClass} gap-6 lg:gap-8`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
