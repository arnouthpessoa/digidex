"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { TrackerData, DigimonStats } from "@/lib/tracker-types";
import { DEFAULT_TRACKER } from "@/lib/tracker-types";

interface TrackerContextType {
  tracker: TrackerData;
  setCurrentDigimon: (id: string | null) => void;
  updateStat: (stat: keyof DigimonStats, value: number) => void;
  incrementStat: (stat: keyof DigimonStats, amount?: number) => void;
  decrementStat: (stat: keyof DigimonStats, amount?: number) => void;
  toggleManualCheck: (key: string) => void;
  isManuallyChecked: (key: string) => boolean;
  resetStats: () => void;
}

const TrackerContext = createContext<TrackerContextType | null>(null);

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [tracker, setTracker] = useLocalStorage<TrackerData>("digidex_tracker", DEFAULT_TRACKER);

  const setCurrentDigimon = (id: string | null) => {
    setTracker((prev) => ({ ...prev, currentDigimonId: id }));
  };

  const updateStat = (stat: keyof DigimonStats, value: number) => {
    setTracker((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: Math.max(0, value) },
    }));
  };

  const incrementStat = (stat: keyof DigimonStats, amount = 1) => {
    setTracker((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: prev.stats[stat] + amount },
    }));
  };

  const decrementStat = (stat: keyof DigimonStats, amount = 1) => {
    setTracker((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: Math.max(0, prev.stats[stat] - amount) },
    }));
  };

  const toggleManualCheck = (key: string) => {
    setTracker((prev) => ({
      ...prev,
      manualChecks: {
        ...prev.manualChecks,
        [key]: !prev.manualChecks[key],
      },
    }));
  };

  const isManuallyChecked = (key: string) => {
    return tracker.manualChecks[key] ?? false;
  };

  const resetStats = () => {
    setTracker((prev) => ({
      ...prev,
      stats: DEFAULT_TRACKER.stats,
    }));
  };

  return (
    <TrackerContext.Provider
      value={{
        tracker,
        setCurrentDigimon,
        updateStat,
        incrementStat,
        decrementStat,
        toggleManualCheck,
        isManuallyChecked,
        resetStats,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return context;
}
