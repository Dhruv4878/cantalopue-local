"use client";

import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

// Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8
      c-6.627 0-12-5.373-12-12s5.373-12 12-12
      c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841
      C34.553 4.806 29.625 2.5 24 2.5
      C11.667 2.5 1.5 12.667 1.5 25
      s10.167 22.5 22.5 22.5
      s22.5-10.167 22.5-22.5
      c0-1.563-.149-3.09-.421-4.584z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691c-2.238 4.22-3.594 9.078-3.594 14.309
      c0 5.231 1.356 10.089 3.594 14.309L15.17 35.65
      C13.235 31.668 12 27.46 12 23
      c0-4.46 1.235-8.668 3.17-12.65L6.306 14.691z"
      transform="translate(0 2)"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 47.5c5.625 0 10.553-1.806 14.802-4.841L31.961 34.96
      C29.842 36.846 27.059 38 24 38
      c-5.223 0-9.649-3.343-11.303-7.918L4.389 38.08
      C8.638 43.194 15.825 47.5 24 47.5z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H24v8h11.303
      c-.792 2.237-2.231 4.16-4.082 5.571l7.662 7.662
      C41.438 37.138 44.5 31.812 44.5 25
      c0-2.619-.406-5.125-1.125-7.489L43.611 20.083z"
    ></path>
  </svg>
);

const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
      5.291A7.962 7.962 0 014 12H0
      c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function LoginForm() {
  const [view, setView] = useState("initial");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true); // start true while checking auth
  const [error, setError] = useState(null);
  const router = useRouter();

  // ✅ Auto-check if user already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          // ✅ Token valid — send to content/generate
          router.replace("/content/generate");
        } else {
          // ❌ No profile found, send to business create
          router.replace("/businesses/create");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/businesses/create");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // ✅ Login via email
  const handleEmailLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      if (data.token) {
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("flashMessage", "Signed in successfully");

        const profileRes = await fetch(`${apiUrl}/profile/me`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        if (profileRes.ok) router.push("/content/generate");
        else router.push("/businesses/create");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Login via Google
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Google login failed");
      }

      const data = await response.json();
      if (data.token) {
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("flashMessage", "Signed in with Google");

        const profileRes = await fetch(`${apiUrl}/profile/me`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        if (profileRes.ok) router.push("/content/generate");
        else router.push("/businesses/create");
      }
    } catch (error) {
      setError(error.message || "Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Loading screen while checking login
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <SpinnerIcon />
          <p className="text-slate-600 font-medium">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex flex-col justify-center items-center p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-slate-500 mt-2">
            Sign in to continue to your workspace
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
          {view === "initial" && (
            <div className="space-y-5">
              <button
                onClick={handleSignInWithGoogle}
                disabled={isLoading}
                className="w-full bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl py-3.5 flex items-center justify-center hover:bg-slate-50 hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-50"
              >
                <GoogleIcon />
                <span className="ml-3 text-sm sm:text-base">
                  Sign in with Google
                </span>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-slate-500">or</span>
                </div>
              </div>

              <button
                onClick={() => setView("email")}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl py-3.5 hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in with Email
              </button>
            </div>
          )}

          {view === "email" && (
            <form onSubmit={handleEmailLoginSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-slate-50 hover:bg-white"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-slate-50 hover:bg-white"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded-lg py-2">
                  {error}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl py-3.5 flex items-center justify-center hover:from-indigo-700 hover:to-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {isLoading ? <SpinnerIcon /> : "Sign In"}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setView("initial");
                    setError(null);
                  }}
                  className="text-sm text-indigo-600 hover:underline font-medium mt-3"
                >
                  &larr; Back to sign in options
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
