# Como Criar Componentes Utilitários

Quando o usuário pedir componentes utilitários (Loading, ErrorBoundary, SEO), coloque em `lib/components/`.

## Aplicação:

1. **Crie em `lib/components/[Nome].tsx`**
2. **Use para componentes de infraestrutura** (não UI pura)
3. **Componentes que são "helpers"** mais que UI

## Exemplo de aplicação:

```tsx
// lib/components/Loading.tsx
export const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}
```

```tsx
// lib/components/ErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Algo deu errado</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Tentar novamente
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

```tsx
// lib/components/SEO.tsx
import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
}

export const generateMetadata = ({ title, description }: SEOProps): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}
```

## Quando usar:

- Loading, ErrorBoundary
- SEO helpers
- Componentes de infraestrutura
- Componentes que são mais "helpers" que UI



