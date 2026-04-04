import { tv } from 'tailwind-variants'

const inputField = tv({
  base: 'block w-full px-3 py-2 text-body2 text-neutral-900 placeholder:text-neutral-light-500 focus:outline-none',
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

export function InputField({
  className,
  disabled,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      onInvalid={(e) => {
        e.preventDefault() // cancela o tooltip
        /* opcional: mantém :invalid para CSS */
        ;(e.target as HTMLInputElement).setCustomValidity(' ')
      }}
      disabled={disabled}
      {...props}
      className={inputField({ className, disabled })}
    />
  )
}
