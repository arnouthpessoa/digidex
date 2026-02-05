
export interface DigimonStats {
  HP: number;
  MP: number;
  OFF: number;
  DEF: number;
  SPE: number;
  BRA: number;
  weight: number;
  discipline: number;
  happiness: number;
  careMistakes: number;
  battles: number;
  techs: number;
}

export const DEFAULT_STATS: DigimonStats = {
  HP: 0,
  MP: 0,
  OFF: 0,
  DEF: 0,
  SPE: 0,
  BRA: 0,
  weight: 10,
  discipline: 0,
  happiness: 0,
  careMistakes: 0,
  battles: 0,
  techs: 0,
};

export interface TrackerData {
  currentDigimonId: string | null;
  stats: DigimonStats;
  manualChecks: Record<string, boolean>; // "agumon_greymon_HP" -> true
}

export const DEFAULT_TRACKER: TrackerData = {
  currentDigimonId: null,
  stats: DEFAULT_STATS,
  manualChecks: {},
};
