"use client";

import Link from "next/link";
import { useTracker } from "@/context/TrackerContext";

export function Header() {
  const { crtEnabled, toggleCRT } = useTracker();

  return (
    <header className="w-full py-6 px-4 border-b-2 border-border-pixel bg-bg-panel/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="font-pixel text-xl md:text-2xl text-accent-green crt-glow tracking-wider">
            DIGIDEX
          </h1>
          <p className="font-retro text-sm text-text-secondary mt-1">
            Digimon World Evolution Tracker
          </p>
        </Link>

        <div className="flex flex-col items-end gap-2">
          <div className="font-retro text-text-secondary text-sm">
            Maeson Patch v1.09a
          </div>

          {/* Pixel toggle */}
          <button
            onClick={toggleCRT}
            className="flex items-center gap-2 group"
            title={crtEnabled ? "Disable CRT effect" : "Enable CRT effect"}
          >
            <span className="font-pixel text-sm text-text-secondary">
              CRT
            </span>

            {/* Toggle track */}
            <div
              className={`relative w-10 h-5 border-2 transition-colors duration-200 ${
                crtEnabled
                  ? "border-accent-green bg-accent-green/20"
                  : "border-border-pixel bg-bg-dark"
              }`}
            >
              {/* Toggle knob */}
              <div
                className={`absolute top-0.5 w-3 h-3 transition-all duration-200 ${
                  crtEnabled
                    ? "left-5 bg-accent-green shadow-[0_0_6px_rgba(0,255,136,0.6)]"
                    : "left-0.5 bg-text-secondary"
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
