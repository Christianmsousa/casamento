'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface TableProps {
  children: ReactNode
  className?: string
}

interface TableHeaderProps {
  children: ReactNode
  className?: string
}

interface TableBodyProps {
  children: ReactNode
  className?: string
}

interface TableRowProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

interface TableHeadProps {
  children: ReactNode
  className?: string
  mobileHidden?: boolean
}

interface TableCellProps {
  children: ReactNode
  className?: string
  mobileHidden?: boolean
  mobileLabel?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className={cn('w-full text-sm', className)}>
          {children}
        </table>
      </div>
    </div>
  )
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn('bg-gray-50 border-b border-gray-200', className)}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={cn('divide-y divide-gray-200', className)}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr 
      className={cn(
        'hover:bg-gray-50 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className, mobileHidden = false }: TableHeadProps) {
  return (
    <th className={cn(
      'px-3 py-2 text-left text-xs font-semibold text-gray-700',
      mobileHidden && 'hidden md:table-cell',
      className
    )}>
      {children}
    </th>
  )
}

export function TableCell({ children, className, mobileHidden = false, mobileLabel }: TableCellProps) {
  return (
    <td className={cn(
      'px-3 py-2',
      mobileHidden && 'hidden md:table-cell',
      className
    )}>
      {/* Mobile: Show with label */}
      <div className="md:hidden">
        {mobileLabel && (
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500">
              {mobileLabel}:
            </span>
            <div className="flex-1 text-right">
              {children}
            </div>
          </div>
        )}
        {!mobileLabel && !mobileHidden && children}
      </div>
      {/* Desktop: Show normally */}
      <div className="hidden md:block">
        {children}
      </div>
    </td>
  )
}

