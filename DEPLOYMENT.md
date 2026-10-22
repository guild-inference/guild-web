# Deployment & Nested Subdomain TLS Architecture

## 1. Domain Hierarchy

`guild-web` serves the Guild inference engine and its nested documentation and model catalog subdomains:

| Property            | Canonical Domain                   | Preview Path | Package Target                   |
| ------------------- | ---------------------------------- | ------------ | -------------------------------- |
| Guild Engine        | `https://guild.illatio.dev`        | `/`          | `npm run package:site -- guild`  |
| Guild Documentation | `https://docs.guild.illatio.dev`   | `/docs/`     | `npm run package:site -- docs`   |
| Guild Model Catalog | `https://models.guild.illatio.dev` | `/models/`   | `npm run package:site -- models` |

## 2. TLS Coverage for Nested Subdomains (`*.guild.illatio.dev`)

Per RFC 6125, a standard wildcard certificate for `*.illatio.dev` covers single-label subdomains (`guild.illatio.dev`, `labs.illatio.dev`, `cloud.illatio.dev`), but **does not cover nested second-level subdomains** (`docs.guild.illatio.dev` and `models.guild.illatio.dev`).

To serve `docs.guild.illatio.dev` and `models.guild.illatio.dev` over HTTPS:

1. **Cloudflare Edge Certificate**:
   - When attaching `docs.guild.illatio.dev` and `models.guild.illatio.dev` as custom domains to their Cloudflare Pages projects, Cloudflare issues dedicated per-hostname edge certificates, or you can enable **Cloudflare Advanced Certificate Manager (ACM)** with a certificate covering `guild.illatio.dev` and `*.guild.illatio.dev`.
2. **Origin TLS (if using Nginx behind Cloudflare Full Strict)**:
   - Issue a Cloudflare Origin CA or Let's Encrypt certificate that explicitly includes SANs for `guild.illatio.dev` and `*.guild.illatio.dev` (`docs.guild.illatio.dev`, `models.guild.illatio.dev`).
3. **Path-Based Routing Always Works**:
   - In addition to dedicated subdomains, `guild.illatio.dev/docs/` and `guild.illatio.dev/models/` are pre-rendered in the main `guild` bundle and work immediately under standard first-level TLS (`guild.illatio.dev`).

## 3. Reproducible Cloudflare Pages Deployment

```bash
# Authenticate Wrangler
npx wrangler login

# Verify pinned Guild Core sources and build with production canonical URLs
npm run check:sources
PUBLIC_DEPLOYMENT=production npm run build

# 1. Deploy guild.illatio.dev (also includes /docs/ and /models/ paths)
npm run package:site -- guild
npx wrangler pages deploy dist-site --project-name guild-web --branch main

# 2. Deploy docs.guild.illatio.dev
npm run package:site -- docs
npx wrangler pages deploy dist-site --project-name guild-docs --branch main

# 3. Deploy models.guild.illatio.dev
npm run package:site -- models
npx wrangler pages deploy dist-site --project-name guild-models --branch main
```

## 4. Persistent GitHub Pages Preview

On every push to `main`, `.github/workflows/ci.yml` verifies source hashes, linting, formatting, Astro types, broken links/anchors, and headless Chromium Playwright + axe-core tests across `1440px`, `390px`, and `320px` viewports, then publishes a live preview to:

- **https://guild-inference.github.io/guild-web/**
- **https://guild-inference.github.io/guild-web/docs/**
- **https://guild-inference.github.io/guild-web/models/**
