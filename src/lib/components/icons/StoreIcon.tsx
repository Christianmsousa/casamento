import * as React from 'react'
import { IconProps } from '.'

function StoreIcon({
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
        <path d="M21 21H3" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.309 6.51l1.628-2.578A2 2 0 015.628 3h12.744a2 2 0 011.69.932l1.63 2.579A2 2 0 0122 7.579V10a1 1 0 01-1 1H3a1 1 0 01-1-1V7.579a2 2 0 01.309-1.068z"
        />
        <path d="M10 16h10M4 21V11M20 21V11M10 21V11" />
      </g>
    </svg>
  )
}

export default StoreIcon
