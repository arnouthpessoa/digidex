"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Stage, Digimon } from "@/lib/types";
import { digimon as allDigimon } from "@/data";
import { DigimonCard } from "./DigimonCard";
import { StageFilter } from "./ui/StageFilter";
import { SearchInput } from "./ui/SearchInput";

export function DigimonGrid() {
  const [selectedStage, setSelectedStage] = useState<Stage | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate counts per stage
  const stageCounts = useMemo(() => {
    const counts: Record<Stage | "all", number> = {
      all: allDigimon.length,
      baby: 0,
      rookie: 0,
      champion: 0,
      ultimate: 0,
      special: 0,
    };

    allDigimon.forEach((d) => {
      counts[d.stage]++;
    });

    return counts;
  }, []);

  // Filter digimon
  const filteredDigimon = useMemo(() => {
    let result: Digimon[] = allDigimon;

    // Filter by stage
    if (selectedStage !== "all") {
      result = result.filter((d) => d.stage === selectedStage);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(query));
    }

    return result;
  }, [selectedStage, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <StageFilter
          selected={selectedStage}
          onChange={setSelectedStage}
          counts={stageCounts}
        />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Digimon..."
        />
      </div>

      {/* Results count */}
      <div className="font-retro text-text-secondary">
        Showing {filteredDigimon.length} of {allDigimon.length} Digimon
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredDigimon.map((digimon, index) => (
            <motion.div
              key={digimon.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <DigimonCard digimon={digimon} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredDigimon.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="font-pixel text-sm text-text-secondary mb-2">
            NO DIGIMON FOUND
          </p>
          <p className="font-retro text-text-secondary">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
}
