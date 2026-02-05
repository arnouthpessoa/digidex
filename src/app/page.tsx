"use client";

import { motion } from "framer-motion";
import { DigimonGrid } from "@/components/DigimonGrid";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="font-pixel text-lg md:text-xl text-text-primary mb-4">
          SELECT YOUR DIGIMON
        </h2>
        <p className="font-retro text-xl text-text-secondary max-w-2xl mx-auto">
          Choose your current Digimon to see available evolutions and track your progress
        </p>
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
