"use client";

import { useTracker } from "@/context/TrackerContext";
import type { Evolution } from "@/lib/types";
import type { DigimonStats } from "@/lib/tracker-types";
import { motion } from "framer-motion";

interface RequirementCheckerProps {
  evolution: Evolution;
  fromId: string;
  toId: string;
}

function CheckIcon({ checked, auto }: { checked: boolean; auto: boolean }) {
  return (
    <div
      className={`w-5 h-5 flex-shrink-0 pixel-border-thin flex items-center justify-center transition-colors ${
        checked
          ? auto
            ? "bg-accent-green"
            : "bg-accent-blue"
          : "bg-bg-panel"
      }`}
    >
      {checked && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-bg-dark font-pixel text-[8px]"
        >
          ✓
        </motion.span>
      )}
    </div>
  );
}

export function RequirementChecker({ evolution, fromId, toId }: RequirementCheckerProps) {
  const { tracker, toggleManualCheck, isManuallyChecked } = useTracker();
  const stats = tracker.stats;
  const req = evolution.requirements;

  const checkKey = (suffix: string) => `${fromId}_${toId}_${suffix}`;

  // Check if stat requirement is met
  const isStatMet = (stat: string, min: number): boolean => {
    const statKey = stat as keyof DigimonStats;
    return stats[statKey] >= min;
  };

  // Check weight range
  const isWeightMet = (): boolean => {
    return stats.weight >= req.weight.min && stats.weight <= req.weight.max;
  };

  // Check care mistakes
  const isCareMistakesMet = (): boolean => {
    if (!req.careMistakes) return true;
    const { operator, value } = req.careMistakes;
    if (operator === "<") return stats.careMistakes < value;
    if (operator === ">") return stats.careMistakes > value;
    return stats.careMistakes === value;
  };

  // Check bonus requirement
  const isBonusMet = (bonus: typeof req.bonus[0]): boolean => {
    if (bonus.type === "highestStat") return true; // Manual check only
    if (bonus.type === "discipline") return bonus.min ? stats.discipline >= bonus.min : true;
    if (bonus.type === "happiness") return bonus.min ? stats.happiness >= bonus.min : true;
    if (bonus.type === "techs") return bonus.min ? stats.techs >= bonus.min : true;
    if (bonus.type === "battles") {
      const min = bonus.min ?? 0;
      const max = bonus.max ?? Infinity;
      return stats.battles >= min && stats.battles <= max;
    }
    return false;
  };

  // Count met requirements
  const statsAllMet = req.stats.every((s) => isStatMet(s.stat, s.min) || isManuallyChecked(checkKey(`stat_${s.stat}`)));
  const weightMet = isWeightMet() || isManuallyChecked(checkKey("weight"));
  const careMistakesMet = isCareMistakesMet() || isManuallyChecked(checkKey("careMistakes"));
  const anyBonusMet = req.bonus.length === 0 || req.bonus.some((b) => isBonusMet(b) || isManuallyChecked(checkKey(`bonus_${b.type}`)));

  const totalCategories = 4;
  const requiredCategories = 3; // Game requires 3 of 4 categories to evolve
  const metCategories = [statsAllMet, weightMet, careMistakesMet, anyBonusMet].filter(Boolean).length;
  const canEvolve = metCategories >= requiredCategories;

  // Progress messages based on met categories
  const progressMessage = [
    "NOT EVEN CLOSE...",
    "KEEP TRAINING, ROOKIE!",
    "GETTING WARMER...",
    "DIGIVOLUTION READY!",
    "ABSOLUTE PERFECTION!",
  ][metCategories];

  return (
    <div className="space-y-3">
      {/* Progress Message */}
      <div className="text-center mb-2">
        <motion.span
          key={metCategories}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-pixel text-xs ${canEvolve ? "text-accent-green crt-glow" : "text-text-secondary"}`}
        >
          {progressMessage}
        </motion.span>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-3 bg-bg-panel pixel-border-thin overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(metCategories / totalCategories) * 100}%` }}
            className={`h-full ${canEvolve ? "bg-accent-green" : "bg-accent-blue"}`}
          />
        </div>
        <span className={`font-pixel text-xs ${canEvolve ? "text-accent-green" : "text-text-primary"}`}>
          {metCategories}/{totalCategories} {canEvolve && "✓"}
        </span>
      </div>

      {/* Stats */}
      {req.stats.length > 0 && (
        <div className="space-y-1">
          <span className="font-pixel text-[10px] text-text-secondary">STATS</span>
          {req.stats.map((s) => {
            const autoMet = isStatMet(s.stat, s.min);
            const manualMet = isManuallyChecked(checkKey(`stat_${s.stat}`));
            const met = autoMet || manualMet;

            return (
              <button
                key={s.stat}
                onClick={() => toggleManualCheck(checkKey(`stat_${s.stat}`))}
                className="flex items-center gap-2 w-full text-left hover:bg-bg-card/50 p-1 -m-1 rounded"
              >
                <CheckIcon checked={met} auto={autoMet} />
                <span className={`font-retro text-lg ${met ? "text-accent-green line-through" : "text-text-primary"}`}>
                  {s.stat} {s.min}+
                </span>
                <span className="font-retro text-sm text-text-secondary ml-auto">
                  (You: {stats[s.stat as keyof DigimonStats]})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Weight */}
      <div>
        <span className="font-pixel text-[10px] text-text-secondary">WEIGHT</span>
        <button
          onClick={() => toggleManualCheck(checkKey("weight"))}
          className="flex items-center gap-2 w-full text-left hover:bg-bg-card/50 p-1 -m-1 rounded"
        >
          <CheckIcon checked={weightMet} auto={isWeightMet()} />
          <span className={`font-retro text-lg ${weightMet ? "text-accent-green line-through" : "text-text-primary"}`}>
            {req.weight.min} ~ {req.weight.max}
          </span>
          <span className="font-retro text-sm text-text-secondary ml-auto">
            (You: {stats.weight})
          </span>
        </button>
      </div>

      {/* Care Mistakes */}
      {req.careMistakes && (
        <div>
          <span className="font-pixel text-[10px] text-text-secondary">CARE MISTAKES</span>
          <button
            onClick={() => toggleManualCheck(checkKey("careMistakes"))}
            className="flex items-center gap-2 w-full text-left hover:bg-bg-card/50 p-1 -m-1 rounded"
          >
            <CheckIcon checked={careMistakesMet} auto={isCareMistakesMet()} />
            <span className={`font-retro text-lg ${careMistakesMet ? "text-accent-green line-through" : "text-text-primary"}`}>
              {req.careMistakes.operator === "=" ? "Exactly " : req.careMistakes.operator === "<" ? "Less than " : "More than "}
              {req.careMistakes.value}
            </span>
            <span className="font-retro text-sm text-text-secondary ml-auto">
              (You: {stats.careMistakes})
            </span>
          </button>
        </div>
      )}

      {/* Bonus */}
      {req.bonus.length > 0 && (
        <div className="space-y-1">
          <span className="font-pixel text-[10px] text-text-secondary">BONUS (need one)</span>
          {req.bonus.map((b, i) => {
            const autoMet = isBonusMet(b);
            const manualMet = isManuallyChecked(checkKey(`bonus_${b.type}`));
            const met = autoMet || manualMet;

            let label = "";
            let yourValue = "";

            if (b.type === "highestStat" && b.options) {
              label = `Highest: ${b.options.join("/")}`;
              yourValue = "";
            } else if (b.min !== undefined && b.max !== undefined) {
              label = `${b.type} ${b.min}-${b.max}`;
              yourValue = `(You: ${stats[b.type as keyof DigimonStats] ?? "?"})`;
            } else if (b.min !== undefined) {
              label = `${b.type} ${b.min}+`;
              yourValue = `(You: ${stats[b.type as keyof DigimonStats] ?? "?"})`;
            }

            return (
              <button
                key={i}
                onClick={() => toggleManualCheck(checkKey(`bonus_${b.type}`))}
                className="flex items-center gap-2 w-full text-left hover:bg-bg-card/50 p-1 -m-1 rounded"
              >
                <CheckIcon checked={met} auto={autoMet} />
                <span className={`font-retro text-lg capitalize ${met ? "text-accent-green line-through" : "text-text-primary"}`}>
                  {label}
                </span>
                {yourValue && (
                  <span className="font-retro text-sm text-text-secondary ml-auto">
                    {yourValue}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="pt-2 border-t border-border-pixel flex gap-4 text-xs font-retro text-text-secondary">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-accent-green"></span> Auto-met
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-accent-blue"></span> Manual
        </span>
      </div>
    </div>
  );
}
