export type ProductCategory =
  | "pakistani-suits"
  | "handwork"
  | "cotton"
  | "boutique-pieces";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "Unstitched" | "Custom";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  details: string[];
  fabric: string;
  careInstructions?: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  categoryName: string;
  sizes: ProductSize[];
  images: string[];
  available: boolean;
  featured: boolean;
  isNew: boolean;
  badge?: string;
}

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  count: number;
}

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

export interface FilterState {
  category: string;
  sizes: ProductSize[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
}
