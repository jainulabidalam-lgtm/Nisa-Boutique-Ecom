import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  STORE_ADDRESS,
  PHONE_NUMBERS,
  GOOGLE_MAPS_URL,
} from "@/components/store/StoreInfoSection";

export function EstablishedSection() {
  return (
    <section className="py-20 sm:py-32 bg-[#181818] text-[#f5f1e8] relative overflow-hidden">
      {/* Subtle Background Pattern / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c6a15b]/10 via-[#181818]/0 to-transparent opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[#c6a15b]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#c6a15b]">
                Khidirpur, Kolkata &bull; EST. 2008
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#fdfbf7] mb-6 leading-tight">
              Physical Boutique Excellence Since 2008
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#b5ada0] font-sans leading-relaxed max-w-xl">
              <p>
                For over a decade, NISA BOUTIQUE has welcomed patrons to our physical storefront in Kolkata, offering an authentic curation of Pakistani dresses, handwork suits, and curated women&apos;s fashion.
              </p>

              {/* Physical Location Highlights */}
              <div className="pt-2 pb-2 border-y border-[#333333] space-y-2">
                <p className="text-xs uppercase tracking-wider text-[#c6a15b] font-semibold">
                  Store Address:
                </p>
                <p className="text-xs sm:text-sm text-[#f5f1e8] leading-relaxed break-words">
                  {STORE_ADDRESS}
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#b5ada0]">
                  <span>Phones:</span>
                  {PHONE_NUMBERS.map((p) => (
                    <a
                      key={p.raw}
                      href={`tel:${p.raw}`}
                      aria-label={`Call NISA BOUTIQUE at ${p.display}`}
                      className="text-[#c6a15b] hover:underline font-mono"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                variant="gold"
                size="md"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to NISA BOUTIQUE on Google Maps"
              >
                Get Directions / View on Map
              </Button>
              <Button variant="secondary" size="md" href="/about">
                Our Story
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 border border-[#c6a15b]/40 translate-x-4 -translate-y-4" />
            <div className="absolute inset-0 bg-[#222222] border border-[#333333] overflow-hidden flex items-center justify-center p-8">
              <Image
                src="/images/nisa-boutique-logo.png"
                alt="NISA Boutique logo"
                width={490}
                height={436}
                className="w-48 sm:w-56 h-auto object-contain opacity-90"
              />
            </div>
            {/* Signature Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#f5f1e8] p-6 border border-[#e5ded0] shadow-xl">
              <p className="font-serif text-3xl font-bold text-[#181818] leading-none mb-1">
                2008
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#9f7d39] font-sans font-semibold">
                ESTABLISHED
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
