import * as React from 'react'
import { IconProps } from '.'

function HouseIcon({
  width = '1.5rem',
  height = '1.5rem',
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 2 23 23`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ verticalAlign: 'middle' }}
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
          d="M9.5 20.5V16a2.5 2.5 0 012.5-2.5v0a2.5 2.5 0 012.5 2.5v4.5H20v-8.586a2 2 0 00-.586-1.414l-6.707-6.707a.999.999 0 00-1.414 0L4.586 10.5A2 2 0 004 11.914V20.5h5.5z"
        />
        <path />
      </g>
    </svg>
  )
}

export default HouseIcon
