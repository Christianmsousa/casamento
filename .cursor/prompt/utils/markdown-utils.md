# Como Criar Utilitários de Markdown

Quando o usuário pedir processamento específico de markdown, crie em `lib/markdown/`.

## Aplicação:

1. **Crie em `lib/markdown/[nome].ts`**
2. **Use para parsers, processors, transformações**
3. **Funções específicas de processamento de markdown**

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
// lib/markdown/parser.ts
export function parseMarkdownFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: {}, content }
  }
  
  const frontmatter = parseYAML(match[1])
  const markdown = match[2]
  
  return { frontmatter, content: markdown }
}

export function extractHeadings(content: string): string[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings: string[] = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1])
  }
  
  return headings
}
```

```tsx
// lib/markdown/transformer.ts
export function transformMarkdownLinks(content: string): string {
  // Transformar links markdown em links customizados
  return content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<CustomLink href="$2">$1</CustomLink>'
  )
}
```

## Quando criar:

- Processamento específico de markdown
- Parsers customizados
- Transformações de markdown
- Processadores de plugins



