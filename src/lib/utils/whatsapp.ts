/**
 * WhatsApp Integration Utility for NISA Boutique
 *
 * Generates structured, product-specific click-to-chat inquiry messages and URLs
 * for seamless customer inquiries on WhatsApp.
 */

import { Product } from "@/types/product";
import { formatINR } from "@/lib/utils/currency";
import { getSiteOrigin } from "@/lib/config/storeConfig";

export const BOUTIQUE_WHATSAPP_NUMBER = "919088546334";

export interface WhatsAppInquiryOptions {
  size?: string | null;
  quantity?: number;
  origin?: string;
}

/**
 * Resolves full absolute URL for an image path or Cloudinary URL.
 * Direct Cloudinary URLs are preserved intact.
 * Relative paths or localhost URLs are resolved against the canonical site origin.
 */
export function resolveImageUrl(imagePath?: string, origin?: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    if (imagePath.includes("localhost") || imagePath.includes("127.0.0.1")) {
      const pathname = imagePath.replace(/^https?:\/\/[^/]+/, "");
      const base = getSiteOrigin(origin);
      return `${base}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
    }
    return imagePath;
  }
  const base = getSiteOrigin(origin);
  return `${base}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}

/**
 * Resolves direct absolute product page URL against the canonical site origin.
 * Strictly guarantees no localhost URLs are generated.
 */
export function resolveProductUrl(slug: string, origin?: string): string {
  const base = getSiteOrigin(origin);
  const cleanSlug = (slug || "").replace(/^\/+/, "").replace(/\/+$/, "");
  return `${base}/product/${cleanSlug}`;
}

/**
 * Generates the standardized prefilled WhatsApp inquiry message.
 * Formats message with clean text labels (no emojis) for cross-platform compatibility
 * on WhatsApp Desktop, Web, iOS, and Android without rendering replacement characters.
 */
export function generateProductWhatsAppMessage(
  product: Product,
  options: WhatsAppInquiryOptions = {}
): string {
  const { size, origin } = options;
  const primaryImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : undefined;
  const fullImageUrl = resolveImageUrl(primaryImage, origin);
  const fullProductUrl = resolveProductUrl(product.slug, origin);
  const formattedPrice = formatINR(product.price);
  const categoryLabel = product.categoryName || product.category;

  const lines: string[] = [
    "Hello NISA BOUTIQUE,",
    "",
    "I'm interested in the following product:",
    "",
    `Product: ${product.name}`,
    `Price: ${formattedPrice}`,
    `Category: ${categoryLabel}`,
  ];

  if (size && size.trim().length > 0) {
    lines.push(`Size: ${size.trim()}`);
  }

  if (fullImageUrl) {
    lines.push("", "Product Image:", fullImageUrl);
  }

  if (fullProductUrl) {
    lines.push("", "Product Link:", fullProductUrl);
  }

  lines.push(
    "",
    "Could you please confirm its availability and provide ordering details?",
    "",
    "Thank you."
  );

  return lines.join("\n");
}

/**
 * Generates a complete, safely URL-encoded WhatsApp click-to-chat URL.
 */
export function generateProductWhatsAppUrl(
  product: Product,
  options: WhatsAppInquiryOptions = {}
): string {
  const message = generateProductWhatsAppMessage(product, options);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BOUTIQUE_WHATSAPP_NUMBER;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

