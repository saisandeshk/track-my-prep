# Detailed systems concept map

Second-pass implementation map, audited 2026-07-26 against `src/data/concepts.ts`. Every item is keyed by the existing concept ID. Outcomes deliberately require four kinds of evidence: explain the mechanism, make a design choice, implement/debug a bounded artifact, and defend it under interview questioning.

## Verified unit links

The short labels below resolve to exact public units, rather than an invented chapter URL. `H-*` is the [HLD Handbook curriculum](https://hld.handbook.academy/curriculum/) (open); `B1/B2` are the [MLSysBook volumes](https://mlsysbook.ai/vol1/) and [at-scale volume](https://mlsysbook.ai/vol2/) (open). Where a course only exposes a schedule, the schedule is the exact publicly verifiable unit index.

- `H-P0` [prerequisites: networking/OS/data structures/database/API](https://hld.handbook.academy/curriculum/prerequisites/networking-fundamentals/); `H-P1` [core fundamentals](https://hld.handbook.academy/curriculum/core-fundamentals/); `H-B` [building blocks](https://hld.handbook.academy/curriculum/building-blocks/); `H-D` [distributed theory](https://hld.handbook.academy/curriculum/distributed-systems-theory/); `H-O` [reliability/operations](https://hld.handbook.academy/curriculum/reliability-and-operations/); `H-S` [security](https://hld.handbook.academy/curriculum/security-at-scale/); `H-C` [case studies](https://hld.handbook.academy/curriculum/case-studies/); `H-AI` [AI/ML system design](https://hld.handbook.academy/curriculum/ai-ml-system-design/); `H-I` [interview framework](https://hld.handbook.academy/curriculum/interview-framework/).
- `DB` [CMU 15-445 schedule](https://15445.courses.cs.cmu.edu/spring2026/schedule.html): public units include storage, indexes, query execution/planning, concurrency, recovery and distributed DBs. `OS` [Berkeley CS162 schedule](https://cs162.org/): public units include processes/I/O, synchronization, VM, filesystems and distributed systems. `PAR` [Cornell parallel/HPC roadmap](https://cvw.cac.cornell.edu/Parallel).
- `DL` [CMU DLsys lectures](https://dlsyscourse.org/lectures/): exact units 4–5 autodiff, 7/9 library abstraction/implementation, 11–13 hardware/GPU/implementation, 17–18 transformers, 19 large-model training, 23 deployment. `CMS` [CMU MLSys schedule](https://mlsyscourse.org/schedule): weeks 3 autodiff, 4 GPU/CUDA, 5 transformer/ZeRO, 6 model/pipeline parallelism & rematerialization, 7 compiler/GEMM, 9 serving, 10 speculative decoding/PEFT, 11 MoE. `GPU` [MLC GPU execution](https://mlc.ai/modern-gpu-programming-for-mlsys/chapter_background/index.html) and [tiled GEMM](https://mlc.ai/modern-gpu-programming-for-mlsys/chapter_gemm_basics/index.html); use its [contents](https://mlc.ai/modern-gpu-programming-for-mlsys/) for TMA, tensor memory, FlashAttention and debugging units.
- `EFF` [MIT 6.5940 schedule](https://hanlab.mit.edu/courses/2024-fall-65940): public recordings/slides, prerequisites stated as architecture plus introductory ML; units include pruning, quantization, NAS, LLM efficiency and deployment. `INFRA` [AI-infra curriculum repository](https://github.com/ai-infra-curriculum/ai-infra-engineer-learning). `ALG` [AlgoMaster catalogue](https://algomaster.io/courses): **metadata/catalogue only; lesson access may be paid**. `BDS` [Build Distributed System](https://builddistributedsystem.com/): **account-gated challenge practice; do not assume exercises are public**.

## System-design foundations

### `sys-requirements-estimation`

Outcome: turn ambiguity into a measurable workload/SLO/cost brief, implement a calculator, debug an invalid assumption, and defend the architecture-changing 10× variable. Resources: `H-P1`, `H-I`.

1. Separate functional requirements, SLOs and constraints for three prompts.
2. Estimate QPS, storage, bandwidth and peak factor in a spreadsheet/script.
3. Redesign after one assumption moves 10×; record the changed decision.
4. Deliver a two-minute requirements/estimation interview opening with uncertainty ranges.

### `sys-networking`

Outcome: explain DNS→TLS→HTTP request flow, design timeout/retry/load-balancing policy, debug retry amplification, and defend transport choice. Resources: `H-P0`, `H-B`, `OS`.

1. Trace a request and identify every connection/round-trip.
2. Explain TCP/UDP, HTTP/2/3 and WebSocket/SSE selection for a case.
3. Implement bounded retries/timeouts with jitter; reproduce a retry storm in a test.
4. Draw the request path and justify proxy/LB placement in a mock interview.

### `sys-storage-indexing`

Outcome: relate access patterns to storage/index/partition choice, design schema and hot-key mitigation, inspect query plans, and defend consistency/cost trade-offs. Resources: `H-P0`, `H-B`, `DB`.

1. Model read/write patterns and select relational, KV, document/object or search storage.
2. Design schema/index/partition key for two workloads.
3. Implement a schema/query and use an explain plan to fix a slow path.
4. Explain hot partitions, replication and migration in a design review.

### `sys-caching`

Outcome: explain locality/freshness, design invalidation/stampede control, implement a bounded cache, debug stale or thundering-herd behavior, and justify correctness. Resources: `H-B`, `H-C`, `ALG` (gated-aware).

1. Compare cache-aside, write-through and write-behind for one source of truth.
2. Specify key/TTL/invalidation/negative-cache policy.
3. Build LRU/TTL cache plus single-flight; test concurrency and eviction.
4. Defend stale-read and backend-outage behaviour in a timed design.

### `sys-queues-streams`

Outcome: explain delivery/order/backpressure, design a durable async workflow, implement idempotent consumer and DLQ path, debug duplicate/poison messages, and defend semantics. Resources: `H-B`, `H-D`, `BDS` (gated).

1. Contrast at-most/at-least/effectively-once and per-key/global order.
2. Specify topic, key, retention, retry/DLQ and idempotency record.
3. Implement producer/consumer with duplicate and crash tests.
4. Explain consumer-success/ack-failure recovery in an interview.

### `sys-consistency-replication`

Outcome: explain client-visible consistency, design replica/quorum/leader boundaries, implement a small replicated-state simulation, debug split/stale reads, and defend availability trade-off. Resources: `H-D`, `H-B`, `BDS` (gated).

1. State acceptable stale/conflicting observations for two products.
2. Calculate/read-write quorum constraints and failure tolerance.
3. Simulate leader failover or quorum reads under partition.
4. Explain why consensus does not remove latency/availability limits.

### `sys-reliability`

Outcome: connect failure modes to SLOs, design degradation/DR, inject failure into a service, debug via telemetry/runbook, and defend recovery objectives. Resources: `H-O`, `B1/B2`.

1. Produce dependency failure matrix and user-visible degradation policy.
2. Set SLI/SLO/error budget and capacity headroom for one API.
3. Add circuit breaker/rate limit/health check and run a failure drill.
4. Present RTO/RPO, failover and rollback trade-offs.

### `sys-security`

Outcome: explain trust boundaries, design authz/secrets/abuse controls, implement server-side enforcement, test an attack path, and defend layered controls. Resources: `H-S`, `H-P0`.

1. Draw data-flow trust boundaries and threat model a service.
2. Specify identity, authorization, tenant isolation, secret and audit policies.
3. Implement authorization + input validation; test privilege escalation.
4. Defend control placement when UI/client is malicious.

## HLD

### `hld-data-intensive`

Outcome: explain OLTP/OLAP/read-model trade-offs, design partitioned/repaired data paths, validate a query/storage prototype, and defend recovery/repartitioning. Resources: `H-D`, `H-C`, `DB`.

1. Draw command/read paths and identify source of truth.
2. Choose replication/partitioning/materialized view and repair method.
3. Prototype a hot-key or backfill/repartition migration plan.
4. Defend consistency, query and operational cost in 35 minutes.

### `hld-real-time`

Outcome: explain fan-out/realtime transport/order, design presence/chat/collaboration protocol, implement reconnect/idempotency slice, debug offline conflict, and defend guarantees. Resources: `H-P0`, `H-B`, `H-C`.

1. Pick WebSocket/SSE/polling and scope ordering per stream.
2. Design connection routing, fan-out and delivery acknowledgement.
3. Implement reconnect + duplicate/out-of-order handling.
4. Explain offline reconciliation and celebrity-channel overload.

### `hld-media-feed`

Outcome: explain fan-out and media pipeline trade-offs, design feed/ranking hooks/CDN flow, prototype asynchronous upload/transcode, debug hot-user pressure, and defend cost/latency. Resources: `H-C`, `H-B`, `H-AI`.

1. Compare fan-out-on-write/read for normal and celebrity users.
2. Draw upload, object storage, transcode and CDN paths.
3. Build a queued media-processing or feed materialization slice.
4. Defend ranking freshness, cache and backlog policies.

### `hld-payments-workflows`

Outcome: explain idempotency/ledger/saga/reconciliation, design an auditable workflow, implement transition + retry safeguards, debug an ambiguous timeout, and defend financial source of truth. Resources: `H-D`, `H-C`, `ALG` (metadata-only for LLD course).

1. Identify immutable ledger and external-provider boundaries.
2. Specify idempotency key, state machine, compensation and reconciliation.
3. Implement duplicate callback/timeout recovery tests.
4. Present audit trail and partial-failure handling without claiming exactly-once.

### `hld-observability-cost`

Outcome: explain signals and marginal cost, design tracing/metrics/capacity guardrails, instrument a service, debug saturation, and defend simplification/cost choice. Resources: `H-O`, `INFRA`.

1. Define golden signals and trace boundaries for one design.
2. Identify per-request dominant cost and a capacity limit.
3. Instrument latency/error/saturation and induce a bottleneck.
4. Defend one expensive feature’s removal or redesign.

### `hld-interview-loop`

Outcome: coherently scope, estimate, diagram, analyze failures/security and defend trade-offs in a timed interview. Resources: `H-I`, `H-C`, `ALG` (**practice availability gated**).

1. Run two 45-minute designs from a fixed rubric.
2. Make API/data model/critical path visible on one diagram.
3. Receive critique and revise only the weak trade-off.
4. Complete four cases: chat, feed, payments, metrics/AI service.

## LLD

### `lld-oo-modeling`

Outcome: explain responsibility/invariant/dependency direction, design contracts, implement a small domain model, debug invariant leak, and defend composition choice. Resources: `ALG` (**catalogue confirms topic; lessons not verified public**), `H-P0` API basics.

1. Turn requirements into entities, value objects, interfaces and invariants.
2. Write contract tests before one implementation.
3. Implement booking/cache domain with invalid-transition tests.
4. Explain why each invariant has one owner.

### `lld-solid-patterns`

Outcome: explain SOLID as change-risk heuristics, design a minimal extension seam, implement/refactor it, debug over-abstraction, and defend/decline a pattern. Resources: `ALG` (metadata-only), `H-C`.

1. Identify a concrete anticipated change and current coupling.
2. Refactor one conditional into a small strategy/adapter.
3. Add a provider through contract tests without touching consumer logic.
4. Remove an unnecessary pattern and explain the simplification.

### `lld-state-workflow`

Outcome: explain legal transitions and persistence atomicity, design durable state machine, implement idempotent commands, debug retry race, and defend compensation. Resources: `H-D`, `H-C`, `ALG` (metadata-only).

1. Enumerate states/events/guards and illegal transitions.
2. Decide transaction/outbox/idempotency boundaries.
3. Implement persisted workflow with repeat-command tests.
4. Explain atomicity and recovery after process death.

### `lld-extensible-services`

Outcome: explain consumer-owned ports, design adapter/config/plugin boundary, implement a second provider, debug incompatible contract, and defend dependency direction. Resources: `ALG` (metadata-only), `H-P0`.

1. Separate domain policy from infrastructure adapter.
2. Define consumer-owned interface and configuration validation.
3. Add fake + real provider through the same contract suite.
4. Defend why a new provider changes no business logic.

### `lld-concurrent-components`

Outcome: explain interleavings/lock scope/cancellation, design a thread-safe component, implement/test it under race, debug deadlock/leak, and defend invariant. Resources: `OS`, `H-P0`, `H-B`.

1. Write shared state, invariant and allowed interleavings.
2. Choose lock/queue/immutable ownership and cancellation semantics.
3. Implement cache or scheduler with race/deadlock tests.
4. Explain shutdown safety and why lock granularity is sufficient.

### `lld-testing-evolution`

Outcome: explain test layers and compatibility, design behaviour-based contracts, refactor under tests, inject integration failure, and defend what cannot be unit-tested. Resources: `H-O`, `ALG` (metadata-only).

1. Separate unit/contract/integration/e2e assertions.
2. Build fake and contract test for an external port.
3. Refactor implementation with no contract change.
4. Demonstrate one production-like failure only integration reveals.

### `lld-interview-builds`

Outcome: implement and narrate a tested cache/scheduler/booking/notification/payment slice under time pressure, including extensions and failures. Resources: `H-C`, `ALG` (**gated practice**).

1. Deliver cache and scheduler in 45–60 minutes each.
2. Include tests, error paths and a README diagram.
3. Add one late requirement without rewrite.
4. Explain responsibility, invariants, complexity and trade-offs aloud.

## ML system design

### `mlsd-objective`

Outcome: explain prediction-to-decision chain, design non-ML baseline/metric/feedback boundary, implement a decision stub, debug objective mismatch, and defend buy/rules/ML choice. Resources: `B1`, `H-AI`, `ALG` (metadata-only).

1. State user decision, harm, baseline and success metric.
2. Map prediction confidence to action/abstention/fallback.
3. Implement baseline vs model comparison with a fixed split.
4. Defend why a model is justified operationally.

### `mlsd-data-labels`

Outcome: explain lineage/leakage/point-in-time correctness, design offline/online contracts, implement versioned dataset check, debug leakage/label delay, and defend privacy. Resources: `B1`, `H-AI`, `INFRA`.

1. Draw data sources, owners, retention and label delay.
2. Specify point-in-time feature and train/serve parity contracts.
3. Build dataset/version validation and leakage test.
4. Explain reconstruction of one historic prediction.

### `mlsd-training-platform`

Outcome: explain reproducibility/promotion, design experiment/artifact lineage, implement repeatable job, debug non-reproducible run, and defend retrain trigger/cost. Resources: `B1/B2`, `INFRA`, `CMS` weeks 5–6.

1. List code/data/config/environment/model versions.
2. Design orchestration, registry and approval/promotion gate.
3. Run same job twice and diagnose a mismatch.
4. Defend distributed training only when its cost is warranted.

### `mlsd-serving`

Outcome: explain batch/stream/online modes, design artifact-to-decision path, implement rollout/fallback, debug latency-budget breach, and defend SLO/scaling. Resources: `B2`, `H-AI`, `INFRA`, `DL` unit 23.

1. Allocate end-to-end latency and choose serving mode.
2. Specify feature/model lookup, version routing and rollback.
3. Implement shadow/canary and fallback response.
4. Defend autoscaling and failure behaviour.

### `mlsd-monitoring`

Outcome: explain service/data/model/outcome signals, design alerts tied to action, implement drift/quality dashboard, debug a silent regression, and defend delayed-label plan. Resources: `B2`, `H-O`, `INFRA`.

1. Name health, input, prediction and outcome metrics.
2. Separate harmless shift from decision-harming drift.
3. Simulate drift/latency incident and write runbook.
4. Defend quality monitoring before labels arrive.

### `mlsd-ranking-recommendation`

Outcome: explain retrieve→rank→feedback loop, design multi-stage service, prototype retrieval/ranking evaluation, debug exposure bias, and defend online experiment. Resources: `H-AI`, `H-C`, `B1/B2`; `ALG` is metadata-only.

1. Specify candidates, features, ranker and freshness budget.
2. Separate recall, ranking and product metrics.
3. Implement small two-stage baseline with logged impressions.
4. Explain feedback bias/cold-start/exploration in interview.

### `mlsd-interview-loop`

Outcome: lead four timed end-to-end ML designs with explicit objective, data, model, serving, evaluation, reliability and cost. Resources: `H-AI`, `H-I`, `B1/B2`, `ALG` (gated).

1. Complete recommendation, fraud, demand forecast and RAG prompts.
2. Use a consistent 40-minute design rubric.
3. Critique one missing feedback/lineage/safety link per case.
4. Defend offline-to-online metric connection.

## Generative-AI system design

### `genaisd-requirements-model`

Outcome: explain model/task constraints, design routing/fallback/buy-build decision, implement an evaluation-driven chooser, debug benchmark-to-product mismatch, and defend abstention. Resources: `H-AI`, `B1/B2`, `CMS` weeks 9–10.

1. Define quality, latency, cost, privacy and domain constraints.
2. Compare hosted/self-hosted/small-large model paths.
3. Implement route/fallback rules against frozen tasks.
4. Defend a non-model or human escalation alternative.

### `genaisd-prompt-context`

Outcome: explain trusted/untrusted context hierarchy, design versioned structured prompt pipeline, implement injection tests, debug regression, and defend cache/privacy boundary. Resources: `H-AI`, `H-S`; `ALG` prompt lessons are gated/metadata-only.

1. Label system, developer, user, retrieved and tool content by trust.
2. Version templates/schema/context budget and test set.
3. Implement structured output validation + adversarial prompt tests.
4. Defend why untrusted text cannot change authority.

### `genaisd-rag`

Outcome: explain retrieval versus generation failure, design ingestion/index/rerank/citation loop, implement an evaluated RAG slice, debug missing/ignored evidence, and defend freshness/cost. Resources: `H-AI`, `H-C`, `B1/B2`; `ALG` RAG lessons unverified/gated.

1. Define chunk/metadata/ACL/freshness strategy.
2. Measure retrieval recall separately from answer faithfulness.
3. Build citation-bearing RAG with failure labels.
4. Explain hybrid retrieval, reranking and context packing trade-offs.

### `genaisd-serving-routing`

Outcome: explain batching/KV-cache/routing cost, design overload-safe inference path, implement metrics/caching/rate limits, debug tail latency, and defend quality-preserving fallback. Resources: `CMS` weeks 9–10, `H-AI`, `B2`, `INFRA`.

1. Calculate token/request/peak-concurrency unit economics.
2. Specify cache key privacy, rate limits and queue policy.
3. Load-test batch versus streaming requests.
4. Defend route/quantize/degrade decisions under overload.

### `genaisd-evals-observability`

Outcome: explain offline/online/judge limitations, design trace/eval regression gates, implement reproducible evaluation, debug judge disagreement, and defend human-quality control. Resources: `H-AI`, `H-O`, `B1/B2`.

1. Define trace schema: prompt/context/model/tool/output/version/cost.
2. Curate frozen, adversarial and production-like evaluation sets.
3. Implement quality/latency/cost gate and investigate failure cluster.
4. Explain why judge score is not the only release criterion.

### `genaisd-safety`

Outcome: explain injection/exfiltration/unsafe-tool risks, design layered controls and escalation, implement least-privilege tool boundary, red-team it, and defend residual risk. Resources: `H-S`, `H-AI`, `H-C`.

1. Threat-model retrieved content, tools, tenant data and outputs.
2. Specify authz, allowlists, confirmation, sandbox and audit controls.
3. Test prompt injection/data exfiltration against the build.
4. Defend the control that remains effective when model misbehaves.

### `genaisd-design-loop`

Outcome: present assistant, enterprise-RAG, multimodal and high-volume design with request trace, quality, reliability, safety and unit economics. Resources: `H-C`, `H-AI`, `H-I`, `B1/B2`.

1. Complete four 45-minute designs using a stable rubric.
2. Include end-to-end request/data/control/telemetry diagram.
3. Red-team one case and revise architecture.
4. Defend the highest-risk 10× scaling assumption.

## Core ML systems

### `mlsys-compute-memory`

Outcome: explain hierarchy/roofline, design measurement plan, implement benchmark, debug compute-vs-bandwidth misdiagnosis, and defend evidence. Resources: `B1/B2`, `PAR`, `DL` units 11–13, `GPU`.

1. Measure FLOPs, bytes, latency and throughput for one operator.
2. Place it on a roofline-style bound and predict bottleneck.
3. Change layout/batch/precision and verify prediction.
4. Explain why fewer FLOPs may be slower.

### `mlsys-frameworks-autodiff`

Outcome: explain graph/tensor/autodiff abstractions, design backward-state contract, implement tensor/autograd subset, debug gradient/layout bug, and defend API choices. Resources: `DL` units 4–5, 7/9; `B1` TinyTorch path.

1. Derive and test gradients for scalar/tensor operations.
2. Implement topological backward and broadcasting rules.
3. Add operator/shape tests and diagnose non-contiguous-layout cost.
4. Explain what forward data must survive backward.

### `mlsys-gpu-kernels`

Outcome: explain SIMT/coalescing/tiling, design a correct kernel, implement/profile tiled GEMM, debug race/layout issue, and defend speedup fairly. Resources: `CMS` week 4/7, `GPU` execution + tiled GEMM, `DL` 11–13.

1. Map threads/warps/blocks and memory accesses for baseline.
2. Implement correct vector or matrix kernel versus CPU reference.
3. Tile/coalesce/profile and document baseline/hardware/shapes.
4. Explain occupancy versus register/shared-memory limits.

### `mlsys-compilers`

Outcome: explain tracing/fusion/scheduling specialization, design a graph transformation, implement/test a fusion or rewrite, debug semantic/resource regression, and defend trade-off. Resources: `CMS` week 7/12, `DL` 7/9, `GPU` compiler/debugging units.

1. Trace a graph and identify launch/memory-traffic opportunities.
2. Specify legality condition and before/after semantics.
3. Implement/test one fusion/rewrite on static shapes.
4. Explain dynamic shape or register-pressure failure mode.

### `mlsys-distributed-training`

Outcome: explain collectives and parallelism, design memory/communication plan, run a small distributed job, debug mismatch/straggler, and defend scaling economics. Resources: `CMS` weeks 5–6, `B2`, `INFRA`, `EFF`.

1. Account for parameters, gradients, optimizer states and activations.
2. Choose DP/FSDP/ZeRO/model/pipeline plan for a stated model.
3. Run two-worker training; validate numerical/throughput behaviour.
4. Explain overlap, bubbles, recovery and why scaling stops.

### `mlsys-efficiency`

Outcome: explain precision/pruning/distillation trade-offs, design fair benchmark, implement one technique, debug accuracy/measurement regression, and defend hardware-aware result. Resources: `EFF`, `B1/B2`, `CMS` weeks 9–10.

1. Set baseline accuracy, memory, latency, hardware and request shape.
2. Apply quantization/pruning/distillation with calibration.
3. Benchmark quality and p50/p95 latency reproducibly.
4. Explain which operations remain high precision and why.

### `mlsys-serving`

Outcome: explain batching/scheduling/KV-cache/tail latency, design a realistic server, implement/load-test it, debug queueing/memory pressure, and defend capacity model. Resources: `CMS` weeks 9–10, `B2`, `H-AI`, `INFRA`.

1. Model prefill/decode, request mix and latency SLO.
2. Specify batch scheduler, cache/memory/eviction and autoscaling policy.
3. Benchmark under bursty mixed-length traffic; inspect p95/p99.
4. Explain continuous batching/speculation quality-cost trade-off.

### `mlsys-platform-observability`

Outcome: explain platform lineage/control plane, design reproducible deployment/telemetry, implement incident trace, debug data/model/infra ambiguity, and defend governance/cost. Resources: `INFRA`, `B1/B2`, `H-O`.

1. Map artifact, data, config, deployment and trace identifiers.
2. Create CI/promotion/rollback and least-privilege design.
3. Simulate bad data/model/server incident and trace root cause.
4. Explain alert separation for degradation vs saturation.

### `mlsys-project`

Outcome: ship a reproducible framework/training or serving artifact, with correctness, benchmark, runbook and interview defense of next bottleneck. Resources: `DL`, `CMS`, `GPU`, `INFRA`.

1. Write acceptance criteria, environment lock and correctness oracle.
2. Implement baseline plus one measured optimization.
3. Publish benchmark methodology, raw results and failure test.
4. Demo design/debug evidence and identify the next system limit.

## Integration notes

- The map intentionally does not add GPU MODE: it is not needed to produce direct concept integration and no verified existing concept ID was found for it.
- `ALG` and `BDS` are not credited as public coursework; they are explicitly marked metadata-only or gated above. The HLD, MLSysBook, CMU, MIT, Cornell and MLC links are the verified public anchors.
- A future integration can add these as `outcome` replacements plus expanded checkpoint arrays without changing IDs, dependencies or shared TypeScript structures.
