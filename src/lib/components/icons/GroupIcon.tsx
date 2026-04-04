import * as React from 'react'
import { IconProps } from '.'

function GroupIcon({
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
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.367 20.896l-8-2.666A2 2 0 014 16.332V5.002a2 2 0 012.632-1.897l8 2.666A2 2 0 0116 7.67v11.33a2 2 0 01-2.633 1.897z"
        />
        <path d="M7 9l6 2M7 13l6 2M6 3h12a2 2 0 012 2v11a2 2 0 01-2 2h-2" />
      </g>
    </svg>
  )
}

export default GroupIcon
