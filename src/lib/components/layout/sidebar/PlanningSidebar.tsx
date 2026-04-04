'use client'

import { SideBar } from '@/lib/components/sidebar'
import type { SideBarItemProps } from '@/lib/components/sidebar/types'

const contentItems: SideBarItemProps[] = [
  {
    icon: 'dashboard',
    text: 'Início',
    route: '/planning',
  },
  {
    icon: 'users',
    text: 'Convidados',
    route: '/planning/guests',
  },
  {
    icon: 'settings',
    text: 'Configurações',
    route: '/planning/settings',
  },
]

const bottomItems: SideBarItemProps[] = [
  {
    icon: 'help',
    text: 'Ajuda',
    route: '/ajuda',
  },
]

export function PlanningSidebar() {
  return (
    <SideBar.Root
      header={{
        storeName: 'Planejamento',
        logoSrc: '/images/logo.png',
      }}
      content={contentItems}
      bottom={bottomItems}
    />
  )
}
