import { ReactNode } from 'react'

export interface SectionHeaderProps {
  icon: ReactNode
  title: string
  subtitle?: string
  className?: string
  iconSize?: 'sm' | 'md' | 'lg'
  layout?: 'center' | 'left'
}

