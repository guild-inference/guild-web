# Your first Guild session

Guild is a native C++ inference engine focused on Mixture-of-Experts models. It combines GPU VRAM, system RAM, CPU compute, and mapped-file expert tiers. Core is v0.x and under active development.

## 1. Install or build the engine

The pinned release, v0.2.0-preview.3, has a one-command installer with prebuilt binaries. See [installation](installation/) for the command, its SHA-256 and the download, inspect, then run variant.

To build from source instead, on a Linux machine with a compatible NVIDIA GPU and CUDA toolkit:

```bash
git clone https://github.com/guild-inference/Guild.git
cd Guild
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DGUILD_ENABLE_CUDA=ON
cmake --build build -j
./build/guild --help
```

See [installation](installation/) for CPU-only, AMD, and Windows paths.

## 2. Choose a model

Check the [model catalog](https://models.guild.illatio.dev/) before downloading. The registry contains `qwen3.8-flash-next` and `ornith:35b`. These are the model ids to use in commands and API requests; they match case-insensitively, and each model also has aliases. The display names are Qwen3.8-Flash-Next and Ornith 1.5 35B; the architecture tags are `qwen4exp` and `qwen35moe`. Registry membership is not a promise that upstream weights remain available or that a model fits your machine.

```bash
./build/guild pull qwen3.8-flash-next
./build/guild list
./build/guild show qwen3.8-flash-next
```

This Qwen registry download is 87.25 GiB. Storage size is not a RAM or VRAM requirement. Allow extra space for conversion and inspect the model's memory plan.

Guild does not refuse a model because it is larger than system RAM. The memory planner treats host RAM overcommit as a warning: the experts are file-backed, so the operating system pages them from disk. It refuses only when graphics memory cannot hold what must live there. How fast a paging run is on a desktop has not been measured.

## 3. Run locally

```bash
./build/guild run qwen3.8-flash-next
```

Use `guild run --help` in your build for current options. After the ordinary run works, you can try the adaptive strategy:

```bash
./build/guild run qwen3.8-flash-next --decode-strategy adaptive --spec-max-draft 4
```

Adaptive decoding chooses among eligible strategies using estimated cost and session observations. The best choice varies by model and workload.

## Next steps

- [Hardware and memory](hardware/): understand what the planner places.
- [Model formats](formats/): distinguish GGUF, GPACK, and GEXEC.
- [Local serving](serving/): connect an API client.
- [Troubleshooting](troubleshooting/): read Guild's source recovery guide.

This web guide is derived from the pinned [repository README](repository-readme/), [contribution guide](contributing/), and [adaptive decoding report](phase66/).
