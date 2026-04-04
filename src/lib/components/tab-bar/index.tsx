import { useState, useRef, useEffect, useCallback } from 'react'
import { Icon } from '../icons'
import type { IconName } from '../icons'
import { TabView } from './TabView'

export interface TabItem {
  id: string
  label: string
  icon?: IconName
  disabled?: boolean
  count?: number
}

export interface TabBarProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (tabId: string) => void
  fullWidth?: boolean
}

export function TabBar({ tabs, activeTab, onChange }: TabBarProps) {
  const [hoverTab, setHoverTab] = useState<string | null>(null)
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
  const [hoverIndicatorStyle, setHoverIndicatorStyle] =
    useState<React.CSSProperties>({})

  // Mapear o nome do ícone para o componente de ícone
  const getIcon = (iconName?: IconName) => {
    if (!iconName) return null

    const IconComponent =
      Icon[
        iconName
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('') as keyof typeof Icon
      ]

    return IconComponent ? (
      <IconComponent width="1.25rem" height="1.25rem" />
    ) : null
  }

  // Função para atualizar a posição dos indicadores
  const updateIndicatorPosition = useCallback(() => {
    const activeTabElement = tabsRef.current.get(activeTab)
    const containerElement = containerRef.current

    if (activeTabElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect()
      const tabRect = activeTabElement.getBoundingClientRect()

      setIndicatorStyle({
        width: `${tabRect.width}px`,
        transform: 'scaleX(1)',
        left: `${tabRect.left - containerRect.left}px`,
        opacity: 1,
      })

      // Atualizar também o indicador de hover se houver
      if (hoverTab && hoverTab !== activeTab) {
        const hoverTabElement = tabsRef.current.get(hoverTab)
        if (hoverTabElement) {
          const hoverTabRect = hoverTabElement.getBoundingClientRect()
          setHoverIndicatorStyle({
            width: `${hoverTabRect.width}px`,
            transform: 'scaleX(0.8)',
            left: `${hoverTabRect.left - containerRect.left}px`,
            opacity: 0.5,
          })
        }
      }
    }
  }, [activeTab, hoverTab])

  // Atualizar posição do indicador quando o tab ativo muda
  useEffect(() => {
    updateIndicatorPosition()
  }, [updateIndicatorPosition, tabs])

  // Atualizar posição do indicador de hover
  useEffect(() => {
    if (!hoverTab || hoverTab === activeTab) {
      setHoverIndicatorStyle({ opacity: 0 })
      return
    }
    updateIndicatorPosition()
  }, [hoverTab, activeTab, updateIndicatorPosition])

  // Adicionar listener de resize
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(updateIndicatorPosition)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateIndicatorPosition])

  return (
    <div className="relative border-b border-neutral-200">
      <div ref={containerRef} className="flex w-full">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          const isFirstTab = index === 0

          return (
            <button
              key={tab.id}
              type="button"
              ref={(el) => {
                if (el) tabsRef.current.set(tab.id, el)
                else tabsRef.current.delete(tab.id)
              }}
              className={`group relative flex items-center gap-2 py-2.5 pr-3 ${
                isFirstTab ? 'pl-0' : 'pl-3'
              } text-left text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'text-neutral-dark-950'
                  : 'text-neutral-light-700 hover:text-neutral-dark-950'
              } ${tab.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              onClick={() => !tab.disabled && onChange(tab.id)}
              onMouseEnter={() => setHoverTab(tab.id)}
              onMouseLeave={() => setHoverTab(null)}
              disabled={tab.disabled}
              role="tab"
              aria-selected={isActive}
              tabIndex={tab.disabled ? -1 : 0}
            >
              {tab.icon && (
                <span
                  className={`flex-shrink-0 ${isActive ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900'}`}
                >
                  {getIcon(tab.icon)}
                </span>
              )}

              <span className="flex-shrink-0">{tab.label}</span>

              {typeof tab.count !== 'undefined' && (
                <span
                  className={`inline-flex h-4 min-w-4 flex-shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-medium ${
                    isActive
                      ? 'bg-neutral-700 text-white'
                      : 'bg-neutral-200 text-neutral-700 group-hover:bg-neutral-300 group-hover:text-neutral-900'
                  } `}
                >
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Indicador ativo - cinza escuro quando selecionado */}
      <div
        className="absolute bottom-0 h-[2px] bg-neutral-700 transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />

      {/* Indicador hover - cinza médio no hover */}
      <div
        className="absolute bottom-0 h-[2px] bg-neutral-400 transition-all duration-300 ease-in-out"
        style={hoverIndicatorStyle}
      />
    </div>
  )
}

export { TabView }
export type { TabViewItem, TabViewProps } from './TabView'
