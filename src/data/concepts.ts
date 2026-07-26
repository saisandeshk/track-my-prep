import type {
  CheckpointLevel,
  Concept,
  ContentCoverage,
  EvidenceType,
  MasteryCheckpoint
} from "../types";
import { masteryByConceptId } from "./mastery";

type CheckpointInput =
  | string
  | {
      level: CheckpointLevel;
      prompt: string;
      evidence?: EvidenceType[];
    };

interface ConceptInput {
  id: string;
  name: string;
  scope: string;
  domains: string[];
  prerequisites?: string[];
  parents?: string[];
  weight?: 1 | 2 | 3;
  outcome: string;
  evidence?: EvidenceType[];
  tags: string[];
  resources: string[];
  practice?: string[];
  checkpoints: [CheckpointInput, CheckpointInput, ...CheckpointInput[]];
  coverage?: ContentCoverage;
}

const checkpointLevelFor = (index: number, total: number): CheckpointLevel => {
  if (index === 0) return "understand";
  if (index === total - 1) return "interview";
  if (index === 2 && total >= 4) return "debug";
  return "apply";
};

const checkpointEvidenceFor = (
  level: CheckpointLevel,
  supported: EvidenceType[]
): EvidenceType[] => {
  if (level === "understand") return ["explain"];
  if (level === "interview") {
    return supported.includes("mock")
      ? ["explain", "mock"]
      : supported.includes("design")
        ? ["explain", "design"]
        : ["explain"];
  }
  if (level === "debug" && supported.includes("debug")) return ["debug"];
  const practical = supported.filter((item) => item !== "explain" && item !== "mock");
  return practical.length ? practical.slice(0, 2) : ["explain"];
};

const buildCheckpoints = (
  inputs: CheckpointInput[],
  supported: EvidenceType[]
): MasteryCheckpoint[] =>
  inputs.map((input, index) => {
    const fallbackLevel = checkpointLevelFor(index, inputs.length);
    if (typeof input === "string") {
      return {
        level: fallbackLevel,
        prompt: input,
        evidence: checkpointEvidenceFor(fallbackLevel, supported)
      };
    }
    return {
      level: input.level,
      prompt: input.prompt,
      evidence: input.evidence ?? checkpointEvidenceFor(input.level, supported)
    };
  });

const concept = ({
  id,
  name,
  scope,
  domains,
  prerequisites = [],
  parents = [],
  weight = 2,
  outcome,
  evidence = ["explain", "implement"],
  tags,
  resources,
  practice = [],
  checkpoints,
  coverage = "verified"
}: ConceptInput): Concept => {
  const mastery = masteryByConceptId.get(id);
  return {
    id,
    name,
    scope,
    domainIds: domains,
    parentIds: parents,
    prerequisiteIds: prerequisites,
    weight,
    outcome: mastery?.outcome ?? outcome,
    evidence,
    tags,
    resourceIds: resources,
    practiceResourceIds: practice,
    checkpoints: mastery?.checkpoints ?? buildCheckpoints(checkpoints, evidence),
    contentCoverage: coverage
  };
};

const mathematicalFoundations: Concept[] = [
  concept({
    id: "math-linear-algebra",
    name: "Linear algebra for models",
    scope:
      "Vectors, matrices, bases, projections, eigendecomposition, SVD and tensor shapes as used by learning systems.",
    domains: ["core-ml", "deep-learning", "llms", "generative-ai"],
    weight: 3,
    outcome:
      "Reason about representations and implement common matrix operations with correct shapes.",
    evidence: ["explain", "implement", "solve"],
    tags: ["math", "foundations", "tensors"],
    resources: ["d2l", "nptel-ml-math"],
    practice: ["deep-ml"],
    checkpoints: [
      "Why is an orthogonal projection the closest point in a subspace?",
      "Explain what the singular values of a data matrix reveal."
    ]
  }),
  concept({
    id: "math-probability",
    name: "Probability and estimation",
    scope:
      "Random variables, common distributions, expectation, conditional probability, Bayes’ rule, likelihood and uncertainty.",
    domains: ["core-ml", "deep-learning", "llms", "generative-ai", "ml-system-design"],
    weight: 3,
    outcome: "Translate modeling assumptions into probability statements and diagnose uncertainty.",
    evidence: ["explain", "solve", "implement"],
    tags: ["math", "probability", "uncertainty"],
    resources: ["d2l", "nptel-ml-math"],
    practice: ["deep-ml"],
    checkpoints: [
      "When do maximum likelihood and maximum a posteriori estimates differ?",
      "Give an example where accuracy hides uncertainty or class imbalance."
    ]
  }),
  concept({
    id: "math-optimization",
    name: "Calculus and optimization",
    scope:
      "Gradients, Jacobians, chain rule, convexity, first-order optimization and numerical stability.",
    domains: ["core-ml", "deep-learning", "llms", "generative-ai"],
    weight: 3,
    outcome: "Derive a learning objective’s gradients and identify optimization failure modes.",
    evidence: ["explain", "solve", "implement", "debug"],
    tags: ["math", "optimization", "gradients"],
    resources: ["d2l", "udl", "nptel-ml-math"],
    practice: ["deep-ml"],
    checkpoints: [
      "Derive the gradient of mean-squared error for a linear model.",
      "Why can a numerically correct gradient still lead to poor training?"
    ]
  }),
  concept({
    id: "evaluation-experimentation",
    name: "Evaluation and experimentation",
    scope:
      "Baselines, data splits, leakage, metrics, uncertainty, ablations and reproducible comparisons.",
    domains: ["core-ml", "ml-system-design", "genai-system-design", "agentic-ai"],
    weight: 3,
    outcome: "Design an evaluation that supports a trustworthy product or modeling decision.",
    evidence: ["explain", "design", "implement"],
    tags: ["evaluation", "experiments", "metrics"],
    resources: ["made-with-ml", "sklearn-guide", "mlsysbook"],
    checkpoints: [
      "How would you detect leakage that occurs before the train/test split?",
      "What decision will your metric support, and what can it fail to measure?"
    ]
  })
];

const dsaConcepts: Concept[] = [
  concept({
    id: "dsa-complexity",
    name: "Complexity and invariants",
    scope:
      "Asymptotic time/space, amortized analysis and the loop or data-structure invariant that makes a solution correct.",
    domains: ["dsa", "engineering"],
    prerequisites: [],
    weight: 3,
    outcome: "State a solution invariant and defend its complexity before coding.",
    evidence: ["explain", "solve"],
    tags: ["complexity", "correctness"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "Why can two nested loops still run in linear time?",
      "What invariant proves your current two-pointer solution correct?"
    ]
  }),
  concept({
    id: "dsa-arrays-hashing",
    name: "Arrays, strings and hashing",
    scope: "Frequency maps, sets, prefix aggregates, in-place transforms and string scanning.",
    domains: ["dsa"],
    prerequisites: ["dsa-complexity"],
    weight: 3,
    outcome:
      "Recognize when direct indexing, hashing or a prefix representation removes repeated work.",
    evidence: ["solve", "explain"],
    tags: ["arrays", "strings", "hash-map", "prefix-sum"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "When is a prefix sum preferable to a sliding window?",
      "What collision and memory assumptions hide behind expected O(1) hashing?"
    ]
  }),
  concept({
    id: "dsa-two-pointer-window",
    name: "Two pointers and sliding windows",
    scope:
      "Opposing/fast-slow pointers and fixed or variable windows maintained by a precise invariant.",
    domains: ["dsa"],
    prerequisites: ["dsa-arrays-hashing"],
    weight: 3,
    outcome: "Derive pointer movement from the invariant instead of memorizing templates.",
    evidence: ["solve", "explain"],
    tags: ["two-pointers", "sliding-window"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "What condition makes the current window valid, and when can its left edge advance?",
      "Why does each element enter and leave the window at most once?"
    ]
  }),
  concept({
    id: "dsa-search-intervals",
    name: "Binary search, sorting and intervals",
    scope:
      "Binary search on indices or answers, comparator reasoning, interval merging and sweep-style ordering.",
    domains: ["dsa"],
    prerequisites: ["dsa-arrays-hashing"],
    weight: 3,
    outcome: "Identify a monotone predicate and implement boundaries without off-by-one ambiguity.",
    evidence: ["solve", "explain", "debug"],
    tags: ["binary-search", "sorting", "intervals"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "State the monotone predicate in a binary-search-on-answer problem.",
      "Which endpoint convention does your interval code use, and why?"
    ]
  }),
  concept({
    id: "dsa-linear-structures",
    name: "Linked structures, stacks, queues and heaps",
    scope: "Pointer manipulation, monotonic stacks/deques, queues and priority-based selection.",
    domains: ["dsa"],
    prerequisites: ["dsa-arrays-hashing"],
    weight: 2,
    outcome: "Choose a structure based on the operation that must stay cheap.",
    evidence: ["solve", "implement", "explain"],
    tags: ["linked-list", "stack", "queue", "heap"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "What ordering property does a monotonic stack preserve?",
      "When is a heap insufficient because you also need arbitrary deletion?"
    ]
  }),
  concept({
    id: "dsa-trees",
    name: "Trees, BSTs and tries",
    scope:
      "Recursive structure, traversals, subtree information, search-tree invariants and prefix trees.",
    domains: ["dsa"],
    prerequisites: ["dsa-linear-structures"],
    weight: 3,
    outcome: "Express a tree solution as information flowing into and out of each node.",
    evidence: ["solve", "explain", "implement"],
    tags: ["trees", "bst", "trie", "recursion"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "What must a recursive call return for the parent to finish its work?",
      "Why is an in-order traversal sorted only under the BST invariant?"
    ]
  }),
  concept({
    id: "dsa-graphs",
    name: "Graphs and connectivity",
    scope: "Representations, BFS/DFS, topological order, components and union-find.",
    domains: ["dsa", "system-design-foundations"],
    prerequisites: ["dsa-trees"],
    weight: 3,
    outcome:
      "Model a problem as a graph and select traversal or connectivity machinery deliberately.",
    evidence: ["solve", "explain", "implement"],
    tags: ["graphs", "bfs", "dfs", "topological-sort", "union-find"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "What exactly are the vertices and edges in this problem?",
      "When does union-find answer less than a full traversal would?"
    ]
  }),
  concept({
    id: "dsa-shortest-paths",
    name: "Shortest paths and spanning structures",
    scope: "Unweighted BFS, Dijkstra, Bellman–Ford, DAG paths and minimum spanning trees.",
    domains: ["dsa"],
    prerequisites: ["dsa-graphs", "dsa-linear-structures"],
    weight: 2,
    outcome: "Match edge assumptions to a correct shortest-path or spanning-tree algorithm.",
    evidence: ["solve", "explain", "implement"],
    tags: ["graphs", "shortest-path", "mst"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "Which property fails if Dijkstra sees a negative edge?",
      "Why does an MST not generally preserve every pair’s shortest path?"
    ]
  }),
  concept({
    id: "dsa-backtracking-greedy",
    name: "Backtracking, divide-and-conquer and greedy",
    scope:
      "Search-tree pruning, decomposition and exchange-argument reasoning for locally optimal choices.",
    domains: ["dsa"],
    prerequisites: ["dsa-trees", "dsa-search-intervals"],
    weight: 2,
    outcome: "Separate exhaustive state exploration from a provably safe greedy decision.",
    evidence: ["solve", "explain"],
    tags: ["backtracking", "divide-and-conquer", "greedy"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "What choice and undo operations define your backtracking state?",
      "What exchange argument would prove the greedy choice safe?"
    ]
  }),
  concept({
    id: "dsa-dp",
    name: "Dynamic programming",
    scope:
      "State, transition, base cases and evaluation order across sequence, grid, knapsack, interval, tree and bitmask problems.",
    domains: ["dsa"],
    prerequisites: ["dsa-backtracking-greedy", "dsa-graphs"],
    weight: 3,
    outcome:
      "Derive a recurrence from the smallest sufficient state and optimize it only after proving correctness.",
    evidence: ["solve", "explain", "implement"],
    tags: ["dynamic-programming", "memoization", "tabulation"],
    resources: ["algomaster-courses", "dsa-handbook"],
    practice: ["algomaster-150"],
    checkpoints: [
      "What information from the past is sufficient to determine the future?",
      "Which dependency order makes a bottom-up computation valid?"
    ]
  }),
  concept({
    id: "dsa-interview-conversion",
    name: "Timed problem solving and review",
    scope:
      "Clarification, brute-force baseline, invariant, coding, test design, communication and spaced re-solving.",
    domains: ["dsa"],
    prerequisites: ["dsa-dp", "dsa-shortest-paths"],
    weight: 3,
    outcome: "Solve mixed problems under interview constraints and explain decisions while coding.",
    evidence: ["solve", "mock", "explain", "debug"],
    tags: ["interview", "review", "communication"],
    resources: ["algomaster-150"],
    practice: ["algomaster-150"],
    checkpoints: [
      "Can you produce a correct baseline before optimizing?",
      "Which failures in your error log require re-solving rather than reading?"
    ]
  })
];

