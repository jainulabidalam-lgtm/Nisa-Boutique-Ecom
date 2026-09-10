import React from "react";
import { Product } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#ffffff] border-t border-[#eee7da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181818] mb-4">
              Featured Arrivals
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans">
              Discover our latest selection of hand-embroidered suits and seasonal boutique pieces. 
              Limited availability.
            </p>
          </div>
          <div className="shrink-0">
            <Button variant="outline" size="md" href="/shop">
              Shop All Pieces
            </Button>
          </div>
        </div>

        <ProductGrid products={products.slice(0, 4)} columns={4} />
      </div>
    </section>
  );
}
