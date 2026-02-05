import type { Stage, Stat, BonusType } from "./types";

export const STAGE_NAMES: Record<Stage, string> = {
  baby: "Baby",
  rookie: "Rookie",
  champion: "Champion",
  ultimate: "Ultimate",
  special: "Special",
};

export const STAGE_COLORS: Record<Stage, string> = {
  baby: "text-stage-baby",
  rookie: "text-stage-rookie",
  champion: "text-stage-champion",
  ultimate: "text-stage-ultimate",
  special: "text-stage-special",
};

export const STAGE_BG_COLORS: Record<Stage, string> = {
  baby: "bg-stage-baby",
  rookie: "bg-stage-rookie",
  champion: "bg-stage-champion",
  ultimate: "bg-stage-ultimate",
  special: "bg-stage-special",
};

export const STAT_NAMES: Record<Stat, string> = {
  HP: "HP",
  MP: "MP",
  OFF: "Offense",
  DEF: "Defense",
  SPE: "Speed",
  BRA: "Brains",
};

export const BONUS_NAMES: Record<BonusType, string> = {
  discipline: "Discipline",
  happiness: "Happiness",
  battles: "Battles",
  techs: "Techniques",
  highestStat: "Highest Stat",
};

export const STORAGE_KEY = "digidex_data";
