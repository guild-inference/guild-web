# Build for your hardware

## Install the pinned release

Guild v0.2.0-preview.3 ships prebuilt Linux and Windows binaries with a one-command installer. It is a development preview. The installer detects your CPU and NVIDIA GPU, picks a build, and checks the archive's SHA-256 against the release before installing into your user account.

```bash
curl -fsSL https://raw.githubusercontent.com/guild-inference/Guild/v0.2.0-preview.3/install.sh | GUILD_VERSION=v0.2.0-preview.3 bash
```

Or download the installer, check it, read it, then run it:

```bash
curl -fsSLO https://raw.githubusercontent.com/guild-inference/Guild/v0.2.0-preview.3/install.sh
echo "1c596ad770713eed7c2e3a5df72f9cde30880371eb3b357263a7f2a1d7527095  install.sh" | sha256sum -c
less install.sh
GUILD_VERSION=v0.2.0-preview.3 bash install.sh
```

On Windows PowerShell, the same steps with `install.ps1`, whose SHA-256 at this release is `17e0735a50966525e4681e2d833e6b0bb138a6637385f91634450aa8af3e80aa`:

```powershell
Invoke-WebRequest https://raw.githubusercontent.com/guild-inference/Guild/v0.2.0-preview.3/install.ps1 -OutFile install.ps1
(Get-FileHash install.ps1 -Algorithm SHA256).Hash
$env:GUILD_VERSION = "v0.2.0-preview.3"; .\install.ps1
```

`GUILD_VERSION` pins the binary to this release; without it the installer fetches the latest preview.

## Build from source

You need Git, CMake, a C++ toolchain, and the toolkit for the GPU backend you select. Backend packages are pinned by Guild's build configuration; use the source instructions for the revision you build.

## NVIDIA / CUDA

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DGUILD_ENABLE_CUDA=ON
cmake --build build -j
```

Choose a CUDA toolkit that supports your GPU. Published GTX 1070 results are from Linux; they do not establish RTX 5070 or Windows performance.

## AMD / HIP

```bash
cmake -S . -B build-hip -DCMAKE_BUILD_TYPE=Release -DGUILD_ENABLE_CUDA=OFF -DGUILD_ENABLE_HIP=ON
cmake --build build-hip -j
```

Check `cmake/hip_backend.cmake` in the source tree for the targeted architectures and local ROCm requirements. An available backend does not establish parity or performance on every AMD device.

## CPU-only development

```bash
cmake -S . -B build-cpu -DCMAKE_BUILD_TYPE=Release -DGUILD_ENABLE_CUDA=OFF -DGUILD_BUILD_TESTS=ON
cmake --build build-cpu -j
ctest --test-dir build-cpu --output-on-failure
```

CPU-only is a supported build configuration used by policy CI. Check the runner and operation requirements before assuming a particular model can execute fully on CPU.

## Windows setup

The Guild repository includes `START-HERE.bat` and `setup.py`. Run the launcher from a local checkout and follow the hardware and model choices. Linux has `setup.sh`. The installer and native source-build paths are evolving; inspect the pinned repository rather than relying on commands for another revision.

## Verify your build

```bash
./build/guild --help
ctest --test-dir build --output-on-failure
```

Some tests require external models or fixtures. A skipped test is not a successful validation run. See the complete [build and contribution guide](contributing/) and [external backend boundaries](external-backends/).
