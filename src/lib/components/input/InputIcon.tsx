import React from 'react'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

//TODO: Adicionar variantes para background, borda, etc.

const inputButton = tv({
  base: 'flex items-center bg-transparent first:rounded-l-lg last:rounded-r-lg',
  variants: {
    position: {
      left: 'py-4 pl-4',
      right: 'p-4',
    },
  },
  defaultVariants: {
    position: 'left',
  },
})

interface IconProps extends VariantProps<typeof inputButton> {
  children?: React.ReactNode
}

export function InputIcon({ children, position }: IconProps) {
  return <div className={inputButton({ position })}>{children}</div>
}
