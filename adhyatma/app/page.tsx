"use client";

import { useState, useEffect, useRef } from "react";
import SadhanaEngine from "../components/SadhnaEngine";
import MantraCapsule from "../components/MantraCapsule";
import { useSadhanaData } from "../contexts/SadhanaContext";

const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2500;
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

// =========================================================
// CUSTOM COMPONENT: Falling Golden Leaves
// =========================================================
const CalmBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes fallingLeaf {
          0% { transform: translate(0, -10vh) rotate(0deg) scale(0.8); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translate(100px, 100vh) rotate(720deg) scale(1.2); opacity: 0; }
        }
      `}</style>

      {[...Array(15)].map((_, i) => {
        const size = (i % 3) * 10 + 15; // Random sizes between 15px and 35px
        const left = (i * 7.5) % 100;
        const duration = (i % 5) * 4 + 15; // Slow fall
        const delay = (i % 4) * 3;

        return (
          <div
            key={i}
            // CSS trick: these rounded corners create a perfect leaf/petal shape!
            className="absolute bg-gradient-to-br from-amber-400 to-amber-600/50 rounded-tl-full rounded-br-full rounded-tr-sm rounded-bl-sm blur-[2px]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: "-10%",
              animation: `fallingLeaf ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default function Home() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showSadhanaEngine, setShowSadhanaEngine] = useState(false);
  const [showMantraCapsule, setShowMantraCapsule] = useState(false);
  const [isPracticeActive, setIsPracticeActive] = useState(false);

  const { data } = useSadhanaData();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to safely close everything and stop the background
  const closeModals = () => {
    setShowFeatures(false);
    setShowSadhanaEngine(false);
    setShowMantraCapsule(false);
    setIsPracticeActive(false);
  };

  return (
    <main className="relative bg-[#FAF7F2] text-[#2B231D]">
      <section
        id="hero"
        className="sticky top-0 z-10 h-screen flex flex-col items-center justify-center px-6 text-center bg-[#FAF7F2]"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="inline-block px-5 py-1.5 text-sm md:text-base font-serif tracking-widest rounded-full text-amber-950 bg-amber-100/90 border border-amber-300 shadow-sm">
            तत् त्वम् असि
          </div>
          <span className="text-xs text-stone-500 tracking-wider mt-2 italic">
            &ldquo;That thou art&rdquo; • You are the divine reality
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#2B231D] mb-6 max-w-4xl">
          A little closer to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
            yourself
          </span>
          , every day.
        </h1>

        <p className="text-lg text-stone-600 max-w-2xl mb-10 leading-relaxed font-normal">
          Dedicate two quiet minutes to sacred mantras or track your daily
          sadhana.{" "}
          <span className="block mt-2 font-semibold tracking-wide text-amber-900">
            Meditate. Chant. Learn. Evolve.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={() => setShowFeatures(true)}
            className="px-8 py-3.5 rounded-full bg-[#2B231D] text-[#FAF7F2] font-medium hover:bg-stone-800 transition-all shadow-lg hover:scale-105 active:scale-95 duration-200"
          >
            Get Started (All Features)
          </button>
          <button
            onClick={() => scrollToSection("journey")}
            className="px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-sm text-[#2B231D] font-medium border border-stone-300 hover:bg-white transition-all shadow-sm active:scale-95 duration-200"
          >
            Explore The Journey ↓
          </button>
        </div>
      </section>

      <section
        id="journey"
        className="sticky top-0 z-20 h-screen flex items-center justify-center overflow-hidden px-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-75 contrast-125"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1925&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1614]/90 via-[#1A1614]/70 to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto text-[#FAF7F2] gap-12">
          <div className="text-left md:w-1/2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500 mb-2 block">
              The Heritage
            </span>
            <div className="text-[6rem] md:text-[10rem] font-bold tracking-tighter leading-none mb-4 text-white drop-shadow-2xl">
              <AnimatedCounter target={108000} />
              <span className="text-amber-500 text-[4rem] md:text-[6rem] align-top">
                +
              </span>
            </div>
            <p className="text-lg md:text-2xl font-serif font-light text-stone-300 max-w-md">
              Sacred verses mapped across the Vedas, Upanishads, and Epics.
            </p>
          </div>

          <div className="text-left md:text-right md:w-1/2 flex flex-col md:items-end mt-8 md:mt-0">
            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-6 drop-shadow-lg max-w-lg text-white">
              Learning even one is a blessing.
            </h2>
            <p className="text-stone-300 max-w-md text-base md:text-lg font-light leading-relaxed mb-10">
              This is not a race to completion. It is a lifelong journey inward.
              So learn slow, practice daily, and let the rhythm transform you.
            </p>
            <button
              onClick={() => scrollToSection("rituals")}
              className="px-8 py-3.5 rounded-full border border-amber-500/50 text-amber-100 hover:bg-amber-500/20 text-sm font-semibold tracking-wide transition duration-300 backdrop-blur-md"
            >
              View Daily Rituals ↓
            </button>
          </div>
        </div>
      </section>

      <section
        id="rituals"
        className="relative z-30 min-h-screen flex flex-col justify-center bg-[#FAF7F2] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] rounded-t-[3rem] px-6 py-20 mt-[100vh]"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-left mb-12">
            <span className="text-xs uppercase font-bold text-amber-800 tracking-widest">
              Daily Rituals
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2B231D] mt-2">
              Built for consistency and quiet stillness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-10 rounded-[2rem] bg-white border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-serif text-amber-600 drop-shadow-sm">
                    ॐ
                  </span>
                  <span className="text-xs font-semibold px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full">
                    2 Min Practice
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-amber-900">
                  Today&apos;s Mantra
                </h3>
                <p className="text-stone-600 text-base mt-4 mb-8 leading-relaxed text-justify">
                  Step in for two minutes. Listen to authentic recitation, chant
                  along, and read the deeper Sanskrit-to-English philosophical
                  meaning behind every verse.
                </p>
              </div>

              <div
                onClick={() => setShowMantraCapsule(true)}
                className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors shadow-sm active:scale-95"
              >
                <div>
                  <p className="text-xs text-amber-800 font-medium mb-0.5">
                    Today&apos;s Lesson
                  </p>
                  <p className="text-sm font-bold text-amber-950">
                    Day 1 • Gayatri Mantra
                  </p>
                </div>
                <span className="text-amber-700 font-bold text-sm group-hover:underline">
                  Begin Practice →
                </span>
              </div>
            </div>

            <div className="p-10 rounded-[2rem] bg-white border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <svg
                    width="44"
                    height="16"
                    viewBox="0 0 36 12"
                    fill="currentColor"
                    className="text-amber-600 drop-shadow-sm"
                  >
                    <circle cx="6" cy="6" r="4" />
                    <rect x="10" y="5" width="6" height="2" />
                    <circle cx="18" cy="6" r="4" />
                    <rect x="22" y="5" width="6" height="2" />
                    <circle cx="30" cy="6" r="4" />
                  </svg>
                  <span className="text-xs font-semibold px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full">
                    Sadhana Log
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-amber-900">
                  The Sadhana
                </h3>
                <p className="text-stone-600 text-base mt-4 mb-8 leading-relaxed text-justify">
                  Log japa rounds, meditation minutes, and pranayama sessions.
                  Track personal consistency streaks and celebrate discipline
                  like athletic progress.
                </p>
              </div>

              <div
                onClick={() => setShowSadhanaEngine(true)}
                className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors shadow-sm active:scale-95"
              >
                <div>
                  <p className="text-xs text-amber-800 font-medium mb-0.5">
                    Current Streak
                  </p>
                  <p className="text-sm font-bold text-amber-950">
                    {data.streak} Days Active • {data.japaRounds} Japa
                  </p>
                </div>
                <span className="text-amber-700 font-bold text-sm group-hover:underline">
                  Open Tracker →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFeatures && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-[#FAF7F2] border border-stone-300 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative z-10">
            <button
              onClick={closeModals}
              className="absolute top-5 right-5 text-stone-500 hover:text-stone-800 text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              Adhyatma Capabilities
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              Everything included in your spiritual companion:
            </p>
            <ul className="space-y-4 text-left text-sm text-stone-700 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-amber-700">✦</span>
                <div>
                  <strong>Today's Mantra:</strong> Timed chanting sessions.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-700">✦</span>
                <div>
                  <strong>The Sadhana:</strong> Strava-style logging.
                </div>
              </li>
            </ul>
            <button
              onClick={closeModals}
              className="w-full py-3 rounded-full bg-[#2B231D] text-white font-medium hover:bg-stone-800 transition"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {showMantraCapsule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          {/* ONLY shows up when practice is active! */}
          {isPracticeActive && <CalmBackground />}
          <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-300 z-10">
            <button
              onClick={closeModals}
              className="absolute top-5 right-5 z-50 text-stone-400 hover:text-stone-800 text-xl font-bold bg-stone-100 hover:bg-stone-200 rounded-full w-8 h-8 flex items-center justify-center transition shadow-sm"
            >
              ✕
            </button>
            <MantraCapsule onPracticeActive={setIsPracticeActive} />
          </div>
        </div>
      )}

      {showSadhanaEngine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          {/* ONLY shows up when practice is active! */}
          {isPracticeActive && <CalmBackground />}
          <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300 z-10">
            <button
              onClick={closeModals}
              className="absolute top-6 right-6 z-50 text-stone-400 hover:text-stone-800 text-xl font-bold bg-stone-100 hover:bg-stone-200 rounded-full w-8 h-8 flex items-center justify-center transition shadow-sm"
            >
              ✕
            </button>
            <SadhanaEngine onPracticeActive={setIsPracticeActive} />
          </div>
        </div>
      )}
    </main>
  );
}
