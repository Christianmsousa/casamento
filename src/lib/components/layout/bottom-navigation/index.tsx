'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/lib/components/icons'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/planning', label: 'Início', icon: Icon.Dashboard },
  { href: '/planning/settings', label: 'Mais', icon: Icon.Settings },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/planning' && pathname?.startsWith(item.href))
          const IconComponent = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200',
                isActive
                  ? 'text-terracota-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <IconComponent 
                width="1.5rem" 
                height="1.5rem" 
                className={cn(
                  'transition-all duration-200',
                  isActive && 'scale-110'
                )}
              />
              <span className={cn(
                'text-xs font-medium',
                isActive && 'font-semibold'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

