import type { Concept, Domain, Resource, ResourceUnit } from "../types";

export interface CurriculumIssue {
  code:
    | "duplicate_concept"
    | "duplicate_domain"
    | "duplicate_resource"
    | "missing_prerequisite"
    | "missing_parent"
    | "missing_path_concept"
    | "path_domain_mismatch"
    | "missing_resource"
    | "duplicate_resource_unit"
    | "missing_unit_resource"
    | "missing_unit_concept"
    | "invalid_unit_url"
    | "invalid_unit_timestamp"
    | "cycle";
  message: string;
}

export const validateCurriculum = (
  concepts: Concept[],
  domains: Domain[],
  resources: Resource[],
  resourceUnits: ResourceUnit[] = []
): CurriculumIssue[] => {
  const issues: CurriculumIssue[] = [];
  const conceptIds = new Set<string>();
  const domainIds = new Set<string>();
  const resourceIds = new Set<string>();
  const resourceUnitIds = new Set<string>();

  for (const item of concepts) {
    if (conceptIds.has(item.id)) {
      issues.push({
        code: "duplicate_concept",
        message: `Duplicate concept ID: ${item.id}`
      });
    }
    conceptIds.add(item.id);
  }
  for (const domain of domains) {
    if (domainIds.has(domain.id)) {
      issues.push({
        code: "duplicate_domain",
        message: `Duplicate domain ID: ${domain.id}`
      });
    }
    domainIds.add(domain.id);
  }
  for (const resource of resources) {
    if (resourceIds.has(resource.id)) {
      issues.push({
        code: "duplicate_resource",
        message: `Duplicate resource ID: ${resource.id}`
      });
    }
    resourceIds.add(resource.id);
  }
  for (const unit of resourceUnits) {
    if (resourceUnitIds.has(unit.id)) {
      issues.push({
        code: "duplicate_resource_unit",
        message: `Duplicate resource unit ID: ${unit.id}`
      });
    }
    resourceUnitIds.add(unit.id);
    if (!resourceIds.has(unit.resourceId)) {
      issues.push({
        code: "missing_unit_resource",
        message: `${unit.id} references missing resource ${unit.resourceId}`
      });
    }
    for (const conceptId of unit.conceptIds) {
      if (!conceptIds.has(conceptId)) {
        issues.push({
          code: "missing_unit_concept",
          message: `${unit.id} references missing concept ${conceptId}`
        });
      }
    }
    try {
      const url = new URL(unit.url);
      if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("bad protocol");
    } catch {
      issues.push({
        code: "invalid_unit_url",
        message: `${unit.id} has an invalid URL`
      });
    }
    if (
      unit.startSeconds !== undefined &&
      (unit.startSeconds < 0 ||
        (unit.endSeconds !== undefined && unit.endSeconds <= unit.startSeconds))
    ) {
      issues.push({
        code: "invalid_unit_timestamp",
        message: `${unit.id} has an invalid timestamp range`
      });
    }
  }

  for (const item of concepts) {
    for (const prerequisiteId of item.prerequisiteIds) {
      if (!conceptIds.has(prerequisiteId)) {
        issues.push({
          code: "missing_prerequisite",
          message: `${item.id} references missing prerequisite ${prerequisiteId}`
        });
      }
    }
    for (const parentId of item.parentIds) {
      if (!conceptIds.has(parentId)) {
        issues.push({
          code: "missing_parent",
          message: `${item.id} references missing parent ${parentId}`
        });
      }
    }
    for (const resourceId of [...item.resourceIds, ...item.practiceResourceIds]) {
      if (!resourceIds.has(resourceId)) {
        issues.push({
          code: "missing_resource",
          message: `${item.id} references missing resource ${resourceId}`
        });
      }
    }
  }

  const byConceptId = new Map(concepts.map((item) => [item.id, item]));
  for (const domain of domains) {
    for (const conceptId of domain.path) {
      const item = byConceptId.get(conceptId);
      if (!item) {
        issues.push({
          code: "missing_path_concept",
          message: `${domain.id} path references missing concept ${conceptId}`
        });
      } else if (!item.domainIds.includes(domain.id)) {
        issues.push({
          code: "path_domain_mismatch",
          message: `${conceptId} is in ${domain.id}'s path but does not link back to that domain`
        });
      }
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (id: string) => {
    if (visiting.has(id)) {
      issues.push({
        code: "cycle",
        message: `Prerequisite cycle reaches ${id}`
      });
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    const item = byConceptId.get(id);
    item?.prerequisiteIds.forEach(visit);
    visiting.delete(id);
    visited.add(id);
  };
  concepts.forEach((item) => visit(item.id));

  return issues;
};
