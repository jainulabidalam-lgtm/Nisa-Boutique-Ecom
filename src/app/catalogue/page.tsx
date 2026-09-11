import React from "react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Catalogue -- The Collection | NISA Boutique",
  description:
    "Browse NISA Boutique's curated catalogue: Elegant Traditional 3 Piece Suit Set, the Mughal Gem Collection, and the Royal Crimson Collection. Authentic boutique fashion from Khidirpur, Kolkata, EST. 2008.",
};

const CATALOGUE_ENTRIES = [
  {
    id: "elegant-traditional",
    title: "Elegant Traditional",
    subtitle: "3 Piece Suit Set",
    src: "/catalogue/elegant.jpeg",
    alt: "Elegant Traditional 3 Piece Suit Set from NISA Boutique. A complete three-piece ensemble presented on a catalogue layout.",
  },
  {
    id: "mughal-gem",
    title: "The Mughal Gem",
    subtitle: "Collection",
    src: "/catalogue/mughal.jpeg",
    alt: "The Mughal Gem Collection from NISA Boutique. A catalogue spread showcasing the Mughal-inspired range.",
  },
  {
    id: "royal-crimson",
    title: "Royal Crimson",
    subtitle: "Collection",
    src: "/catalogue/crimso9n.jpeg",
    alt: "Royal Crimson Collection from NISA Boutique. A catalogue spread featuring the crimson range.",
  },
];

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8" aria-hidden="true">
      <span className="block h-px w-16 bg-[#c6a15b] opacity-50" />
      <span className="block w-1.5 h-1.5 rounded-full bg-[#c6a15b] opacity-70" />
      <span className="block h-px w-16 bg-[#c6a15b] opacity-50" />
    </div>
  );
}

function CollectionCard({
  id,
  title,
  subtitle,
  src,
  alt,
}: (typeof CATALOGUE_ENTRIES)[0]) {
  return (
    <section
      id={id}
      className="w-full border-b border-[#eee7da] last:border-b-0"
      aria-label={`${title} ${subtitle}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <p className="text-[10px] uppercase tracking-[0.35em] font-sans font-semibold text-[#9f7d39] mb-1">
          NISA Boutique &mdash; Collection
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181818] leading-tight">
          {title}
        </h2>
        <p className="font-serif text-base sm:text-lg italic text-[#555555] mt-0.5">
          {subtitle}
        </p>
        <div className="w-10 h-px bg-[#c6a15b] mt-4" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <a
          href={src}
          target="_blank"
          rel="noopener"
          aria-label={`View full image: ${title} ${subtitle}`}
          className="block group relative overflow-hidden"
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={2200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
            loading="lazy"
            quality={90}
          />
          <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#111111]/80 text-[#c6a15b] text-[10px] uppercase tracking-widest font-sans px-3 py-1.5 pointer-events-none">
            View full size
          </span>
        </a>
      </div>
    </section>
  );
}

export default function CataloguePage() {
  return (
    <div className="bg-[#fdfbf7] min-h-screen">
      {/* Hero Header */}
      <header className="relative bg-[#111111] overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.45em] font-sans font-semibold text-[#c6a15b] mb-6">
            NISA Boutique &bull; Khidirpur, Kolkata &bull; EST. 2008
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#f5f1e8] leading-tight tracking-tight mb-6">
            The Collection
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
            <span className="block h-px w-12 bg-[#c6a15b] opacity-60" />
            <span className="block w-1 h-1 rounded-full bg-[#c6a15b]" />
            <span className="block h-px w-12 bg-[#c6a15b] opacity-60" />
          </div>
          <p className="font-sans text-sm sm:text-base text-[#b5ada0] leading-relaxed max-w-xl mx-auto">
            A curated presentation of NISA Boutique&apos;s current catalogue.
            Three collections, each composed and photographed as catalogue artwork.
            Available at our physical boutique in Kolkata.
          </p>
        </div>
      </header>

      {/* Collection Overview Video */}
      <section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
        aria-label="Collection overview video"
      >
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.35em] font-sans font-semibold text-[#9f7d39] mb-2">
            Overview
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181818]">
            Collection in Motion
          </h2>
        </div>

        <div
          className="relative w-full overflow-hidden bg-[#111111] shadow-[0_4px_40px_rgba(0,0,0,0.18)]"
          style={{ paddingBottom: "56.25%" }}
        >
          <video
            className="absolute inset-0 w-full h-full object-contain"
            controls
            playsInline
            preload="metadata"
            aria-label="NISA Boutique collection overview video"
          >
            <source src="/catalogue/overviewcollection.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.25em] text-[#9f7d39] font-sans font-medium">
          NISA Boutique &mdash; Collection Overview &bull; Kolkata
        </p>
      </section>

      <GoldDivider />

      {/* Three Collection Cards */}
      <div className="py-4">
        {CATALOGUE_ENTRIES.map((entry) => (
          <CollectionCard key={entry.id} {...entry} />
        ))}
      </div>

      {/* Footer CTA */}
      <section className="bg-[#111111] py-14 sm:py-20 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] font-sans font-semibold text-[#c6a15b] mb-4">
          NISA Boutique &bull; Physical Store
        </p>
        <p className="font-serif text-xl sm:text-2xl text-[#f5f1e8] font-semibold max-w-md mx-auto leading-snug mb-6">
          Visit us in Kolkata to experience the collection in person.
        </p>
        <p className="text-sm text-[#7a7268] font-sans">
          Karl Marx Sarani, Khidirpur, Kolkata &bull; West Bengal
        </p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <a
            href="tel:9088546334"
            aria-label="Call NISA Boutique at 9088546334"
            className="text-xs font-mono text-[#c6a15b] hover:text-[#d8b87a] transition-colors"
          >
            9088546334
          </a>
          <span className="text-[#333]" aria-hidden="true">&bull;</span>
          <a
            href="tel:9007794294"
            aria-label="Call NISA Boutique at 9007794294"
            className="text-xs font-mono text-[#c6a15b] hover:text-[#d8b87a] transition-colors"
          >
            9007794294
          </a>
        </div>
      </section>
    </div>
  );
}
