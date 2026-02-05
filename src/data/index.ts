import type { Digimon, Evolution, Stage } from "@/lib/types";
import digimonData from "./digimon.json";
import evolutionsData from "./evolutions.json";

export const digimon: Digimon[] = digimonData.digimon as Digimon[];
export const evolutions: Evolution[] = evolutionsData.evolutions as Evolution[];

// Helper functions
export function getDigimonById(id: string): Digimon | undefined {
  return digimon.find((d) => d.id === id);
}

export function getDigimonByStage(stage: Stage): Digimon[] {
  return digimon.filter((d) => d.stage === stage);
}

export function getEvolutionsFrom(digimonId: string): Evolution[] {
  return evolutions.filter((e) => e.from === digimonId);
}

export function getEvolutionsTo(digimonId: string): Evolution[] {
  return evolutions.filter((e) => e.to === digimonId);
}

export function getEvolution(fromId: string, toId: string): Evolution | undefined {
  return evolutions.find((e) => e.from === fromId && e.to === toId);
}

// Get all possible evolutions for a Digimon (including pre-evolutions)
export function getDigimonEvolutionTree(digimonId: string): {
  from: Evolution[];
  to: Evolution[];
} {
  return {
    from: getEvolutionsTo(digimonId),
    to: getEvolutionsFrom(digimonId),
  };
}

// Stats
export const TOTAL_DIGIMON = digimon.length;
export const TOTAL_EVOLUTIONS = evolutions.length;
