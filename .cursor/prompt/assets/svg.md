# Como Usar SVG como Componente

Quando o usuário pedir ícones SVG ou SVGs que precisam ser estilizados/animated, use como componente React.

## Aplicação:

1. **Coloque SVGs em `public/icons/` ou `components/icons/`**
2. **Crie componente React** para o SVG
3. **Use props** para customizar (cor, tamanho, etc.)

## Exemplo de aplicação:

```tsx
// components/icons/Heart.tsx
interface HeartIconProps {
  className?: string
  size?: number
}

export const HeartIcon = ({ className, size = 24 }: HeartIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  )
}
```

```tsx
// Uso do componente
import { HeartIcon } from '@/components/icons/Heart'

export const LikeButton = () => {
  return (
    <button>
      <HeartIcon className="text-red-500 hover:text-red-700" size={32} />
    </button>
  )
}
```

## Quando usar:

- Ícones SVG que precisam ser reutilizados
- SVGs que precisam ser estilizados (cor, tamanho)
- SVGs que precisam ter partes animadas
- Ícones que precisam de props customizáveis

## Quando NÃO usar:

- SVGs estáticos simples → `public/icons/` e usar como imagem
- SVGs que não precisam de customização → `public/icons/`



