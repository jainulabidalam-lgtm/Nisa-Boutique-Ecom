"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AuthError } from "firebase/auth";
import { useAuth, getAuthErrorMessage } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(displayName.trim(), email.trim(), password);
      router.push("/");
    } catch (err) {
      setError(getAuthErrorMessage(err as AuthError));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      setError(getAuthErrorMessage(err as AuthError));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16 bg-[#fdfbf7]">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" aria-label="Return to NISA Boutique homepage">
            <Image
              src="/images/nisa-boutique-logo.png"
              alt="NISA Boutique monogram"
              width={72}
              height={72}
              className="object-contain"
              priority
            />
          </Link>
          <h1 className="mt-5 font-serif text-2xl text-[#181818] tracking-wide">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-[#6b6251] font-sans">
            Join NISA Boutique — EST. 2008
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e5ded0] rounded-sm shadow-sm p-8">
          {/* Error banner */}
          {error && (
            <div
              role="alert"
              className="mb-6 p-3.5 bg-[#fdf3f3] border border-[#e8c4c4] rounded-sm text-sm text-[#8b2020] font-sans"
            >
              {error}
            </div>
          )}

          {/* Google */}
          <button
            id="google-signup-btn"
            type="button"
            onClick={handleGoogleSignup}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#e5ded0] rounded-sm bg-white text-[#181818] text-sm font-sans font-medium tracking-wide hover:border-[#9f7d39] hover:bg-[#fdf9f4] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Google "G" SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h12.7c-.6 3.1-2.3 5.7-4.9 7.5v6.2h7.9c4.6-4.2 7.3-10.5 7.3-17.8z"
              />
              <path
                fill="#34A853"
                d="M24 47c6.5 0 11.9-2.1 15.9-5.8l-7.9-6.2c-2.1 1.4-4.9 2.3-8 2.3-6.1 0-11.3-4.1-13.1-9.7H2.7v6.4C6.7 42.2 14.8 47 24 47z"
              />
              <path
                fill="#FBBC05"
                d="M10.9 27.6c-.5-1.4-.7-2.9-.7-4.6s.3-3.2.7-4.6v-6.4H2.7C1 15.4 0 19.6 0 24s1 8.6 2.7 12l8.2-8.4z"
              />
              <path
                fill="#EA4335"
                d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.6 30.4 0 24 0 14.8 0 6.7 4.8 2.7 12l8.2 6.4C12.7 13.6 17.9 9.5 24 9.5z"
              />
            </svg>
            {googleLoading ? "Continuing…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e5ded0]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xs text-[#9e8e7e] font-sans uppercase tracking-widest">
                or
              </span>
            </div>
          </div>

          {/* Sign up form */}
          <form id="signup-form" onSubmit={handleSignup} noValidate>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-sans font-semibold text-[#4a3f35] uppercase tracking-widest mb-1.5"
                >
                  Full name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={loading || googleLoading}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-[#e5ded0] rounded-sm bg-[#fdfbf7] text-[#181818] text-sm font-sans placeholder-[#b5a899] focus:outline-none focus:border-[#9f7d39] focus:ring-1 focus:ring-[#9f7d39] transition-colors disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-sans font-semibold text-[#4a3f35] uppercase tracking-widest mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || googleLoading}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-[#e5ded0] rounded-sm bg-[#fdfbf7] text-[#181818] text-sm font-sans placeholder-[#b5a899] focus:outline-none focus:border-[#9f7d39] focus:ring-1 focus:ring-[#9f7d39] transition-colors disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-sans font-semibold text-[#4a3f35] uppercase tracking-widest mb-1.5"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || googleLoading}
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-3 border border-[#e5ded0] rounded-sm bg-[#fdfbf7] text-[#181818] text-sm font-sans placeholder-[#b5a899] focus:outline-none focus:border-[#9f7d39] focus:ring-1 focus:ring-[#9f7d39] transition-colors disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-sans font-semibold text-[#4a3f35] uppercase tracking-widest mb-1.5"
                >
                  Confirm password
                </label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading || googleLoading}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 border border-[#e5ded0] rounded-sm bg-[#fdfbf7] text-[#181818] text-sm font-sans placeholder-[#b5a899] focus:outline-none focus:border-[#9f7d39] focus:ring-1 focus:ring-[#9f7d39] transition-colors disabled:opacity-60"
                />
              </div>
            </div>

            <button
              id="signup-submit"
              type="submit"
              disabled={loading || googleLoading}
              className="mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 bg-[#181818] text-[#f5f1e8] text-xs font-sans font-semibold tracking-[0.18em] uppercase border border-[#2e2e2e] hover:bg-[#111111] hover:border-[#c6a15b] hover:text-[#c6a15b] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-xs text-center text-[#9e8e7e] font-sans leading-relaxed">
            By creating an account you agree to our{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-[#9f7d39]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Footer links */}
        <p className="mt-6 text-center text-sm font-sans text-[#6b6251]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#9f7d39] font-medium hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
