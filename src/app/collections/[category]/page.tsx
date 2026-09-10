import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionCatalog } from "@/components/collections/CollectionCatalog";
import { getProductsByCategory } from "@/data/products";
import { getCategoryBySlug, CATEGORIES } from "@/data/categories";

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryInfo = getCategoryBySlug(resolvedParams.category);

  if (!categoryInfo) {
    return { title: "Collection Not Found" };
  }

  return {
    title: categoryInfo.name,
    description: categoryInfo.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryInfo = getCategoryBySlug(resolvedParams.category);

  if (!categoryInfo) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(resolvedParams.category);

  return (
    <CollectionCatalog
      initialProducts={categoryProducts}
      categorySlug={categoryInfo.slug}
      categoryName={categoryInfo.name}
      categoryDesc={categoryInfo.description}
    />
  );
}
