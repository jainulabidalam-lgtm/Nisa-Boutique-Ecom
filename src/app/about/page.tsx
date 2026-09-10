import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { StoreInfoSection } from "@/components/store/StoreInfoSection";

export const metadata: Metadata = {
  title: "Our Story - EST. 2008 | NISA Boutique",
  description:
    "Discover NISA Boutique, established in 2008 in Khidirpur, Kolkata, West Bengal. Specializing in authentic Pakistani dresses, suits, handwork suits, cotton suits, and boutique pieces.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#fdfbf7] min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[35vh] min-h-[320px] flex items-center justify-center bg-[#111111] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/hero/hero-fashion.svg"
            alt="NISA Boutique Atmosphere"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#c6a15b] block mb-2">
            Established 2008 &bull; Khidirpur, Kolkata
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#f5f1e8] mb-4">
            Our Story & Heritage
          </h1>
          <div className="w-16 h-px bg-[#c6a15b] mx-auto" />
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BrandLogo />
          </div>

          <div className="prose prose-lg mx-auto text-[#4a4a4a] font-sans leading-relaxed text-center sm:text-left space-y-6">
            <p className="text-lg sm:text-xl font-serif text-[#181818] leading-snug text-center max-w-2xl mx-auto italic">
              &ldquo;An authentic curation of Pakistani suits, intricate handwork, and timeless boutique fashion, rooted in physical boutique tradition since 2008.&rdquo;
            </p>

            <p>
              Established in 2008, NISA BOUTIQUE is a physical women&apos;s fashion boutique located at Karl Marx Sarani, Khidirpur, Kolkata. For years, our boutique has been dedicated to offering authentic Pakistani dresses, Pakistani suits, handwork suits, cotton suits, and curated boutique pieces to our patrons.
            </p>

            <p>
              We prioritize genuine fabrics and artisanal handwork techniques including zardozi, tilla, and dabka. Every piece in our curation—from festive lawn to formal raw silk and embroidered ensembles—reflects quality craftsmanship and enduring style.
            </p>

            {/* Heritage Highlights */}
            <div className="py-8 my-8 border-y border-[#eee7da] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#181818] mb-1">2008</h3>
                <p className="text-xs uppercase tracking-widest text-[#777777]">Established Year</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#181818] mb-1">Kolkata</h3>
                <p className="text-xs uppercase tracking-widest text-[#777777]">Physical Store</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#181818] mb-1">Pakistani Fashion</h3>
                <p className="text-xs uppercase tracking-widest text-[#777777]">Boutique Curation</p>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#181818] pt-4 mb-3">
              The Physical Boutique Experience
            </h3>
            <p>
              As an established physical boutique, we believe in the tactile experience of luxury fashion. Customers are always welcome to visit our Kolkata boutique to feel the fabrics, examine the hand-embroidery in person, and consult with our team for fittings and custom requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Real Store Information Section */}
      <StoreInfoSection variant="light" />
    </div>
  );
}
