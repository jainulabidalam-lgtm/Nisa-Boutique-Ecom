"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/currency";
import { ENABLE_CART_AND_CHECKOUT } from "@/lib/config/storeConfig";
import { BOUTIQUE_WHATSAPP_NUMBER } from "@/lib/utils/whatsapp";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, totalItems } =
    useCart();

  useEffect(() => {
    if (ENABLE_CART_AND_CHECKOUT && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!ENABLE_CART_AND_CHECKOUT || !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfbf7] shadow-2xl border-l border-[#e2d8c7] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e8dfd0] bg-[#ffffff] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#181818] tracking-wide">
                Boutique Bag
              </h2>
              <p className="text-[11px] font-sans tracking-widest uppercase text-[#9f7d39] mt-0.5">
                {totalItems} {totalItems === 1 ? "Item" : "Items"} Selected
              </p>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="p-2 text-[#666666] hover:text-[#181818] hover:bg-[#f5f1e8] rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Boutique Store Banner */}
          <div className="bg-[#f5f1e8] px-6 py-2.5 border-b border-[#e8dfd0] text-center">
            <p className="text-[11px] text-[#181818] tracking-wide">
              <span className="text-[#9f7d39] font-medium">
                NISA BOUTIQUE (EST. 2008)
              </span>{" "}
              &bull; Khidirpur, Kolkata Physical Store
            </p>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#eee7da]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#f5f1e8] border border-[#e2d8c7] flex items-center justify-center text-[#9f7d39] mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-[#181818] mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#777777] max-w-xs mb-6">
                  Explore our curated Pakistani suits, handwork ensembles, and boutique pieces.
                </p>
                <Button variant="primary" size="sm" onClick={closeCart} href="/shop">
                  Discover Collection
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="py-4 flex gap-4">
                  <div className="relative w-20 h-24 bg-[#181818] border border-[#e2d8c7] shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm font-semibold text-[#181818] hover:text-[#9f7d39] transition-colors leading-snug line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-[#999999] hover:text-[#181818] p-1 text-xs ml-2"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          &times;
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#f5f1e8] text-[#181818] border border-[#e2d8c7]">
                          Size: {item.size}
                        </span>
                        <span className="text-[11px] text-[#777777] truncate">
                          {item.product.categoryName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#d8cfc0] bg-white text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="px-2.5 py-1 text-[#666666] hover:bg-[#f5f1e8] hover:text-[#181818] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 font-medium text-[#181818]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="px-2.5 py-1 text-[#666666] hover:bg-[#f5f1e8] hover:text-[#181818] transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#181818] font-mono">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-[#e8dfd0] bg-[#ffffff] space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#666666]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#181818] font-mono">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#888888]">
                  <span>Physical Store Pickup / Delivery</span>
                  <span>Inquire via Boutique</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#181818] pt-2 border-t border-[#f0ebe1]">
                  <span>Total</span>
                  <span className="font-mono">{formatINR(subtotal)}</span>
                </div>
              </div>

              {/* Frontend notice */}
              <p className="text-[10px] text-[#888888] text-center italic">
                * Frontend Demonstration Only — Real payment and checkout will be connected later.
              </p>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() =>
                    alert("Frontend Preview: Checkout and payment integration will be configured in the next phase.")
                  }
                >
                  Proceed to Checkout &bull; {formatINR(subtotal)}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={closeCart}
                  href="/shop"
                >
                  Continue Shopping
                </Button>
              </div>

              {/* WhatsApp direct assist */}
              <div className="pt-2 text-center">
                {(() => {
                  const normalizedEnvPhone = (
                    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
                  ).replace(/\D/g, "");
                  const boutiquePhone = (BOUTIQUE_WHATSAPP_NUMBER || "").replace(/\D/g, "");
                  const whatsappRecipient =
                    normalizedEnvPhone.length > 0 ? normalizedEnvPhone : boutiquePhone;

                  const itemizedLines = items.map(
                    (it, idx) =>
                      `${idx + 1}. ${it.product.name} (Size: ${it.size}, Qty: ${it.quantity})`
                  );

                  const cartMessage = [
                    `Hello Nisa Boutique, I would like to inquire about ordering ${totalItems} item(s) from your online catalog totaling ${formatINR(subtotal)}:`,
                    "",
                    ...itemizedLines,
                    "",
                    "Please confirm availability and ordering details.",
                    "Thank you.",
                  ].join("\n");

                  return (
                    <a
                      href={`https://wa.me/${whatsappRecipient}?text=${encodeURIComponent(
                        cartMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#9f7d39] hover:text-[#7d5b2c] tracking-wider uppercase font-medium"
                    >
                      <span>Order Directly via WhatsApp Boutique Desk &rarr;</span>
                    </a>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
