"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProductCategory, ProductSize, Product } from "@/types/product";
import {
  createProduct,
  isSlugTaken,
} from "@/lib/firebase/productRepository";
import {
  uploadProductImage,
  CloudinaryUploadResult,
} from "@/lib/cloudinary/uploadRepository";

const CATEGORY_OPTIONS: { slug: ProductCategory; name: string }[] = [
  { slug: "pakistani-suits", name: "Pakistani Suits" },
  { slug: "handwork", name: "Handwork Suits" },
  { slug: "cotton", name: "Cotton Suits" },
  { slug: "boutique-pieces", name: "Boutique Pieces" },
];

const SIZE_OPTIONS: ProductSize[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "Unstitched",
  "Custom",
];

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

interface ImageItem {
  id: string; // unique local ID for React keys
  file: File;
  previewUrl: string;
  status: "idle" | "uploading" | "success" | "error";
  uploadedResult?: CloudinaryUploadResult;
  errorMessage?: string;
}

interface FormErrors {
  name?: string;
  slug?: string;
  price?: string;
  originalPrice?: string;
  category?: string;
  sizes?: string;
  images?: string;
  general?: string;
}

function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminNewProductPage() {
  const router = useRouter();

  // Basic Information
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [isSlugCustomized, setIsSlugCustomized] = useState<boolean>(false);
  const [tagline, setTagline] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Product Details
  const [fabric, setFabric] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [details, setDetails] = useState<string[]>([""]);

  // Pricing
  const [price, setPrice] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");

  // Category & Sizes
  const [category, setCategory] = useState<ProductCategory>("pakistani-suits");
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([
    "S",
    "M",
    "L",
  ]);

  // Product Status
  const [available, setAvailable] = useState<boolean>(true);
  const [featured, setFeatured] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [badge, setBadge] = useState<string>("");

  // Images
  const [imageList, setImageList] = useState<ImageItem[]>([]);

  // Form State
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStep, setSubmissionStep] = useState<
    "idle" | "validating" | "uploading" | "saving" | "success"
  >("idle");

  // Auto-generate slug when name changes unless manually edited
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isSlugCustomized) {
      setSlug(normalizeSlug(newName));
    }
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugCustomized(true);
    setSlug(normalizeSlug(e.target.value));
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: undefined }));
  };

  // Image Selection Handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: ImageItem[] = [];
    const validationErrors: string[] = [];

    Array.from(files).forEach((file) => {
      const normalizedType = file.type.toLowerCase();
      if (!ALLOWED_IMAGE_TYPES.includes(normalizedType)) {
        validationErrors.push(
          `"${file.name}" is not a supported format (JPG, PNG, WEBP only).`
        );
        return;
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        validationErrors.push(
          `"${file.name}" exceeds the 5 MB maximum size limit.`
        );
        return;
      }

      newItems.push({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        status: "idle",
      });
    });

    if (validationErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: validationErrors.join(" "),
      }));
    } else if (errors.images) {
      setErrors((prev) => ({ ...prev, images: undefined }));
    }

    if (newItems.length > 0) {
      setImageList((prev) => [...prev, ...newItems]);
    }

    // Reset input value so same file can be re-selected if removed
    e.target.value = "";
  };

  const handleRemoveImage = (idToRemove: string) => {
    setImageList((prev) => {
      const itemToRemove = prev.find((i) => i.id === idToRemove);
      if (itemToRemove?.previewUrl) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      return prev.filter((i) => i.id !== idToRemove);
    });
  };

  const handleSetPrimaryImage = (indexToPrimary: number) => {
    if (indexToPrimary <= 0) return;
    setImageList((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(indexToPrimary, 1);
      updated.unshift(item);
      return updated;
    });
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      imageList.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [imageList]);

  // Details List Handlers
  const handleAddDetail = () => {
    setDetails((prev) => [...prev, ""]);
  };

  const handleDetailChange = (index: number, value: string) => {
    setDetails((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveDetail = (index: number) => {
    setDetails((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Size Selection Handler
  const handleToggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) => {
      const isSelected = prev.includes(size);
      if (isSelected) {
        const next = prev.filter((s) => s !== size);
        if (next.length === 0) {
          setErrors((e) => ({
            ...e,
            sizes: "At least one size must be selected.",
          }));
        } else {
          setErrors((e) => ({ ...e, sizes: undefined }));
        }
        return next;
      } else {
        setErrors((e) => ({ ...e, sizes: undefined }));
        return [...prev, size];
      }
    });
  };

  // Validate entire form
  const validateForm = async (): Promise<boolean> => {
    const newErrors: FormErrors = {};

    // 1. Name
    if (!name.trim()) {
      newErrors.name = "Product name is required.";
    } else if (name.trim().length > 120) {
      newErrors.name = "Product name should be under 120 characters.";
    }

    // 2. Slug
    const cleanSlug = normalizeSlug(slug);
    if (!cleanSlug) {
      newErrors.slug = "Product slug is required.";
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug)) {
      newErrors.slug =
        "Slug must consist of lowercase letters, numbers, and hyphens.";
    } else {
      // Check duplicate slug in Firestore
      try {
        const taken = await isSlugTaken(cleanSlug);
        if (taken) {
          newErrors.slug = "A product with this slug already exists.";
        }
      } catch {
        // If Firestore read fails during slug check, we report general error
        newErrors.general =
          "Unable to verify slug uniqueness. Please check your connection.";
      }
    }

    // 3. Price
    const numericPrice = Number(price);
    if (!price || isNaN(numericPrice)) {
      newErrors.price = "Valid price in Indian Rupees (₹) is required.";
    } else if (numericPrice < 0) {
      newErrors.price = "Price must be greater than or equal to 0.";
    }

    // 4. Original Price
    if (originalPrice) {
      const numericOrigPrice = Number(originalPrice);
      if (isNaN(numericOrigPrice)) {
        newErrors.originalPrice = "Original price must be a valid number.";
      } else if (numericOrigPrice < numericPrice) {
        newErrors.originalPrice =
          "Original price should be greater than or equal to the selling price.";
      }
    }

    // 5. Category
    if (!category) {
      newErrors.category = "Please select a product category.";
    }

    // 6. Sizes
    if (selectedSizes.length === 0) {
      newErrors.sizes = "At least one size must be selected.";
    }

    // 7. Images
    if (imageList.length === 0) {
      newErrors.images = "At least one product image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrors({});
    setIsSubmitting(true);
    setSubmissionStep("validating");

    // A. Form Validation & Slug Check
    const isValid = await validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      setSubmissionStep("idle");
      return;
    }

    // B. Cloudinary Upload Flow
    setSubmissionStep("uploading");
    const uploadedResults: CloudinaryUploadResult[] = [];
    let hasUploadFailure = false;

    for (let i = 0; i < imageList.length; i++) {
      const item = imageList[i];

      // If already uploaded in a previous attempt, reuse it
      if (item.uploadedResult) {
        uploadedResults.push(item.uploadedResult);
        continue;
      }

      // Update state to uploading
      setImageList((prev) =>
        prev.map((it, idx) =>
          idx === i ? { ...it, status: "uploading", errorMessage: undefined } : it
        )
      );

      try {
        const result = await uploadProductImage(item.file);
        uploadedResults.push(result);

        setImageList((prev) =>
          prev.map((it, idx) =>
            idx === i
              ? { ...it, status: "success", uploadedResult: result }
              : it
          )
        );
      } catch (uploadErr) {
        hasUploadFailure = true;
        const msg =
          uploadErr instanceof Error
            ? uploadErr.message
            : "Upload to Cloudinary failed.";

        setImageList((prev) =>
          prev.map((it, idx) =>
            idx === i ? { ...it, status: "error", errorMessage: msg } : it
          )
        );

        setErrors({
          general: `Failed to upload image "${item.file.name}": ${msg}. You may retry saving or remove this image.`,
        });
        break;
      }
    }

    if (hasUploadFailure) {
      setIsSubmitting(false);
      setSubmissionStep("idle");
      return;
    }

    // C. Firestore Product Document Creation
    setSubmissionStep("saving");
    try {
      const cleanSlug = normalizeSlug(slug);
      const categoryName =
        CATEGORY_OPTIONS.find((c) => c.slug === category)?.name ||
        "Pakistani Suits";

      const secureUrls = uploadedResults.map((r) => r.secureUrl);
      const publicIds = uploadedResults.map((r) => r.publicId);

      const productPayload: Omit<Product, "id"> = {
        slug: cleanSlug,
        name: name.trim(),
        tagline: tagline.trim() || undefined,
        description: description.trim(),
        details: details.filter((d) => d.trim().length > 0),
        fabric: fabric.trim(),
        careInstructions: careInstructions.trim() || undefined,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        category,
        categoryName,
        sizes: selectedSizes,
        images: secureUrls,
        cloudinaryPublicIds: publicIds,
        available,
        featured,
        isNew,
        badge: badge.trim() || undefined,
      };

      await createProduct(productPayload);

      setSubmissionStep("success");
      // Redirect to catalogue manager after successful write
      router.push("/admin/products");
    } catch (firestoreErr) {
      setIsSubmitting(false);
      setSubmissionStep("idle");
      setErrors({
        general:
          firestoreErr instanceof Error
            ? `Images uploaded, but Firestore save failed: ${firestoreErr.message}. Your uploaded images have been preserved—click "Save Product" to retry.`
            : "Images uploaded, but Firestore save failed. Please check permissions and try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#fdfbf7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/products"
            className="text-xs uppercase tracking-widest font-sans font-semibold text-[#887a6c] hover:text-[#9f7d39] transition-colors flex items-center gap-1.5"
          >
            <span>&larr;</span> Back to Catalogue
          </Link>
          <span className="text-[11px] font-mono text-[#887a6c]">
            Catalogue &bull; New Item
          </span>
        </div>

        {/* Page Title Header */}
        <div className="bg-white border border-[#eee7da] p-6 sm:p-8 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#9f7d39] mb-1">
              NISA Boutique &bull; Product Manager
            </p>
            <h1 className="font-serif text-3xl font-bold text-[#181818]">
              Add New Product
            </h1>
            <p className="text-sm font-sans text-[#666666] mt-1">
              Create and publish a new luxury piece to the Firestore catalogue.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="px-4 py-2 text-xs uppercase tracking-wider font-sans font-semibold border border-[#eee7da] text-[#4a3f35] hover:bg-[#fdf9f4] transition-colors rounded-sm"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* General Error Alert */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-sm text-sm font-sans flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-xs uppercase tracking-wider text-red-900 mb-0.5">
                Action Required
              </p>
              <p>{errors.general}</p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Columns: Main Details & Images */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section 1: Basic Information */}
              <div className="bg-white border border-[#eee7da] p-6 sm:p-8 rounded-sm shadow-sm space-y-5">
                <div className="border-b border-[#eee7da] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#181818]">
                    1. Basic Information
                  </h2>
                  <p className="text-xs font-sans text-[#777777] mt-0.5">
                    Essential editorial and identification details.
                  </p>
                </div>

                {/* Product Name */}
                <div>
                  <label
                    htmlFor="product-name"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="product-name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="e.g. Zari Embroidered Raw Silk Suit"
                    disabled={isSubmitting}
                    className={`w-full text-sm font-sans px-3.5 py-2.5 bg-[#fdfbf7] border ${
                      errors.name ? "border-red-400" : "border-[#eee7da]"
                    } rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b] transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 font-sans mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="product-slug"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#181818] font-sans"
                    >
                      URL Slug <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-[#887a6c]">
                      /{slug || "slug-preview"}
                    </span>
                  </div>
                  <input
                    id="product-slug"
                    type="text"
                    value={slug}
                    onChange={handleSlugChange}
                    placeholder="e.g. zari-embroidered-raw-silk-suit"
                    disabled={isSubmitting}
                    className={`w-full text-sm font-mono px-3.5 py-2 bg-[#fdfbf7] border ${
                      errors.slug ? "border-red-400" : "border-[#eee7da]"
                    } rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b] transition-colors`}
                  />
                  {errors.slug && (
                    <p className="text-xs text-red-600 font-sans mt-1">
                      {errors.slug}
                    </p>
                  )}
                  <p className="text-[11px] text-[#887a6c] font-sans mt-1">
                    Auto-generated from product title. Used in product URLs.
                  </p>
                </div>

                {/* Tagline */}
                <div>
                  <label
                    htmlFor="product-tagline"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Tagline{" "}
                    <span className="text-[#999999] font-normal">
                      (Optional editorial subtitle)
                    </span>
                  </label>
                  <input
                    id="product-tagline"
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Heirloom gold hand-tilla on deep charcoal silk"
                    disabled={isSubmitting}
                    className="w-full text-sm font-sans px-3.5 py-2 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b] transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="product-description"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Description
                  </label>
                  <textarea
                    id="product-description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the fabric, craft, embroidery motifs, drape, and occasion styling..."
                    disabled={isSubmitting}
                    className="w-full text-sm font-sans p-3.5 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b] transition-colors resize-y leading-relaxed"
                  />
                </div>
              </div>

              {/* Section 2: Product Images */}
              <div className="bg-white border border-[#eee7da] p-6 sm:p-8 rounded-sm shadow-sm space-y-5">
                <div className="border-b border-[#eee7da] pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#181818]">
                      2. Product Images <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs font-sans text-[#777777] mt-0.5">
                      Upload high-resolution photography. The first image will be
                      used as the primary catalogue cover.
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-[#fdf4e7] text-[#9f7d39] px-2.5 py-1 rounded border border-[#f0dfc2]">
                    Cloudinary
                  </span>
                </div>

                {/* File Upload Box */}
                <div>
                  <label
                    htmlFor="product-images-input"
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#d8cdb8] hover:border-[#c6a15b] bg-[#fdfbf7] hover:bg-[#faf6ee] rounded-sm cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-8 h-8 text-[#9f7d39] mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#181818] font-sans">
                      Select Product Photos
                    </span>
                    <span className="text-[11px] text-[#777777] font-sans mt-1">
                      JPG, JPEG, PNG, WEBP (Max 5 MB each &bull; Multiple allowed)
                    </span>
                    <input
                      id="product-images-input"
                      type="file"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileSelect}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </label>
                  {errors.images && (
                    <p className="text-xs text-red-600 font-sans mt-2">
                      {errors.images}
                    </p>
                  )}
                </div>

                {/* Image Thumbnails List */}
                {imageList.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#887a6c] font-sans">
                      Selected Images ({imageList.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {imageList.map((item, idx) => (
                        <div
                          key={item.id}
                          className="relative group aspect-[4/5] bg-[#181818] rounded-sm overflow-hidden border border-[#eee7da] shadow-sm flex flex-col justify-between p-2"
                        >
                          <Image
                            src={item.previewUrl}
                            alt={`Upload ${idx + 1}`}
                            fill
                            sizes="140px"
                            className="object-cover"
                          />

                          {/* Cover Badge on index 0 */}
                          <div className="relative z-10 flex justify-between items-start">
                            {idx === 0 ? (
                              <span className="bg-[#181818]/90 text-[#c6a15b] border border-[#c6a15b]/40 text-[9px] uppercase tracking-widest font-sans font-semibold px-2 py-0.5 rounded-sm shadow">
                                Cover
                              </span>
                            ) : (
                              <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => handleSetPrimaryImage(idx)}
                                className="bg-[#181818]/80 text-[#f5f1e8] hover:text-[#c6a15b] text-[9px] uppercase tracking-wider font-sans px-1.5 py-0.5 rounded-sm transition-colors"
                                title="Set as primary image"
                              >
                                Set Cover
                              </button>
                            )}

                            {/* Remove Button */}
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => handleRemoveImage(item.id)}
                              className="bg-black/70 hover:bg-red-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors"
                              title="Remove image"
                            >
                              &times;
                            </button>
                          </div>

                          {/* Status Badge */}
                          <div className="relative z-10 mt-auto">
                            {item.status === "uploading" && (
                              <span className="inline-flex items-center gap-1 bg-[#181818]/90 text-[#9f7d39] text-[9px] font-mono px-2 py-0.5 rounded-sm animate-pulse">
                                Uploading...
                              </span>
                            )}
                            {item.status === "success" && (
                              <span className="bg-emerald-950/90 text-emerald-300 text-[9px] font-mono px-2 py-0.5 rounded-sm">
                                &check; Uploaded
                              </span>
                            )}
                            {item.status === "error" && (
                              <span className="bg-red-950/90 text-red-300 text-[9px] font-mono px-2 py-0.5 rounded-sm">
                                Failed
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Product Details & Specifications */}
              <div className="bg-white border border-[#eee7da] p-6 sm:p-8 rounded-sm shadow-sm space-y-5">
                <div className="border-b border-[#eee7da] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#181818]">
                    3. Specifications & Details
                  </h2>
                  <p className="text-xs font-sans text-[#777777] mt-0.5">
                    Fabric composition, care instructions, and bullet points.
                  </p>
                </div>

                {/* Fabric */}
                <div>
                  <label
                    htmlFor="product-fabric"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Fabric Composition
                  </label>
                  <input
                    id="product-fabric"
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="e.g. Korean Raw Silk & Pure Organza"
                    disabled={isSubmitting}
                    className="w-full text-sm font-sans px-3.5 py-2 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>

                {/* Care Instructions */}
                <div>
                  <label
                    htmlFor="product-care"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Care Instructions
                  </label>
                  <input
                    id="product-care"
                    type="text"
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                    placeholder="e.g. Professional dry clean only. Store in breathable muslin bag."
                    disabled={isSubmitting}
                    className="w-full text-sm font-sans px-3.5 py-2 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>

                {/* Bullet Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#181818] font-sans">
                      Bullet Point Details
                    </label>
                    <button
                      type="button"
                      onClick={handleAddDetail}
                      disabled={isSubmitting}
                      className="text-xs font-sans text-[#9f7d39] hover:text-[#7f632d] font-semibold flex items-center gap-1"
                    >
                      + Add Detail Line
                    </button>
                  </div>

                  <div className="space-y-2">
                    {details.map((detail, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="text-[#c6a15b] font-bold text-sm">
                          &bull;
                        </span>
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) =>
                            handleDetailChange(idx, e.target.value)
                          }
                          placeholder={`Detail point ${idx + 1} (e.g. 3-Piece: Shirt, Trouser & Dupatta)`}
                          disabled={isSubmitting}
                          className="flex-1 text-sm font-sans px-3 py-1.5 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                        />
                        {details.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDetail(idx)}
                            disabled={isSubmitting}
                            className="text-[#999999] hover:text-red-600 px-2 py-1 text-sm transition-colors"
                            title="Remove detail"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing, Category, Sizes, Status & Save */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-white border border-[#eee7da] p-6 rounded-sm shadow-sm space-y-4">
                <div className="border-b border-[#eee7da] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#181818]">
                    Pricing (INR)
                  </h3>
                  <p className="text-[11px] font-sans text-[#777777]">
                    Values stored numerically in Indian Rupees.
                  </p>
                </div>

                {/* Selling Price */}
                <div>
                  <label
                    htmlFor="product-price"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Selling Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#777777] font-mono text-sm">
                      ₹
                    </span>
                    <input
                      id="product-price"
                      type="number"
                      min="0"
                      step="1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="4500"
                      disabled={isSubmitting}
                      className={`w-full text-sm font-mono pl-7 pr-3 py-2 bg-[#fdfbf7] border ${
                        errors.price ? "border-red-400" : "border-[#eee7da]"
                      } rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-xs text-red-600 font-sans mt-1">
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Original / Compare Price */}
                <div>
                  <label
                    htmlFor="product-original-price"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Original / Strikethrough Price (₹){" "}
                    <span className="text-[#999999] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#777777] font-mono text-sm">
                      ₹
                    </span>
                    <input
                      id="product-original-price"
                      type="number"
                      min="0"
                      step="1"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="5200"
                      disabled={isSubmitting}
                      className={`w-full text-sm font-mono pl-7 pr-3 py-2 bg-[#fdfbf7] border ${
                        errors.originalPrice
                          ? "border-red-400"
                          : "border-[#eee7da]"
                      } rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]`}
                    />
                  </div>
                  {errors.originalPrice && (
                    <p className="text-xs text-red-600 font-sans mt-1">
                      {errors.originalPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* Category Card */}
              <div className="bg-white border border-[#eee7da] p-6 rounded-sm shadow-sm space-y-4">
                <div className="border-b border-[#eee7da] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#181818]">
                    Category <span className="text-red-500">*</span>
                  </h3>
                  <p className="text-[11px] font-sans text-[#777777]">
                    Boutique department assignment.
                  </p>
                </div>

                <div className="space-y-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <label
                      key={cat.slug}
                      className={`flex items-center gap-3 p-2.5 rounded-sm border cursor-pointer transition-colors text-xs font-sans font-medium ${
                        category === cat.slug
                          ? "bg-[#fdf4e7] border-[#e8cf9c] text-[#9f7d39]"
                          : "bg-[#fdfbf7] border-[#eee7da] text-[#4a3f35] hover:bg-[#fcf7ef]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="product-category"
                        value={cat.slug}
                        checked={category === cat.slug}
                        onChange={() => setCategory(cat.slug)}
                        disabled={isSubmitting}
                        className="accent-[#c6a15b]"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-xs text-red-600 font-sans">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Sizes Card */}
              <div className="bg-white border border-[#eee7da] p-6 rounded-sm shadow-sm space-y-4">
                <div className="border-b border-[#eee7da] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#181818]">
                    Available Sizes <span className="text-red-500">*</span>
                  </h3>
                  <p className="text-[11px] font-sans text-[#777777]">
                    Select all sizes currently in stock or available.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleToggleSize(size)}
                        disabled={isSubmitting}
                        className={`px-3 py-1.5 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider transition-colors border ${
                          isSelected
                            ? "bg-[#181818] text-[#f5f1e8] border-[#181818]"
                            : "bg-[#fdfbf7] text-[#666666] border-[#eee7da] hover:border-[#c6a15b]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {errors.sizes && (
                  <p className="text-xs text-red-600 font-sans">
                    {errors.sizes}
                  </p>
                )}
              </div>

              {/* Status & Visibility Card */}
              <div className="bg-white border border-[#eee7da] p-6 rounded-sm shadow-sm space-y-4">
                <div className="border-b border-[#eee7da] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#181818]">
                    Status &amp; Merchandising
                  </h3>
                </div>

                {/* Available Toggle */}
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="block text-xs font-semibold text-[#181818] font-sans">
                      Available (In Stock)
                    </span>
                    <span className="text-[11px] text-[#777777] font-sans">
                      If off, marked as &ldquo;Made to Order&rdquo;
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    disabled={isSubmitting}
                    className="w-4 h-4 accent-[#c6a15b] rounded"
                  />
                </label>

                {/* Featured Toggle */}
                <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#f0ebe2]">
                  <div>
                    <span className="block text-xs font-semibold text-[#181818] font-sans">
                      Featured Piece
                    </span>
                    <span className="text-[11px] text-[#777777] font-sans">
                      Promote on homepage showcase
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    disabled={isSubmitting}
                    className="w-4 h-4 accent-[#c6a15b] rounded"
                  />
                </label>

                {/* New Arrival Toggle */}
                <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#f0ebe2]">
                  <div>
                    <span className="block text-xs font-semibold text-[#181818] font-sans">
                      New Arrival Tag
                    </span>
                    <span className="text-[11px] text-[#777777] font-sans">
                      Displays &ldquo;New&rdquo; badge in catalogue
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    disabled={isSubmitting}
                    className="w-4 h-4 accent-[#c6a15b] rounded"
                  />
                </label>

                {/* Custom Badge */}
                <div className="pt-2 border-t border-[#f0ebe2]">
                  <label
                    htmlFor="product-badge"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#181818] mb-1 font-sans"
                  >
                    Editorial Badge{" "}
                    <span className="text-[#999999] font-normal">
                      (e.g. Handmade Atelier)
                    </span>
                  </label>
                  <input
                    id="product-badge"
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Handwork Atelier"
                    disabled={isSubmitting}
                    className="w-full text-xs font-sans px-3 py-1.5 bg-[#fdfbf7] border border-[#eee7da] rounded-sm text-[#181818] focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="bg-white border border-[#eee7da] p-6 rounded-sm shadow-sm space-y-3 sticky top-6">
                <button
                  type="submit"
                  id="admin-save-product-btn"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs uppercase tracking-widest font-sans font-semibold bg-[#181818] text-[#f5f1e8] hover:bg-[#333333] transition-colors rounded-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#f5f1e8] border-t-[#c6a15b] rounded-full animate-spin" />
                      <span>
                        {submissionStep === "validating" && "Validating..."}
                        {submissionStep === "uploading" && "Uploading Photos..."}
                        {submissionStep === "saving" && "Saving to Firestore..."}
                        {submissionStep === "success" && "Published!"}
                      </span>
                    </>
                  ) : (
                    <span>Save Product</span>
                  )}
                </button>

                <Link
                  href="/admin/products"
                  className="block text-center py-2 text-xs uppercase tracking-wider font-sans font-semibold text-[#887a6c] hover:text-[#181818] transition-colors"
                >
                  Cancel / Return
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