const engineeringConcepts: Concept[] = [
  concept({
    id: "eng-python",
    name: "Python essentials and idioms",
    scope:
      "Core collections, comprehensions, unpacking, slicing, text handling, iteration helpers, truthiness and readable Python idioms.",
    domains: ["engineering", "core-ml", "agentic-ai"],
    weight: 3,
    outcome:
      "Write clear Python for data preparation, evaluation and API payloads while choosing collections deliberately and avoiding mutation, truthiness and readability traps. Explain the time and space behavior of the code rather than treating Python syntax as magic.",
    evidence: ["implement", "debug", "explain"],
    tags: ["python", "collections", "idioms"],
    resources: ["algomaster-python-ai", "ml-engineering-book"],
    checkpoints: [
      {
        level: "understand",
        prompt:
          "Choose between list, tuple, set and dict for four AI-data examples, and explain ordering, mutability and lookup consequences."
      },
      {
        level: "apply",
        prompt:
          "Refactor a small preprocessing loop using appropriate comprehensions, unpacking and iteration helpers without making it cryptic."
      },
      {
        level: "debug",
        prompt:
          "Diagnose bugs caused by a mutable default argument, an incorrect truthiness check and accidental aliasing."
      },
      {
        level: "interview",
        prompt:
          "Implement and narrate a text-processing utility, including edge cases and the complexity of its collection operations."
      }
    ]
  }),
  concept({
    id: "eng-python-functions-iteration",
    name: "Functions, decorators and lazy iteration",
    scope:
      "First-class functions, closures, argument handling, decorators, generators, itertools and reusable control-flow wrappers.",
    domains: ["engineering", "core-ml", "agentic-ai"],
    prerequisites: ["eng-python"],
    weight: 3,
    outcome:
      "Design small composable functions and use decorators or generators only when their control flow remains inspectable. Build streaming and retry/cache utilities that preserve metadata, surface failures and avoid unnecessary materialization.",
    evidence: ["implement", "debug", "explain"],
    tags: ["python", "functions", "generators", "decorators"],
    resources: ["algomaster-python-ai", "ml-engineering-book"],
    checkpoints: [
      {
        level: "understand",
        prompt:
          "Trace a closure and generator by hand, explaining captured state, suspension points and when work actually executes."
      },
      {
        level: "apply",
        prompt:
          "Implement a generator-based batch reader and a metadata-preserving timing or retry decorator."
      },
      {
        level: "debug",
        prompt:
          "Find why a decorated function lost its signature or why a generator pipeline silently consumed its input twice."
      },
      {
        level: "interview",
        prompt:
          "Defend when a plain function or loop is clearer than a decorator, lambda or generator in production AI code."
      }
    ]
  }),
  concept({
    id: "eng-python-oop-dataclasses",
    name: "Python objects, dataclasses and protocols",
    scope:
      "Classes, data-model methods, composition, inheritance, dataclasses, abstract interfaces and structural protocols.",
    domains: ["engineering", "lld", "agentic-ai"],
    prerequisites: ["eng-python-functions-iteration"],
    weight: 2,
    outcome:
      "Model domain state with explicit invariants and choose among a function, dataclass, protocol or class hierarchy based on change boundaries. Produce objects that are easy to construct, test and extend without hiding dependencies.",
    evidence: ["implement", "design", "debug", "explain"],
    tags: ["python", "oop", "dataclasses", "protocols"],
    resources: ["algomaster-python-ai", "algomaster-courses"],
    checkpoints: [
      {
        level: "understand",
        prompt:
          "Compare a dataclass, named tuple, Pydantic model and ordinary class for a configuration or message object."
      },
      {
        level: "apply",
        prompt:
          "Design a small pluggable model-provider interface using composition and a Protocol or abstract base class."
      },
      {
        level: "debug",
        prompt:
          "Diagnose shared mutable state, fragile inheritance and surprising equality or hashing in a dataclass-based design."
      },
      {
        level: "interview",
        prompt:
          "Evolve an object model under a new requirement while defending its invariants, dependencies and extension points."
      }
    ]
  }),
  concept({
    id: "eng-python-types-validation",
    name: "Type hints, validation and Pydantic",
    scope:
      "Type hints, unions, generics, static contracts, runtime validation, serialization, settings and structured external data.",
    domains: ["engineering", "agentic-ai"],
    prerequisites: ["eng-python-oop-dataclasses"],
    weight: 3,
    outcome:
      "Express useful static contracts and validate untrusted API, configuration and model output at runtime. Design nested Pydantic schemas whose errors are actionable and whose serialization boundaries remain compatible as the system evolves.",
    evidence: ["implement", "debug", "design", "explain"],
    tags: ["python", "typing", "pydantic", "validation"],
    resources: ["algomaster-python-ai", "ml-engineering-book"],
    checkpoints: [
      {
        level: "understand",
        prompt:
          "Explain what type hints can prove, what they cannot enforce at runtime and where validation must begin."
      },
      {
        level: "apply",
        prompt:
          "Define and validate a nested request/response or tool-call schema with optional fields and domain constraints."
      },
      {
        level: "debug",
        prompt:
          "Turn a confusing nested validation failure into a precise boundary error without silently coercing bad data."
      },
      {
        level: "interview",
        prompt:
          "Design a backward-compatible schema change and explain its effects on producers, consumers and stored payloads."
      }
    ]
  }),
  concept({
    id: "eng-python-files-data",
    name: "Files, formats and ingestion",
    scope:
      "Path handling, context managers, JSON/JSONL, CSV, HTTP clients, document parsing, streaming and ingestion boundaries.",
    domains: ["engineering", "core-ml", "agentic-ai"],
    prerequisites: ["eng-python-functions-iteration"],
    weight: 3,
    outcome:
      "Build a bounded, testable ingestion pipeline that handles paths, encodings, malformed records, large inputs and remote failures deliberately. Preserve provenance and validation errors instead of turning heterogeneous data into an untraceable list.",
    evidence: ["implement", "debug", "design", "explain"],
    tags: ["python", "files", "data-ingestion", "http"],
    resources: ["algomaster-python-ai", "made-with-ml"],
    checkpoints: [
      {
        level: "understand",
        prompt:
          "Choose JSON, JSONL or CSV for three workloads and explain streaming, schema and recovery consequences."
      },
      {
        level: "apply",
        prompt:
          "Implement a streaming ingestion pipeline that validates records and reports source-aware errors."
      },
      {
        level: "debug",
        prompt:
          "Diagnose an encoding failure, leaked file/HTTP resource and memory spike caused by eager loading."
      },
      {
        level: "interview",
        prompt:
          "Design ingestion for a mixed local/HTTP document collection with retries, idempotency and observable partial failure."
      }
    ]
  }),
  concept({
    id: "eng-python-async",
    name: "Async Python and bounded concurrency",
    scope:
      "Coroutines, tasks, async HTTP, structured concurrency, cancellation, timeouts, semaphores and asynchronous streams.",
    domains: ["engineering", "agentic-ai", "ml-systems"],
    prerequisites: ["eng-python-functions-iteration", "eng-python-types-validation"],
    weight: 3,
    outcome:
      "Use asynchronous I/O to overlap waiting work while bounding concurrency, propagating cancellation and preserving per-request errors. Distinguish async I/O from threads, processes and distributed workers so the chosen model matches the bottleneck.",
    evidence: ["implement", "debug", "design", "explain"],
    tags: ["python", "asyncio", "concurrency", "io"],
    resources: ["algomaster-python-ai", "algomaster-courses"],
    checkpoints: [
      {
        level: "understand",
        prompt:
          "Trace the event loop through several coroutines and identify exactly where control can switch tasks."
      },
      {
        level: "apply",
        prompt:
          "Implement a bounded concurrent API client with timeouts, retries and ordered result collection."
      },
      {
        level: "debug",
        prompt:
          "Diagnose a blocked event loop, leaked task and cancellation path that leaves resources open."
      },
      {
        level: "interview",
        prompt:
          "Choose among asyncio, threads, processes and a work queue for mixed API, parsing and model-inference workloads."
      }
    ]
  }),
  concept({
    id: "eng-testing-debugging",
    name: "Testing and debugging",
    scope:
      "Unit/integration tests, fixtures, property thinking, observability, reproducible bugs and disciplined diagnosis.",
    domains: ["engineering", "ml-systems", "agentic-ai"],
    prerequisites: ["eng-python-functions-iteration"],
    weight: 3,
    outcome:
      "Turn an ambiguous failure into a minimal reproduction, hypothesis and regression test.",
    evidence: ["implement", "debug", "explain"],
    tags: ["testing", "debugging", "reliability"],
    resources: ["ml-engineering-book", "harness-engineering"],
    checkpoints: [
      "What is the smallest test that distinguishes your top two hypotheses?",
      "Which contract belongs in a unit test versus an integration test?"
    ]
  }),
  concept({
    id: "eng-git-collaboration",
    name: "Git and engineering collaboration",
    scope:
      "Commits, branches, merges/rebases, code review, issue context and recoverable workflows.",
    domains: ["engineering"],
    prerequisites: ["eng-python"],
    weight: 2,
    outcome: "Produce reviewable changes and recover safely from common history mistakes.",
    evidence: ["implement", "explain"],
    tags: ["git", "collaboration", "tooling"],
    resources: ["algomaster-courses"],
    checkpoints: [
      "What makes a commit independently reviewable?",
      "When would rebasing a shared branch create unnecessary risk?"
    ]
  }),
  concept({
    id: "eng-sql-data",
    name: "SQL and data handling",
    scope:
      "Relational modeling, joins, aggregation, window functions, indexes, transactions and efficient dataframe/array handling.",
    domains: ["engineering", "core-ml", "ml-system-design"],
    prerequisites: ["eng-python", "dsa-complexity"],
    weight: 3,
    outcome: "Write correct analytical queries and reason about their data and execution costs.",
    evidence: ["solve", "implement", "explain"],
    tags: ["sql", "data", "databases"],
    resources: ["algomaster-courses", "cmu-databases"],
    checkpoints: [
      "How can a join multiply rows unexpectedly?",
      "Which index order supports your filter and sort, and what does it cost on writes?"
    ]
  }),
  concept({
    id: "eng-apis",
    name: "APIs and service boundaries",
    scope:
      "HTTP, RESTful contracts, serialization, validation, authentication vocabulary, idempotency and failure-aware clients.",
    domains: ["engineering", "system-design-foundations", "agentic-ai"],
    prerequisites: ["eng-python-types-validation", "eng-testing-debugging"],
    weight: 3,
    outcome: "Design and implement a small, testable API with explicit contracts and failures.",
    evidence: ["design", "implement", "debug"],
    tags: ["api", "http", "contracts"],
    resources: ["hld-handbook", "algomaster-courses"],
    checkpoints: [
      "Which operation must be idempotent, and how will the server enforce it?",
      "What belongs in the API contract rather than an implementation detail?"
    ]
  }),
  concept({
    id: "eng-concurrency",
    name: "Processes, threads and concurrency",
    scope:
      "Processes versus threads, shared state, synchronization, async I/O, race conditions and practical memory vocabulary.",
    domains: ["engineering", "system-design-foundations", "ml-systems"],
    prerequisites: ["eng-python-async", "eng-testing-debugging", "dsa-complexity"],
    weight: 3,
    outcome: "Choose a concurrency model and explain its correctness and resource trade-offs.",
    evidence: ["explain", "implement", "debug"],
    tags: ["concurrency", "threads", "processes", "memory"],
    resources: ["cs162", "cornell-parallel", "algomaster-courses"],
    checkpoints: [
      "What shared invariant must a lock protect?",
      "When does async I/O improve throughput without speeding up a single task?"
    ]
  }),
  concept({
    id: "eng-containers-ci",
    name: "Containers, CI and deployment vocabulary",
    scope:
      "Images, containers, environment configuration, dependency pinning, CI gates, rollout and rollback basics.",
    domains: ["engineering", "ml-systems"],
    prerequisites: ["eng-git-collaboration", "eng-testing-debugging", "eng-apis"],
    weight: 2,
    outcome: "Package and ship a reproducible service through an automated quality gate.",
    evidence: ["implement", "explain", "debug"],
    tags: ["containers", "ci-cd", "deployment"],
    resources: ["ai-infra", "made-with-ml"],
    checkpoints: [
      "What belongs in an image versus runtime configuration?",
      "Which failed signal should automatically stop or roll back a deployment?"
    ]
  }),
  concept({
    id: "eng-operational-readiness",
    name: "Operational engineering",
    scope:
      "Logs, metrics, traces, SLO vocabulary, configuration, secrets and writing a useful runbook.",
    domains: ["engineering", "system-design-foundations", "ml-systems"],
    prerequisites: ["eng-containers-ci"],
    weight: 2,
    outcome: "Operate a small service and explain how failures become visible and recoverable.",
    evidence: ["design", "implement", "debug"],
    tags: ["observability", "operations", "reliability"],
    resources: ["ai-infra", "hld-handbook"],
    checkpoints: [
      "Which metric distinguishes user-visible failure from internal noise?",
      "What must a runbook say before an on-call engineer can act safely?"
    ]
  })
];

