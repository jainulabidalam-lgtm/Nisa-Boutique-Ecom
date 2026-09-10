import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";

export function CategorySection() {
  return (
    <section className="py-20 sm:py-28 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181818] mb-4">
            Curated Collections
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-sans">
            From everyday luxury lawn to bespoke bridal handwork, explore our diverse categories tailored for exquisite taste.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4] bg-[#181818] overflow-hidden mb-6 border border-[#e5ded0] group-hover:border-[#c6a15b]/50 transition-colors">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#181818] group-hover:text-[#9f7d39] transition-colors mb-2 text-center">
                {category.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#777777] font-sans text-center">
                {category.tagline}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
