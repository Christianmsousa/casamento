'use client'

import React from 'react'
import Image from 'next/image'
import { Icon, IconName, renderIcon } from '../icons'
import { useSidebar } from './context'
import { SideBarHeaderProps } from './types'
import { sidebarLogo } from './SideBarVariants'

export function SideBarHeader({
  storeName,
  storeIcon,
  logoSrc,
}: SideBarHeaderProps) {
  const { sideBarData, toggleSidebar } = useSidebar()
  const currentStoreIcon = (storeIcon || 'house') as IconName

  const logoExpanded = logoSrc ? (
    <div className="flex w-full min-w-0 items-center gap-2 px-1 py-0.5">
      <Image
        src={logoSrc}
        alt=""
        width={180}
        height={48}
        className="h-[2.25rem] w-auto max-w-[55%] shrink-0 object-contain object-left"
        priority
      />
      <p className="min-w-0 truncate text-sm font-medium leading-[1.375rem] text-gray-900">
        {storeName}
      </p>
    </div>
  ) : null

  const logoCollapsed = logoSrc ? (
    <div className="relative flex h-[2.625rem] w-[2.625rem] items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white">
      <Image
        src={logoSrc}
        alt={storeName}
        width={42}
        height={42}
        className="h-full w-full object-contain p-0.5"
        priority
      />
    </div>
  ) : null

  const iconExpanded = !logoSrc ? (
    <div className="flex w-full items-center gap-2 px-1 py-0.5">
      <div className="flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-lg bg-terracota-100">
        {renderIcon(currentStoreIcon, {
          width: '1.5rem',
          height: '1.5rem',
          className: 'text-terracota-600',
        })}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="truncate text-sm font-medium leading-[1.375rem] text-gray-900">
          {storeName}
        </p>
      </div>
    </div>
  ) : null

  const iconCollapsed = !logoSrc ? (
    <div className="flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-lg bg-terracota-100">
      {renderIcon(
        currentStoreIcon,
        {
          width: '1.5rem',
          height: '1.5rem',
          className: 'text-terracota-600',
        },
        'House',
      )}
    </div>
  ) : null

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`${sidebarLogo({ visible: sideBarData.mainSidebar })} relative`}
      >
        {sideBarData.mainSidebar
          ? logoExpanded || iconExpanded
          : logoCollapsed || iconCollapsed}
      </div>

      <button
        className={`group cursor-pointer text-gray-500 transition-all duration-500 hover:text-terracota-600 ${
          sideBarData.mainSidebar ? 'ml-3' : ''
        }`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <Icon.Group width="1.5rem" height="1.5rem" />

        {!sideBarData.mainSidebar && (
          <div className="invisible absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded-md bg-gray-900 px-2 py-1 text-sm text-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
            Abrir menu
          </div>
        )}
        {sideBarData.mainSidebar && (
          <div className="invisible absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded-md bg-gray-900 px-2 py-1 text-sm text-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
            Fechar menu
          </div>
        )}
      </button>
    </div>
  )
}
