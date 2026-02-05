"use client";

import { useRef, useState, useCallback } from "react";
import type { Digimon } from "@/lib/types";

interface DigiviceCardProps {
  digimon: Digimon;
}

export function DigiviceCard({ digimon }: DigiviceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [spriteFailed, setSpriteFailed] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Glare follows opposite of tilt (light source from top-left)
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlarePosition({ x: glareX, y: glareY });
    setGlareOpacity(0.15);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("rotateX(0deg) rotateY(0deg)");
    setGlareOpacity(0);
  }, []);

  return (
    <div
      className="inline-block"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-default select-none"
        style={{
          width: "320px",
          height: "320px",
          transform,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Digivice container with glare effect */}
        <div className="relative w-full h-full">
          {/* Digivice base image */}
          <img
            src="/digivice.webp"
            alt="Digivice"
            className="w-full h-full object-contain"
            draggable={false}
            style={{
              filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.6))",
            }}
          />

          {/* Light reflection - masked to digivice shape */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.35) 0%, transparent 45%)`,
              opacity: glareOpacity > 0 ? 1 : 0,
              transition: "opacity 0.2s ease-out",
              maskImage: "url(/digivice.webp)",
              WebkitMaskImage: "url(/digivice.webp)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>

        {/* LCD Screen overlay - precisely positioned over the screen */}
        <div
          className="absolute overflow-hidden flex items-center justify-center"
          style={{
            left: "35.5%",
            top: "34.8%",
            width: "29%",
            height: "29%",
            borderRadius: "4px",
          }}
        >
          {/* Green LCD tint */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 50, 20, 0.45)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Digimon sprite inside screen */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
            {!spriteFailed ? (
              <img
                src={digimon.sprite}
                alt={digimon.name}
                className="max-w-full max-h-full object-contain image-pixelated"
                style={{
                  filter: "drop-shadow(0 0 3px rgba(0,255,136,0.5)) brightness(1.05)",
                }}
                onError={() => setSpriteFailed(true)}
                draggable={false}
              />
            ) : (
              <span className="font-pixel text-xl text-accent-green uppercase drop-shadow-[0_0_6px_rgba(0,255,136,0.8)]">
                {digimon.name.slice(0, 3)}
              </span>
            )}
          </div>

          {/* Scanline effect on LCD */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 2px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
