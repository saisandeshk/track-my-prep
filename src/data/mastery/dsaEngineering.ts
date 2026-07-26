import type { EvidenceType } from "../../types";

export type DsaEngineeringMastery = Record<
  string,
  {
    outcome: string;
    checkpoints: Array<{
      level: "understand" | "apply" | "debug" | "interview";
      prompt: string;
      evidence: EvidenceType[];
    }>;
  }
>;

const checkpoints = (
  understand: string,
  apply: string,
  debug: string,
  interview: string,
  evidence: EvidenceType[] = ["solve", "explain"]
): DsaEngineeringMastery[string]["checkpoints"] => [
  { level: "understand", prompt: understand, evidence: ["explain"] },
  { level: "apply", prompt: apply, evidence },
  { level: "debug", prompt: debug, evidence: ["debug", "implement", "explain"] },
  { level: "interview", prompt: interview, evidence: ["mock", "solve", "explain"] }
];

export const dsaEngineeringMastery: DsaEngineeringMastery = {
  "dsa-complexity": {
    outcome:
      "State input-sensitive time and space bounds, including amortized behavior, and make the invariant that proves correctness explicit. Use that invariant to expose a boundary bug and defend the selected approach against a baseline in an interview.",
    checkpoints: checkpoints(
      "Explain why nested pointer loops can be linear.",
      "Annotate a solution with its invariant and O(time)/O(space).",
      "Find the first iteration that violates a scan invariant.",
      "Defend a baseline and optimized bound aloud before coding."
    )
  },
  "dsa-arrays-hashing": {
    outcome:
      "Choose indexing, hashing, sorting, or prefix aggregation from constraints and implement duplicate-safe solutions. Explain expected hashing cost and test initialization, empty input, and negative-value cases.",
    checkpoints: checkpoints(
      "Explain map/set versus sorted lookup trade-offs.",
      "Implement frequency and prefix-sum/hash solutions.",
      "Fix a duplicate count or missing-prefix initialization bug.",
      "Derive and communicate a linear array/hash solution with edge tests."
    )
  },
  "dsa-two-pointer-window": {
    outcome:
      "Derive pointer movement from a fixed or variable-window invariant rather than memorizing a template. Prove amortized linear work and debug stale counts or invalid shrink conditions.",
    checkpoints: checkpoints(
      "State the meaning of every window boundary.",
      "Implement opposing pointers and a variable frequency window.",
      "Repair a stale counter or left-boundary error.",
      "Explain why each pointer move is safe while coding a timed solution."
    )
  },
  "dsa-search-intervals": {
    outcome:
      "Define a monotone predicate and a single interval convention, then implement binary search and ordering-based interval solutions without ambiguity. Diagnose endpoint, termination, and comparator bugs.",
    checkpoints: checkpoints(
      "State first-true binary-search invariants.",
      "Implement binary-search-on-answer and interval merge.",
      "Fix an infinite loop or touching-interval policy error.",
      "Explain predicate, bounds, and complexity before a timed implementation."
    )
  },
  "dsa-linear-structures": {
    outcome:
      "Choose linked lists, stacks, queues/deques, and heaps from the operation that must remain cheap. Preserve pointer and monotonic invariants and handle stale heap entries deliberately.",
    checkpoints: checkpoints(
      "Name each structure’s ordering guarantee.",
      "Implement list rewiring, monotonic stack, BFS queue, and top-k heap.",
      "Fix pointer loss, expired deque items, or stale heap entries.",
      "Justify the chosen structure and its complexity under questioning."
    )
  },
  "dsa-trees": {
    outcome:
      "Make recursive return contracts explicit, combine subtree information, and select DFS/BFS, BST bounds, or tries appropriately. Test null, skewed, and duplicate-policy cases and explain stack-depth trade-offs.",
    checkpoints: checkpoints(
      "Explain traversal order and recursive base cases.",
      "Implement subtree aggregation, BST validation, and trie prefix search.",
      "Repair a null/base-case or local-only BST validation bug.",
      "Derive a tree solution by stating what each call returns aloud."
    )
  },
  "dsa-graphs": {
    outcome:
      "Model a prompt as vertices, edges, direction, and state, then choose traversal, topological sorting, or union-find intentionally. Explain visit timing, cycle behavior, and representation complexity.",
    checkpoints: checkpoints(
      "Model a grid and dependency prompt as graphs.",
      "Implement BFS/DFS, topo sort, and union-find.",
      "Fix duplicate visitation, cycle, or parent-compression errors.",
      "Defend graph model and traversal choice in a timed interview."
    )
  },
  "dsa-shortest-paths": {
    outcome:
      "Match edge assumptions and objectives to BFS, DAG relaxation, Dijkstra, Bellman–Ford, Prim, or Kruskal. Explain counterexamples for invalid choices and reason about disconnected/negative-edge cases.",
    checkpoints: checkpoints(
      "Make an algorithm-selection table by edge constraints.",
      "Implement BFS distance and Dijkstra with stale entries.",
      "Diagnose negative-edge misuse or disconnected-graph handling.",
      "Explain why the selected path/MST algorithm is correct and alternatives fail."
    )
  },
  "dsa-backtracking-greedy": {
    outcome:
      "Define a backtracking state, choices, constraints, base case, and undo, while requiring a proof for greedy choices. Identify unsound pruning and mutable-state duplication bugs.",
    checkpoints: checkpoints(
      "Describe search-tree state and an exchange argument.",
      "Implement subsets/permutations and an interval greedy solution.",
      "Fix missing undo, duplicate output, or unsound pruning.",
      "Contrast exhaustive and greedy approaches with a correctness argument."
    )
  },
  "dsa-dp": {
    outcome:
      "Derive minimal state, recurrence, base cases, and dependency order before choosing memoization or tabulation. Optimize memory only after preserving the transition proof and diagnose overwrite/base-case defects.",
    checkpoints: checkpoints(
      "Write state and transition in words before code.",
      "Implement memoized then bottom-up sequence/grid DP.",
      "Fix base cases, cache keys, or invalid 1-D update order.",
      "Walk an interviewer from brute force to recurrence to complexity."
    )
  },
  "dsa-interview-conversion": {
    outcome:
      "Run a structured coding interview loop from clarification through baseline, invariant, implementation, tests, and trade-offs. Keep spaced re-solve evidence that identifies and corrects recurring failure modes.",
    checkpoints: checkpoints(
      "Give a five-minute clarification and baseline narrative.",
      "Complete a familiar problem aloud in a fixed timebox.",
      "Re-solve a prior miss and explain the original failure.",
      "Complete a mixed mock with rubric evidence and a revision plan."
    )
  },
  "eng-python": {
    outcome:
      "Write clear Python for data preparation, evaluation, and API payloads while choosing collections deliberately and avoiding mutation, truthiness, and readability traps. Explain the time and space behavior of ordinary Python operations rather than treating the language as cost-free syntax.",
    checkpoints: checkpoints(
      "Choose between list, tuple, set, and dict for four AI-data examples, explaining ordering, mutability, and lookup consequences.",
      "Refactor a small preprocessing loop using appropriate comprehensions, unpacking, slicing, and iteration helpers without making it cryptic.",
      "Diagnose bugs caused by a mutable default argument, an incorrect truthiness check, and accidental aliasing.",
      "Implement and narrate a text-processing utility, including edge cases and the complexity of its collection operations.",
      ["implement", "debug", "explain"]
    )
  },
  "eng-testing-debugging": {
    outcome:
      "Turn an ambiguous failure into a deterministic reproduction, competing hypotheses, discriminating test, and regression test. Use logs and observability without obscuring the root cause.",
    checkpoints: checkpoints(
      "Distinguish unit, integration, and property tests.",
      "Write a fixture-driven test around a data or service boundary.",
      "Reduce a flaky failure and add its regression test.",
      "Narrate symptom-to-fix diagnosis with evidence and trade-offs.",
      ["implement", "debug"]
    )
  },
  "eng-git-collaboration": {
    outcome:
      "Produce small reviewable commits, safely integrate branches, and recover from shared-history mistakes without data loss. Explain the operational difference between rebase, revert, reset, and merge.",
    checkpoints: checkpoints(
      "Explain private versus shared history rewrite risk.",
      "Create atomic commits and resolve a tested conflict.",
      "Recover from an incorrect merged change using a safe revert.",
      "Present a reviewable PR history and explain integration choices.",
      ["implement", "explain"]
    )
  },
  "eng-sql-data": {
    outcome:
      "Write correct relational queries and reason about cardinality, nulls, windows, indexing, and execution costs. Connect SQL extraction to reproducible dataframe/ML data handling.",
    checkpoints: checkpoints(
      "Predict join cardinality and null behavior.",
      "Write aggregate, multi-join, and window queries.",
      "Fix duplicate multiplication or incorrect grouping results.",
      "Explain an index/query-plan trade-off for an interview prompt."
    )
  },
  "eng-apis": {
    outcome:
      "Design and implement a small service boundary with schemas, validation, status/error semantics, idempotency, and failure-aware clients. Identify server-side guarantees and test contract failures end-to-end.",
    checkpoints: checkpoints(
      "Specify request, response, and error contracts.",
      "Implement a validated, idempotent endpoint.",
      "Fix a timeout/retry or client-server schema mismatch.",
      "Defend API boundary and failure table in an interview.",
      ["design", "implement"]
    )
  },
  "eng-concurrency": {
    outcome:
      "Choose processes, threads, async I/O, or message passing from workload, isolation, and synchronization needs. Reproduce and fix a race and articulate safety, liveness, throughput, and blocking trade-offs.",
    checkpoints: checkpoints(
      "Contrast process/thread/coroutine memory and scheduling.",
      "Implement a producer-consumer boundary with stated invariants.",
      "Reproduce a race and fix it with synchronization or redesign.",
      "Choose and defend a concurrency model for a workload prompt.",
      ["implement", "debug"]
    )
  },
  "eng-containers-ci": {
    outcome:
      "Package a service reproducibly, separate build artifacts from runtime config/secrets, and enforce tests/build checks in CI. Explain safe rollout and rollback signals.",
    checkpoints: checkpoints(
      "Explain image versus runtime configuration.",
      "Containerize a small service from a clean checkout.",
      "Fix a non-reproducible build or failed CI gate.",
      "Present deployment, rollback, and stopping criteria for a release.",
      ["implement", "debug"]
    )
  },
  "eng-operational-readiness": {
    outcome:
      "Instrument a small service with safe structured logs, metrics, traces, health checks, alerts, and a practical runbook. Connect SLIs/SLOs to user harm and explain incident actions.",
    checkpoints: checkpoints(
      "Define user-facing SLI, SLO, and error-budget vocabulary.",
      "Add correlation-aware logs and an actionable metric.",
      "Trace a synthetic failure and improve a runbook/alert.",
      "Defend an operational dashboard and incident response in an interview.",
      ["design", "implement"]
    )
  }
};
