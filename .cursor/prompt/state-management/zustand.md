# Como Usar Zustand

Quando o usuário precisar de estado global complexo e Context API ficar verboso, use Zustand.

## Aplicação:

1. **Instale Zustand**: `npm install zustand`
2. **Crie store em `lib/stores/[nome]Store.ts`**
3. **Use o hook** nos componentes

## Exemplo de aplicação:

```tsx
// lib/stores/checklistStore.ts
import { create } from 'zustand'

interface ChecklistItem {
  id: string
  text: string
  checked: boolean
}

interface ChecklistStore {
  items: ChecklistItem[]
  addItem: (text: string) => void
  toggleItem: (id: string) => void
  removeItem: (id: string) => void
}

export const useChecklistStore = create<ChecklistStore>((set) => ({
  items: [],
  addItem: (text) =>
    set((state) => ({
      items: [...state.items, { id: Date.now().toString(), text, checked: false }],
    })),
  toggleItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}))
```

```tsx
// components/Checklist.tsx
'use client'

import { useChecklistStore } from '@/lib/stores/checklistStore'

export const Checklist = () => {
  const { items, addItem, toggleItem, removeItem } = useChecklistStore()
  const [input, setInput] = useState('')

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        addItem(input)
        setInput('')
      }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
            />
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Quando usar:

- Estado global complexo
- Muitos componentes precisam do mesmo estado
- Quando Context API fica verboso demais
- Preferências globais, carrinho, autenticação



