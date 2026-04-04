import { ReactNode, useState, useEffect, useRef } from 'react'
import { TabBar, TabItem } from './index'

export interface TabViewItem extends TabItem {
  permission?: boolean
  showHidden?: boolean
  fallbackRoute?: string
  content: ReactNode
}

export interface TabViewProps {
  tabs: TabViewItem[]
  defaultTab?: string
  activeTab?: string
  onChange?: (tabId: string) => void
  variant?: 'default' | 'compact'
  className?: string
  contentClassName?: string
}

export function TabView({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  className = '',
  contentClassName = '',
}: TabViewProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    defaultTab || (tabs.length > 0 ? tabs[0].id : ''),
  )
  const [isLoading, setIsLoading] = useState(false)
  const prevTabRef = useRef<string | null>(null)

  // Se activeTab for fornecido, use-o em vez do estado interno
  const activeTab = controlledActiveTab ?? internalActiveTab

  useEffect(() => {
    if (controlledActiveTab) {
      setInternalActiveTab(controlledActiveTab)
    }
  }, [controlledActiveTab])

  // Skeleton durante troca de tab
  useEffect(() => {
    if (prevTabRef.current && prevTabRef.current !== activeTab) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300) // Duração do skeleton
      return () => clearTimeout(timer)
    }
    prevTabRef.current = activeTab
  }, [activeTab])

  const handleTabChange = (tabId: string) => {
    setInternalActiveTab(tabId)
    onChange?.(tabId)
  }

  const visibleTabs = tabs.filter((tab) => {
    if (tab.showHidden !== undefined) {
      return tab.showHidden !== true
    }

    if (!tab.permission) {
      return true
    }

    // Se permission é boolean, retorna o valor diretamente
    return tab.permission
  })

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  if (!activeTabData) {
    return (
      <div className={`flex flex-col gap-8 ${className}`}>
        <TabBar tabs={visibleTabs} activeTab={activeTab} onChange={handleTabChange} />
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs font-medium">Aba não encontrada</p>
          <p className="text-xs mt-0.5">A aba solicitada não existe ou foi removida.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <TabBar
        tabs={visibleTabs}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <div className={`mt-2 relative ${contentClassName}`}>
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
            <div className="h-32 bg-gray-200 rounded mt-4" />
          </div>
        ) : (
          <div key={activeTab}>
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        )}
      </div>
    </div>
  )
}
