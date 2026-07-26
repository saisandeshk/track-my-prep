import { Check, Clock3, Plus } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { conceptsById } from "../data/concepts";
import { domains, domainsById } from "../data/domains";
import { todayMinutesByDomain } from "../lib/progress";
import { useUserData } from "../state/UserDataContext";
import type { ActivityType } from "../types";
import { EmptyState, ProgressBar } from "../components/ui";

const nowForInput = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
};

export const Tracker = () => {
  const { data, addSession } = useUserData();
  const initialDomain = data.settings.activeDomainIds[0] ?? domains[0].id;
  const [domainId, setDomainId] = useState(initialDomain);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [activityType, setActivityType] = useState<ActivityType>("learn");
  const [minutes, setMinutes] = useState(45);
  const [date, setDate] = useState(nowForInput());
  const [reflection, setReflection] = useState("");
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [nextAction, setNextAction] = useState("");
  const [saved, setSaved] = useState(false);

  const domain = domainsById.get(domainId) ?? domains[0];
  const domainConcepts = useMemo(
    () => domain.path.flatMap((id) => (conceptsById.get(id) ? [conceptsById.get(id)!] : [])),
    [domain]
  );
  const minutesByDomain = todayMinutesByDomain(data.sessions);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedConcepts.length || minutes < 1) return;
    addSession({
      id: `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date(date).toISOString(),
      domainId,
      conceptIds: selectedConcepts,
      activityType,
      minutes,
      reflection: reflection.trim(),
      confidence,
      nextAction: nextAction.trim()
    });
    setSaved(true);
    setSelectedConcepts([]);
    setReflection("");
    setNextAction("");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Actual work</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Daily study log
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55 sm:text-base">
            Capture what happened, what it proved and what comes next. Time is context—not mastery.
          </p>
        </div>
        {saved ? (
          <div className="inline-flex items-center gap-2 rounded-xl bg-moss-100 px-4 py-2.5 text-sm font-semibold text-moss-800">
            <Check size={17} /> Session saved locally
          </div>
        ) : null}
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <form className="surface space-y-6 p-5 sm:p-7" onSubmit={submit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Domain
              <select
                className="input mt-2"
                value={domainId}
                onChange={(event) => {
                  setDomainId(event.target.value);
                  setSelectedConcepts([]);
                }}
              >
                {domains.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Date and time
              <input
                type="datetime-local"
                className="input mt-2"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold">Activity type</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {(["learn", "practice", "implement", "revise", "mock"] as const).map((activity) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => setActivityType(activity)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium capitalize ${
                    activityType === activity
                      ? "border-moss-400 bg-moss-50 text-moss-800"
                      : "border-black/10 bg-white text-black/55 hover:border-moss-300"
                  }`}
                  aria-pressed={activityType === activity}
                >
                  {activity}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold">
              Concepts <span className="font-normal text-black/40">· select one or more</span>
            </legend>
            <div className="scrollbar-subtle mt-2 max-h-72 space-y-1 overflow-y-auto rounded-xl border border-black/10 bg-white p-2">
              {domainConcepts.map((item) => {
                const active = selectedConcepts.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      active ? "bg-moss-50 text-moss-800" : "hover:bg-black/[0.025]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-moss-600"
                      checked={active}
                      onChange={() =>
                        setSelectedConcepts((current) =>
                          active ? current.filter((id) => id !== item.id) : [...current, item.id]
                        )
                      }
                    />
                    <span>{item.name}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Minutes
              <input
                type="number"
                className="input mt-2"
                min={1}
                max={1440}
                value={minutes}
                onChange={(event) => setMinutes(Number(event.target.value))}
                required
              />
            </label>
            <label className="text-sm font-semibold">
              Confidence after session · {confidence}/5
              <input
                type="range"
                min={1}
                max={5}
                value={confidence}
                onChange={(event) => setConfidence(Number(event.target.value) as 1 | 2 | 3 | 4 | 5)}
                className="mt-4 w-full accent-moss-600"
              />
            </label>
          </div>

          <label className="block text-sm font-semibold">
            Short reflection
            <textarea
              className="input mt-2 min-h-24 resize-y"
              value={reflection}
              maxLength={2000}
              onChange={(event) => setReflection(event.target.value)}
              placeholder="What became clearer? Where did you get stuck? What evidence did you produce?"
            />
          </label>

          <label className="block text-sm font-semibold">
            Next action
            <input
              className="input mt-2"
              value={nextAction}
              maxLength={500}
              onChange={(event) => setNextAction(event.target.value)}
              placeholder="Example: re-solve without hints in two days"
            />
          </label>

          <button
            type="submit"
            className="button-primary w-full sm:w-auto"
            disabled={!selectedConcepts.length || minutes < 1}
          >
            <Plus size={17} /> Save session
          </button>
        </form>

        <aside className="space-y-4">
          <div className="surface p-5">
            <div className="flex items-center gap-2">
              <Clock3 size={18} className="text-moss-600" />
              <h2 className="font-display text-xl font-semibold">Today’s pace</h2>
            </div>
            <div className="mt-5 space-y-4">
              {data.settings.dailyGoals.map((goal) => {
                const goalDomain = domainsById.get(goal.domainId);
                if (!goalDomain) return null;
                const actual = minutesByDomain[goal.domainId] ?? 0;
                return (
                  <div key={goal.domainId}>
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="font-medium">{goalDomain.shortName}</span>
                      <span className="text-black/45">
                        {actual}/{goal.minutes} min
                      </span>
                    </div>
                    <ProgressBar
                      value={goal.minutes ? (actual / goal.minutes) * 100 : 0}
                      color={goalDomain.color}
                      label={`${goalDomain.name} goal`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="surface-muted p-5 text-sm leading-6 text-black/55">
            <strong className="text-ink">Logging behavior:</strong> learning starts an untouched
            concept; practice, implementation and mocks also attach matching evidence. Revision
            updates its review clock. You can refine mastery on the concept page.
          </div>
        </aside>
      </section>

      <section>
        <div className="mb-4">
          <p className="eyebrow">Previous sessions</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Study history</h2>
        </div>
        {data.sessions.length ? (
          <div className="surface divide-y divide-black/[0.06] px-5">
            {data.sessions.slice(0, 12).map((session) => (
              <div
                key={session.id}
                className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-start"
              >
                <div>
                  <div className="text-sm font-semibold capitalize">{session.activityType}</div>
                  <div className="mt-0.5 text-xs text-black/45">
                    {new Intl.DateTimeFormat("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit"
                    }).format(new Date(session.date))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {session.conceptIds
                      .map((id) => conceptsById.get(id)?.name)
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                  {session.reflection ? (
                    <p className="mt-1 text-sm text-black/50">{session.reflection}</p>
                  ) : null}
                </div>
                <span className="chip">{session.minutes} min</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No sessions yet">
            The form above records your first piece of preparation evidence.
          </EmptyState>
        )}
      </section>
    </div>
  );
};
