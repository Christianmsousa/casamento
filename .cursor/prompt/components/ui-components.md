# Como Criar Componentes UI

Quando o usuário pedir para criar componentes reutilizáveis (Button, Card, Input, etc.), coloque em `components/ui/`.

## Aplicação:

1. **Crie o arquivo em `components/ui/[Nome].tsx`**
2. **Se tiver variantes**, use Tailwind Variants (cva)
3. **Use TypeScript** com props tipadas
4. **Use `cn()`** para combinar classes

## Exemplo de aplicação:

Se o usuário pedir: "Crie um componente Card"

```tsx
// components/ui/Card.tsx
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn(
      "rounded-lg border bg-white p-6 shadow-sm",
      className
    )}>
      {children}
    </div>
  )
}
```

Se o usuário pedir: "Crie um Input com estados de erro"

```tsx
// components/ui/Input.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full rounded-md border px-3 py-2",
  {
    variants: {
      error: {
        true: "border-red-500 focus:border-red-500",
        false: "border-gray-300 focus:border-blue-500",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
)

interface InputProps extends VariantProps<typeof inputVariants> {
  className?: string
  // ... outras props do input
}

export const Input = ({ error, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(inputVariants({ error }), className)}
      {...props}
    />
  )
}
```

## Regras:

- ✅ Sempre em `components/ui/`
- ✅ Use Variants se tiver diferentes estilos
- ✅ Sempre use `cn()` para combinar classes
- ✅ TypeScript obrigatório