const systemFoundationConcepts: Concept[] = [
  concept({
    id: "sys-requirements-estimation",
    name: "Requirements and estimation",
    scope:
      "Functional/non-functional requirements, workload shape, latency, throughput, availability, storage and cost estimates.",
    domains: ["system-design-foundations", "hld", "ml-system-design", "genai-system-design"],
    weight: 3,
    outcome: "Turn a vague product prompt into measurable design constraints.",
    evidence: ["design", "explain"],
    tags: ["requirements", "capacity", "slo"],
    resources: ["hld-handbook"],
    checkpoints: [
      "Which requirement changes the architecture most if it moves by 10×?",
      "What estimate is precise enough to choose a design without pretending certainty?"
    ]
  }),
  concept({
    id: "sys-networking",
    name: "Networking and request flow",
    scope:
      "DNS, TCP/TLS, HTTP, proxies, load balancers, connection behavior, timeouts and retries.",
    domains: ["system-design-foundations", "hld", "ml-systems"],
    prerequisites: ["eng-apis"],
    weight: 3,
    outcome: "Trace a request across layers and locate latency or failure amplification.",
    evidence: ["explain", "design", "debug"],
    tags: ["networking", "http", "load-balancing"],
    resources: ["hld-handbook"],
    checkpoints: [
      "Where can a retry multiply load into an outage?",
      "Which connection setup costs can pooling or multiplexing avoid?"
    ]
  }),
  concept({
    id: "sys-storage-indexing",
    name: "Storage models and indexing",
    scope:
      "Relational, document, key-value, graph and object storage; indexes, partition keys and access-pattern-led selection.",
    domains: ["system-design-foundations", "hld", "ml-system-design"],
    prerequisites: ["eng-sql-data", "sys-requirements-estimation"],
    weight: 3,
    outcome: "Choose a storage model and index from explicit read/write and consistency needs.",
    evidence: ["design", "explain"],
    tags: ["storage", "database", "index"],
    resources: ["hld-handbook", "cmu-databases"],
    checkpoints: [
      "Which access pattern does your schema make cheap, and which does it penalize?",
      "What does the chosen partition key do under a hot-key workload?"
    ]
  }),
  concept({
    id: "sys-caching",
    name: "Caching and content delivery",
    scope: "Cache placement, eviction, invalidation, freshness, CDNs and stampede prevention.",
    domains: ["system-design-foundations", "hld", "lld", "genai-system-design"],
    prerequisites: ["sys-networking", "sys-storage-indexing"],
    weight: 3,
    outcome: "Design a cache whose consistency and failure behavior are explicit.",
    evidence: ["design", "implement", "explain"],
    tags: ["cache", "cdn", "performance"],
    resources: ["hld-handbook", "algomaster-courses"],
    checkpoints: [
      "Who owns invalidation when the source of truth changes?",
      "How will you prevent many misses from overwhelming the backend?"
    ]
  }),
  concept({
    id: "sys-queues-streams",
    name: "Queues, streams and asynchronous work",
    scope:
      "Message delivery semantics, ordering, consumer groups, backpressure, dead-letter handling and event-driven trade-offs.",
    domains: ["system-design-foundations", "hld", "ml-system-design", "agentic-ai"],
    prerequisites: ["sys-networking", "sys-storage-indexing"],
    weight: 3,
    outcome: "Decouple work without losing correctness or operational visibility.",
    evidence: ["design", "implement", "explain"],
    tags: ["queues", "streams", "events", "backpressure"],
    resources: ["hld-handbook", "build-distributed"],
    checkpoints: [
      "What happens when a consumer succeeds but acknowledgement fails?",
      "Where is ordering required, and how much parallelism does that constraint cost?"
    ]
  }),
  concept({
    id: "sys-consistency-replication",
    name: "Replication, consistency and consensus",
    scope:
      "Replica roles, quorum reasoning, consistency models, leader election and consensus boundaries.",
    domains: ["system-design-foundations", "hld", "ml-systems"],
    prerequisites: ["sys-storage-indexing", "sys-networking"],
    weight: 3,
    outcome:
      "Explain what clients can observe during failures and why the chosen guarantees are sufficient.",
    evidence: ["design", "explain", "implement"],
    tags: ["distributed-systems", "replication", "consistency", "consensus"],
    resources: ["hld-handbook", "build-distributed"],
    checkpoints: [
      "Which stale or conflicting observation is acceptable to this product?",
      "Why does consensus solve agreement but not make a system infinitely available?"
    ]
  }),
  concept({
    id: "sys-reliability",
    name: "Reliability and failure design",
    scope:
      "Failure modes, redundancy, graceful degradation, circuit breakers, rate limits, disaster recovery and SLOs.",
    domains: ["system-design-foundations", "hld", "ml-system-design", "genai-system-design"],
    prerequisites: ["sys-consistency-replication", "sys-queues-streams"],
    weight: 3,
    outcome: "Design from failure scenarios and connect safeguards to user-visible objectives.",
    evidence: ["design", "explain", "mock"],
    tags: ["reliability", "slo", "failure"],
    resources: ["hld-handbook", "mlsysbook"],
    checkpoints: [
      "Which dependency failure should degrade functionality rather than fail the request?",
      "What recovery objective determines your backup and failover design?"
    ]
  }),
  concept({
    id: "sys-security",
    name: "Security and abuse boundaries",
    scope:
      "Authentication/authorization, least privilege, encryption, secrets, isolation, validation and abuse/rate controls.",
    domains: ["system-design-foundations", "hld", "genai-system-design", "agentic-ai"],
    prerequisites: ["eng-apis", "sys-networking"],
    weight: 3,
    outcome:
      "Identify trust boundaries and prevent an untrusted input from acquiring unintended authority.",
    evidence: ["design", "explain", "debug"],
    tags: ["security", "auth", "trust"],
    resources: ["hld-handbook", "harness-engineering"],
    checkpoints: [
      "Where does untrusted data cross into a privileged operation?",
      "Which authorization decision must be enforced server-side even if the UI hides it?"
    ]
  })
];

