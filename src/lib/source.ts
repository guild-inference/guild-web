import lock from '../../source-lock.json';
export const revision = lock.commit;
export const source = (path: string, anchor = '') =>
  `https://github.com/${lock.repository}/blob/${revision}/${path}${anchor}`;
