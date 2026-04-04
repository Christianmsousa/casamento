import * as React from 'react'
import { IconProps } from '.'

function CheckboxOffIcon({
  width = '1,375rem',
  height = '1,375rem',
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
          d="M18 20H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z"
        />
      </g>
    </svg>
  )
}

export default CheckboxOffIcon
