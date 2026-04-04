# Como Criar Componentes de Markdown

Quando o usuário pedir componentes específicos para renderizar ou customizar markdown, coloque em `components/markdown/`.

## Aplicação:

1. **Crie em `components/markdown/[Nome].tsx`**
2. **Use para customizar elementos markdown** (h1, p, img, etc.)
3. **Crie componentes de checklist** ou outros elementos customizados

## Exemplo de aplicação:

```tsx
// components/markdown/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'
import { Checklist } from './Checklist'

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-4">{children}</h1>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 text-gray-700">{children}</p>
  ),
  // Custom component para checklist
  checklist: Checklist,
}

export const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown components={components}>
      {content}
    </ReactMarkdown>
  )
}
```

```tsx
// components/markdown/Checklist.tsx
interface ChecklistProps {
  items: string[]
  checked?: boolean[]
}

export const Checklist = ({ items, checked = [] }: ChecklistProps) => {
  return (
    <ul className="list-none space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <input
            type="checkbox"
            checked={checked[index]}
            className="mr-2"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
```

## Quando usar:

- Customizar renderização de elementos markdown
- Criar componentes específicos de markdown (checklist, etc.)
- Extender funcionalidades do markdown



