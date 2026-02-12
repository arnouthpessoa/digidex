"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { getDigimonById, getEvolutionsFrom, getEvolutionsTo } from "@/data";
import { STAGE_NAMES, STAGE_COLORS } from "@/lib/constants";
import { RequirementChecker } from "@/components/RequirementChecker";
import { DigimonSprite } from "@/components/DigimonSprite";
import { DigiviceCard } from "@/components/DigiviceCard";
import { PageTransition } from "@/components/PageTransition";
import { useTracker } from "@/context/TrackerContext";
import { notFound } from "next/navigation";

export default function DigimonPage() {
  const params = useParams();
  const digimonId = params.digimon as string;
  const [expandedEvolution, setExpandedEvolution] = useState<string | null>(null);
  const { tracker, setCurrentDigimon } = useTracker();

  const digimon = getDigimonById(digimonId);
  const isCurrentDigimon = tracker.currentDigimonId === digimonId;

  if (!digimon) {
    notFound();
  }

  const evolvesTo = getEvolutionsFrom(digimonId);
  const evolvesFrom = getEvolutionsTo(digimonId);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-pixel text-xs text-accent-green hover:text-accent-blue mb-6 flex items-center gap-2"
        >
          <span>&lt;</span> BACK TO LIST
        </motion.button>
      </Link>

      {/* Current Digimon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <DigiviceCard digimon={digimon} />
        <div className="mt-4">
          <h1 className="font-pixel text-xl text-text-primary mb-2">{digimon.name}</h1>
          <p className={`font-retro text-lg ${STAGE_COLORS[digimon.stage]}`}>
            {STAGE_NAMES[digimon.stage]}
            {evolvesTo.length === 0 && (digimon.stage === "ultimate" || digimon.stage === "special") && (
              <span className="text-text-secondary"> (Final Form)</span>
            )}
          </p>
        </div>

        {/* Set as Current Digimon Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentDigimon(isCurrentDigimon ? null : digimonId)}
          className={`mt-4 px-6 py-2 font-pixel text-xs transition-colors ${
            isCurrentDigimon
              ? "bg-accent-green/20 text-accent-green border-2 border-accent-green hover:bg-accent-red/20 hover:text-accent-red hover:border-accent-red"
              : "bg-bg-panel text-text-primary border-2 border-border-pixel hover:border-accent-green hover:text-accent-green"
          }`}
        >
          {isCurrentDigimon ? "✓ CURRENT DIGIMON" : "SET AS MY DIGIMON"}
        </motion.button>
      </motion.div>

      {/* Evolves From */}
      {evolvesFrom.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-pixel text-sm text-text-secondary mb-4"><span className="inline-block -translate-y-px">◀◀</span> EVOLVES FROM</h2>
          <div className="flex flex-wrap gap-3">
            {evolvesFrom.map((evo) => {
              const fromDigimon = getDigimonById(evo.from);
              if (!fromDigimon) return null;
              return (
                <Link key={evo.from} href={`/${evo.from}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="pixel-border-thin bg-bg-card p-3 cursor-pointer hover:shadow-glow"
                  >
                    <div className="w-12 h-12 mb-2">
                      <DigimonSprite digimon={fromDigimon} size="sm" />
                    </div>
                    <p className="font-pixel text-[8px] text-center text-text-primary">
                      {fromDigimon.name}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Evolves To */}
      {evolvesTo.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-pixel text-sm text-text-secondary mb-4"><span className="inline-block -translate-y-px">▶▶</span> CAN EVOLVE INTO</h2>
          <p className="font-retro text-sm text-text-secondary mb-4">
            Click a card to see requirements. Use the MY STATS button to track your progress.
          </p>
          <div className="space-y-4">
            {evolvesTo.map((evo) => {
              const toDigimon = getDigimonById(evo.to);
              if (!toDigimon) return null;

              const isExpanded = expandedEvolution === evo.to;

              return (
                <motion.div
                  key={evo.to}
                  layout
                  className="pixel-border bg-bg-card overflow-hidden"
                >
                  {/* Header - clickable */}
                  <button
                    onClick={() => setExpandedEvolution(isExpanded ? null : evo.to)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-bg-panel/30 transition-colors text-left"
                  >
                    {/* Target Digimon */}
                    <div className="pixel-border-thin p-2 flex-shrink-0">
                      <div className="w-14 h-14">
                        <DigimonSprite digimon={toDigimon} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-pixel text-sm text-text-primary truncate">
                        {toDigimon.name}
                      </p>
                      <p className={`font-retro text-sm ${STAGE_COLORS[toDigimon.stage]}`}>
                        {STAGE_NAMES[toDigimon.stage]}
                      </p>
                      <Link
                        href={`/${evo.to}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block mt-1"
                      >
                        <span className="font-pixel text-[10px] text-accent-green hover:text-accent-blue">
                          VIEW {toDigimon.name.toUpperCase()} →
                        </span>
                      </Link>
                    </div>

                    {/* Pixelated chevron */}
                    <span className="font-pixel text-accent-green text-xs">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Expanded Requirements */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border-pixel p-4"
                    >
                      <RequirementChecker
                        evolution={evo}
                        fromId={digimonId}
                        toId={evo.to}
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* No evolutions */}
      {evolvesTo.length === 0 && evolvesFrom.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="font-retro text-text-secondary">
            No evolution data available for this Digimon.
          </p>
        </motion.div>
      )}
      </div>
    </PageTransition>
  );
}
