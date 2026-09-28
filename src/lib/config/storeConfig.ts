/**
 * NISA BOUTIQUE — Store Configuration & Feature Flags
 *
 * INQUIRY-ONLY SHOPPING MODE:
 * The store currently operates on an inquiry-only model where all customer purchases
 * and order inquiries are conducted directly through the boutique's WhatsApp concierge desk.
 *
 * Cart & Checkout Feature Flag:
 * - `ENABLE_CART_AND_CHECKOUT`: Set to `false` for inquiry-only mode (current).
 *   Set to `true` (or set `NEXT_PUBLIC_ENABLE_CART=true` in .env) to re-enable
 *   the online shopping bag, "Add to Cart" actions, and checkout flows in the future.
 */

export const ENABLE_CART_AND_CHECKOUT =
  process.env.NEXT_PUBLIC_ENABLE_CART === "true";

export const STORE_MODE: "inquiry-only" | "e-commerce" = ENABLE_CART_AND_CHECKOUT
  ? "e-commerce"
  : "inquiry-only";

/**
 * Production Canonical Site Origin
 * Used across customer-facing sharing, metadata, and WhatsApp inquiry links
 * to ensure links are never generated with localhost.
 */
export const PRODUCTION_SITE_ORIGIN = "https://nisaboutique-ecom.netlify.app";

/**
 * Centralized Storefront Origin
 * Configurable via NEXT_PUBLIC_SITE_URL with production Netlify URL fallback.
 * Strictly ignores localhost/127.0.0.1 origins for external communication.
 */
export function getSiteOrigin(customOrigin?: string): string {
  if (
    customOrigin &&
    !customOrigin.includes("localhost") &&
    !customOrigin.includes("127.0.0.1")
  ) {
    return customOrigin.replace(/\/+$/, "");
  }

  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (
    envOrigin &&
    !envOrigin.includes("localhost") &&
    !envOrigin.includes("127.0.0.1")
  ) {
    return envOrigin.replace(/\/+$/, "");
  }

  return PRODUCTION_SITE_ORIGIN;
}

export const SITE_ORIGIN = getSiteOrigin();
