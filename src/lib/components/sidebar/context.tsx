'use client'
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react'
import { SideBarSubOption } from './types'

type SideBarData = {
  mainSidebar: boolean
  subSidebar: boolean
}

export interface SidebarContextProps {
  sideBarData: SideBarData
  activeItem: number | null
  openSideBar: () => void
  closeSidebar: () => void
  openSubSidebar: () => void
  closeSubSidebar: () => void
  activeOptions: SideBarSubOption[][] | undefined
  handleOpenSubSidebar: (options?: SideBarSubOption[][], index?: number) => void
  handleOnClickOpenSubSidebar: (
    options?: SideBarSubOption[][],
    index?: number,
  ) => void
  handleCloseSubSidebar: () => void
  toggleSidebar: () => void
  resetProvider: () => void
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

// Removido cache local - agora integra com endpoints

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sideBarData, setSideBarData] = useState<SideBarData>({
    mainSidebar: false,
    subSidebar: false,
  })

  const [activeOptions, setActiveOptions] = useState<
    SideBarSubOption[][] | undefined
  >(undefined)
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  const resetProvider: () => void = () => {
    setSideBarData({ mainSidebar: false, subSidebar: false })
    setActiveOptions(undefined)
    setActiveItem(null)

    clearTimeout(closeTimeoutRef.current)
  }

  function openSideBar() {
    setSideBarData((prev) => ({ ...prev, mainSidebar: true }))
  }

  function closeSidebar() {
    setSideBarData((prev) => ({ ...prev, mainSidebar: false }))
  }

  function openSubSidebar() {
    setSideBarData((prev) => ({ ...prev, subSidebar: true }))
  }

  function closeSubSidebar() {
    setSideBarData((prev) => ({ ...prev, subSidebar: false }))
  }

  function handleOpenSubSidebar(
    options?: SideBarSubOption[][],
    index?: number,
  ) {
    clearTimeout(closeTimeoutRef.current)
    if (options && sideBarData.mainSidebar) {
      setActiveOptions(options)
      if (index !== undefined) {
        setActiveItem(index)
      }
    }
  }

  function handleOnClickOpenSubSidebar(
    options?: SideBarSubOption[][],
    index?: number,
  ) {
    clearTimeout(closeTimeoutRef.current)
    if (options) {
      openSideBar()
      setActiveOptions(options)
      closeSubSidebar()
      if (index !== undefined) {
        setActiveItem(index)
      }
    }
  }

  function toggleSidebar() {
    if (sideBarData.mainSidebar) {
      closeSidebar()
      closeSubSidebar()
    } else {
      openSideBar()
    }
  }

  function handleCloseSubSidebar() {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveOptions(undefined)
      setActiveItem(null)
    }, 200)
  }

  useEffect(() => {
    return () => {
      clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        sideBarData,
        openSideBar,
        closeSidebar,
        openSubSidebar,
        closeSubSidebar,
        activeOptions,
        handleOpenSubSidebar,
        handleOnClickOpenSubSidebar,
        handleCloseSubSidebar,
        toggleSidebar,
        activeItem,
        resetProvider,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de um SidebarProvider')
  }
  return context
}
