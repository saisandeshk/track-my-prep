# Detailed AI concept map

Audit date: 2026-07-26. This is an integration specification keyed to the existing IDs in `src/data/concepts.ts`; it does not change the TypeScript data. Every outcome deliberately combines theory, an implementation/debugging behavior, and interview-defensible evidence. Resource links are direct where a stable public unit exists.

## Resource and video constraints

- **D2L** is the open default: [preliminaries](https://d2l.ai/chapter_preliminaries/index.html), [linear regression](https://d2l.ai/chapter_linear-regression/index.html), [classification](https://d2l.ai/chapter_linear-classification/index.html), [MLPs](https://d2l.ai/chapter_multilayer-perceptrons/index.html), [CNNs](https://d2l.ai/chapter_convolutional-neural-networks/index.html), [RNNs](https://d2l.ai/chapter_recurrent-neural-networks/index.html), [attention/Transformers](https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html), [optimization](https://d2l.ai/chapter_optimization/index.html), [CV](https://d2l.ai/chapter_computer-vision/index.html), [GANs](https://d2l.ai/chapter_generative-adversarial-networks/index.html), and [RL](https://d2l.ai/chapter_reinforcement-learning/index.html).
- **Deep-ML** has a public [problem index](https://www.deep-ml.com/problems), but a stable public per-problem URL/title mapping was not exposed by the audit. Use its filters for the named topic and record the solved problem URL in the learner artifact; do not invent a slug.
- **CS336** has a public [home and coursework index](https://cs336.stanford.edu/) plus [lecture materials](https://cs336.stanford.edu/lectures/). It is the authoritative route for tokenizer/model/training/inference work; GPU rental and course participation may cost money. Individual lecture-video timestamps were not reliably public at audit.
- **Modern LLM Notebook** is an open [notebook curriculum](https://walkinglabs.github.io/modern-llm-notebook/?lang=en). Its public index describes notebook topics but does not supply stable per-notebook deep links in the audited metadata; cite the notebook number/title from the live index in a project report rather than guessing a URL.
- **AlgoMaster AI Engineering** has a public [catalog](https://algomaster.io/courses); individual chapter URLs/tier access were not verified. It is optional applied review, not required evidence.
- Video audit: the saved [Jia-Bin Huang channel](https://www.youtube.com/@jbhuang0604) is public but unstructured/JavaScript-rendered; no specific lecture, timestamps, or course sequence were verifiable. CS336’s site links a public playlist, but no timestamped metadata was exposed. No concrete EleutherAI playlist URL exists in the workspace/catalog, so no video is prescribed. **GPU MODE is intentionally excluded.** Videos can be supplementary only: record title, URL, and timestamp yourself when the live description supports it.

## Shared mathematics and evaluation

### `math-linear-algebra`

**Outcome:** Derive and implement matrix/vector operations used by linear models and attention; catch shape, transpose and conditioning errors with assertions/tests; defend a PCA/SVD or projection choice from dimensions, geometry and empirical reconstruction/error evidence.

**Checkpoints:**

1. Compute dot products, norms, matrix products and broadcasted tensor shapes by hand and in NumPy/PyTorch.
2. Derive orthogonal projection and verify its residual is orthogonal to the chosen subspace.
3. Implement PCA with SVD, compare to a library result, and explain singular values/reconstruction loss.
4. Debug a deliberately transposed attention/linear-layer tensor using shape assertions and a tiny numerical case.

**Units:** [D2L Linear Algebra](https://d2l.ai/chapter_preliminaries/linear-algebra.html); [D2L attention](https://d2l.ai/chapter_attention-mechanisms-and-transformers/queries-keys-values.html); Deep-ML [linear-algebra-filtered index](https://www.deep-ml.com/problems).

### `math-probability`

**Outcome:** Translate a data-generating claim into random variables, conditional distributions and likelihood; implement simulation/calibration checks; present uncertainty and class-imbalance trade-offs with a decision-relevant metric rather than an accuracy-only claim.

**Checkpoints:**

1. Calculate conditional probability, expectation/variance and Bayes updates for a binary diagnostic scenario.
2. Derive Bernoulli/Gaussian negative log-likelihood and connect it to classification/regression loss.
3. Simulate sampling uncertainty and compare confidence intervals or bootstrap estimates across samples.
4. Build a reliability diagram and explain why confidence, calibration and accuracy can disagree.

**Units:** [D2L Probability and Statistics](https://d2l.ai/chapter_preliminaries/probability.html); [D2L softmax regression](https://d2l.ai/chapter_linear-classification/softmax-regression.html); Deep-ML [probability-filtered index](https://www.deep-ml.com/problems).

### `math-optimization`

**Outcome:** Derive gradients/Jacobians through a composed loss, implement gradient checking and numerically stable primitives, then justify optimizer and learning-rate choices from logs rather than folklore.

**Checkpoints:**

1. Derive MSE and softmax-cross-entropy gradients, including dimensions.
2. Implement finite-difference gradient checking and diagnose an intentional sign/broadcasting bug.
3. Implement stable log-sum-exp/softmax and show a naive overflow failure.
4. Compare SGD/momentum/Adam and one schedule on a controlled task; defend the selection from curves and seeds.

**Units:** [D2L Calculus](https://d2l.ai/chapter_preliminaries/calculus.html); [D2L autodiff](https://d2l.ai/chapter_preliminaries/autograd.html); [D2L optimization](https://d2l.ai/chapter_optimization/index.html); Deep-ML [optimization-filtered index](https://www.deep-ml.com/problems).

### `evaluation-experimentation`

**Outcome:** Design a leakage-resistant, reproducible evaluation with baselines, slices, uncertainty and ablations; implement it as a rerunnable pipeline; defend the release/no-release decision and the metric’s blind spots in an interview.

**Checkpoints:**

1. Write the prediction time, target, unit, population, split rule and non-ML baseline before training.
2. Construct a leakage example (including preprocessing before splitting), detect it, and fix it with a pipeline.
3. Report aggregate and slice metrics with confidence/variance across seeds or folds.
4. Run an ablation table that changes one causal factor at a time and state the decision it supports.
5. Produce a one-page experiment card containing data version, code revision, metric limitations and rollback criterion.

**Units:** [D2L generalization](https://d2l.ai/chapter_linear-regression/generalization.html); [D2L environment/distribution shift](https://d2l.ai/chapter_linear-classification/environment-and-distribution-shift.html); [scikit-learn model evaluation](https://scikit-learn.org/stable/model_selection.html); [Made With ML MLOps](https://madewithml.com/courses/mlops/).

## Core ML

### `ml-data-problem`

**Outcome:** Convert an ambiguous product question into a time-valid supervised-learning specification and minimal dataset; implement a data audit/baseline; defend target, labels, availability and expected value against a skeptical interviewer.

**Checkpoints:** 1. Write a prediction contract (actor, action, horizon, target, cost of errors). 2. Build a timestamp-aware data split and feature-availability table. 3. Implement majority/rule/linear baselines and compare them fairly. 4. Diagnose label noise/selection bias on sampled records. **Units:** [D2L data preprocessing](https://d2l.ai/chapter_preliminaries/pandas.html); [Made With ML design](https://madewithml.com/courses/mlops/design/); [AlgoMaster catalog](https://algomaster.io/courses) (applied chapters: metadata/tier unverified).

### `ml-linear-models`

**Outcome:** Derive, train, regularize and inspect linear/logistic models; debug loss/feature-scaling mistakes; explain coefficients, decision boundaries and L1/L2 trade-offs with a reproducible baseline. **Checkpoints:** 1. Derive normal-equation/gradient update and logistic likelihood. 2. Implement regression and logistic regression from scratch with tests. 3. Compare L1/L2 under correlated features and justify scaling. 4. Present residuals, confusion/calibration plots and coefficient caveats. **Units:** [D2L linear regression](https://d2l.ai/chapter_linear-regression/index.html); [D2L softmax](https://d2l.ai/chapter_linear-classification/softmax-regression.html); Deep-ML [problem index](https://www.deep-ml.com/problems).

### `ml-trees-ensembles`

**Outcome:** Implement/operate tree and ensemble models for tabular data, diagnose variance/bias/calibration failures, and defend a boosting-versus-linear baseline choice. **Checkpoints:** 1. Compute entropy/Gini and a split manually. 2. Train a depth sweep and identify overfit from curves. 3. Compare one tree, random forest and gradient boosting with identical folds. 4. Calibrate the winner and report slice failures. **Units:** [scikit-learn trees](https://scikit-learn.org/stable/modules/tree.html); [ensemble methods](https://scikit-learn.org/stable/modules/ensemble.html); [D2L generalization](https://d2l.ai/chapter_linear-regression/generalization.html); Deep-ML [index](https://www.deep-ml.com/problems).

### `ml-unsupervised`

**Outcome:** State the geometry/identifiability assumptions of PCA, k-means and density-style methods, implement a controlled reduction/clustering analysis, and defend usefulness with downstream/slice evidence rather than pretty plots. **Checkpoints:** 1. Center data and recover principal directions with SVD. 2. Implement k-means assignment/update and show sensitivity to scaling/seeds. 3. Compare clusters to an external/downstream outcome without treating labels as ground truth. 4. Document a representation failure caused by a wrong distance/normalization choice. **Units:** [scikit-learn clustering](https://scikit-learn.org/stable/modules/clustering.html); [scikit-learn PCA](https://scikit-learn.org/stable/modules/decomposition.html#pca); [D2L PCA/SVD math](https://d2l.ai/chapter_preliminaries/linear-algebra.html); Deep-ML [index](https://www.deep-ml.com/problems).

### `ml-model-selection`

**Outcome:** Select a model using nested/reproducible validation, learning curves and error analysis; implement preprocessing inside folds; defend why a reported improvement is real and relevant. **Checkpoints:** 1. Create a stratified/time split justified by deployment. 2. Implement a `Pipeline` + CV search without leakage. 3. Interpret train/validation learning curves and calibration. 4. Quantify a confidence interval/seed variance and reject an insignificant “win.” **Units:** [D2L model selection](https://d2l.ai/chapter_multilayer-perceptrons/generalization-deep.html); [scikit-learn cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html); [Made With ML evaluation](https://madewithml.com/courses/mlops/evaluation/).

### `ml-feature-pipelines`

**Outcome:** Build a versioned, train/serve-consistent feature pipeline; test missing/category/schema drift; defend the contract and monitoring triggers. **Checkpoints:** 1. Separate fit/transform and show a leakage test. 2. Implement numerical/categorical/missing transforms in a pipeline. 3. Serialize/reload pipeline and equality-test offline/online features. 4. Add schema, range and freshness checks plus a drift response. **Units:** [scikit-learn compose](https://scikit-learn.org/stable/modules/compose.html); [scikit-learn common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html); [Made With ML data](https://madewithml.com/courses/mlops/data/).

### `ml-interpretability-fairness`

**Outcome:** Distinguish explanation from causation; implement slice/robustness/explanation checks; defend deployment limits and mitigation without overclaiming fairness. **Checkpoints:** 1. Define affected groups and error costs. 2. Report per-slice performance/calibration with sample-size caveats. 3. Run permutation/partial-dependence-style inspection and name its correlation limitation. 4. Test a plausible shift/counterfactual and propose mitigation/abstention. **Units:** [scikit-learn permutation importance](https://scikit-learn.org/stable/modules/permutation_importance.html); [D2L distribution shift](https://d2l.ai/chapter_linear-classification/environment-and-distribution-shift.html); [MLSys Book](https://mlsysbook.ai/) (responsible/deployment chapters; exact subsection route not audited).

### `ml-end-to-end-project`

**Outcome:** Deliver a clean-checkout classical-ML project with data contract, baseline, experiments, model card, inference path and monitoring/rollback plan; defend every material decision with artifacts. **Checkpoints:** 1. Reproduce baseline from one command. 2. Add tests for data/features/metrics. 3. Run ablation and error-analysis report. 4. Serve/batch-score with input validation. 5. Present a model card and “do not deploy” threshold. **Units:** [Made With ML project](https://madewithml.com/courses/mlops/projects/); [scikit-learn Pipeline](https://scikit-learn.org/stable/modules/compose.html); [D2L Kaggle workflow](https://d2l.ai/chapter_multilayer-perceptrons/kaggle-house-price.html).

## Core deep learning

### `dl-neural-networks`

**Outcome:** Implement an MLP and reverse-mode autodiff path, test gradients and activation shapes, and explain gradient flow/parameterization from a computation graph. **Checkpoints:** 1. Hand-compute forward/backward for a two-layer net. 2. Implement layers/loss/backprop without autograd. 3. Finite-difference-test every parameter group. 4. Explain a vanishing/exploding gradient trace. **Units:** [D2L MLPs](https://d2l.ai/chapter_multilayer-perceptrons/index.html); [D2L backprop](https://d2l.ai/chapter_multilayer-perceptrons/backprop.html); Deep-ML [index](https://www.deep-ml.com/problems).

### `dl-training-dynamics`

**Outcome:** Run a stable DL experiment, use logs to separate data/capacity/optimization/regularization causes, and defend changes with controlled ablations. **Checkpoints:** 1. Overfit one batch. 2. Compare initialization/normalization/optimizer. 3. Diagnose train/val curves. 4. Fix NaN/instability using anomaly detection, clipping or stable loss. **Units:** [D2L numerical stability](https://d2l.ai/chapter_multilayer-perceptrons/numerical-stability-and-init.html); [D2L normalization](https://d2l.ai/chapter_modern-convolutional-neural-networks/batch-norm.html); [D2L optimization](https://d2l.ai/chapter_optimization/index.html); Deep-ML [index](https://www.deep-ml.com/problems).

### `dl-cnns`

**Outcome:** Implement/train/debug a CNN and connect receptive field, equivariance and pooling to observed vision errors; defend architecture/augmentation decisions. **Checkpoints:** 1. Derive convolution output shapes/receptive fields. 2. Implement convolution/pooling test cases. 3. Train a CNN with augmentation and inspect class/slice errors. 4. Compare CNN to a baseline and explain invariance limits. **Units:** [D2L CNNs](https://d2l.ai/chapter_convolutional-neural-networks/index.html); [D2L ResNet](https://d2l.ai/chapter_modern-convolutional-neural-networks/resnet.html); [CS231n assignments](https://cs231n.stanford.edu/assignments.html); Jia-Bin Huang video: metadata-only, no required timestamp.

### `dl-sequence-models`

**Outcome:** Implement and debug an autoregressive RNN/GRU sequence model, explain BPTT and teacher-forcing mismatch, and defend decoding/error analysis. **Checkpoints:** 1. Write shifted-target likelihood. 2. Implement character RNN and BPTT. 3. Compare vanilla RNN/GRU gradients. 4. Demonstrate exposure failure under free running. **Units:** [D2L RNN](https://d2l.ai/chapter_recurrent-neural-networks/rnn.html); [D2L GRU](https://d2l.ai/chapter_modern-recurrent-neural-networks/gru.html); [D2L seq2seq](https://d2l.ai/chapter_modern-recurrent-neural-networks/seq2seq.html); Deep-ML [index](https://www.deep-ml.com/problems).

### `dl-attention-transformers`

**Outcome:** Implement a Transformer block with correct masks/shapes and cost accounting; debug attention/mask bugs; defend positional/norm/residual design. **Checkpoints:** 1. Compute scaled attention manually. 2. Implement masked multi-head attention tests. 3. Track parameter/FLOP/memory growth with sequence length. 4. Train a tiny model and diagnose causal-mask leakage. **Units:** [D2L attention](https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html); [D2L Transformer](https://d2l.ai/chapter_attention-mechanisms-and-transformers/transformer.html); [CS336 lectures](https://cs336.stanford.edu/lectures/); [Modern Notebook](https://walkinglabs.github.io/modern-llm-notebook/?lang=en).

### `dl-representation-learning`

**Outcome:** Choose/implement a transfer or contrastive strategy under data/compute constraints, diagnose negative transfer, and defend with linear-probe/fine-tune comparisons. **Checkpoints:** 1. Define representation/downstream objective. 2. Freeze then fine-tune a pretrained encoder. 3. Compare linear probe, partial, full fine-tune. 4. Analyze domain-shift failure. **Units:** [D2L fine-tuning](https://d2l.ai/chapter_computer-vision/fine-tuning.html); [D2L word2vec](https://d2l.ai/chapter_natural-language-processing-pretraining/word2vec.html); [CS231n](https://cs231n.stanford.edu/); Jia-Bin channel metadata-only.

### `dl-debugging`

**Outcome:** Use a documented debugging ladder—data, tiny-batch, forward, gradients, optimizer, system—to isolate faults and produce a minimal reproducible fix. **Checkpoints:** 1. Add deterministic seed/data/model checks. 2. Overfit tiny batch. 3. Inspect activation/gradient distributions. 4. Profile a bottleneck and fix one measured limit. 5. Write regression test/postmortem. **Units:** [PyTorch numerical accuracy](https://pytorch.org/docs/stable/notes/numerical_accuracy.html); [PyTorch profiler](https://pytorch.org/tutorials/recipes/recipes/profiler_recipe.html); [stas00 debugging book](https://github.com/stas00/the-art-of-debugging); [D2L GPUs](https://d2l.ai/chapter_preliminaries/use-gpu.html).

### `dl-project`

**Outcome:** Ship a reproducible DL artifact with baseline, controlled ablations, error slices, profiling and concise report; explain what did not work and why. **Checkpoints:** 1. Baseline + data contract. 2. Training/validation instrumentation. 3. One causal ablation. 4. Error taxonomy and next experiment. 5. Clean-run report. **Units:** [D2L CV](https://d2l.ai/chapter_computer-vision/index.html); [CS231n project](https://cs231n.stanford.edu/project.html); [Deep-ML projects/problems](https://www.deep-ml.com/problems).

## Core LLMs

### `llm-tokenization-data`

**Outcome:** Build/test a BPE-style tokenizer and data pipeline, measure vocabulary/sequence/data-quality trade-offs, and defend contamination/deduplication controls. **Checkpoints:** 1. Implement byte/word baseline tokenizer. 2. Train BPE and inspect merges/round-trip. 3. Compare vocab sizes in token count and embedding cost. 4. Implement duplicate/benchmark-overlap checks. **Units:** [CS336 Assignment 1](https://github.com/stanford-cs336/assignment1-basics/tree/main); [Modern Notebook](https://walkinglabs.github.io/modern-llm-notebook/?lang=en); [D2L text preprocessing](https://d2l.ai/chapter_recurrent-neural-networks/text-preprocessing.html).

### `llm-architecture`

**Outcome:** Implement/size a decoder-only Transformer with causal mask, RoPE/RMSNorm/SwiGLU and GQA awareness; debug cache/mask errors; defend parameter/KV-cache trade-offs. **Checkpoints:** 1. Implement decoder block. 2. Unit-test causal behavior. 3. Count parameters/FLOPs/KV bytes. 4. Swap MHA/GQA and report consequence. **Units:** [CS336 lectures](https://cs336.stanford.edu/lectures/); [Modern Notebook](https://walkinglabs.github.io/modern-llm-notebook/?lang=en); [D2L decoder](https://d2l.ai/chapter_attention-mechanisms-and-transformers/transformer.html); Deep-ML [index](https://www.deep-ml.com/problems).

### `llm-pretraining`

**Outcome:** Plan and run a small LM pretraining experiment with correct batching/mixed precision/checkpointing/logging; diagnose loss/scaling behavior and defend compute/data allocation. **Checkpoints:** 1. Establish tiny corpus/loss baseline. 2. Add checkpoint/resume and deterministic validation. 3. Profile sequence-length/batch bottleneck. 4. Compare model/data budget in a controlled grid. 5. State scaling limits honestly. **Units:** [CS336 Assignment 1](https://github.com/stanford-cs336/assignment1-basics/tree/main) and [Assignment 3](https://github.com/stanford-cs336/assignment3-scaling/tree/main); [Scaling Book training](https://jax-ml.github.io/scaling-book/training/); [D2L language models](https://d2l.ai/chapter_recurrent-neural-networks/language-models-and-dataset.html); AlgoMaster chapters metadata/tier unverified.

### `llm-decoding`

**Outcome:** Implement decoding plus KV cache, measure latency/memory/diversity, debug cache-position defects, and defend sampling policy for a stated product task. **Checkpoints:** 1. Implement greedy/temperature/top-k/top-p. 2. Compare outputs under fixed seeds. 3. Implement/cache incremental decode equality test. 4. Benchmark batch/sequence latency and explain limits. **Units:** [CS336 lectures](https://cs336.stanford.edu/lectures/); [Modern Notebook](https://walkinglabs.github.io/modern-llm-notebook/?lang=en); [D2L beam search](https://d2l.ai/chapter_modern-recurrent-neural-networks/beam-search.html); [Scaling Book inference](https://jax-ml.github.io/scaling-book/inference/).

### `llm-finetuning`

**Outcome:** Design/run an SFT or PEFT experiment with versioned instruction data and task eval; diagnose overfitting/forgetting; defend adapter/layer/rank choices. **Checkpoints:** 1. Define instruction schema and held-out task set. 2. Run full or adapter baseline. 3. Sweep rank/data mix with fixed evaluation. 4. Measure general/task regression and inspect failures. **Units:** [CS336 Assignment 5](https://github.com/stanford-cs336/assignment5-alignment/tree/main); [Modern Notebook](https://walkinglabs.github.io/modern-llm-notebook/?lang=en); [Hugging Face PEFT docs](https://huggingface.co/docs/peft/index); AlgoMaster metadata/tier unverified.

### `llm-posttraining`

**Outcome:** Explain and implement a small preference-learning/DPO loop, test reward/label pathologies, and defend why the objective cannot by itself prove alignment. **Checkpoints:** 1. Audit preference pair quality. 2. Derive DPO versus reward-model/RL pipeline. 3. Run a controlled preference update. 4. Detect reward hacking/held-out regression. 5. Present human-eval limitations. **Units:** [RLHF Book](https://rlhfbook.com/); [RLHF Book code](https://github.com/rlhfbook/rlhfbook); [CS336](https://cs336.stanford.edu/); Modern Notebook index.

### `llm-evaluation`

**Outcome:** Implement task, safety and human/LLM-judge evaluation with contamination controls; quantify judge agreement; defend failure handling and release gate. **Checkpoints:** 1. Write task/rubric/baseline. 2. Build deterministic fixtures. 3. Calibrate judge against human labels. 4. Add adversarial/slice tests. 5. Make release decision with known blind spots. **Units:** [CS336](https://cs336.stanford.edu/); [OpenAI Evals guide](https://platform.openai.com/docs/guides/evals) (vendor-specific); [RLHF Book evaluation](https://rlhfbook.com/); [HELM](https://crfm.stanford.edu/helm/latest/).

### `llm-from-scratch-build`

**Outcome:** Deliver an end-to-end small LM (tokenizer, model, training, generation, evaluation) with reproducible config/checkpoints and a candid scale/data/objective limitations report. **Checkpoints:** 1. Tokenizer round-trip + corpus manifest. 2. Model forward/causal tests. 3. Resume-able training/eval. 4. Decode/cache benchmark. 5. Clean checkout reproduces report. **Units:** [CS336 home](https://cs336.stanford.edu/), [Assignment 1](https://github.com/stanford-cs336/assignment1-basics/tree/main), [Modern Notebook](https://walkinglabs.github.io/modern-llm-notebook/?lang=en).

## Generative AI beyond LLMs

### `gen-latent-variable-models`

**Outcome:** Derive/implement a VAE with reparameterization, diagnose posterior collapse/reconstruction-quality tension, and defend ELBO terms and latent-space evidence. **Checkpoints:** 1. Derive ELBO. 2. Implement reparameterization/KL tests. 3. Train VAE and inspect reconstructions/samples. 4. Diagnose collapse with KL/reconstruction traces. **Units:** [D2L autoencoders](https://d2l.ai/chapter_autoencoders/index.html) (if unavailable in current D2L build, use [UDL book](https://udlbook.github.io/udlbook/)); [UDL](https://udlbook.github.io/udlbook/); Deep-ML [index](https://www.deep-ml.com/problems).

### `gen-gans`

**Outcome:** Implement a GAN with controlled discriminator/generator updates, diagnose collapse/instability with sample and coverage evidence, and defend metric limitations. **Checkpoints:** 1. Derive minimax/non-saturating losses. 2. Train toy GAN. 3. Identify collapse from distribution/nearest-neighbor evidence. 4. Stabilize one failure and report trade-off. **Units:** [D2L GAN](https://d2l.ai/chapter_generative-adversarial-networks/gan.html); [D2L DCGAN](https://d2l.ai/chapter_generative-adversarial-networks/dcgan.html); [UDL](https://udlbook.github.io/udlbook/); Deep-ML index.

### `gen-flows`

**Outcome:** Use change of variables to implement/test an invertible flow, track log-determinants, and defend likelihood/sampling/expressivity trade-offs. **Checkpoints:** 1. Derive transformed density. 2. Implement affine coupling/inverse test. 3. Verify log-det numerically. 4. Compare flow/VAE/GAN assumptions. **Units:** [UDL book](https://udlbook.github.io/udlbook/); [PyTorch distributions transforms](https://pytorch.org/docs/stable/distributions.html#torch.distributions.transforms.Transform). |

### `gen-diffusion`

**Outcome:** Implement a small DDPM-style pipeline, debug schedules/conditioning, measure sampling-quality versus cost, and defend guidance/latent-diffusion choices. **Checkpoints:** 1. Visualize forward noising. 2. Train noise predictor. 3. Compare sampler step counts. 4. Implement classifier-free guidance and identify diversity trade-off. 5. Document sample/memorization safety checks. **Units:** [Hugging Face Diffusion Course unit 1](https://huggingface.co/learn/diffusion-course/en/unit1/1); [unit 2](https://huggingface.co/learn/diffusion-course/en/unit2/1); [UDL](https://udlbook.github.io/udlbook/).

### `gen-multimodal`

**Outcome:** Prototype and evaluate an image-text alignment/generation path, inspect modality/preprocessing failures, and defend where contrastive alignment or cross-attention is appropriate. **Checkpoints:** 1. Create paired-data contract. 2. Implement contrastive embedding baseline. 3. Retrieve cross-modal examples and analyze failures. 4. Prototype cross-attention/fusion. 5. Report modality/safety bias. **Units:** [D2L vision transformers](https://d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer.html); [CS231n](https://cs231n.stanford.edu/); [Modern Notebook](https://walkinglabs.github.io/modern-llm-notebook/?lang=en); Jia-Bin channel metadata-only.

### `gen-evaluation-safety`

**Outcome:** Evaluate a generative model across fidelity, diversity, prompt/condition faithfulness, memorization and misuse; implement qualitative protocol plus quantitative checks; defend why no single score is a release criterion. **Checkpoints:** 1. Define quality/diversity/safety rubric. 2. Build blinded human/sample protocol. 3. Measure nearest-neighbor/memorization proxy. 4. Compare metric against human ranking. 5. Define blocked content/incident response. **Units:** [Hugging Face diffusion course](https://huggingface.co/learn/diffusion-course/en/unit0/1); [UDL](https://udlbook.github.io/udlbook/); [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework).

### `gen-project`

**Outcome:** Ship one reproducible non-text generative artifact with baseline, fixed seeds/config, qualitative grids, quantitative/safety evaluation and an honest failure report. **Checkpoints:** 1. Data/model card. 2. Baseline and training telemetry. 3. Controlled architectural/sampler ablation. 4. Quality/diversity/safety report. 5. Clean-run demo/report. **Units:** [HF Diffusion Course](https://huggingface.co/learn/diffusion-course/en/unit0/1); [D2L GAN](https://d2l.ai/chapter_generative-adversarial-networks/gan.html); [Deep-ML index](https://www.deep-ml.com/problems).

## Agentic AI

### `agent-loop`

**Outcome:** Implement a bounded observe-plan-act loop with explicit state, termination, retries and deterministic fallback; demonstrate with traces why an agent is preferable to a workflow. **Checkpoints:** 1. State task boundary/success/stop conditions. 2. Implement state machine with budget. 3. Simulate malformed/no-progress outputs. 4. Compare agent to deterministic workflow on a fixture suite. **Units:** [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/); [Hitchhiker preprint](https://arxiv.org/pdf/2606.24937); AlgoMaster catalog metadata/tier unverified.

### `agent-tools`

**Outcome:** Expose tools with schemas, authorization, validation, idempotency and traceable effects; debug malformed/tool-injected calls; defend the least-privilege contract. **Checkpoints:** 1. Define typed schema. 2. Validate independent of model. 3. Add idempotency/dry-run/confirmation. 4. Test prompt-injection and malformed calls. 5. Audit each side effect. **Units:** [MCP lesson](https://aiengineeringfromscratch.com/lesson.html?path=phases/11-llm-engineering/14-model-context-protocol); [MCP specification](https://modelcontextprotocol.io/specification/2025-06-18); [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/).

### `agent-memory-state`

**Outcome:** Implement a layered state design that distinguishes authoritative records, derived retrieval and conversational context; test provenance/expiry/deletion; defend privacy and truth boundaries. **Checkpoints:** 1. Classify state. 2. Attach provenance/TTL. 3. Implement retrieve/summarize with citations. 4. Test stale/conflicting memory. 5. Implement inspect/correct/delete flow. **Units:** [Hitchhiker preprint](https://arxiv.org/pdf/2606.24937); [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/); [MCP security considerations](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices).

### `agent-orchestration`

**Outcome:** Design a workflow/multi-agent topology with explicit ownership, isolation, joins, budgets and failure propagation; implement deterministic replay; defend why coordination improves the task. **Checkpoints:** 1. Draw dependency/ownership graph. 2. Run serial baseline. 3. Parallelize only independent work. 4. Implement timeout/partial-result policy. 5. Reconcile disagreement with evidence. **Units:** [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/); [Hitchhiker preprint](https://arxiv.org/pdf/2606.24937); CMU LLM Apps [schedule](https://cmu-llms.org/schedule/) (multi-agent material; assignment access unverified).

### `agent-evaluation`

**Outcome:** Build a replayable agent task suite that scores final state, tool safety, trajectory efficiency and regressions; calibrate any judge; defend a release gate against “plausible but wrong” traces. **Checkpoints:** 1. Create fixtures/gold world state. 2. Assert tool side effects. 3. Capture/replay trace. 4. Compare outcome/trajectory metrics. 5. Add regression after failure. **Units:** [OpenAI Evals guide](https://platform.openai.com/docs/guides/evals) (vendor-specific); [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/); [Hitchhiker preprint](https://arxiv.org/pdf/2606.24937).

### `agent-safety-control`

**Outcome:** Enforce least privilege, sandboxing, approvals, policy-aware tool gates, audit logs and reversible actions; red-team prompt injection/exfiltration; defend maximum blast radius. **Checkpoints:** 1. Threat model assets/actors/paths. 2. Implement capability allowlist. 3. Require approval for irreversible action. 4. Run injection/exfiltration tests. 5. Demonstrate audit/rollback. **Units:** [MCP security practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices); [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/); [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/).

### `agent-reliability`

**Outcome:** Build a resumable harness with repository instructions, checkpoints, verification, bounded retries/observability and externally checkable completion; debug crash/context-reset/retry failures. **Checkpoints:** 1. Persist state/checkpoint. 2. Resume after injected crash. 3. Add retries with classification/backoff/budget. 4. Verify against external artifact. 5. Write incident/postmortem test. **Units:** [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/); [MCP spec](https://modelcontextprotocol.io/specification/2025-06-18); [OpenTelemetry docs](https://opentelemetry.io/docs/).

### `agent-project`

**Outcome:** Deliver a bounded, tool-using agent with real permissions/state/evals/traces and documented costs/failure modes; a reviewer can replay failures and see the responsible boundary. **Checkpoints:** 1. Define task/economic baseline. 2. Build tool contract/state. 3. Add safety gates. 4. Build task/trajectory evaluation. 5. Run regression/red-team suite and defend adoption. **Units:** [MCP lesson](https://aiengineeringfromscratch.com/lesson.html?path=phases/11-llm-engineering/14-model-context-protocol); [Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/); [OpenAI Evals guide](https://platform.openai.com/docs/guides/evals) (optional vendor-specific evaluator).
