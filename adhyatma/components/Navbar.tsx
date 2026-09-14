"use client";

import { useState } from "react";
import WhySadhanaModal from "./WhySadhanaModal";

export default function Navbar() {
  const [showWhySadhana, setShowWhySadhana] = useState(false);

  return (
    <>
      {/* 'sticky top-0 z-50' keeps it at the top when scrolling */}
      {/* 'backdrop-blur-md bg-white/60' creates the premium frosted glass effect */}
      <nav className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md border-b border-stone-200/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Elegant Logo with subtle color shift on hover */}
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 hover:text-amber-700 transition-colors duration-500 cursor-pointer">
            Adhyatma<span className="text-amber-500">.</span>
          </h1>

          <div className="flex items-center gap-3">
            {/* Why Sadhana button, opens the explainer modal */}
            <button
              onClick={() => setShowWhySadhana(true)}
              className="px-5 py-2.5 rounded-full text-stone-700 text-sm font-medium tracking-wide border border-stone-300 hover:bg-stone-100 hover:border-stone-400 active:scale-95 transition-all duration-300"
            >
              Why Sadhana?
            </button>

            {/* Modern pill-shaped button with a subtle scale animation */}
            <button className="px-7 py-2.5 rounded-full bg-stone-900 text-stone-50 text-sm font-medium tracking-wide shadow-sm hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all duration-300">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <WhySadhanaModal
        isOpen={showWhySadhana}
        onClose={() => setShowWhySadhana(false)}
      />
    </>
  );
}
