import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Product } from "@/types/product";

const PRODUCTS_COLLECTION = "products";

/**
 * Normalizes a Firestore document snapshot into a typed Product object.
 */
function mapDocToProduct(id: string, data: Record<string, unknown>): Product {
  return {
    id,
    slug: typeof data.slug === "string" ? data.slug : id,
    name: typeof data.name === "string" ? data.name : "",
    tagline: typeof data.tagline === "string" ? data.tagline : undefined,
    description: typeof data.description === "string" ? data.description : "",
    details: Array.isArray(data.details) ? data.details.map(String) : [],
    fabric: typeof data.fabric === "string" ? data.fabric : "",
    careInstructions:
      typeof data.careInstructions === "string" ? data.careInstructions : undefined,
    price: typeof data.price === "number" ? data.price : 0,
    originalPrice:
      typeof data.originalPrice === "number" ? data.originalPrice : undefined,
    category: (data.category as Product["category"]) || "pakistani-suits",
    categoryName:
      typeof data.categoryName === "string" ? data.categoryName : "",
    sizes: Array.isArray(data.sizes) ? (data.sizes as Product["sizes"]) : [],
    images: Array.isArray(data.images) ? data.images.map(String) : [],
    cloudinaryPublicIds: Array.isArray(data.cloudinaryPublicIds)
      ? data.cloudinaryPublicIds.map(String)
      : undefined,
    available: Boolean(data.available),
    featured: Boolean(data.featured),
    isNew: Boolean(data.isNew),
    badge: typeof data.badge === "string" ? data.badge : undefined,
    createdAt: typeof data.createdAt === "string" ? data.createdAt : undefined,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
  };
}

/**
 * Fetches all products from Firestore.
 */
export async function fetchProducts(): Promise<Product[]> {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((docSnap) =>
    mapDocToProduct(docSnap.id, docSnap.data() as Record<string, unknown>)
  );
}

/**
 * Fetches a single product by its unique slug.
 * Returns null if not found.
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(colRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const docSnap = snapshot.docs[0];
  return mapDocToProduct(docSnap.id, docSnap.data() as Record<string, unknown>);
}

/**
 * Creates a new product in Firestore.
 * If an ID is provided it will be used, otherwise a new Firestore document ID is generated.
 */
export async function createProduct(
  productData: Omit<Product, "id"> & { id?: string }
): Promise<Product> {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  const docRef = productData.id ? doc(colRef, productData.id) : doc(colRef);
  const id = docRef.id;

  const now = new Date().toISOString();
  const documentPayload = {
    ...productData,
    id,
    createdAt: now,
    updatedAt: now,
    _serverCreatedAt: serverTimestamp(),
    _serverUpdatedAt: serverTimestamp(),
  };

  await setDoc(docRef, documentPayload);

  return mapDocToProduct(id, documentPayload as Record<string, unknown>);
}

/**
 * Updates an existing product by its ID.
 */
export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id">>
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const now = new Date().toISOString();

  await updateDoc(docRef, {
    ...updates,
    updatedAt: now,
    _serverUpdatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a product document by its ID.
 */
export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Toggles product availability (In Stock vs Made to Order/Unavailable).
 */
export async function toggleProductAvailability(
  id: string,
  available: boolean
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    available,
    updatedAt: new Date().toISOString(),
    _serverUpdatedAt: serverTimestamp(),
  });
}

/**
 * Toggles product featured flag (shown on homepage / priority sorting).
 */
export async function toggleProductFeatured(
  id: string,
  featured: boolean
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    featured,
    updatedAt: new Date().toISOString(),
    _serverUpdatedAt: serverTimestamp(),
  });
}

/**
 * Checks whether a product with the given slug already exists in Firestore.
 */
export async function isSlugTaken(slug: string): Promise<boolean> {
  const existing = await fetchProductBySlug(slug);
  return existing !== null;
}

