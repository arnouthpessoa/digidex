"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Digimon } from "@/lib/types";
import { STAGE_NAMES, STAGE_COLORS } from "@/lib/constants";
import { DigimonSprite } from "@/components/DigimonSprite";

interface DigimonCardProps {
  digimon: Digimon;
  index?: number;
}

export function DigimonCard({ digimon, index = 0 }: DigimonCardProps) {
  return (
    <Link href={`/${digimon.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)", transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.98 }}
        className="pixel-border bg-bg-card p-3 cursor-pointer"
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
