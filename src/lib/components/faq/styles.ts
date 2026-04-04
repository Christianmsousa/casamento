import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

export const accordionItemWrapper = cva(
  `
    transition-all
    duration-200
    ease-in-out
    border
    rounded-lg
    md:rounded-xl
    lg:rounded-2xl
    bg-white
    focus-within:border-terracota-500
    focus-within:shadow-none
  `,
  {
    variants: {
      isOpen: {
        true: 'border-terracota-500',
        false: 'border-gray-200 hover:border-terracota-500',
      },
    },
  }
)

export const accordionHeader = cva(
  `
    flex w-full items-center justify-between p-4 sm:p-5 md:p-6 lg:p-8
    text-left
    transition-all duration-200 ease-in-out
    outline-none
    focus:outline-none
    min-h-[3.75rem] sm:min-h-[4.375rem] md:min-h-[5rem] lg:min-h-[5.625rem]
  `,
  {
    variants: {
      isOpen: {
        false: '',
      },
    },
  }
)

export type AccordionItemWrapperProps = VariantProps<typeof accordionItemWrapper>
export type AccordionHeaderProps = VariantProps<typeof accordionHeader>

