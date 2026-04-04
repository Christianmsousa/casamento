# Como Usar App Router do Next.js

Quando o usuário pedir para criar rotas ou páginas, use App Router do Next.js em `app/`.

## Aplicação:

1. **Crie `app/[rota]/page.tsx`** para cada rota
2. **Use Server Components por padrão**
3. **Crie `layout.tsx`** para layouts compartilhados
4. **Use `loading.tsx`** e `error.tsx` para estados especiais

## Exemplo de aplicação:

```tsx
// app/page.tsx (rota raiz /)
export default function HomePage() {
  return (
    <div>
      <h1>Bem-vindo</h1>
      <p>Esta é a página inicial</p>
    </div>
  )
}
```

```tsx
// app/checklist/page.tsx (rota /checklist)
import { readFile } from 'fs/promises'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'

export default async function ChecklistPage() {
  const content = await readFile('content/checklist.md', 'utf-8')
  return <MarkdownRenderer content={content} />
}
```

```tsx
// app/layout.tsx (layout raiz)
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

## Estrutura:

- `app/page.tsx` - Rota raiz `/`
- `app/checklist/page.tsx` - Rota `/checklist`
- `app/(markdown)/layout.tsx` - Layout para grupo de rotas
- `app/loading.tsx` - Loading state global
- `app/error.tsx` - Error boundary global

## Regras:

- ✅ Server Components por padrão
- ✅ Use `'use client'` apenas quando necessário
- ✅ Cada pasta com `page.tsx` vira uma rota



