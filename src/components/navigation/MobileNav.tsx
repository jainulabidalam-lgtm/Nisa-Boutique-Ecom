"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

const CATEGORIES = [
  { name: "Pakistani Suits", href: "/collections/pakistani-suits", desc: "Festive & Chiffon" },
  { name: "Handwork Suits", href: "/collections/handwork", desc: "Zari, Tilla & Dabka" },
  { name: "Cotton Suits", href: "/collections/cotton", desc: "Swiss Lawn & Everyday" },
  { name: "Boutique Pieces", href: "/collections/boutique-pieces", desc: "Exclusive Masterpieces" },
];

export function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#fdfbf7] border-r border-[#e2d8c7] shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#eee7da]">
            <BrandLogo />
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="p-2 text-[#666666] hover:text-[#181818] rounded-full hover:bg-[#f5f1e8]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Search Button */}
          <div className="pt-4 pb-2">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-[#f5f1e8] border border-[#e2d8c7] text-xs text-[#666666] rounded-none hover:border-[#c6a15b] transition-colors"
            >
              <span>Search suits, fabrics, handwork...</span>
              <svg className="w-4 h-4 text-[#9f7d39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <div className="py-4 space-y-1">
            <Link
              href="/shop"
              onClick={onClose}
              className={`block px-3 py-3 text-xs tracking-[0.2em] uppercase font-semibold border-b border-[#f0ebe1] ${
                pathname === "/shop" ? "text-[#9f7d39]" : "text-[#181818]"
              }`}
            >
              All Suits & Catalog
            </Link>

            <div className="pt-3 pb-1 px-3 text-[10px] uppercase tracking-[0.25em] text-[#9f7d39] font-semibold">
              Collections
            </div>

            {CATEGORIES.map((cat) => {
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={onClose}
                  className={`block px-3 py-2.5 rounded transition-colors ${
                    isActive ? "bg-[#f5f1e8] text-[#9f7d39]" : "hover:bg-[#f5f1e8] text-[#181818]"
                  }`}
                >
                  <div className="font-serif text-sm font-medium">{cat.name}</div>
                  <div className="text-[11px] text-[#777777]">{cat.desc}</div>
                </Link>
              );
            })}

            <div className="pt-3">
              <Link
                href="/about"
                onClick={onClose}
                className={`block px-3 py-3 text-xs tracking-[0.2em] uppercase font-semibold border-t border-[#f0ebe1] ${
                  pathname === "/about" ? "text-[#9f7d39]" : "text-[#181818]"
                }`}
              >
                About Nisa Boutique (EST. 2008)
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-4 border-t border-[#eee7da] space-y-3">
          <div className="text-center">
            <p className="text-[11px] font-serif text-[#181818] font-semibold">
              Kolkata Boutique &bull; EST. 2008
            </p>
            <p className="text-[10px] text-[#666666] font-sans break-words mt-0.5">
              Karl Marx Sarani, Khidirpur, Kolkata
            </p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <a
                href="tel:9088546334"
                aria-label="Call NISA BOUTIQUE at 9088546334"
                className="text-xs font-mono font-medium text-[#9f7d39] hover:underline"
              >
                9088546334
              </a>
              <span className="text-[#cccccc]">&bull;</span>
              <a
                href="tel:9007794294"
                aria-label="Call NISA BOUTIQUE at 9007794294"
                className="text-xs font-mono font-medium text-[#9f7d39] hover:underline"
              >
                9007794294
              </a>
            </div>
          </div>
          <p className="text-[10px] text-center text-[#888888] tracking-widest uppercase">
            Physical Boutique Experience
          </p>
        </div>
      </div>
    </div>
  );
}
