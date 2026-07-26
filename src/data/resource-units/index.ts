import { aiResourceUnits } from "./ai";
import { dsaEngineeringResourceUnits } from "./dsaEngineering";
import { supplementaryResourceUnits } from "./supplementary";
import { systemsResourceUnits } from "./systems";
import { videoResourceUnits } from "./videos";

export const resourceUnits = [
  ...dsaEngineeringResourceUnits,
  ...systemsResourceUnits,
  ...aiResourceUnits,
  ...supplementaryResourceUnits,
  ...videoResourceUnits
];

export const resourceUnitsByConceptId = new Map<string, typeof resourceUnits>();

const roleOrder = {
  primary: 0,
  supplementary: 1,
  revision: 2,
  practice: 3,
  build: 3,
  advanced: 4
};

for (const unit of resourceUnits) {
  for (const conceptId of unit.conceptIds) {
    const existing = resourceUnitsByConceptId.get(conceptId) ?? [];
    existing.push(unit);
    resourceUnitsByConceptId.set(conceptId, existing);
  }
}

for (const units of resourceUnitsByConceptId.values()) {
  units.sort(
    (a, b) =>
      roleOrder[a.role] - roleOrder[b.role] || a.order - b.order || a.title.localeCompare(b.title)
  );
}

export const resourceUnitsByResourceId = new Map<string, typeof resourceUnits>();

for (const unit of resourceUnits) {
  const existing = resourceUnitsByResourceId.get(unit.resourceId) ?? [];
  existing.push(unit);
  resourceUnitsByResourceId.set(unit.resourceId, existing);
}
