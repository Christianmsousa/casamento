import { cva } from 'class-variance-authority'

export const sectionHeaderVariants = cva('', {
  variants: {
    layout: {
      center: 'text-center',
      left: 'text-left',
    },
  },
  defaultVariants: {
    layout: 'center',
  },
})

export const iconContainerVariants = cva(
  'inline-flex items-center justify-center rounded-full bg-white shadow-sm border border-terracota-100 [&>div]:flex [&>div]:items-center [&>div]:justify-center',
  {
    variants: {
      size: {
        sm: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 md:mb-5',
        md: 'w-16 h-16 mb-6',
        lg: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-6 md:mb-8',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
)

export const iconVariants = cva('text-terracota-600 flex items-center justify-center', {
  variants: {
    size: {
      sm: 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8',
      md: 'w-8 h-8',
      lg: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export const titleVariants = cva('font-serif text-charcoal-800', {
  variants: {
    layout: {
      center: 'text-heading-1 mb-2 md:mb-3',
      left: 'text-heading-1 mb-3',
    },
  },
  defaultVariants: {
    layout: 'center',
  },
})

export const dividerVariants = cva('h-px bg-gold-400', {
  variants: {
    layout: {
      center: 'w-12 sm:w-16 mx-auto mb-3 md:mb-4',
      left: 'w-16 mb-3',
    },
  },
  defaultVariants: {
    layout: 'center',
  },
})

export const subtitleVariants = cva('text-charcoal-500 font-light', {
  variants: {
    layout: {
      center: 'text-lead max-w-2xl mx-auto',
      left: 'text-lead mb-4',
    },
  },
  defaultVariants: {
    layout: 'center',
  },
})

