import { ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { concepts } from "../data/concepts";
import { resources } from "../data/resources";
import { resourceUnitsByResourceId } from "../data/resource-units";
import { routeHref } from "../lib/navigation";

const accessTone = {
  open: "bg-moss-50 text-moss-700",
  mixed: "bg-amber-50 text-amber-800",
  gated: "bg-violet-50 text-violet-700",
  unverified: "bg-black/[0.04] text-black/55"
};

export const ResourceLibrary = () => {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [access, setAccess] = useState("all");
  const [format, setFormat] = useState("all");

  const mappings = useMemo(() => {
    const map = new Map<string, typeof concepts>();
    for (const resource of resources) {
      const exactConceptIds = new Set(
        (resourceUnitsByResourceId.get(resource.id) ?? []).flatMap((unit) => unit.conceptIds)
      );
      map.set(
        resource.id,
        concepts.filter(
          (item) =>
            item.resourceIds.includes(resource.id) ||
            item.practiceResourceIds.includes(resource.id) ||
            exactConceptIds.has(item.id)
        )
      );
    }
    return map;
  }, []);

  const filtered = resources.filter((resource) => {
    const exactUnits = resourceUnitsByResourceId.get(resource.id) ?? [];
    const unitText = exactUnits
      .flatMap((unit) => [unit.title, unit.outcome, ...unit.topics])
      .join(" ");
    const text =
      `${resource.title} ${resource.sourceGroup} ${resource.auditNote} ${resource.selectionRationale} ${unitText}`.toLowerCase();
    return (
      text.includes(query.toLowerCase()) &&
      (role === "all" || resource.role === role) &&
      (access === "all" || resource.access === access) &&
      (format === "all" || exactUnits.some((unit) => unit.kind === format))
    );
  });

  return (
    <div className="space-y-7">
      <header>
        <p className="eyebrow">Audited, not accumulated</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Resource library
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55 sm:text-base">
          A curated view of the saved library. Roles describe how a resource should be used; access
          labels distinguish verified open material from mixed, gated or unverified pages.
        </p>
      </header>

      <div className="surface-muted flex items-start gap-3 p-4 text-sm leading-6 text-black/60">
        <ShieldCheck className="mt-0.5 shrink-0 text-moss-600" size={19} />
        <p>
          Audit date: 26 July 2026. “Open” means the audited instructional material was reachable
          without an account—not that enrollment, grading, compute or every feature is free. Full
          per-link notes live in <code>docs/research/</code>.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_14rem_12rem_12rem]">
        <label className="relative">
          <span className="sr-only">Search resources</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40"
            size={17}
          />
          <input
            className="input input-with-icon"
            placeholder="Search titles, groups or rationale"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Filter by role</span>
          <select className="input" value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="all">All roles</option>
            <option value="preferred">Preferred</option>
            <option value="supplementary">Supplementary</option>
            <option value="reference_only">Reference only</option>
            <option value="added_recommendation">Added recommendations</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Filter by access</span>
          <select
            className="input"
            value={access}
            onChange={(event) => setAccess(event.target.value)}
          >
            <option value="all">All access</option>
            <option value="open">Open</option>
            <option value="mixed">Mixed</option>
            <option value="gated">Gated</option>
            <option value="unverified">Unverified</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Filter by exact-unit format</span>
          <select
            className="input"
            value={format}
            onChange={(event) => setFormat(event.target.value)}
          >
            <option value="all">All formats</option>
            <option value="chapter">Chapters</option>
            <option value="lesson">Lessons</option>
            <option value="module">Modules</option>
            <option value="problem_set">Problem sets</option>
            <option value="assignment">Assignments</option>
            <option value="notebook">Notebooks</option>
            <option value="project">Projects</option>
            <option value="video">Videos</option>
            <option value="video_chapter">Video chapters</option>
            <option value="reference">References</option>
          </select>
        </label>
      </div>

      <section className="grid gap-4 xl:grid-cols-2">
        {filtered.map((resource) => {
          const mapped = mappings.get(resource.id) ?? [];
          const exactUnits = resourceUnitsByResourceId.get(resource.id) ?? [];
          return (
            <article key={resource.id} className="surface flex flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-black/45">{resource.sourceGroup}</p>
                  <h2 className="mt-1 text-lg font-semibold">{resource.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`chip capitalize ${accessTone[resource.access]}`}>
                    {resource.access}
                  </span>
                  <span className="chip capitalize">{resource.role.replace("_", " ")}</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-black/60">{resource.auditNote}</p>
              <div className="mt-4 rounded-xl bg-moss-50/70 p-3 text-sm leading-6 text-moss-800">
                <strong>Why it stays:</strong> {resource.selectionRationale}
              </div>
              <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-black/45">Depth / effort</dt>
                  <dd className="mt-1 text-black/65">
                    <span className="capitalize">{resource.depth}</span> · {resource.effort}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-black/45">Assumptions</dt>
                  <dd className="mt-1 text-black/65">{resource.assumptions}</dd>
                </div>
              </dl>
              <div className="mt-4">
                <div className="text-xs font-semibold text-black/45">
                  Mapped to {mapped.length} concept{mapped.length === 1 ? "" : "s"}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mapped.slice(0, 5).map((item) => (
                    <a
                      key={item.id}
                      href={routeHref({ name: "concept", id: item.id })}
                      className="chip hover:bg-moss-50 hover:text-moss-700"
                    >
                      {item.name}
                    </a>
                  ))}
                  {mapped.length > 5 ? (
                    <span className="chip">+{mapped.length - 5} more</span>
                  ) : null}
                </div>
              </div>
              {exactUnits.length ? (
                <div className="mt-4 border-t border-black/[0.06] pt-4">
                  <div className="text-xs font-semibold text-black/45">
                    {exactUnits.length} exact unit{exactUnits.length === 1 ? "" : "s"} audited
                  </div>
                  <div className="mt-2 space-y-2">
                    {exactUnits.slice(0, 4).map((unit) => (
                      <a
                        key={unit.id}
                        href={unit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-3 rounded-lg bg-black/[0.025] px-3 py-2.5 hover:bg-moss-50"
                      >
                        <div>
                          <div className="text-sm font-medium">{unit.title}</div>
                          <div className="mt-0.5 text-xs capitalize text-black/45">
                            {unit.role} · {unit.kind.replace("_", " ")} · {unit.conceptIds.length}{" "}
                            concept
                            {unit.conceptIds.length === 1 ? "" : "s"}
                          </div>
                        </div>
                        <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-black/35" />
                      </a>
                    ))}
                    {exactUnits.length > 4 ? (
                      <div className="text-xs text-black/45">
                        +{exactUnits.length - 4} more mapped units
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="mt-4 border-t border-black/[0.06] pt-4 text-xs text-amber">
                  No exact chapter or problem mapping has been verified yet.
                </div>
              )}
              {resource.addedRecommendation ? (
                <div className="mt-4 text-xs text-amber">
                  Added recommendation · {resource.gapFilled}
                </div>
              ) : null}
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="button-secondary mt-5 self-start"
              >
                Open source <ArrowUpRight size={16} />
              </a>
            </article>
          );
        })}
      </section>

      {!filtered.length ? (
        <div className="surface-muted p-8 text-center text-sm text-black/50">
          No resources match these filters.
        </div>
      ) : null}
    </div>
  );
};
