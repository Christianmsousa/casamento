# Como Usar Plugins remark/rehype

Quando o usuário pedir funcionalidades avançadas de markdown (syntax highlighting, tabelas, etc.), configure plugins remark/rehype.

## Aplicação:

1. **Crie `lib/markdown/processor.ts`** para configurar os plugins
2. **Instale os plugins necessários**
3. **Configure no `react-markdown`** ou processador MDX

## Exemplo de aplicação:

```tsx
// lib/markdown/processor.ts
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const markdownPlugins = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeHighlight,
  ],
}
```

```tsx
// components/markdown/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'
import { markdownPlugins } from '@/lib/markdown/processor'

export const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={markdownPlugins.remarkPlugins}
      rehypePlugins={markdownPlugins.rehypePlugins}
    >
      {content}
    </ReactMarkdown>
  )
}
```

## Plugins comuns:

- `remark-gfm` - Tabelas, strikethrough, task lists
- `rehype-highlight` - Syntax highlighting de código
- `rehype-slug` - IDs automáticos em headings
- `rehype-autolink-headings` - Links automáticos em headings



