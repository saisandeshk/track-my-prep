import { Download, RotateCcw, Shield, Upload } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { domains, domainsById } from "../data/domains";
import { exportUserData, parseImportedUserData } from "../lib/storage";
import { useUserData } from "../state/UserDataContext";

export const Settings = () => {
  const { data, setData, updateSettings, reset } = useUserData();
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleDomain = (domainId: string) => {
    const active = data.settings.activeDomainIds.includes(domainId);
    const activeDomainIds = active
      ? data.settings.activeDomainIds.filter((id) => id !== domainId)
      : [...data.settings.activeDomainIds, domainId];
    const dailyGoals = active
      ? data.settings.dailyGoals.filter((goal) => goal.domainId !== domainId)
      : [...data.settings.dailyGoals, { domainId, minutes: 45 }];
    updateSettings({ ...data.settings, activeDomainIds, dailyGoals });
  };

  const updateGoal = (domainId: string, minutes: number) => {
    updateSettings({
      ...data.settings,
      dailyGoals: data.settings.dailyGoals.map((goal) =>
        goal.domainId === domainId ? { ...goal, minutes } : goal
      )
    });
  };

  const download = () => {
    const blob = new Blob([exportUserData(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `track-my-prep-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Export created. Keep it somewhere private.");
  };

  const importFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = parseImportedUserData(await file.text());
      setData(imported);
      setMessage("Import complete. Your local progress has been replaced by the file.");
    } catch {
      setMessage("Import failed: the file is not valid Track My Prep v1 data.");
    } finally {
      event.target.value = "";
    }
  };

  const resetData = () => {
    if (
      window.confirm(
        "Reset all local study sessions, mastery and settings on this device? Export first if you may need them. This cannot be undone."
      )
    ) {
      reset();
      setMessage("Local progress reset. Canonical curriculum content was not changed.");
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow">Your local workspace</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Settings & data
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55 sm:text-base">
          Choose focus domains and flexible daily effort. Personal progress is stored only in this
          browser unless you export it.
        </p>
      </header>

      {message ? (
        <div role="status" className="rounded-xl bg-moss-100 px-4 py-3 text-sm text-moss-800">
          {message}
        </div>
      ) : null}

      <section className="surface p-5 sm:p-7">
        <p className="eyebrow">Focus</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Active domains and pace</h2>
        <p className="mt-2 text-sm leading-6 text-black/50">
          This changes the dashboard, not the canonical learning map. Every domain remains available
          and equally complete.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {domains.map((domain) => {
            const active = data.settings.activeDomainIds.includes(domain.id);
            const goal = data.settings.dailyGoals.find((item) => item.domainId === domain.id);
            return (
              <div
                key={domain.id}
                className={`rounded-xl border p-4 ${
                  active ? "border-moss-300 bg-moss-50/60" : "border-black/[0.07] bg-white"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleDomain(domain.id)}
                    className="mt-1 h-4 w-4 accent-moss-600"
                  />
                  <span>
                    <span className="block text-sm font-semibold">{domain.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-black/45">
                      {domain.guidingQuestion}
                    </span>
                  </span>
                </label>
                {active && goal ? (
                  <label className="mt-4 flex items-center justify-between gap-4 border-t border-black/[0.06] pt-3 text-xs font-medium text-black/55">
                    Daily guide
                    <span className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={1440}
                        value={goal.minutes}
                        onChange={(event) => updateGoal(domain.id, Number(event.target.value))}
                        className="input w-20 py-1.5 text-right"
                      />
                      min
                    </span>
                  </label>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="surface p-5 sm:p-7">
        <p className="eyebrow">Revision</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Review interval</h2>
        <p className="mt-2 text-sm leading-6 text-black/50">
          This base interval adapts by mastery: learning is suggested sooner; interview-ready
          evidence lasts longer.
        </p>
        <label className="mt-5 block max-w-xs text-sm font-semibold">
          Base interval in days
          <input
            type="number"
            min={3}
            max={90}
            value={data.settings.revisionIntervalDays}
            onChange={(event) =>
              updateSettings({
                ...data.settings,
                revisionIntervalDays: Number(event.target.value)
              })
            }
            className="input mt-2"
          />
        </label>
      </section>

      <section className="surface p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Shield size={19} className="text-moss-600" />
          <h2 className="font-display text-2xl font-semibold">Local data</h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">
          No login, backend, API key or cloud database is used. Clearing this browser’s site data
          removes your progress. Export files use a validated, versioned JSON schema.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={download} className="button-secondary">
            <Download size={16} /> Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="button-secondary"
          >
            <Upload size={16} /> Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            onChange={importFile}
            className="sr-only"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50/60 p-5 sm:p-7">
        <p className="eyebrow text-red-700">Destructive action</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Reset local progress</h2>
        <p className="mt-2 text-sm leading-6 text-black/55">
          Removes sessions, mastery and settings from this device. It does not change the public
          curriculum.
        </p>
        <button
          type="button"
          onClick={resetData}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800"
        >
          <RotateCcw size={16} /> Reset local data
        </button>
      </section>
    </div>
  );
};
