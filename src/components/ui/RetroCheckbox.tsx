"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RetroCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  sublabel?: string;
  disabled?: boolean;
}

export function RetroCheckbox({
  checked,
  onChange,
  label,
  sublabel,
  disabled = false,
}: RetroCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`flex items-start gap-3 w-full text-left group ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {/* Checkbox box */}
      <div
        className={`relative w-5 h-5 flex-shrink-0 mt-0.5 pixel-border-thin transition-colors ${
          checked ? "bg-accent-green" : "bg-bg-panel"
        } ${!disabled && "group-hover:border-accent-green"}`}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              viewBox="0 0 24 24"
              className="absolute inset-0 w-full h-full text-bg-dark p-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2 }}
                d="M5 12l5 5L19 7"
                strokeLinecap="square"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <span
          className={`font-retro text-lg block ${
            checked ? "text-accent-green line-through" : "text-text-primary"
          }`}
        >
          {label}
        </span>
        {sublabel && (
          <span className="font-retro text-sm text-text-secondary block">
            {sublabel}
          </span>
        )}
      </div>
    </button>
  );
}
