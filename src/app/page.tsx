import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { EstablishedSection } from "@/components/home/EstablishedSection";
import { TrustHighlights } from "@/components/home/TrustHighlights";
import { StoreInfoSection } from "@/components/store/StoreInfoSection";
import { getFeaturedProducts } from "@/data/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts products={featuredProducts} />
      <EstablishedSection />
      <TrustHighlights />
      <StoreInfoSection variant="light" />
    </>
  );
}
