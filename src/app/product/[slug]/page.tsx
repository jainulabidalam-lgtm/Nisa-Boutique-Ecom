import React from "react";
import { Metadata } from "next";
import { getAllProducts, getProductBySlug, mergeProducts } from "@/data/products";
import { fetchProductBySlug, fetchProducts } from "@/lib/firebase/productRepository";
import { ProductDetailView } from "@/components/products/ProductDetailView";

import { formatINR } from "@/lib/utils/currency";

export async function generateStaticParams() {
  const staticProducts = getAllProducts();
  try {
    const firestoreProducts = await fetchProducts();
    const merged = mergeProducts(firestoreProducts, staticProducts);
    return merged.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    return staticProducts.map((product) => ({
      slug: product.slug,
    }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  let product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    try {
      product = (await fetchProductBySlug(resolvedParams.slug)) || undefined;
    } catch {
      product = undefined;
    }
  }

  if (!product) {
    return { title: "Boutique Piece | NISA Boutique" };
  }

  const primaryImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : "/images/products/zari-raw-silk-1.svg";

  const title = `${product.name} — ${formatINR(product.price)} | NISA Boutique`;
  const description =
    product.tagline ||
    product.description ||
    `Exquisite ${product.categoryName || product.category} piece from NISA Boutique (EST. 2008). Inquire via WhatsApp for custom stitching & delivery.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/product/${product.slug}/`,
      images: [
        {
          url: primaryImage,
          alt: product.name,
        },
      ],
      siteName: "NISA Boutique",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [primaryImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let initialProduct = getProductBySlug(resolvedParams.slug) || null;

  if (!initialProduct) {
    try {
      initialProduct = await fetchProductBySlug(resolvedParams.slug);
    } catch {
      initialProduct = null;
    }
  }

  return (
    <ProductDetailView
      slug={resolvedParams.slug}
      initialProduct={initialProduct}
    />
  );
}

