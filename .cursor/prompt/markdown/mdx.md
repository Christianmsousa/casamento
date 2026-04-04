# Como Usar MDX

Quando o usuário pedir para misturar React components com markdown, use MDX.

## Aplicação:

1. **Configure MDX no Next.js** (se ainda não estiver)
2. **Crie arquivos `.mdx`** em `content/`
3. **Importe e use componentes** dentro do MDX
4. **Use em landing pages** ou páginas que precisam de conteúdo dinâmico

## Exemplo de aplicação:

```mdx
// content/landing.mdx
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

# Minha Landing Page

Este é um parágrafo normal.

<Card>
  <h2>Título do Card</h2>
  <p>Conteúdo do card</p>
  <Button variant="primary">Clique aqui</Button>
</Card>
```

```tsx
// app/(landing)/page.tsx
import LandingContent from '@/content/landing.mdx'

export default function LandingPage() {
  return (
    <div>
      <LandingContent />
    </div>
  )
}
```

## Quando usar:

- Landing pages com conteúdo dinâmico
- Quando precisa misturar React components com markdown
- Quando quer componentes customizados dentro do markdown



