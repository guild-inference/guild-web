import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { resolveAssetUrl } from '../worker.mjs';

test('guild-web Cloudflare Worker resolves host-aware routes for guild, docs, and models', async () => {
  assert.equal(resolveAssetUrl('https://guild.illatio.dev/').pathname, '/');
  assert.equal(resolveAssetUrl('https://docs.guild.illatio.dev/').pathname, '/docs/');
  assert.equal(
    resolveAssetUrl('https://docs.guild.illatio.dev/getting-started/').pathname,
    '/docs/getting-started/',
  );
  assert.equal(resolveAssetUrl('https://models.guild.illatio.dev/').pathname, '/models/');
  assert.equal(
    resolveAssetUrl('https://models.guild.illatio.dev/qwen3-8-flash-next/').pathname,
    '/models/qwen3-8-flash-next/',
  );
  assert.equal(
    resolveAssetUrl('https://docs.guild.illatio.dev/search-index.json').pathname,
    '/search-index.json',
  );
  assert.equal(
    resolveAssetUrl('https://models.guild.illatio.dev/_astro/site.css').pathname,
    '/_astro/site.css',
  );

  const res = await worker.fetch(new Request('https://docs.guild.illatio.dev/gexec/'), {
    ASSETS: {
      async fetch(req) {
        return new Response(`served:${new URL(req.url).pathname}`, { status: 200 });
      },
    },
  });
  assert.equal(await res.text(), 'served:/docs/gexec/');
  assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff');
});
