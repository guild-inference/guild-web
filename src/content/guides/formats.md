# Models and execution artifacts

## GGUF — import and direct loading

Guild can load GGUF files and shards. A recognized architecture tag is not sufficient for execution: the required runner and operations must also be available.

## GPACK — portable model container

A `.gpack` contains portable weights, metadata, tokenizer assets, and optional auxiliary model or expert data. Memory-mapped sections can expose weights as views rather than additional copies.

This does not mean all weights occupy VRAM, or that no host or device allocations occur. Placement and workspaces are separate runtime concerns.

## GEXEC — machine-specific execution cache

A `.gexec` records kernel selections, expert layouts, placement decisions, workspace recipes, and calibration data for a model on a particular environment. It is tied to model, package, ABI, hardware, and execution-plan identity.

An incompatible cache is ignored with a reason. The portable GPACK or GGUF remains the source for model execution.

## Packages and modules

`.gkernel` and `.gkmodule` packages provide external operations and architecture runners through Guild's C ABI. They are not model checkpoints.

Core and the formats are under active development. Consult the versioned contracts:

- [GPACK format](gpack/)
- [GEXEC contract](gexec/)
- [Kernel packages](gkernel/)
- [Runtime modules](gkmodule/)
- [Kernel ABI](kernel-abi/)
