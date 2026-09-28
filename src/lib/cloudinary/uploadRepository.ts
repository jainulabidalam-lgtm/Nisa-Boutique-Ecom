/**
 * Cloudinary Client-Side Upload Repository (Unsigned)
 *
 * Uses Cloudinary's unsigned upload preset to securely upload product images
 * directly from the browser without exposing any API secret.
 */

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB limit
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
  originalFilename: string;
}

/**
 * Validates file MIME type and file size in the browser before upload.
 */
function validateProductImage(file: File): void {
  const normalizedType = file.type.toLowerCase();
  if (!ALLOWED_IMAGE_TYPES.includes(normalizedType)) {
    throw new Error(
      `Unsupported file type "${file.type || "unknown"}". Allowed image formats: JPG, JPEG, PNG, WEBP.`
    );
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(
      `File size (${sizeMb} MB) exceeds the maximum allowed limit of 5 MB.`
    );
  }
}

/**
 * Uploads a product image directly to Cloudinary using an unsigned upload preset.
 *
 * @param file - Browser File object
 * @returns Promise resolving to secureUrl, publicId, and originalFilename
 */
export async function uploadProductImage(
  file: File
): Promise<CloudinaryUploadResult> {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "afqaccb6";
  const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "nisa-boutique-products";

  if (!cloudName) {
    throw new Error("Cloudinary cloud name is not configured.");
  }
  if (!uploadPreset) {
    throw new Error("Cloudinary upload preset is not configured.");
  }

  // Client-side validation before sending request
  validateProductImage(file);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Network error occurred while connecting to Cloudinary. Please check your internet connection."
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      data?.error?.message ||
      `Cloudinary upload failed with HTTP status ${response.status}.`;
    throw new Error(errorMessage);
  }

  if (!data?.secure_url || !data?.public_id) {
    throw new Error("Cloudinary response did not return expected image data.");
  }

  return {
    secureUrl: data.secure_url as string,
    publicId: data.public_id as string,
    originalFilename: (data.original_filename as string) || file.name,
  };
}
