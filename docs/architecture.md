# Architecture and data boundaries

## System shape

Track My Prep is a static React + TypeScript + Vite application. Tailwind supplies the visual system; local state uses React context and browser storage. There is no network-dependent application runtime.

```text
Version-controlled curriculum             Browser-private learner state
─────────────────────────────             ─────────────────────────────
domains + strict paths                    active domains + daily goals
shared concept graph             →        concept mastery + evidence
exact resource units + mastery             sessions + reflections
content coverage metadata                  revision timestamps
          │                                         │
          └──────────── React views + pure scoring ──┘
                              │
                       local JSON export/import
```

The public and private models meet only through stable concept and domain IDs. That is the future cloud-sync seam: a sync adapter can store `UserData` without changing the curriculum schema.

## Canonical content

`src/data/domains.ts` defines domain paths. `src/data/concepts.ts` defines the shared prerequisite graph. `src/data/resources.ts` stores source-level audit records. `src/data/mastery/` contains richer concept-specific outcomes and evidence-labelled checkpoints. `src/data/resource-units/` maps exact chapters, assignments, practice collections, projects, references and video chapters to stable concept IDs.

The graph validator in `src/lib/curriculum.ts` checks:

- unique concept, domain, resource, and resource-unit IDs
- existence of prerequisite, parent, resource, and path references
- existence of every resource and concept referenced by an exact unit
- valid external URLs and timestamp ranges
- reciprocal domain links for every path membership
- absence of prerequisite cycles

The content-quality tests additionally require every concept to have a substantial outcome, all four mastery levels, evidence-bearing original prompts, and at least one exact mapped resource unit.

No third-party lesson, problem statement, transcript, or solution is stored. The content layer contains titles, links, topic labels, short original usage descriptions, and original checkpoint prompts.

## Learner state

`UserData` is versioned independently:

```ts
interface UserData {
  schemaVersion: 1;
  conceptProgress: Record<string, ConceptProgress>;
  sessions: StudySession[];
  settings: UserSettings;
}
```

Mastery and revision are separate. `ConceptProgress.mastery` records the learner’s strongest demonstrated level; `lastStudiedAt` and `lastRevisedAt` drive a derived review signal. Evidence is stored as observable verbs: solve, explain, implement, debug, design, and mock.

`src/lib/storage.ts` validates imports before replacing current state. A future schema change should:

1. add a new schema version;
2. define a migration from the prior version;
3. validate the migrated result;
4. preserve unknown concept progress where possible so temporarily removed curriculum IDs do not destroy history.

## Progress model

Coverage is the importance-weighted share of path concepts whose mastery is no longer `not_started`.

Readiness combines:

- mastery depth (`learning` through `interview_ready`);
- a small evidence-breadth factor;
- concept importance weight;
- a freshness factor when revision is overdue.

Results are rounded to five percentage points and paired with bands. The UI explains the calculation and does not claim psychometric precision.

The base review interval is configurable. Learning and practiced concepts return sooner; interview-ready concepts remain fresh longer. An overdue concept keeps its mastery state but receives a readiness discount.

## Routing and deployment

Hash routes support static hosting without server rewrite configuration:

- `#/home`
- `#/domains` and `#/domain/:id`
- `#/concept/:id`
- `#/tracker`
- `#/revision`
- `#/resources`
- `#/settings`

Vite’s relative base keeps built assets valid on GitHub Pages repository subpaths. `.github/workflows/deploy.yml` runs tests, builds the site, uploads `dist/`, and deploys it using GitHub Pages.

## Privacy and publication

The application never imports `placement_data/` or `tab_groups.md`; neither is reachable from the built site unless a hosting setup separately publishes arbitrary repository files. Only imports reachable from `src/main.tsx` enter the Vite bundle.

The raw placement dataset remains a repository-governance concern because it already exists in Git history and includes institutional record fields. Before public publication, the repository owner must confirm authority to retain it or remove it from current and historical Git data through a deliberate, separately reviewed operation.
