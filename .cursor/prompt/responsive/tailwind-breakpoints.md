# Como Usar Breakpoints do Tailwind

Quando o usuário pedir responsividade, use breakpoints do Tailwind como primeira opção.

## Aplicação:

Use classes responsivas: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```tsx
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* conteúdo */}
</div>

// Texto responsivo
<h1 className="text-2xl md:text-4xl lg:text-6xl">Título</h1>

// Padding responsivo
<div className="p-4 md:p-8 lg:p-12">
```

## Breakpoints padrão:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px



