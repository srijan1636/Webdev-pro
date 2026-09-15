"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import WhySadhanaModal from "./WhySadhanaModal";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [showWhySadhana, setShowWhySadhana] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md border-b border-stone-200/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 hover:text-amber-700 transition-colors duration-500 cursor-pointer">
            Adhyatma<span className="text-amber-500">.</span>
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWhySadhana(true)}
              className="px-5 py-2.5 rounded-full text-stone-700 text-sm font-medium tracking-wide border border-stone-300 hover:bg-stone-100 hover:border-stone-400 active:scale-95 transition-all duration-300"
            >
              Why Sadhana?
            </button>

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-7 py-2.5 rounded-full bg-stone-900 text-stone-50 text-sm font-medium tracking-wide shadow-sm hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="px-7 py-2.5 rounded-full bg-stone-900 text-stone-50 text-sm font-medium tracking-wide shadow-sm hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <WhySadhanaModal
        isOpen={showWhySadhana}
        onClose={() => setShowWhySadhana(false)}
      />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
