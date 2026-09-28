/**
 * Cloudinary Asset Management & Deletion Repository
 *
 * SECURITY NOTICE:
 * Cloudinary asset deletion (`/image/destroy`) requires authentication with
 * the Cloudinary API Secret and API Key (or a server-generated signature).
 *
 * In accordance with our security architecture (Next.js static export `output: "export"`),
 * client-side code MUST NEVER contain or execute requests using Cloudinary API secrets.
 *
 * For this phase:
 * 1. Cloudinary `publicId` strings are saved alongside image URLs in Firestore.
 * 2. Client-side browser deletion with API secret is intentionally not implemented.
 * 3. Orphaned asset cleanup or deletions can be performed via an out-of-band administrative
 *    script or secure backend service where secrets are safely managed.
 */

export interface CloudinaryAssetMetadata {
  secureUrl: string;
  publicId: string;
}

/**
 * Validates whether a given string is a plausible Cloudinary public ID.
 */
export function isValidCloudinaryPublicId(publicId: unknown): publicId is string {
  return typeof publicId === "string" && publicId.trim().length > 0;
}
