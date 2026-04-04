import * as React from 'react'
import { IconProps } from '.'

function StepCheckSuccessIcon({
  width = '1.25rem',
  height = '1.25rem',
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 19a9 9 0 110-18 9 9 0 010 18z"
        fill="#1E93FF"
        fillOpacity={0.35}
        stroke="#0672FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 12.25L7 10M13 8.5l-3.75 3.75"
        stroke="#0672FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default StepCheckSuccessIcon
