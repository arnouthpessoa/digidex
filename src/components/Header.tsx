"use client";

import Link from "next/link";

export function Header() {
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

        <div className="font-retro text-text-secondary text-sm">
          Maeson Hack v1.09a
        </div>
      </div>
    </header>
  );
}
