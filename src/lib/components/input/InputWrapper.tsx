import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

interface InputWrapperProps {
  children: ReactNode
  className?: string
  error?: boolean
  disabled?: boolean
  flexible?: boolean
}
//    focus-within:shadow-[0_0_0_4px_rgba(0,87,237,0.25)]
const inputWrapper = tv({
  base: `
    transition-all
    duration-200
    ease-in-out
    inline-flex w-full
    border
    rounded-lg
    overflow-hidden
    border-neutral-light-300 
    bg-white
    hover:border-brand-blue-500 
    focus-within:border-brand-blue-500 
    focus-within:shadow-none
    active:bg-brand-blue-50
    active:border-brand-blue-400
    active:shadow-none
    [color-scheme:light]
  `,
  variants: {
    error: {
      true: 'border-[2px] border-semantic-error focus-within:border-semantic-error hover:border-semantic-error',
      false: '',
    },
    disabled: {
      true: 'bg-neutral-light-50 border-neutral-light-200 cursor-not-allowed hover:border-neutral-light-200 focus-within:border-neutral-light-200 active:bg-neutral-light-50 active:border-neutral-light-200',
      false: '',
    },
    flexible: {
      true: 'min-h-[3.5rem] max-h-[7.5rem]',
      false: 'h-14',
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
    flexible: false,
  },
})

export function InputWrapper({
  children,
  className,
  error,
  disabled,
  flexible,
}: InputWrapperProps) {
  return (
    <div className={inputWrapper({ className, error, disabled, flexible })}>
      {children}
    </div>
  )
}
