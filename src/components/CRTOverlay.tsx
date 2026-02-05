"use client";

import { useState, useEffect } from "react";

interface CRTOverlayProps {
  enabled?: boolean;
}

export function CRTOverlay({ enabled = true }: CRTOverlayProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  useEffect(() => {
    // Check localStorage for user preference
    const stored = localStorage.getItem("digidex_crt_enabled");
    if (stored !== null) {
      setIsEnabled(stored === "true");
    }
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    >
      {/* Scanlines */}
      <div className="absolute inset-0 crt-scanlines" />

      {/* Vignette */}
      <div className="absolute inset-0 crt-vignette" />

      {/* Subtle screen flicker */}
      <div className="absolute inset-0 crt-flicker opacity-[0.03]" />
    </div>
  );
}
