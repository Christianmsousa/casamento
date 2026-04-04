import * as React from 'react'
import { IconProps } from '.'

function HelpIcon({
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
          d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
        />
        <path d="M12 13.249v-.25c0-.817.505-1.26 1.011-1.6.494-.333.989-.767.989-1.567a2 2 0 10-4 0M11.999 16a.25.25 0 10.002.5A.25.25 0 0012 16" />
      </g>
    </svg>
  )
}

export default HelpIcon
