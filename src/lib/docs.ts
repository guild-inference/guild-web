import snapshot from '../data/generated/sources.json';
import { guides } from '../data/guides';
const guideFiles = import.meta.glob('../content/guides/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
export const docs = [
  ...guides.map((g) => ({
    ...g,
    path: '',
    sha256: '',
    markdown: String(guideFiles[`../content/guides/${g.file}`]),
    imported: false,
  })),
  ...snapshot.documents
    .filter((d) => 'slug' in d)
    .map((d) => ({ ...d, slug: d.slug!, title: d.title!, category: d.category!, imported: true })),
];
export const categories = [...new Set(docs.map((d) => d.category))];
