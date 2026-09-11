import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  STORE_ADDRESS,
  PHONE_NUMBERS,
  GOOGLE_MAPS_URL,
} from "@/components/store/StoreInfoSection";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#f5f1e8] border-t border-[#242424] mt-auto">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex justify-start">
              <BrandLogo theme="dark" className="items-start text-left" />
            </div>
            <p className="text-sm text-[#a8a196] leading-relaxed max-w-sm pt-2 font-sans">
              Authentic Pakistani dresses, Pakistani suits, handwork suits, cotton suits,
              and curated boutique pieces. Serving our patrons since 2008.
            </p>
            <div className="pt-2 text-xs text-[#c6a15b] tracking-wider uppercase flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#c6a15b]" />
              <span>Physical Boutique Experience &bull; EST. 2008</span>
            </div>
          </div>

          {/* Collections Column (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c6a15b]">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm text-[#b5ada0]">
              <li>
                <Link
                  href="/collections/pakistani-suits"
                  className="hover:text-[#f5f1e8] transition-colors"
                >
                  Pakistani Suits
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/handwork"
                  className="hover:text-[#f5f1e8] transition-colors"
                >
                  Handwork Suits
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/cotton"
                  className="hover:text-[#f5f1e8] transition-colors"
                >
                  Cotton Suits
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/boutique-pieces"
                  className="hover:text-[#f5f1e8] transition-colors"
                >
                  Boutique Pieces
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[#f5f1e8] transition-colors"
                >
                  View Full Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-[#f5f1e8] transition-colors text-[#c6a15b]"
                >
                  Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c6a15b]">
              Boutique
            </h3>
            <ul className="space-y-2.5 text-sm text-[#b5ada0]">
              <li>
                <Link href="/about" className="hover:text-[#f5f1e8] transition-colors">
                  Our Story (EST. 2008)
                </Link>
              </li>
              <li>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View NISA BOUTIQUE store location on Google Maps"
                  className="hover:text-[#f5f1e8] transition-colors inline-flex items-center gap-1 text-[#c6a15b]"
                >
                  <span>Store Directions</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Physical Store & Contact Information Column (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c6a15b]">
              Store & Contact
            </h3>

            {/* Address */}
            <div>
              <p className="text-[11px] text-[#777777] uppercase tracking-wider mb-1 font-medium">
                Physical Store Address:
              </p>
              <address className="not-italic text-xs sm:text-sm text-[#b5ada0] leading-relaxed break-words">
                {STORE_ADDRESS}
              </address>
              <div className="mt-2">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to NISA BOUTIQUE on Google Maps"
                  className="text-xs text-[#c6a15b] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>View on Map / Get Directions</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="pt-2">
              <p className="text-[11px] text-[#777777] uppercase tracking-wider mb-1.5 font-medium">
                Telephone:
              </p>
              <div className="flex flex-col gap-1.5">
                {PHONE_NUMBERS.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    aria-label={`Call NISA BOUTIQUE at ${phone.display}`}
                    className="text-xs sm:text-sm text-[#f5f1e8] hover:text-[#c6a15b] transition-colors tracking-wider font-mono flex items-center gap-2 py-0.5"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-[#c6a15b] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{phone.display}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#1f1f1f] bg-[#0c0c0c] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p>
            &copy; {new Date().getFullYear()} NISA BOUTIQUE. EST. 2008. Khidirpur, Kolkata, West Bengal.
          </p>
          <div className="flex space-x-6 text-[11px] tracking-wider uppercase text-[#999999]">
            <span>Pakistani Suits</span>
            <span>&bull;</span>
            <span>Handwork Suits</span>
            <span>&bull;</span>
            <span>Cotton Suits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
