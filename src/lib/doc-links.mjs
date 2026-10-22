import path from 'node:path';

/** Keep imported links on the pinned snapshot; published docs use local navigation. */
export function resolveDocHref(href, sourcePath, documents, docBase, sourceBase) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return href;
  const [file, fragment = ''] = href.split('#');
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), file));
  const match = documents.find((d) => d.path === resolved && d.slug);
  const hash = fragment ? `#${fragment}` : '';
  return match ? `${docBase}${match.slug}/${hash}` : `${sourceBase}${resolved}${hash}`;
}
