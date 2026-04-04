# Como Criar Types Compartilhados

Quando o usuário pedir types que serão usados em múltiplos arquivos, crie em `lib/types/`.

## Aplicação:

1. **Crie arquivo em `lib/types/[nome].ts`**
2. **Organize por domínio** (markdown.ts, checklist.ts, etc.)
3. **Exporte de `lib/types/index.ts`** para facilitar imports

## Exemplo de aplicação:

```tsx
// lib/types/markdown.ts
export interface MarkdownContent {
  frontmatter: {
    title: string
    description?: string
    date?: string
  }
  content: string
}

export interface MarkdownMetadata {
  slug: string
  title: string
  description?: string
  date?: Date
}
```

```tsx
// lib/types/checklist.ts
export interface ChecklistItem {
  id: string
  text: string
  checked: boolean
  category?: string
}

export interface Checklist {
  id: string
  title: string
  items: ChecklistItem[]
  createdAt: Date
  updatedAt: Date
}
```

```tsx
// lib/types/index.ts
export * from './markdown'
export * from './checklist'
```

```tsx
// Uso em componentes
import { ChecklistItem, Checklist } from '@/lib/types'

export const ChecklistComponent = ({ checklist }: { checklist: Checklist }) => {
  // ...
}
```

## Quando criar:

- Types compartilhados entre múltiplos arquivos
- Interfaces de dados principais
- Types de props de componentes compartilhados
- Types de API responses

## Estrutura recomendada:

- `lib/types/markdown.ts` - Types relacionados a markdown
- `lib/types/checklist.ts` - Types relacionados a checklist
- `lib/types/index.ts` - Exportações centralizadas



