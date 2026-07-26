import type { MasteryCheckpoint } from "../../types";
import { aiMastery } from "./ai";
import { dsaEngineeringMastery } from "./dsaEngineering";
import { systemsMastery } from "./systems";

export interface MasteryDefinition {
  outcome: string;
  checkpoints: MasteryCheckpoint[];
}

const combined: Record<string, MasteryDefinition> = {
  ...dsaEngineeringMastery,
  ...systemsMastery,
  ...aiMastery
};

export const masteryByConceptId = new Map(Object.entries(combined));
