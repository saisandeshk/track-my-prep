import { ArrowRight, RotateCcw } from "lucide-react";
import { conceptsById } from "../data/concepts";
import { domainsById } from "../data/domains";
import { isRevisionDue, nextRevisionDate } from "../lib/progress";
import { routeHref } from "../lib/navigation";
import { useUserData } from "../state/UserDataContext";
import { EmptyState, EvidenceChip, MasteryBadge } from "../components/ui";

const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(typeof date === "string" ? new Date(date) : date);

export const Revision = () => {
  const { data } = useUserData();
  const touched = Object.values(data.conceptProgress).flatMap((progress) => {
    const item = conceptsById.get(progress.conceptId);
    return item ? [{ item, progress }] : [];
  });
  const due = touched.filter(({ progress }) =>
    isRevisionDue(progress, data.settings.revisionIntervalDays)
  );
  const ready = touched
    .filter(
      ({ progress }) => progress.mastery === "can_explain" || progress.mastery === "interview_ready"
    )
    .sort((a, b) => a.item.name.localeCompare(b.item.name));

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow">Recall before confidence</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Revision & interview review
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55 sm:text-base">
          Review dates are suggestions based on mastery and history. A concept keeps its
          demonstrated level while an overdue signal temporarily discounts readiness.
        </p>
      </header>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Due now</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Refresh the evidence</h2>
          </div>
          <a href="#/tracker" className="button-secondary">
            <RotateCcw size={16} /> Log a revision
          </a>
        </div>
        {due.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {due.map(({ item, progress }) => (
              <article key={item.id} className="surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-black/45">
                      {item.domainIds
                        .map((id) => domainsById.get(id)?.shortName)
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                    <h3 className="mt-1 font-semibold">{item.name}</h3>
                  </div>
                  <MasteryBadge mastery={progress.mastery} needsReview />
                </div>
                <p className="mt-4 rounded-xl bg-amber/5 p-3 text-sm leading-6">
                  {item.checkpoints[0]?.prompt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {progress.evidence.map((evidence) => (
                    <EvidenceChip key={evidence} type={evidence} active />
                  ))}
                </div>
                <a
                  href={routeHref({ name: "concept", id: item.id })}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-moss-700"
                >
                  Review concept <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="Nothing is overdue">
            Log learning or practice sessions and the review queue will adapt to your mastery level.
          </EmptyState>
        )}
      </section>

      <section>
        <div className="mb-4">
          <p className="eyebrow">Interview checklist</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Concepts you can explain</h2>
        </div>
        {ready.length ? (
          <div className="surface divide-y divide-black/[0.06] px-5">
            {ready.map(({ item, progress }) => {
              const suggested = nextRevisionDate(progress, data.settings.revisionIntervalDays);
              return (
                <a
                  key={item.id}
                  href={routeHref({ name: "concept", id: item.id })}
                  className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-4"
                >
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="mt-0.5 text-xs text-black/45">
                      {item.checkpoints[0]?.prompt}
                    </div>
                  </div>
                  <MasteryBadge
                    mastery={progress.mastery}
                    needsReview={isRevisionDue(progress, data.settings.revisionIntervalDays)}
                  />
                  <span className="text-xs text-black/45">
                    {suggested ? `Review ${formatDate(suggested)}` : "No review date"}
                  </span>
                </a>
              );
            })}
          </div>
        ) : (
          <EmptyState title="No concepts at explain-ready depth yet">
            This list appears when you mark a concept “Can explain” or “Interview ready” and support
            it with evidence.
          </EmptyState>
        )}
      </section>
    </div>
  );
};
