import * as React from 'react'
import { IconProps } from '.'

function SettingsIcon({
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
        <path d="M18 5h3M3 5h11M10 12h11M3 12h3M18 19h3M3 19h11M17.414 3.586a2 2 0 11-2.828 2.828 2 2 0 012.828-2.828M9.414 10.586a2 2 0 11-2.828 2.828 2 2 0 012.828-2.828M17.414 17.586a2 2 0 11-2.828 2.828 2 2 0 012.828-2.828" />
      </g>
    </svg>
  )
}

export default SettingsIcon
