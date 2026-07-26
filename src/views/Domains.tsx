import { ArrowRight, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { conceptsById } from "../data/concepts";
import { domains, domainsById } from "../data/domains";
import { calculateMetrics, getDomainConcepts, isRevisionDue } from "../lib/progress";
import { routeHref } from "../lib/navigation";
import { useUserData } from "../state/UserDataContext";
import { ConceptRow, MetricDial, ProgressBar } from "../components/ui";

export const DomainExplorer = () => {
  const { data } = useUserData();
  const [query, setQuery] = useState("");
  const [onlyActive, setOnlyActive] = useState(false);

  const filtered = useMemo(
    () =>
      domains.filter((domain) => {
        const matches =
          domain.name.toLowerCase().includes(query.toLowerCase()) ||
          domain.description.toLowerCase().includes(query.toLowerCase());
        return matches && (!onlyActive || data.settings.activeDomainIds.includes(domain.id));
      }),
    [query, onlyActive, data.settings.activeDomainIds]
  );

  return (
    <div className="space-y-7">
      <header>
        <p className="eyebrow">Canonical curriculum</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Learning map
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55 sm:text-base">
          Thirteen equally important domains, joined by shared concepts. Each domain has one strict
          recommended path; advanced depth stays optional until its prerequisites are useful.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search domains</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40"
            size={17}
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the map"
            className="input input-with-icon"
          />
        </label>
        <button
          type="button"
          className={`button-secondary ${onlyActive ? "border-moss-400 bg-moss-50" : ""}`}
          onClick={() => setOnlyActive((value) => !value)}
          aria-pressed={onlyActive}
        >
          <Filter size={16} />
          Active domains only
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((domain) => {
          const metric = calculateMetrics(
            getDomainConcepts(domain.path),
            data.conceptProgress,
            data.settings.revisionIntervalDays
          );
          const active = data.settings.activeDomainIds.includes(domain.id);
          return (
            <a
              key={domain.id}
              href={routeHref({ name: "domain", id: domain.id })}
              className="surface group flex min-h-64 flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl font-display text-lg font-semibold text-white"
                  style={{ backgroundColor: domain.color }}
                >
                  {domain.shortName.slice(0, 1)}
                </span>
                {active ? <span className="chip bg-moss-50 text-moss-700">Active</span> : null}
              </div>
              <h2 className="mt-5 text-lg font-semibold group-hover:text-moss-700">
                {domain.name}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/55">
                {domain.description}
              </p>
              <div className="mt-auto pt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-black/45">
                  <span>{domain.path.length} ordered concepts</span>
                  <span>{metric.readinessBand}</span>
                </div>
                <ProgressBar
                  value={metric.readiness}
                  color={domain.color}
                  label={`${domain.name} readiness`}
                />
                <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-moss-700">
                  Follow the path <ArrowRight size={15} />
                </div>
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
};

export const DomainDetail = ({ id }: { id: string }) => {
  const { data } = useUserData();
  const domain = domainsById.get(id);
  if (!domain) {
    return (
      <div className="surface p-8">
        <h1 className="font-display text-3xl font-semibold">Domain not found</h1>
        <a href="#/domains" className="button-secondary mt-5">
          Return to the learning map
        </a>
      </div>
    );
  }
  const domainConcepts = getDomainConcepts(domain.path);
  const metrics = calculateMetrics(
    domainConcepts,
    data.conceptProgress,
    data.settings.revisionIntervalDays
  );

  return (
    <div className="space-y-7">
      <header>
        <a href="#/domains" className="text-sm font-semibold text-moss-700">
          ← All domains
        </a>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Strict recommended path</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {domain.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55 sm:text-base">
              {domain.description}
            </p>
          </div>
          <div className="flex gap-5 rounded-2xl border border-black/[0.06] bg-white/65 p-4">
            <MetricDial
              value={metrics.coverage}
              band={metrics.coverageBand}
              label="Coverage"
              color="#4b687a"
            />
            <MetricDial
              value={metrics.readiness}
              band={metrics.readinessBand}
              label="Readiness"
              color={domain.color}
            />
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <section className="surface p-3 sm:p-5">
          <div className="mb-3 px-3 py-2">
            <p className="eyebrow">Path order</p>
            <p className="mt-2 text-sm leading-6 text-black/55">
              Shared concepts appear in every path they support, but their mastery and history are
              stored only once.
            </p>
          </div>
          <div className="relative space-y-1 before:absolute before:bottom-8 before:left-[1.85rem] before:top-8 before:w-px before:bg-black/10">
            {domainConcepts.map((item, index) => {
              const progress = data.conceptProgress[item.id];
              return (
                <div key={item.id} className="relative bg-white/0">
                  <ConceptRow
                    concept={item}
                    index={index}
                    mastery={progress?.mastery ?? "not_started"}
                    needsReview={isRevisionDue(progress, data.settings.revisionIntervalDays)}
                    href={routeHref({ name: "concept", id: item.id })}
                    color={domain.color}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="surface p-5">
            <p className="eyebrow">Mastery question</p>
            <p className="mt-3 font-display text-xl leading-7">{domain.guidingQuestion}</p>
          </div>
          <div className="surface p-5">
            <p className="eyebrow">Content honesty</p>
            <div className="mt-4 space-y-3 text-sm">
              {(["verified", "partial", "practice_gap", "gated"] as const).map((coverage) => {
                const count = domainConcepts.filter(
                  (item) => item.contentCoverage === coverage
                ).length;
                if (!count) return null;
                return (
                  <div key={coverage} className="flex items-center justify-between gap-3">
                    <span className="capitalize text-black/55">{coverage.replace("_", " ")}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="surface p-5">
            <p className="eyebrow">Shared foundations</p>
            <p className="mt-2 text-sm leading-6 text-black/55">
              {domainConcepts.filter((item) => item.domainIds.length > 1).length} concepts in this
              path also support other domains. Progress transfers automatically.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
