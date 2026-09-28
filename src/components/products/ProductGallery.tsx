"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-[#181818] shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#c6a15b] ring-1 ring-[#c6a15b]"
                    : "border-[#e5ded0] opacity-70 hover:opacity-100"
                }`}
                aria-label={`View photo ${idx + 1} of ${productName}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-contain"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image View */}
      <div className="relative flex-1 aspect-[4/5] bg-[#181818] border border-[#e5ded0] overflow-hidden">
        <Image
          src={images[activeIndex] || images[0]}
          alt={`${productName} - Display Image`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain transition-opacity duration-300"
        />

        {/* Indicator badge */}
        <div className="absolute bottom-4 right-4 bg-[#181818]/80 text-[#f5f1e8] text-[10px] tracking-widest uppercase px-2.5 py-1 backdrop-blur-sm border border-[#333333]">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
