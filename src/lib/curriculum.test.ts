import { describe, expect, it } from "vitest";
import { concepts } from "../data/concepts";
import { domains } from "../data/domains";
import { resources } from "../data/resources";
import {
  resourceUnits,
  resourceUnitsByConceptId,
  resourceUnitsByResourceId
} from "../data/resource-units";
import { validateCurriculum } from "./curriculum";

describe("canonical curriculum", () => {
  it("has valid IDs, links, paths and an acyclic prerequisite graph", () => {
    expect(validateCurriculum(concepts, domains, resources, resourceUnits)).toEqual([]);
  });

  it("covers every required domain with meaningful path depth", () => {
    expect(domains).toHaveLength(13);
    for (const domain of domains) {
      expect(domain.path.length, domain.name).toBeGreaterThanOrEqual(7);
    }
  });

  it("gives every concept outcomes, checkpoints and learning resources", () => {
    for (const item of concepts) {
      expect(item.outcome.length, item.id).toBeGreaterThan(100);
      expect(item.outcome, item.id).not.toMatch(/\bSai\b/i);
      expect(item.checkpoints.length, item.id).toBeGreaterThanOrEqual(4);
      expect(new Set(item.checkpoints.map((checkpoint) => checkpoint.level)).size, item.id).toBe(4);
      expect(
        item.checkpoints.every(
          (checkpoint) => checkpoint.prompt.length > 20 && checkpoint.evidence.length > 0
        ),
        item.id
      ).toBe(true);
      expect(item.resourceIds.length, item.id).toBeGreaterThanOrEqual(1);
      expect(item.domainIds.length, item.id).toBeGreaterThanOrEqual(1);
      expect(resourceUnitsByConceptId.has(item.id), item.id).toBe(true);
    }
  });

  it("gives every catalogued resource at least one honest unit-level mapping", () => {
    for (const resource of resources) {
      expect(resourceUnitsByResourceId.get(resource.id)?.length, resource.id).toBeGreaterThan(0);
    }
  });

  it("models shared knowledge instead of duplicating it", () => {
    expect(concepts.filter((item) => item.domainIds.length > 1).length).toBeGreaterThanOrEqual(20);
  });
});
