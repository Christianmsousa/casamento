# Como Criar Custom Hooks

Quando o usuário pedir lógica reutilizável ou estado compartilhado, crie custom hooks em `lib/hooks/`.

## Aplicação:

1. **Crie em `lib/hooks/use[Nome].ts`**
2. **Use para lógica reutilizável** entre componentes
3. **Use para estado compartilhado** ou efeitos complexos

## Exemplo de aplicação:

```tsx
// lib/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
```

```tsx
// lib/hooks/useMarkdown.ts
import { useState, useEffect } from 'react'

export function useMarkdown(filePath: string) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(filePath)
      .then(res => res.text())
      .then(text => {
        setContent(text)
        setLoading(false)
      })
  }, [filePath])

  return { content, loading }
}
```

## Quando criar:

- Lógica reutilizável entre múltiplos componentes
- Estado compartilhado
- Efeitos colaterais complexos que podem ser reutilizados



