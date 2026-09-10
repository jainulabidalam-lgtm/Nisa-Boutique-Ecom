"use client";

import React, { useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { SearchModal } from "@/components/navigation/SearchModal";
import { AccountMenu } from "@/components/layout/AccountMenu";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <div className="bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e5ded0] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Left: Mobile menu toggle + Desktop Nav */}
            <div className="flex items-center">
              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#181818] hover:text-[#9f7d39] transition-colors"
                aria-label="Open mobile menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Desktop Nav */}
              <DesktopNav />
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <BrandLogo />
            </div>

            {/* Right: Actions (Search + Account + Cart) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#181818] hover:text-[#9f7d39] transition-colors"
                aria-label="Open search dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>

              {/* Account Menu */}
              <AccountMenu />

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={toggleCart}
                className="p-2 text-[#181818] hover:text-[#9f7d39] transition-colors relative"
                aria-label={`View shopping bag (${totalItems} items)`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 -mt-0.5 -mr-0.5 w-4 h-4 bg-[#181818] text-[#c6a15b] text-[9px] font-bold rounded-full flex items-center justify-center border border-[#c6a15b]">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
