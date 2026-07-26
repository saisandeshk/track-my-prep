import { describe, expect, it } from "vitest";
import type { Concept, ConceptProgress } from "../types";
import { calculateMetrics, isRevisionDue, revisionIntervalFor } from "./progress";

const concept = (id: string, weight: 1 | 2 | 3): Concept => ({
  id,
  name: id,
  scope: "scope",
  domainIds: ["test"],
  parentIds: [],
  prerequisiteIds: [],
  weight,
  outcome: "outcome",
  evidence: ["explain"],
  tags: [],
  resourceIds: [],
  practiceResourceIds: [],
  checkpoints: [
    { level: "understand", prompt: "one", evidence: ["explain"] },
    { level: "interview", prompt: "two", evidence: ["explain"] }
  ],
  contentCoverage: "verified"
});

const progress = (
  conceptId: string,
  mastery: ConceptProgress["mastery"],
  date = "2026-07-25T00:00:00.000Z"
): ConceptProgress => ({
  conceptId,
  mastery,
  evidence: ["explain"],
  confidence: 3,
  lastStudiedAt: date
});

describe("progress and readiness", () => {
  it("weights foundational concepts more heavily in coverage", () => {
    const result = calculateMetrics(
      [concept("foundation", 3), concept("minor", 1)],
      { foundation: progress("foundation", "learning") },
      14,
      new Date("2026-07-26T00:00:00.000Z")
    );
    expect(result.coverage).toBe(75);
  });

  it("keeps coverage separate from mastery depth", () => {
    const result = calculateMetrics(
      [concept("a", 1), concept("b", 1)],
      {
        a: progress("a", "learning"),
        b: progress("b", "learning")
      },
      14,
      new Date("2026-07-26T00:00:00.000Z")
    );
    expect(result.coverage).toBe(100);
    expect(result.readiness).toBeLessThan(30);
  });

  it("discounts overdue readiness without erasing mastery", () => {
    const freshProgress = progress("a", "interview_ready", "2026-07-25T00:00:00.000Z");
    const staleProgress = progress("a", "interview_ready", "2026-05-01T00:00:00.000Z");
    const now = new Date("2026-07-26T00:00:00.000Z");
    const fresh = calculateMetrics([concept("a", 3)], { a: freshProgress }, 14, now);
    const stale = calculateMetrics([concept("a", 3)], { a: staleProgress }, 14, now);
    expect(stale.readiness).toBeLessThan(fresh.readiness);
    expect(staleProgress.mastery).toBe("interview_ready");
  });

  it("adapts suggested intervals by mastery", () => {
    expect(revisionIntervalFor("learning", 14)).toBeLessThan(
      revisionIntervalFor("can_explain", 14)
    );
    expect(revisionIntervalFor("interview_ready", 14)).toBeGreaterThan(
      revisionIntervalFor("can_explain", 14)
    );
  });

  it("marks a practiced concept due after its interval", () => {
    expect(
      isRevisionDue(
        progress("a", "practiced", "2026-07-01T00:00:00.000Z"),
        14,
        new Date("2026-07-26T00:00:00.000Z")
      )
    ).toBe(true);
  });
});
