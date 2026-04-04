import { tv } from 'tailwind-variants'

const sidebarLogo = tv({
  base: 'flex items-center origin-left transition-all duration-500 ease-in-out gap-2 ',
  variants: {
    visible: {
      true: 'opacity-100 w-[14rem] overflow-visible',
      false: 'opacity-0 w-0 overflow-hidden',
    },
  },
  defaultVariants: {
    visible: false,
  },
})

const subSideBar = tv({
  base: 'flex h-full origin-left flex-col truncate overflow-hidden bg-white border-r border-gray-200 shadow-lg transition-all duration-500 ease-in-out z-[10000]',
  variants: {
    visible: {
      true: 'opacity-100 w-[16.85rem]',
      false: 'opacity-0 w-0 pointer-events-none',
    },
  },
  defaultVariants: {
    visible: false,
  },
})

const sidebarContent = tv({
  base: 'flex items-center origin-left transition-all duration-500 ease-in-out',
  variants: {
    visible: {
      true: 'opacity-100 w-[14rem]',
      false: 'opacity-0 w-0',
    },
  },
  defaultVariants: {
    visible: false,
  },
})

export { sidebarContent, sidebarLogo, subSideBar }
