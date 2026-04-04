import * as React from 'react'
import { IconProps } from '.'

function LockIcon({
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
      strokeWidth={1.5}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 21.727H7a2 2 0 01-2-2v-8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z"
        />
        <path d="M16 9.727v-2a4 4 0 00-4-4v0a4 4 0 00-4 4v2" />
        <path d="M11.998 15.227a.5.5 0 10.004 1 .5.5 0 00-.004-1" />
      </g>
    </svg>
  )
}

export default LockIcon
