"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DigimonGrid } from "@/components/DigimonGrid";
import { DigiviceCard } from "@/components/DigiviceCard";
import { useTracker } from "@/context/TrackerContext";
import { getDigimonById } from "@/data";

export default function Home() {
  const { tracker } = useTracker();
  const currentDigimon = tracker.currentDigimonId
    ? getDigimonById(tracker.currentDigimonId)
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="font-pixel text-lg md:text-xl text-text-primary mb-2">
          SELECT YOUR DIGIMON
        </h2>
        <p className="font-retro text-base text-text-secondary max-w-2xl mx-auto mb-6">
          Choose your current Digimon to track evolution progress
        </p>

        {/* Digivice */}
        {currentDigimon ? (
          <Link href={`/${currentDigimon.id}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block cursor-pointer"
            >
              <DigiviceCard digimon={currentDigimon} />
              <p className="font-pixel text-sm text-accent-green mt-2">
                {currentDigimon.name}
              </p>
            </motion.div>
          </Link>
        ) : (
          <DigiviceCard digimon={null} emptyText="SELECT BELOW" />
        )}
      </motion.div>

      {/* Digimon Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <DigimonGrid />
      </motion.div>
    </div>
  );
}