const hldConcepts: Concept[] = [
  concept({
    id: "hld-data-intensive",
    name: "Data-intensive architecture",
    scope:
      "Read/write paths, partitioning, replication, materialized views, search and analytical versus transactional workloads.",
    domains: ["hld"],
    prerequisites: ["sys-storage-indexing", "sys-consistency-replication"],
    weight: 3,
    outcome: "Design a scalable data path with explicit correctness and query trade-offs.",
    evidence: ["design", "mock", "explain"],
    tags: ["hld", "data", "partitioning"],
    resources: ["hld-handbook", "cmu-databases"],
    checkpoints: [
      "Which read model would you materialize, and how is it repaired?",
      "How will a re-partition avoid a long write outage?"
    ]
  }),
  concept({
    id: "hld-real-time",
    name: "Real-time and collaborative systems",
    scope: "Presence, fan-out, WebSockets, ordering, synchronization and offline reconciliation.",
    domains: ["hld"],
    prerequisites: ["sys-queues-streams", "sys-consistency-replication"],
    weight: 2,
    outcome: "Design message or collaboration flows with stated delivery and ordering guarantees.",
    evidence: ["design", "mock", "explain"],
    tags: ["hld", "real-time", "messaging"],
    resources: ["hld-handbook"],
    checkpoints: [
      "Where must ordering be global, per conversation or not guaranteed?",
      "How will an offline client reconcile concurrent changes?"
    ]
  }),
  concept({
    id: "hld-media-feed",
    name: "Feeds, media and fan-out",
    scope:
      "Timeline generation, ranking hooks, upload/transcoding, object storage, CDN delivery and hot-user behavior.",
    domains: ["hld", "ml-system-design"],
    prerequisites: ["sys-caching", "sys-queues-streams", "hld-data-intensive"],
    weight: 2,
    outcome: "Choose fan-out and media-processing strategies from workload asymmetry.",
    evidence: ["design", "mock", "explain"],
    tags: ["hld", "feed", "media", "fan-out"],
    resources: ["hld-handbook", "algomaster-courses"],
    checkpoints: [
      "When does fan-out-on-write fail for a celebrity account?",
      "Which transformations belong in the synchronous upload path?"
    ]
  }),
  concept({
    id: "hld-payments-workflows",
    name: "Payments and durable workflows",
    scope:
      "Idempotency, ledgers, sagas, reconciliation, audit trails and external-provider failure.",
    domains: ["hld", "lld"],
    prerequisites: ["sys-queues-streams", "sys-reliability"],
    weight: 3,
    outcome: "Design a workflow that remains auditable and correct across partial failures.",
    evidence: ["design", "mock", "implement"],
    tags: ["hld", "payments", "workflow", "idempotency"],
    resources: ["hld-handbook", "algomaster-courses"],
    checkpoints: [
      "Which record is the financial source of truth?",
      "How does reconciliation repair an ambiguous provider timeout?"
    ]
  }),
  concept({
    id: "hld-observability-cost",
    name: "Architecture observability and cost",
    scope:
      "Service-level signals, tracing boundaries, capacity headroom, hot-path cost and design simplification.",
    domains: ["hld", "ml-system-design", "genai-system-design"],
    prerequisites: ["sys-reliability", "eng-operational-readiness"],
    weight: 2,
    outcome: "Make an architecture operable and identify its dominant cost drivers.",
    evidence: ["design", "explain", "mock"],
    tags: ["hld", "observability", "cost"],
    resources: ["hld-handbook", "ai-infra"],
    checkpoints: [
      "Which three signals reveal saturation before users report it?",
      "What component dominates marginal cost as traffic grows?"
    ]
  }),
  concept({
    id: "hld-interview-loop",
    name: "Timed HLD interview loop",
    scope:
      "Requirement clarification, estimates, API/data model, architecture, bottlenecks, failures, security and trade-off communication.",
    domains: ["hld"],
    prerequisites: [
      "hld-data-intensive",
      "hld-real-time",
      "hld-media-feed",
      "hld-payments-workflows",
      "hld-observability-cost"
    ],
    weight: 3,
    outcome: "Produce and defend a coherent design within an interview session.",
    evidence: ["mock", "design", "explain"],
    tags: ["hld", "interview", "communication"],
    resources: ["hld-handbook", "algomaster-courses"],
    practice: ["algomaster-courses"],
    checkpoints: [
      "Can another engineer find the bottleneck and source of truth from your diagram?",
      "Which trade-off would you revisit if scale or reliability changed?"
    ],
    coverage: "gated"
  })
];

const lldConcepts: Concept[] = [
  concept({
    id: "lld-oo-modeling",
    name: "Object modeling and interfaces",
    scope:
      "Responsibilities, invariants, composition, polymorphism, dependency direction and explicit contracts.",
    domains: ["lld"],
    prerequisites: ["eng-python-oop-dataclasses", "eng-testing-debugging"],
    weight: 3,
    outcome: "Model behavior with small interfaces and keep invariants in one defensible place.",
    evidence: ["design", "implement", "explain"],
    tags: ["lld", "oop", "interfaces"],
    resources: ["algomaster-courses"],
    checkpoints: [
      "Which object owns this invariant and why?",
      "Would composition make this variation safer than inheritance?"
    ],
    coverage: "gated"
  }),
  concept({
    id: "lld-solid-patterns",
    name: "Design principles and patterns",
    scope:
      "SOLID as change-risk heuristics and selected creation, structural and behavioral patterns.",
    domains: ["lld"],
    prerequisites: ["lld-oo-modeling"],
    weight: 2,
    outcome: "Apply a pattern only when it simplifies a concrete axis of change.",
    evidence: ["design", "implement", "explain"],
    tags: ["lld", "solid", "patterns"],
    resources: ["algomaster-courses"],
    checkpoints: [
      "What anticipated change does this abstraction isolate?",
      "What complexity would disappear if you removed the pattern?"
    ],
    coverage: "gated"
  }),
  concept({
    id: "lld-state-workflow",
    name: "State machines and workflows",
    scope:
      "Explicit states, legal transitions, commands, retries, compensation and persistence boundaries.",
    domains: ["lld"],
    prerequisites: ["lld-oo-modeling", "hld-payments-workflows"],
    weight: 3,
    outcome: "Implement a workflow that rejects illegal transitions and survives retries.",
    evidence: ["design", "implement", "debug"],
    tags: ["lld", "state-machine", "workflow"],
    resources: ["algomaster-courses", "hld-handbook"],
    checkpoints: [
      "Which transition must be atomic with persistence?",
      "What should a repeated command return after the transition already succeeded?"
    ]
  }),
  concept({
    id: "lld-extensible-services",
    name: "Extensible service design",
    scope:
      "Strategy, adapters, dependency injection, plugin boundaries and configuration without condition-heavy code.",
    domains: ["lld"],
    prerequisites: ["lld-solid-patterns", "eng-apis"],
    weight: 2,
    outcome: "Add a provider or policy without modifying unrelated business logic.",
    evidence: ["design", "implement", "explain"],
    tags: ["lld", "extensibility", "dependency-injection"],
    resources: ["algomaster-courses"],
    checkpoints: [
      "Which interface belongs to the consumer rather than the provider?",
      "How will a new implementation prove it honors the same contract?"
    ],
    coverage: "gated"
  }),
  concept({
    id: "lld-concurrent-components",
    name: "Concurrent component design",
    scope:
      "Thread-safe caches, schedulers, queues, lock granularity, immutability and cancellation.",
    domains: ["lld"],
    prerequisites: ["eng-concurrency", "sys-caching", "lld-oo-modeling"],
    weight: 3,
    outcome: "Implement and test a component whose concurrency invariants are explicit.",
    evidence: ["design", "implement", "debug"],
    tags: ["lld", "concurrency", "cache", "scheduler"],
    resources: ["algomaster-courses", "cs162"],
    checkpoints: [
      "What interleaving breaks the component without synchronization?",
      "How do cancellation and shutdown avoid leaking work or locks?"
    ]
  }),
  concept({
    id: "lld-testing-evolution",
    name: "LLD testing and evolution",
    scope:
      "Contract tests, fakes, failure injection, refactoring safety and compatibility of public interfaces.",
    domains: ["lld"],
    prerequisites: ["lld-extensible-services", "lld-state-workflow"],
    weight: 2,
    outcome: "Evolve a design under tests without coupling tests to implementation details.",
    evidence: ["implement", "debug", "explain"],
    tags: ["lld", "testing", "refactoring"],
    resources: ["harness-engineering", "algomaster-courses"],
    checkpoints: [
      "Which behavior should remain true after the internal design changes?",
      "What failure can only an integration test expose?"
    ]
  }),
  concept({
    id: "lld-interview-builds",
    name: "LLD interview builds",
    scope:
      "Timed, executable designs such as a cache, scheduler, booking system, notification service or payments workflow.",
    domains: ["lld"],
    prerequisites: ["lld-concurrent-components", "lld-testing-evolution"],
    weight: 3,
    outcome:
      "Produce tested code and explain responsibilities, trade-offs and extension points under time pressure.",
    evidence: ["mock", "design", "implement"],
    tags: ["lld", "interview", "portfolio"],
    resources: ["algomaster-courses"],
    practice: ["algomaster-courses"],
    checkpoints: [
      "Can the core use case run end-to-end rather than exist only as UML?",
      "Which requirement did you intentionally defer and where would it attach?"
    ],
    coverage: "gated"
  })
];

const coreMlConcepts: Concept[] = [
  concept({
    id: "ml-data-problem",
    name: "Problem framing and data",
    scope:
      "Target definition, unit of prediction, sampling, labels, feature availability, leakage and baseline construction.",
    domains: ["core-ml", "ml-system-design"],
    prerequisites: ["math-probability", "eng-sql-data"],
    weight: 3,
    outcome:
      "Turn a product question into a learnable target with a defensible dataset and baseline.",
    evidence: ["design", "implement", "explain"],
    tags: ["ml", "data", "problem-framing"],
    resources: ["d2l", "made-with-ml", "mlsysbook"],
    checkpoints: [
      "At prediction time, which current features would actually be available?",
      "What simple non-ML baseline must the model beat?"
    ]
  }),
  concept({
    id: "ml-linear-models",
    name: "Linear models",
    scope:
      "Linear/logistic regression, loss functions, regularization, optimization and interpretation.",
    domains: ["core-ml"],
    prerequisites: ["math-linear-algebra", "math-probability", "math-optimization"],
    weight: 3,
    outcome: "Derive, fit, regularize and interpret linear predictive models.",
    evidence: ["explain", "implement", "solve"],
    tags: ["ml", "regression", "classification"],
    resources: ["d2l", "sklearn-guide"],
    practice: ["deep-ml"],
    checkpoints: [
      "Why does logistic regression remain a linear decision boundary?",
      "How do L1 and L2 regularization change the fitted solution differently?"
    ]
  }),
  concept({
    id: "ml-trees-ensembles",
    name: "Trees and ensembles",
    scope:
      "Decision trees, impurity, bagging, random forests, gradient boosting and calibration trade-offs.",
    domains: ["core-ml"],
    prerequisites: ["ml-linear-models", "evaluation-experimentation"],
    weight: 3,
    outcome: "Choose and diagnose tree-based models for structured data.",
    evidence: ["explain", "implement", "debug"],
    tags: ["ml", "trees", "ensembles", "boosting"],
    resources: ["sklearn-guide", "d2l"],
    practice: ["deep-ml"],
    checkpoints: [
      "Why does bagging reduce variance while boosting often reduces bias?",
      "Which validation symptom suggests tree depth is too high?"
    ]
  }),
  concept({
    id: "ml-unsupervised",
    name: "Unsupervised learning and representation",
    scope:
      "Clustering, PCA/dimensionality reduction, density intuition and evaluating representations without simple labels.",
    domains: ["core-ml", "generative-ai"],
    prerequisites: ["math-linear-algebra", "math-probability", "evaluation-experimentation"],
    weight: 2,
    outcome: "Use unsupervised methods with explicit assumptions and meaningful evaluation.",
    evidence: ["explain", "implement", "design"],
    tags: ["ml", "clustering", "pca", "representation"],
    resources: ["sklearn-guide", "udl"],
    practice: ["deep-ml"],
    checkpoints: [
      "What geometry does k-means assume about useful clusters?",
      "How would you tell whether a low-dimensional representation preserved task-relevant structure?"
    ]
  }),
  concept({
    id: "ml-model-selection",
    name: "Generalization and model selection",
    scope:
      "Bias/variance, cross-validation, hyperparameter search, learning curves, calibration and error analysis.",
    domains: ["core-ml", "ml-system-design"],
    prerequisites: ["ml-linear-models", "evaluation-experimentation"],
    weight: 3,
    outcome: "Select a model through reproducible evidence and diagnose why it fails.",
    evidence: ["design", "implement", "debug", "explain"],
    tags: ["ml", "generalization", "model-selection"],
    resources: ["sklearn-guide", "d2l", "made-with-ml"],
    checkpoints: [
      "What does the gap between training and validation curves imply?",
      "Why must preprocessing be fit inside each cross-validation fold?"
    ]
  }),
  concept({
    id: "ml-feature-pipelines",
    name: "Feature and preprocessing pipelines",
    scope:
      "Missing values, categorical/numerical transforms, feature selection, reproducible pipelines and train/serve consistency.",
    domains: ["core-ml", "ml-system-design"],
    prerequisites: ["ml-data-problem", "ml-model-selection"],
    weight: 3,
    outcome:
      "Build a leakage-safe pipeline that produces the same features in training and inference.",
    evidence: ["implement", "debug", "design"],
    tags: ["ml", "features", "pipelines"],
    resources: ["sklearn-guide", "made-with-ml"],
    checkpoints: [
      "Which preprocessing statistic must be learned only from training data?",
      "How will you detect a training-serving feature mismatch?"
    ]
  }),
  concept({
    id: "ml-interpretability-fairness",
    name: "Interpretability, robustness and fairness",
    scope:
      "Global/local explanations, subgroup performance, robustness checks, causal cautions and responsible deployment.",
    domains: ["core-ml", "ml-system-design"],
    prerequisites: ["ml-model-selection", "evaluation-experimentation"],
    weight: 2,
    outcome: "Characterize who a model fails for and avoid overclaiming explanations.",
    evidence: ["explain", "design", "debug"],
    tags: ["ml", "interpretability", "fairness", "robustness"],
    resources: ["sklearn-guide", "mlsysbook"],
    checkpoints: [
      "Does this explanation describe model behavior or establish causality?",
      "Which subgroup metric would expose harm hidden by the aggregate?"
    ]
  }),
  concept({
    id: "ml-end-to-end-project",
    name: "End-to-end ML project",
    scope:
      "Reproducible data, baseline, experiments, model card, service or batch inference, monitoring plan and decision-focused reporting.",
    domains: ["core-ml"],
    prerequisites: ["ml-feature-pipelines", "ml-interpretability-fairness"],
    weight: 3,
    outcome: "Ship a reproducible classical-ML artifact and defend every modeling decision.",
    evidence: ["implement", "design", "debug", "explain"],
    tags: ["ml", "project", "portfolio"],
    resources: ["made-with-ml", "sklearn-guide"],
    checkpoints: [
      "Can another person reproduce your baseline from a clean checkout?",
      "What result would make you decide not to deploy this model?"
    ]
  })
];

