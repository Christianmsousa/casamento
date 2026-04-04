# Como Usar react-markdown

Quando o usuário pedir para renderizar markdown simples (sem componentes React dentro), use `react-markdown`.

## Aplicação:

1. **Crie componente em `components/markdown/MarkdownRenderer.tsx`**
2. **Use `react-markdown`** para renderizar o conteúdo
3. **Carregue o markdown** de arquivos `.md` em `content/`

## Exemplo de aplicação:

```tsx
// components/markdown/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
```

```tsx
// app/checklist/page.tsx
import { readFile } from 'fs/promises'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'

export default async function ChecklistPage() {
  const content = await readFile('content/checklist.md', 'utf-8')
  return <MarkdownRenderer content={content} />
}
```

## Quando usar:

- Conteúdo estático de arquivos `.md`
- Quando NÃO precisa de React components dentro do markdown
- Para renderização simples de markdown



