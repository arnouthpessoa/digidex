"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface RetroButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const RetroButton = forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles =
      "font-pixel uppercase tracking-wider transition-all pixel-border-thin cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-accent-green text-bg-dark hover:shadow-glow",
      secondary: "bg-bg-panel text-text-primary hover:bg-bg-card",
      ghost: "bg-transparent text-text-primary hover:bg-bg-panel border-transparent",
    };

    const sizes = {
      sm: "px-3 py-1 text-[8px]",
      md: "px-4 py-2 text-[10px]",
      lg: "px-6 py-3 text-xs",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

RetroButton.displayName = "RetroButton";
