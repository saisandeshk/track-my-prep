import { describe, expect, it } from "vitest";
import { createDefaultUserData, exportUserData, parseImportedUserData } from "./storage";

describe("local data interchange", () => {
  it("round-trips a versioned export", () => {
    const original = createDefaultUserData();
    const imported = parseImportedUserData(exportUserData(original));
    expect(imported.schemaVersion).toBe(1);
    expect(imported.settings.activeDomainIds).toEqual(original.settings.activeDomainIds);
  });

  it("rejects unsupported or malformed data", () => {
    expect(() => parseImportedUserData(JSON.stringify({ schemaVersion: 2 }))).toThrow();
    expect(() => parseImportedUserData("not json")).toThrow();
  });
});
