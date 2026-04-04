# Como Implementar SEO

Quando o usuário pedir para adicionar meta tags ou SEO, use Metadata API do Next.js.

## Aplicação:

1. **Use `metadata` export** em `layout.tsx` ou `page.tsx`
2. **Configure Open Graph** e Twitter Cards
3. **Use helper em `lib/components/SEO.tsx`** se necessário

## Exemplo de aplicação:

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Casamento - Planejamento',
  description: 'Site para planejamento do casamento',
  openGraph: {
    title: 'Casamento - Planejamento',
    description: 'Site para planejamento do casamento',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casamento - Planejamento',
    description: 'Site para planejamento do casamento',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// app/checklist/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checklist - Casamento',
  description: 'Lista de tarefas para o casamento',
}

export default function ChecklistPage() {
  return <div>Checklist</div>
}
```

```tsx
// lib/components/SEO.tsx (helper opcional)
import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  image?: string
}

export function generateMetadata({ title, description, image }: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : [],
    },
  }
}
```

## Quando usar:

- Meta tags em todas as páginas
- Open Graph tags para redes sociais
- Twitter Cards
- SEO básico

## Importante:

- Use `metadata` export (não `next/head` no App Router)
- Configure em `layout.tsx` para tags globais
- Configure em `page.tsx` para tags específicas



