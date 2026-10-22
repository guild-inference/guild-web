import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const lock = JSON.parse(await readFile(new URL('../source-lock.json', import.meta.url), 'utf8'));
if (!/^[a-f0-9]{40}$/.test(lock.commit))
  throw new Error('Source commit must be a full immutable SHA');
const root = new URL('../src/data/generated/', import.meta.url);
const check = process.argv.includes('--check');
await mkdir(root, { recursive: true });
const files = [...lock.documents.map((d) => d.path), ...lock.evidence];
const documents = [];
for (const path of files) {
  let markdown;
  if (process.env.GUILD_REPO_PATH) {
    // Read the commit, never the working tree (which may contain private changes).
    markdown = execFileSync(
      'git',
      ['-C', process.env.GUILD_REPO_PATH, 'show', `${lock.commit}:${path}`],
      { encoding: 'utf8', maxBuffer: 10e6 },
    );
  } else {
    const response = await fetch(
      `https://raw.githubusercontent.com/${lock.repository}/${lock.commit}/${path}`,
    );
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    markdown = await response.text();
  }
  documents.push({
    ...(lock.documents.find((d) => d.path === path) || { path }),
    sha256: createHash('sha256').update(markdown).digest('hex'),
    markdown,
  });
}
const output =
  JSON.stringify({ repository: lock.repository, commit: lock.commit, documents }, null, 2) + '\n';
const destination = new URL('sources.json', root);
if (check) {
  if ((await readFile(destination, 'utf8')) !== output)
    throw new Error('Source snapshot differs: run npm run sync-docs and review the diff.');
  console.log(`Verified ${documents.length} complete source files at ${lock.commit}`);
} else {
  await writeFile(destination, output);
  console.log(`Synced ${documents.length} complete files at ${lock.commit}`);
}
