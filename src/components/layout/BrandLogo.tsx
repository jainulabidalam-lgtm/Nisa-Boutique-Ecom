import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  theme?: "dark" | "light";
  className?: string;
  showText?: boolean;
}

export function BrandLogo({
  theme = "light",
  className = "",
  showText = true,
}: BrandLogoProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href="/"
      className={`group inline-flex flex-col items-center justify-center text-center transition-opacity hover:opacity-90 ${className}`}
      aria-label="NISA Boutique - Home"
    >
      <div className="relative">
        <Image
          src="/images/nisa-boutique-logo.png"
          alt="NISA Boutique logo"
          width={490}
          height={436}
          priority
          className="h-10 sm:h-12 w-auto object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col items-center mt-1">
          <span
            className={`font-serif text-base sm:text-lg font-bold tracking-[0.2em] uppercase transition-colors leading-tight ${
              isDark ? "text-[#f5f1e8]" : "text-[#181818]"
            }`}
          >
            NISA BOUTIQUE
          </span>
          <span
            className={`text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-sans font-medium mt-0.5 ${
              isDark ? "text-[#c6a15b]" : "text-[#9f7d39]"
            }`}
          >
            EST. 2008
          </span>
        </div>
      )}
    </Link>
  );
}
