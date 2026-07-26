import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
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
});
