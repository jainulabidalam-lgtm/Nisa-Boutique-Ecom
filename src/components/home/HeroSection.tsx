import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      aria-label="NISA BOUTIQUE Storefront Showcase"
      className="w-full bg-[#fdfbf7] border-b border-[#e5ded0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-stretch border border-[#e5ded0] bg-[#141414] overflow-hidden shadow-sm">
          {/* 60–65% Real Storefront Photograph */}
          <div className="relative w-full lg:w-[64%] xl:w-[65%] h-[280px] sm:h-[380px] lg:h-[560px] xl:h-[620px] bg-[#1a1a1a] overflow-hidden group">
            <Image
              src="/images/nisa-boutique-counter.png"
              alt="NISA Boutique storefront in Khidirpur, Kolkata"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-[center_12%] sm:object-[center_10%] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
            {/* Subtle inner rim - NO heavy dark overlay, preserving real warm storefront lighting */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
          </div>

          {/* 35–40% Charcoal / Brand Panel */}
          <div className="w-full lg:w-[36%] xl:w-[35%] bg-[#141414] text-[#f5f1e8] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between items-center text-center border-t lg:border-t-0 lg:border-l border-[#242424]">
            {/* Top Brand Block */}
            <div className="flex flex-col items-center w-full my-auto py-2">
              {/* Official Brand Logo */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 relative mb-4">
                <Image
                  src="/images/nisa-boutique-logo.png"
                  alt="NISA Boutique logo"
                  width={490}
                  height={436}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand Title & Year */}
              <h1 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold tracking-[0.18em] uppercase text-[#f5f1e8] leading-tight">
                NISA BOUTIQUE
              </h1>
              <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-sans font-semibold text-[#c6a15b] mt-2">
                EST. 2008
              </p>

              {/* Factual Curation Highlights */}
              <div className="my-6 sm:my-8 py-5 border-y border-[#262626] w-full max-w-xs">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-sans font-medium text-[#ded7cb]">
                  Pakistani &bull; Handwork &bull; Cotton
                </p>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-sans font-medium text-[#c6a15b] mt-1.5">
                  Boutique Pieces
                </p>
              </div>

              {/* CTAs */}
              <div className="w-full max-w-xs flex flex-col gap-3">
                <Button
                  variant="gold"
                  size="md"
                  href="/shop"
                  fullWidth
                  className="font-semibold tracking-[0.2em] text-xs"
                >
                  SHOP COLLECTION
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="#store-information"
                  fullWidth
                  className="border-[#3a3a3a] text-[#ded7cb] hover:bg-[#1f1f1f] hover:text-[#f5f1e8] hover:border-[#c6a15b] tracking-[0.2em] text-xs"
                >
                  VISIT STORE
                </Button>
              </div>
            </div>

            {/* Subtle Footer Note */}
            <div className="pt-4 border-t border-[#1f1f1f] w-full text-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#777777] font-sans font-medium">
                Khidirpur &bull; Kolkata
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
