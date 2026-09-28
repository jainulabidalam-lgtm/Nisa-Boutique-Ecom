import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "nb-001",
    slug: "zari-embroidered-raw-silk-suit",
    name: "Zari Embroidered Raw Silk Suit",
    tagline: "Heirloom gold hand-tilla on deep charcoal silk",
    description:
      "An opulent 3-piece ensemble featuring rich Korean raw silk in deep charcoal, embellished with hand-guided metallic tilla and antique dabka along the neckline and cuffs. Accompanied by a pure organza dupatta with scalloped borders and straight silk trousers.",
    details: [
      "3-Piece: Embroidered Shirt, Straight Trouser & Organza Dupatta",
      "Handcrafted tilla and cutdana work along collar and sleeves",
      "Shirt Length: 46 inches with side slits",
      "Full pure silk lining included",
      "Dry clean only",
    ],
    fabric: "Korean Raw Silk & Pure Organza",
    careInstructions: "Professional dry clean only. Store in breathable muslin bag.",
    price: 385,
    originalPrice: 425,
    category: "handwork",
    categoryName: "Handwork Suits",
    sizes: ["S", "M", "L", "XL", "Unstitched"],
    images: [
      "/images/products/zari-raw-silk-1.svg",
      "/images/products/zari-raw-silk-2.svg",
      "/images/products/zari-raw-silk-3.svg",
    ],
    available: true,
    featured: true,
    isNew: true,
    badge: "Handwork Atelier",
  },
  {
    id: "nb-002",
    slug: "noor-chiffon-formal-anarkali",
    name: "Noor Chiffon Formal Anarkali",
    tagline: "Voluminous kalidar in champagne tone with sequin sprinkle",
    description:
      "A classic 16-kali silhouette executed in diaphanous champagne chiffon. Softly illuminated with micro-sequins, resham threadwork, and an antique gold gota border. Paired with a churidar and four-sided bordered chiffon dupatta.",
    details: [
      "3-Piece: Kalidar Frock, Churidar Pajama & Chiffon Dupatta",
      "Over 4 meters of flare with structured cancan underlay option",
      "Bodice featuring delicate sequin and resham embroidery",
      "Custom stitching available upon boutique inquiry",
    ],
    fabric: "Pure Micro Chiffon with Silk Lining",
    careInstructions: "Specialist dry clean recommended. Iron on reverse low heat.",
    price: 340,
    category: "pakistani-suits",
    categoryName: "Pakistani Suits",
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/images/products/noor-anarkali-1.svg",
      "/images/products/noor-anarkali-2.svg",
    ],
    available: true,
    featured: true,
    isNew: true,
    badge: "New Arrival",
  },
  {
    id: "nb-003",
    slug: "heritage-tilla-velvet-kurti-ensemble",
    name: "Heritage Tilla Velvet Kurti Ensemble",
    tagline: "Royal micro-velvet shirt with antique marori work",
    description:
      "Crafted from premium 9000 micro-velvet in deep noir, this regal straight silhouette is framed by traditional marori and antique gold tilla embroidery. Paired with raw silk cigarette pants and an ivory banarasi jamawar shawl.",
    details: [
      "3-Piece: Embroidered Velvet Shirt, Raw Silk Pants & Jamawar Shawl",
      "Heritage neckline inspired by Lahore atelier archives",
      "Shawl finished with handcrafted kiran lace edging",
      "Shirt Length: 42 inches",
    ],
    fabric: "9000 Micro Velvet & Pure Silk",
    careInstructions: "Specialist dry clean only. Steam from distance.",
    price: 460,
    category: "handwork",
    categoryName: "Handwork Suits",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/images/products/velvet-kurti-1.svg",
      "/images/products/velvet-kurti-2.svg",
    ],
    available: true,
    featured: true,
    isNew: false,
    badge: "Boutique Exclusive",
  },
  {
    id: "nb-004",
    slug: "lawn-jacquard-printed-three-piece",
    name: "Lawn Jacquard Printed 3-Piece",
    tagline: "Breathable luxury cotton with woven gold filaments",
    description:
      "Designed for warm elegance, this 3-piece features an ultra-fine Swiss lawn shirt woven with delicate zari jacquard motifs. Detailed with pearl-finished button loops, printed lawn dupatta, and tailored cambric trousers.",
    details: [
      "3-Piece: Jacquard Lawn Shirt, Cambric Trousers & Voile Dupatta",
      "Lightweight, breathable weave ideal for seasonal gatherings",
      "Subtle gold metallic thread woven into fabric ground",
      "Pre-shrunk fabric base",
    ],
    fabric: "Combed Swiss Lawn & Fine Cambric",
    careInstructions: "Gentle machine wash cold or gentle hand wash. Do not bleach.",
    price: 165,
    category: "cotton",
    categoryName: "Cotton Suits",
    sizes: ["XS", "S", "M", "L", "XL", "Unstitched"],
    images: [
      "/images/products/lawn-jacquard-1.svg",
      "/images/products/lawn-jacquard-2.svg",
    ],
    available: true,
    featured: false,
    isNew: true,
    badge: "Seasonal Edit",
  },
  {
    id: "nb-005",
    slug: "royal-jamawar-bridal-peshwas",
    name: "Royal Jamawar Festive Peshwas",
    tagline: "Heirloom bespoke kalidar for festive occasions",
    description:
      "An exceptional boutique piece cut from pure Banarasi jamawar in ivory and champagne gold. The fitted bodice is heavily encrusted with zardozi, semi-precious stones, and French knots, flowing into a cascading flared skirt.",
    details: [
      "Master Artisan Piece: Kalidar Gown, Pure Silk Trousers & Heavily Worked Dupatta",
      "Over 120 hours of hand embroidery by Nisa Boutique artisans",
      "Includes bespoke fitting consultation with boutique tailors",
      "Signature handmade potli pouch included",
    ],
    fabric: "Pure Banarasi Weave & Net Dupatta",
    careInstructions: "Strictly specialist dry clean. Air dry in shade.",
    price: 520,
    originalPrice: 580,
    category: "boutique-pieces",
    categoryName: "Boutique Pieces",
    sizes: ["S", "M", "L", "Custom"],
    images: [
      "/images/products/jamawar-peshwas-1.svg",
      "/images/products/jamawar-peshwas-2.svg",
    ],
    available: true,
    featured: true,
    isNew: false,
    badge: "Masterpiece",
  },
  {
    id: "nb-006",
    slug: "handcrafted-chikankari-organza-set",
    name: "Handcrafted Chikankari Organza Set",
    tagline: "Fine shadow work on sheer ivory organza",
    description:
      "Intricate hand-embroidered chikankari needlework across pure organza in a warm ivory palette. Lined with soft mulmul, this graceful ensemble comes with a cutwork embroidered dupatta and tailored culottes.",
    details: [
      "3-Piece: Chikankari Organza Shirt, Inner Slip, Culottes & Cutwork Dupatta",
      "Artisanal shadow stitch and floral jaal motif",
      "Scalloped hand-cut embroidery along the hem and sleeves",
    ],
    fabric: "Pure Organza with Cotton Mulmul Slip",
    careInstructions: "Dry clean only to maintain hand-embroidery tension.",
    price: 295,
    category: "handwork",
    categoryName: "Handwork Suits",
    sizes: ["S", "M", "L"],
    images: [
      "/images/products/chikankari-1.svg",
      "/images/products/chikankari-2.svg",
    ],
    available: true,
    featured: false,
    isNew: false,
  },
  {
    id: "nb-007",
    slug: "swiss-lawn-embroidered-ensemble",
    name: "Swiss Lawn Embroidered Ensemble",
    tagline: "Crisp pastel cotton with floral cross-stitch",
    description:
      "Everyday luxury redefined. Premium combed Swiss lawn enhanced with fine thread embroidery on the neckline, sleeve cuffs, and chaak. Complete with a soft printed chiffon dupatta and straight cigarette trousers.",
    details: [
      "3-Piece: Embroidered Lawn Shirt, Chiffon Dupatta & Dyed Cotton Trousers",
      "High thread count breathable cotton lawn",
      "Color-fast dyes ensuring lasting vibrancy",
    ],
    fabric: "100% Swiss Combed Lawn",
    careInstructions: "Gentle wash cold. Line dry in shade.",
    price: 145,
    category: "cotton",
    categoryName: "Cotton Suits",
    sizes: ["XS", "S", "M", "L", "XL", "Unstitched"],
    images: [
      "/images/products/swiss-lawn-1.svg",
      "/images/products/swiss-lawn-2.svg",
    ],
    available: true,
    featured: true,
    isNew: false,
  },
  {
    id: "nb-008",
    slug: "pure-banarasi-brocade-kalidar",
    name: "Pure Banarasi Brocade Kalidar",
    tagline: "Hand-loomed gold floral brocade with zardozi yoke",
    description:
      "A celebration of classical subcontinent textile arts. Hand-loomed gold brocade woven with antique zari motifs, framed by a hand-worked zardozi collar and a sheer metallic tissue dupatta with hand-finished fringe.",
    details: [
      "3-Piece: Brocade Flared Kalidar, Raw Silk Trousers & Tissue Dupatta",
      "Limited boutique edition crafted in small artisan batches",
      "Heirloom finish with inner hand-stitched piping",
    ],
    fabric: "Handwoven Banarasi Silk & Tissue",
    careInstructions: "Dry clean only. Do not spray fragrance directly on brocade.",
    price: 440,
    category: "boutique-pieces",
    categoryName: "Boutique Pieces",
    sizes: ["S", "M", "L", "Custom"],
    images: [
      "/images/products/banarasi-kalidar-1.svg",
      "/images/products/banarasi-kalidar-2.svg",
    ],
    available: true,
    featured: true,
    isNew: true,
    badge: "Limited Edition",
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(currentSlug: string, category: string, limit = 3): Product[] {
  return PRODUCTS
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

/**
 * Merges Firestore products with fallback/static products.
 * Firestore products take priority, and items are deduplicated by both ID and slug.
 */
export function mergeProducts(
  firestoreProducts: Product[],
  fallbackProducts: Product[] = PRODUCTS
): Product[] {
  if (!firestoreProducts || firestoreProducts.length === 0) {
    return fallbackProducts;
  }

  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();
  const merged: Product[] = [];

  // Firestore products have first priority (including newly created items and admin edits)
  for (const product of firestoreProducts) {
    if (product && product.slug && !seenSlugs.has(product.slug) && !seenIds.has(product.id)) {
      seenSlugs.add(product.slug);
      seenIds.add(product.id);
      merged.push(product);
    }
  }

  // Include fallback static products if they were not overridden or already in Firestore
  for (const product of fallbackProducts) {
    if (product && product.slug && !seenSlugs.has(product.slug) && !seenIds.has(product.id)) {
      seenSlugs.add(product.slug);
      seenIds.add(product.id);
      merged.push(product);
    }
  }

  return merged;
}
