import { IconProps } from './types'

export function BrandIcon({
  className,
  width = '1.5rem',
  height = '1.5rem',
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Prédio/empresa */}
      <path
        d="M4 21V7L12 3L20 7V21H4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Janelas */}
      <rect
        x="8"
        y="9"
        width="2"
        height="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="14"
        y="9"
        width="2"
        height="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="8"
        y="13"
        width="2"
        height="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="14"
        y="13"
        width="2"
        height="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Porta */}
      <rect
        x="11"
        y="17"
        width="2"
        height="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}
