"use client";

import { useState, useEffect, useCallback } from "react";
import { useSadhanaData } from "../contexts/SadhanaContext";

interface SadhanaData {
  japaRounds: number;
  meditationMinutes: number;
  streak: number;
  lastLogDate: string;
  history: { [date: string]: { japa: number; meditation: number } };
}

// NOTE: We added a prop here so it can talk to the background!
export default function SadhnaEngine({
  onPracticeActive,
}: {
  onPracticeActive?: (isActive: boolean) => void;
}) {
  const { data, logSession } = useSadhanaData();

  const [activeTab, setActiveTab] = useState<
    "japa" | "meditation" | "progress"
  >("japa");

  // NEW: Generate the last 30 days for the heatmap grid
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toDateString();
  });
  const [sessionJapa, setSessionJapa] = useState(0);
  const [sessionMeditation, setSessionMeditation] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [beadCount, setBeadCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(5);

  // NEW: Tells the main background to turn on/off the falling leaves
  useEffect(() => {
    if (onPracticeActive) {
      onPracticeActive(isMeditating || activeTab === "japa");
    }
  }, [isMeditating, activeTab, onPracticeActive]);

  const handleBeadTap = useCallback(() => {
    const audio = new Audio("/click.mp3");
    audio.play().catch(() => {});

    setBeadCount((prev) => {
      if (prev + 1 >= 108) {
        setSessionJapa((rounds) => rounds + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === "japa" && e.code === "Space") {
        e.preventDefault();
        handleBeadTap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, handleBeadTap]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMeditating && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isMeditating && timeLeft === 0) {
      setIsMeditating(false);
      setSessionMeditation((prev) => prev + selectedDuration);
      const audio = new Audio("/click.mp3");
      audio.play().catch(() => {});
    }
    return () => clearInterval(interval);
  }, [isMeditating, timeLeft, selectedDuration]);

  const startMeditation = (minutes: number) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsMeditating(true);
  };

  const stopMeditationEarly = () => {
    setIsMeditating(false);
    const minutesCompleted = selectedDuration - Math.ceil(timeLeft / 60);
    if (minutesCompleted > 0) {
      setSessionMeditation((prev) => prev + minutesCompleted);
    }
    setTimeLeft(0);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSaveSession = () => {
    logSession(sessionJapa, sessionMeditation);

    setSessionJapa(0);
    setSessionMeditation(0);
    setBeadCount(0);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col w-full max-h-[90vh]">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-900">The Sadhana</h2>
          <p className="text-sm font-medium text-amber-800/80 mt-1">
            Lifetime Progress: {data.japaRounds} Rounds •{" "}
            {data.meditationMinutes} Min
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-amber-600 drop-shadow-sm">
            {data.streak} <span className="text-lg">Days</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700/70 mt-1">
            Current Streak
          </p>
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-1 bg-white flex flex-col">
        <div className="flex bg-stone-100 rounded-full p-1 mb-6">
          <button
            onClick={() => setActiveTab("japa")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${activeTab === "japa" ? "bg-white shadow-sm text-amber-900" : "text-stone-500 hover:text-stone-700"}`}
          >
            Japa
          </button>
          <button
            onClick={() => setActiveTab("meditation")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${activeTab === "meditation" ? "bg-white shadow-sm text-amber-900" : "text-stone-500 hover:text-stone-700"}`}
          >
            Timer
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${activeTab === "progress" ? "bg-white shadow-sm text-amber-900" : "text-stone-500 hover:text-stone-700"}`}
          >
            Progress
          </button>
        </div>

        {activeTab === "japa" && (
          <div className="flex flex-col items-center justify-center py-4 flex-1">
            <div
              onClick={handleBeadTap}
              className="w-56 h-56 rounded-full border-4 border-amber-500 bg-amber-50 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95 transition-all mb-10 relative group"
            >
              <span className="text-6xl font-light text-amber-900">
                {beadCount}
              </span>
              <span className="text-sm font-bold text-amber-600/70 mt-2">
                / 108
              </span>
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-stone-400">
                Tap or press Spacebar
              </div>
            </div>

            <div className="text-center bg-stone-50 px-6 py-3 rounded-2xl border border-stone-100 w-full">
              <p className="text-xs uppercase font-bold text-stone-500 tracking-wider mb-1">
                Rounds Logged Today
              </p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <button
                  onClick={() => setSessionJapa(Math.max(0, sessionJapa - 1))}
                  className="text-stone-400 hover:text-stone-600 font-bold text-xl"
                >
                  -
                </button>
                <p className="text-2xl font-semibold text-stone-800 w-8">
                  {sessionJapa}
                </p>
                <button
                  onClick={() => setSessionJapa(sessionJapa + 1)}
                  className="text-stone-400 hover:text-stone-600 font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "meditation" && (
          <div className="flex flex-col items-center justify-center py-4 flex-1">
            {!isMeditating && timeLeft === 0 ? (
              <div className="w-full space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-stone-900">
                    Select Duration
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">
                    Sit comfortably and breathe naturally.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[5, 10, 15].map((min) => (
                    <button
                      key={min}
                      onClick={() => startMeditation(min)}
                      className="py-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-amber-50 transition-all font-semibold text-stone-700 flex flex-col items-center shadow-sm"
                    >
                      <span className="text-3xl text-amber-700 mb-1">
                        {min}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-stone-400">
                        min
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full mt-4">
                <div className="relative flex items-center justify-center mb-12">
                  <div className="absolute -inset-8 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -inset-2 border-2 border-amber-300/30 rounded-full animate-pulse" />

                  <div className="relative w-64 h-64 rounded-full border-2 border-amber-200 bg-white shadow-inner flex flex-col items-center justify-center z-10 overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-amber-50 transition-all duration-1000 ease-linear z-0"
                      style={{
                        height: `${(1 - timeLeft / (selectedDuration * 60)) * 100}%`,
                      }}
                    />
                    <span className="text-6xl font-light text-amber-950 z-10 tracking-tighter">
                      {formatTimer(timeLeft)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700/60 mt-3 z-10">
                      Breathe
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsMeditating(!isMeditating)}
                    className="px-8 py-3 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition shadow-md active:scale-95 z-10"
                  >
                    {isMeditating ? "Pause" : "Resume"}
                  </button>
                  <button
                    onClick={stopMeditationEarly}
                    className="px-8 py-3 rounded-full bg-stone-100 text-stone-600 border border-stone-200 font-medium hover:bg-stone-200 transition shadow-sm active:scale-95 z-10"
                  >
                    Finish & Log
                  </button>
                </div>
              </div>
            )}

            {!isMeditating && (
              <div className="text-center bg-stone-50 px-6 py-3 rounded-2xl border border-stone-100 mt-8 w-full">
                <p className="text-xs uppercase font-bold text-stone-500 tracking-wider mb-1">
                  Minutes Logged Today
                </p>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <button
                    onClick={() =>
                      setSessionMeditation(Math.max(0, sessionMeditation - 1))
                    }
                    className="text-stone-400 hover:text-stone-600 font-bold text-xl"
                  >
                    -
                  </button>
                  <p className="text-2xl font-semibold text-stone-800 w-8">
                    {sessionMeditation}
                  </p>
                  <button
                    onClick={() => setSessionMeditation(sessionMeditation + 1)}
                    className="text-stone-400 hover:text-stone-600 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "progress" && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-stone-800 mb-4">
              30-Day Sadhana Heatmap
            </h3>
            <div className="grid grid-cols-10 gap-1.5">
              {last30Days.map((day) => {
                const dayData = data.history?.[day];
                const hasPractice =
                  dayData && (dayData.japa > 0 || dayData.meditation > 0);
                const isHighActivity =
                  dayData && (dayData.japa >= 108 || dayData.meditation >= 15);
                let bgClass = "bg-stone-100";
                if (isHighActivity) bgClass = "bg-amber-500 shadow-sm";
                else if (hasPractice) bgClass = "bg-amber-300";
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded ${bgClass}`}
                    title={day}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-stone-100" />
                <span>Missed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-300" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-500" />
                <span>Deep</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-stone-50 border-t border-stone-100 flex flex-col items-center">
        <button
          onClick={handleSaveSession}
          disabled={sessionJapa === 0 && sessionMeditation === 0}
          className={`w-full py-4 rounded-full font-medium transition-all shadow-md active:scale-95 ${
            isSaved
              ? "bg-green-600 text-white"
              : sessionJapa === 0 && sessionMeditation === 0
                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                : "bg-amber-900 text-white hover:bg-amber-800"
          }`}
        >
          {isSaved
            ? "Session Saved Successfully!"
            : `Save Progress (${sessionJapa} Rounds, ${sessionMeditation} Min)`}
        </button>
      </div>
    </div>
  );
}
