# Serve a model locally

Guild includes a native OpenAI-compatible HTTP server. The Python layer in `serve/` provides a web app and an Anthropic-shaped API in front of the engine. These are related but distinct entry points.

## Native server

```bash
./build/guild serve <model>
```

The typical local API base is:

```text
http://127.0.0.1:11434/v1
```

Use your binary's `guild serve --help` for current bind, model, and request options. Compatibility is evolving; check the exact endpoint and streaming behavior required by your client.

## Python server and web app

The one-click installer writes a run configuration used by `serve/server.py`. The Python layer also integrates MCP tools through `serve/mcp.py` and supports an `--api-key` option.

```bash
python serve/server.py --help
```

Keep the service bound to `127.0.0.1` during local use. Do not expose it beyond localhost without the Python server's `--api-key`. Follow the repository's deployment instructions for the version you use.

## Cloud status

Illatio Cloud is a separate, planned hosted product. The local server command does not create a Cloud account or provision a hosted endpoint.

Sources: [repository README](repository-readme/), [architecture](architecture/), and [correctness recovery](troubleshooting/).
