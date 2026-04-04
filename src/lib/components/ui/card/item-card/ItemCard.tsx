import { Card } from '../Card'
import { Tooltip } from '@/lib/components/tooltip'
import { Icon } from '@/lib/components/icons'

export interface ItemAction {
  icon: keyof typeof Icon
  tooltip: string
  onClick: () => void
  className?: string
  disabled?: boolean
  disabledTooltip?: string
}

export interface ItemCardProps {
  title: string
  description?: string
  actions?: ItemAction[]
  variant?: 'default' | 'primary'
  className?: string
  avatarUrl?: string | null
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  showAvatar?: boolean
}

export function ItemCard({
  title,
  description,
  actions = [],
  variant = 'primary',
  className = '',
  avatarUrl,
  icon,
  size = 'sm',
  showAvatar = false,
}: ItemCardProps) {
  const hasIcon = !!icon
  const hasAvatar = showAvatar || avatarUrl !== undefined
  const showLeftContent = hasIcon || hasAvatar

  return (
    <Card variant={variant} className={className}>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          {showLeftContent && (
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-100">
              {icon ? (
                <div className="flex h-5 w-5 items-center justify-center text-brand-blue-600">
                  {icon}
                </div>
              ) : (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue-600 text-xs font-semibold">
                  {title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-semibold text-neutral-900">
              {title}
            </h4>
            {description && (
              <p className="whitespace-pre-line text-sm text-neutral-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions.length > 0 && (
          <div className="flex items-center gap-1">
            {actions.map((action, index) => {
              const IconComponent = Icon[action.icon]
              const isDisabled = action.disabled
              const tooltipContent =
                isDisabled && action.disabledTooltip
                  ? action.disabledTooltip
                  : action.tooltip

              const isLongTooltip = tooltipContent.length > 50

              return (
                <Tooltip
                  key={index}
                  content={tooltipContent}
                  size={isLongTooltip ? 'lg' : 'md'}
                >
                  <button
                    className={`rounded-lg p-1.5 ${
                      isDisabled
                        ? 'cursor-not-allowed text-neutral-300 opacity-50'
                        : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600'
                    } ${action.className || ''}`}
                    onClick={isDisabled ? undefined : action.onClick}
                    disabled={isDisabled}
                  >
                    <IconComponent className="text-neutral-dark-950 w-4 h-4" />
                  </button>
                </Tooltip>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
