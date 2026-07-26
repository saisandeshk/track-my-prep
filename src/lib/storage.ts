import { z } from "zod";
import { activityTypes, evidenceTypes, masteryLevels, type UserData } from "../types";

export const STORAGE_KEY = "track-my-prep:user-data:v1";

const conceptProgressSchema = z.object({
  conceptId: z.string().min(1),
  mastery: z.enum(masteryLevels),
  evidence: z.array(z.enum(evidenceTypes)),
  confidence: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  lastStudiedAt: z.string().datetime().optional(),
  lastRevisedAt: z.string().datetime().optional(),
  nextAction: z.string().max(500).optional(),
  note: z.string().max(2000).optional()
});

const studySessionSchema = z.object({
  id: z.string().min(1),
  date: z.string().datetime(),
  domainId: z.string().min(1),
  conceptIds: z.array(z.string().min(1)).min(1),
  activityType: z.enum(activityTypes),
  minutes: z.number().int().min(1).max(1440),
  reflection: z.string().max(2000),
  confidence: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  nextAction: z.string().max(500)
});

export const userDataSchema = z.object({
  schemaVersion: z.literal(1),
  exportedAt: z.string().datetime().optional(),
  conceptProgress: z.record(z.string(), conceptProgressSchema),
  sessions: z.array(studySessionSchema),
  settings: z.object({
    activeDomainIds: z.array(z.string().min(1)),
    dailyGoals: z.array(
      z.object({
        domainId: z.string().min(1),
        minutes: z.number().int().min(0).max(1440)
      })
    ),
    revisionIntervalDays: z.number().int().min(3).max(90)
  })
});

export const createDefaultUserData = (): UserData => ({
  schemaVersion: 1,
  conceptProgress: {},
  sessions: [],
  settings: {
    activeDomainIds: ["dsa", "core-ml", "llms"],
    dailyGoals: [
      { domainId: "dsa", minutes: 60 },
      { domainId: "core-ml", minutes: 45 },
      { domainId: "llms", minutes: 45 }
    ],
    revisionIntervalDays: 14
  }
});

export const loadUserData = (): UserData => {
  if (typeof window === "undefined") return createDefaultUserData();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createDefaultUserData();
  try {
    return userDataSchema.parse(JSON.parse(raw));
  } catch {
    return createDefaultUserData();
  }
};

export const saveUserData = (data: UserData) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const parseImportedUserData = (raw: string): UserData =>
  userDataSchema.parse(JSON.parse(raw));

export const exportUserData = (data: UserData) =>
  JSON.stringify({ ...data, exportedAt: new Date().toISOString() }, null, 2);
