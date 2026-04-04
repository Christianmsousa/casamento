import * as React from 'react'
import { IconProps } from '.'

function BoxIcon({
  width = '1.5rem',
  height = '1.5rem',
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
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
          d="M21 7H3a1 1 0 01-1-1V4a1 1 0 011-1h18a1 1 0 011 1v2a1 1 0 01-1 1z"
        />
        <path d="M9 11h6M20.667 7v12a2 2 0 01-2 2H5.333a2 2 0 01-2-2V7" />
      </g>
    </svg>
  )
}

export default BoxIcon
