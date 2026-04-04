import * as React from 'react'
import { IconProps } from '.'

function WalletIcon({
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
        <path d="M21 8.5H6a2 2 0 01-2-2v0a2 2 0 012-2h13a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2v-11" />
        <path d="M21 15.5h-3a2 2 0 01-2-2v0a2 2 0 012-2h3" />
      </g>
    </svg>
  )
}

export default WalletIcon
