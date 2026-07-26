import type { EvidenceType } from "../../types";

type C = {
  level: "understand" | "apply" | "debug" | "interview";
  prompt: string;
  evidence: EvidenceType[];
};
type M = { outcome: string; checkpoints: [C, C, C, C] };
const cp = (p: [string, string, string, string]): [C, C, C, C] => [
  { level: "understand", prompt: p[0], evidence: ["explain", "solve"] },
  { level: "apply", prompt: p[1], evidence: ["implement", "design"] },
  { level: "debug", prompt: p[2], evidence: ["debug", "implement"] },
  { level: "interview", prompt: p[3], evidence: ["explain", "mock"] }
];
export const aiMastery: Record<string, M> = {
  "math-linear-algebra": {
    outcome:
      "Reason from vector spaces and matrix shapes to model behavior. Implement SVD/PCA and use numerical checks to catch incorrect tensor algebra.",
    checkpoints: cp([
      "Why is a projection residual orthogonal to its subspace?",
      "Recover principal directions with SVD and measure reconstruction error.",
      "Find the transpose/broadcast bug in a tiny attention computation.",
      "Defend PCA versus a learned representation for a stated dataset."
    ])
  },
  "math-probability": {
    outcome:
      "Express modeling assumptions as distributions, likelihoods, and conditional claims. Quantify uncertainty rather than presenting a point prediction as certainty.",
    checkpoints: cp([
      "Derive Bayes' update for a noisy binary test.",
      "Simulate a Bernoulli estimator and plot its sampling variation.",
      "Explain why a high-accuracy classifier can be badly calibrated.",
      "Choose a metric when false negatives cost ten times false positives."
    ])
  },
  "math-optimization": {
    outcome:
      "Derive gradients through composed objectives and build stable optimization code. Use traces and finite differences to distinguish calculus errors from training choices.",
    checkpoints: cp([
      "Derive softmax cross-entropy gradient including dimensions.",
      "Write a finite-difference checker for a two-layer network.",
      "Repair overflow in naive softmax/log likelihood.",
      "Justify Adam, SGD, or a schedule from observed training curves."
    ])
  },
  "evaluation-experimentation": {
    outcome:
      "Make product decisions from reproducible baselines, splits, slices, and ablations. State exactly what an experiment cannot establish.",
    checkpoints: cp([
      "Identify leakage caused before a train/test split.",
      "Build a time-aware split and non-ML baseline.",
      "Find why a CV pipeline leaks a fitted scaler.",
      "Reject or ship a model using uncertainty, slice metrics, and rollback criteria."
    ])
  },
  "ml-data-problem": {
    outcome:
      "Turn an ambiguous question into a time-valid target, dataset, and baseline. Defend feature availability and label quality at prediction time.",
    checkpoints: cp([
      "Write actor, action, horizon, target, and error cost for a use case.",
      "Create a feature-availability table and baseline.",
      "Expose a future-information feature in a training table.",
      "Explain why this should be ML rather than a rule."
    ])
  },
  "ml-linear-models": {
    outcome:
      "Fit and interpret linear/logistic models with appropriate regularization. Separate coefficient association from causal effect.",
    checkpoints: cp([
      "Why is logistic regression's boundary linear?",
      "Implement regularized logistic regression and compare a baseline.",
      "Diagnose unstable coefficients from collinear features.",
      "Defend L1 versus L2 for a sparse noisy tabular problem."
    ])
  },
  "ml-trees-ensembles": {
    outcome:
      "Use trees and ensembles deliberately for structured data. Diagnose overfit, calibration, and bias-variance trade-offs from validation evidence.",
    checkpoints: cp([
      "Compute a Gini split by hand.",
      "Compare tree, forest, and boosting under identical folds.",
      "Recognize excessive depth from train/validation behavior.",
      "Explain why bagging and boosting fail differently."
    ])
  },
  "ml-unsupervised": {
    outcome:
      "Apply PCA or clustering with explicit geometry assumptions. Validate usefulness through a downstream question instead of visual appeal.",
    checkpoints: cp([
      "What cluster shape does k-means prefer?",
      "Implement k-means updates and PCA reduction.",
      "Show how feature scale changes cluster assignments.",
      "Defend a clustering result without treating labels as ground truth."
    ])
  },
  "ml-model-selection": {
    outcome:
      "Choose models through valid resampling and error analysis. Report whether an apparent gain survives variance and deployment constraints.",
    checkpoints: cp([
      "Interpret diverging training and validation curves.",
      "Run a pipeline-contained hyperparameter search.",
      "Find preprocessing fitted outside a CV fold.",
      "Explain why a 0.2-point gain is or is not credible."
    ])
  },
  "ml-feature-pipelines": {
    outcome:
      "Produce identical, validated features at training and inference. Detect schema, missing-value, and drift failures before scoring.",
    checkpoints: cp([
      "Which statistics belong only to the training fold?",
      "Build numeric/categorical transforms in one pipeline.",
      "Reproduce a train/serve category mismatch.",
      "Describe contracts and alerts for a new upstream column."
    ])
  },
  "ml-interpretability-fairness": {
    outcome:
      "Measure subgroup and robustness failures without confusing explanations with causes. Recommend bounded mitigations grounded in evidence.",
    checkpoints: cp([
      "Why is feature importance not causality?",
      "Produce per-group calibration and error tables.",
      "Find a shift hidden by aggregate accuracy.",
      "Defend an abstention or monitoring policy for harmed users."
    ])
  },
  "ml-end-to-end-project": {
    outcome:
      "Ship a classical-ML artifact reproducible from a clean checkout. Make the model card, monitoring, and non-deployment boundary reviewable.",
    checkpoints: cp([
      "Name every artifact needed to reproduce a baseline.",
      "Implement data tests, training, and batch/service inference.",
      "Trace a production metric drop to data or model causes.",
      "Walk an interviewer through the decision not to deploy."
    ])
  },
  "dl-neural-networks": {
    outcome:
      "Implement an MLP and trace gradients through its computation graph, rather than treating autograd as magic. Prove local derivatives and parameter updates are correct with numerical tests.",
    checkpoints: cp([
      "What values must each node retain for reverse-mode autodiff?",
      "Implement affine, activation, loss, and backward passes without autograd.",
      "Use gradient checking to locate a wrong ReLU or matrix derivative.",
      "Explain vanishing gradients through repeated Jacobian products."
    ])
  },
  "dl-training-dynamics": {
    outcome:
      "Read training behavior as evidence about optimization, capacity, data, and regularization. Stabilize a run with the smallest measured intervention.",
    checkpoints: cp([
      "How do initialization and normalization alter gradient flow?",
      "Run an optimizer/weight-decay ablation with fixed seeds.",
      "Diagnose NaNs, exploding norms, or a flat loss curve.",
      "Defend whether to add capacity, data, regularization, or training time."
    ])
  },
  "dl-cnns": {
    outcome:
      "Build CNNs while accounting for spatial shape and receptive field. Connect their inductive bias to concrete vision errors.",
    checkpoints: cp([
      "Calculate a stack's output shape and receptive field.",
      "Train a CNN with augmentation on an image task.",
      "Locate an off-by-one padding or channel-order bug.",
      "Explain what translation equivariance does not guarantee."
    ])
  },
  "dl-sequence-models": {
    outcome:
      "Implement autoregressive recurrence and understand BPTT, gating, and exposure mismatch. Diagnose failures that only appear during free generation.",
    checkpoints: cp([
      "Why does teacher forcing alter the input distribution?",
      "Train a character RNN and a GRU.",
      "Inspect exploding/vanishing temporal gradients.",
      "Compare recurrence with attention for a long-context task."
    ])
  },
  "dl-attention-transformers": {
    outcome:
      "Implement masked multi-head attention with shape and cost accounting. Explain positional information, residual paths, and normalization choices.",
    checkpoints: cp([
      "Why divide attention scores by sqrt(dk)?",
      "Write and test causal multi-head attention.",
      "Catch a mask that leaks future tokens.",
      "Defend attention cost when context length doubles."
    ])
  },
  "dl-representation-learning": {
    outcome:
      "Select a transfer strategy based on data, shift, and compute. Demonstrate whether pretrained features genuinely help the target task.",
    checkpoints: cp([
      "What makes a pretext task transferable?",
      "Compare frozen, linear-probe, and full-finetune runs.",
      "Diagnose negative transfer under domain shift.",
      "Defend when a frozen backbone is preferable."
    ])
  },
  "dl-debugging": {
    outcome:
      "Use a systematic ladder from data validation to profiler evidence. Leave a minimal reproduction and regression test for each repaired failure.",
    checkpoints: cp([
      "Why is overfitting one batch a decisive test?",
      "Instrument activations, gradients, and deterministic seeds.",
      "Find the first failed invariant in a broken training run.",
      "Prioritize a profiler finding against an accuracy failure."
    ])
  },
  "dl-project": {
    outcome:
      "Present a neural-model project as evidence, not architecture novelty. Link each claim to a baseline, ablation, and error slice.",
    checkpoints: cp([
      "State the project's falsifiable hypothesis.",
      "Build baseline, training telemetry, and ablation table.",
      "Investigate the largest remaining error cluster.",
      "Defend the next experiment under a fixed compute budget."
    ])
  },
  "llm-tokenization-data": {
    outcome:
      "Build a tokenizer and inspect how corpus choices change sequence cost and benchmark validity. Treat data provenance and contamination as implementation requirements.",
    checkpoints: cp([
      "How does vocabulary size trade tokens against embedding cost?",
      "Train a BPE tokenizer and verify round trips.",
      "Detect duplicates or benchmark contamination in a corpus.",
      "Defend a data mix and deduplication policy."
    ])
  },
  "llm-architecture": {
    outcome:
      "Construct a small decoder-only model with modern components and explicit cache/parameter accounting. Explain which architectural changes target quality versus inference cost.",
    checkpoints: cp([
      "Account for parameters in one decoder block.",
      "Implement RoPE, RMSNorm, and causal decoding.",
      "Find an incorrect cache position or GQA reshape.",
      "Explain GQA's quality/cache trade-off."
    ])
  },
  "llm-pretraining": {
    outcome:
      "Run a small, restartable LM training job with interpretable loss and throughput signals. Make compute/data claims proportional to the experiment's scale.",
    checkpoints: cp([
      "What changes when sequence length doubles?",
      "Add checkpoint/resume and fixed validation.",
      "Profile a throughput or memory bottleneck.",
      "Choose whether next compute buys data or parameters."
    ])
  },
  "llm-decoding": {
    outcome:
      "Implement sampling and cached generation while measuring quality, latency, and memory. Choose generation settings for a task rather than a preferred aesthetic.",
    checkpoints: cp([
      "Contrast temperature, top-k, top-p, and beam search.",
      "Verify cached decoding equals full-prefix decoding.",
      "Find a cache growth or batching latency regression.",
      "Defend a decoding policy for extraction versus creative use."
    ])
  },
  "llm-finetuning": {
    outcome:
      "Design a versioned SFT/PEFT experiment and separate data quality from optimization effects. Detect regressions on capabilities outside the training distribution.",
    checkpoints: cp([
      "Why can training loss improve while instruction following worsens?",
      "Run a LoRA rank/data-mixture experiment.",
      "Diagnose catastrophic forgetting on a held-out suite.",
      "Defend adapter rank and target modules."
    ])
  },
  "llm-posttraining": {
    outcome:
      "Explain preference optimization as a limited behavioral objective, not proof of alignment. Implement a small comparison and test reward/label pathologies.",
    checkpoints: cp([
      "How does DPO differ from reward-model plus PPO?",
      "Train on curated preference pairs.",
      "Expose reward hacking despite good held-out reward accuracy.",
      "Explain what human evaluation is still required."
    ])
  },
  "llm-evaluation": {
    outcome:
      "Build a task and safety suite with calibrated judge/human evidence. Make contamination, grader error, and distribution shift visible in release decisions.",
    checkpoints: cp([
      "What can an LLM judge systematically miss?",
      "Implement fixtures, rubric, and grader agreement sampling.",
      "Find a benchmark score inflated by contamination.",
      "Defend a release gate after an adversarial failure."
    ])
  },
  "llm-from-scratch-build": {
    outcome:
      "Deliver a transparent tokenizer-to-generation LM build with reproducible reports. Attribute limitations to data, scale, objective, or implementation rather than vague model weakness.",
    checkpoints: cp([
      "Sketch dependencies from corpus to validation loss.",
      "Train and generate from a small LM.",
      "Resume a run and reconcile changed metrics.",
      "Explain the most important limitation of the artifact."
    ])
  },
  "gen-latent-variable-models": {
    outcome:
      "Derive ELBO terms and implement reparameterized latent-variable learning. Diagnose reconstruction/KL trade-offs and posterior collapse.",
    checkpoints: cp([
      "Which ELBO term shapes the latent prior?",
      "Train a VAE and visualize latent traversals.",
      "Detect posterior collapse from KL and reconstruction traces.",
      "Defend a VAE over deterministic compression."
    ])
  },
  "gen-gans": {
    outcome:
      "Train adversarial generators while measuring coverage and fidelity beyond discriminator accuracy. Recognize instability and mode collapse from evidence.",
    checkpoints: cp([
      "Why use a non-saturating generator loss?",
      "Train a toy GAN with alternating updates.",
      "Distinguish collapse from a cherry-picked sample grid.",
      "Explain why GAN likelihood is not directly available."
    ])
  },
  "gen-flows": {
    outcome:
      "Use change-of-variables reasoning to build invertible density models. Test inverse and log-determinant calculations numerically.",
    checkpoints: cp([
      "Where does the Jacobian determinant enter density?",
      "Implement an affine coupling transform and inverse.",
      "Catch a non-invertible or wrong-sign log-det bug.",
      "Compare flow tractability with VAE and GAN trade-offs."
    ])
  },
  "gen-diffusion": {
    outcome:
      "Implement noising, denoising, sampling, and guidance for a small diffusion model. Measure the cost-quality-diversity trade-off instead of relying on attractive samples.",
    checkpoints: cp([
      "Why can noise prediction estimate a denoising direction?",
      "Train a DDPM noise predictor.",
      "Find a broken noise schedule or conditioning dropout.",
      "Defend sampler steps and guidance scale for a product."
    ])
  },
  "gen-multimodal": {
    outcome:
      "Prototype image-text alignment with clear paired-data assumptions. Explain where fusion occurs and evaluate failures by modality and subgroup.",
    checkpoints: cp([
      "How does contrastive learning align separate encoders?",
      "Build a cross-modal retrieval baseline.",
      "Find preprocessing or pairing noise causing retrieval collapse.",
      "Defend cross-attention versus late fusion."
    ])
  },
  "gen-evaluation-safety": {
    outcome:
      "Evaluate generative outputs across fidelity, diversity, memorization, and misuse. Combine human protocol and quantitative proxies without claiming either is complete.",
    checkpoints: cp([
      "Why can FID-like quality improve while diversity falls?",
      "Create blinded sample-ranking and nearest-neighbor checks.",
      "Investigate a memorized or unsafe output.",
      "Defend a blocklist, disclosure, and incident response."
    ])
  },
  "gen-project": {
    outcome:
      "Ship one non-text generative project with reproducible seeds, baselines, samples, metrics, and safety documentation. Make qualitative claims inspectable rather than anecdotal.",
    checkpoints: cp([
      "Define success beyond a visually pleasing sample.",
      "Publish training config and evaluation grid.",
      "Reproduce a failure from a saved seed/checkpoint.",
      "Defend the model family and remaining risk."
    ])
  },
  "agent-loop": {
    outcome:
      "Implement a bounded observe-plan-act loop with explicit termination, budget, and fallback. Demonstrate why autonomy beats a deterministic workflow on the selected task.",
    checkpoints: cp([
      "Name the success, stop, and no-progress conditions.",
      "Build stateful planning and action execution.",
      "Handle repeated tool failure without infinite looping.",
      "Defend agent use against a simple workflow baseline."
    ])
  },
  "agent-tools": {
    outcome:
      "Design narrow tool contracts whose validation and authorization do not trust model output. Make side effects idempotent and observable.",
    checkpoints: cp([
      "Which argument requires independent validation?",
      "Implement typed schema, dry-run, and idempotency key.",
      "Reject prompt-injected or malformed tool calls.",
      "Defend the least-privilege boundary for a destructive action."
    ])
  },
  "agent-memory-state": {
    outcome:
      "Separate conversational context, derived retrieval, and authoritative durable state. Provide provenance, expiry, and user correction instead of treating retrieval as truth.",
    checkpoints: cp([
      "Classify authoritative versus derived state.",
      "Implement retrieval with provenance and TTL.",
      "Resolve stale or conflicting retrieved memories.",
      "Defend deletion and privacy behavior to a user."
    ])
  },
  "agent-orchestration": {
    outcome:
      "Choose serial or parallel workflows from dependencies, ownership, and coordination cost. Preserve evidence when workers disagree or partially fail.",
    checkpoints: cp([
      "Which tasks are genuinely independent?",
      "Implement a join with explicit result ownership.",
      "Handle timeout and contradictory worker output.",
      "Defend multi-agent topology over a single agent."
    ])
  },
  "agent-evaluation": {
    outcome:
      "Score both final world state and the safety/efficiency of the route taken. Replay traces and turn incidents into deterministic regressions.",
    checkpoints: cp([
      "Can a correct answer hide an unsafe trajectory?",
      "Build gold-state fixtures and tool assertions.",
      "Locate the first failing action in a trace replay.",
      "Defend a deterministic release evaluator."
    ])
  },
  "agent-safety-control": {
    outcome:
      "Limit the blast radius of tool-using agents through permissions, sandboxes, approvals, and logs. Show that injection cannot silently gain authority.",
    checkpoints: cp([
      "Map assets, attackers, and maximum damage.",
      "Implement allowlists and approval gates.",
      "Red-team exfiltration or instruction injection.",
      "Defend which high-confidence action still needs a human."
    ])
  },
  "agent-reliability": {
    outcome:
      "Build a resumable harness with checkpoints, bounded retries, verification, and observability. Recover from crashes without claiming completion from model text alone.",
    checkpoints: cp([
      "What survives a context reset or process crash?",
      "Persist state and resume an interrupted task.",
      "Diagnose retry storms or false completion.",
      "Defend the external artifact that proves completion."
    ])
  },
  "agent-project": {
    outcome:
      "Deliver a bounded tool-using agent whose usefulness, cost, safety, and failures are measured. A reviewer can replay a failed run and locate the responsible boundary.",
    checkpoints: cp([
      "State the task metric and deterministic baseline.",
      "Integrate tools, state, permissions, and trace storage.",
      "Reproduce and fix a safety or reliability failure.",
      "Defend adoption with measured success, cost, and residual risk."
    ])
  }
};
