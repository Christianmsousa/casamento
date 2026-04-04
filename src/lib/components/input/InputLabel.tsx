import { tv } from 'tailwind-variants'

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
  error?: boolean
}

const labelVariant = tv({
  base: 'font-medium text-neutral-dark-950',
  variants: {
    error: {
      true: 'text-red-500',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
})

export function InputLabel({
  children,
  className,
  error,
  ...rest
}: InputLabelProps) {
  return (
    <label
      {...rest}
      className={`text-body3 ${labelVariant({
        className,
        error,
      })}`}
    >
      {children}
    </label>
  )
}
