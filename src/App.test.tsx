import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { createDefaultUserData, STORAGE_KEY } from "./lib/storage";
import { UserDataProvider } from "./state/UserDataContext";

const renderRoute = (hash: string) => {
  window.location.hash = hash;
  return render(
    <UserDataProvider>
      <App />
    </UserDataProvider>
  );
};

describe("critical application views", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("scrollTo", vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it.each([
    ["#/home", "Good to see you, Sai."],
    ["#/domains", "Learning map"],
    ["#/domain/dsa", "DSA & Problem Solving"],
    ["#/concept/dsa-complexity", "Complexity and invariants"],
    ["#/tracker", "Daily study log"],
    ["#/revision", "Revision & interview review"],
    ["#/resources", "Resource library"],
    ["#/settings", "Settings & data"]
  ])("renders %s", async (hash, heading) => {
    renderRoute(hash);
    expect(await screen.findByRole("heading", { name: heading, level: 1 })).toBeInTheDocument();
  });

  it("requires a separate confirmation before applying a selected mastery level", async () => {
    renderRoute("#/concept/dsa-complexity");
    const masterySelect = await screen.findByLabelText("Demonstrated level");
    const confirmButton = screen.getByRole("button", { name: "Confirm mastery" });

    expect(confirmButton).toBeDisabled();
    fireEvent.change(masterySelect, { target: { value: "practiced" } });
    expect(confirmButton).toBeEnabled();

    fireEvent.click(confirmButton);
    await waitFor(() => expect(confirmButton).toBeDisabled());
  });

  it("shows a session-based suggestion without applying it as mastery", async () => {
    const data = createDefaultUserData();
    data.conceptProgress["dsa-complexity"] = {
      conceptId: "dsa-complexity",
      mastery: "learning",
      evidence: ["solve"],
      confidence: 4,
      lastStudiedAt: "2026-07-26T10:00:00.000Z"
    };
    data.sessions = [
      {
        id: "session-practice",
        date: "2026-07-26T10:00:00.000Z",
        domainId: "dsa",
        conceptIds: ["dsa-complexity"],
        activityType: "practice",
        minutes: 45,
        reflection: "",
        confidence: 4,
        nextAction: "Complete the Apply checkpoint."
      }
    ];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    renderRoute("#/concept/dsa-complexity");

    expect(await screen.findByText(/This suggestion has not been applied/)).toHaveTextContent(
      "Practiced"
    );
    expect(screen.getByLabelText("Demonstrated level")).toHaveValue("learning");
  });
});
