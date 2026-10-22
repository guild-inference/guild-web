# The Guild command line

Run `guild --help` from your built binary for its authoritative command surface. These commands are listed in the pinned README:

| Command               | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `guild pull <model>`  | Download a registry model                 |
| `guild import <path>` | Import an existing local model            |
| `guild list`          | List installed models                     |
| `guild show <model>`  | Inspect a model in the store              |
| `guild run <model>`   | Run interactively                         |
| `guild serve <model>` | Start the native OpenAI-compatible server |
| `guild bench <model>` | Benchmark a model                         |
| `guild ps`            | Show running model processes              |

## Containers and optimization

The [GEXEC contract](gexec/) describes the machine-specific optimizer:

```bash
guild optimize model.gpack --mode auto -o model.gexec
guild inspect model.gexec --plan
guild run model.gpack --gexec model.gexec
```

`model.gpack` is your actual local portable model container. GEXEC is an execution cache, not a replacement for its source weights. Missing or incompatible GEXEC data falls back to portable execution with a logged reason.

## Decode strategies

```bash
guild run <model> --decode-strategy adaptive --spec-max-draft 4
```

The scheduler can choose `normal`, `mtp`, `lookup`, and `retrieval` when eligible. MTP requires the appropriate draft weights. Lookup proposes continuations from token history; retrieval uses a bounded session-local store. Every proposal is verified by the target model.

Legacy `--spec` and strategy-specific options are documented in the pinned [adaptive decoding report](phase66/). Sampling parity across Qwen verification-window sizes in that report uses `GUILD_IQ_MT_MIN=1` to align CPU reduction behavior.
