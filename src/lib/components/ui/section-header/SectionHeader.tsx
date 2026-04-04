import { SectionHeaderProps } from './types'
import { 
  sectionHeaderVariants, 
  iconContainerVariants, 
  iconVariants,
  titleVariants,
  dividerVariants,
  subtitleVariants,
} from './styles'
import { cn } from '@/lib/utils/cn'

export function SectionHeader({
  icon,
  title,
  subtitle,
  className = '',
  iconSize = 'sm',
  layout = 'center',
}: SectionHeaderProps) {
  return (
    <div className={cn(sectionHeaderVariants({ layout }), className)}>
      <div className={iconContainerVariants({ size: iconSize })}>
        <div className={iconVariants({ size: iconSize })}>
          {icon}
        </div>
      </div>
      <h2 className={titleVariants({ layout })}>{title}</h2>
      <div className={dividerVariants({ layout })} />
      {subtitle && (
        <p className={subtitleVariants({ layout })}>{subtitle}</p>
      )}
    </div>
  )
}

