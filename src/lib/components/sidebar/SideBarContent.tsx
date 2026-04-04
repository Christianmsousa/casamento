'use client'
import { useSidebar } from './context'
import { Icon, IconName } from '../icons'
import { SideBarSubItems } from './SideBarSubItems'
import { SideBarProps, SideBarItemProps } from './types'
import { SideBarHeader } from './SidebarHeader'
import { subSideBar } from './SideBarVariants'
import { useRouter, usePathname } from 'next/navigation'
import { SidebarItems } from './sidebarItems'

export const sidebarIcons: Partial<Record<IconName, React.ReactNode>> = {
  box: <Icon.Box width="1.5rem" height="1.5rem" />,
  house: <Icon.House width="1.5rem" height="1.5rem" />,
  money: <Icon.Money width="1.5rem" height="1.5rem" />,
  analytique: <Icon.Analytique width="1.5rem" height="1.5rem" />,
  shop: <Icon.Shop width="1.5rem" height="1.5rem" />,
  cart: <Icon.Cart width="1.5rem" height="1.5rem" />,
  wallet: <Icon.Wallet width="1.5rem" height="1.5rem" />,
  help: <Icon.Help width="1.5rem" height="1.5rem" />,
  settings: <Icon.Settings width="1.5rem" height="1.5rem" />,
  logout: <Icon.Logout width="1.5rem" height="1.5rem" />,
  'arrow-right': <Icon.ArrowRight width="1.5rem" height="1.5rem" />,
  group: <Icon.Group width="1.5rem" height="1.5rem" />,
  lock: <Icon.Lock width="1.5rem" height="1.5rem" />,
  'user-square': <Icon.UserSquare width="1.5rem" height="1.5rem" />,
  store: <Icon.Store width="1.5rem" height="1.5rem" />,
  catalog: <Icon.Catalog width="1.5rem" height="1.5rem" />,
  dashboard: <Icon.Dashboard width="1.5rem" height="1.5rem" />,
  users: <Icon.Users width="1.5rem" height="1.5rem" />,
}

export function SideBarRoot({ content, bottom, header }: SideBarProps) {
  return <SideBarContent content={content} bottom={bottom} header={header} />
}

function SideBarContent({ content, bottom, header }: SideBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const {
    sideBarData,
    activeItem,
    activeOptions,
    handleOnClickOpenSubSidebar,
    handleOpenSubSidebar,
    handleCloseSubSidebar,
    toggleSidebar,
  } = useSidebar()

  const handleItemClick = (
    item: SideBarItemProps,
    event: React.MouseEvent,
    index?: number,
  ) => {
    const isCtrlClick = event.ctrlKey || event.metaKey

    if (item.onClick) {
      item.onClick()
    } else if (item.route) {
      if (isCtrlClick) {
        window.open(item.route, '_blank')
      } else {
        router.push(item.route)
      }
    } else if (item.options) {
      handleOnClickOpenSubSidebar(item.options, index)
    }
  }

  const handleItemMouseDown = (
    item: SideBarItemProps,
    event: React.MouseEvent,
  ) => {
    // Middle click (button === 1) para abrir em nova aba
    if (event.button === 1 && item.route) {
      event.preventDefault()
      window.open(item.route, '_blank')
    }
  }

  const normalize = (route?: string) => {
    if (!route) return undefined
    const path = route.split('?')[0]
    if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
    return path
  }

  const isItemActive = (item: SideBarItemProps) => {
    const current = normalize(pathname)
    const itemRoute = normalize(item.route)

    if (
      current &&
      itemRoute &&
      (current === itemRoute || current.startsWith(itemRoute))
    ) {
      return true
    }
    if (item.options && current) {
      for (const group of item.options) {
        for (const opt of group) {
          const optRoute = normalize(opt.route)
          if (
            optRoute &&
            (current === optRoute || current.startsWith(optRoute))
          ) {
            return true
          }
        }
      }
    }
    return false
  }

  const hasAnyHover = activeItem !== null && !!activeOptions

  return (
    <>
      <aside className="fixed left-0 top-0 z-[9999] h-screen">
        <nav className="flex h-full">
          <div className="flex h-full flex-col gap-8 overflow-visible bg-white border-r border-gray-200 px-3 py-8 shadow-sm">
            <SideBarHeader
              storeName={header.storeName}
              storeIcon={header.storeIcon}
              logoSrc={header.logoSrc}
            />
            <div className="flex flex-1 flex-col justify-between">
              <ul className="flex flex-col gap-2">
                {content.map((item, index) => {
                  const isActive = isItemActive(item)
                  const isHovered = activeItem === index && !!activeOptions
                  // Lógica corrigida: mostrar apenas hover OU (ativo E sem hover global)
                  const isSelected = isHovered || (isActive && !hasAnyHover)

                  return (
                    <SidebarItems
                      key={index}
                      active={isSelected}
                      icon={sidebarIcons[item.icon]}
                      text={item.text}
                      onClick={(event: React.MouseEvent) =>
                        handleItemClick(item, event, index)
                      }
                      onMouseDown={(event: React.MouseEvent) =>
                        handleItemMouseDown(item, event)
                      }
                      hasRoute={!!item.route}
                      onMouseEnter={() =>
                        handleOpenSubSidebar(item.options, index)
                      }
                      onMouseLeave={handleCloseSubSidebar}
                    />
                  )
                })}
              </ul>
              <ul className="flex flex-col gap-2">
                <hr className="border-gray-200" />
                {bottom.map((item, index) => {
                  const bottomIndex = content.length + index
                  const isActive = isItemActive(item)
                  const isHovered =
                    activeItem === bottomIndex && !!activeOptions
                  // Lógica corrigida: mostrar apenas hover OU (ativo E sem hover global)
                  const isSelected = isHovered || (isActive && !hasAnyHover)

                  return (
                    <SidebarItems
                      key={index}
                      active={isSelected}
                      icon={sidebarIcons[item.icon]}
                      text={item.text}
                      onClick={(event: React.MouseEvent) =>
                        handleItemClick(item, event, bottomIndex)
                      }
                      onMouseDown={(event: React.MouseEvent) =>
                        handleItemMouseDown(item, event)
                      }
                      hasRoute={!!item.route}
                      onMouseEnter={() =>
                        handleOpenSubSidebar(item.options, bottomIndex)
                      }
                      onMouseLeave={handleCloseSubSidebar}
                    />
                  )
                })}
              </ul>
            </div>
          </div>
          <div
            className={`${subSideBar({
              visible: sideBarData.mainSidebar && !!activeOptions,
            })} bg-white`}
            onMouseEnter={() => handleOpenSubSidebar()}
            onMouseLeave={handleCloseSubSidebar}
          >
            <div className="flex flex-col gap-2 px-3 py-8">
              {activeOptions?.map((group, groupIdx) => (
                <ul key={groupIdx} className="flex flex-col gap-2">
                  {group.map((option, idx) => (
                    <SideBarSubItems
                      key={idx}
                      text={option.name}
                      route={option.route}
                    />
                  ))}

                  {groupIdx < activeOptions.length - 1 && (
                    <hr className="w-full border-gray-200" />
                  )}
                </ul>
              ))}
            </div>
          </div>
        </nav>
      </aside>
      {sideBarData.mainSidebar && (
        <button
          className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}
