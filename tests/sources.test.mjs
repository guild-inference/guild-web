import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseRegistry } from '../src/lib/registry.mjs';
import { resolveDocHref } from '../src/lib/doc-links.mjs';
const snapshot = JSON.parse(
  await readFile(new URL('../src/data/generated/sources.json', import.meta.url)),
);
test('source snapshot is complete and internally hash-verified', () => {
  assert.match(snapshot.commit, /^[a-f0-9]{40}$/);
  assert.equal(snapshot.documents.length, 22);
  for (const d of snapshot.documents)
    assert.equal(createHash('sha256').update(d.markdown).digest('hex'), d.sha256);
  const report = snapshot.documents.find((d) => d.slug === 'phase66');
  assert.ok(report.markdown.length > 18000);
  assert.ok(report.markdown.includes('### 8.5'));
});
test('catalog geometry and byte sizes come from the registry', () => {
  const models = parseRegistry(
    snapshot.documents.find((d) => d.path === 'src/models/registry.cpp').markdown,
  );
  assert.equal(models[0].bytes, 93682584224);
  assert.equal(models[1].bytes, 21713463040);
  assert.equal(models[0].activeExperts, 10);
  assert.equal(models[1].experts, 256);
  assert.throws(() => parseRegistry(''), /audited/);
});
test('relative doc links preserve versioned sources and anchors', () => {
  const rewrite = (href) =>
    resolveDocHref(
      href,
      'docs/architecture/README.md',
      snapshot.documents,
      '/guild-web/docs/',
      'https://github.com/guild-inference/Guild/blob/sha/',
    );
  assert.equal(rewrite('GPACK_FORMAT.md#header'), '/guild-web/docs/gpack/#header');
  assert.equal(
    rewrite('../../src/runtime/model.cpp'),
    'https://github.com/guild-inference/Guild/blob/sha/src/runtime/model.cpp',
  );
  assert.equal(rewrite('#memory-hierarchy'), '#memory-hierarchy');
  assert.equal(rewrite('https://example.com'), 'https://example.com');
});
