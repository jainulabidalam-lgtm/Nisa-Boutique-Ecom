"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  uploadProductImage,
  CloudinaryUploadResult,
} from "@/lib/cloudinary/uploadRepository";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function AdminPage() {
  const { firebaseUser, nisaUser } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<CloudinaryUploadResult | null>(
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setStatus("idle");
    setErrorMessage(null);
    setUploadResult(null);

    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage("Selected file exceeds the 5 MB client limit.");
      setStatus("error");
    }
  };

  const handleTestUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select an image file first.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setErrorMessage(null);
    setUploadResult(null);

    try {
      const result = await uploadProductImage(selectedFile);
      setUploadResult(result);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected upload error occurred."
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#fdfbf7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Admin Identity Card */}
        <div className="bg-white border border-[#eee7da] p-8 sm:p-12 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#9f7d39] mb-2">
            Administration Portal &bull; Phase 1
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#181818] mb-6">
            NISA Boutique Admin
          </h1>
          <div className="h-px w-full bg-[#eee7da] mb-6" />
          <div className="space-y-3 font-sans text-sm text-[#4a4a4a]">
            <p>
              <strong className="text-[#181818]">Authenticated Admin:</strong>{" "}
              {firebaseUser?.email || "No email"}
            </p>
            <p>
              <strong className="text-[#181818]">Admin UID:</strong>{" "}
              <span className="font-mono text-xs">{firebaseUser?.uid}</span>
            </p>
            <p>
              <strong className="text-[#181818]">Role Status:</strong>{" "}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {nisaUser?.role || "admin"}
              </span>
            </p>
          </div>

          <div className="pt-5 mt-6 border-t border-[#eee7da] flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#181818] font-sans">
                Product Catalogue System
              </p>
              <p className="text-xs text-[#777777] font-sans">
                View, filter, and toggle inventory availability in Firestore.
              </p>
            </div>
            <Link
              href="/admin/products"
              id="admin-manage-products-link"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs uppercase tracking-widest font-sans font-semibold bg-[#181818] text-[#f5f1e8] hover:bg-[#333333] transition-colors rounded-sm shadow-sm"
            >
              Manage Products &rarr;
            </Link>
          </div>
        </div>

        {/* Cloudinary Connection Test Section */}
        <div className="bg-white border border-[#eee7da] p-8 sm:p-12 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#9f7d39] font-sans font-semibold">
                Storage Integration Check
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#181818]">
                Cloudinary Connection Test
              </h2>
            </div>
            <span className="text-xs font-mono bg-[#f5f1e8] text-[#4a3f35] px-2.5 py-1 rounded border border-[#eee7da]">
              Preset: unsigned
            </span>
          </div>

          <p className="text-sm font-sans text-[#666666] leading-relaxed mb-6">
            Verify client-side unsigned image upload to Cloudinary. Accepted
            formats: <span className="font-semibold text-[#181818]">JPG, JPEG, PNG, WEBP</span> (Max 5 MB).
            This test verifies connectivity without writing to Firestore.
          </p>

          <div className="space-y-4">
            {/* File Input */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <input
                id="cloudinary-test-file-input"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={status === "uploading"}
                className="text-sm font-sans text-[#4a3f35] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:bg-[#181818] file:text-[#f5f1e8] hover:file:bg-[#333333] file:cursor-pointer cursor-pointer"
              />

              <button
                type="button"
                id="cloudinary-test-upload-btn"
                onClick={handleTestUpload}
                disabled={!selectedFile || status === "uploading"}
                className="px-5 py-2 text-xs uppercase tracking-widest font-sans font-semibold bg-[#c6a15b] text-[#181818] hover:bg-[#b59048] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === "uploading" ? "Uploading..." : "Test Upload"}
              </button>
            </div>

            {/* Status Indicator */}
            <div className="pt-2 text-sm font-sans">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#888888] mr-2">
                Status:
              </span>
              {status === "idle" && (
                <span className="text-[#666666]">Idle — Select a file to test</span>
              )}
              {status === "uploading" && (
                <span className="text-[#9f7d39] font-medium animate-pulse">
                  Uploading to Cloudinary...
                </span>
              )}
              {status === "success" && (
                <span className="text-emerald-700 font-semibold">
                  Upload Successful &check;
                </span>
              )}
              {status === "error" && (
                <span className="text-red-600 font-medium">
                  {errorMessage || "Upload failed."}
                </span>
              )}
            </div>

            {/* Success Details Card */}
            {status === "success" && uploadResult && (
              <div className="mt-6 p-5 bg-[#fdfbf7] border border-[#eee7da] rounded-sm space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 bg-[#181818] rounded-sm overflow-hidden shrink-0 border border-[#e5ded0]">
                    <Image
                      src={uploadResult.secureUrl}
                      alt="Uploaded preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 font-mono text-xs text-[#333333] break-all">
                    <div>
                      <span className="font-sans font-semibold text-[#181818] block uppercase text-[10px] tracking-wider">
                        Public ID:
                      </span>
                      {uploadResult.publicId}
                    </div>
                    <div>
                      <span className="font-sans font-semibold text-[#181818] block uppercase text-[10px] tracking-wider">
                        Secure URL:
                      </span>
                      <a
                        href={uploadResult.secureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9f7d39] hover:underline"
                      >
                        {uploadResult.secureUrl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
