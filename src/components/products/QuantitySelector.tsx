"use client";

import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  max = 10,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-[#d8cfc0] bg-white text-sm font-sans">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="px-4 py-3 text-[#666666] hover:bg-[#f5f1e8] hover:text-[#181818] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="px-4 py-2 font-medium text-[#181818] w-12 text-center">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="px-4 py-3 text-[#666666] hover:bg-[#f5f1e8] hover:text-[#181818] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
