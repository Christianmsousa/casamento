# Como Usar useState

Quando o usuário precisar de estado local simples em um componente, use `useState`.

## Aplicação:

1. **Use para estado local** que não precisa ser compartilhado
2. **Use em formulários simples**
3. **Use para estado de UI** (aberto/fechado, loading, etc.)

## Exemplo de aplicação:

```tsx
'use client'

import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}
```

```tsx
'use client'

import { useState } from 'react'

export const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

## Quando usar:

- Estado local de componente
- Estado simples que não precisa ser compartilhado
- Formulários simples
- Estado de UI (modal aberto, menu expandido, etc.)