const deepLearningConcepts: Concept[] = [
  concept({
    id: "dl-neural-networks",
    name: "Neural networks and backpropagation",
    scope:
      "Perceptrons, multilayer networks, activations, computation graphs, autodiff and backpropagation.",
    domains: ["deep-learning", "llms", "generative-ai", "ml-systems"],
    prerequisites: ["math-linear-algebra", "math-optimization", "ml-linear-models"],
    weight: 3,
    outcome: "Implement a small network and explain gradient flow through every operation.",
    evidence: ["implement", "explain", "debug"],
    tags: ["deep-learning", "backprop", "autodiff"],
    resources: ["d2l", "udl", "pytorch-tutorials"],
    practice: ["deep-ml"],
    checkpoints: [
      "What local information does each node need during reverse-mode autodiff?",
      "How would you numerically check a suspicious gradient?"
    ]
  }),
  concept({
    id: "dl-training-dynamics",
    name: "Training dynamics and regularization",
    scope:
      "Initialization, normalization, optimizers, schedules, regularization, gradient pathologies and experiment diagnosis.",
    domains: ["deep-learning", "llms"],
    prerequisites: ["dl-neural-networks", "evaluation-experimentation"],
    weight: 3,
    outcome:
      "Run a stable training loop and diagnose underfitting, overfitting or optimization failure.",
    evidence: ["implement", "debug", "explain"],
    tags: ["deep-learning", "optimization", "regularization"],
    resources: ["d2l", "udl", "cmu-deep-learning"],
    practice: ["deep-ml"],
    checkpoints: [
      "How do you distinguish an optimization problem from insufficient model capacity?",
      "Why does normalization change optimization even when model expressivity is similar?"
    ]
  }),
  concept({
    id: "dl-cnns",
    name: "Convolutional networks",
    scope: "Convolution, receptive fields, pooling, modern CNN blocks and spatial inductive bias.",
    domains: ["deep-learning", "generative-ai"],
    prerequisites: ["dl-neural-networks", "dl-training-dynamics"],
    weight: 2,
    outcome: "Implement and analyze a CNN for a vision task.",
    evidence: ["implement", "explain", "debug"],
    tags: ["deep-learning", "cnn", "vision"],
    resources: ["d2l", "cmu-deep-learning"],
    practice: ["deep-ml"],
    checkpoints: [
      "How does stacking convolutions change receptive field size?",
      "Which invariance does convolution encourage but not guarantee?"
    ]
  }),
  concept({
    id: "dl-sequence-models",
    name: "Sequence models",
    scope:
      "Autoregression, RNNs, gated recurrence, sequence objectives and exposure/memory limitations.",
    domains: ["deep-learning", "llms"],
    prerequisites: ["dl-neural-networks", "math-probability"],
    weight: 2,
    outcome:
      "Implement an autoregressive sequence model and explain its training and inference mismatch.",
    evidence: ["implement", "explain", "debug"],
    tags: ["deep-learning", "rnn", "sequence"],
    resources: ["d2l", "cmu-deep-learning"],
    practice: ["deep-ml"],
    checkpoints: [
      "Why can teacher forcing hide inference-time errors?",
      "How do gates change gradient flow through time?"
    ]
  }),
  concept({
    id: "dl-attention-transformers",
    name: "Attention and Transformers",
    scope:
      "Scaled dot-product and multi-head attention, positional information, residual blocks, normalization and encoder/decoder structure.",
    domains: ["deep-learning", "llms", "generative-ai", "ml-systems"],
    prerequisites: ["dl-neural-networks", "dl-sequence-models", "math-linear-algebra"],
    weight: 3,
    outcome: "Implement a Transformer block and account for every tensor shape and compute cost.",
    evidence: ["implement", "explain", "debug"],
    tags: ["deep-learning", "attention", "transformer"],
    resources: ["d2l", "modern-llm-notebook", "cs336"],
    practice: ["deep-ml"],
    checkpoints: [
      "Why is attention divided by the square root of key dimension?",
      "What distinct information can separate heads represent, and what is not guaranteed?"
    ]
  }),
  concept({
    id: "dl-representation-learning",
    name: "Representation and transfer learning",
    scope:
      "Embeddings, self-supervision, pretraining, fine-tuning, transfer, contrastive objectives and frozen versus adapted features.",
    domains: ["deep-learning", "llms", "generative-ai"],
    prerequisites: ["dl-cnns", "dl-attention-transformers"],
    weight: 3,
    outcome: "Choose and evaluate a transfer strategy under data and compute constraints.",
    evidence: ["design", "implement", "explain"],
    tags: ["deep-learning", "representation", "transfer"],
    resources: ["d2l", "udl", "cmu-deep-learning"],
    checkpoints: [
      "What makes a pretraining task produce transferable features?",
      "When can freezing a backbone outperform full fine-tuning?"
    ]
  }),
  concept({
    id: "dl-debugging",
    name: "Deep-learning debugging",
    scope:
      "Overfit-one-batch checks, gradient/activation inspection, data validation, numerical issues, profiler use and reproducibility.",
    domains: ["deep-learning", "ml-systems"],
    prerequisites: ["dl-training-dynamics", "eng-testing-debugging"],
    weight: 3,
    outcome: "Use a systematic ladder to isolate data, model, optimization and systems failures.",
    evidence: ["debug", "implement", "explain"],
    tags: ["deep-learning", "debugging", "profiling"],
    resources: ["ml-engineering-book", "pytorch-tutorials", "cmu-dlsys"],
    checkpoints: [
      "What does failure to overfit one tiny batch eliminate from your hypothesis list?",
      "Which activation or gradient statistic would you inspect first and why?"
    ]
  }),
  concept({
    id: "dl-project",
    name: "Deep-learning build",
    scope:
      "A reproducible model project with data checks, baselines, ablations, error analysis and a concise technical report.",
    domains: ["deep-learning"],
    prerequisites: ["dl-representation-learning", "dl-debugging"],
    weight: 3,
    outcome: "Build and defend a neural model through evidence rather than architecture novelty.",
    evidence: ["implement", "debug", "design", "explain"],
    tags: ["deep-learning", "project", "portfolio"],
    resources: ["d2l", "cmu-deep-learning", "pytorch-tutorials"],
    checkpoints: [
      "Which ablation supports your central architectural claim?",
      "What is the largest remaining error cluster and what experiment follows?"
    ]
  })
];

