import type { ResourceUnit } from "../../types";

const auditedOn = "2026-07-26";
const unit = (value: Omit<ResourceUnit, "auditedOn">): ResourceUnit => ({ ...value, auditedOn });

export const supplementaryResourceUnits: ResourceUnit[] = [
  unit({
    id: "supp-build-distributed-tracks",
    resourceId: "build-distributed",
    title: "Build Distributed Systems: public track catalog",
    url: "https://builddistributedsystem.com/tracks",
    kind: "project",
    role: "build",
    conceptIds: [
      "sys-networking",
      "sys-storage-indexing",
      "sys-consistency-replication",
      "sys-reliability",
      "hld-data-intensive",
      "mlsys-project"
    ],
    topics: ["foundations", "consensus", "scalability", "storage", "operations", "real systems"],
    outcome:
      "Choose one mechanism-level build after learning its theory, then use tests and failure injection to show which guarantees the implementation actually provides.",
    prerequisites:
      "Strong programming, networking, concurrency, testing, and distributed-systems theory",
    effort: "Choose one gated track; exact exercise length is not public",
    order: 1,
    auditConfidence: "gated",
    auditNote:
      "The public catalog verifies the track families and implementation focus, but exercise contents require an account and were not represented as verified lessons."
  }),
  unit({
    id: "supp-cmu-dl-foundations",
    resourceId: "cmu-deep-learning",
    title: "CMU 11-785: neural-network foundations and optimization lectures",
    url: "https://deeplearning.cs.cmu.edu/F25/page/tables/lectures_table.html",
    kind: "module",
    role: "supplementary",
    conceptIds: ["dl-neural-networks", "dl-training-dynamics", "dl-debugging"],
    topics: [
      "universal approximation",
      "losses",
      "backpropagation",
      "optimization",
      "regularization"
    ],
    outcome:
      "Use a rigorous lecture sequence to derive neural-network training behavior and repair mathematical or optimization gaps exposed by implementation work.",
    prerequisites: "Linear algebra, calculus, probability, and Python",
    effort: "Select the relevant lectures and paired exercises; full course is semester-length",
    order: 1,
    auditConfidence: "outline_verified",
    auditNote:
      "The Fall 2025 public lecture table exposes dated topics and linked slides/videos; this unit groups the foundation portion rather than claiming one chapter."
  }),
  unit({
    id: "supp-cmu-dl-architectures",
    resourceId: "cmu-deep-learning",
    title: "CMU 11-785: convolutional, sequence, and attention architectures",
    url: "https://deeplearning.cs.cmu.edu/F25/page/tables/lectures_table.html",
    kind: "module",
    role: "advanced",
    conceptIds: [
      "dl-cnns",
      "dl-sequence-models",
      "dl-attention-transformers",
      "dl-representation-learning",
      "dl-project"
    ],
    topics: ["CNNs", "sequence models", "attention", "Transformers", "representation learning"],
    outcome:
      "Compare architecture inductive biases and connect lecture-level derivations to a focused model implementation or ablation.",
    prerequisites: "Neural-network foundations and optimization",
    effort: "Select one architecture block; do not complete alongside every other DL course",
    order: 2,
    auditConfidence: "outline_verified",
    auditNote:
      "Mapped from the public Fall 2025 lecture table and course scope; individual media access may vary."
  }),
  unit({
    id: "supp-modern-rl-posttraining",
    resourceId: "hands-on-rl",
    title: "Hands-On Modern RL Part IV: LLM alignment and post-training",
    url: "https://walkinglabs.github.io/hands-on-modern-rl/chapter15_rlhf/intro",
    kind: "module",
    role: "advanced",
    conceptIds: ["llm-finetuning", "llm-posttraining", "llm-evaluation", "gen-evaluation-safety"],
    topics: ["RLHF", "reward models", "PPO", "DPO", "GRPO", "RLVR", "evaluation"],
    outcome:
      "Trace a base-model-to-assistant pipeline, implement or inspect one preference-optimization stage, and evaluate how reward design can create unintended behavior.",
    prerequisites: "PyTorch, probability, deep learning, and Transformer training",
    effort: "Study the post-training chapters selectively and complete one implementation",
    order: 1,
    auditConfidence: "content_verified",
    auditNote:
      "The public book navigation exposes RLHF, industrial post-training, DPO, GRPO/RLVR, reasoning, and process-reward chapters."
  }),
  unit({
    id: "supp-modern-rl-agentic",
    resourceId: "hands-on-rl",
    title: "Hands-On Modern RL Part V: agentic reinforcement learning",
    url: "https://walkinglabs.github.io/hands-on-modern-rl/chapter22_agentic/intro",
    kind: "module",
    role: "advanced",
    conceptIds: ["agent-loop", "agent-tools", "agent-evaluation", "agent-safety-control"],
    topics: ["agentic RL", "tool use", "long-horizon rewards", "verifiers", "evaluation"],
    outcome:
      "Analyze how actions, tools, rewards, and verifiers interact in a long-horizon agent, then test one failure mode instead of equating task completion with reliable behavior.",
    prerequisites: "Agent loops, evaluation basics, and modern RL/post-training foundations",
    effort: "Optional specialization after a basic tool-using agent build",
    order: 2,
    auditConfidence: "content_verified",
    auditNote:
      "The public navigation exposes a dedicated agentic-RL part; this is advanced enrichment, not a prerequisite for the agent path."
  }),
  unit({
    id: "supp-hitchhiker-agentic",
    resourceId: "hitchhikers-agentic",
    title: "The Hitchhiker’s Guide to Agentic AI: foundations to systems",
    url: "https://arxiv.org/abs/2606.24937",
    kind: "reference",
    role: "primary",
    conceptIds: [
      "agent-loop",
      "agent-tools",
      "agent-memory-state",
      "agent-orchestration",
      "agent-evaluation",
      "agent-safety-control",
      "agent-reliability",
      "agent-project"
    ],
    topics: [
      "agent foundations",
      "tools",
      "memory",
      "multi-agent systems",
      "evaluation",
      "safety",
      "systems"
    ],
    outcome:
      "Use the survey as an architecture index: locate the relevant design family, compare its assumptions, and turn the reading into a testable build decision.",
    prerequisites: "LLM application and software-engineering basics",
    effort: "Read by architecture section alongside an agent project",
    order: 1,
    auditConfidence: "content_verified",
    auditNote:
      "The open paper is a broad conceptual reference; it is mapped as one reference unit rather than invented chapter URLs."
  }),
  unit({
    id: "supp-ml-engineering-training-debug",
    resourceId: "ml-engineering-book",
    title: "ML Engineering Open Book: training, debugging, and testing",
    url: "https://github.com/stas00/ml-engineering/tree/master/debug",
    kind: "reference",
    role: "supplementary",
    conceptIds: [
      "eng-testing-debugging",
      "dl-training-dynamics",
      "dl-debugging",
      "mlsys-platform-observability"
    ],
    topics: ["training failures", "PyTorch debugging", "testing", "observability"],
    outcome:
      "Use operational symptom-to-hypothesis guides to reproduce a training failure, isolate its layer, and preserve the diagnosis as a regression check.",
    prerequisites: "Hands-on model training and basic systems debugging",
    effort: "Consult by failure; not a linear course",
    order: 1,
    auditConfidence: "content_verified",
    auditNote:
      "The open repository exposes dedicated debug, testing, training, and operational reference trees."
  }),
  unit({
    id: "supp-ml-engineering-infrastructure",
    resourceId: "ml-engineering-book",
    title: "ML Engineering Open Book: compute, networking, orchestration, and distributed training",
    url: "https://github.com/stas00/ml-engineering/tree/master/training",
    kind: "reference",
    role: "advanced",
    conceptIds: [
      "mlsys-compute-memory",
      "mlsys-distributed-training",
      "mlsys-serving",
      "mlsys-platform-observability"
    ],
    topics: ["accelerators", "networking", "distributed training", "orchestration", "inference"],
    outcome:
      "Connect a measured performance or reliability bottleneck to the relevant compute, network, orchestration, training, or inference layer before changing the system.",
    prerequisites: "ML systems foundations and access to profiling evidence",
    effort: "Consult by bottleneck; advanced field reference",
    order: 2,
    auditConfidence: "content_verified",
    auditNote:
      "The repository’s public top-level structure exposes compute, storage, network, orchestration, training, inference, debug, and testing sections."
  }),
  unit({
    id: "supp-nptel-ml-math-playlist",
    resourceId: "nptel-ml-math",
    title: "NPTEL Mathematical Foundations of Machine Learning playlist",
    url: "https://www.youtube.com/playlist?list=PLgMDNELGJ1Cay-Q9Cn8KcpUcC58NDWuiu",
    kind: "video",
    role: "supplementary",
    conceptIds: ["math-linear-algebra", "math-probability", "math-optimization"],
    topics: ["linear algebra", "probability", "calculus", "optimization"],
    outcome:
      "Use selected formal lectures to repair a specific derivation gap, then demonstrate the repair by solving or coding the corresponding ML calculation.",
    prerequisites: "Undergraduate calculus and linear algebra",
    effort: "Course-length playlist; choose lectures by a diagnosed gap",
    order: 1,
    auditConfidence: "metadata_only",
    auditNote:
      "Playlist-level title and availability were verified; individual video coverage and timestamps were not inferred."
  }),
  unit({
    id: "supp-pytorch-autograd",
    resourceId: "pytorch-tutorials",
    title: "PyTorch Learn the Basics: automatic differentiation",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html",
    kind: "lesson",
    role: "supplementary",
    conceptIds: ["dl-neural-networks", "mlsys-frameworks-autodiff"],
    topics: ["computation graphs", "gradients", "backpropagation", "autograd"],
    outcome:
      "Inspect PyTorch’s dynamic computation graph, control gradient tracking, and relate accumulated parameter gradients to the derivatives derived by hand.",
    prerequisites: "Tensors, derivatives, and a basic neural-network forward pass",
    effort: "One official tutorial plus a small gradient check",
    order: 1,
    auditConfidence: "content_verified",
    auditNote: "Current official PyTorch tutorial; exact lesson URL and content were verified."
  }),
  unit({
    id: "supp-pytorch-profiler",
    resourceId: "pytorch-tutorials",
    title: "PyTorch Profiler recipe",
    url: "https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html",
    kind: "lesson",
    role: "supplementary",
    conceptIds: ["mlsys-compute-memory", "mlsys-efficiency", "mlsys-platform-observability"],
    topics: ["profiler", "CPU", "CUDA", "operator time", "memory"],
    outcome:
      "Capture a model profile, identify the dominant operators or memory consumers, and support an optimization claim with before-and-after measurements.",
    prerequisites: "PyTorch model execution and basic performance vocabulary",
    effort: "One official recipe plus a profile of an existing model",
    order: 2,
    auditConfidence: "content_verified",
    auditNote: "Current official PyTorch profiler recipe URL and scope were verified."
  }),
  unit({
    id: "supp-pytorch-ddp",
    resourceId: "pytorch-tutorials",
    title: "PyTorch DistributedDataParallel tutorial",
    url: "https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html",
    kind: "lesson",
    role: "advanced",
    conceptIds: ["mlsys-distributed-training", "mlsys-project"],
    topics: [
      "DistributedDataParallel",
      "process groups",
      "gradient synchronization",
      "checkpointing"
    ],
    outcome:
      "Run and reason about data-parallel training across processes, including initialization, synchronization, checkpointing, and common multi-process failure boundaries.",
    prerequisites: "PyTorch training loops, multiprocessing, and distributed-training concepts",
    effort:
      "One official tutorial; requires a suitable local or multi-GPU environment for full execution",
    order: 3,
    auditConfidence: "content_verified",
    auditNote: "Current official DDP tutorial URL and scope were verified."
  })
];
