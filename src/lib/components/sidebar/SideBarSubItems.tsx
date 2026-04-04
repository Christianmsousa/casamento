import { useRouter } from 'next/navigation'
import { SideBarSubItemsProps } from './types'
import { useSidebar } from './context'

export function SideBarSubItems({ text, route }: SideBarSubItemsProps) {
  const { resetProvider } = useSidebar()
  const router = useRouter()

  const handlePush =
    (route: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      // Detectar Ctrl+Click para abrir em nova aba
      const isCtrlClick = event.ctrlKey || event.metaKey

      if (isCtrlClick) {
        // Abrir em nova aba
        window.open(route, '_blank')
      } else {
        // Navegação normal
        resetProvider()
        router.push(route)
      }
    }

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Middle click (button === 1) para abrir em nova aba
    if (event.button === 1) {
      event.preventDefault()
      window.open(route, '_blank')
    }
  }

  return (
    <button
      className="group flex w-full rounded-lg p-4 hover:bg-terracota-50 transition-colors"
      onClick={handlePush(route)}
      onMouseDown={handleMouseDown}
    >
      <span className="leading-[1.375rem] text-gray-600 group-hover:text-terracota-700 transition-colors">
        {text}
      </span>
    </button>
  )
}
