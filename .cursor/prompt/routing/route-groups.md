# Como Usar Route Groups

Quando o usuário pedir para organizar rotas com layouts diferentes, use Route Groups `(nome)/`.

## Aplicação:

1. **Crie pasta com parênteses** `(nome)/` para agrupar rotas
2. **Crie `layout.tsx`** dentro do grupo para layout específico
3. **As rotas dentro não afetam a URL**

## Exemplo de aplicação:

```tsx
// app/(markdown)/layout.tsx
export default function MarkdownLayout({ children }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {children}
    </div>
  )
}
```

```tsx
// app/(markdown)/checklist/page.tsx
// URL: /checklist (não /(markdown)/checklist)
export default function ChecklistPage() {
  return <div>Checklist</div>
}
```

```tsx
// app/(markdown)/lista/page.tsx
// URL: /lista
export default function ListaPage() {
  return <div>Lista</div>
}
```

```tsx
// app/(landing)/layout.tsx
export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
```

```tsx
// app/(landing)/page.tsx
// URL: / (usa layout de landing)
export default function LandingPage() {
  return <div>Landing</div>
}
```

## Quando usar:

- Agrupar rotas semanticamente
- Aplicar layouts diferentes a grupos de rotas
- Organizar rotas sem afetar a URL

## Importante:

- Parênteses `()` não aparecem na URL
- Útil para organizar código sem mudar URLs
- Cada grupo pode ter seu próprio layout



