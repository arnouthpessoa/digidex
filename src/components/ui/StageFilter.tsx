"use client";

import { motion } from "framer-motion";
import type { Stage } from "@/lib/types";
import { STAGE_NAMES } from "@/lib/constants";

interface StageFilterProps {
  selected: Stage | "all";
  onChange: (stage: Stage | "all") => void;
  counts?: Record<Stage | "all", number>;
}

const stages: (Stage | "all")[] = ["all", "baby", "rookie", "champion", "ultimate", "special"];

const stageColors: Record<Stage | "all", string> = {
  all: "bg-text-secondary",
  baby: "bg-stage-baby",
  rookie: "bg-stage-rookie",
  champion: "bg-stage-champion",
  ultimate: "bg-stage-ultimate",
  special: "bg-stage-special",
};

export function StageFilter({ selected, onChange, counts }: StageFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {stages.map((stage) => {
        const isSelected = selected === stage;
        const label = stage === "all" ? "All" : STAGE_NAMES[stage];
        const count = counts?.[stage];

        return (
          <motion.button
            key={stage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(stage)}
            className={`
              px-3 py-1.5 font-pixel text-[10px] uppercase tracking-wider
              pixel-border-thin transition-all
              ${
                isSelected
                  ? `${stageColors[stage]} text-bg-dark shadow-glow`
                  : "bg-bg-panel text-text-primary hover:bg-bg-card"
              }
            `}
          >
            {label}
            {count !== undefined && (
              <span className="ml-1 opacity-75">({count})</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
