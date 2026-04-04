import { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/utils/cn'

const cardVariant = tv({
  variants: {
    variant: {
      default: 'rounded-lg border border-neutral-200 p-4',
      primary:
        'group flex items-center gap-2 rounded-lg border border-neutral-200 p-3 font-medium leading-5',
    },
  },
})

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'primary'
  onClick?: () => void
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', variant = 'default', onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariant({ variant }),
          onClick && 'cursor-pointer hover:border-terracota-300 transition-all duration-200',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-sm font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-4', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'
