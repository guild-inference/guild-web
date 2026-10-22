import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
export const markdownProcessor = createMarkdownProcessor({
  syntaxHighlight: 'shiki',
  shikiConfig: { theme: 'github-light' },
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
});
