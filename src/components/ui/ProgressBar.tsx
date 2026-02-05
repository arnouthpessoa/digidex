"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  current,
  total,
  showLabel = true,
  size = "md",
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const isComplete = current >= total;

  const heights = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="font-retro text-sm text-text-secondary">Progress</span>
          <span
            className={`font-pixel text-xs ${
              isComplete ? "text-accent-green" : "text-text-primary"
            }`}
          >
            {current}/{total}
          </span>
        </div>
      )}
      <div className={`w-full ${heights[size]} bg-bg-panel pixel-border-thin overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full ${isComplete ? "bg-accent-green" : "bg-accent-blue"}`}
        />
      </div>
    </div>
  );
}
