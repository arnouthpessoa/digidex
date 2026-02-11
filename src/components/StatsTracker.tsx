"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { getDigimonById } from "@/data";
import type { DigimonStats } from "@/lib/tracker-types";

const STAT_FIELDS: { key: keyof DigimonStats; label: string; step: number }[] = [
  { key: "HP", label: "HP", step: 100 },
  { key: "MP", label: "MP", step: 100 },
  { key: "OFF", label: "Offense", step: 10 },
  { key: "DEF", label: "Defense", step: 10 },
  { key: "SPE", label: "Speed", step: 10 },
  { key: "BRA", label: "Brains", step: 10 },
  { key: "weight", label: "Weight", step: 1 },
  { key: "discipline", label: "Discipline", step: 5 },
  { key: "happiness", label: "Happiness", step: 5 },
  { key: "careMistakes", label: "Care Mistakes", step: 1 },
  { key: "battles", label: "Battles", step: 1 },
  { key: "techs", label: "Techniques", step: 1 },
];

export function StatsTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const { tracker, updateStat, incrementStat, decrementStat, resetStats } = useTracker();
  const currentDigimon = tracker.currentDigimonId
    ? getDigimonById(tracker.currentDigimonId)
    : null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pixel-border bg-accent-green text-bg-dark font-pixel text-xs px-4 py-2 shadow-glow"
      >
        {isOpen ? "CLOSE" : "MY STATS"}
      </motion.button>

      {/* Stats Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-14 right-0 w-80 max-h-[70vh] overflow-y-auto pixel-border bg-bg-panel p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-pixel text-xs text-accent-green">MY STATS</h3>
                {currentDigimon && (
                  <p className="font-pixel text-[10px] text-text-primary mt-1">
                    {currentDigimon.name.toUpperCase()}
                  </p>
                )}
              </div>
              <button
                onClick={resetStats}
                className="font-retro text-sm text-text-secondary hover:text-accent-red"
              >
                Reset
              </button>
            </div>

            <div className="space-y-3">
              {STAT_FIELDS.map(({ key, label, step }) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="font-retro text-sm text-text-secondary w-24 flex-shrink-0">
                    {label}
                  </span>

                  <button
                    onClick={() => decrementStat(key, step)}
                    className="w-7 h-7 pixel-border-thin bg-bg-card text-text-primary font-pixel text-xs hover:bg-accent-red hover:text-bg-dark transition-colors"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={tracker.stats[key]}
                    onChange={(e) => updateStat(key, parseInt(e.target.value) || 0)}
                    className="w-20 px-1 py-1 font-retro text-sm text-center bg-bg-card text-text-primary pixel-border-thin focus:outline-none focus:border-accent-green"
                  />

                  <button
                    onClick={() => incrementStat(key, step)}
                    className="w-7 h-7 pixel-border-thin bg-bg-card text-text-primary font-pixel text-xs hover:bg-accent-green hover:text-bg-dark transition-colors"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Battle Counter */}
            <div className="mt-4 pt-4 border-t border-border-pixel">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[10px] text-accent-blue">QUICK BATTLE</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementStat("battles")}
                    className="w-8 h-8 pixel-border bg-bg-card text-text-primary font-pixel text-sm hover:bg-accent-red hover:text-bg-dark"
                  >
                    -
                  </button>
                  <span className="font-pixel text-lg text-accent-green w-12 text-center">
                    {tracker.stats.battles}
                  </span>
                  <button
                    onClick={() => incrementStat("battles")}
                    className="w-8 h-8 pixel-border bg-bg-card text-text-primary font-pixel text-sm hover:bg-accent-green hover:text-bg-dark"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
