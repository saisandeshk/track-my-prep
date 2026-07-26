import type { ResourceUnit } from "../../types";

const auditedOn = "2026-07-26";
const metadataNote =
  "Title, channel and playlist membership were verified from public YouTube metadata; use this as a targeted supplement, not as transcript-level coverage.";

const video = (
  value: Omit<
    ResourceUnit,
    "kind" | "role" | "prerequisites" | "effort" | "auditConfidence" | "auditNote" | "auditedOn"
  > &
    Partial<
      Pick<ResourceUnit, "role" | "prerequisites" | "effort" | "auditConfidence" | "auditNote">
    >
): ResourceUnit => ({
  kind: "video",
  role: "supplementary",
  prerequisites: "Study the concept's primary written or implementation unit first.",
  effort: "Use as a focused visual or research-paper second pass",
  auditConfidence: "metadata_only",
  auditNote: metadataNote,
  auditedOn,
  ...value
});

export const videoResourceUnits: ResourceUnit[] = [
  video({
    id: "video-jia-transformers",
    resourceId: "jia-bin-transformer-videos",
    title: "But What Are Transformers?",
    url: "https://www.youtube.com/watch?v=rcWMRA9E5RI",
    conceptIds: ["dl-attention-transformers", "llm-architecture"],
    topics: ["Transformer intuition", "attention", "decoder architecture"],
    outcome:
      "Build a visual mental model of information flow through a Transformer before returning to equations and code.",
    order: 101
  }),
  video({
    id: "video-jia-efficient-attention",
    resourceId: "jia-bin-transformer-videos",
    title: "How Attention Got So Efficient: GQA, MLA and DSA",
    url: "https://www.youtube.com/watch?v=Y-o545eYjXM",
    conceptIds: ["llm-architecture", "llm-decoding", "mlsys-efficiency", "mlsys-serving"],
    topics: ["KV cache", "MQA", "GQA", "MLA", "sparse attention", "inference"],
    outcome:
      "Compare modern attention variants through their KV-memory, quality and inference-cost consequences.",
    effort: "29m 02s",
    auditConfidence: "content_verified",
    auditNote:
      "Public chapters verify coverage of KV caching, MQA/GQA/MLA, inference, RoPE, sparse attention and quantization.",
    order: 102
  }),
  video({
    id: "video-jia-flash-attention",
    resourceId: "jia-bin-transformer-videos",
    title: "How FlashAttention Accelerates Generative AI",
    url: "https://www.youtube.com/watch?v=gBMO1JZav44",
    conceptIds: ["dl-attention-transformers", "mlsys-compute-memory", "mlsys-gpu-kernels"],
    topics: ["FlashAttention", "memory traffic", "attention kernels"],
    outcome:
      "See why changing data movement and tiling can accelerate exact attention without changing its mathematical result.",
    order: 103
  }),
  video({
    id: "video-jia-rope",
    resourceId: "jia-bin-transformer-videos",
    title: "How Rotary Position Embedding Supercharges Modern LLMs",
    url: "https://www.youtube.com/watch?v=SMBkImDWOyQ",
    conceptIds: ["dl-attention-transformers", "llm-architecture"],
    topics: ["RoPE", "relative position", "rotation"],
    outcome:
      "Develop geometric intuition for rotary position encoding and connect it to the implementation and extrapolation trade-offs.",
    order: 104
  }),
  video({
    id: "video-jia-moe",
    resourceId: "jia-bin-transformer-videos",
    title: "Mixture of Experts, Visually Explained",
    url: "https://www.youtube.com/watch?v=0QQlYR1r6pQ",
    conceptIds: ["llm-architecture", "llm-pretraining", "mlsys-distributed-training"],
    topics: ["MoE", "routing", "expert assignment", "load balancing"],
    outcome:
      "Trace token routing through an MoE block and relate expert capacity and balancing losses to scaling and distributed execution.",
    effort: "31m 46s",
    auditConfidence: "content_verified",
    auditNote:
      "Public chapters verify Transformer blocks, routers, fine-grained/shared experts, token assignment and balancing losses.",
    order: 105
  }),
  video({
    id: "video-jia-residuals",
    resourceId: "jia-bin-transformer-videos",
    title: "The Residual Connection Is Broken. Here's the Fix.",
    url: "https://www.youtube.com/watch?v=LSHTkbnmzy4",
    conceptIds: ["dl-training-dynamics", "llm-architecture"],
    topics: ["residual connections", "signal propagation", "modern architecture"],
    outcome:
      "Use a current architecture case study to revisit why residual paths stabilize deep models and where variants alter that behavior.",
    role: "advanced",
    order: 106
  }),
  video({
    id: "video-jia-activation",
    resourceId: "jia-bin-transformer-videos",
    title: "The 60-Year Hunt for AI's Most Important Function",
    url: "https://www.youtube.com/watch?v=JRaPNrpsQ9s",
    conceptIds: ["dl-neural-networks", "dl-training-dynamics"],
    topics: ["activation functions", "nonlinearity", "optimization"],
    outcome:
      "Compare activation choices by gradient flow and representation behavior rather than memorizing a chronology.",
    order: 107
  }),
  video({
    id: "video-jia-muon",
    resourceId: "jia-bin-transformer-videos",
    title: "This Simple Optimizer Is Revolutionizing How We Train AI: Muon",
    url: "https://www.youtube.com/watch?v=bO5nvE289ec",
    conceptIds: ["math-optimization", "dl-training-dynamics", "llm-pretraining"],
    topics: ["Muon", "matrix optimization", "training dynamics"],
    outcome:
      "Treat a modern optimizer as an advanced comparison point after deriving and measuring SGD/Adam behavior.",
    role: "advanced",
    order: 108
  }),

  video({
    id: "video-eleuther-gpu-cuda-nccl",
    resourceId: "eleutherai-performance-videos",
    title: "Session 1: GPU Architecture, CUDA and NCCL",
    url: "https://www.youtube.com/watch?v=Cp7g1Ll4v0M",
    conceptIds: ["mlsys-compute-memory", "mlsys-gpu-kernels", "mlsys-distributed-training"],
    topics: ["GPU architecture", "CUDA", "NCCL", "performance bottlenecks"],
    outcome:
      "Connect the GPU execution hierarchy and communication collectives to the bottlenecks seen in ML workloads.",
    effort: "47m 39s",
    auditConfidence: "content_verified",
    auditNote:
      "The public description identifies GPU architecture, CUDA, NCCL and common ML-workload bottlenecks as the session's prerequisite overview.",
    order: 120
  }),
  video({
    id: "video-eleuther-flash-attention",
    resourceId: "eleutherai-performance-videos",
    title: "Session 2: FlashAttention",
    url: "https://www.youtube.com/watch?v=Lys0TpsLIEc",
    conceptIds: ["dl-attention-transformers", "mlsys-compute-memory", "mlsys-gpu-kernels"],
    topics: ["FlashAttention", "IO awareness", "attention performance"],
    outcome:
      "Review FlashAttention as a paper-reading discussion after learning exact attention and GPU memory fundamentals.",
    role: "advanced",
    order: 121
  }),
  video({
    id: "video-eleuther-zero",
    resourceId: "eleutherai-performance-videos",
    title: "Session 3: ZeRO",
    url: "https://www.youtube.com/watch?v=azUufxKe5RE",
    conceptIds: ["mlsys-distributed-training", "llm-pretraining"],
    topics: ["ZeRO", "optimizer sharding", "distributed memory"],
    outcome:
      "Relate ZeRO stages to which model states are replicated or sharded and what communication is introduced.",
    role: "advanced",
    order: 122
  }),
  video({
    id: "video-eleuther-ring-attention",
    resourceId: "eleutherai-performance-videos",
    title: "Session 4: Ring Attention",
    url: "https://www.youtube.com/watch?v=fC9L8J7dVFI",
    conceptIds: ["llm-architecture", "mlsys-distributed-training"],
    topics: ["ring attention", "sequence parallelism", "long context"],
    outcome:
      "Study how attention computation and KV blocks can circulate across devices for contexts that do not fit one accelerator.",
    role: "advanced",
    order: 123
  }),
  video({
    id: "video-eleuther-paged-attention",
    resourceId: "eleutherai-performance-videos",
    title: "Session 5: PagedAttention",
    url: "https://www.youtube.com/watch?v=ClUD1XokM_A",
    conceptIds: ["llm-decoding", "mlsys-serving"],
    topics: ["PagedAttention", "KV-cache allocation", "serving"],
    outcome:
      "Connect paged KV-cache allocation to fragmentation, batching and throughput in an LLM serving engine.",
    role: "advanced",
    order: 124
  }),
  video({
    id: "video-eleuther-megatron",
    resourceId: "eleutherai-performance-videos",
    title: "Session 8: Megatron-LM",
    url: "https://www.youtube.com/watch?v=ImKyR1tsPPE",
    conceptIds: ["llm-pretraining", "mlsys-distributed-training"],
    topics: ["Megatron-LM", "tensor parallelism", "pipeline parallelism"],
    outcome:
      "Use Megatron-LM as a concrete system for comparing tensor, pipeline and data-parallel training boundaries.",
    role: "advanced",
    order: 125
  }),
  video({
    id: "video-eleuther-activation-recompute",
    resourceId: "eleutherai-performance-videos",
    title: "Session 9: Reducing Activation Recomputation",
    url: "https://www.youtube.com/watch?v=9o2TXexHUh8",
    conceptIds: ["mlsys-distributed-training", "mlsys-efficiency"],
    topics: ["activation checkpointing", "recomputation", "memory"],
    outcome:
      "Evaluate the compute-memory trade-off of activation checkpointing within a distributed training plan.",
    role: "advanced",
    order: 126
  }),
  video({
    id: "video-eleuther-quantization",
    resourceId: "eleutherai-performance-videos",
    title: "Session 14: A Survey of Quantization Methods",
    url: "https://www.youtube.com/watch?v=NpQv0R0w_qY",
    conceptIds: ["mlsys-efficiency", "mlsys-serving"],
    topics: ["quantization", "precision", "quality-efficiency trade-off"],
    outcome:
      "Compare quantization methods by where calibration, numerical error and hardware support enter the deployment path.",
    role: "advanced",
    order: 127
  }),
  video({
    id: "video-eleuther-lmcache",
    resourceId: "eleutherai-performance-videos",
    title: "Session 16: LMCache",
    url: "https://www.youtube.com/watch?v=3KJXzYBDZFg",
    conceptIds: ["llm-decoding", "mlsys-serving"],
    topics: ["KV-cache reuse", "serving", "latency"],
    outcome:
      "Examine cross-request KV reuse as a serving optimization with correctness, memory and privacy constraints.",
    role: "advanced",
    order: 128
  }),
  video({
    id: "video-eleuther-speculative-decoding",
    resourceId: "eleutherai-performance-videos",
    title: "Session 19: Speculative Decoding",
    url: "https://www.youtube.com/watch?v=1XDi8_VPCDU",
    conceptIds: ["llm-decoding", "mlsys-serving"],
    topics: ["speculative decoding", "draft model", "acceptance"],
    outcome:
      "Relate draft-token acceptance to exact output distributions, latency and serving resource trade-offs.",
    role: "advanced",
    order: 129
  }),

  video({
    id: "video-cs336-playlist",
    resourceId: "cs336",
    title: "Stanford CS336: Language Modeling from Scratch - Spring 2026 playlist",
    url: "https://youtube.com/playlist?list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
    conceptIds: [
      "llm-tokenization-data",
      "llm-architecture",
      "llm-pretraining",
      "llm-decoding",
      "llm-finetuning",
      "llm-posttraining",
      "llm-evaluation",
      "llm-from-scratch-build"
    ],
    topics: ["language modeling", "tokenization", "training", "systems", "alignment"],
    outcome:
      "Use the official lecture playlist alongside the exact course assignments; choose the lecture matching the current implementation milestone.",
    auditNote:
      "Playlist title and public membership were verified, but individual Spring 2026 lecture-to-topic metadata could not be extracted reliably enough for finer claims.",
    order: 140
  }),

  {
    id: "video-flash-attention-softmax",
    resourceId: "umar-jamil-flash-attention",
    title: "Safe softmax, online softmax and block matrix multiplication",
    url: "https://www.youtube.com/watch?v=zy8ChVd_oTM&t=770s",
    kind: "video_chapter",
    role: "advanced",
    conceptIds: ["math-optimization", "dl-attention-transformers", "mlsys-compute-memory"],
    topics: ["safe softmax", "online softmax", "block matrix multiplication"],
    outcome:
      "Derive numerically stable online softmax and use blockwise computation to prepare the FlashAttention recurrence.",
    prerequisites: "Softmax, attention, matrix algebra and numerical stability.",
    effort: "12:50–1:28:38",
    order: 150,
    auditConfidence: "content_verified",
    auditNote: "Public video chapters verify this timestamp range and topic sequence.",
    auditedOn,
    startSeconds: 770,
    endSeconds: 5318
  },
  {
    id: "video-flash-attention-forward",
    resourceId: "umar-jamil-flash-attention",
    title: "FlashAttention forward pass, CUDA/Triton foundations and implementation",
    url: "https://www.youtube.com/watch?v=zy8ChVd_oTM&t=5318s",
    kind: "video_chapter",
    role: "build",
    conceptIds: ["dl-attention-transformers", "mlsys-gpu-kernels"],
    topics: ["FlashAttention forward", "CUDA", "tensor layouts", "Triton"],
    outcome:
      "Move from the blockwise forward derivation to a tested Triton implementation while accounting for layouts and memory traffic.",
    prerequisites: "Online softmax, GPU execution basics and Python/PyTorch.",
    effort: "1:28:38–4:22:11",
    order: 151,
    auditConfidence: "content_verified",
    auditNote: "Public video chapters verify this timestamp range and topic sequence.",
    auditedOn,
    startSeconds: 5318,
    endSeconds: 15731
  },
  {
    id: "video-flash-attention-backward",
    resourceId: "umar-jamil-flash-attention",
    title: "FlashAttention backward derivation, Triton kernel and autotuning",
    url: "https://www.youtube.com/watch?v=zy8ChVd_oTM&t=15731s",
    kind: "video_chapter",
    role: "build",
    conceptIds: [
      "math-optimization",
      "mlsys-frameworks-autodiff",
      "mlsys-gpu-kernels",
      "mlsys-compilers"
    ],
    topics: ["Jacobians", "autograd", "FlashAttention backward", "Triton autotuning"],
    outcome:
      "Derive the backward pass, reconcile it with autograd and implement/profile the corresponding Triton kernel.",
    prerequisites:
      "Matrix calculus, reverse-mode autodiff and the FlashAttention forward implementation.",
    effort: "4:22:11–7:38:18",
    order: 152,
    auditConfidence: "content_verified",
    auditNote: "Public video chapters verify this timestamp range and topic sequence.",
    auditedOn,
    startSeconds: 15731,
    endSeconds: 27498
  }
];
