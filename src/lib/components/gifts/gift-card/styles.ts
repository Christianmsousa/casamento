import { cva, type VariantProps } from 'class-variance-authority'

export const giftCardVariants = cva(
  `
    group relative
    bg-white rounded-xl
    border border-cream-200
    overflow-hidden
    transition-all duration-300
    hover:shadow-md hover:border-terracota-200
    flex flex-col
  `,
  {
    variants: {
      status: {
        available: 'hover:scale-[1.01]',
        reserved: 'opacity-70 border-gold-200',
        purchased: 'opacity-50 border-cream-200',
      },
    },
    defaultVariants: {
      status: 'available',
    },
  }
)

export type GiftCardVariants = VariantProps<typeof giftCardVariants>
