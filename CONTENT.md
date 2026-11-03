# Content and evidence policy

## Snapshot

- Core source: the release tag `v0.2.0-preview.3`, commit `guild-inference/Guild@97a1bafb1b66f30d45c75b4138664aa1cf8e8e87` (re-pinned from `140f6f7` on 2026-11-03; between the two only the README changed among the imported documents, and `registry.cpp` is unchanged).
- `npm run sync-docs` reads the pinned commit, either over HTTPS or with `git show`. It never silently substitutes a working-tree file or falls back to a different revision.
- SHA-256 hashes cover complete source text. No 18,000-character truncation, current-main links, or fabricated generation timestamps.
- Relative Markdown links resolve to published documents where available, otherwise the pinned GitHub source. A render-only anchor alias repairs an existing unnumbered fragment in CODE_STYLE without modifying its source snapshot.
- The archived reports contain historical validation claims. A notice explains that the website evidence does not independently establish all Phase 6.6.1 sanitizer/full-CUDA/sampling/concurrency gates.

## Models

`registry.cpp` provides literal geometry, quantization, and file sizes. The parser fails if the two audited-entry structure changes. README defines execution support: Qwen primary; Ornith experimental; GLM, DeepSeek, Mixtral planned. Archetype metadata alone does not imply an inference runner.

Hub metadata was checked using `hf models info` on 2026-10-22 and again on 2026-11-03 (unchanged: same Qwen revision and totals; Ornith still not found). The Qwen record is revision-pinned. Ornith returned “Model not found” and has no asserted working public download. The nominal 35B name is labeled accordingly; unverified active parameter counts stay unknown. A Hub multimodal tag does not establish Guild vision support.

File sizes are disk requirements. Sampled VRAM is a measured configuration, not a minimum, full working set, or proof that a system fits. The site links to the source planner rather than offering an invented fit calculator.

Apprentice, Journeyman and Magistrate are Guild Labs research entries with no invented geometry, parameter count, quantization, release date or downloadable weights. Their plans and statuses are user-provided; every status is a TODO until the owner supplies it.

Each catalog entry carries a display name, a model id (the registry name that `guild` commands and API requests use; matching is case-insensitive) and an architecture tag, shown separately and labeled, plus a type (text or speech). Only text models are registered at the pinned release.

## Benchmarks

Public selections use §8.3 of the Phase 6.6.1 report and show both gains and losses. Qwen quantization is UD-IQ4_XS, not a conflation with Q2_K_XL. Long-context Phase 6.6 rows are not relabeled as Phase 6.6.1 reruns. Ranges are reported development observations, not paired confidence intervals.

No sanitizer, sampling, concurrency, Windows, or RTX 5070 performance result was generated during website development. No universal speed, distributional-parity, or zero-leakage claim is made.

When updating evidence, retain the exact model/artifact, commit, quantization, CPU/GPU/RAM, populated context, generation count, concurrency, strategy, calibration identity, and comparison setup. Do not fill missing provenance with assumptions.