const llmConcepts: Concept[] = [
  concept({
    id: "llm-tokenization-data",
    name: "Tokenization and language-model data",
    scope:
      "BPE-style tokenization, vocabulary trade-offs, corpus construction, deduplication, contamination and data quality.",
    domains: ["llms", "ml-systems"],
    prerequisites: ["eng-python-files-data", "math-probability", "dl-sequence-models"],
    weight: 3,
    outcome: "Implement a tokenizer and explain how data choices affect capability and evaluation.",
    evidence: ["implement", "explain", "debug"],
    tags: ["llm", "tokenization", "data"],
    resources: ["cs336", "modern-llm-notebook"],
    checkpoints: [
      "How does vocabulary size trade sequence length against embedding/output cost?",
      "What contamination check would you run before trusting a benchmark?"
    ]
  }),
  concept({
    id: "llm-architecture",
    name: "Modern LLM architecture",
    scope:
      "Decoder-only Transformers, causal masking, RoPE, RMSNorm, SwiGLU, GQA/MQA, MoE and parameter accounting.",
    domains: ["llms", "ml-systems"],
    prerequisites: ["dl-attention-transformers", "llm-tokenization-data"],
    weight: 3,
    outcome: "Implement and size a small decoder-only model with modern components.",
    evidence: ["implement", "explain", "debug"],
    tags: ["llm", "transformer", "architecture"],
    resources: ["cs336", "modern-llm-notebook", "d2l"],
    practice: ["deep-ml"],
    checkpoints: [
      "How do grouped-query attention and multi-head attention trade quality for KV-cache cost?",
      "Account for the dominant parameters in one decoder block."
    ]
  }),
  concept({
    id: "llm-pretraining",
    name: "Pretraining and scaling",
    scope:
      "Objectives, batching, optimizers, mixed precision, scaling laws, compute/data budgets, checkpoints and training signals.",
    domains: ["llms", "ml-systems"],
    prerequisites: ["llm-architecture", "dl-training-dynamics"],
    weight: 3,
    outcome:
      "Plan and execute a small language-model training run with defensible compute and evaluation choices.",
    evidence: ["design", "implement", "debug"],
    tags: ["llm", "pretraining", "scaling"],
    resources: ["cs336", "mlsysbook", "cmu-mlsystems"],
    checkpoints: [
      "Which bottleneck changes when sequence length doubles?",
      "What evidence would tell you to spend the next compute unit on data rather than parameters?"
    ]
  }),
  concept({
    id: "llm-decoding",
    name: "Inference and decoding",
    scope:
      "Autoregressive generation, temperature, top-k/top-p, beam search, KV caching, batching and speculative decoding.",
    domains: ["llms", "ml-systems", "genai-system-design", "agentic-ai"],
    prerequisites: ["llm-architecture"],
    weight: 3,
    outcome: "Implement decoding and explain quality, latency, memory and diversity trade-offs.",
    evidence: ["implement", "explain", "debug"],
    tags: ["llm", "decoding", "inference", "kv-cache"],
    resources: ["cs336", "modern-llm-notebook", "cmu-mlsystems"],
    checkpoints: [
      "Why does KV caching reduce compute but increase memory pressure?",
      "When does lower temperature make output less useful despite increasing determinism?"
    ]
  }),
  concept({
    id: "llm-finetuning",
    name: "Supervised and parameter-efficient fine-tuning",
    scope:
      "Instruction data, SFT objectives, LoRA/adapter intuition, data mixtures, catastrophic forgetting and validation.",
    domains: ["llms", "genai-system-design"],
    prerequisites: ["llm-pretraining", "evaluation-experimentation"],
    weight: 3,
    outcome:
      "Design a small fine-tuning experiment and separate data, optimization and evaluation decisions.",
    evidence: ["design", "implement", "debug"],
    tags: ["llm", "sft", "lora", "fine-tuning"],
    resources: ["cs336", "modern-llm-notebook"],
    checkpoints: [
      "Why can a low training loss coexist with worse instruction-following behavior?",
      "Which layers or rank would you adapt first, and what measurement justifies it?"
    ]
  }),
  concept({
    id: "llm-posttraining",
    name: "Preference learning and post-training",
    scope:
      "Reward modeling, RLHF/PPO, DPO-style objectives, RLAIF/RLVR, reward hacking and alignment evaluation.",
    domains: ["llms", "generative-ai", "agentic-ai"],
    prerequisites: ["llm-finetuning", "math-probability"],
    weight: 3,
    outcome: "Explain and implement a small preference-optimization loop with known limitations.",
    evidence: ["explain", "implement", "design", "debug"],
    tags: ["llm", "rlhf", "dpo", "alignment"],
    resources: ["hands-on-rl", "cs336"],
    checkpoints: [
      "What behavior can a learned reward miss even if held-out reward accuracy is high?",
      "How does a direct preference objective avoid an explicit online RL loop?"
    ]
  }),
  concept({
    id: "llm-evaluation",
    name: "LLM evaluation and safety",
    scope:
      "Task suites, judge reliability, human evaluation, calibration, red teaming, contamination, robustness and safety boundaries.",
    domains: ["llms", "genai-system-design", "agentic-ai"],
    prerequisites: ["evaluation-experimentation", "llm-decoding", "llm-posttraining"],
    weight: 3,
    outcome: "Build an evaluation suite whose limitations and failure handling are explicit.",
    evidence: ["design", "implement", "explain"],
    tags: ["llm", "evaluation", "safety"],
    resources: ["cs336", "hitchhikers-agentic"],
    checkpoints: [
      "How will you estimate whether an LLM judge agrees with qualified humans?",
      "Which adversarial or distribution-shift case is absent from your average score?"
    ]
  }),
  concept({
    id: "llm-from-scratch-build",
    name: "Language model from scratch",
    scope:
      "Tokenizer, model, training loop, evaluation, generation and a transparent experiment report at manageable scale.",
    domains: ["llms"],
    prerequisites: ["llm-pretraining", "llm-decoding", "llm-evaluation"],
    weight: 3,
    outcome: "Train, evaluate and explain a small language model end to end.",
    evidence: ["implement", "debug", "explain", "design"],
    tags: ["llm", "project", "portfolio"],
    resources: ["cs336", "modern-llm-notebook"],
    checkpoints: [
      "Can a clean run reproduce your tokenizer, model and reported validation loss?",
      "Which limitation comes from scale, data, objective or implementation?"
    ]
  })
];

const generativeAiConcepts: Concept[] = [
  concept({
    id: "gen-latent-variable-models",
    name: "Latent-variable generative modeling",
    scope:
      "Likelihood, latent variables, variational inference, ELBO and the modeling assumptions behind VAEs.",
    domains: ["generative-ai"],
    prerequisites: ["math-probability", "math-optimization", "dl-neural-networks"],
    weight: 3,
    outcome: "Derive the VAE objective and implement a small latent-variable model.",
    evidence: ["explain", "implement", "solve"],
    tags: ["generative-ai", "vae", "variational-inference"],
    resources: ["udl", "d2l"],
    practice: ["deep-ml"],
    checkpoints: [
      "Which term in the ELBO encourages useful reconstruction, and which regularizes the latent space?",
      "Why is the reparameterization trick needed for gradient-based learning?"
    ]
  }),
  concept({
    id: "gen-gans",
    name: "Generative adversarial networks",
    scope:
      "Minimax learning, discriminator/generator objectives, training instability, mode collapse and evaluation.",
    domains: ["generative-ai"],
    prerequisites: ["dl-cnns", "math-optimization", "evaluation-experimentation"],
    weight: 2,
    outcome: "Implement a GAN and diagnose common adversarial-training failures.",
    evidence: ["implement", "debug", "explain"],
    tags: ["generative-ai", "gan", "vision"],
    resources: ["d2l", "udl"],
    practice: ["deep-ml"],
    checkpoints: [
      "Why can discriminator accuracy be a misleading training signal?",
      "What evidence distinguishes mode collapse from a bad evaluation sample?"
    ]
  }),
  concept({
    id: "gen-flows",
    name: "Autoregressive models and normalizing flows",
    scope:
      "Exact likelihood, change of variables, invertibility and trade-offs among tractability, speed and expressivity.",
    domains: ["generative-ai"],
    prerequisites: ["gen-latent-variable-models", "math-linear-algebra"],
    weight: 2,
    outcome:
      "Compare likelihood-based model families and implement a simple invertible transformation.",
    evidence: ["explain", "implement", "solve"],
    tags: ["generative-ai", "flows", "autoregressive"],
    resources: ["udl"],
    checkpoints: [
      "Why does invertibility make exact likelihood possible but constrain architecture?",
      "Where does the Jacobian determinant enter the density computation?"
    ]
  }),
  concept({
    id: "gen-diffusion",
    name: "Diffusion and score-based models",
    scope:
      "Forward noising, denoising objectives, score intuition, samplers, guidance and latent diffusion.",
    domains: ["generative-ai"],
    prerequisites: ["gen-latent-variable-models", "dl-cnns"],
    weight: 3,
    outcome:
      "Implement a small diffusion model and explain the cost/quality effect of its sampler.",
    evidence: ["implement", "explain", "debug"],
    tags: ["generative-ai", "diffusion", "score-model"],
    resources: ["udl", "hf-diffusion-course"],
    checkpoints: [
      "Why can predicting noise be equivalent to learning a denoising direction?",
      "What does classifier-free guidance trade for stronger conditioning?"
    ]
  }),
  concept({
    id: "gen-multimodal",
    name: "Multimodal representation and generation",
    scope:
      "Contrastive alignment, vision encoders, cross-attention, image-text models and modality-specific tokenization.",
    domains: ["generative-ai", "llms"],
    prerequisites: ["dl-representation-learning", "dl-attention-transformers", "gen-diffusion"],
    weight: 3,
    outcome:
      "Explain and prototype how two modalities are aligned and jointly generated or understood.",
    evidence: ["design", "implement", "explain"],
    tags: ["generative-ai", "multimodal", "vision-language"],
    resources: ["udl", "modern-llm-notebook"],
    checkpoints: [
      "What makes paired contrastive learning align modalities without requiring a shared decoder?",
      "Where should cross-attention occur in your proposed architecture and why?"
    ],
    coverage: "partial"
  }),
  concept({
    id: "gen-evaluation-safety",
    name: "Generative-model evaluation and safety",
    scope:
      "Likelihood/perceptual metrics, diversity, fidelity, human studies, memorization, provenance and misuse risks.",
    domains: ["generative-ai", "genai-system-design"],
    prerequisites: ["evaluation-experimentation", "gen-gans", "gen-diffusion"],
    weight: 3,
    outcome:
      "Design evaluation across quality, diversity, faithfulness and safety without relying on one score.",
    evidence: ["design", "explain", "implement"],
    tags: ["generative-ai", "evaluation", "safety"],
    resources: ["udl", "mlsysbook"],
    checkpoints: [
      "Which metric could improve while samples become less diverse?",
      "How would you test whether a model memorized identifiable training examples?"
    ]
  }),
  concept({
    id: "gen-project",
    name: "Non-LLM generative build",
    scope:
      "A VAE, GAN, diffusion or multimodal project with reproducible training, meaningful baselines and qualitative/quantitative evaluation.",
    domains: ["generative-ai"],
    prerequisites: ["gen-flows", "gen-multimodal", "gen-evaluation-safety"],
    weight: 3,
    outcome: "Build and defend one generative model beyond text-only LLMs.",
    evidence: ["implement", "debug", "design", "explain"],
    tags: ["generative-ai", "project", "portfolio"],
    resources: ["udl", "d2l", "hf-diffusion-course", "pytorch-tutorials"],
    checkpoints: [
      "Which baseline reveals whether complexity improved the intended quality?",
      "Can you distinguish a data limitation from a modeling limitation?"
    ],
    coverage: "partial"
  })
];

