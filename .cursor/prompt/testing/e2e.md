# Como Configurar Testes E2E

Para testes end-to-end, use Playwright ou Cypress.

## Aplicação:

```tsx
// e2e/checklist.spec.ts
import { test, expect } from '@playwright/test'

test('checklist flow', async ({ page }) => {
  await page.goto('/checklist')
  await page.click('button:has-text("Adicionar")')
  // ...
})
```

Use para: testes de fluxos completos da aplicação.



