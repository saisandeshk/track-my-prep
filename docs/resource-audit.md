# Resource selection and audit summary

Audit date: 26 July 2026.

The research began with broad resources in `Overall-Prep`, then checked specialist groups. Existing annotations were treated as leads, not proof. Public course pages, syllabi, repositories, chapter indexes, and official documentation were inspected where reachable.

## Selection decisions

- **DSA:** AlgoMaster 150 is the single practice spine because Sai has access and prefers its explanations. Private/premium problem contents are not represented as independently verified. The now-verifiable DSA Handbook supplies exact just-in-time explanation modules, not a second problem quota.
- **Python:** AlgoMaster Python for AI is the preferred six-module route: essentials; functions/decorators/generators; OOP/dataclasses; typing/Pydantic; files/data; and async Python. Each public chapter URL is mapped separately, with premium boundaries retained.
- **Engineering and general design:** The HLD Handbook is the open HLD spine. Selected Berkeley CS 162 and CMU 15-445 material provides systems depth. AlgoMaster remains useful for interview framing and LLD, with its tier boundary visible.
- **Core ML and data science:** D2L, scikit-learn’s official guide, and Made With ML cover model foundations, implementation, evaluation, and the production lifecycle. Deep-ML supplies direct implementation problems.
- **Deep learning:** D2L is the implementation-led foundation and Understanding Deep Learning is the theory companion. CMU material is optional rigor, not a parallel mandatory syllabus.
- **LLMs:** Stanford CS336 is the from-scratch spine. Modern LLM Notebook is an implementation supplement where accessible. Hands-On Modern RL covers the optional post-training specialization.
- **Generative AI beyond LLMs:** Understanding Deep Learning unifies model families; the Hugging Face Diffusion Course was added to close the verified implementation gap.
- **ML systems:** MLSysBook is the principles-first reference, CMU Deep Learning Systems is the framework bridge, and the AI-infrastructure curriculum supplies project/platform practice. Advanced GPU and scaling courses are optional branches.
- **Agentic AI:** The Hitchhiker’s Guide provides a broad map, Learn Harness Engineering covers operational reliability, and the MCP lesson is a targeted protocol lab whose JavaScript-rendered content remains caveated.
- **Videos:** Selected CS336, Jia-Bin Huang and EleutherAI material is mapped as a supplement. The long FlashAttention/Triton video is split into verified chapter ranges. Channel-wide GPU MODE mapping is intentionally deferred because reliable full-archive enumeration would add disproportionate complexity.

## Exact mapping layer

The application now carries 89 implementation-facing resource units across all 111 concepts. A unit records the source, exact URL, kind, role, mapped concepts, topics, intended outcome, prerequisites, effort, ordering, audit confidence and audit date. Timestamp ranges are stored only when public chapters support them.

Every concept also has four distinct mastery gates:

1. understand the mechanism and assumptions;
2. apply or implement it;
3. diagnose a realistic failure;
4. defend the result and trade-offs in an interview.

Opening or finishing a mapped unit never changes mastery automatically.

## Access limitations

The audit explicitly records:

- account or subscription gates;
- JavaScript-only pages that did not expose lesson content to the audit browser;
- course catalogs where lesson-level depth or free/premium boundaries could not be verified;
- YouTube/channel pages where a structured syllabus was not visible;
- private workspace URLs;
- active/evolving repositories whose completeness is not guaranteed.

These resources may still be useful, but the curriculum does not fabricate chapter coverage, duration, access, or exercise quality.

## Catalog entries intentionally not mapped

- The saved **opencode workspace** is a private, account-gated tool workspace rather than a learning resource. Its workspace-specific URL is deliberately not repeated in public audit output.
- [ChatGPT](https://chatgpt.com/) and [Microsoft 365 Study and Learn](https://m365.cloud.microsoft/agents/educationlearnagent?fromcode=cmmyr718qsb) are general-purpose study tools, not sources with a stable curriculum to map. They are excluded rather than presented as evidence of mastery.
- The saved [MIT 6.824 introductory lecture](https://www.youtube.com/watch?v=cQP8WApzIQQ) is represented by the complete official 6.824 course archive in the systems audit; the single video is delivery material, not a second resource.
- The saved [RLHF Book PDF](https://rlhfbook.com/book.pdf) is represented by the maintained RLHF Book site in the AI audit; both point to the same work.

## Added recommendations

Only four resources were added outside the saved library:

1. **scikit-learn User Guide** — official classical-ML implementation and evaluation reference.
2. **PyTorch Tutorials** — official framework implementation and profiling reference.
3. **Made With ML** — coherent classical-ML lifecycle, reproducibility, testing, serving, and monitoring.
4. **Hugging Face Diffusion Course** — dedicated implementation path for non-LLM generative modeling.

Each is labeled `added_recommendation` in the application with the gap it fills.

## Placement reality check

Placement data was used only as an aggregate signal. The systems audit found visible demand for Python, ML/AI terminology, and production/systems communication. That supports keeping engineering foundations prominent; it does not determine the domain taxonomy or create job-title-specific curricula.

## Detailed ledgers

- [Overall preparation and DSA](research/overall-dsa-audit.md)
- [Systems and ML systems](research/systems-mlsys-audit.md)
- [AI domains](research/ai-domains-audit.md)
- [Detailed DSA and engineering mappings](research/detailed-dsa-engineering-map.md)
- [Detailed systems mappings](research/detailed-systems-map.md)
- [Detailed AI mappings](research/detailed-ai-map.md)

The detailed documents preserve overlap analysis, prerequisites, effort caveats, direct links, and resources intentionally not selected for the main path.
