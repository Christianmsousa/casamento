import { cn } from '@/lib/utils/cn'

export interface MultiSelectAvatarProps {
  name: string
  avatarUrl?: string
  size?: 'sm' | 'md'
  className?: string
}

const sizeClasses: Record<NonNullable<MultiSelectAvatarProps['size']>, string> = {
  sm: 'h-8 w-8 min-h-8 min-w-8 text-[10px]',
  md: 'h-10 w-10 min-h-10 min-w-10 text-xs',
}

/**
 * Miniatura de avatar + uso em selects (convidados, etc.).
 */
export function MultiSelectAvatar({
  name,
  avatarUrl,
  size = 'sm',
  className,
}: MultiSelectAvatarProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className={cn('flex shrink-0 items-center gap-2', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-full bg-neutral-200 ring-1 ring-neutral-300',
          sizeClasses[size],
        )}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- URLs dinâmicas / storage
          <img
            src={avatarUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium text-neutral-700">
            {initials || '?'}
          </span>
        )}
      </div>
    </div>
  )
}
