"use client";

import { useState, useEffect } from "react";
import { DAILY_MANTRAS } from "../data/mantras";

// NOTE: Added the prop here too!
export default function MantraCapsule({
  onPracticeActive,
}: {
  onPracticeActive?: (isActive: boolean) => void;
}) {
  const [lessonIndex, setLessonIndex] = useState(0);

  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    const calculatedIndex = (dayOfMonth - 1) % DAILY_MANTRAS.length;
    setLessonIndex(calculatedIndex);
  }, []);

  const todayLesson = DAILY_MANTRAS[lessonIndex];
  const [timeLeft, setTimeLeft] = useState(120);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(todayLesson.durationSeconds);
  }, [todayLesson]);

  // NEW: Tell the background to turn on/off based on the 2 min timer
  useEffect(() => {
    if (onPracticeActive) {
      onPracticeActive(isActive);
    }
  }, [isActive, onPracticeActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent =
    ((todayLesson.durationSeconds - timeLeft) / todayLesson.durationSeconds) *
    100;

  return (
    <div className="max-w-2xl mx-auto bg-white border border-stone-200/90 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
      <div className="bg-stone-50 p-6 border-b border-stone-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Day {todayLesson.day}
          </span>
          <h2 className="text-xl font-bold text-stone-900 mt-1">
            {todayLesson.title}
          </h2>
        </div>
        <div className="text-3xl font-light text-stone-400 font-mono">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="w-full h-1.5 bg-stone-100">
        <div
          className="h-full bg-amber-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="p-8 overflow-y-auto space-y-8">
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-semibold text-amber-900 mb-4 leading-relaxed">
            {todayLesson.sanskrit}
          </p>
          <p className="text-sm font-medium text-stone-500 italic tracking-wide">
            {todayLesson.transliteration}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100/50">
            <h4 className="text-xs font-bold uppercase text-amber-800 mb-2">
              Translation
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {todayLesson.meaning}
            </p>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
            <h4 className="text-xs font-bold uppercase text-stone-500 mb-2">
              Daily Insight
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {todayLesson.lesson}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-stone-100 flex justify-center gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-8 py-3 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition active:scale-95 shadow-md w-full md:w-auto"
        >
          {isActive ? "Pause Practice" : "Begin 2-Minute Practice"}
        </button>
        <button
          onClick={() => {
            setIsActive(false);
            setTimeLeft(todayLesson.durationSeconds);
          }}
          className="px-6 py-3 rounded-full bg-stone-100 text-stone-600 font-medium hover:bg-stone-200 transition active:scale-95"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
