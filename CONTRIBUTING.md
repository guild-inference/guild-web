# Contributing

Use Node 22.12 or newer. Run lint, format check, typecheck, build, unit/build checks, and Playwright before opening a pull request. CI repeats these and retains browser screenshots/traces for 14 days.

`src/layouts/Stage.astro`, `src/styles/base.css`, `src/components/Ecosystem.astro`, `src/scripts/engine.ts` and `src/vendor/scrollcraft/` are shared with `guild-inference/illatio-web` and kept identical in both repositories; coordinate changes to them. Guild's own identity is `src/styles/guild.css` (every page) and `src/styles/surface.css` (the engine page), on `src/layouts/Site.astro` for docs, models and performance. The vendored engine is a byte-identical copy: theme it with `--sc-*` tokens and keep page behaviour in the page. `src/lib/links.ts` is intentionally app-specific. This small explicit shared surface avoids a private package or runtime dependency between independently deployable sites.

Use semantic HTML, visible keyboard focus, readable contrast, and reduced-motion behavior. Keep content visible before scripts execute. Do not convert proposals into product claims. Benchmarks need model, quantization, hardware, context, decoding configuration, and provenance.

Do not edit the old `/home/ubuntu/illatio-web` checkout or Guild Core to change these websites. The website repositories are independent projects.
