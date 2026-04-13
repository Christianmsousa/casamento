import { IconProps } from './types'

export function ArrowUpIcon({
  width = '1.5rem',
  height = '1.5rem',
  className = '',
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
      <path
        d="M5 10l7-7m0 0l7 7m-7-7v18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