const mlSystemDesignConcepts: Concept[] = [
  concept({
    id: "mlsd-objective",
    name: "ML objective and system boundary",
    scope:
      "Product objective, prediction task, decision policy, constraints, non-ML baseline and feedback loop.",
    domains: ["ml-system-design"],
    prerequisites: ["ml-data-problem", "sys-requirements-estimation"],
    weight: 3,
    outcome: "Frame an ML design around the product decision rather than a model family.",
    evidence: ["design", "mock", "explain"],
    tags: ["ml-system-design", "objective", "metrics"],
    resources: ["mlsysbook", "made-with-ml", "algomaster-courses"],
    checkpoints: [
      "What decision consumes the prediction, and what happens when confidence is low?",
      "Could rules or retrieval meet the objective with less operational risk?"
    ]
  }),
  concept({
    id: "mlsd-data-labels",
    name: "Data, labels and feature systems",
    scope:
      "Collection, labeling, point-in-time correctness, feature reuse, lineage, privacy and data-quality contracts.",
    domains: ["ml-system-design", "ml-systems"],
    prerequisites: ["ml-feature-pipelines", "sys-storage-indexing"],
    weight: 3,
    outcome: "Design trustworthy offline and online data flows without leakage.",
    evidence: ["design", "implement", "explain"],
    tags: ["ml-system-design", "data", "features", "labels"],
    resources: ["mlsysbook", "ai-infra"],
    checkpoints: [
      "How will you reconstruct exactly what the model knew at prediction time?",
      "Which label delay or selection bias changes your training population?"
    ]
  }),
  concept({
    id: "mlsd-training-platform",
    name: "Training and experiment platform",
    scope:
      "Reproducible jobs, orchestration, metadata, artifact/version lineage, distributed needs and cost-aware retraining.",
    domains: ["ml-system-design", "ml-systems"],
    prerequisites: ["mlsd-data-labels", "eng-containers-ci"],
    weight: 3,
    outcome: "Design training jobs that can be reproduced, compared and promoted safely.",
    evidence: ["design", "implement", "debug"],
    tags: ["ml-system-design", "training", "orchestration"],
    resources: ["mlsysbook", "ai-infra", "cmu-mlsystems"],
    checkpoints: [
      "Which exact versions are required to reproduce one model artifact?",
      "What event or evidence should trigger retraining?"
    ]
  }),
  concept({
    id: "mlsd-serving",
    name: "Online and batch inference",
    scope:
      "Batch/stream/online modes, model services, feature lookup, latency, throughput, autoscaling, fallbacks and model rollout.",
    domains: ["ml-system-design", "ml-systems"],
    prerequisites: ["mlsd-training-platform", "sys-reliability"],
    weight: 3,
    outcome: "Choose a serving mode and design a safe path from artifact to decision.",
    evidence: ["design", "implement", "mock"],
    tags: ["ml-system-design", "serving", "inference"],
    resources: ["mlsysbook", "ai-infra", "made-with-ml"],
    checkpoints: [
      "What is the latency budget outside the model itself?",
      "Which fallback preserves product function during model-service failure?"
    ]
  }),
  concept({
    id: "mlsd-monitoring",
    name: "Monitoring and feedback",
    scope:
      "Service health, input/data drift, prediction distributions, delayed labels, outcome metrics and incident response.",
    domains: ["ml-system-design", "ml-systems"],
    prerequisites: ["mlsd-serving", "evaluation-experimentation", "eng-operational-readiness"],
    weight: 3,
    outcome: "Detect operational and model-quality failures and connect alerts to actions.",
    evidence: ["design", "implement", "debug"],
    tags: ["ml-system-design", "monitoring", "drift"],
    resources: ["mlsysbook", "ai-infra", "made-with-ml"],
    checkpoints: [
      "Which input shift is harmless, and which predicts decision failure?",
      "How will you monitor quality before delayed ground truth arrives?"
    ]
  }),
  concept({
    id: "mlsd-ranking-recommendation",
    name: "Retrieval, ranking and recommendation",
    scope:
      "Candidate generation, embeddings, ranking stages, feature freshness, exploration, feedback bias and online evaluation.",
    domains: ["ml-system-design"],
    prerequisites: ["mlsd-serving", "mlsd-data-labels", "hld-media-feed"],
    weight: 3,
    outcome: "Design a multi-stage retrieval/ranking system with a defensible evaluation loop.",
    evidence: ["design", "mock", "explain"],
    tags: ["ml-system-design", "ranking", "recommendation", "retrieval"],
    resources: ["mlsysbook", "algomaster-courses"],
    checkpoints: [
      "Why separate candidate generation from ranking?",
      "How does the current recommender bias the labels used to improve it?"
    ],
    coverage: "gated"
  }),
  concept({
    id: "mlsd-interview-loop",
    name: "Timed ML system-design loop",
    scope:
      "Four end-to-end cases covering data, model, infrastructure, evaluation, feedback, reliability, safety and cost.",
    domains: ["ml-system-design"],
    prerequisites: [
      "mlsd-monitoring",
      "mlsd-ranking-recommendation",
      "ml-interpretability-fairness"
    ],
    weight: 3,
    outcome: "Lead an ML design interview from objective through operational trade-offs.",
    evidence: ["mock", "design", "explain"],
    tags: ["ml-system-design", "interview", "communication"],
    resources: ["mlsysbook", "algomaster-courses"],
    checkpoints: [
      "Did your design connect offline metrics to a product decision?",
      "Which feedback loop could make the deployed system worse over time?"
    ],
    coverage: "gated"
  })
];

const genAiSystemDesignConcepts: Concept[] = [
  concept({
    id: "genaisd-requirements-model",
    name: "Generative-AI requirements and model strategy",
    scope:
      "Task decomposition, quality/latency/cost/privacy constraints, model selection, buy/build decisions and fallback behavior.",
    domains: ["genai-system-design"],
    prerequisites: ["sys-requirements-estimation", "llm-evaluation"],
    weight: 3,
    outcome:
      "Choose a model and architecture from measured task constraints rather than benchmark reputation.",
    evidence: ["design", "mock", "explain"],
    tags: ["genai-system-design", "model-selection", "requirements"],
    resources: ["mlsysbook", "hld-handbook", "algomaster-courses"],
    checkpoints: [
      "Which task-specific failure matters more than average benchmark quality?",
      "When should the system abstain, route or fall back?"
    ]
  }),
  concept({
    id: "genaisd-prompt-context",
    name: "Prompt and context engineering",
    scope:
      "Instruction hierarchy, structured output, context assembly, caching, prompt versioning and injection boundaries.",
    domains: ["genai-system-design", "agentic-ai"],
    prerequisites: ["llm-decoding", "sys-security"],
    weight: 3,
    outcome:
      "Build a versioned prompt pipeline that separates trusted instructions from untrusted context.",
    evidence: ["design", "implement", "debug"],
    tags: ["genai-system-design", "prompting", "context"],
    resources: ["algomaster-courses", "harness-engineering"],
    checkpoints: [
      "Which part of the context is untrusted data rather than an instruction?",
      "How will you test a prompt change against a frozen evaluation set?"
    ],
    coverage: "gated"
  }),
  concept({
    id: "genaisd-rag",
    name: "Retrieval-augmented generation",
    scope:
      "Chunking, indexing, hybrid retrieval, reranking, context packing, citations, freshness and retrieval evaluation.",
    domains: ["genai-system-design", "agentic-ai"],
    prerequisites: ["genaisd-prompt-context", "mlsd-ranking-recommendation"],
    weight: 3,
    outcome: "Design and evaluate a RAG pipeline by separating retrieval and generation failure.",
    evidence: ["design", "implement", "debug"],
    tags: ["genai-system-design", "rag", "retrieval"],
    resources: ["algomaster-courses", "hitchhikers-agentic"],
    checkpoints: [
      "How will you distinguish missing evidence from ignored evidence?",
      "Which chunking decision changes both recall and context waste?"
    ],
    coverage: "gated"
  }),
  concept({
    id: "genaisd-serving-routing",
    name: "Model serving, routing and optimization",
    scope:
      "Hosted versus self-hosted models, batching, caching, routing, rate limits, quantization, latency and token-cost control.",
    domains: ["genai-system-design", "ml-systems"],
    prerequisites: ["llm-decoding", "mlsd-serving", "sys-caching"],
    weight: 3,
    outcome:
      "Design an economical inference path with measurable quality and graceful overload behavior.",
    evidence: ["design", "implement", "explain"],
    tags: ["genai-system-design", "serving", "routing", "cost"],
    resources: ["mlsysbook", "cmu-mlsystems", "ai-infra"],
    checkpoints: [
      "Which requests can share a cache key without leaking user data?",
      "How will routing preserve quality when the preferred model is unavailable?"
    ]
  }),
  concept({
    id: "genaisd-evals-observability",
    name: "Generative-AI evaluation and observability",
    scope:
      "Trace-level datasets, offline/online evaluation, judge calibration, feedback, regression gates and quality/cost/latency monitoring.",
    domains: ["genai-system-design", "agentic-ai"],
    prerequisites: ["llm-evaluation", "eng-operational-readiness", "genaisd-rag"],
    weight: 3,
    outcome: "Operate an evaluation loop that catches regressions before and after release.",
    evidence: ["design", "implement", "debug"],
    tags: ["genai-system-design", "evaluation", "observability"],
    resources: ["hitchhikers-agentic", "harness-engineering", "mlsysbook"],
    checkpoints: [
      "Which trace fields let you reproduce and classify a failed answer?",
      "How will you prevent an automated judge from becoming the only definition of quality?"
    ],
    coverage: "partial"
  }),
  concept({
    id: "genaisd-safety",
    name: "Safety, privacy and adversarial design",
    scope:
      "Prompt injection, data exfiltration, unsafe generation, tenancy, PII, output controls, human escalation and red teaming.",
    domains: ["genai-system-design", "agentic-ai"],
    prerequisites: ["sys-security", "genaisd-evals-observability"],
    weight: 3,
    outcome: "Build layered controls around model limitations and privileged integrations.",
    evidence: ["design", "implement", "debug"],
    tags: ["genai-system-design", "security", "privacy", "safety"],
    resources: ["harness-engineering", "hitchhikers-agentic", "hld-handbook"],
    checkpoints: [
      "What can an attacker cause if retrieved text is treated as instruction?",
      "Which control prevents harm even when the model behaves unexpectedly?"
    ]
  }),
  concept({
    id: "genaisd-design-loop",
    name: "Generative-AI design cases",
    scope:
      "Timed designs for an assistant, enterprise RAG, multimodal workflow and high-volume generation service.",
    domains: ["genai-system-design"],
    prerequisites: ["genaisd-serving-routing", "genaisd-safety"],
    weight: 3,
    outcome:
      "Defend an end-to-end generative-AI design across quality, data, reliability, security and cost.",
    evidence: ["mock", "design", "explain"],
    tags: ["genai-system-design", "interview", "portfolio"],
    resources: ["algomaster-courses", "hld-handbook", "mlsysbook"],
    checkpoints: [
      "Can you trace one request through retrieval, model, tools, safeguards and telemetry?",
      "Which assumption most threatens quality or unit economics at 10× scale?"
    ],
    coverage: "gated"
  })
];

