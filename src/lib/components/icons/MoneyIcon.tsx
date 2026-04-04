import * as React from 'react'
import { IconProps } from '.'

function MoneyIcon({
  width = '1.5rem',
  height = '1.5rem',
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 2 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 6v1.5M18.364 5.636a9 9 0 010 12.728 9 9 0 110-12.728M12 18v-1.5" />
        <path d="M9 14.255v0a2.25 2.25 0 002.25 2.25h1.643A2.107 2.107 0 0015 14.398v0c0-.966-.657-1.808-1.594-2.043l-2.812-.705A2.106 2.106 0 019 9.607v0C9 8.443 9.943 7.5 11.107 7.5h1.643A2.25 2.25 0 0115 9.75v0" />
      </g>
    </svg>
  )
}

export default MoneyIcon
