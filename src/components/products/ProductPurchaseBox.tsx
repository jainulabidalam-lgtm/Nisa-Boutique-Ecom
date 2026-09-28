"use client";

import React, { useState } from "react";
import { Product, ProductSize } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { SizeSelector } from "@/components/products/SizeSelector";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { WhatsAppEnquiryButton } from "@/components/products/WhatsAppEnquiryButton";
import { Button } from "@/components/ui/Button";
import { ENABLE_CART_AND_CHECKOUT } from "@/lib/config/storeConfig";

interface ProductPurchaseBoxProps {
  product: Product;
}

export function ProductPurchaseBox({ product }: ProductPurchaseBoxProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size before adding to bag.");
      return;
    }
    setError("");
    addItem(product, selectedSize, quantity);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Size Selection */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={(size) => {
          setSelectedSize(size);
          setError("");
        }}
      />

      {/* Inquiry & Purchase Actions */}
      <div className="space-y-4">
        {ENABLE_CART_AND_CHECKOUT ? (
          <>
            <div className="flex flex-col sm:flex-row gap-4">
              <QuantitySelector
                quantity={quantity}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                onIncrease={() => setQuantity(quantity + 1)}
              />
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleAddToCart}
                disabled={!product.available}
              >
                {product.available ? "Add to Boutique Bag" : "Currently Unavailable"}
              </Button>
            </div>

            {error && (
              <p className="text-[#a98235] text-xs font-medium font-sans">
                {error}
              </p>
            )}

            <WhatsAppEnquiryButton
              product={product}
              size={selectedSize}
              quantity={quantity}
              variant="outline"
            />
          </>
        ) : (
          <div className="space-y-3">
            <WhatsAppEnquiryButton
              product={product}
              size={selectedSize}
              quantity={quantity}
              variant="primary"
              btnSize="md"
            />
            <p className="text-[11px] text-center text-[#777777] font-sans">
              Connect directly with our Kolkata boutique desk on WhatsApp to confirm size fitting, availability &amp; order details.
            </p>
          </div>
        )}
      </div>

      {/* Boutique Service Highlights */}
      <div className="pt-6 border-t border-[#eee7da] flex flex-col gap-3 text-[11px] font-sans tracking-wider text-[#666666]">
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#9f7d39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p>
            Visit our physical boutique in Khidirpur, Kolkata or inquire via WhatsApp for custom fittings and orders.
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#9f7d39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
          <p>
            Authentic Pakistani curation &amp; artisan handwork tailoring. NISA BOUTIQUE (EST. 2008).
          </p>
        </div>
      </div>
    </div>
  );
}
