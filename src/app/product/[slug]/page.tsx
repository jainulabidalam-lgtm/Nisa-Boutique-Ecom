import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchaseBox } from "@/components/products/ProductPurchaseBox";
import { ProductBreadcrumbs } from "@/components/products/ProductBreadcrumbs";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Badge } from "@/components/ui/Badge";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, product.category, 4);

  return (
    <div className="bg-[#fdfbf7] min-h-screen pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <ProductBreadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.categoryName, href: `/collections/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Gallery */}
          <div className="sticky top-28">
            <ProductGallery images={product.images} productName={product.name} />
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
              <span className="text-2xl font-bold text-[#181818]">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-[#999999] line-through">${product.originalPrice}</span>
              )}
            </div>

            <div className="h-px w-full bg-[#eee7da] mb-6" />

            <div className="prose prose-sm text-[#4a4a4a] font-sans leading-relaxed mb-6 max-w-none">
              <p>{product.description}</p>
            </div>

            {/* Product Details List */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181818] mb-3">Product Details</h3>
              <ul className="space-y-2 text-sm text-[#666666] font-sans">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[#c6a15b]">&bull;</span>
                    {detail}
                  </li>
                ))}
                <li className="flex gap-2">
                  <span className="text-[#c6a15b]">&bull;</span>
                  <span className="font-medium text-[#181818]">Fabric:</span> {product.fabric}
                </li>
                {product.careInstructions && (
                  <li className="flex gap-2">
                    <span className="text-[#c6a15b]">&bull;</span>
                    <span className="font-medium text-[#181818]">Care:</span> {product.careInstructions}
                  </li>
                )}
              </ul>
            </div>

            {/* Purchase UI */}
            <div className="border-t border-[#eee7da]">
              <ProductPurchaseBox product={product} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-[#eee7da]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181818] mb-8 text-center">
              Complete the Collection
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
