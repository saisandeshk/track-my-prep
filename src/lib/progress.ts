import { concepts } from "../data/concepts";
import type {
  ActivityType,
  Concept,
  ConceptProgress,
  EvidenceType,
  MasteryLevel,
  StudySession,
  UserData
} from "../types";

export const masteryOrder: MasteryLevel[] = [
  "not_started",
  "learning",
  "practiced",
  "can_explain",
  "interview_ready"
];

export const masteryLabels: Record<MasteryLevel, string> = {
  not_started: "Not started",
  learning: "Learning",
  practiced: "Practiced",
  can_explain: "Can explain",
  interview_ready: "Interview ready"
};

const evidenceForActivity: Partial<Record<ActivityType, EvidenceType>> = {
  practice: "solve",
  implement: "implement",
  revise: "explain",
  mock: "mock"
};

export const suggestedMasteryForSession = (
  currentMastery: MasteryLevel,
  activityType: ActivityType
): MasteryLevel => {
  if (masteryOrder.indexOf(currentMastery) >= masteryOrder.indexOf("practiced")) {
    return currentMastery;
  }
  if (activityType === "learn" || activityType === "revise") return "learning";
  return "practiced";
};

export const applySessionToUserData = (current: UserData, session: StudySession): UserData => {
  const progress = { ...current.conceptProgress };

  for (const conceptId of session.conceptIds) {
    const existing = progress[conceptId] ?? {
      conceptId,
      mastery: "not_started" as const,
      evidence: [],
      confidence: 3 as const
    };
    const evidence = evidenceForActivity[session.activityType];
    const nextEvidence = evidence
      ? Array.from(new Set([...existing.evidence, evidence]))
      : existing.evidence;

    progress[conceptId] = {
      ...existing,
      conceptId,
      mastery: existing.mastery === "not_started" ? "learning" : existing.mastery,
      evidence: nextEvidence,
      confidence: session.confidence,
      lastStudiedAt: session.date,
      lastRevisedAt: session.activityType === "revise" ? session.date : existing.lastRevisedAt,
      nextAction: session.nextAction
    };
  }

  return {
    ...current,
    sessions: [session, ...current.sessions],
    conceptProgress: progress
  };
};

const masteryDepth: Record<MasteryLevel, number> = {
  not_started: 0,
  learning: 0.15,
  practiced: 0.45,
  can_explain: 0.72,
  interview_ready: 1
};

const DAY_MS = 86_400_000;

export const daysBetween = (later: Date, earlier: Date) =>
  Math.max(0, Math.floor((later.getTime() - earlier.getTime()) / DAY_MS));

export const revisionIntervalFor = (mastery: MasteryLevel, baseIntervalDays: number) => {
  if (mastery === "learning") return Math.max(2, Math.round(baseIntervalDays * 0.3));
  if (mastery === "practiced") return Math.max(4, Math.round(baseIntervalDays * 0.65));
  if (mastery === "can_explain") return baseIntervalDays;
  if (mastery === "interview_ready") return Math.round(baseIntervalDays * 1.5);
  return baseIntervalDays;
};

export const isRevisionDue = (
  progress: ConceptProgress | undefined,
  baseIntervalDays: number,
  now = new Date()
) => {
  if (!progress || progress.mastery === "not_started") return false;
  const lastTouch = progress.lastRevisedAt ?? progress.lastStudiedAt;
  if (!lastTouch) return progress.mastery !== "learning";
  const elapsed = daysBetween(now, new Date(lastTouch));
  return elapsed >= revisionIntervalFor(progress.mastery, baseIntervalDays);
};

export const nextRevisionDate = (progress: ConceptProgress, baseIntervalDays: number) => {
  const lastTouch = progress.lastRevisedAt ?? progress.lastStudiedAt;
  if (!lastTouch) return undefined;
  const date = new Date(lastTouch);
  date.setDate(date.getDate() + revisionIntervalFor(progress.mastery, baseIntervalDays));
  return date;
};

const roundedFive = (value: number) => Math.round(value / 5) * 5;

export const metricBand = (value: number) => {
  if (value === 0) return "No evidence yet";
  if (value < 30) return "Early";
  if (value < 55) return "Developing";
  if (value < 75) return "Working";
  if (value < 90) return "Strong";
  return "Ready";
};

export interface DomainMetrics {
  coverage: number;
  readiness: number;
  coverageBand: string;
  readinessBand: string;
  startedWeight: number;
  totalWeight: number;
}

export const calculateMetrics = (
  domainConcepts: Concept[],
  progressById: Record<string, ConceptProgress>,
  baseIntervalDays: number,
  now = new Date()
): DomainMetrics => {
  const totalWeight = domainConcepts.reduce((sum, item) => sum + item.weight, 0);
  if (!totalWeight) {
    return {
      coverage: 0,
      readiness: 0,
      coverageBand: "No evidence yet",
      readinessBand: "No evidence yet",
      startedWeight: 0,
      totalWeight: 0
    };
  }

  let startedWeight = 0;
  let readinessWeighted = 0;

  for (const item of domainConcepts) {
    const progress = progressById[item.id];
    if (progress && progress.mastery !== "not_started") {
      startedWeight += item.weight;
    }

    if (!progress) continue;
    const evidenceFactor =
      progress.evidence.length === 0 ? 0.7 : Math.min(1, 0.76 + progress.evidence.length * 0.08);
    let revisionFactor = 1;
    if (isRevisionDue(progress, baseIntervalDays, now)) {
      const lastTouch = progress.lastRevisedAt ?? progress.lastStudiedAt;
      const elapsed = lastTouch ? daysBetween(now, new Date(lastTouch)) : baseIntervalDays * 2;
      const interval = revisionIntervalFor(progress.mastery, baseIntervalDays);
      revisionFactor = elapsed >= interval * 2 ? 0.5 : 0.72;
    }
    readinessWeighted +=
      item.weight * masteryDepth[progress.mastery] * evidenceFactor * revisionFactor;
  }

  const coverage = roundedFive((startedWeight / totalWeight) * 100);
  const readiness = roundedFive((readinessWeighted / totalWeight) * 100);
  return {
    coverage,
    readiness,
    coverageBand: metricBand(coverage),
    readinessBand: metricBand(readiness),
    startedWeight,
    totalWeight
  };
};

export const getDomainConcepts = (path: string[]) => {
  const byId = new Map(concepts.map((item) => [item.id, item]));
  return path.flatMap((id) => {
    const item = byId.get(id);
    return item ? [item] : [];
  });
};

export const getNextRecommended = (path: string[], data: UserData): Concept | undefined => {
  const byId = new Map(concepts.map((item) => [item.id, item]));
  for (const id of path) {
    const item = byId.get(id);
    if (!item) continue;
    const progress = data.conceptProgress[id];
    const readyToStart = item.prerequisiteIds.every((prerequisiteId) => {
      const prerequisite = data.conceptProgress[prerequisiteId];
      return (
        prerequisite &&
        masteryOrder.indexOf(prerequisite.mastery) >= masteryOrder.indexOf("practiced")
      );
    });
    if ((!progress || progress.mastery === "not_started") && readyToStart) return item;
    if (progress?.mastery === "learning") return item;
  }
  return undefined;
};

export const todayMinutesByDomain = (sessions: StudySession[], date = new Date()) => {
  const today = date.toISOString().slice(0, 10);
  return sessions
    .filter((session) => session.date.slice(0, 10) === today)
    .reduce<Record<string, number>>((totals, session) => {
      totals[session.domainId] = (totals[session.domainId] ?? 0) + session.minutes;
      return totals;
    }, {});
};
