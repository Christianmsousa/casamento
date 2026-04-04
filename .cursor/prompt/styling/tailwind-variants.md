# Como Usar Tailwind Variants (CVA)

Quando o usuário pedir para criar um componente com variantes (diferentes tamanhos, cores, estilos), use `class-variance-authority` (cva).

## Aplicação:

1. **Identifique as variantes necessárias** (size, variant, color, etc.)
2. **Crie o objeto de variantes** usando `cva()`
3. **Defina as classes base** e as variantes
4. **Use `VariantProps`** para type-safety
5. **Sempre use `cn()`** para combinar classes

## Exemplo de aplicação:

Se o usuário pedir: "Crie um botão com variantes de tamanho (sm, md, lg) e estilo (primary, secondary)"

Use:
```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  className?: string
}

export const Button = ({ variant, size, className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
```

## Importante:

- **Sempre** use `cn()` para combinar com `className` prop
- **Sempre** estenda `VariantProps` para type-safety
- **Sempre** defina `defaultVariants`
- **Nunca** use classes Tailwind diretamente quando há variantes



