import React from "react";
import { ProductSize } from "@/types/product";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize | null;
  onSelectSize: (size: ProductSize) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-sans">
        <span className="uppercase tracking-wider font-semibold text-[#181818]">
          Select Size
        </span>
        <span className="text-[#888888] underline cursor-pointer hover:text-[#181818]">
          Boutique Size Guide
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`min-w-[48px] px-3.5 py-2.5 text-xs font-medium font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer border ${isSelected
                ? "bg-[#181818] text-[#f5f1e8] border-[#181818] ring-1 ring-[#c6a15b]"
                : "bg-white text-[#181818] border-[#d8cfc0] hover:border-[#181818]"
                }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {selectedSize === "Unstitched" && (
        <p className="text-[11px] text-[#777777] italic font-sans">
          * Unstitched includes complete shirt fabric, embroidered neckline patches, trouser fabric, and finished dupatta.
        </p>
      )}

      {selectedSize === "Custom" && (
        <p className="text-[11px] text-[#9f7d39] font-sans">
          * Custom stitching: Our boutique master tailor will connect via WhatsApp to confirm your specific measurements.
        </p>
      )}
    </div>
  );
}
