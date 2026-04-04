import * as React from 'react'
import { IconProps } from '.'

function ArrowRightIcon({
  width = '1.5rem',
  height = '1.5625rem',
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
        <path d="M19 12.727H5M14 17.727l5-5M14 7.727l5 5" />
      </g>
    </svg>
  )
}

export default ArrowRightIcon
