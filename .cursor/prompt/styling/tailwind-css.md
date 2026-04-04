# Como Usar Tailwind CSS

Quando o usuário pedir para estilizar algo, use Tailwind CSS como primeira opção.

## Aplicação:

1. **Use classes utilitárias do Tailwind** diretamente no `className`
2. **Prefira composição de classes** ao invés de CSS custom
3. **Use classes responsivas** quando necessário (`md:`, `lg:`, etc.)
4. **Combine classes** para criar estilos complexos

## Exemplo de aplicação:

Se o usuário pedir: "Crie um card com padding, sombra e bordas arredondadas"

Use:
```tsx
<div className="p-4 rounded-lg shadow-md bg-white">
```

**NÃO** crie CSS custom ou CSS Modules para isso.

## Quando NÃO usar Tailwind:

- Apenas se o usuário explicitamente pedir CSS custom
- Para estilos globais compartilhados (use CSS Modules)

