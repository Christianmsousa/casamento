import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface StatusTagProps {
  children: ReactNode
  status?: 'primary' | 'secondary' | 'tertiary'
  showDot?: boolean
  rounded?: string
  size?: 'sm' | 'md'
  textTransform?: 'none' | 'capitalize' | 'uppercase'
  className?: string
}

const statusStyles: Record<NonNullable<StatusTagProps['status']>, string> = {
  primary: 'bg-blue-100 text-blue-900',
  secondary: 'bg-gray-100 text-gray-800',
  tertiary: 'bg-slate-100 text-slate-800 border border-slate-200/80',
}

const sizeStyles: Record<NonNullable<StatusTagProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export function StatusTag({
  children,
  status = 'tertiary',
  showDot = true,
  rounded = 'rounded-md',
  size = 'md',
  textTransform = 'none',
  className,
}: StatusTagProps) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 font-medium',
        statusStyles[status],
        sizeStyles[size],
        rounded,
        textTransform === 'capitalize' && 'capitalize',
        textTransform === 'uppercase' && 'uppercase',
        className,
      )}
    >
      {showDot && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" aria-hidden />
      )}
      {children}
    </span>
  )
}
