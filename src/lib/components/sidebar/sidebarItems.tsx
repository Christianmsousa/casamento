import { useSidebar } from './context'
import { sidebarContent } from './SideBarVariants'
import { Icon } from '../icons'

interface SidebarItemsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  text: string
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  hasRoute?: boolean
}

export function SidebarItems({
  icon,
  text,
  active,
  onClick,
  hasRoute = false,
  ...props
}: SidebarItemsProps) {
  const { sideBarData } = useSidebar()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
  }

  return (
    <button
      tabIndex={0}
      className={`group relative flex origin-left cursor-pointer items-center rounded-lg border border-transparent p-4 text-center transition-all duration-300 ease-in-out hover:border-terracota-200 hover:bg-terracota-50 ${
        active ? 'border-terracota-300 bg-terracota-50' : ''
      }`}
      onClick={handleClick}
      title={
        hasRoute
          ? `${text} (Ctrl+Click ou Scroll do mouse para abrir em nova aba)`
          : text
      }
      {...props}
    >
      <div
        className={`flex flex-shrink-0 cursor-pointer group-hover:text-terracota-600 ${active ? 'text-terracota-600' : 'text-gray-500'}`}
      >
        {icon}
      </div>
      <div className={sidebarContent({ visible: sideBarData.mainSidebar })}>
        <div
          className={`flex items-center justify-between ${
            !sideBarData.mainSidebar ? 'pointer-events-none' : ''
          }`}
        >
          <span
            className={`ml-2 truncate leading-snug text-gray-600 group-hover:text-terracota-700 ${
              active ? 'text-terracota-700 font-medium' : ''
            }`}
          >
            {text}
          </span>
          {/* Indicador visual para nova aba */}
          {hasRoute && sideBarData.mainSidebar && (
            <Icon.ArrowRight
              width="0.75rem"
              height="0.75rem"
              className="ml-1 text-terracota-500 opacity-0 transition-opacity group-hover:opacity-100"
            />
          )}
        </div>
      </div>
      {!sideBarData.mainSidebar && (
        <div
          className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-gray-900 px-2 py-1 text-sm text-white opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 shadow-lg`}
        >
          {text}
        </div>
      )}
    </button>
  )
}
