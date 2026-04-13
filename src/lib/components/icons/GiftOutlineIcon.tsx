import type { IconProps } from './types'

/**
 * Presente só em contorno — visual mais leve que o GiftIcon preenchido.
 * Baseado no ícone "gift" do Feather (MIT).
 */
export function GiftOutlineIcon({
  width = '2rem',
  height = '2rem',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
      </g>
    </svg>
  )
}
