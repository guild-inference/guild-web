# Serve a model locally

Guild has two servers. `guild serve` is the native C++ server. The Python layer in `serve/` is a separate server with a web app. They answer different routes.

## Native server: `guild serve`

```bash
guild serve qwen3.8-flash-next
guild serve qwen3.8-flash-next --port 8080
```

At v0.2.0-preview.3 it listens on `127.0.0.1:11434` by default. `--port` picks another port; `guild serve --help` lists the rest of its options.

What it serves at v0.2.0-preview.3:

| Route                                        | What it is                                           |
| -------------------------------------------- | ---------------------------------------------------- |
| `POST /v1/chat/completions`                  | OpenAI Chat Completions, a compatibility layer       |
| `POST /v1/completions`, `POST /v1/responses` | OpenAI Completions and Responses, also compatibility |
| `GET /v1/models`, `GET /v1/models/{id}`      | The loaded model                                     |
| `GET /health`, `GET /api/health`             | Health check                                         |

It does not serve Ollama's `/api` routes (only `/api/health`), and there is no native `/v0` API yet; a native API is planned. TODO: confirm the plans for `/api` and `/v0`.

The `model` field of a request is echoed back rather than checked. Use the model id, for example `qwen3.8-flash-next`:

```bash
curl http://127.0.0.1:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen3.8-flash-next", "messages": [{"role": "user", "content": "Hello"}]}'
```

If the port is taken, `guild serve` exits with "failed to start server on http://127.0.0.1:11434 (port may be in use or permission denied)". Pass `--port` with a free port.

## The port: 48453

TODO: the next release moves the default port to 48453. This section describes it before that release exists; until then the default is 11434 as above.

- **Why 48453?** It spells GUILD on a phone keypad.
- **Reserved on Linux.** The Linux installer adds 48453 to `net.ipv4.ip_local_reserved_ports`, keeping the existing entries, so outgoing connections never take it as an ephemeral port. It does this only when run as root; otherwise it prints the `sysctl` command to run yourself.

## Python server and web app

The one-click setup (`START-HERE.bat`, `setup.sh`, `setup.py`) writes a run configuration used by `serve/server.py` and installs its Python packages into the checkout's `.venv` (they are pinned in `requirements.txt`). The server listens on port 8095 by default and serves a web app, OpenAI Chat Completions and Responses, and Anthropic Messages at `/v1/messages`. It integrates MCP tools through `serve/mcp.py` and supports an `--api-key` option.

From the root of a checkout that setup has prepared:

```bash
.venv/bin/python -m serve.server --help
```

Keep the service bound to `127.0.0.1` during local use. Do not expose it beyond localhost without the Python server's `--api-key`.

## Hosted version

Illatio, a hosted version of Guild, is parked while we focus on the engine and research. The local server does not create an account or provision a hosted endpoint.

Sources: [repository README](repository-readme/), [architecture](architecture/), and [correctness recovery](troubleshooting/).
