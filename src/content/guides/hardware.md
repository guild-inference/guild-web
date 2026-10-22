# Hardware and memory

Guild targets asymmetric systems: substantial system memory, useful CPU compute, and a GPU whose VRAM may not hold all model weights.

## Supported build paths

| Path            | Scope                                                                                |
| --------------- | ------------------------------------------------------------------------------------ |
| CUDA            | NVIDIA backend; Linux Xeon / GTX 1070 measurements are available                     |
| HIP             | AMD build path; verify the GPU architecture and ROCm setup                           |
| CPU-only        | Build and policy/test configuration; model execution depends on available operations |
| Windows / Linux | Setup paths exist for both; reported server results are Linux results                |
| SYCL            | Experimental backend described in the architecture documents                         |

## Memory tiers

- **Device VRAM:** dense weights, attention/KV state, expert cache slots, and scratch space.
- **Host RAM:** the RAM-resident expert complement and host KV tier.
- **Mapped file:** experts not placed in higher tiers, with the OS page cache involved.
- **Peer GPU:** an optional second expert tier.

The planner finalizes placement against live free memory. Context length, KV format, draft windows, batching, and other processes change the result. A model file size, parameter count, or dense-weight size alone cannot determine whether a run fits.

## Measured example, not a minimum requirement

The Phase 6 report records Ornith Q4_K_M at 4,096 populated prompt tokens and 32,768 capacity, using host-only FP16 KV, with **2,662 MiB sampled VRAM**. Its Qwen UD-IQ4_XS configuration records **7,310 MiB sampled VRAM**. These are distinct configurations on a **2× Xeon Gold 6130 / 376 GiB RAM / GTX 1070 8 GiB** Linux host, not universal minimums.

The Ryzen 5 5600X / 32 GiB / RTX 5070 desktop remains unmeasured in this website's evidence set.

Read the [memory hierarchy](architecture/), [Phase 6 context report](phase6/), and [GEXEC identity rules](gexec/) before planning a deployment.
