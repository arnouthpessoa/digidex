export type Stage = "baby" | "rookie" | "champion" | "ultimate" | "special";
export type DigimonType = "vaccine" | "data" | "virus";
export type Stat = "HP" | "MP" | "OFF" | "DEF" | "SPE" | "BRA";
export type BonusType = "discipline" | "happiness" | "battles" | "techs" | "highestStat";

export interface Digimon {
  id: string;
  name: string;
  stage: Stage;
  type: DigimonType;
  sprite: string;
}

export interface StatRequirement {
  stat: Stat;
  min: number;
}

export interface WeightRequirement {
  min: number;
  max: number;
}

export interface CareMistakesRequirement {
  operator: "<" | ">" | "=";
  value: number;
}

export interface BonusRequirement {
  type: BonusType;
  min?: number;
  max?: number;
  options?: Stat[]; // For highestStat type (Baby evolutions)
}

export interface EvolutionRequirements {
  stats: StatRequirement[];
  weight: WeightRequirement;
  careMistakes: CareMistakesRequirement | null;
  bonus: BonusRequirement[];
}

export interface Evolution {
  from: string;
  to: string;
  requirements: EvolutionRequirements;
}

export interface RequirementProgress {
  evolutionKey: string;
  stats: Record<Stat, boolean>;
  weight: boolean;
  careMistakes: boolean;
  bonus: Record<string, boolean>;
}

export interface DigiDexStorage {
  progress: Record<string, RequirementProgress>;
  settings: {
    crtEnabled: boolean;
  };
}
