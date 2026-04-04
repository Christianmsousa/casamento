# Como Criar Funções Utilitárias

Quando o usuário pedir funções de formatação, validação ou helpers gerais, crie em `lib/utils/`.

## Aplicação:

1. **Crie arquivo em `lib/utils/[nome].ts`**
2. **Funções devem ser puras** (sem dependências de React)
3. **Use TypeScript** com tipos bem definidos
4. **Crie `cn.ts`** OBRIGATÓRIO para combinar classes

## Exemplo de aplicação:

```tsx
// lib/utils/cn.ts (OBRIGATÓRIO)
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```tsx
// lib/utils/format.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
```

```tsx
// lib/utils/validation.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidCPF(cpf: string): boolean {
  // Lógica de validação de CPF
  return cpf.replace(/\D/g, '').length === 11
}
```

```tsx
// lib/utils/constants.ts
export const ROUTES = {
  HOME: '/',
  CHECKLIST: '/checklist',
  LISTA: '/lista',
} as const

export const API_ENDPOINTS = {
  ITEMS: '/api/items',
  CHECKLIST: '/api/checklist',
} as const
```

## Quando criar:

- Funções puras sem dependências de React
- Formatação de dados (datas, números, moedas)
- Validação (emails, CPF, etc.)
- Constantes da aplicação
- Helpers gerais reutilizáveis



