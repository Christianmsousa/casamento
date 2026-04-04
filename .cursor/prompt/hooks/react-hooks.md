# Como Usar Hooks Nativos do React

Quando o usuário precisar de estado, efeitos ou memoização, use hooks nativos do React.

## Aplicação:

1. **`useState`** - Para estado local simples
2. **`useEffect`** - Para efeitos colaterais (fetch, subscriptions, etc.)
3. **`useMemo`** - Para memoizar cálculos caros
4. **`useCallback`** - Para memoizar funções
5. **`useRouter`** (Next.js) - Para navegação

## Exemplo de aplicação:

```tsx
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const MyComponent = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<string[]>([])
  const router = useRouter()

  // useEffect para buscar dados
  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(setItems)
  }, [])

  // useMemo para cálculo caro
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.length, 0)
  }, [items])

  // useCallback para função passada como prop
  const handleClick = useCallback(() => {
    router.push('/checklist')
  }, [router])

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <p>Total length: {expensiveValue}</p>
      <button onClick={handleClick}>Go to Checklist</button>
    </div>
  )
}
```

## Quando usar cada um:

- **useState**: Estado local que não precisa ser compartilhado
- **useEffect**: Side effects (fetch, timers, subscriptions)
- **useMemo**: Cálculos caros que dependem de props/state
- **useCallback**: Funções passadas como props para evitar re-renders
- **useRouter**: Navegação no Next.js



