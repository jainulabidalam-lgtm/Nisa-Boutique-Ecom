import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { sanitizeFirestoreData } from "@/lib/firebase/sanitize";
import type { Product } from "@/types/product";

const PRODUCTS_COLLECTION = "products";

/**
 * Extracts and normalizes image URLs from various possible Firestore document formats.
 */
function extractImages(data: Record<string, unknown>): string[] {
  if (Array.isArray(data.images)) {
    return data.images
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          if ("url" in item && typeof (item as { url: unknown }).url === "string") {
            return (item as { url: string }).url.trim();
          }
          if ("secure_url" in item && typeof (item as { secure_url: unknown }).secure_url === "string") {
            return (item as { secure_url: string }).secure_url.trim();
          }
          if ("secureUrl" in item && typeof (item as { secureUrl: unknown }).secureUrl === "string") {
            return (item as { secureUrl: string }).secureUrl.trim();
          }
        }
        return "";
      })
      .filter((url) => url.length > 0);
  }
  if (typeof data.images === "string" && data.images.trim().length > 0) {
    return [data.images.trim()];
  }
  if (typeof data.image === "string" && data.image.trim().length > 0) {
    return [data.image.trim()];
  }
  if (Array.isArray(data.image)) {
    return data.image.map(String).map((u) => u.trim()).filter((url) => url.length > 0);
  }
  if (typeof data.imageUrl === "string" && data.imageUrl.trim().length > 0) {
    return [data.imageUrl.trim()];
  }
  if (typeof data.secureUrl === "string" && data.secureUrl.trim().length > 0) {
    return [data.secureUrl.trim()];
  }
  return [];
}

/**
 * Extracts and normalizes Cloudinary public IDs from Firestore document data.
 */
function extractPublicIds(data: Record<string, unknown>): string[] | undefined {
  if (Array.isArray(data.cloudinaryPublicIds)) {
    const ids = data.cloudinaryPublicIds
      .map(String)
      .map((id) => id.trim())
      .filter((id) => id.length > 0);
    return ids.length > 0 ? ids : undefined;
  }
  if (typeof data.cloudinaryPublicId === "string" && data.cloudinaryPublicId.trim().length > 0) {
    return [data.cloudinaryPublicId.trim()];
  }
  if (typeof data.publicId === "string" && data.publicId.trim().length > 0) {
    return [data.publicId.trim()];
  }
  return undefined;
}

/**
 * Normalizes a Firestore document snapshot into a typed Product object.
 */
function mapDocToProduct(id: string, data: Record<string, unknown>): Product {
  const images = extractImages(data);
  const cloudinaryPublicIds = extractPublicIds(data);

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
    images,
    cloudinaryPublicIds,
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

  const sanitizedPayload = sanitizeFirestoreData(documentPayload);
  await setDoc(docRef, sanitizedPayload);

  return mapDocToProduct(id, sanitizedPayload as Record<string, unknown>);
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

  const sanitizedUpdates = sanitizeFirestoreData({
    ...updates,
    updatedAt: now,
    _serverUpdatedAt: serverTimestamp(),
  });

  await updateDoc(docRef, sanitizedUpdates);
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
  await updateDoc(
    docRef,
    sanitizeFirestoreData({
      available,
      updatedAt: new Date().toISOString(),
      _serverUpdatedAt: serverTimestamp(),
    })
  );
}

/**
 * Toggles product featured flag (shown on homepage / priority sorting).
 */
export async function toggleProductFeatured(
  id: string,
  featured: boolean
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(
    docRef,
    sanitizeFirestoreData({
      featured,
      updatedAt: new Date().toISOString(),
      _serverUpdatedAt: serverTimestamp(),
    })
  );
}

/**
 * Fetches a single product by its unique document ID.
 * Returns null if not found.
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return mapDocToProduct(docSnap.id, docSnap.data() as Record<string, unknown>);
}

/**
 * Checks whether a product with the given slug already exists in Firestore.
 * Optionally excludes a specific product ID (useful during edit operations).
 */
export async function isSlugTaken(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const existing = await fetchProductBySlug(slug);
  if (!existing) return false;
  if (excludeId && existing.id === excludeId) return false;
  return true;
}

