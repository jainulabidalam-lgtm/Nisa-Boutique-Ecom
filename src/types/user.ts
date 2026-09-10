/**
 * Represents the NISA Boutique user profile stored in Firestore.
 * Collection: users/{uid}
 */
export interface NisaUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  /** Customer phone number — optional, set by the user in their profile. */
  phone: string | null;
  role: "customer" | "admin";
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}
