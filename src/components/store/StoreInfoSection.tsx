import React from "react";
import { Button } from "@/components/ui/Button";

interface StoreInfoSectionProps {
  className?: string;
  variant?: "light" | "charcoal";
}

export const STORE_ADDRESS =
  "49/5/H/213/1 Karl Marx Sarani, Baghkothi Mod, Babubazar, Khidirpur, Kolkata - 700023, West Bengal";

export const PHONE_NUMBERS = [
  { raw: "9088546334", display: "9088546334" },
  { raw: "9007794294", display: "9007794294" },
];

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=49%2F5%2FH%2F213%2F1+Karl+Marx+Sarani%2C+Baghkothi+Mod%2C+Babubazar%2C+Khidirpur%2C+Kolkata+-+700023%2C+West+Bengal";

export function StoreInfoSection({
  className = "",
  variant = "light",
}: StoreInfoSectionProps) {
  const isCharcoal = variant === "charcoal";

  return (
    <section
      id="store-information"
      aria-labelledby="store-information-heading"
      className={`py-16 sm:py-20 border-t ${
        isCharcoal
          ? "bg-[#181818] text-[#f5f1e8] border-[#292929]"
          : "bg-[#fdfbf7] text-[#181818] border-[#eee7da]"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className={`inline-block text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-3 ${
              isCharcoal ? "text-[#c6a15b]" : "text-[#9f7d39]"
            }`}
          >
            Physical Boutique &bull; EST. 2008
          </span>

          <h2
            id="store-information-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4"
          >
            Visit NISA BOUTIQUE
          </h2>

          <p
            className={`text-sm sm:text-base font-sans max-w-xl mx-auto mb-10 ${
              isCharcoal ? "text-[#b5ada0]" : "text-[#666666]"
            }`}
          >
            Experience our curated Pakistani dresses, handwork suits, and luxury fabrics in person at our Kolkata boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Store Address Card */}
          <div
            className={`p-6 sm:p-8 border flex flex-col justify-between ${
              isCharcoal
                ? "bg-[#1f1f1f] border-[#333333]"
                : "bg-white border-[#e5ded0] shadow-sm"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                    isCharcoal
                      ? "bg-[#282828] border-[#3e3e3e] text-[#c6a15b]"
                      : "bg-[#f5f1e8] border-[#e2d8c7] text-[#9f7d39]"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold leading-tight">
                    Store Location
                  </h3>
                  <p
                    className={`text-[11px] uppercase tracking-wider font-sans ${
                      isCharcoal ? "text-[#a9a193]" : "text-[#777777]"
                    }`}
                  >
                    Khidirpur, Kolkata
                  </p>
                </div>
              </div>

              <address className="not-italic text-sm sm:text-base font-sans leading-relaxed break-words mb-6">
                49/5/H/213/1 Karl Marx Sarani, Baghkothi Mod, Babubazar, Khidirpur, Kolkata - 700023, West Bengal
              </address>
            </div>

            <div>
              <Button
                variant={isCharcoal ? "gold" : "primary"}
                size="sm"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                aria-label="Get directions to NISA BOUTIQUE on Google Maps"
              >
                Get Directions / View on Map
              </Button>
            </div>
          </div>

          {/* Contact & Phone Numbers Card */}
          <div
            className={`p-6 sm:p-8 border flex flex-col justify-between ${
              isCharcoal
                ? "bg-[#1f1f1f] border-[#333333]"
                : "bg-white border-[#e5ded0] shadow-sm"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                    isCharcoal
                      ? "bg-[#282828] border-[#3e3e3e] text-[#c6a15b]"
                      : "bg-[#f5f1e8] border-[#e2d8c7] text-[#9f7d39]"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
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
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold leading-tight">
                    Direct Boutique Lines
                  </h3>
                  <p
                    className={`text-[11px] uppercase tracking-wider font-sans ${
                      isCharcoal ? "text-[#a9a193]" : "text-[#777777]"
                    }`}
                  >
                    Call for inquiries & fittings
                  </p>
                </div>
              </div>

              <p
                className={`text-xs font-sans mb-4 ${
                  isCharcoal ? "text-[#a9a193]" : "text-[#666666]"
                }`}
              >
                Tap a phone number below to call directly:
              </p>

              <div className="space-y-2.5 mb-6">
                {PHONE_NUMBERS.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    aria-label={`Call NISA BOUTIQUE at ${phone.display}`}
                    className={`flex items-center justify-between px-4 py-3 border text-sm font-sans font-medium transition-all group ${
                      isCharcoal
                        ? "bg-[#181818] border-[#333333] text-[#f5f1e8] hover:border-[#c6a15b] hover:text-[#c6a15b]"
                        : "bg-[#fdfbf7] border-[#e2d8c7] text-[#181818] hover:border-[#c6a15b] hover:text-[#9f7d39]"
                    }`}
                  >
                    <span className="tracking-widest">{phone.display}</span>
                    <span className="text-xs uppercase tracking-wider opacity-80 group-hover:opacity-100 flex items-center gap-1">
                      Call Now &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center pt-2">
              <span
                className={`text-[11px] uppercase tracking-widest font-sans font-medium ${
                  isCharcoal ? "text-[#c6a15b]" : "text-[#9f7d39]"
                }`}
              >
                Established 2008 &bull; Physical Boutique
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
