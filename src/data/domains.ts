import type { Domain } from "../types";

export const domains: Domain[] = [
  {
    id: "dsa",
    name: "DSA & Problem Solving",
    shortName: "DSA",
    description:
      "Pattern-led interview problem solving with invariants, complexity reasoning, deliberate review and one primary problem spine.",
    guidingQuestion: "Can I derive, code and explain the solution under interview constraints?",
    color: "#446c49",
    path: [
      "dsa-complexity",
      "dsa-arrays-hashing",
      "dsa-two-pointer-window",
      "dsa-search-intervals",
      "dsa-linear-structures",
      "dsa-trees",
      "dsa-graphs",
      "dsa-shortest-paths",
      "dsa-backtracking-greedy",
      "dsa-dp",
      "dsa-interview-conversion"
    ]
  },
  {
    id: "engineering",
    name: "ML Interview Engineering Essentials",
    shortName: "Engineering",
    description:
      "A deliberately practical software foundation: Python, testing, Git, SQL, APIs, concurrency, deployment and operations.",
    guidingQuestion: "Can I build and operate reliable software around a model?",
    color: "#4b687a",
    path: [
      "eng-python",
      "eng-python-functions-iteration",
      "eng-python-oop-dataclasses",
      "eng-python-types-validation",
      "eng-python-files-data",
      "eng-python-async",
      "dsa-complexity",
      "eng-testing-debugging",
      "eng-git-collaboration",
      "eng-sql-data",
      "eng-apis",
      "eng-concurrency",
      "eng-containers-ci",
      "eng-operational-readiness"
    ]
  },
  {
    id: "system-design-foundations",
    name: "System Design Foundations",
    shortName: "Design foundations",
    description: "The shared vocabulary and mechanisms behind dependable distributed services.",
    guidingQuestion: "Can I connect a requirement to the mechanism and its failure behavior?",
    color: "#725d43",
    path: [
      "sys-requirements-estimation",
      "eng-apis",
      "sys-networking",
      "sys-storage-indexing",
      "sys-caching",
      "sys-queues-streams",
      "sys-consistency-replication",
      "sys-reliability",
      "sys-security"
    ]
  },
  {
    id: "hld",
    name: "High-Level System Design",
    shortName: "HLD",
    description:
      "Architecture-level design practice across data, real-time, media and durable workflows.",
    guidingQuestion: "Can I lead a design from requirements to trade-offs and failure handling?",
    color: "#8b603b",
    path: [
      "sys-requirements-estimation",
      "sys-networking",
      "sys-storage-indexing",
      "sys-caching",
      "sys-queues-streams",
      "sys-consistency-replication",
      "sys-reliability",
      "hld-data-intensive",
      "hld-real-time",
      "hld-media-feed",
      "hld-payments-workflows",
      "hld-observability-cost",
      "hld-interview-loop"
    ]
  },
  {
    id: "lld",
    name: "Low-Level System Design",
    shortName: "LLD",
    description:
      "Executable object and component design: contracts, state, extensibility, concurrency and tests.",
    guidingQuestion: "Can I turn a design into clean, tested code that can evolve?",
    color: "#6d5278",
    path: [
      "eng-python-oop-dataclasses",
      "lld-oo-modeling",
      "lld-solid-patterns",
      "lld-state-workflow",
      "lld-extensible-services",
      "sys-caching",
      "lld-concurrent-components",
      "lld-testing-evolution",
      "lld-interview-builds"
    ]
  },
  {
    id: "ml-system-design",
    name: "ML System Design",
    shortName: "ML design",
    description:
      "End-to-end ML product design connecting objectives, data, training, serving, monitoring and feedback.",
    guidingQuestion: "Can I design the complete decision system, not just select a model?",
    color: "#315f67",
    path: [
      "math-probability",
      "evaluation-experimentation",
      "ml-data-problem",
      "ml-feature-pipelines",
      "sys-requirements-estimation",
      "mlsd-objective",
      "mlsd-data-labels",
      "mlsd-training-platform",
      "mlsd-serving",
      "mlsd-monitoring",
      "mlsd-ranking-recommendation",
      "mlsd-interview-loop"
    ]
  },
  {
    id: "genai-system-design",
    name: "Generative-AI System Design",
    shortName: "GenAI design",
    description:
      "Quality-, safety-, latency- and cost-aware architecture for LLM and multimodal products.",
    guidingQuestion: "Can I make a generative system useful, measurable and safe in production?",
    color: "#84554f",
    path: [
      "llm-decoding",
      "llm-evaluation",
      "sys-requirements-estimation",
      "genaisd-requirements-model",
      "genaisd-prompt-context",
      "genaisd-rag",
      "genaisd-serving-routing",
      "genaisd-evals-observability",
      "genaisd-safety",
      "genaisd-design-loop"
    ]
  },
  {
    id: "core-ml",
    name: "Core Machine Learning & Data Science",
    shortName: "Core ML",
    description:
      "Mathematical foundations, classical models, evaluation, data pipelines and an end-to-end predictive project.",
    guidingQuestion: "Can I build a trustworthy baseline and explain why it works or fails?",
    color: "#397058",
    path: [
      "eng-python",
      "eng-python-functions-iteration",
      "eng-python-files-data",
      "math-linear-algebra",
      "math-probability",
      "math-optimization",
      "evaluation-experimentation",
      "ml-data-problem",
      "ml-linear-models",
      "ml-trees-ensembles",
      "ml-unsupervised",
      "ml-model-selection",
      "ml-feature-pipelines",
      "ml-interpretability-fairness",
      "ml-end-to-end-project"
    ]
  },
  {
    id: "deep-learning",
    name: "Core Deep Learning",
    shortName: "Deep learning",
    description:
      "Neural-network mechanics, training, architectures, representation learning and systematic debugging.",
    guidingQuestion:
      "Can I implement, train and diagnose a neural model rather than only use a library?",
    color: "#375f8a",
    path: [
      "math-linear-algebra",
      "math-probability",
      "math-optimization",
      "dl-neural-networks",
      "dl-training-dynamics",
      "dl-cnns",
      "dl-sequence-models",
      "dl-attention-transformers",
      "dl-representation-learning",
      "dl-debugging",
      "dl-project"
    ]
  },
  {
    id: "llms",
    name: "Core Large Language Models",
    shortName: "LLMs",
    description:
      "Language models from tokenization and architecture through training, decoding, post-training and evaluation.",
    guidingQuestion:
      "Can I build and reason about a language model across data, model and inference?",
    color: "#5c4f91",
    path: [
      "dl-neural-networks",
      "dl-attention-transformers",
      "llm-tokenization-data",
      "llm-architecture",
      "llm-pretraining",
      "llm-decoding",
      "llm-finetuning",
      "llm-posttraining",
      "llm-evaluation",
      "llm-from-scratch-build"
    ]
  },
  {
    id: "generative-ai",
    name: "Generative AI Beyond LLMs",
    shortName: "Generative AI",
    description:
      "Latent-variable, adversarial, flow, diffusion and multimodal generative modeling.",
    guidingQuestion: "Can I compare, build and evaluate generative model families beyond text?",
    color: "#9a5d64",
    path: [
      "math-probability",
      "dl-neural-networks",
      "dl-cnns",
      "gen-latent-variable-models",
      "gen-gans",
      "gen-flows",
      "gen-diffusion",
      "dl-representation-learning",
      "gen-multimodal",
      "gen-evaluation-safety",
      "gen-project"
    ]
  },
  {
    id: "ml-systems",
    name: "Core ML Systems",
    shortName: "ML systems",
    description:
      "Frameworks, hardware, kernels, compilers, distributed training, efficient inference and production platforms.",
    guidingQuestion:
      "Can I explain and measure where an ML workload spends time, memory and reliability budget?",
    color: "#4d6067",
    path: [
      "eng-concurrency",
      "eng-python-async",
      "dl-neural-networks",
      "mlsys-compute-memory",
      "mlsys-frameworks-autodiff",
      "mlsys-gpu-kernels",
      "mlsys-compilers",
      "mlsys-distributed-training",
      "mlsys-efficiency",
      "mlsys-serving",
      "mlsys-platform-observability",
      "mlsys-project"
    ]
  },
  {
    id: "agentic-ai",
    name: "Agentic AI",
    shortName: "Agents",
    description:
      "Bounded autonomy through tool use, state, orchestration, evaluation, safety and reliable harnesses.",
    guidingQuestion:
      "Can I prove an agent is useful and keep its authority within safe boundaries?",
    color: "#846b34",
    path: [
      "eng-python",
      "eng-python-functions-iteration",
      "eng-python-oop-dataclasses",
      "eng-python-types-validation",
      "eng-python-files-data",
      "eng-python-async",
      "eng-apis",
      "llm-decoding",
      "genaisd-prompt-context",
      "agent-loop",
      "agent-tools",
      "genaisd-rag",
      "agent-memory-state",
      "agent-orchestration",
      "agent-evaluation",
      "agent-safety-control",
      "agent-reliability",
      "agent-project"
    ]
  }
];

export const domainsById = new Map(domains.map((domain) => [domain.id, domain]));
