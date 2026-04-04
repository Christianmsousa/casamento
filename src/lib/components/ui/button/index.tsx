import { tv } from 'tailwind-variants'
import { ButtonProps } from './types'

const buttonVariant = tv({
  base: 'flex items-center justify-center transition-all duration-200 gap-1 rounded-lg px-8 py-4 truncate font-semibold',
  variants: {
    variant: {
      transparent: '',
      transparentWithoutPadding: 'px-0 py-0',
      transparentEdit:
        'text-neutral-light-600 bg-transparent border border-neutral-light-300  hover:text-neutral-dark-950  py-2 px-4 font-normal',
      primary:
        'bg-terracota-600 text-white border-4 border-transparent hover:bg-terracota-700 focus:outline-none focus:bg-terracota-700 focus:ring-4 focus:ring-terracota-200 active:bg-terracota-800 active:outline-none active:ring-0 h-14',
      secondary:
        'bg-transparent border border-neutral-light-300 text-terracota-700 hover:bg-terracota-50 hover:border-terracota-600 focus:border-terracota-600 active:bg-terracota-100 active:border-terracota-500 focus:outline-none h-14',
      outline:
        'bg-transparent border-2 border-terracota-500 text-terracota-700 hover:bg-terracota-50 hover:border-terracota-600 focus:border-terracota-600 active:bg-terracota-100 active:border-terracota-500 focus:outline-none h-14',
      destructive:
        'bg-red-600 text-white border-4 border-transparent hover:bg-red-700 focus:outline-none focus:bg-red-700 focus:ring-4 focus:ring-red-200 active:bg-red-800 active:outline-none active:ring-0 h-14',
      cancel:
        'bg-transparent border border-neutral-light-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 focus:border-red-500 focus:text-red-700 active:bg-red-100 active:border-red-400 focus:outline-none h-14',
      warning:
        'bg-yellow-600 text-white border-4 border-transparent hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700 focus:ring-4 focus:ring-yellow-200 active:bg-yellow-600 active:outline-none active:ring-0 h-14',
      error:
        'bg-red-600 text-white border-4 border-transparent hover:bg-red-700 focus:outline-none focus:bg-red-700 focus:ring-4 focus:ring-red-200 active:bg-red-600 active:outline-none active:ring-0 h-14',
      success:
        'bg-green-600 text-white border-4 border-transparent hover:bg-green-700 focus:outline-none focus:bg-green-700 focus:ring-4 focus:ring-green-200 active:bg-green-600 active:outline-none active:ring-0 h-14',
      ctaWhite:
        'bg-white text-terracota-600 border-2 border-transparent hover:bg-terracota-50 focus:outline-none focus:ring-2 focus:ring-terracota-200 active:bg-terracota-100',
    },
    disabled: {
      true: 'bg-neutral-50 text-neutral-500 border border-neutral-200 hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 focus:ring-0 active:bg-neutral-50 active:outline-none active:ring-0 cursor-not-allowed h-14',
      false: '',
    },
    size: {
      xs: 'w-1/5 text-md',
      sm: 'px-4 py-2 text-sm h-10 w-auto',
      md: 'w-2/4 text-md',
      lg: 'w-full text-base leading-[1.125rem]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
  },
})

export { buttonVariant }

export function Button({
  iconLeft,
  iconRight,
  text,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariant({ variant, size, disabled: props.disabled })}
      {...props}
    >
      {iconLeft && <span>{iconLeft}</span>}
      {text}
      {iconRight && <span>{iconRight}</span>}
    </button>
  )
}
