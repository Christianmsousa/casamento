import { Tooltip } from '@/lib/components/tooltip'
import { IconName, renderIcon } from '@/lib/components/icons'

interface InputHelpTextProps {
  content: string | React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  icon?: IconName // Nome do ícone (seguindo padrão da sidebar)
}

export function InputHelpText({
  content,
  placement = 'top',
  size = 'lg',
  icon,
}: InputHelpTextProps) {
  const iconProps = {
    width: '1.12rem',
    height: '1.12rem',
    className:
      'text-brand-blue-600 transition-colors hover:text-brand-blue-700',
  }

  return (
    <Tooltip content={content} placement={placement} size={size}>
      {renderIcon(icon, iconProps)}
    </Tooltip>
  )
}
