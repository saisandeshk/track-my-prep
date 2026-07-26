# Build brief: Personal Learning Map and Daily Tracker

You are a senior product engineer, learning-systems designer, curriculum researcher, and information architect. Build this project in the current repository. Work autonomously: inspect the repository, make justified decisions, implement the result, verify it, and leave clear documentation. Do not stop to ask me for a weekly timetable or a target job title.

## Product intent

Build a polished, public GitHub project whose primary user is me: a Maths and Computing student preparing for ML/DL/AI-oriented technical roles and building a long-term learning system. It must also be coherent enough that it could eventually serve other self-directed technical learners.

This is **not** a course platform, a clone of LeetCode/AlgoMaster/Deep-ML, a generic habit tracker, or a placement-only planner. It is a **personal learning map and execution tracker**:

> Given a concept, I should see the recommended path to it, prerequisites, the best learning resource, a practical exercise where appropriate, short mastery/interview checkpoints, and my actual study/revision history.

The curriculum must be evergreen and domain-based. Placement data may be used only as light reality checking; it must not drive the architecture or narrow the curriculum.

## Non-negotiable learning principles

1. Keep a canonical, strict curated path. Do not generate multiple competing roadmaps or a rigid calendar syllabus.
2. Represent knowledge as an editable map rather than a flat checklist. Concepts can have prerequisites and may belong to more than one domain without being duplicated.
3. A resource is a means of learning, not proof of mastery. Track concept mastery independently of resource completion.
4. Do not recreate or copy third-party course/problem content. Store titles, links, topic tags, and original short checkpoints only.
5. Progress must reward depth and revision, not easy checkbox completion. Clearly distinguish **coverage** from **readiness**.
6. Include all requested domains in the initial release, with a real hierarchy and recommended ordering. Transparently mark any concept whose resource/practice coverage is incomplete instead of pretending the map is complete.
7. The daily tracker needs flexible per-domain pace goals and a record of what was actually done today. It must not force a week-by-week or month-by-month syllabus.

## Initial domain scope

Create a coherent top-level taxonomy. These are required; improve names and grouping where it avoids overlap:

- DSA and problem solving
- ML interview engineering essentials (a deliberately narrow engineering foundation, not a full Core CS degree): Python craftsmanship, complexity, testing, Git, APIs, SQL/data handling, basic processes/threads/memory where useful, deployment vocabulary, and practical databases/networking only as needed for ML systems
- System-design foundations
- High-level system design (HLD)
- Low-level system design (LLD)
- ML system design
- Generative-AI system design
- Core machine learning and data science
- Core deep learning
- Core LLMs
- Core generative AI beyond LLMs where relevant
- Core ML systems
- Agentic AI

Model relationships explicitly. For example, probability/statistics may support ML, data science, and LLM evaluation; transformers can support DL, LLMs, and generative AI; distributed systems concepts can support HLD and ML systems. Do not create three independent copies of the same concept.

For each concept, include at least: stable ID, name, concise scope, parent/domain links, prerequisites, ordered successor/path position, importance/weight, expected outcome, tags, resource links, practice/build links when appropriate, checkpoint questions, and content-coverage status. Keep the granularity useful: for DSA, track patterns such as two pointers, sliding window, binary search, trees, graphs, shortest paths, and DP—not a hand-authored copy of every problem from a problem sheet.

## Inputs and research requirements

Inspect these repository inputs before designing the resource map:

- `tab_groups.md`: the existing saved-resource catalogue; this is the preferred initial resource library.
- `placement_data/`: optional, light reference only. Do not make it a prerequisite for the app and do not let its current job list decide the learning domains.

Audit the saved links deeply rather than relying only on their descriptions. For each accessible resource, determine from the source:

- concepts and depth actually covered
- learning mode: explanation, reference, practice, implementation, project, interview prep, or tooling
- prerequisites, language/framework assumptions, and rough effort
- whether it is suitable as a primary resource, a supplement, or reference-only
- overlap with the other saved resources
- useful direct links to exact modules/problems when available

For gated, private, broken, or JavaScript-only links, record the access limitation honestly; do not fabricate their contents. Prefer the existing library, but if it has a real gap, add a **small number** of high-quality external resources. Mark every addition as `added_recommendation`, explain the specific gap it fills, and prefer stable, primary/official or respected open educational sources. Do not add links merely to make the resource list look comprehensive.

Use Deep-ML and similar sources as the intended model for practical mapping: e.g., a Multi-Head Attention concept can point to an explanation resource, a direct implementation problem, and original checkpoint questions. The application should link out to that problem; it must not reproduce its statement or solution.

## Product and technical requirements

First inspect the existing codebase and preserve anything relevant. If no compatible application exists, create a static-first application using **React + TypeScript + Vite + Tailwind CSS** (or retain an existing equivalent stack if clearly preferable). It must be deployable as a static public site, including GitHub Pages.

