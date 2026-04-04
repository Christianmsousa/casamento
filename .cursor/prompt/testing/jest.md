# Como Configurar Jest

Para testes unitários, configure Jest + React Testing Library.

## Aplicação:

```tsx
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

test('renders button', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

Use para: testes de componentes e funções utilitárias.



