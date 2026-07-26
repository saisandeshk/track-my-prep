import { ArrowRight, BookOpen, Clock3, Plus, RotateCcw } from "lucide-react";
import { conceptsById } from "../data/concepts";
import { domains, domainsById } from "../data/domains";
import {
  calculateMetrics,
  getDomainConcepts,
  getNextRecommended,
  isRevisionDue,
  todayMinutesByDomain
} from "../lib/progress";
import { routeHref } from "../lib/navigation";
import { useUserData } from "../state/UserDataContext";
import { EmptyState, MasteryBadge, MetricDial, ProgressBar } from "../components/ui";

const humanDate = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long"
}).format(new Date());

export const Dashboard = () => {
  const { data } = useUserData();
  const activeDomains = data.settings.activeDomainIds.flatMap((id) => {
    const domain = domainsById.get(id);
    return domain ? [domain] : [];
  });
  const minutes = todayMinutesByDomain(data.sessions);
  const due = Object.values(data.conceptProgress)
    .filter((progress) => isRevisionDue(progress, data.settings.revisionIntervalDays))
    .flatMap((progress) => {
      const item = conceptsById.get(progress.conceptId);
      return item ? [{ item, progress }] : [];
    })
    .slice(0, 5);
  const recent = data.sessions.slice(0, 4);
  const allActiveConcepts = activeDomains.flatMap((domain) => getDomainConcepts(domain.path));
  const overall = calculateMetrics(
    Array.from(new Map(allActiveConcepts.map((item) => [item.id, item])).values()),
    data.conceptProgress,
    data.settings.revisionIntervalDays
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{humanDate}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Good to see you, Sai.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55 sm:text-base">
            Pick the next honest step. The goal is usable evidence - not a perfect-looking
            checklist.
          </p>
        </div>
        <a href={routeHref({ name: "tracker" })} className="button-primary shrink-0">
          <Plus size={17} />
          Log a study session
        </a>
      </header>

      <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="surface p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Active map</p>
              <h2 className="mt-1 font-display text-2xl font-semibold">Preparation signal</h2>
              <p className="mt-1 text-sm text-black/50">
                Rounded, explainable estimates across active domains.
              </p>
            </div>
            <a href={routeHref({ name: "domains" })} className="button-secondary">
              Open learning map <ArrowRight size={15} />
            </a>
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <MetricDial
              value={overall.coverage}
              band={overall.coverageBand}
              label="Coverage"
              color="#4b687a"
            />
            <MetricDial
              value={overall.readiness}
              band={overall.readinessBand}
              label="Readiness"
              color="#527e4d"
            />
          </div>
          <div className="mt-6 rounded-xl bg-black/[0.025] p-3 text-xs leading-5 text-black/55">
            Coverage counts important concepts you have started. Readiness uses demonstrated mastery
            and evidence, then discounts concepts whose revision is overdue.
          </div>
        </div>

        <div className="surface p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Today</p>
              <h2 className="mt-1 font-display text-2xl font-semibold">Pace, not pressure</h2>
            </div>
            <Clock3 className="text-moss-600" size={22} />
          </div>
          <div className="mt-5 space-y-4">
            {data.settings.dailyGoals.map((goal) => {
              const domain = domainsById.get(goal.domainId);
              if (!domain) return null;
              const actual = minutes[goal.domainId] ?? 0;
              return (
                <div key={goal.domainId}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{domain.shortName}</span>
                    <span className="text-black/50">
                      {actual} / {goal.minutes} min
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.minutes ? (actual / goal.minutes) * 100 : 0}
                    color={domain.color}
                    label={`${domain.name} daily pace`}
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-xs leading-5 text-black/45">
            Goals are adjustable guides. Missing one does not erase prior work.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="eyebrow">Recommended next</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Continue the path</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeDomains.map((domain) => {
            const next = getNextRecommended(domain.path, data);
            const metric = calculateMetrics(
              getDomainConcepts(domain.path),
              data.conceptProgress,
              data.settings.revisionIntervalDays
            );
            return (
              <article key={domain.id} className="surface flex min-h-52 flex-col p-5">
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: domain.color }}
                  >
                    {domain.shortName}
                  </span>
                  <span className="text-xs text-black/45">{metric.readinessBand}</span>
                </div>
                {next ? (
                  <>
                    <h3 className="mt-5 text-lg font-semibold">{next.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/55">
                      {next.scope}
                    </p>
                    <a
                      href={routeHref({ name: "concept", id: next.id })}
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-moss-700"
                    >
                      Open concept <ArrowRight size={15} />
                    </a>
                  </>
                ) : (
                  <>
                    <h3 className="mt-5 text-lg font-semibold">Path covered</h3>
                    <p className="mt-2 text-sm leading-6 text-black/55">
                      Use the review queue and mock evidence to strengthen readiness.
                    </p>
                  </>
                )}
              </article>
            );
          })}
          {!activeDomains.length ? (
            <div className="md:col-span-2 xl:col-span-3">
              <EmptyState
                title="Choose an active domain"
                action={
                  <a href={routeHref({ name: "settings" })} className="button-secondary">
                    Open settings
                  </a>
                }
              >
                Active domains keep the dashboard focused without hiding the full learning map.
              </EmptyState>
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="eyebrow">Revision</p>
              <h2 className="mt-1 font-display text-2xl font-semibold">Worth refreshing</h2>
            </div>
            <a
              href={routeHref({ name: "revision" })}
              className="text-sm font-semibold text-moss-700"
            >
              Review all
            </a>
          </div>
          {due.length ? (
            <div className="surface divide-y divide-black/[0.06] px-5">
              {due.map(({ item, progress }) => (
                <a
                  href={routeHref({ name: "concept", id: item.id })}
                  key={item.id}
                  className="flex items-center gap-3 py-4"
                >
                  <RotateCcw size={17} className="shrink-0 text-amber" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{item.name}</div>
                    <div className="mt-0.5 text-xs text-black/45">
                      {item.domainIds
                        .map((id) => domainsById.get(id)?.shortName)
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>
                  <MasteryBadge mastery={progress.mastery} needsReview />
                </a>
              ))}
            </div>
          ) : (
            <EmptyState title="No reviews due">
              Revision suggestions will appear after you log learning and practice.
            </EmptyState>
          )}
        </div>

        <div>
          <div className="mb-4">
            <p className="eyebrow">History</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Recent work</h2>
          </div>
          {recent.length ? (
            <div className="surface divide-y divide-black/[0.06] px-5">
              {recent.map((session) => {
                const domain = domainsById.get(session.domainId);
                return (
                  <div key={session.id} className="flex gap-3 py-4">
                    <BookOpen size={17} className="mt-0.5 shrink-0 text-moss-600" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold capitalize">
                        {session.activityType} · {session.minutes} min
                      </div>
                      <div className="mt-0.5 text-xs text-black/45">
                        {domain?.shortName} ·{" "}
                        {session.conceptIds
                          .map((id) => conceptsById.get(id)?.name)
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                      {session.reflection ? (
                        <p className="mt-2 line-clamp-2 text-sm text-black/55">
                          {session.reflection}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Your first session starts the history"
              action={
                <a href={routeHref({ name: "tracker" })} className="button-secondary">
                  Log what you did
                </a>
              }
            >
              Record actual work, confidence and the next action—not just time spent.
            </EmptyState>
          )}
        </div>
      </section>
    </div>
  );
};
