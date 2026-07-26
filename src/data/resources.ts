import type { Resource } from "../types";

const auditedOn = "2026-07-26";

export const resources: Resource[] = [
  {
    id: "algomaster-150",
    title: "AlgoMaster 150",
    url: "https://algomaster.io/practice/dsa-patterns?tab=am-150",
    sourceGroup: "Practice / Overall-Prep",
    role: "preferred",
    access: "mixed",
    modes: ["practice", "interview_prep"],
    depth: "mixed",
    effort: "150 problems; pace depends on review depth",
    assumptions: "One interview language, standard library fluency, and basic Big-O.",
    auditNote:
      "The exact practice page was not renderable by the audit browser. Sai confirmed access and recommends its explanations; the public catalog verifies AlgoMaster's pattern-led DSA scope.",
    selectionRationale:
      "The single DSA problem spine. Use explanations after a serious attempt and keep independent evidence and revision history here.",
    auditedOn
  },
  {
    id: "algomaster-courses",
    title: "AlgoMaster Courses",
    url: "https://algomaster.io/courses",
    sourceGroup: "Practice / Overall-Prep",
    role: "supplementary",
    access: "mixed",
    modes: ["explanation", "practice", "interview_prep"],
    depth: "mixed",
    effort: "No reliable public total",
    assumptions: "Varies by course; some content or features may require paid access.",
    auditNote:
      "The public catalog verifies DSA, HLD, LLD, concurrency, SQL, AI engineering and ML system-design tracks; lesson-level access was not assumed.",
    selectionRationale:
      "A coherent interview wrapper, especially useful for DSA explanations, LLD and timed design practice.",
    auditedOn
  },
  {
    id: "algomaster-python-ai",
    title: "AlgoMaster Python for AI",
    url: "https://algomaster.io/learn/ai-engineering/python-essentials-for-ai",
    sourceGroup: "Overall-Prep / AI Engineering",
    role: "preferred",
    access: "mixed",
    modes: ["explanation", "implementation", "practice"],
    depth: "intermediate",
    effort: "Six ordered Python modules plus quizzes and examples",
    assumptions: "Basic programming familiarity; later modules assume comfort reading Python code.",
    auditNote:
      "The public course outline exposes six Python modules: essentials, functions/decorators/generators, OOP/dataclasses, type hints/Pydantic, files/data, and async Python. Some premium features remain gated.",
    selectionRationale:
      "Sai's explicit primary Python path, with examples oriented toward data, APIs, model serving, RAG and agent systems.",
    auditedOn
  },
  {
    id: "dsa-handbook",
    title: "The DSA Handbook",
    url: "https://dsa.handbook.academy/curriculum/",
    sourceGroup: "Overall-Prep",
    role: "reference_only",
    access: "open",
    modes: ["explanation", "reference"],
    depth: "mixed",
    effort: "Use just-in-time, not as a second syllabus",
    assumptions: "Programming basics and asymptotic reasoning.",
    auditNote:
      "The public curriculum exposes 120 ordered chapters across foundations, data structures, interview patterns, graphs, dynamic programming and an interview framework.",
    selectionRationale:
      "Repair conceptual gaps exposed by AlgoMaster problems without creating a competing backlog.",
    auditedOn
  },
  {
    id: "deep-ml",
    title: "Deep-ML Practice Problems",
    url: "https://www.deep-ml.com/problems",
    sourceGroup: "Practice",
    role: "preferred",
    access: "open",
    modes: ["practice", "implementation"],
    depth: "mixed",
    effort: "Problem-based; select by concept",
    assumptions: "Python, NumPy, linear algebra and ML foundations.",
    auditNote:
      "The public problem index is accessible and covers ML coding; exact per-problem access should be checked when assigned.",
    selectionRationale:
      "Direct implementation evidence for mathematical ML and deep-learning concepts, separate from DSA practice.",
    auditedOn
  },
  {
    id: "hld-handbook",
    title: "The HLD Handbook",
    url: "https://hld.handbook.academy/curriculum/",
    sourceGroup: "Overall-Prep / Systems",
    role: "preferred",
    access: "open",
    modes: ["explanation", "reference", "interview_prep"],
    depth: "mixed",
    effort: "Medium–high when followed selectively",
    assumptions: "Basic web, networking, OS and database vocabulary.",
    auditNote:
      "The public curriculum exposes distributed building blocks, reliability, security and case studies with per-part estimates.",
    selectionRationale:
      "The primary open HLD path; pair it with timed designs rather than another full design course.",
    auditedOn
  },
  {
    id: "build-distributed",
    title: "Build Distributed Systems",
    url: "https://builddistributedsystem.com/",
    sourceGroup: "Overall-Prep / Systems",
    role: "supplementary",
    access: "gated",
    modes: ["implementation", "project"],
    depth: "advanced",
    effort: "Choose 1–3 tracks; do not treat the full catalog as required",
    assumptions: "Strong programming, CLI/testing, networking and concurrency.",
    auditNote:
      "The indexed catalog advertises challenge tracks, but exercise access appears account-based and was not independently verified.",
    selectionRationale:
      "Implementation counterpart to HLD theory for a few deliberately chosen distributed-systems mechanisms.",
    auditedOn
  },
  {
    id: "cs162",
    title: "Berkeley CS 162: Operating Systems",
    url: "https://cs162.org/",
    sourceGroup: "Systems-courses+books",
    role: "reference_only",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "advanced",
    effort: "A full term with projects; use selected modules for interview foundations",
    assumptions: "C or Rust systems programming and data structures.",
    auditNote:
      "Public materials cover processes, synchronization, scheduling, virtual memory, filesystems, reliability and distributed systems.",
    selectionRationale:
      "Selected depth for processes, threads and memory; not a required full Core CS degree.",
    auditedOn
  },
  {
    id: "cmu-databases",
    title: "CMU 15-445/645 Database Systems",
    url: "https://15445.courses.cs.cmu.edu/spring2026/schedule.html",
    sourceGroup: "Systems-courses+books",
    role: "reference_only",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "advanced",
    effort: "High for the full course; select storage, indexes and transactions",
    assumptions: "C++, data structures and basic SQL.",
    auditNote:
      "The public schedule exposes 26 lectures, readings and projects from relational models through distributed databases.",
    selectionRationale:
      "Authoritative systems depth when storage, query execution or transactions need more than interview vocabulary.",
    auditedOn
  },
  {
    id: "cornell-parallel",
    title: "Cornell Parallel Programming Roadmap",
    url: "https://cvw.cac.cornell.edu/Parallel/",
    sourceGroup: "Overall-Prep",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "reference"],
    depth: "introductory",
    effort: "Short self-paced conceptual roadmap",
    assumptions: "Basic serial programming.",
    auditNote:
      "Eight public topics cover threads/processes, memory, communication, efficiency and large-scale parallelism.",
    selectionRationale: "A compact bridge before GPU programming or distributed training.",
    auditedOn
  },
  {
    id: "mlsysbook",
    title: "Machine Learning Systems",
    url: "https://mlsysbook.ai/",
    sourceGroup: "Overall-Prep",
    role: "preferred",
    access: "open",
    modes: ["explanation", "reference", "implementation"],
    depth: "mixed",
    effort: "Medium–high; read selectively alongside a build",
    assumptions: "ML fundamentals, Python and basic systems concepts.",
    auditNote:
      "The public site provides two volumes, labs, TinyTorch modules, performance modeling and deployment kits.",
    selectionRationale:
      "The primary principles-first reference for the end-to-end ML lifecycle and fleet-scale systems.",
    auditedOn
  },
  {
    id: "ai-infra",
    title: "AI Infrastructure Engineer Learning Path",
    url: "https://github.com/ai-infra-curriculum/ai-infra-engineer-learning",
    sourceGroup: "Overall-Prep / MLSys",
    role: "preferred",
    access: "open",
    modes: ["implementation", "project", "tooling"],
    depth: "mixed",
    effort: "Substantial; select one production project",
    assumptions: "Python, Git, command line, containers and basic cloud concepts.",
    auditNote:
      "The public repository has ten modules, labs, quizzes and projects; its own status notes incomplete exercise coverage.",
    selectionRationale:
      "The practical platform complement to MLSysBook across containers, pipelines, MLOps, serving and observability.",
    auditedOn
  },
  {
    id: "cmu-dlsys",
    title: "CMU Deep Learning Systems",
    url: "https://dlsyscourse.org/lectures/",
    sourceGroup: "MLSys-courses",
    role: "preferred",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "advanced",
    effort: "High; complete core framework assignments",
    assumptions: "Python, data structures, calculus and basic deep learning.",
    auditNote:
      "Public lectures and notebooks build a DL library through autodiff, operators, optimization, hardware acceleration and deployment.",
    selectionRationale: "The implementation bridge between deep-learning knowledge and ML systems.",
    auditedOn
  },
  {
    id: "cmu-mlsystems",
    title: "CMU 15-442/642 Machine Learning Systems",
    url: "https://mlsyscourse.org/schedule",
    sourceGroup: "MLSys-courses",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "advanced",
    effort: "High; choose instead of an overlapping advanced systems course",
    assumptions: "Deep learning plus systems and programming fluency.",
    auditNote:
      "The public course covers autodiff, GPU/CUDA, transformer workloads, compilers, parallelism, memory and LLM serving.",
    selectionRationale: "A broad advanced option after DL systems fundamentals.",
    auditedOn
  },
  {
    id: "efficientml",
    title: "MIT 6.5940 EfficientML",
    url: "https://hanlab.mit.edu/courses/2024-fall-65940",
    sourceGroup: "MLSys-courses",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "advanced",
    effort: "Medium–high; five labs are publicly listed",
    assumptions: "Deep learning and PyTorch.",
    auditNote:
      "The public course provides slides, videos and labs on pruning, quantization, distillation, TinyML and LLM efficiency.",
    selectionRationale:
      "A focused efficiency/deployment specialization, not an additional general ML systems syllabus.",
    auditedOn
  },
  {
    id: "gpu-modern",
    title: "Modern GPU Programming for ML Systems",
    url: "https://mlc.ai/modern-gpu-programming-for-mlsys/",
    sourceGroup: "GPU",
    role: "preferred",
    access: "open",
    modes: ["explanation", "implementation", "reference"],
    depth: "advanced",
    effort: "High; build and profile one end-to-end kernel",
    assumptions: "Parallel-programming foundations and GPU access.",
    auditNote:
      "The open book progresses from execution and layouts to tensor cores, GEMM and FlashAttention.",
    selectionRationale:
      "The kernel-specialization path after—not before—general ML systems fundamentals.",
    auditedOn
  },
  {
    id: "d2l",
    title: "Dive into Deep Learning",
    url: "https://d2l.ai/",
    sourceGroup: "Books-DL+LLM",
    role: "preferred",
    access: "open",
    modes: ["explanation", "implementation", "reference"],
    depth: "mixed",
    effort: "Use selected chapters with executable notebooks",
    assumptions: "Python and basic linear algebra/calculus.",
    auditNote:
      "Open interactive book with executable implementations spanning ML foundations, CNNs, sequence models, attention and optimization.",
    selectionRationale: "A concise implementation-led deep-learning spine.",
    auditedOn
  },
  {
    id: "udl",
    title: "Understanding Deep Learning",
    url: "https://udlbook.github.io/udlbook/",
    sourceGroup: "Books-DL+LLM",
    role: "reference_only",
    access: "open",
    modes: ["explanation", "reference"],
    depth: "mixed",
    effort: "Consult for conceptual depth",
    assumptions: "Basic calculus, probability and linear algebra.",
    auditNote:
      "The open book provides theory-first explanations, figures and exercises across modern deep learning.",
    selectionRationale:
      "A second perspective when implementation-first material leaves the mathematics unclear.",
    auditedOn
  },
  {
    id: "cmu-deep-learning",
    title: "CMU Deep Learning",
    url: "https://deeplearning.cs.cmu.edu/F25/index.html",
    sourceGroup: "DL-courses",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "implementation"],
    depth: "advanced",
    effort: "Full university course; select only where deeper rigor is needed",
    assumptions: "Linear algebra, probability, calculus and programming.",
    auditNote:
      "Public course materials cover neural-network foundations through contemporary architectures and sequence modeling.",
    selectionRationale:
      "Rigorous supplementary lectures; do not run in parallel with every other DL course.",
    auditedOn
  },
  {
    id: "cs336",
    title: "Stanford CS336: Language Modeling from Scratch",
    url: "https://cs336.stanford.edu/",
    sourceGroup: "LLM-courses",
    role: "preferred",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "advanced",
    effort: "High; implementation-heavy university course",
    assumptions: "PyTorch, deep learning, probability and systems fluency.",
    auditNote:
      "The public course and assignments cover tokenization, Transformer implementation, training, scaling, data and alignment.",
    selectionRationale: "The primary from-scratch LLM path once DL foundations are solid.",
    auditedOn
  },
  {
    id: "eleutherai-performance-videos",
    title: "EleutherAI ML Scalability & Performance Reading Group",
    url: "https://youtube.com/playlist?list=PLvtrkEledFjqOLuDB_9FWL3dgivYqc6-3",
    sourceGroup: "YT-Mustwatch / ML Systems",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "reference"],
    depth: "advanced",
    effort: "Select sessions by concept; do not watch the playlist indiscriminately",
    assumptions:
      "Deep-learning and systems foundations; individual sessions may assume paper familiarity.",
    auditNote:
      "The public playlist metadata is enumerable. Individual videos are mapped only when descriptions, chapters or other public metadata support the claimed coverage.",
    selectionRationale:
      "Research-oriented explanations for GPU architecture, distributed training and performance topics after the main ML-systems path.",
    auditedOn
  },
  {
    id: "jia-bin-transformer-videos",
    title: "Jia-Bin Huang: Modern Transformer Architecture Explained",
    url: "https://youtube.com/playlist?list=PLdUcsPPD8lGzctkUXlvcmSBL1GeoErrd5",
    sourceGroup: "YT-Mustwatch / LLMs",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "reference"],
    depth: "mixed",
    effort: "Short visual explainers selected by architecture topic",
    assumptions: "Basic attention and Transformer vocabulary.",
    auditNote:
      "The public playlist exposes individual modern-architecture explainers. Exact mappings rely on video chapters and descriptions where available.",
    selectionRationale:
      "A visual second pass for modern attention, inference and architecture choices; it does not replace derivation or implementation.",
    auditedOn
  },
  {
    id: "umar-jamil-flash-attention",
    title: "FlashAttention derived and implemented in Triton",
    url: "https://www.youtube.com/watch?v=zy8ChVd_oTM",
    sourceGroup: "YT-Mustwatch / LLMs / GPU",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "implementation"],
    depth: "advanced",
    effort: "7h 38m; use the mapped chapters selectively",
    assumptions: "Attention, matrix calculus, PyTorch/autograd and introductory GPU vocabulary.",
    auditNote:
      "Public metadata and chapters expose the progression from safe/online softmax through the FlashAttention derivation, Triton forward/backward kernels, autotuning and pipelining.",
    selectionRationale:
      "A demanding derivation-to-kernel build that connects attention math, autodiff, memory traffic and Triton implementation.",
    auditedOn
  },
  {
    id: "modern-llm-notebook",
    title: "Modern LLM Notebook",
    url: "https://walkinglabs.github.io/modern-llm-notebook/?lang=en",
    sourceGroup: "Overall-Prep",
    role: "supplementary",
    access: "unverified",
    modes: ["explanation", "implementation"],
    depth: "advanced",
    effort: "Select notebooks by concept",
    assumptions: "Python, PyTorch, linear algebra, probability and deep learning.",
    auditNote:
      "The target did not render in the audit browser, so notebook count and completeness were not independently confirmed.",
    selectionRationale:
      "Implementation-first reinforcement for Transformer internals and selected modern variants.",
    auditedOn
  },
  {
    id: "hands-on-rl",
    title: "Hands-On Modern Reinforcement Learning",
    url: "https://walkinglabs.github.io/hands-on-modern-rl/",
    sourceGroup: "Overall-Prep",
    role: "preferred",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "advanced",
    effort: "A substantial specialization; select the classical-to-post-training path",
    assumptions: "Python, PyTorch, probability, calculus and paper-reading comfort.",
    auditNote:
      "The public course spans MDPs through PPO, offline RL, RLHF, DPO, GRPO and agentic RL; it is active and evolving.",
    selectionRationale:
      "A practice-first route for RL and post-training, not a prerequisite for general LLM application work.",
    auditedOn
  },
  {
    id: "hitchhikers-agentic",
    title: "The Hitchhiker’s Guide to Agentic AI",
    url: "https://arxiv.org/abs/2606.24937",
    sourceGroup: "Books-DL+LLM",
    role: "preferred",
    access: "open",
    modes: ["explanation", "reference"],
    depth: "mixed",
    effort: "Read by architecture section, then build",
    assumptions: "LLM application and software-engineering basics.",
    auditNote:
      "Open survey/book-style resource covering foundations, agent components and systems considerations.",
    selectionRationale:
      "The conceptual spine for agent architecture; practical mastery still requires a tool-using build and evaluation.",
    auditedOn
  },
  {
    id: "harness-engineering",
    title: "Learn Harness Engineering",
    url: "https://walkinglabs.github.io/learn-harness-engineering/en/",
    sourceGroup: "Overall-Prep",
    role: "supplementary",
    access: "open",
    modes: ["explanation", "project", "tooling"],
    depth: "intermediate",
    effort: "Short lectures plus selected projects",
    assumptions: "Experience using a coding agent in a repository.",
    auditNote:
      "Public lectures, projects and templates cover rules, state, verification, observability and long-running agent workflows.",
    selectionRationale:
      "Concrete engineering practices for reliable software agents, distinct from general LLM theory.",
    auditedOn
  },
  {
    id: "mcp-lesson",
    title: "Model Context Protocol lesson",
    url: "https://aiengineeringfromscratch.com/lesson.html?path=phases/11-llm-engineering/14-model-context-protocol",
    sourceGroup: "Overall-Prep",
    role: "supplementary",
    access: "unverified",
    modes: ["explanation", "implementation"],
    depth: "intermediate",
    effort: "One targeted lesson/lab",
    assumptions: "Python, LLM application basics and client/server concepts.",
    auditNote:
      "The public page shell is JavaScript-rendered; lesson-level claims were not inferred.",
    selectionRationale:
      "A targeted protocol implementation after building a basic tool-calling workflow.",
    auditedOn
  },
  {
    id: "ml-engineering-book",
    title: "Machine Learning Engineering Open Book",
    url: "https://github.com/stas00/ml-engineering",
    sourceGroup: "gh-repo's",
    role: "reference_only",
    access: "open",
    modes: ["reference", "tooling"],
    depth: "advanced",
    effort: "Consult by problem",
    assumptions: "Hands-on model training and systems experience.",
    auditNote: "Open, evolving engineering reference focused on practical training and debugging.",
    selectionRationale:
      "A field reference when training, hardware or distributed failures require operational detail.",
    auditedOn
  },
  {
    id: "nptel-ml-math",
    title: "Mathematical Foundations of Machine Learning",
    url: "https://www.youtube.com/playlist?list=PLgMDNELGJ1Cay-Q9Cn8KcpUcC58NDWuiu",
    sourceGroup: "nptel-courses",
    role: "supplementary",
    access: "open",
    modes: ["explanation"],
    depth: "intermediate",
    effort: "Course-length; use selected mathematical modules",
    assumptions: "Undergraduate calculus and linear algebra.",
    auditNote:
      "The saved catalog points to the NPTEL course; use the official NPTEL/SWAYAM listing when choosing exact modules.",
    selectionRationale:
      "Formal mathematical refreshers where ML intuition needs proof-level grounding.",
    auditedOn
  },
  {
    id: "sklearn-guide",
    title: "scikit-learn User Guide",
    url: "https://scikit-learn.org/stable/user_guide.html",
    sourceGroup: "Added recommendation",
    role: "added_recommendation",
    access: "open",
    modes: ["reference", "implementation"],
    depth: "mixed",
    effort: "Consult by estimator and evaluation task",
    assumptions: "Python, NumPy and core ML concepts.",
    auditNote:
      "Official documentation with estimator, preprocessing, model-selection and inspection guidance.",
    selectionRationale:
      "Fills the saved library’s gap for a stable, primary implementation reference for classical ML.",
    auditedOn,
    addedRecommendation: true,
    gapFilled: "Official classical-ML implementation and evaluation reference"
  },
  {
    id: "pytorch-tutorials",
    title: "PyTorch Tutorials",
    url: "https://pytorch.org/tutorials/",
    sourceGroup: "Added recommendation",
    role: "added_recommendation",
    access: "open",
    modes: ["reference", "implementation"],
    depth: "mixed",
    effort: "Use targeted official tutorials",
    assumptions: "Python and deep-learning fundamentals.",
    auditNote:
      "Official tutorials spanning tensors, autograd, model training, profiling and distributed work.",
    selectionRationale:
      "Fills the need for a stable framework reference without adding another full DL curriculum.",
    auditedOn,
    addedRecommendation: true,
    gapFilled: "Official PyTorch implementation reference"
  },
  {
    id: "made-with-ml",
    title: "Made With ML",
    url: "https://madewithml.com/courses/mlops/",
    sourceGroup: "Added recommendation",
    role: "added_recommendation",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "intermediate",
    effort: "Follow the practical MLOps lessons around one project",
    assumptions: "Python, ML foundations and experience training a baseline.",
    auditNote:
      "The maintained open course covers design, data, training, tracking, testing, serving and monitoring as a connected workflow.",
    selectionRationale:
      "Fills the saved library’s gap for a coherent classical-ML lifecycle from experimentation to production.",
    auditedOn,
    addedRecommendation: true,
    gapFilled: "Classical ML lifecycle, reproducibility and monitoring"
  },
  {
    id: "hf-diffusion-course",
    title: "Hugging Face Diffusion Course",
    url: "https://huggingface.co/learn/diffusion-course/en/unit0/1",
    sourceGroup: "Added recommendation",
    role: "added_recommendation",
    access: "open",
    modes: ["explanation", "implementation", "project"],
    depth: "intermediate",
    effort: "A focused, unit-based implementation course",
    assumptions: "Python, PyTorch and deep-learning foundations.",
    auditNote:
      "The official open course provides an implementation-first path through diffusion models and the Diffusers ecosystem.",
    selectionRationale:
      "Fills the verified practical gap for diffusion and modern non-LLM generation.",
    auditedOn,
    addedRecommendation: true,
    gapFilled: "Dedicated diffusion-model implementation practice"
  }
];

export const resourcesById = new Map(resources.map((resource) => [resource.id, resource]));
