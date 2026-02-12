"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Digimon } from "@/lib/types";
import { STAGE_NAMES, STAGE_COLORS } from "@/lib/constants";
import { DigimonSprite } from "@/components/DigimonSprite";

interface DigimonCardProps {
  digimon: Digimon;
}

export function DigimonCard({ digimon }: DigimonCardProps) {
  return (
    <Link href={`/${digimon.id}`}>
      <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        className="pixel-border bg-bg-card p-3 cursor-pointer transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]"
      >
        {/* Sprite */}
        <div className="aspect-square mb-2">
          <DigimonSprite digimon={digimon} />
        </div>

        {/* Name */}
        <p className="font-pixel text-[10px] text-center text-text-primary truncate mb-1">
          {digimon.name}
        </p>

        {/* Stage badge */}
        <p className={`font-retro text-sm text-center ${STAGE_COLORS[digimon.stage]}`}>
          {STAGE_NAMES[digimon.stage]}
        </p>
      </motion.div>
    </Link>
  );
}
