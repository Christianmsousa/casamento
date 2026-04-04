import * as React from 'react'
import { IconProps } from '.'

function InfoIcon({
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
        <path d="M11.999 8a.25.25 0 10.002.5A.25.25 0 0012 8" />
        <path
          clipRule="evenodd"
          d="M12 21v0a9 9 0 01-9-9v0a9 9 0 019-9v0a9 9 0 019 9v0a9 9 0 01-9 9z"
        />
        <path d="M12 12v5" />
      </g>
    </svg>
  )
}

export default InfoIcon
