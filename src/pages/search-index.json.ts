import { docs } from '../lib/docs';
import { link } from '../lib/links';
export function GET() {
  return new Response(
    JSON.stringify(
      docs.map((d) => ({
        title: d.title,
        text: d.markdown.replace(/[`#*|]/g, '').replace(/\s+/g, ' '),
        url: link('docs', `${d.slug}/`),
      })),
    ),
    { headers: { 'Content-Type': 'application/json' } },
  );
}
