"use client";

import { useState } from "react";
import type { Digimon } from "@/lib/types";

interface DigimonSpriteProps {
  digimon: Digimon;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "w-12 h-12",
  md: "w-full h-full",
  lg: "w-24 h-24",
};

const TEXT_CLASSES = {
  sm: "text-sm",
  md: "text-2xl",
  lg: "text-3xl",
};

export function DigimonSprite({ digimon, size = "md" }: DigimonSpriteProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`${SIZE_CLASSES[size]} bg-bg-panel flex items-center justify-center overflow-hidden`}>
      {!failed ? (
        <img
          src={digimon.sprite}
          alt={digimon.name}
          className="w-full h-full object-contain image-pixelated"
          onError={() => setFailed(true)}
          draggable={false}
        />
      ) : (
        <span className={`font-pixel ${TEXT_CLASSES[size]} text-text-secondary uppercase`}>
          {digimon.name.slice(0, 2)}
        </span>
      )}
    </div>
  );
}
