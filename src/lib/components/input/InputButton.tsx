import { ButtonHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  position?: 'left' | 'right'
}

const inputButton = tv({
  base: `
    flex items-center
    px-4
    bg-neutral-light-50
    first:rounded-l-lg
    last:rounded-r-lg
    border-neutral-light-300 
  `,

  variants: {
    position: {
      left: 'border-l',
      right: 'border-r',
    },
  },
  defaultVariants: {
    position: 'left',
  },
})

export function InputButton({
  children,
  position,
  ...props
}: InputButtonProps) {
  return (
    <div className={inputButton({ position })}>
      <button {...props}>{children}</button>
    </div>
  )
}
