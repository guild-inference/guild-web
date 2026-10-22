# Guild web

| Property      | Production domain          | Preview path |
| ------------- | -------------------------- | ------------ |
| Engine        | `guild.illatio.dev`        | `/`          |
| Documentation | `docs.guild.illatio.dev`   | `/docs/`     |
| Models        | `models.guild.illatio.dev` | `/models/`   |

Persistent preview: **https://guild-inference.github.io/guild-web/**

## Develop and verify

Node 22.12+ and npm. No GPU or model download is needed.

```bash
npm ci
npm run dev                  # http://127.0.0.1:4174
npm run lint
npm run typecheck
npm run build
npm test                     # source hashes, registry extraction, links/anchors/assets
npx playwright install chromium
npm run test:e2e             # Chromium at 1440/390/320px, axe, interaction tests
npm run preview
```

Formatting: `npm run format` / `npm run format:check`.

## Architecture

Astro pre-renders complete HTML. Lightweight scripts power full-text documentation search, model filters, clipboard feedback, and a conceptual expert-routing illustration. Each model and document has a durable URL, canonical metadata, and real links. Documentation includes GFM tables, highlighted code, rendered equations, heading navigation, and previous/next chapters. Fonts are self-hosted. Reading and core navigation work without JavaScript.

Six web guides accompany **19 complete repository documents**. There are two actual registry models plus three planned architecture families and the Eon research proposal. Planned/research entries have no fabricated specs, download buttons, or fit estimates.

## Version-aware documentation

`source-lock.json` pins a full Guild commit and explicit source paths. `src/data/generated/sources.json` is a deterministic, complete snapshot with per-file SHA-256. No file is truncated. Each imported page links to that exact commit. Builds work offline from the checked-in snapshot; CI verifies it against upstream.

```bash
npm run sync-docs             # fetch the immutable GitHub source
npm run check:sources         # fail if snapshot differs
# Alternatively, use a local checkout; git show reads the pinned commit, not dirty files:
GUILD_REPO_PATH=/path/to/Guild npm run sync-docs
```

To update, change the full commit in `source-lock.json`, sync, review changed content/statuses and evidence, then run all checks. Edits to imported docs belong in Guild Core, followed by a deliberate snapshot update. Web guides live in `src/content/guides/` and identify their sources.

Catalog geometry and byte sizes are parsed from the pinned `registry.cpp`; upstream verification evidence is in `src/data/hub-evidence.json`. The public Qwen Hub metadata reports ~176.94B stored parameters. Ornith's registry source could not be found on 22 October 2026, so availability is marked unverified. Active parameter counts are not invented.

## Performance evidence

`/performance/` separates selected Phase 6.6.1 observations from broad performance claims, includes negative results, and documents missing validation evidence. Imported source reports retain their historical claims behind a visible evidence note. Server numbers are not advertised as desktop results. Source update procedure: [CONTENT.md](CONTENT.md).

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md). Production packages preserve `docs.guild.illatio.dev` and `models.guild.illatio.dev`. CI verifies PRs and deploys successful `main` builds to GitHub Pages. No production DNS is changed.

`PUBLIC_DEPLOYMENT=production` enables canonical-domain navigation. `BASE_PATH` supports Pages project URLs. `PUBLIC_ILLATIO_URL` configures the sibling preview origin; default local links use port 4173.
