import { CategoryInfo } from "@/types/product";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "pakistani-suits",
    name: "Pakistani Suits",
    tagline: "Festive, Chiffon & Formal Ensembles",
    description:
      "Signature Pakistani 3-piece silhouettes crafted with pure chiffons, jacquards, and heirloom dupattas. Refined drape and timeless elegance for celebratory occasions.",
    image: "/images/categories/pakistani-suits.svg",
    count: 12,
  },
  {
    slug: "handwork",
    name: "Handwork Suits",
    tagline: "Zardozi, Tilla & Dabka Artistry",
    description:
      "Handcrafted with precision by generational artisans. Featuring hand-sewn cutdana, metallic tilla threading, and delicate gota detailing on rich fabrics.",
    image: "/images/categories/handwork.svg",
    count: 14,
  },
  {
    slug: "cotton",
    name: "Cotton Suits",
    tagline: "Fine Lawn & Breathable Luxury",
    description:
      "Premium combed cottons, Swiss lawn, and jacquard weaves designed for everyday elegance, climate comfort, and structured tailoring.",
    image: "/images/categories/cotton.svg",
    count: 9,
  },
  {
    slug: "boutique-pieces",
    name: "Boutique Pieces",
    tagline: "Limited Edition Heirloom Creations",
    description:
      "One-of-a-kind boutique silhouettes, royal kalidars, and bespoke formal wear curated for high-profile gatherings and weddings.",
    image: "/images/categories/boutique-pieces.svg",
    count: 8,
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}
