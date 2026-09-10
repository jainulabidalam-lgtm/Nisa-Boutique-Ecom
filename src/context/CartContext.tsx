"use client";

import React, { createContext, useContext, useState } from "react";
import { Product, ProductSize } from "@/types/product";

export interface CartItem {
  id: string;
  product: Product;
  size: ProductSize;
  quantity: number;
}

interface CartContextType {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  items: CartItem[];
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (id: string, size: ProductSize) => void;
  updateQuantity: (id: string, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([
    // Initial realistic mock cart item for previewing UI immediately
    {
      id: "nb-001",
      product: {
        id: "nb-001",
        slug: "zari-embroidered-raw-silk-suit",
        name: "Zari Embroidered Raw Silk Suit",
        description: "An opulent 3-piece ensemble featuring rich Korean raw silk in deep charcoal.",
        details: ["3-Piece ensemble", "Dry clean only"],
        fabric: "Korean Raw Silk",
        price: 385,
        category: "handwork",
        categoryName: "Handwork Suits",
        sizes: ["M"],
        images: ["/images/products/zari-raw-silk-1.svg"],
        available: true,
        featured: true,
        isNew: true,
      },
      size: "M",
      quantity: 1,
    },
  ]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (product: Product, size: ProductSize, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: product.id, product, size, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string, size: ProductSize) => {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (
    id: string,
    size: ProductSize,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
