"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/**
 * AccountMenu — renders in the Header's right action bar.
 *
 * Signed-out state: Person icon → navigates to /login
 * Signed-in state: Person icon with gold dot → dropdown with greeting and sign-out
 */
export function AccountMenu() {
  const { firebaseUser, nisaUser, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // During initial auth resolution render nothing to avoid layout shift
  if (loading) {
    return (
      <div className="p-2 w-9 h-9 flex items-center justify-center opacity-0 pointer-events-none" />
    );
  }

  // ── Signed-out state ──────────────────────────────────────────────────────
  if (!firebaseUser) {
    return (
      <Link
        href="/login"
        id="header-account-signin"
        className="p-2 text-[#181818] hover:text-[#9f7d39] transition-colors"
        aria-label="Sign in to your account"
      >
        <PersonIcon />
      </Link>
    );
  }

  // ── Signed-in state ───────────────────────────────────────────────────────
  const firstName =
    (nisaUser?.displayName ?? firebaseUser.displayName ?? "").split(" ")[0] ||
    "Account";

  return (
    <div ref={menuRef} className="relative">
      <button
        id="header-account-menu-trigger"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 text-[#181818] hover:text-[#9f7d39] transition-colors relative"
        aria-label="Open account menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <PersonIcon />
        {/* Gold indicator dot — shows user is signed in */}
        <span className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-[#c6a15b] rounded-full border border-[#fdfbf7]" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-1 w-52 bg-white border border-[#e5ded0] rounded-sm shadow-lg py-1 z-50"
        >
          {/* Greeting */}
          <div className="px-4 py-3 border-b border-[#f0ebe2]">
            <p className="text-xs text-[#9e8e7e] font-sans uppercase tracking-widest">
              Signed in as
            </p>
            <p className="mt-0.5 text-sm font-sans font-medium text-[#181818] truncate">
              {firstName}
            </p>
          </div>

          {/* Menu items */}
          {/* Account & Orders pages will be added in a future sprint */}

          <div className="border-t border-[#f0ebe2] mt-1">
            <button
              id="header-signout-btn"
              type="button"
              role="menuitem"
              onClick={async () => {
                setOpen(false);
                await logout();
              }}
              className="w-full text-left px-4 py-2.5 text-sm font-sans text-[#4a3f35] hover:bg-[#fdf9f4] hover:text-[#9f7d39] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PersonIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}
