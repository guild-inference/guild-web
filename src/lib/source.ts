import lock from '../../source-lock.json';
export const revision = lock.commit;
export const tag = lock.tag;
/** The pinned release as people read it: the tag, with its commit for exactness. */
export const pinned = `${lock.tag} (${lock.commit.slice(0, 7)})`;
export const source = (path: string, anchor = '') =>
  `https://github.com/${lock.repository}/blob/${lock.commit}/${path}${anchor}`;
