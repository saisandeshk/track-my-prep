import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  Clock3,
  GitBranch,
  History,
  ListChecks
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { concepts, conceptsById } from "../data/concepts";
import { domainsById } from "../data/domains";
import { resourcesById } from "../data/resources";
import { resourceUnitsByConceptId } from "../data/resource-units";
import {
  isRevisionDue,
  masteryLabels,
  masteryOrder,
  nextRevisionDate,
  suggestedMasteryForSession
} from "../lib/progress";
import { routeHref } from "../lib/navigation";
import { useUserData } from "../state/UserDataContext";
import type { EvidenceType, MasteryLevel } from "../types";
import { CoverageBadge, EvidenceChip, MasteryBadge } from "../components/ui";

const checkpointLabels = {
  understand: "Understand",
  apply: "Apply",
  debug: "Diagnose",
  interview: "Defend"
};

const unitRoleLabels = {
  primary: "Primary lesson",
  supplementary: "Supplement",
  practice: "Practice",
  build: "Build",
  revision: "Revision",
  advanced: "Advanced"
};

const unitRoleTone = {
  primary: "bg-moss-50 text-moss-700",
  supplementary: "bg-black/[0.04] text-black/60",
  practice: "bg-amber-50 text-amber-800",
  build: "bg-blue-50 text-blue-700",
  revision: "bg-violet-50 text-violet-700",
  advanced: "bg-rose-50 text-rose-700"
};

const auditConfidenceLabels = {
  content_verified: "Content checked",
  outline_verified: "Outline checked",
  metadata_only: "Metadata only",
  gated: "Gated"
};

const formatTimestamp = (seconds?: number) => {
  if (seconds === undefined) return "";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining = seconds % 60;
  return hours
    ? `${hours}:${minutes.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`
    : `${minutes}:${remaining.toString().padStart(2, "0")}`;
};

const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }).format(new Date(value))
    : "Not yet";

