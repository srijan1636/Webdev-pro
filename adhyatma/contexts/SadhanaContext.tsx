"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SadhanaData, DEFAULT_SADHANA_DATA } from "../types/sadhana";

interface SadhanaContextType {
  data: SadhanaData;
  logSession: (sessionJapa: number, sessionMeditation: number) => Promise<void>;
  loading: boolean;
}

const SadhanaContext = createContext<SadhanaContextType | undefined>(undefined);

function calculateStreak(history: SadhanaData["history"]): number {
  const isActive = (date: Date) => {
    const entry = history[date.toDateString()];
    return !!entry && (entry.japa > 0 || entry.meditation > 0);
  };

  const cursor = new Date();
  let streak = 0;

  if (isActive(cursor)) {
    streak = 1;
  } else {
    cursor.setDate(cursor.getDate() - 1);
    if (!isActive(cursor)) {
      return 0;
    }
    streak = 1;
  }

  while (true) {
    cursor.setDate(cursor.getDate() - 1);
    if (isActive(cursor)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function SadhanaProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [data, setData] = useState<SadhanaData>(DEFAULT_SADHANA_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") {
      setData(DEFAULT_SADHANA_DATA);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/session")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const sessions = result.sessions as {
            japaRounds: number;
            meditationMinutes: number;
            date: string;
          }[];

          const totalJapa = sessions.reduce((sum, s) => sum + s.japaRounds, 0);
          const totalMeditation = sessions.reduce(
            (sum, s) => sum + s.meditationMinutes,
            0,
          );

          const history: SadhanaData["history"] = {};
          sessions.forEach((s) => {
            const dateStr = new Date(s.date).toDateString();
            if (!history[dateStr]) {
              history[dateStr] = { japa: 0, meditation: 0 };
            }
            history[dateStr].japa += s.japaRounds;
            history[dateStr].meditation += s.meditationMinutes;
          });

          const streak = calculateStreak(history);

          setData({
            japaRounds: totalJapa,
            meditationMinutes: totalMeditation,
            streak,
            lastLogDate:
              sessions.length > 0
                ? new Date(sessions[0].date).toDateString()
                : "",
            history,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sessions:", err);
        setLoading(false);
      });
  }, [status]);

  const logSession = async (sessionJapa: number, sessionMeditation: number) => {
    if (status !== "authenticated") {
      console.error("Cannot log session: not signed in");
      return;
    }

    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          japaRounds: sessionJapa,
          meditationMinutes: sessionMeditation,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setData((prev) => {
          const todayStr = new Date().toDateString();
          const currentHistory = prev.history || {};
          const todayHistory = currentHistory[todayStr] || {
            japa: 0,
            meditation: 0,
          };

          const newHistory = {
            ...currentHistory,
            [todayStr]: {
              japa: todayHistory.japa + sessionJapa,
              meditation: todayHistory.meditation + sessionMeditation,
            },
          };

          const newStreak = calculateStreak(newHistory);

          return {
            ...prev,
            japaRounds: prev.japaRounds + sessionJapa,
            meditationMinutes: prev.meditationMinutes + sessionMeditation,
            streak: newStreak,
            lastLogDate: todayStr,
            history: newHistory,
          };
        });
      }
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  return (
    <SadhanaContext.Provider value={{ data, logSession, loading }}>
      {children}
    </SadhanaContext.Provider>
  );
}

export function useSadhanaData() {
  const context = useContext(SadhanaContext);
  if (!context) {
    throw new Error("useSadhanaData must be used within a SadhanaProvider");
  }
  return context;
}
