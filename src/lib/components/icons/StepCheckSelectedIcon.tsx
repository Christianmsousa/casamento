import * as React from 'react'
import { IconProps } from '.'

function StepCheckSelectedIcon({
  width = '1.25rem',
  height = '1.25rem',
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18A9 9 0 119 0a9 9 0 010 18z"
        fill="#1E93FF"
      />
      <path
        d="M8.25 11.25L6 9M12 7.5l-3.75 3.75"
        stroke="#EDF8FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default StepCheckSelectedIcon
