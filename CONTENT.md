# Content and evidence policy

## Snapshot

- Core source: `guild-inference/Guild@140f6f765ffc77d2b7b9aebdc6e41a4e3e9bc3f6`.
- `npm run sync-docs` reads the pinned commit, either over HTTPS or with `git show`. It never silently substitutes a working-tree file or falls back to a different revision.
- SHA-256 hashes cover complete source text. No 18,000-character truncation, current-main links, or fabricated generation timestamps.
- Relative Markdown links resolve to published documents where available, otherwise the pinned GitHub source. A render-only anchor alias repairs an existing unnumbered fragment in CODE_STYLE without modifying its source snapshot.
- The archived reports contain historical validation claims. A notice explains that the website evidence does not independently establish all Phase 6.6.1 sanitizer/full-CUDA/sampling/concurrency gates.

## Models

`registry.cpp` provides literal geometry, quantization, and file sizes. The parser fails if the two audited-entry structure changes. README defines execution support: Qwen primary; Ornith experimental; GLM, DeepSeek, Mixtral planned. Archetype metadata alone does not imply an inference runner.

Hub metadata was checked using `hf models info` on 2026-10-22. The Qwen record is revision-pinned. Ornith returned “Model not found” and has no asserted working public download. The nominal 35B name is labeled accordingly; unverified active parameter counts stay unknown. A Hub multimodal tag does not establish Guild vision support.

File sizes are disk requirements. Sampled VRAM is a measured configuration, not a minimum, full working set, or proof that a system fits. The site links to the source planner rather than offering an invented fit calculator.

Eon has no invented geometry, parameter count, quantization, release date, or downloadable weights. The proposal and pending grant are user-provided project status.

## Benchmarks

Public selections use §8.3 of the Phase 6.6.1 report and show both gains and losses. Qwen quantization is UD-IQ4_XS, not a conflation with Q2_K_XL. Long-context Phase 6.6 rows are not relabeled as Phase 6.6.1 reruns. Ranges are reported development observations, not paired confidence intervals.

No sanitizer, sampling, concurrency, Windows, or RTX 5070 performance result was generated during website development. No universal speed, distributional-parity, or zero-leakage claim is made.

When updating evidence, retain the exact model/artifact, commit, quantization, CPU/GPU/RAM, populated context, generation count, concurrency, strategy, calibration identity, and comparison setup. Do not fill missing provenance with assumptions.