const mlSystemsConcepts: Concept[] = [
  concept({
    id: "mlsys-compute-memory",
    name: "Compute, memory and performance models",
    scope:
      "Hardware hierarchy, arithmetic intensity, roofline reasoning, bandwidth, latency, throughput and profiling.",
    domains: ["ml-systems"],
    prerequisites: ["dsa-complexity", "dl-neural-networks", "eng-concurrency"],
    weight: 3,
    outcome: "Identify whether a workload is compute-, memory- or overhead-bound from evidence.",
    evidence: ["explain", "implement", "debug"],
    tags: ["ml-systems", "performance", "hardware"],
    resources: ["mlsysbook", "cornell-parallel", "cmu-dlsys"],
    checkpoints: [
      "What measurement distinguishes a bandwidth limit from insufficient parallelism?",
      "Why can fewer FLOPs still run slower?"
    ]
  }),
  concept({
    id: "mlsys-frameworks-autodiff",
    name: "Frameworks and automatic differentiation",
    scope:
      "Tensor layouts, computation graphs, operator dispatch, reverse-mode autodiff and framework execution.",
    domains: ["ml-systems"],
    prerequisites: ["dl-neural-networks", "eng-python-functions-iteration"],
    weight: 3,
    outcome: "Build core pieces of a tensor/autodiff framework and explain their abstractions.",
    evidence: ["implement", "debug", "explain"],
    tags: ["ml-systems", "frameworks", "autodiff"],
    resources: ["cmu-dlsys", "mlsysbook"],
    checkpoints: [
      "Which graph information must survive the forward pass for backward?",
      "Where can a non-contiguous tensor make a seemingly simple operator expensive?"
    ]
  }),
  concept({
    id: "mlsys-gpu-kernels",
    name: "GPU execution and kernels",
    scope:
      "SIMT execution, memory hierarchy, coalescing, tiling, occupancy and correctness/performance profiling.",
    domains: ["ml-systems"],
    prerequisites: ["mlsys-compute-memory", "eng-concurrency"],
    weight: 3,
    outcome: "Implement and profile a tiled kernel against a correct baseline.",
    evidence: ["implement", "debug", "explain"],
    tags: ["ml-systems", "gpu", "cuda", "kernels"],
    resources: ["gpu-modern", "cmu-mlsystems"],
    checkpoints: [
      "Which memory access pattern prevents coalescing in this kernel?",
      "Why can higher occupancy fail to improve runtime?"
    ]
  }),
  concept({
    id: "mlsys-compilers",
    name: "Graph and tensor compilers",
    scope:
      "Tracing, graph transformations, fusion, scheduling, code generation and shape-specialization trade-offs.",
    domains: ["ml-systems"],
    prerequisites: ["mlsys-frameworks-autodiff", "mlsys-gpu-kernels"],
    weight: 2,
    outcome:
      "Explain and test how a compiler transformation changes memory traffic or launch overhead.",
    evidence: ["explain", "implement", "debug"],
    tags: ["ml-systems", "compiler", "fusion"],
    resources: ["cmu-mlsystems", "cmu-dlsys"],
    checkpoints: [
      "When can operator fusion increase rather than reduce resource pressure?",
      "What dynamic behavior prevents a graph from being safely specialized?"
    ]
  }),
  concept({
    id: "mlsys-distributed-training",
    name: "Distributed training",
    scope:
      "Collectives, data/model/pipeline parallelism, sharding, memory states, communication overlap and fault recovery.",
    domains: ["ml-systems", "llms"],
    prerequisites: ["sys-consistency-replication", "mlsys-compute-memory", "llm-pretraining"],
    weight: 3,
    outcome:
      "Choose a parallelization plan and estimate its compute, memory and communication costs.",
    evidence: ["design", "implement", "explain", "debug"],
    tags: ["ml-systems", "distributed-training", "parallelism"],
    resources: ["cmu-mlsystems", "mlsysbook", "ai-infra"],
    checkpoints: [
      "Which model state dominates memory, and how does your sharding strategy divide it?",
      "When can communication overlap with compute, and what dependency blocks it?"
    ]
  }),
  concept({
    id: "mlsys-efficiency",
    name: "Model efficiency",
    scope:
      "Mixed precision, quantization, pruning, distillation, sparsity and accuracy/hardware-aware optimization.",
    domains: ["ml-systems", "llms"],
    prerequisites: ["mlsys-compute-memory", "dl-training-dynamics"],
    weight: 3,
    outcome: "Apply one efficiency technique and benchmark quality, memory and latency fairly.",
    evidence: ["implement", "debug", "explain"],
    tags: ["ml-systems", "quantization", "distillation", "efficiency"],
    resources: ["efficientml", "mlsysbook"],
    checkpoints: [
      "Which operations remain high precision and why?",
      "What baseline and hardware conditions make your speedup comparison fair?"
    ]
  }),
  concept({
    id: "mlsys-serving",
    name: "High-performance model serving",
    scope:
      "Batching, scheduling, memory management, KV caches, parallel serving, autoscaling and tail latency.",
    domains: ["ml-systems", "genai-system-design"],
    prerequisites: ["genaisd-serving-routing", "mlsys-compute-memory", "llm-decoding"],
    weight: 3,
    outcome: "Design and benchmark a serving system under realistic request shapes.",
    evidence: ["design", "implement", "debug"],
    tags: ["ml-systems", "serving", "inference"],
    resources: ["cmu-mlsystems", "mlsysbook", "ai-infra"],
    checkpoints: [
      "How does continuous batching change throughput and per-request latency?",
      "Which request distribution makes average latency a dangerous metric?"
    ]
  }),
  concept({
    id: "mlsys-platform-observability",
    name: "ML platform and observability",
    scope:
      "Containers, orchestration, artifact registries, pipelines, feature/data lineage, telemetry, incident response and cost governance.",
    domains: ["ml-systems"],
    prerequisites: ["eng-operational-readiness", "mlsd-monitoring", "eng-containers-ci"],
    weight: 3,
    outcome:
      "Operate a reproducible ML service and diagnose failures across data, model and infrastructure.",
    evidence: ["design", "implement", "debug"],
    tags: ["ml-systems", "mlops", "observability", "platform"],
    resources: ["ai-infra", "mlsysbook", "ml-engineering-book"],
    checkpoints: [
      "Which lineage link lets you trace a bad prediction to data and code?",
      "What alert separates model degradation from infrastructure saturation?"
    ]
  }),
  concept({
    id: "mlsys-project",
    name: "Measured ML systems build",
    scope:
      "One training/framework component and one served system with correctness tests, profiling, reproducibility and operational evidence.",
    domains: ["ml-systems"],
    prerequisites: [
      "mlsys-compilers",
      "mlsys-distributed-training",
      "mlsys-efficiency",
      "mlsys-serving",
      "mlsys-platform-observability"
    ],
    weight: 3,
    outcome:
      "Produce a systems artifact whose performance and reliability claims are reproducible.",
    evidence: ["implement", "debug", "design", "explain"],
    tags: ["ml-systems", "project", "portfolio"],
    resources: ["cmu-dlsys", "ai-infra", "gpu-modern"],
    checkpoints: [
      "Can your benchmark reproduce correctness and performance on a documented environment?",
      "Which system limit appears next after your optimization?"
    ]
  })
];

const agenticConcepts: Concept[] = [
  concept({
    id: "agent-loop",
    name: "Agent loop and task decomposition",
    scope:
      "Observe–reason–act loops, plans, execution state, termination, recovery and when not to use an agent.",
    domains: ["agentic-ai"],
    prerequisites: ["llm-decoding", "eng-apis", "genaisd-prompt-context"],
    weight: 3,
    outcome: "Implement a bounded agent loop and justify why autonomy adds value.",
    evidence: ["design", "implement", "debug"],
    tags: ["agentic-ai", "agent-loop", "planning"],
    resources: ["hitchhikers-agentic", "harness-engineering"],
    checkpoints: [
      "What observable condition ends the loop successfully or safely?",
      "Could a deterministic workflow solve this task more reliably?"
    ]
  }),
  concept({
    id: "agent-tools",
    name: "Tool use and protocol boundaries",
    scope:
      "Tool schemas, function calling, MCP roles, capability discovery, validation, permissions and idempotency.",
    domains: ["agentic-ai", "genai-system-design"],
    prerequisites: ["agent-loop", "eng-apis", "sys-security"],
    weight: 3,
    outcome: "Expose and call tools through narrow, validated and observable contracts.",
    evidence: ["design", "implement", "debug"],
    tags: ["agentic-ai", "tools", "mcp", "function-calling"],
    resources: ["mcp-lesson", "hitchhikers-agentic", "harness-engineering"],
    checkpoints: [
      "Which tool argument must be validated independently of the model?",
      "What action needs confirmation or an idempotency key?"
    ],
    coverage: "partial"
  }),
  concept({
    id: "agent-memory-state",
    name: "Memory and state",
    scope:
      "Working context, durable state, retrieval, summarization, user memory, provenance, forgetting and privacy.",
    domains: ["agentic-ai"],
    prerequisites: ["agent-loop", "genaisd-rag", "sys-storage-indexing"],
    weight: 3,
    outcome:
      "Design memory that improves continuity without confusing retrieved text with truth or authority.",
    evidence: ["design", "implement", "explain"],
    tags: ["agentic-ai", "memory", "state", "retrieval"],
    resources: ["hitchhikers-agentic", "harness-engineering"],
    checkpoints: [
      "Which state is authoritative, derived or merely conversational context?",
      "How can the user inspect, correct or delete durable memory?"
    ]
  }),
  concept({
    id: "agent-orchestration",
    name: "Workflow and multi-agent orchestration",
    scope:
      "Routing, delegation, handoffs, shared state, parallel work, synthesis and the cost of coordination.",
    domains: ["agentic-ai"],
    prerequisites: ["agent-tools", "agent-memory-state", "sys-queues-streams"],
    weight: 2,
    outcome: "Choose a workflow topology and make ownership and failure propagation explicit.",
    evidence: ["design", "implement", "debug"],
    tags: ["agentic-ai", "orchestration", "multi-agent"],
    resources: ["hitchhikers-agentic", "harness-engineering"],
    checkpoints: [
      "What independent work actually benefits from parallel agents?",
      "Who owns final truth when two workers disagree?"
    ]
  }),
  concept({
    id: "agent-evaluation",
    name: "Agent evaluation",
    scope:
      "Task suites, trajectory inspection, tool correctness, success criteria, efficiency, reproducibility and regression tests.",
    domains: ["agentic-ai"],
    prerequisites: ["agent-tools", "genaisd-evals-observability"],
    weight: 3,
    outcome:
      "Evaluate outcomes and trajectories without rewarding persuasive but incorrect behavior.",
    evidence: ["design", "implement", "debug"],
    tags: ["agentic-ai", "evaluation", "traces"],
    resources: ["harness-engineering", "hitchhikers-agentic"],
    checkpoints: [
      "Can the final answer be correct despite a dangerous trajectory?",
      "Which evaluator is deterministic enough to gate a release?"
    ],
    coverage: "partial"
  }),
  concept({
    id: "agent-safety-control",
    name: "Agent safety and human control",
    scope:
      "Least privilege, sandboxing, approvals, prompt injection, data boundaries, audit logs, human escalation and reversible actions.",
    domains: ["agentic-ai"],
    prerequisites: ["agent-tools", "genaisd-safety", "agent-evaluation"],
    weight: 3,
    outcome:
      "Constrain an agent so model failure cannot silently become unbounded system authority.",
    evidence: ["design", "implement", "debug"],
    tags: ["agentic-ai", "safety", "permissions", "sandboxing"],
    resources: ["harness-engineering", "hitchhikers-agentic", "hld-handbook"],
    checkpoints: [
      "What is the maximum damage one compromised tool call can cause?",
      "Which action must remain human-approved even if confidence is high?"
    ]
  }),
  concept({
    id: "agent-reliability",
    name: "Reliable agent engineering",
    scope:
      "Repository context, instructions, checkpoints, retries, verification, observability, resumability and bounded long-running work.",
    domains: ["agentic-ai"],
    prerequisites: ["agent-orchestration", "agent-evaluation", "eng-testing-debugging"],
    weight: 3,
    outcome: "Build a resumable agent harness that verifies work against external evidence.",
    evidence: ["implement", "debug", "design"],
    tags: ["agentic-ai", "harness", "reliability"],
    resources: ["harness-engineering", "hitchhikers-agentic"],
    checkpoints: [
      "What survives a context reset, process crash or worker replacement?",
      "Which external artifact proves the task is complete?"
    ]
  }),
  concept({
    id: "agent-project",
    name: "Evaluated tool-using agent",
    scope:
      "A bounded agent with real tools, durable state, permissions, trace inspection, task evaluation and failure documentation.",
    domains: ["agentic-ai"],
    prerequisites: ["agent-safety-control", "agent-reliability"],
    weight: 3,
    outcome: "Ship an agent whose usefulness, cost and failure modes are measured.",
    evidence: ["implement", "debug", "design", "explain"],
    tags: ["agentic-ai", "project", "portfolio"],
    resources: ["harness-engineering", "mcp-lesson", "hitchhikers-agentic"],
    checkpoints: [
      "What measured task success justifies using the agent?",
      "Can a reviewer replay a failed trace and identify the responsible boundary?"
    ],
    coverage: "partial"
  })
];

export const concepts: Concept[] = [
  ...mathematicalFoundations,
  ...dsaConcepts,
  ...engineeringConcepts,
  ...systemFoundationConcepts,
  ...hldConcepts,
  ...lldConcepts,
  ...coreMlConcepts,
  ...deepLearningConcepts,
  ...llmConcepts,
  ...generativeAiConcepts,
  ...mlSystemDesignConcepts,
  ...genAiSystemDesignConcepts,
  ...mlSystemsConcepts,
  ...agenticConcepts
];

export const conceptsById = new Map(concepts.map((item) => [item.id, item]));
