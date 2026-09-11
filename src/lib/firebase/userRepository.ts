import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { NisaUser } from "@/types/user";

/**
 * Creates a Firestore user document for the given Firebase user if one does
 * not already exist. Accepts optional overrides (e.g. displayName set just
 * before the Firestore write during email/password signup).
 *
 * This function is idempotent — calling it multiple times for the same user
 * is safe; subsequent calls will not overwrite the existing document.
 */
export async function createUserDocument(
  user: User,
  overrides: Partial<Pick<NisaUser, "displayName">> = {}
): Promise<void> {
  const ref = doc(getFirebaseDb(), "users", user.uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    const now = new Date().toISOString();
    const data: NisaUser = {
      uid: user.uid,
      email: user.email,
      displayName: overrides.displayName ?? user.displayName,
      photoURL: user.photoURL,
      phone: null,
      role: "customer",
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(ref, {
      ...data,
      // Store a server-side timestamp for accurate ordering in queries
      _serverCreatedAt: serverTimestamp(),
    });
  }
}

/**
 * Fetches and returns the NisaUser profile for the given UID from Firestore.
 * Returns null if the document does not exist.
 */
export async function getUserDocument(uid: string): Promise<NisaUser | null> {
  const ref = doc(getFirebaseDb(), "users", uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  // Normalise serverTimestamp fields back to ISO strings if present
  const toISO = (val: unknown): string => {
    if (val instanceof Timestamp) return val.toDate().toISOString();
    if (typeof val === "string") return val;
    return new Date().toISOString();
  };

  return {
    uid: data.uid,
    email: data.email ?? null,
    displayName: data.displayName ?? null,
    photoURL: data.photoURL ?? null,
    phone: data.phone ?? null,
    role: data.role ?? "customer",
    createdAt: toISO(data.createdAt),
    updatedAt: toISO(data.updatedAt),
  };
}
