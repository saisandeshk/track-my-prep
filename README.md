# Track My Prep

A calm, evidence-based learning map and daily tracker for technical preparation.

Track My Prep turns a large resource collection into one canonical route through DSA, software engineering, system design, machine learning, deep learning, LLMs, generative AI, ML systems, and agentic AI. It tracks what a learner can **solve, explain, implement, debug, design, or demonstrate in a mock**—not which links they opened.

## What is included

- 13 equally developed domains with strict recommended paths
- Shared prerequisite graph: a concept such as probability or attention is stored once and reused across paths
- 111 concepts with outcomes, weights, four evidence-labelled mastery checkpoints, audited resources, and coverage status
- 89 audited course chapters, assignments, problem sets, projects, references, and video units mapped to concepts
- A six-part AlgoMaster-first Python-for-AI path instead of one oversized “Python” checkbox
- AlgoMaster 150 as the primary DSA practice spine
- 22 curated video or video-chapter mappings from CS336, Jia-Bin Huang, EleutherAI, and the FlashAttention/Triton build
- Dashboard, domain explorer, concept detail, daily tracker, revision queue, resource audit, and settings/data views
- Separate coverage and readiness signals with transparent revision discounting
- Versioned local JSON export/import and no backend, account, API key, or cloud database
- Static GitHub Pages deployment workflow
- Tests for progress math, revision behavior, import validation, graph integrity, and content assumptions

## Run locally

Requirements: Node.js 22 LTS and npm.

```bash
npm install
npm run dev
```

Then open the URL printed by Vite.

Quality commands:

```bash
npm run typecheck
npm test
npm run build
```

The production output is written to `dist/`.

## Privacy and data boundaries

Canonical curriculum data in `src/data/` is public repository content. Personal mastery, evidence, goals, reflections, and sessions are stored in browser `localStorage` under `track-my-prep:user-data:v1`.

- No personal progress is transmitted by the application.
- Browser storage is local to that browser profile and device.
- Clearing site data removes progress unless it was exported.
- Imports are runtime-validated and must use schema version `1`.
- Reset affects local user data only; it does not change the curriculum.

The repository’s historical `placement_data/` input is **not imported by the application and is not included in the Vite bundle**. It was used only for aggregate, lightweight reality checking. Before making a repository public, its owner should separately confirm that retaining raw institutional placement exports and private saved URLs is permitted; application-level privacy cannot remove files already committed to Git history.

See [Architecture](docs/architecture.md) for the complete boundary.

## Curriculum model

The canonical content uses five main TypeScript collections:

- `domains`: identity, description, guiding mastery question, display color, and the strict ordered `path`
- `concepts`: stable ID, scope, domain links, optional parents, prerequisites, importance weight, evidence types, tags, resources, practice links, and content-coverage status
- `resources`: source group, access status, modes, depth, effort, assumptions, audit note, role, and selection rationale
- `mastery/*`: concept-specific expected outcomes and four escalating `understand`, `apply`, `debug`, and `interview` checkpoints
- `resource-units/*`: exact chapters, lessons, assignments, problem sets, notebooks, projects, references, videos, and timestamped video chapters

Path order and prerequisites solve different problems. A domain path makes the next recommended step unambiguous; prerequisites express reusable knowledge relationships across domains.

### Adding or updating content

1. Add or update a resource in `src/data/resources.ts`. Preserve audit date and access limitations. Mark an external addition as `added_recommendation` and state the exact gap it fills.
2. Add or update a concept in `src/data/concepts.ts` with a stable kebab-case ID. If a concept supports several domains, reuse its ID rather than copying it.
3. Add a mastery entry in the appropriate `src/data/mastery/` file. Its outcome should describe theory, application and failure diagnosis; its four checkpoints must require observable evidence rather than recall alone.
4. Add one or more exact mappings in `src/data/resource-units/`. Use the deepest stable official URL available and record role, effort, prerequisites, audit confidence and audit date. Do not copy third-party problem statements or lessons.
5. Add the concept ID to the appropriate ordered path(s) in `src/data/domains.ts`. Every path membership must have a matching `domainIds` link.
6. Run `npm test`. The validator rejects missing IDs, invalid mappings, timestamps, domain mismatches, duplicate IDs and prerequisite cycles; the content test requires every concept to have rich mastery guidance and an exact unit.
7. Run `npm run build` before submitting the change.

Resource-unit audit confidence is deliberately explicit:

- `content_verified`: the relevant public content or detailed official description was inspected
- `outline_verified`: the official outline supports the mapping, but the full lesson was not inspected
- `metadata_only`: only catalog, title, description, or playlist metadata supports the claim
- `gated`: the intended unit requires access the audit did not possess

Content statuses are deliberately honest:

- `verified`: the current concept mapping has a defensible explanation resource
- `partial`: useful coverage exists but an important dimension remains incomplete
- `resource_gap`: no suitable explanation resource has been verified
- `practice_gap`: explanation exists but appropriate practice is missing
- `gated`: the intended resource cannot be fully audited without access

## Coverage, readiness, and revision

Coverage is the weighted share of concepts meaningfully started. Readiness uses the demonstrated mastery level, evidence breadth, concept weight, and revision freshness. Percentages are rounded to five-point steps and paired with plain-language bands to avoid false precision.

Opening a resource never changes mastery. Logging practice, implementation, revision, or a mock records the corresponding evidence; the learner can then set the strongest mastery level they can defend.

`needs review` is derived and does not overwrite mastery. The configurable base interval is shorter while learning and longer for interview-ready evidence. Overdue concepts receive a visible readiness discount until revised.

## Resource research

The saved catalog was audited in parallel, with broad `Overall-Prep` resources inspected first:

- [Overall preparation and DSA audit](docs/research/overall-dsa-audit.md)
- [Systems and ML systems audit](docs/research/systems-mlsys-audit.md)
- [AI domains audit](docs/research/ai-domains-audit.md)
- [Detailed DSA and engineering map](docs/research/detailed-dsa-engineering-map.md)
- [Detailed systems map](docs/research/detailed-systems-map.md)
- [Detailed AI map](docs/research/detailed-ai-map.md)
- [Selection summary](docs/resource-audit.md)

Gated, JavaScript-only, missing, private, and catalog-only sources are labeled instead of inferred. The app carries the selected resource set; the detailed audit retains rejected/overlapping links and rationale.

## GitHub Pages

The included workflow builds and deploys the static site on pushes to `master` or `main`.

1. In the GitHub repository, open **Settings → Pages**.
2. Set the source to **GitHub Actions**.
3. Push the repository. The workflow runs tests and a production build before deployment.

Vite uses a relative asset base and the application uses hash routes, so it works under a repository subpath without server rewrites.

## Design principles

- One canonical path, not competing roadmaps
- Domain-based and evergreen, not job-title-driven
- Depth and revision over checkbox volume
- Calm pacing without streak guilt
- Honest gaps over fabricated completeness
- Public curriculum, private learner state

The curriculum is intentionally editable. It should improve as resources change and deeper audits become available without requiring application rewrites.
