'use client'

import { SidebarProvider, useSidebar } from '@/lib/components/sidebar/context'
import { PlanningSidebar } from '@/lib/components/layout/sidebar/PlanningSidebar'
import { BottomNavigation } from '@/lib/components/layout/bottom-navigation'

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { sideBarData } = useSidebar()
  
  return (
    <div className="flex h-screen bg-gray-50">
      <PlanningSidebar />
      <div
        className={`flex w-full flex-col overflow-y-auto p-8 bg-gray-50 transition-all duration-500 ${
          sideBarData.mainSidebar ? 'ml-[14rem]' : 'ml-[5rem]'
        }`}
      >
        {children}
      </div>
      <BottomNavigation />
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  )
}