Use a maintainable, agent-editable content architecture:

- Version-control the canonical domain map, concepts, curated paths, resources, checkpoints, and coverage metadata as well-structured JSON/TypeScript/Markdown content in the repository.
- Keep user-specific daily activity and mastery state private by default in browser local storage.
- Provide JSON export and import for user progress, and clear wording that browser storage is local to that device.
- Do not require a backend, login, API key, or cloud database in v1. Design the data boundaries so cloud sync can be added later without changing the canonical curriculum schema.

Design a responsive, accessible interface with these views:

1. **Home dashboard**: today’s goals, quick study-log action, active domains, recent activity, revision due, coverage versus readiness, and gentle next recommended concepts.
2. **Domain explorer**: visual hierarchy or compact map, strict ordered learning path, progress/readiness per concept, prerequisite relationships, and filters for status/content coverage.
3. **Concept detail**: scope, why it matters, prerequisites, primary resource, supplementary and direct practice/build links, checkpoints, interview/revision checklist, mastery controls, and personal history.
4. **Daily tracker**: log one or more sessions with domain/concepts, activity type (`learn`, `practice`, `implement`, `revise`, `mock`), time, short reflection, confidence, and next action. Support configurable daily minute/effort goals per active domain; show goal versus actual without guilt-oriented streak mechanics.
5. **Revision and interview checklist**: show concepts needing review, last revised date, mastery state, and concise domain-specific interview questions. It should work as a last-minute review view.
6. **Resource library**: show the audit and mapping from resources to concepts, source group, access status, purpose, overlap/selection rationale, and whether it is preferred, supplementary, reference-only, or an added recommendation.
7. **Settings/data**: manage active domains and daily goals; export/import/reset only the local user data, with a clear confirmation for destructive actions.

Use readable language, keyboard-accessible controls, empty states, loading/error states, and mobile-friendly layouts. Make the UI feel focused and calm rather than like a gamified productivity dashboard.

## Mastery, progress, and revision model

Implement a small transparent mastery model, for example:

- `not_started`
- `learning`
- `practiced`
- `can_explain`
- `implemented`
- `interview_ready`
- `needs_review`

Do not claim a user knows a concept because they opened a link. The concept card and status changes should connect to observable evidence: solve, explain, implement, debug, design, or perform in a mock interview.

Compute and display both:

- **Coverage**: weighted portion of concepts the user has meaningfully started.
- **Readiness**: weighted depth of demonstrated mastery, discounted when a learned concept has not been revised for a sensible configurable interval.

Keep the scoring explainable in the UI and documentation. Do not present pseudo-precise or misleading percentages. Use concept weights so foundational/high-value topics count more than minor items. Revision due dates should be helpful suggestions based on state/history, not a rigid schedule.

## Content quality requirements

- Supply an initial, genuinely useful set of concepts and checkpoints for every required domain; do not leave the UI populated with filler examples or `TODO` items.
- Keep content concise enough to navigate. Link to depth rather than putting full lecture notes into the repository.
- Give each major concept one preferred explanation resource and, where meaningful, a practical resource. Retain alternatives only when their role is clearly distinct.
- Every checkpoint must be short and original, capable of testing understanding or prompting an implementation/design explanation.
- Make dependencies and ordering defensible. A strict path can have optional advanced branches, but it must always make the next recommended step clear.
- Do not use job-title targeting as an input to select the curriculum. This system is intentionally useful both now and years later.

## Deliverables

Implement the functioning application and add:

- `README.md` documentation covering product intent, setup, local-data privacy, deployment, content schema, and how an agent or contributor can add/update a domain, concept, resource, checkpoint, or curated path.
- A concise research/audit document explaining resource selections, access limitations, gaps, and added recommendations.
- Clearly named curriculum/content data files with stable IDs and comments/documentation where necessary.
- A short architecture document explaining the separation between public canonical content and private local progress.
- Basic tests for progress/readiness/revision calculations and critical data-schema assumptions.

## Execution expectations

1. Start by inspecting the repository and its existing files.
2. Create a concise implementation plan internally, then execute it; do not wait for approval unless a truly blocking ambiguity arises.
3. Audit resources before finalizing content selections. Do not invent source coverage.
4. Build the app and content together so every major UI view has meaningful real data.
5. Run formatting, type checks, tests, and a production build. Fix failures.
6. In the final handoff, state exactly what was implemented, how to run it, what data remains intentionally incomplete, and the highest-value next content expansions.

Success means I can open the app, choose a domain such as Core LLMs or DSA, follow a clean recommended concept path, use the best relevant links from my own collection, perform a linked exercise, log today’s study, see believable progress and revision needs, and later update the map through an agent without rewriting the application.
