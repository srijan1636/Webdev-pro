"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const switchMode = (newMode: "signin" | "signup") => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        // Create the account first
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong");
          setLoading(false);
          return;
        }
      }

      // Whether signing up or signing in, log them in now
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      resetForm();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-[#FAF7F2] border border-stone-300 rounded-3xl max-w-md w-full shadow-2xl relative z-10 p-8 md:p-10">
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-6 right-6 text-stone-500 hover:text-stone-800 text-xl font-bold"
        >
          ✕
        </button>

        <p className="text-xs uppercase tracking-widest text-amber-800/70 mb-2">
          {mode === "signin" ? "Welcome back" : "Begin your practice"}
        </p>
        <h3 className="text-3xl font-bold text-amber-900 mb-6">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm text-stone-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-amber-700 transition"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-stone-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-amber-700 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-amber-700 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#2B231D] text-white font-medium hover:bg-stone-800 transition disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-stone-500 mt-6 text-center">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button
                onClick={() => switchMode("signup")}
                className="text-amber-800 font-medium hover:underline"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => switchMode("signin")}
                className="text-amber-800 font-medium hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
