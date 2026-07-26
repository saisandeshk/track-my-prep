import type { EvidenceType } from "../../types";

type Mastery = {
  outcome: string;
  checkpoints: {
    level: "understand" | "apply" | "debug" | "interview";
    prompt: string;
    evidence: EvidenceType[];
  }[];
};
const c = (outcome: string, checkpoints: Mastery["checkpoints"]): Mastery => ({
  outcome,
  checkpoints
});

export const systemsMastery: Record<string, Mastery> = {
  "sys-requirements-estimation": c(
    "Translate an ambiguous product request into a workload model rather than choosing components prematurely. Produce estimates with ranges and show which uncertainty changes the architecture.",
    [
      {
        level: "understand",
        prompt:
          "Separate functional requirements, SLOs and constraints for a chat service; identify the one missing question that could change storage choice.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Calculate peak QPS, storage/year, bandwidth and an initial capacity target for stated inputs; preserve assumptions in the worksheet.",
        evidence: ["solve", "design"]
      },
      {
        level: "debug",
        prompt:
          "Find why a design sized from average QPS fails at a 20× peak and repair its capacity and queue assumptions.",
        evidence: ["debug", "design"]
      },
      {
        level: "interview",
        prompt:
          "Open a design interview by scoping and estimating a URL shortener in five minutes, then revise after the write/read ratio reverses.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "sys-networking": c(
    "Follow a request from DNS resolution through TLS and HTTP to the service, including connection reuse and failure propagation. Choose transport and timeout behaviour from workload needs, not protocol fashion.",
    [
      {
        level: "understand",
        prompt:
          "Explain the extra latency of cold DNS, TCP and TLS setup and when HTTP/3 changes head-of-line blocking.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design timeouts, retry budget, jitter and connection pooling for an API that calls a slower dependency.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Use a request trace to identify a retry storm caused by a 500 ms timeout and propose a bounded recovery.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend SSE versus WebSockets for token streaming when clients reconnect frequently and the service is behind a proxy.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "sys-storage-indexing": c(
    "Choose data model, index and partition key from actual read/write queries and consistency requirements. Validate the decision with a schema and query-plan evidence.",
    [
      {
        level: "understand",
        prompt:
          "Explain why a B-tree index helps a range scan but a hash index does not, and what an LSM write path trades away.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design tables, keys and indexes for order history by customer and date, including the dominant query.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Inspect a deliberately slow query plan and correct an index or predicate that prevents selective access.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Explain how your partition key for a global metrics store handles a hot tenant and a re-shard.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "sys-caching": c(
    "Make cache freshness, invalidation ownership and failure behaviour explicit. Build cache policy that improves a measured path without silently changing correctness.",
    [
      {
        level: "understand",
        prompt:
          "Compare cache-aside, write-through and write-behind for profile data with strict versus relaxed freshness.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Specify key, TTL, eviction, invalidation and negative-cache rules for a product catalogue endpoint.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Implement single-flight on cache miss and demonstrate removal of a thundering herd under concurrent load.",
        evidence: ["implement", "debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend a stale-while-revalidate policy when the cache is shared by users with different authorization scopes.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "sys-queues-streams": c(
    "Use asynchronous boundaries without hiding delivery, ordering or recovery obligations. Show an idempotent consumer that remains observable under retries.",
    [
      {
        level: "understand",
        prompt:
          "Explain why acknowledgement after side effect can produce duplicates and why exactly-once delivery is not a complete business guarantee.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design a payment-event topic with partition key, retention, retry schedule and dead-letter disposition.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Inject consumer crash after database write but before ack; prove your idempotency key prevents double charge.",
        evidence: ["implement", "debug"]
      },
      {
        level: "interview",
        prompt:
          "Trade per-order ordering against throughput for an inventory workflow with thousands of active orders.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "sys-consistency-replication": c(
    "Describe the observations clients may see while replicas fail or lag. Match quorum, leader and consistency guarantees to an explicitly tolerable anomaly.",
    [
      {
        level: "understand",
        prompt:
          "Contrast linearizability, read-your-writes and eventual consistency using a bank balance and social feed.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Choose N/R/W and leader placement for a regional profile store with stated latency and loss requirements.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Reproduce a stale read during failover in a small simulation and identify whether routing, quorum or client session policy fixes it.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Explain why adding Raft to a shopping cart service does not make it always available during a partition.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "sys-reliability": c(
    "Design for dependency failure in terms users can observe and operators can act on. Tie redundancy, degradation and recovery decisions to error budgets and recovery objectives.",
    [
      {
        level: "understand",
        prompt:
          "Define an SLI, SLO and error budget for checkout; distinguish availability from a latency SLO.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Create a dependency failure matrix that selects fallback, circuit breaker or fail-closed behaviour for each dependency.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Run a controlled cache outage and use metrics to distinguish graceful degradation from cascading saturation.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend RTO/RPO and multi-region cost for a service whose users can tolerate delayed analytics but not lost orders.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "sys-security": c(
    "Locate trust boundaries before selecting authentication mechanisms. Implement authorization and input controls where untrusted data cannot acquire server-side authority.",
    [
      {
        level: "understand",
        prompt:
          "Draw the trust boundaries among browser, API, worker, database and third-party webhook for a SaaS product.",
        evidence: ["explain", "design"]
      },
      {
        level: "apply",
        prompt:
          "Specify tenant-scoped authorization, secret storage and audit events for document download.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Exploit then fix an insecure direct-object-reference test case; show the UI alone was not the control.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend where rate limiting, validation and authorization belong when an attacker calls the API directly.",
        evidence: ["mock", "explain"]
      }
    ]
  ),

  "hld-data-intensive": c(
    "Construct a data-intensive architecture with a visible source of truth, read model and repair story. Explain how partitions and materialized views affect correctness as data grows.",
    [
      {
        level: "understand",
        prompt:
          "Explain OLTP versus OLAP and why a materialized view can be stale without being incorrect.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Draw write, CDC and read paths for an order dashboard with a searchable customer view.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Plan a backfill after a materialized-view bug while serving reads and preventing double-counting.",
        evidence: ["debug", "design"]
      },
      {
        level: "interview",
        prompt:
          "Defend a re-partition migration that cannot take writes offline for more than a minute.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "hld-real-time": c(
    "Design realtime delivery with precise scope for order, presence and reconnection. Reconcile offline state without pretending every event has global ordering.",
    [
      {
        level: "understand",
        prompt:
          "State which messages need per-room order, which need only eventual visibility, and which can be dropped.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design presence and chat fan-out including connection registry, reconnect cursor and message IDs.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Resolve duplicate/out-of-order delivery after a mobile reconnect using client and server sequence handling.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Explain sticky-session versus shared connection state for a million concurrent WebSocket users.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "hld-media-feed": c(
    "Choose fan-out and media-processing paths from workload asymmetry. Make ranking freshness, CDN delivery and celebrity behaviour part of the design rather than afterthoughts.",
    [
      {
        level: "understand",
        prompt:
          "Compare fan-out-on-write and fan-out-on-read for ordinary users and a celebrity account.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design upload, object storage, async transcode, thumbnail and CDN flow for short video.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Diagnose a transcode queue backlog after a viral upload and select admission or degradation behaviour.",
        evidence: ["debug", "design"]
      },
      {
        level: "interview",
        prompt:
          "Defend the point where ranking is applied in a feed against latency and personalization requirements.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "hld-payments-workflows": c(
    "Preserve an auditable financial record through retries, provider ambiguity and compensation. Separate business correctness from transport delivery semantics.",
    [
      {
        level: "understand",
        prompt:
          "Explain ledger versus mutable balance and the role of idempotency in a payment API.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Model authorization, capture, refund and reconciliation states with legal transitions.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Handle a provider timeout where capture may have succeeded; show the reconciliation path and customer response.",
        evidence: ["debug", "design"]
      },
      {
        level: "interview",
        prompt:
          "Defend saga compensation versus synchronous transaction when inventory and payment providers are independent.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "hld-observability-cost": c(
    "Make an architecture measurable before it fails and costed before it scales. Use traces and capacity signals to find the real bottleneck rather than optimize averages.",
    [
      {
        level: "understand",
        prompt:
          "Select latency, traffic, error and saturation signals for an API and explain what each misses.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Add trace boundaries and a per-request cost model to a document-processing design.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Use p99 latency, queue depth and trace spans to isolate a saturated downstream dependency.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend removing or batching an expensive feature when traffic grows tenfold under a fixed budget.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "hld-interview-loop": c(
    "Communicate a coherent HLD solution under time pressure, from scope through failure modes. Leave an interviewer able to find the data ownership, bottleneck and trade-off on the diagram.",
    [
      {
        level: "understand",
        prompt:
          "Use a stable agenda to explain why requirements and estimates precede architecture drawing.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Produce a one-page design for a notification system with API, data model, flow and scale estimate.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Review a prior diagram and repair an unstated source of truth, missing retry policy or unbounded fan-out.",
        evidence: ["debug", "design"]
      },
      {
        level: "interview",
        prompt:
          "Complete a 45-minute chat or payment design, taking two interviewer constraint changes without losing narrative.",
        evidence: ["mock", "explain"]
      }
    ]
  ),

  "lld-oo-modeling": c(
    "Model behaviour with small responsibilities and a clear owner for each invariant. Prefer contracts that make invalid state hard to represent and easy to test.",
    [
      {
        level: "understand",
        prompt:
          "Identify entities, value objects, services and invariants for a seat-reservation domain.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design interfaces and composition for reservation, pricing and notification without inheritance by default.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Repair a model where two objects can independently mutate the same reservation state.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend why a chosen invariant belongs in one aggregate rather than a controller or database trigger.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "lld-solid-patterns": c(
    "Apply patterns only to isolate a real axis of change. Recognize when a direct implementation is clearer than a hierarchy or factory.",
    [
      {
        level: "understand",
        prompt:
          "Explain dependency inversion and substitution using a payment gateway rather than reciting SOLID acronyms.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Refactor a provider switch statement into a consumer-owned strategy or adapter contract.",
        evidence: ["design", "implement"]
      },
      {
        level: "debug",
        prompt:
          "Simplify an over-engineered factory hierarchy that makes a new payment method harder to test.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend declining a design pattern when there is one stable implementation and no credible variation.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "lld-state-workflow": c(
    "Represent workflow states and legal transitions explicitly, including retry and persistence boundaries. Build behaviour that rejects invalid commands rather than patching them later.",
    [
      {
        level: "understand",
        prompt:
          "List valid transitions and guards for a delivery order from created through cancelled or delivered.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt: "Design command, state, event and persistence interfaces for an approval workflow.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Fix a repeated approve command racing with cancel so the stored outcome and emitted event agree.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Explain which transition needs atomic persistence and when compensation is preferable to rollback.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "lld-extensible-services": c(
    "Keep business policy independent of provider protocols and configuration. Demonstrate extension by adding an implementation rather than editing unrelated conditional logic.",
    [
      {
        level: "understand",
        prompt:
          "Explain why the consumer should define a notification port rather than depend on an SMS vendor SDK.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design a notification service with email and SMS adapters plus validated configuration.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Diagnose an adapter that silently violates the retry/idempotency contract expected by the caller.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend interface granularity when a future provider supports templates but the current one does not.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "lld-concurrent-components": c(
    "Make shared state, synchronization and shutdown rules visible in a component API. Verify the component under adversarial interleavings, not only happy-path tests.",
    [
      {
        level: "understand",
        prompt: "State the invariants and dangerous interleavings of a bounded work queue.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design a thread-safe cache with lock ownership, eviction and cancellation semantics.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Reproduce and fix a deadlock caused by opposite lock acquisition order in cache eviction.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend a coarse lock versus sharded locks when correctness, contention and implementation time conflict.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "lld-testing-evolution": c(
    "Use tests to preserve observable contracts while implementations change. Know which failures require integration, concurrency or end-to-end evidence.",
    [
      {
        level: "understand",
        prompt:
          "Classify a booking-system assertion as unit, contract, integration or end-to-end and explain the boundary.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt: "Write a contract suite that both a fake and a real payment adapter must pass.",
        evidence: ["implement"]
      },
      {
        level: "debug",
        prompt:
          "Find why unit tests pass while serialization breaks a real provider integration, then add the right test layer.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend what should remain stable during a refactor and what test assertions would over-couple to internals.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "lld-interview-builds": c(
    "Produce a small, executable design that communicates responsibilities, tests and extensions within an interview window. Treat a clean API and failure handling as part of the implementation evidence.",
    [
      {
        level: "understand",
        prompt:
          "Decompose a rate limiter prompt into API, state, invariants and testable behaviours before writing code.",
        evidence: ["explain", "design"]
      },
      {
        level: "apply",
        prompt:
          "Build a tested LRU cache or scheduler with a short README explaining complexity and ownership.",
        evidence: ["implement"]
      },
      {
        level: "debug",
        prompt:
          "Add a late requirement such as TTL, cancellation or multiple priorities and repair the brittle portion of the build.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Walk through one completed build in 20 minutes, answering why each class exists and how it fails safely.",
        evidence: ["mock", "explain"]
      }
    ]
  ),

  "mlsd-objective": c(
    "Frame ML around a product decision and its alternatives, rather than starting from a model family. Specify the consequence of low confidence and the feedback that judges success.",
    [
      {
        level: "understand",
        prompt:
          "For fraud review, distinguish prediction target, decision threshold, human action and product metric.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design a rules baseline, model policy and abstention route for support-ticket triage.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Explain why improved AUC can worsen workload or customer harm after a threshold change.",
        evidence: ["debug", "explain"]
      },
      {
        level: "interview",
        prompt:
          "Defend using retrieval or rules instead of ML when data volume and risk do not justify a model.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "mlsd-data-labels": c(
    "Create data and label flows that can reconstruct what a model knew at decision time. Address ownership, latency, privacy and train/serve parity as system contracts.",
    [
      {
        level: "understand",
        prompt:
          "Explain point-in-time correctness and give a concrete leakage example from churn prediction.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design feature/label lineage for a recommendation model with delayed clicks and privacy deletion requests.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Identify a feature that is available offline but not online and repair the training/serving contract.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend whether to build a feature store when only two models share low-latency features.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsd-training-platform": c(
    "Make training jobs reproducible, comparable and safely promotable. Distinguish a useful retrain signal from routine expensive recomputation.",
    [
      {
        level: "understand",
        prompt:
          "List every version needed to reproduce a model artifact, including data snapshot and environment.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design run metadata, artifact registry and approval gate for a weekly retraining pipeline.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Diagnose two ostensibly identical runs that differ because data ordering or library version was not captured.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend event-driven retraining versus a schedule when labels arrive late and GPU capacity is scarce.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "mlsd-serving": c(
    "Choose batch, streaming or online inference from decision latency and freshness requirements. Provide a controlled path from model artifact to a fallback-capable production decision.",
    [
      {
        level: "understand",
        prompt:
          "Compare batch scoring and synchronous inference for fraud, feed ranking and monthly demand forecast.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Allocate an end-to-end latency budget among feature lookup, model, network and response serialization.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Trace a p99 breach to feature-store latency rather than model compute and choose a safe fallback.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend shadow, canary and rollback policy for a model that changes a customer-facing decision.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "mlsd-monitoring": c(
    "Observe service health, data shifts, predictions and outcomes as separate signals. Route each alert to an owner and action before calling the system monitored.",
    [
      {
        level: "understand",
        prompt:
          "Explain why input drift may be harmless while stable inputs can still conceal outcome degradation.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design metrics and alert thresholds for a model whose labels arrive two weeks after prediction.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Investigate a conversion drop by separating instrumentation loss, model distribution shift and product UI change.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt: "Defend an alert policy that avoids paging on every benign seasonal shift.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsd-ranking-recommendation": c(
    "Design candidate generation and ranking as a measured multi-stage system. Account for exposure bias, freshness and exploration in the loop that creates future labels.",
    [
      {
        level: "understand",
        prompt:
          "Explain why approximate retrieval and a ranker are separated and which metric belongs to each stage.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt: "Design a two-tower candidate service and ranking feature path for a media feed.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Diagnose falling engagement caused by a recommender repeatedly training only on its own exposed items.",
        evidence: ["debug", "explain"]
      },
      {
        level: "interview",
        prompt:
          "Defend exploration, cold-start policy and online experiment guardrails for a new-user feed.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "mlsd-interview-loop": c(
    "Lead ML-system design discussions from product objective to operational feedback. Make data, evaluation and degradation paths as concrete as model choice.",
    [
      {
        level: "understand",
        prompt:
          "Outline the recurring sections of an ML design answer and the question each section resolves.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Write a concise design for fraud detection with objective, data, serving, metrics and fallback.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Review an ML design that lacks labels at serving time and add the missing feedback and monitoring loop.",
        evidence: ["debug", "design"]
      },
      {
        level: "interview",
        prompt:
          "Complete a timed recommendation or demand-forecasting design while defending one cost and one safety trade-off.",
        evidence: ["mock", "explain"]
      }
    ]
  ),

  "genaisd-requirements-model": c(
    "Select GenAI architecture from task-specific quality, latency, cost, privacy and control constraints. Measure a model choice against the work users actually need completed.",
    [
      {
        level: "understand",
        prompt:
          "Distinguish generation quality, factuality, tool success and user task completion for an enterprise assistant.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design hosted-versus-self-hosted, small-versus-large model routing for a confidential support workflow.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Explain why a higher benchmark score fails a domain task with strict JSON or citation requirements.",
        evidence: ["debug", "explain"]
      },
      {
        level: "interview",
        prompt:
          "Defend abstention, human review or a non-LLM workflow when quality cannot meet the risk threshold.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "genaisd-prompt-context": c(
    "Treat prompts as versioned software and context as data with trust labels. Build structured-output paths that remain safe when users or retrieved text are adversarial.",
    [
      {
        level: "understand",
        prompt:
          "Label system, user, retrieved and tool content by authority in a document-assistant request.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design prompt template versioning, context budget and JSON schema validation for an extraction service.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Create an injection test where retrieved text requests secret disclosure; show trusted instructions still govern output.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend prompt caching boundaries when prompts include tenant-specific documents and user identity.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "genaisd-rag": c(
    "Evaluate retrieval and generation as separable subsystems. Build RAG that can show its evidence, respect access controls and identify whether failure began before decoding.",
    [
      {
        level: "understand",
        prompt:
          "Explain how chunk size affects recall, precision, context waste and citation granularity.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design ingestion, ACL metadata, hybrid retrieval, reranking and citation output for policy documents.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Classify a bad answer as missing retrieval, wrong ranking, stale source or generation-not-using-context.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend vector-only versus hybrid search and the cost of reranking at ten times query volume.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "genaisd-serving-routing": c(
    "Run inference with visible token economics, overload policy and privacy-safe caching. Balance model quality against queueing and tail latency at the request level.",
    [
      {
        level: "understand",
        prompt:
          "Explain prefill versus decode cost and why mixed prompt/output lengths complicate batching.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design a gateway with rate limits, model fallback, semantic/cache eligibility and streaming response handling.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Use queue depth and per-token traces to diagnose a p99 spike after long-context requests arrive.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend routing a lower-cost model during overload without silently violating a high-risk task’s quality bar.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "genaisd-evals-observability": c(
    "Operate a GenAI release loop with reproducible traces, task-specific evals and calibrated human judgement. Treat quality, latency and cost regressions as jointly observable.",
    [
      {
        level: "understand",
        prompt:
          "Name the trace fields required to replay a failed answer after prompt, retrieval and model versions change.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Create a frozen evaluation set with normal, adversarial and edge cases plus release thresholds.",
        evidence: ["design", "implement"]
      },
      {
        level: "debug",
        prompt:
          "Investigate disagreement between an LLM judge and expert reviewers; identify calibration or rubric flaw.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend why passing offline eval cannot alone authorize a production prompt/model rollout.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "genaisd-safety": c(
    "Layer controls around model limitations, privileged tools and sensitive data. Demonstrate which enforcement remains reliable even when generation is malicious or wrong.",
    [
      {
        level: "understand",
        prompt:
          "Threat-model an agent with web retrieval, customer data and a ticket-closing tool.",
        evidence: ["explain", "design"]
      },
      {
        level: "apply",
        prompt:
          "Specify allowlists, scoped credentials, confirmation and audit requirements for each tool action.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Red-team a prompt injection that attempts cross-tenant data access and verify the server refuses it.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend a human-escalation boundary for actions that are reversible versus financially or legally irreversible.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "genaisd-design-loop": c(
    "Synthesize assistant, RAG, multimodal and high-volume generation design decisions into a reviewable end-to-end story. State the dominant risk and show how telemetry exposes it.",
    [
      {
        level: "understand",
        prompt:
          "Compare the primary risks of an enterprise RAG assistant, voice agent and bulk-content generator.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Draw request, retrieval/tool, model, control and telemetry paths for a coding assistant.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Revise a design after a red-team finding reveals that tool output is entering the prompt as trusted instruction.",
        evidence: ["debug", "design"]
      },
      {
        level: "interview",
        prompt:
          "Present an enterprise RAG design in 45 minutes and defend its worst 10× quality, cost or safety assumption.",
        evidence: ["mock", "explain"]
      }
    ]
  ),

  "mlsys-compute-memory": c(
    "Use measurements and hardware limits to identify whether an ML workload is compute-, bandwidth- or overhead-bound. Explain performance in bytes, operations and synchronization rather than intuition alone.",
    [
      {
        level: "understand",
        prompt:
          "Explain arithmetic intensity and why two operators with similar FLOPs can have very different runtimes.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Benchmark a matrix operation and estimate its memory traffic, FLOPs and likely roofline bound.",
        evidence: ["implement", "solve"]
      },
      {
        level: "debug",
        prompt:
          "Use profile counters to distinguish poor parallelism from bandwidth saturation in a slow kernel.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend whether batching, layout change or kernel fusion is the first optimization for a stated serving bottleneck.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsys-frameworks-autodiff": c(
    "Understand how tensor layout, graph lifetime and reverse-mode differentiation shape framework behaviour. Implement enough machinery to diagnose correctness and memory costs.",
    [
      {
        level: "understand",
        prompt:
          "Explain which forward values an operator must retain for its backward computation and why.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Implement topological backward for scalar/tensor add and multiply with broadcasting tests.",
        evidence: ["implement"]
      },
      {
        level: "debug",
        prompt:
          "Find a wrong gradient caused by an in-place mutation or incorrectly reduced broadcast dimension.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend eager versus graph execution when dynamic control flow and optimization opportunities conflict.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsys-gpu-kernels": c(
    "Map tensor work onto SIMT execution and memory hierarchy with a correctness baseline. Improve a kernel through profiling, while documenting the hardware and shapes behind any speed claim.",
    [
      {
        level: "understand",
        prompt:
          "Explain warp divergence, coalescing, shared-memory tiling and occupancy using a matrix multiply.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Implement a correct tiled GEMM or reduction and compare output against a CPU/PyTorch reference.",
        evidence: ["implement"]
      },
      {
        level: "debug",
        prompt:
          "Locate a race or non-coalesced stride from profiler and correctness failures, then verify the repaired kernel.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend increasing tile size versus register pressure and occupancy for a given GPU and matrix shape.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsys-compilers": c(
    "Reason about graph transformations as semantic contracts with resource consequences. Test that a fusion or specialization reduces the intended overhead without invalidating dynamic behaviour.",
    [
      {
        level: "understand",
        prompt:
          "Explain how fusion can reduce launch/memory traffic yet increase register pressure.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Specify preconditions and output equivalence for fusing two elementwise operators.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Diagnose a shape-specialized graph that fails or recompiles excessively for variable batch sizes.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend ahead-of-time compilation versus tracing/JIT for a workload with dynamic control flow.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsys-distributed-training": c(
    "Select data, tensor, pipeline or sharded parallelism from model-state memory and communication topology. Validate scaling claims with a small distributed run and explicit efficiency limits.",
    [
      {
        level: "understand",
        prompt:
          "Account separately for parameters, gradients, optimizer states and activations in a training step.",
        evidence: ["explain", "solve"]
      },
      {
        level: "apply",
        prompt:
          "Choose DP, FSDP/ZeRO, tensor or pipeline parallelism for a model that does not fit one GPU.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Investigate why adding workers lowers throughput: distinguish all-reduce, pipeline bubble, data input or straggler causes.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend sharding and checkpoint/recovery policy when communication bandwidth is the scarce resource.",
        evidence: ["mock", "design"]
      }
    ]
  ),
  "mlsys-efficiency": c(
    "Evaluate quantization, pruning, sparsity or distillation with a fair quality and systems baseline. Explain which apparent wins disappear under different hardware or request distributions.",
    [
      {
        level: "understand",
        prompt:
          "Explain why weights, activations and accumulation may need different numerical precision.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Quantize a model with calibration and record accuracy, model memory, p50 and p95 latency on named hardware.",
        evidence: ["implement"]
      },
      {
        level: "debug",
        prompt:
          "Diagnose a quantized model whose benchmark is fast but quality collapses on rare inputs.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend structured pruning or distillation when unstructured sparsity is not accelerated by the deployment hardware.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsys-serving": c(
    "Operate a model server around realistic request shapes, not a single-token average. Design batching, cache memory and autoscaling policies that protect tail latency and correctness.",
    [
      {
        level: "understand",
        prompt:
          "Explain continuous batching, KV-cache growth and why average latency hides queueing harm.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design scheduler, admission control and cache eviction for mixed short and long LLM requests.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Load-test a bursty request mix and isolate whether p99 comes from prefill, decode, queueing or memory eviction.",
        evidence: ["debug", "implement"]
      },
      {
        level: "interview",
        prompt:
          "Defend speculative decoding or disaggregated prefill/decode against complexity, traffic mix and hardware cost.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsys-platform-observability": c(
    "Operate ML delivery as a traceable platform spanning data, code, artifacts, deployment and incident response. Use lineage to attribute a bad prediction without guessing between infrastructure and model causes.",
    [
      {
        level: "understand",
        prompt:
          "Explain the identifiers that must connect a request, feature snapshot, model version, container and deployment.",
        evidence: ["explain"]
      },
      {
        level: "apply",
        prompt:
          "Design CI, registry, deployment approval, rollback and telemetry for a model service.",
        evidence: ["design"]
      },
      {
        level: "debug",
        prompt:
          "Trace a bad production prediction through data lineage and distinguish data corruption from model regression or serving bug.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Defend platform investment versus team-owned scripts for a small organization with two production models.",
        evidence: ["mock", "explain"]
      }
    ]
  ),
  "mlsys-project": c(
    "Deliver a systems artifact whose correctness, performance and reliability claims are reproducible by another engineer. Treat benchmark method, failure tests and the next bottleneck as first-class project outputs.",
    [
      {
        level: "understand",
        prompt:
          "Write acceptance criteria, correctness oracle, target workload and environment lock before implementing the project.",
        evidence: ["design"]
      },
      {
        level: "apply",
        prompt:
          "Build a baseline and one framework, training or serving improvement with automated correctness checks.",
        evidence: ["implement"]
      },
      {
        level: "debug",
        prompt:
          "Investigate a claimed speedup that disappears after warm-up, different shape mix or correctness validation.",
        evidence: ["debug"]
      },
      {
        level: "interview",
        prompt:
          "Demo the artifact and defend methodology, trade-offs, operational limits and the next bottleneck to a systems interviewer.",
        evidence: ["mock", "explain"]
      }
    ]
  )
};
