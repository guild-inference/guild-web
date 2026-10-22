# Your first Guild session

Guild is a native C++ inference engine focused on Mixture-of-Experts models. It combines GPU VRAM, system RAM, CPU compute, and mapped-file expert tiers. Core is v0.x and under active development.

## 1. Build the engine

For a Linux machine with a compatible NVIDIA GPU and CUDA toolkit:

```bash
git clone https://github.com/guild-inference/Guild.git
cd Guild
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DGUILD_ENABLE_CUDA=ON
cmake --build build -j
./build/guild --help
```

See [installation](installation/) for CPU-only, AMD, and Windows paths.

## 2. Choose a model

Check the [model catalog](https://models.guild.illatio.dev/) before downloading. The registry contains `qwen3.8-flash-next` and `ornith:35b`. Registry membership is not a promise that upstream weights remain available or that a model fits your machine.

```bash
./build/guild pull qwen3.8-flash-next
./build/guild list
./build/guild show qwen3.8-flash-next
```

This Qwen registry download is about 87.25 GiB. Storage size is not a RAM or VRAM requirement. Allow extra space for conversion and inspect the model's memory plan.

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
