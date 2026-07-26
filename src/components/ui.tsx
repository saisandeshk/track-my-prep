import type { ReactNode } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  Circle,
  Clock3,
  Code2,
  MessageSquareText,
  Sparkles
} from "lucide-react";
import type { Concept, ContentCoverage, EvidenceType, MasteryLevel } from "../types";
import { masteryLabels } from "../lib/progress";

export const ProgressBar = ({
  value,
  color = "#527e4d",
  label
}: {
  value: number;
  color?: string;
  label: string;
}) => (
  <div
    className="h-2 w-full overflow-hidden rounded-full bg-black/[0.06]"
    role="progressbar"
    aria-label={label}
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div
      className="h-full rounded-full transition-[width] duration-500"
      style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
    />
  </div>
);

export const MetricDial = ({
  value,
  label,
  band,
  color = "#527e4d"
}: {
  value: number;
  label: string;
  band: string;
  color?: string;
}) => (
  <div className="flex items-center gap-3">
    <div
      className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
      style={{
        background: `conic-gradient(${color} ${value}%, rgba(23,33,27,.08) 0)`
      }}
      aria-label={`${label}: ${band}, about ${value}%`}
    >
      <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-xs font-bold">
        {value}%
      </div>
    </div>
    <div>
      <div className="text-xs font-medium text-black/50">{label}</div>
      <div className="text-sm font-semibold text-ink">{band}</div>
    </div>
  </div>
);

const masteryTone: Record<MasteryLevel, string> = {
  not_started: "bg-black/[0.04] text-black/55",
  learning: "bg-blue-50 text-blue-700",
  practiced: "bg-amber-50 text-amber-800",
  can_explain: "bg-moss-50 text-moss-700",
  interview_ready: "bg-moss-700 text-white"
};

export const MasteryBadge = ({
  mastery,
  needsReview
}: {
  mastery: MasteryLevel;
  needsReview?: boolean;
}) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${masteryTone[mastery]}`}
  >
    {needsReview ? (
      <AlertTriangle size={12} />
    ) : mastery === "interview_ready" ? (
      <Check size={12} />
    ) : (
      <Circle size={9} />
    )}
    {needsReview ? `${masteryLabels[mastery]} · review due` : masteryLabels[mastery]}
  </span>
);

const coverageLabels: Record<ContentCoverage, string> = {
  verified: "Verified mapping",
  partial: "Partial coverage",
  resource_gap: "Resource gap",
  practice_gap: "Practice gap",
  gated: "Gated resource"
};

export const CoverageBadge = ({ coverage }: { coverage: ContentCoverage }) => (
  <span
    className={`chip ${
      coverage === "verified"
        ? "bg-moss-50 text-moss-700"
        : coverage === "gated"
          ? "bg-violet-50 text-violet-700"
          : "bg-amber-50 text-amber-800"
    }`}
  >
    {coverageLabels[coverage]}
  </span>
);

const evidenceIcons: Record<EvidenceType, ReactNode> = {
  solve: <Check size={13} />,
  explain: <MessageSquareText size={13} />,
  implement: <Code2 size={13} />,
  debug: <AlertTriangle size={13} />,
  design: <Sparkles size={13} />,
  mock: <Clock3 size={13} />
};

export const EvidenceChip = ({
  type,
  active = false,
  onClick
}: {
  type: EvidenceType;
  active?: boolean;
  onClick?: () => void;
}) => {
  const className = `inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium capitalize transition ${
    active
      ? "border-moss-300 bg-moss-50 text-moss-800"
      : "border-black/10 bg-white text-black/55 hover:border-moss-300"
  }`;
  if (!onClick)
    return (
      <span className={className}>
        {evidenceIcons[type]}
        {type}
      </span>
    );
  return (
    <button type="button" onClick={onClick} className={className} aria-pressed={active}>
      {evidenceIcons[type]}
      {type}
    </button>
  );
};

export const EmptyState = ({
  title,
  children,
  action
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) => (
  <div className="surface-muted flex min-h-44 flex-col items-center justify-center px-6 py-8 text-center">
    <BookOpen className="mb-3 text-moss-500" size={26} aria-hidden="true" />
    <h3 className="font-semibold text-ink">{title}</h3>
    <div className="mt-1 max-w-md text-sm leading-6 text-black/55">{children}</div>
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);

export const ConceptRow = ({
  concept,
  index,
  mastery,
  needsReview,
  href,
  color
}: {
  concept: Concept;
  index: number;
  mastery: MasteryLevel;
  needsReview: boolean;
  href: string;
  color: string;
}) => (
  <a
    href={href}
    className="group grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 rounded-xl p-3 transition hover:bg-white focus-visible:bg-white"
  >
    <div
      className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {index + 1}
    </div>
    <div className="min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-ink group-hover:text-moss-700">{concept.name}</h3>
          <p className="mt-0.5 line-clamp-2 text-sm leading-5 text-black/55">{concept.scope}</p>
        </div>
        <MasteryBadge mastery={mastery} needsReview={needsReview} />
      </div>
    </div>
  </a>
);
