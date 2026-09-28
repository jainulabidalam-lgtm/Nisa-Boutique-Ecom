"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { firebaseUser, nisaUser, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.replace("/login?redirect=/admin");
    }
  }, [loading, firebaseUser, router]);

  // 1. Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center px-4">
        <div className="w-10 h-10 border-2 border-[#eee7da] border-t-[#c6a15b] rounded-full animate-spin mb-4" />
        <p className="font-serif text-lg text-[#181818] tracking-wide">
          NISA Boutique
        </p>
        <p className="text-xs uppercase tracking-[0.25em] text-[#9f7d39] font-sans mt-1">
          Verifying Admin Authorization&hellip;
        </p>
      </div>
    );
  }

  // 2. Unauthenticated state (redirecting to login)
  if (!firebaseUser) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center px-4">
        <p className="text-sm font-sans text-[#777777]">
          Redirecting to login&hellip;
        </p>
      </div>
    );
  }

  // 3. Authenticated but not an admin (403 Access Denied)
  if (nisaUser?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-[#eee7da] p-8 text-center shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#fdf4e7] flex items-center justify-center text-[#c6a15b]">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <p className="text-[11px] uppercase tracking-[0.25em] text-[#9f7d39] font-sans font-semibold mb-2">
            403 &bull; Forbidden
          </p>
          <h1 className="font-serif text-2xl font-bold text-[#181818] mb-3">
            Admin Access Restricted
          </h1>
          <p className="text-sm text-[#666666] font-sans leading-relaxed mb-6">
            The account signed in as{" "}
            <span className="font-medium text-[#181818]">
              {firebaseUser.email || firebaseUser.uid}
            </span>{" "}
            does not have administrative privileges. Admin rights must be granted
            by a system administrator.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-widest font-sans font-semibold bg-[#181818] text-[#f5f1e8] hover:bg-[#333333] transition-colors"
            >
              Return to Boutique
            </Link>
            <button
              type="button"
              onClick={async () => {
                await logout();
                router.replace("/login?redirect=/admin");
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-widest font-sans font-semibold border border-[#eee7da] text-[#4a3f35] hover:bg-[#fdf9f4] transition-colors"
            >
              Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authorized admin — render protected content
  return <>{children}</>;
}
