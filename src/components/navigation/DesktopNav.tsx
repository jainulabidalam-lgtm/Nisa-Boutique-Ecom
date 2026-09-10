"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "All Suits", href: "/shop" },
  { name: "Pakistani", href: "/collections/pakistani-suits" },
  { name: "Handwork", href: "/collections/handwork" },
  { name: "Cotton", href: "/collections/cotton" },
  { name: "Boutique Pieces", href: "/collections/boutique-pieces" },
  { name: "EST. 2008", href: "/about" },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs font-sans uppercase tracking-[0.2em] font-medium py-1 relative transition-colors duration-200 ${
              isActive
                ? "text-[#181818] font-semibold"
                : "text-[#4a4a4a] hover:text-[#c6a15b]"
            }`}
          >
            {item.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#c6a15b]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