export const ConceptDetail = ({ id }: { id: string }) => {
  const { data, updateConcept } = useUserData();
  const item = conceptsById.get(id);
  const storedMastery = data.conceptProgress[id]?.mastery ?? "not_started";
  const [selectedMastery, setSelectedMastery] = useState<MasteryLevel>(storedMastery);

  const successors = useMemo(
    () => concepts.filter((candidate) => candidate.prerequisiteIds.includes(id)),
    [id]
  );

  useEffect(() => {
    setSelectedMastery(storedMastery);
  }, [id, storedMastery]);

  if (!item) {
    return (
      <div className="surface p-8">
        <h1 className="font-display text-3xl font-semibold">Concept not found</h1>
        <a href="#/domains" className="button-secondary mt-5">
          Return to the map
        </a>
      </div>
    );
  }

  const progress = data.conceptProgress[id] ?? {
    conceptId: id,
    mastery: "not_started" as const,
    evidence: [] as EvidenceType[],
    confidence: 3 as const
  };
  const due = isRevisionDue(progress, data.settings.revisionIntervalDays);
  const revisionDate = nextRevisionDate(progress, data.settings.revisionIntervalDays);
  const explanationResources = item.resourceIds.flatMap((resourceId) => {
    const resource = resourcesById.get(resourceId);
    return resource ? [resource] : [];
  });
  const practiceResources = item.practiceResourceIds.flatMap((resourceId) => {
    const resource = resourcesById.get(resourceId);
    return resource ? [resource] : [];
  });
  const exactUnits = resourceUnitsByConceptId.get(id) ?? [];
  const history = data.sessions.filter((session) => session.conceptIds.includes(id));
  const latestSession = history[0];
  const sessionSuggestion = latestSession
    ? suggestedMasteryForSession(progress.mastery, latestSession.activityType)
    : undefined;

  const toggleEvidence = (evidence: EvidenceType) => {
    const next = progress.evidence.includes(evidence)
      ? progress.evidence.filter((value) => value !== evidence)
      : [...progress.evidence, evidence];
    updateConcept(id, { evidence: next });
  };

  return (
    <div className="space-y-7">
      <header>
        <a href="#/domains" className="text-sm font-semibold text-moss-700">
          ← Learning map
        </a>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {item.domainIds.map((domainId) => {
            const domain = domainsById.get(domainId);
            return domain ? (
              <a
                href={routeHref({ name: "domain", id: domain.id })}
                key={domain.id}
                className="chip text-white"
                style={{ backgroundColor: domain.color }}
              >
                {domain.shortName}
              </a>
            ) : null;
          })}
          <CoverageBadge coverage={item.contentCoverage} />
        </div>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {item.name}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-black/60">{item.scope}</p>
          </div>
          <MasteryBadge mastery={progress.mastery} needsReview={due} />
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="space-y-6">
          <section className="surface p-5 sm:p-6">
            <p className="eyebrow">Expected outcome</p>
            <p className="mt-3 font-display text-2xl leading-8">{item.outcome}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="surface p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <GitBranch size={19} className="text-moss-600" />
              <h2 className="font-display text-2xl font-semibold">Place in the map</h2>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">Prerequisites</h3>
                <div className="mt-2 space-y-2">
                  {item.prerequisiteIds.length ? (
                    item.prerequisiteIds.map((prerequisiteId) => {
                      const prerequisite = conceptsById.get(prerequisiteId);
                      if (!prerequisite) return null;
                      const prerequisiteProgress = data.conceptProgress[prerequisiteId];
                      return (
                        <a
                          key={prerequisiteId}
                          href={routeHref({ name: "concept", id: prerequisiteId })}
                          className="flex items-center justify-between gap-2 rounded-xl bg-black/[0.025] px-3 py-2.5 text-sm hover:bg-moss-50"
                        >
                          <span>{prerequisite.name}</span>
                          <MasteryBadge mastery={prerequisiteProgress?.mastery ?? "not_started"} />
                        </a>
                      );
                    })
                  ) : (
                    <p className="text-sm text-black/45">No concept prerequisites.</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Direct successors</h3>
                <div className="mt-2 space-y-2">
                  {successors.length ? (
                    successors.slice(0, 6).map((successor) => (
                      <a
                        key={successor.id}
                        href={routeHref({ name: "concept", id: successor.id })}
                        className="block rounded-xl bg-black/[0.025] px-3 py-2.5 text-sm hover:bg-moss-50"
                      >
                        {successor.name}
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-black/45">This is a path outcome or project.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="surface p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <BookOpen size={19} className="text-moss-600" />
              <h2 className="font-display text-2xl font-semibold">Learn and practice</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-black/50">
              Follow the units in order. The link is a study input; raise mastery only after
              completing the evidence and checkpoints.
            </p>
            <div className="mt-5 space-y-3">
              {exactUnits.length ? (
                exactUnits.map((unit, index) => {
                  const resource = resourcesById.get(unit.resourceId);
                  const start = formatTimestamp(unit.startSeconds);
                  const end = formatTimestamp(unit.endSeconds);
                  return (
                    <a
                      key={unit.id}
                      href={unit.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`group block rounded-xl border p-4 ${
                        unit.role === "practice" || unit.role === "build"
                          ? "border-amber/20 bg-amber/5 hover:border-amber/50"
                          : "border-black/[0.06] bg-white hover:border-moss-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold group-hover:text-moss-700">
                              {index + 1}. {unit.title}
                            </span>
                            <span className={`chip ${unitRoleTone[unit.role]}`}>
                              {unitRoleLabels[unit.role]}
                            </span>
                            <span className="chip capitalize">{unit.kind.replace("_", " ")}</span>
                          </div>
                          <p className="mt-1 text-xs font-medium text-black/40">
                            {resource?.title ?? unit.resourceId}
                            {start ? ` · ${start}${end ? `–${end}` : ""}` : ""}
                            {unit.effort ? ` · ${unit.effort}` : ""}
                          </p>
                        </div>
                        <ArrowUpRight size={17} className="shrink-0 text-black/40" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-black/60">{unit.outcome}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {unit.topics.slice(0, 6).map((topic) => (
                          <span key={topic} className="chip">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/45">
                        <span>{auditConfidenceLabels[unit.auditConfidence]}</span>
                        <span>Prerequisites: {unit.prerequisites}</span>
                      </div>
                    </a>
                  );
                })
              ) : (
                <div className="rounded-xl border border-amber/20 bg-amber/5 p-4 text-sm leading-6 text-black/60">
                  Exact unit mapping is not yet verified for this concept. Use the audited source
                  overview below and treat the coverage badge as the current limitation.
                </div>
              )}

              {!exactUnits.length
                ? explanationResources.map((resource, index) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-4 rounded-xl border border-black/[0.06] bg-white p-4 hover:border-moss-300"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold group-hover:text-moss-700">
                            {resource.title}
                          </span>
                          {index === 0 ? (
                            <span className="chip bg-moss-50 text-moss-700">
                              Preferred explanation
                            </span>
                          ) : (
                            <span className="chip capitalize">
                              {resource.role.replace("_", " ")}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-5 text-black/50">
                          {resource.selectionRationale}
                        </p>
                      </div>
                      <ArrowUpRight size={17} className="shrink-0 text-black/40" />
                    </a>
                  ))
                : null}
              {!exactUnits.length
                ? practiceResources.map((resource) => (
                    <a
                      key={`practice-${resource.id}`}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-4 rounded-xl border border-amber/20 bg-amber/5 p-4 hover:border-amber/50"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold group-hover:text-amber">
                            {resource.title}
                          </span>
                          <span className="chip bg-amber/10 text-amber">Direct practice</span>
                        </div>
                        <p className="mt-2 text-sm leading-5 text-black/50">
                          Link out for the exercise; its statement and solution are not copied here.
                        </p>
                      </div>
                      <ArrowUpRight size={17} className="shrink-0 text-black/40" />
                    </a>
                  ))
                : null}
            </div>
          </section>

          <section className="surface p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <CircleHelp size={19} className="text-moss-600" />
              <h2 className="font-display text-2xl font-semibold">Mastery checkpoints</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-black/50">
              Answer aloud or on paper before raising mastery. These prompts are original and
              intentionally short.
            </p>
            <ol className="mt-5 space-y-3">
              {item.checkpoints.map((checkpoint, index) => (
                <li
                  key={`${checkpoint.level}-${checkpoint.prompt}`}
                  className="flex gap-3 rounded-xl bg-black/[0.025] p-4"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-moss-700">
                        {checkpointLabels[checkpoint.level]}
                      </span>
                      {checkpoint.evidence.map((evidence) => (
                        <span key={evidence} className="chip py-0.5 text-[0.65rem]">
                          {evidence}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 text-sm leading-6">{checkpoint.prompt}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="surface p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <History size={19} className="text-moss-600" />
              <h2 className="font-display text-2xl font-semibold">Personal history</h2>
            </div>
            {history.length ? (
              <div className="mt-4 divide-y divide-black/[0.06]">
                {history.map((session) => (
                  <div key={session.id} className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold capitalize">
                        {session.activityType} · {session.minutes} minutes
                      </span>
                      <span className="text-xs text-black/45">{formatDate(session.date)}</span>
                    </div>
                    {session.reflection ? (
                      <p className="mt-2 text-sm leading-6 text-black/55">{session.reflection}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-black/45">No sessions logged for this concept yet.</p>
            )}
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-8 xl:self-start">
          <section className="surface p-5">
            <p className="eyebrow">Mastery control</p>
            <p className="mt-2 text-sm leading-5 text-black/50">
              Logging can only start an untouched concept at Learning. Complete the matching
              checkpoint, choose the strongest level you can defend, then confirm it here.
            </p>
            {sessionSuggestion ? (
              <div className="mt-4 rounded-xl bg-moss-50 px-3 py-3 text-xs leading-5 text-moss-800">
                <span className="font-semibold">Latest session suggestion:</span>{" "}
                {masteryLabels[sessionSuggestion]}. This suggestion has not been applied as a
                mastery increase.
              </div>
            ) : null}
            <label className="mt-4 block text-xs font-semibold text-black/60">
              Demonstrated level
              <select
                className="input mt-1.5"
                value={selectedMastery}
                onChange={(event) => setSelectedMastery(event.target.value as MasteryLevel)}
              >
                {masteryOrder.map((mastery) => (
                  <option value={mastery} key={mastery}>
                    {masteryLabels[mastery]}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-5">
              <div className="text-xs font-semibold text-black/60">Evidence recorded</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.evidence.map((evidence) => (
                  <EvidenceChip
                    key={evidence}
                    type={evidence}
                    active={progress.evidence.includes(evidence)}
                    onClick={() => toggleEvidence(evidence)}
                  />
                ))}
              </div>
            </div>
            <label className="mt-5 block text-xs font-semibold text-black/60">
              Confidence · {progress.confidence}/5
              <input
                className="mt-2 w-full accent-moss-600"
                type="range"
                min={1}
                max={5}
                value={progress.confidence}
                onChange={(event) =>
                  updateConcept(id, {
                    confidence: Number(event.target.value) as 1 | 2 | 3 | 4 | 5
                  })
                }
              />
            </label>
            <button
              type="button"
              className="button-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-45"
              disabled={selectedMastery === progress.mastery}
              onClick={() => updateConcept(id, { mastery: selectedMastery })}
            >
              <CheckCircle2 size={16} /> Confirm mastery
            </button>
            <a href="#/tracker" className="button-secondary mt-2 w-full">
              <ListChecks size={16} /> Log a session
            </a>
          </section>

          <section className="surface p-5">
            <p className="eyebrow">Revision signal</p>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-black/50">Last studied</span>
                <span className="font-medium">{formatDate(progress.lastStudiedAt)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-black/50">Last revised</span>
                <span className="font-medium">{formatDate(progress.lastRevisedAt)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-black/50">Suggested review</span>
                <span className={due ? "font-semibold text-amber" : "font-medium"}>
                  {revisionDate ? formatDate(revisionDate.toISOString()) : "After first evidence"}
                </span>
              </div>
            </div>
          </section>

          <section className="surface p-5">
            <div className="flex items-center gap-2 text-moss-700">
              <CheckCircle2 size={17} />
              <span className="text-sm font-semibold">Evidence over activity</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-black/50">
              Sessions record work and evidence, but never raise mastery beyond Learning. Confirm
              higher levels here only after completing the relevant checkpoints.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
};
