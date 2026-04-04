# Como Usar Context API

Quando o usuário precisar de estado compartilhado entre múltiplos componentes, use Context API com useReducer.

## Aplicação:

1. **Crie o contexto em `lib/context/[Nome]Context.tsx`**
2. **Use `useReducer`** para estado complexo com actions
3. **Crie um Provider** para envolver os componentes
4. **Use `useContext`** nos componentes filhos

## Exemplo de aplicação:

```tsx
// lib/context/ThemeContext.tsx
'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}

type ThemeAction = { type: 'TOGGLE_THEME' }

const initialState: ThemeState = { theme: 'light' }

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { theme: state.theme === 'light' ? 'dark' : 'light' }
    default:
      return state
  }
}

const ThemeContext = createContext<{
  state: ThemeState
  dispatch: React.Dispatch<ThemeAction>
} | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/lib/context/ThemeContext'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/lib/context/ThemeContext'

export const ThemeToggle = () => {
  const { state, dispatch } = useTheme()

  return (
    <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
      {state.theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

## Quando usar:

- Estado compartilhado entre múltiplos componentes
- Estado complexo que precisa de actions
- Tema da aplicação, autenticação, preferências globais



