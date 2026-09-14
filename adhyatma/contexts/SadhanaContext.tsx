"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SadhanaData, DEFAULT_SADHANA_DATA } from "../types/sadhana";

const STORAGE_KEY = "adhyatma_sadhana";

interface SadhanaContextType {
  data: SadhanaData;
  logSession: (sessionJapa: number, sessionMeditation: number) => void;
}

const SadhanaContext = createContext<SadhanaContextType | undefined>(undefined);

export function SadhanaProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SadhanaData>(DEFAULT_SADHANA_DATA);

  // Load once on mount, same as before, just now in one place
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch {
        setData(DEFAULT_SADHANA_DATA);
      }
    }
  }, []);

  // Moved straight out of SadhnaEngine's handleSaveSession
  const logSession = (sessionJapa: number, sessionMeditation: number) => {
    const today = new Date();
    const todayStr = today.toDateString();

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newStreak = data.streak;

    if (sessionJapa > 0 || sessionMeditation > 0) {
      if (data.lastLogDate === yesterdayStr) {
        newStreak += 1;
      } else if (data.lastLogDate === todayStr) {
        newStreak = data.streak;
      } else {
        newStreak = 1;
      }
    }

    const currentHistory = data.history || {};
    const todayHistory = currentHistory[todayStr] || { japa: 0, meditation: 0 };

    const newHistory = {
      ...currentHistory,
      [todayStr]: {
        japa: todayHistory.japa + sessionJapa,
        meditation: todayHistory.meditation + sessionMeditation,
      },
    };

    const newData: SadhanaData = {
      japaRounds: data.japaRounds + sessionJapa,
      meditationMinutes: data.meditationMinutes + sessionMeditation,
      streak: newStreak,
      lastLogDate: todayStr,
      history: newHistory,
    };

    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  return (
    <SadhanaContext.Provider value={{ data, logSession }}>
      {children}
    </SadhanaContext.Provider>
  );
}

// This is the hook every component will import from now on
export function useSadhanaData() {
  const context = useContext(SadhanaContext);
  if (!context) {
    throw new Error("useSadhanaData must be used within a SadhanaProvider");
  }
  return context;
}
