# Cloudflare Worker & Nested Subdomain TLS Deployment

## 1. Host-Aware Cloudflare Worker Architecture (`worker.mjs` + `wrangler.toml`)

`guild-web` is packaged as a **Cloudflare Worker with Static Assets** (`wrangler.toml` `main = "worker.mjs"`, `[assets] directory = "./dist"`). A single Worker deployment serves all three Guild properties based on the incoming request hostname (or `?domain=docs|models` query override on `*.workers.dev`):

| Property     | Canonical Custom Domain            | Worker Route Resolution (`worker.mjs`)                                   |
| ------------ | ---------------------------------- | ------------------------------------------------------------------------ |
| Guild Engine | `https://guild.illatio.dev`        | `/` → `dist/index.html`, `/performance/` → `dist/performance/index.html` |
| Guild Docs   | `https://docs.guild.illatio.dev`   | `/` → `dist/docs/index.html`, `/:slug/` → `dist/docs/:slug/index.html`   |
| Guild Models | `https://models.guild.illatio.dev` | `/` → `dist/models/index.html`, `/:id/` → `dist/models/:id/index.html`   |

## 2. Deploying the Cloudflare Worker

### Option A: CLI Deployment (`npm run deploy:worker`)

```bash
# 1. Authenticate Wrangler (or export CLOUDFLARE_API_TOKEN with Workers Scripts:Edit permission)
npx wrangler login

# 2. Build production bundle and deploy the Worker + Static Assets
npm run deploy:worker
```

### Option B: Cloudflare Workers Builds (Git Integration)

1. In the Cloudflare dashboard, open **Workers & Pages → Create application → Workers → Import a repository**.
2. Select **`guild-inference/guild-web`**.
3. Set Build command: `PUBLIC_DEPLOYMENT=production npm run build`
4. Set Deploy command: `npx wrangler deploy`
5. Under **Settings → Domains & Routes**, attach Custom Domains:
   - `guild.illatio.dev`
   - `docs.guild.illatio.dev`
   - `models.guild.illatio.dev`
     _(Attaching a **Custom Domain** directly to a Cloudflare Worker automatically provisions a dedicated edge certificate for that exact hostname, including nested second-level subdomains `docs.guild.illatio.dev` and `models.guild.illatio.dev`!)_

### Option C: GitHub Actions Automated Worker Deployment

`.github/workflows/ci.yml` includes a `deploy-worker` job that validates `npx wrangler deploy --dry-run` on every push to `main` and automatically runs `npx wrangler deploy` once `CLOUDFLARE_API_TOKEN` (and optionally `CLOUDFLARE_ACCOUNT_ID`) is added to the repository or `guild-inference` organization secrets.
