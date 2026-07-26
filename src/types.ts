export const masteryLevels = [
  "not_started",
  "learning",
  "practiced",
  "can_explain",
  "interview_ready"
] as const;

export type MasteryLevel = (typeof masteryLevels)[number];

export const evidenceTypes = ["solve", "explain", "implement", "debug", "design", "mock"] as const;

export type EvidenceType = (typeof evidenceTypes)[number];

export const activityTypes = ["learn", "practice", "implement", "revise", "mock"] as const;

export type ActivityType = (typeof activityTypes)[number];

export type ContentCoverage = "verified" | "partial" | "resource_gap" | "practice_gap" | "gated";

export const checkpointLevels = ["understand", "apply", "debug", "interview"] as const;

export type CheckpointLevel = (typeof checkpointLevels)[number];

export interface MasteryCheckpoint {
  level: CheckpointLevel;
  prompt: string;
  evidence: EvidenceType[];
}

export interface Domain {
  id: string;
  name: string;
  shortName: string;
  description: string;
  guidingQuestion: string;
  color: string;
  path: string[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  sourceGroup: string;
  role: "preferred" | "supplementary" | "reference_only" | "added_recommendation";
  access: "open" | "mixed" | "gated" | "unverified";
  modes: Array<
    | "explanation"
    | "reference"
    | "practice"
    | "implementation"
    | "project"
    | "interview_prep"
    | "tooling"
  >;
  depth: "introductory" | "intermediate" | "advanced" | "mixed";
  effort: string;
  assumptions: string;
  auditNote: string;
  selectionRationale: string;
  auditedOn: string;
  addedRecommendation?: boolean;
  gapFilled?: string;
}

export const resourceUnitKinds = [
  "chapter",
  "lesson",
  "module",
  "problem_set",
  "assignment",
  "notebook",
  "project",
  "video",
  "video_chapter",
  "reference"
] as const;

export type ResourceUnitKind = (typeof resourceUnitKinds)[number];

export const resourceUnitRoles = [
  "primary",
  "supplementary",
  "practice",
  "build",
  "revision",
  "advanced"
] as const;

export type ResourceUnitRole = (typeof resourceUnitRoles)[number];

export const auditConfidenceLevels = [
  "content_verified",
  "outline_verified",
  "metadata_only",
  "gated"
] as const;

export type AuditConfidence = (typeof auditConfidenceLevels)[number];

export interface ResourceUnit {
  id: string;
  resourceId: string;
  title: string;
  url: string;
  kind: ResourceUnitKind;
  role: ResourceUnitRole;
  conceptIds: string[];
  topics: string[];
  outcome: string;
  prerequisites: string;
  effort: string;
  order: number;
  auditConfidence: AuditConfidence;
  auditNote: string;
  auditedOn: string;
  startSeconds?: number;
  endSeconds?: number;
}

export interface Concept {
  id: string;
  name: string;
  scope: string;
  domainIds: string[];
  parentIds: string[];
  prerequisiteIds: string[];
  weight: 1 | 2 | 3;
  outcome: string;
  evidence: EvidenceType[];
  tags: string[];
  resourceIds: string[];
  practiceResourceIds: string[];
  checkpoints: MasteryCheckpoint[];
  contentCoverage: ContentCoverage;
}

export interface ConceptProgress {
  conceptId: string;
  mastery: MasteryLevel;
  evidence: EvidenceType[];
  confidence: 1 | 2 | 3 | 4 | 5;
  lastStudiedAt?: string;
  lastRevisedAt?: string;
  nextAction?: string;
  note?: string;
}

export interface StudySession {
  id: string;
  date: string;
  domainId: string;
  conceptIds: string[];
  activityType: ActivityType;
  minutes: number;
  reflection: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  nextAction: string;
}

export interface DomainGoal {
  domainId: string;
  minutes: number;
}

export interface UserSettings {
  activeDomainIds: string[];
  dailyGoals: DomainGoal[];
  revisionIntervalDays: number;
}

export interface UserData {
  schemaVersion: 1;
  exportedAt?: string;
  conceptProgress: Record<string, ConceptProgress>;
  sessions: StudySession[];
  settings: UserSettings;
}
