/**
 * Utility functions for sanitizing Firestore payloads.
 *
 * Firestore's SDK rejects documents containing any field whose value is `undefined`
 * (e.g. `Function setDoc() called with invalid data. Unsupported field value: undefined`).
 *
 * `sanitizeFirestoreData` recursively strips undefined properties from objects and arrays
 * while strictly preserving:
 * - `null`
 * - `false`
 * - `0` (and negative/floating-point numbers)
 * - `""` (empty strings)
 * - Empty arrays `[]`
 * - Firestore FieldValues (such as `serverTimestamp()`, `deleteField()`, `increment()`, `arrayUnion()`, `arrayRemove()`)
 * - Firestore `Timestamp`, `GeoPoint`, `DocumentReference`
 * - `Date` objects and other non-plain class instances
 */

/**
 * Checks whether a given value is a plain JavaScript object (i.e. object literal or Object.create(null)),
 * as opposed to a class instance (like Date, Timestamp, FieldValue, DocumentReference, etc.).
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * Recursively removes all `undefined` values from an object, nested object, or array.
 *
 * @param data The data payload to sanitize.
 * @returns A clean copy of the payload without undefined fields.
 */
export function sanitizeFirestoreData<T>(data: T): T {
  if (data === null || data === undefined || typeof data !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => sanitizeFirestoreData(item)) as unknown as T;
  }

  // Preserve non-plain objects (Date, Timestamp, FieldValue, DocumentReference, etc.)
  if (!isPlainObject(data)) {
    return data;
  }

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value !== undefined) {
      sanitized[key] = sanitizeFirestoreData(value);
    }
  }

  return sanitized as T;
}
