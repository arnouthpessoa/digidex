"use client";

import { useTracker } from "@/context/TrackerContext";

export function CRTOverlay() {
  const { crtEnabled } = useTracker();

  if (!crtEnabled) return null;

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
