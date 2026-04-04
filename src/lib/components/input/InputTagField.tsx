import { forwardRef } from 'react'
import { tv } from 'tailwind-variants'

const inputTagField = tv({
  base: 'flex-1 min-w-[120px] px-1 py-1 text-body2 text-neutral-900 placeholder:text-neutral-light-500 focus:outline-none border-none bg-transparent',
  variants: {
    disabled: {
      true: 'text-neutral-light-500 placeholder:text-neutral-light-400',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const InputTagField = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, disabled, ...props }, ref) => {
  return (
    <input
      ref={ref}
      onInvalid={(e) => {
        e.preventDefault() // cancela o tooltip
        ;(e.target as HTMLInputElement).setCustomValidity(' ')
      }}
      disabled={disabled}
      {...props}
      className={inputTagField({ className, disabled })}
    />
  )
})

InputTagField.displayName = 'InputTagField'
