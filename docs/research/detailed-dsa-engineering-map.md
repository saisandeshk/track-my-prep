# Detailed DSA and ML-interview engineering map

Implementation companion for the concepts currently assigned to the `dsa` and `engineering` domains in `src/data/concepts.ts`, audited 2026-07-26. Each section is keyed to the existing concept ID so its proposed `outcome` and checkpoints can be transcribed without interpretation.

## Evidence and access key

- **Open:** audited public material or documentation; use it directly.
- **Mixed / account-dependent:** catalog or outline is public, but lesson/practice access is not established as free.
- **Metadata-only:** a resource page proves the unit exists, but not its instructional contents; do not treat it as a verified explanation.
- **AM-150 caveat:** [AlgoMaster 150](https://algomaster.io/practice/dsa-patterns?tab=am-150) is Sai’s selected 150-problem spine. Its target page could not be rendered by the audit browser; its problem-to-concept assignments and solution access are therefore not asserted below. Use its on-page category/filter after confirming access, then record the actual problem slug in the app.

Primary DSA references are open: [DSA Handbook home](https://dsa.handbook.academy/) verifies 15 parts/120 chapters, decision pages, worked editorials, four-language solutions, and no signup. AlgoMaster’s public [DSA course outline](https://algomaster.io/learn/dsa/course-introduction) exposes an extensive list of topic lessons/problems; it is **mixed** at lesson level. Its [Python roadmap](https://algomaster.io/learn/python/course-roadmap) exposes 30 sections/392 chapters, but it is a Python course—not evidence of a separately accessible “Python for AI” unit. The public [course catalog](https://algomaster.io/courses) is **metadata-only** evidence for the AI Engineering/ML System Design courses.

## DSA & Problem Solving

### `dsa-complexity` — Complexity and invariants

**Expected outcome:** the learner can turn an English problem into input-size variables, state time and auxiliary-space bounds (including amortized behavior where relevant), name a loop/structure invariant before coding, and use it to find boundary bugs. In an interview, the learner can contrast a valid baseline with the chosen solution and defend why each pointer/queue/heap operation is counted only as often as claimed.

**Mastery checkpoints:**

1. Annotate a simple loop and a two-pointer loop with `n`, `m`, and every operation’s bound.
2. State an invariant for a scan, maintain it through one iteration, and show initialization/termination.
3. Explain amortized `append` and why nested syntax alone does not imply `O(n²)`.
4. Debug an off-by-one error by identifying which invariant first becomes false.

**Resource units:** [DSA Handbook Part 0: Foundations](https://dsa.handbook.academy/curriculum/foundations/) (**open**, 7 chapters/2h, verified metadata); [AlgoMaster DSA: course outline](https://algomaster.io/learn/dsa/course-introduction) (**mixed**, use the visible fundamentals/intro entries only after access confirmation); AM-150 (**account-dependent target**, select introductory/easy categories—no unverified problem mapping).

### `dsa-arrays-hashing` — Arrays, strings and hashing

**Expected outcome:** the learner can select direct indexing, set/map counting, sorting, or prefix aggregates based on the query and constraints; implement them without mutating inputs accidentally; and explain collision/expected-time and memory trade-offs. Interview evidence is a correct handling of duplicates, empty inputs, negative values, and prefix-sum initialization (`0 → 1` where appropriate).

**Mastery checkpoints:**

1. Implement frequency counting and an anagram/grouping solution with explicit key choice.
2. Derive a prefix-sum or prefix-xor query and justify its initial state.
3. Compare sorted-two-pointer versus hash lookup under memory and ordering constraints.
4. Diagnose a duplicate-count or missing-prefix bug with a smallest counterexample.

**Resource units:** [DSA Handbook Part 1: Linear Data Structures](https://dsa.handbook.academy/curriculum/linear-data-structures/) and [Part 3: Pointers, Window, Prefix](https://dsa.handbook.academy/curriculum/pointers-window-prefix/) (**open**); [AlgoMaster DSA: Arrays/Strings/Hash Tables outline](https://algomaster.io/learn/dsa/course-introduction) (**mixed**, public outline explicitly lists Introduction to Arrays, Introduction to Hash Tables, Frequency Counting, Group Anagrams); AM-150 (**account-dependent**, use its arrays/strings/hash-table category as displayed to Sai).

### `dsa-two-pointer-window` — Two pointers and sliding windows

**Expected outcome:** the learner can derive pointer movement from a validity/optimality invariant, distinguish fixed-size from variable-size windows, and prove the linear amortized scan. Interview evidence is narrating what the current window represents, why shrinking cannot discard the answer, and testing repeated/absent characters and invalid windows.

**Mastery checkpoints:**

1. Solve a sorted opposing-pointer problem and state why one move is safe.
2. Build a fixed-width rolling aggregate without recomputing the window.
3. Build a variable window with a frequency map and a precise shrink condition.
4. Explain why each index advances at most once; debug a stale counter/window boundary.

**Resource units:** [DSA Handbook Part 3](https://dsa.handbook.academy/curriculum/pointers-window-prefix/) (**open**, explicitly two pointers, fixed/variable windows, prefix sums); [DSA Handbook Longest Substring editorial](https://dsa.handbook.academy/editorials/longest-substring-without-repeating-characters/) (**open if route remains available; public home verifies this editorial exists**); [AlgoMaster DSA Two Pointers and Sliding Window outline](https://algomaster.io/learn/dsa/course-introduction) (**mixed**, visible introductions plus Container With Most Water, 3Sum, Longest Substring, Minimum Window); AM-150 (**account-dependent**).

### `dsa-search-intervals` — Binary search, sorting and intervals

**Expected outcome:** the learner can write a boundary-safe binary search from a monotone predicate, choose closed versus half-open interval conventions, sort with the comparator needed for a merge/sweep, and debug infinite loops and endpoint errors. Interview evidence is saying the search space, predicate, `lo/hi` invariant, and termination result aloud before implementation.

**Mastery checkpoints:**

1. Implement exact-match and first/last-true binary search using one stated convention.
2. Turn a feasibility/minimum-capacity question into binary search on answer.
3. Merge and schedule intervals after defending the sort key and touching policy.
4. Create boundary tests that catch stalled bounds, overflow-safe midpoint issues, and equal endpoints.

**Resource units:** [DSA Handbook Part 2: Search & Sort](https://dsa.handbook.academy/curriculum/search-sort/) (**open**, verified metadata: binary-search variants, sorts, quickselect); [DSA Handbook Part 10: Greedy](https://dsa.handbook.academy/curriculum/greedy/) (**open**, interval scheduling); [AlgoMaster DSA outline](https://algomaster.io/learn/dsa/course-introduction) (**mixed**, inspect its binary-search/interval modules after access); AM-150 (**account-dependent**).

### `dsa-linear-structures` — Linked structures, stacks, queues and heaps

**Expected outcome:** the learner can choose a structure from the operation contract (LIFO/FIFO/min-or-max retrieval/next greater), safely rewire linked nodes, and implement monotonic invariants. Interview evidence is explaining what order the structure preserves, why stale heap entries are safe or cleaned, and why a heap cannot replace ordered arbitrary deletion without extra machinery.

**Mastery checkpoints:**

1. Reverse/merge a linked list while preserving the unprocessed suffix.
2. Use a stack/deque to solve matching or next-greater with its monotonic invariant.
3. Implement BFS with a queue and top-k/streaming selection with a heap.
4. Debug pointer loss, deque expiry, and duplicate/stale heap-entry cases.

**Resource units:** [DSA Handbook Part 4: Stack and Queue Patterns](https://dsa.handbook.academy/curriculum/stack-queue-patterns/), [Part 5: Linked Lists](https://dsa.handbook.academy/curriculum/linked-lists/), and [Part 6: Trees and Heaps](https://dsa.handbook.academy/curriculum/trees-heaps/) (**open**); [AlgoMaster DSA outline](https://algomaster.io/learn/dsa/course-introduction) (**mixed**, public listing includes linked/stack/queue/heap topics); AM-150 (**account-dependent**).

### `dsa-trees` — Trees, BSTs and tries

**Expected outcome:** the learner can define what recursive calls return, combine child results into a node result, choose DFS/BFS, preserve BST bounds rather than only local comparisons, and use a trie where prefix operations justify its memory cost. Interview evidence includes dry-running null/single/skewed trees and explaining recursion depth and iterative alternatives.

**Mastery checkpoints:**

1. Implement preorder/inorder/postorder and level order with correct base cases.
2. Solve one subtree-aggregation problem by specifying the return contract first.
3. Validate/search a BST using propagated bounds and explain duplicates policy.
4. Implement insert/search/prefix in a trie; debug null children and shared-prefix behavior.

**Resource units:** [DSA Handbook Part 6](https://dsa.handbook.academy/curriculum/trees-heaps/) (**open**, verified: traversals, BSTs, balanced trees, heaps, tries); [DSA Handbook trie example](https://dsa.handbook.academy/) (**open**, public page exposes Ch. 12.4); [AlgoMaster DSA outline](https://algomaster.io/learn/dsa/course-introduction) (**mixed**); AM-150 (**account-dependent**).

### `dsa-graphs` — Graphs and connectivity

**Expected outcome:** the learner can model vertices/edges/direction/weights, choose adjacency representation, implement iterative or recursive traversal, detect components/cycles, derive a valid topological order, and apply union-find for connectivity. Interview evidence is a precise model before coding and an explanation of visited-state timing, recursion limits, and union-by-rank/path compression.

**Mastery checkpoints:**

1. Convert an implicit grid or dependency prompt into a graph and complexity bound.
2. Implement BFS and DFS, distinguishing visit-on-enqueue from visit-on-dequeue consequences.
3. Produce/detect failure of a topological order with indegrees.
4. Implement union-find with path compression; explain when it is preferable to traversal.

**Resource units:** [DSA Handbook Part 8: Graphs](https://dsa.handbook.academy/curriculum/graphs/) (**open**, verified metadata: BFS/DFS, topo, shortest paths, MST, union-find); [DSA Handbook patterns library](https://dsa.handbook.academy/patterns/) (**open**, public home verifies graph-routing pages); AlgoMaster DSA outline (**mixed**, exact graph units visible only after navigating the outline); AM-150 (**account-dependent**).

### `dsa-shortest-paths` — Shortest paths and spanning structures

**Expected outcome:** the learner can select BFS, DAG relaxation, Dijkstra, Bellman–Ford, Prim, or Kruskal from edge and objective assumptions; prove relaxation/greedy correctness at interview depth; and detect negative-edge/cycle or disconnected-graph failure cases. Evidence is a table that names allowed weights, target output, complexity, and counterexample for each rejected algorithm.

**Mastery checkpoints:**

1. Use BFS for unweighted shortest distance and recover a path with parents.
2. Implement Dijkstra with stale-priority-queue entry handling and explain non-negative-weight necessity.
3. Detect a negative cycle with Bellman–Ford or exploit DAG topological order.
4. Compare Kruskal/Prim and show why an MST is not all-pairs shortest paths.

**Resource units:** [DSA Handbook Part 8: Graphs](https://dsa.handbook.academy/curriculum/graphs/) (**open**, explicitly lists shortest paths and MST); [AlgoMaster DSA outline](https://algomaster.io/learn/dsa/course-introduction) (**mixed**); AM-150 (**account-dependent**, choose the displayed graph/shortest-path category only after verifying it is present).

### `dsa-backtracking-greedy` — Backtracking, divide-and-conquer and greedy

**Expected outcome:** the learner can articulate a search state, choices, constraints, base case, and undo operation; recognize when a local choice needs an exchange/stays-ahead proof; and separate divide-and-conquer recurrence reasoning from brute-force recursion. Interview evidence is pruning only when it cannot remove a valid answer and rejecting “greedy feels right” without a proof.

**Mastery checkpoints:**

1. Generate subsets/permutations without aliasing mutable paths.
2. Add a sound pruning rule and justify it with constraints/bounds.
3. State and use an exchange argument for interval scheduling or another greedy choice.
4. Trace recursion, then debug missing undo, duplicate generation, and exponential-space surprises.

**Resource units:** [DSA Handbook Part 7: Recursion and Backtracking](https://dsa.handbook.academy/curriculum/recursion-backtracking/) and [Part 10: Greedy](https://dsa.handbook.academy/curriculum/greedy/) (**open**); AlgoMaster DSA outline (**mixed**, course outline should be navigated for its backtracking/greedy modules rather than inferred); AM-150 (**account-dependent**).

### `dsa-dp` — Dynamic programming

**Expected outcome:** the learner can derive a minimal sufficient state, transition, base cases, and dependency order; write memoized and tabulated variants; and optimize space only after preserving the proof. Interview evidence is first writing the recurrence in words/math, explaining overlapping subproblems/optimal substructure, and testing boundary state plus reconstruction where required.

**Mastery checkpoints:**

1. Convert a recursive recurrence into memoization with a correctly keyed cache.
2. Translate it into tabulation in a valid dependency order.
3. Solve one each of sequence/grid/knapsack-style DP and explain state dimensionality.
4. Diagnose wrong base case, accidental state overwrite, and an invalid 1-D compression order.

**Resource units:** [DSA Handbook Part 9: Dynamic Programming](https://dsa.handbook.academy/curriculum/dynamic-programming/) (**open**, verified metadata: memo/tabulation, LIS/LCS/edit distance/knapsack/tree/graph/bitmask DP); [DSA Handbook memoization-vs-tabulation decision page](https://dsa.handbook.academy/patterns/) (**open, locate P-02 from the verified patterns library**); AlgoMaster DSA outline (**mixed**); AM-150 (**account-dependent**).

### `dsa-interview-conversion` — Timed problem solving and review

**Expected outcome:** the learner can lead a 35–45 minute problem interview: clarify inputs/constraints, produce and cost a baseline, select and state an invariant, code readable Python, test adversarial cases, and summarize trade-offs. Maintain an error log with category, failed assumption, corrected invariant, and 1/7/21-day re-solve evidence—not just completion.

**Mastery checkpoints:**

1. Deliver a five-minute problem framing and baseline before coding.
2. Solve a familiar mixed problem aloud with tests and complexity in the timebox.
3. Re-solve a prior miss cold and explain the original failure mode.
4. Complete a mock with a reviewer rubric: clarification, invariant, code, tests, communication, recovery.

**Resource units:** [DSA Handbook Part 14: Interview Framework](https://dsa.handbook.academy/curriculum/interview-framework/) (**open**, verified metadata: clarification through company flavours); [DSA Handbook editorials](https://dsa.handbook.academy/editorials/) (**open**, public home verifies worked brute-force-to-optimization walkthroughs); AM-150 (**account-dependent primary practice spine**); [PracHub](https://prachub.com/) (**mixed/public landing only; use for employer calibration, not its unverified solution depth**).

## ML Interview Engineering Essentials

### `eng-python` — Python craftsmanship

**Expected outcome:** the learner can write idiomatic, typed, testable Python for data/ML utilities; choose list/dict/set/generator and mutable/immutable boundaries deliberately; surface errors with useful exceptions; and explain complexity and memory effects. Interview evidence is a small clean module with a stable function contract, tests, type hints, iterator behavior, and an explanation of why it materializes or streams data.

**Mastery checkpoints:**

1. Implement typed functions/classes with clear mutation and exception contracts.
2. Replace accidental materialization with a generator; measure/describe the trade-off.
3. Use `dataclass`, context management, iterators, and comprehensions only where they improve clarity.
4. Debug aliasing, mutable defaults, iterator exhaustion, and exception swallowing in a small ML-data utility.

**Resource units:** [AlgoMaster Python roadmap](https://algomaster.io/learn/python/course-roadmap) (**mixed**, public metadata: 30 sections/392 chapters; visible Basics, Strings, Control Flow); [Made With ML Python](https://madewithml.com/courses/mlops/foundations/toolkit/python/) (**open, course navigation verifies Python unit**); [Python official tutorial](https://docs.python.org/3/tutorial/) (**open, primary language reference**). The catalog’s AI Engineering “Python for AI” wording is **metadata-only**, so no lesson-level assignment is claimed.

### `eng-testing-debugging` — Testing and debugging

**Expected outcome:** the learner can reduce a failing data/model/service behavior to a deterministic reproduction, state competing hypotheses, add the smallest discriminating test and a regression test, and use logs/metrics without masking root cause. Interview evidence is a concise debugging narrative: symptom → observables → hypothesis → experiment → fix → regression protection.

**Mastery checkpoints:**

1. Write unit tests around pure transformations and edge-case fixtures.
2. Add an integration test around a boundary (file/API/model artifact) and name what unit tests miss.
3. Reproduce and bisect a seeded failure with logging that retains context.
4. Add property/metamorphic checks for one parser or feature transform; prove the prior bug stays fixed.

**Resource units:** [Made With ML: Testing—Code, Data, Models](https://madewithml.com/courses/mlops/) (**open**, verified course sections); [Made With ML: Logging](https://madewithml.com/courses/mlops/) (**open**, verified navigation); [Learn Harness Engineering: E2E testing lecture](https://walkinglabs.github.io/learn-harness-engineering/en/) (**open**, verified lecture listing; agent-oriented supplement); [pytest documentation](https://docs.pytest.org/) (**open, primary tooling reference**).

### `eng-git-collaboration` — Git and engineering collaboration

**Expected outcome:** the learner can make small reviewable commits, branch and integrate safely, resolve conflicts with semantic checks, distinguish local rewriting from shared-history risk, and leave issue/PR context a reviewer can reproduce. Interview evidence is a clean repository history and an explanation of rollback/revert versus reset/rebase.

**Mastery checkpoints:**

1. Create atomic commits that each build/test and communicate intent.
2. Rebase a private branch, resolve a conflict, then run tests and inspect the diff.
3. Revert a merged change safely and explain why shared history was preserved.
4. Submit a small PR with reproduction/test notes and respond to a review request.

**Resource units:** [AlgoMaster course catalog—Git](https://algomaster.io/courses) (**metadata-only/mixed**, confirms Git course but not lesson content); [Pro Git](https://git-scm.com/book/en/v2) (**open, primary complete reference**); [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) (**open**).

### `eng-sql-data` — SQL and data handling

**Expected outcome:** the learner can model a small relational dataset, write correct joins/aggregations/window queries, reason about nulls/cardinality/transaction effects, inspect a query plan at a conceptual level, and move data into a reproducible dataframe pipeline. Interview evidence is predicting join row counts before execution and explaining the index/order trade-off rather than merely producing syntax.

**Mastery checkpoints:**

1. Write filters, aggregates, and `GROUP BY/HAVING` with null-aware expected outputs.
2. Join three tables without duplicate inflation; demonstrate the cardinality calculation.
3. Write a window-function ranking/retention query and test ties/partitions.
4. Explain an index for filter+sort, inspect a plan, and name write/storage costs.

**Resource units:** [AlgoMaster SQL roadmap](https://algomaster.io/learn/sql-interview/course-roadmap) (**mixed**, public metadata: 15 sections/136 chapters; visible foundations, querying, aggregation, joins and exercises); [CMU 15-445 schedule: Indexes, joins, query execution, planning](https://15445.courses.cs.cmu.edu/spring2026/schedule.html) (**open**, exact units #09–#16 and #17+ are public); [pandas user guide](https://pandas.pydata.org/docs/user_guide/index.html) (**open**).

### `eng-apis` — APIs and service boundaries

**Expected outcome:** the learner can design a small HTTP contract with validated schemas, status/error semantics, auth vocabulary, idempotency and timeout/retry behavior; implement and test it; and identify which guarantees belong server-side. Interview evidence is an endpoint/data/error sketch plus a failure table covering duplicate request, invalid input, dependency timeout, and authorization failure.

**Mastery checkpoints:**

1. Specify request/response schemas and validation errors before writing a handler.
2. Implement an idempotent write with a request key and test duplicate delivery.
3. Add timeout/retry behavior without retrying unsafe operations blindly.
4. Debug a client/server contract mismatch and show a regression integration test.

**Resource units:** [HLD Handbook curriculum](https://hld.handbook.academy/curriculum/) (**open**, use prerequisite/API chapters discovered from its public index); [MDN HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) (**open**); [RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) (**open, authoritative**); AlgoMaster catalog’s system-design course (**metadata-only**—do not infer API lesson coverage).

### `eng-concurrency` — Processes, threads and concurrency

**Expected outcome:** the learner can choose processes, threads, async I/O, or a queue-based design from workload and isolation needs; identify shared invariants and synchronization; reproduce a race; and explain throughput, latency, blocking, memory visibility and deadlock trade-offs. Interview evidence is a tiny concurrent program with a deterministic test/harness and a written argument for its synchronization boundary.

**Mastery checkpoints:**

1. Contrast process, thread and coroutine execution/memory models for a concrete workload.
2. Implement a producer-consumer queue and state its safety/liveness conditions.
3. Reproduce and fix a race with a lock or message-passing redesign; test repeatedly.
4. Explain why async helps I/O-bound concurrency but does not accelerate CPU work by itself.

**Resource units:** [Cornell Parallel roadmap](https://cvw.cac.cornell.edu/Parallel/) (**open**, eight verified topics); [Cornell Program Design](https://cvw.cac.cornell.edu/parallel/program-design/develop-program) (**open**, data/functional parallelism); [CS 162 schedule](https://cs162.org/) (**open**, use Threads and synchronization units; full course is advanced); [Python `asyncio` docs](https://docs.python.org/3/library/asyncio.html) (**open**); AlgoMaster concurrency course (**metadata-only in catalog**).

### `eng-containers-ci` — Containers, CI and deployment vocabulary

**Expected outcome:** the learner can package a small API/model service reproducibly, separate image from runtime configuration/secrets, pin dependencies, write a CI gate that runs tests/lint/build, and explain rollout/rollback criteria. Interview evidence is a working container build plus a CI workflow and a release checklist that refuses deployment on a failed quality signal.

**Mastery checkpoints:**

1. Containerize a small service with a deterministic build and non-root runtime where feasible.
2. Demonstrate environment/config/secrets separation and reproduce the service from a clean checkout.
3. Create CI for tests, lint/type check, build, and artifact publication policy.
4. Simulate a bad release; explain rollback versus roll-forward and the stopping signal.

**Resource units:** [AI Infrastructure curriculum repository](https://github.com/ai-infra-curriculum/ai-infra-engineer-learning) (**open**, verified repository/modules/labs; use modules 103 Containerization and 104 Kubernetes only after confirming current files); [Docker Get Started](https://docs.docker.com/get-started/) (**open**); [Made With ML—CI/CD workflows](https://madewithml.com/courses/mlops/) (**open, verified course section**).

### `eng-operational-readiness` — Operational engineering

**Expected outcome:** the learner can instrument a small service with structured logs, metrics, traces/correlation IDs, health checks and actionable alerts; write an SLI/SLO/error-budget sketch; protect secrets/config; and author a runbook that makes safe diagnosis possible. Interview evidence is a dashboard/alert/runbook triad that distinguishes user harm from internal noise and names owner/action.

**Mastery checkpoints:**

1. Add structured request logs with correlation ID and no secret/PII leakage.
2. Define one latency, availability, and saturation signal tied to a user outcome.
3. Trace a synthetic failure across logs/metrics and update a runnable runbook.
4. Set an alert threshold and escalation/rollback action; explain false-positive and false-negative costs.

**Resource units:** [HLD Handbook—Reliability and Operations](https://hld.handbook.academy/curriculum/) (**open**, verified 11 chapters/5h, including observability, SLOs, resilience, incident management); [AI Infrastructure curriculum](https://github.com/ai-infra-curriculum/ai-infra-engineer-learning) (**open**, verified monitoring module/labs exist; exercise completeness varies); [Made With ML—Monitoring](https://madewithml.com/courses/mlops/) (**open, verified section); [OpenTelemetry documentation](https://opentelemetry.io/docs/) (**open**).

## Transcription rule

When these proposals are implemented in the data model, preserve the source-access labels. For `algomaster-150`, link the stable sheet URL and record the actual category/problem only after Sai sees it. For AlgoMaster courses, individual unit names from a public outline may be cited as **mixed**, but neither premium availability nor explanation quality should be inferred. Open Handbook, Cornell, CMU, official-doc, and Made With ML links can be used as direct reading/build assignments.
