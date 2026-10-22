# Build for your hardware

Guild currently builds from source. You need Git, CMake, a C++ toolchain, and the toolkit for the GPU backend you select. Backend packages are pinned by Guild's build configuration; use the source instructions for the revision you build.

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
