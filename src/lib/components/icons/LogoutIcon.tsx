import * as React from 'react'
import { IconProps } from '.'

function LogoutIcon({
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
        <path d="M21.004 12l-5.002-5.002M16.002 17.002L21.004 12M21.004 12H9.999M9.999 21.004H7.665a4.669 4.669 0 01-4.669-4.669V8A4.669 4.669 0 017.665 3.33h2.334" />
      </g>
    </svg>
  )
}

export default LogoutIcon
