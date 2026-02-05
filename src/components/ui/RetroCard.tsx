"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface RetroCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  hoverable?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export const RetroCard = forwardRef<HTMLDivElement, RetroCardProps>(
  ({ hoverable = false, selected = false, className = "", children, ...props }, ref) => {
    const baseStyles = "pixel-border bg-bg-card p-4 transition-shadow";
    const hoverStyles = hoverable ? "cursor-pointer" : "";
    const selectedStyles = selected ? "shadow-glow border-accent-green" : "";

    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { scale: 1.03 } : undefined}
        whileTap={hoverable ? { scale: 0.98 } : undefined}
        className={`${baseStyles} ${hoverStyles} ${selectedStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

RetroCard.displayName = "RetroCard";
