import React from "react";
import { Metadata } from "next";
import { CollectionCatalog } from "@/components/collections/CollectionCatalog";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Catalog",
  description: "Browse Nisa Boutique's complete catalog of Pakistani dresses, handwork suits, cotton lawn, and exclusive boutique pieces.",
};

export default function ShopPage() {
  const allProducts = getAllProducts();

  return (
    <CollectionCatalog
      initialProducts={allProducts}
      categoryName="The Boutique Catalog"
      categoryDesc="Explore our complete curation of exquisite Pakistani dresses, handwork sets, and exclusive pieces."
    />
  );
}
