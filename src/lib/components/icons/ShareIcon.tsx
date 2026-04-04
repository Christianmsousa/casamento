import * as React from 'react'
import { IconProps } from '.'

export function ShareIcon({
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
      <circle cx="6" cy="12" r="2.75" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="18" cy="6" r="2.75" stroke="currentColor" strokeWidth={1.5} />
      <circle
        cx="18"
        cy="18"
        r="2.75"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M8.25 11.25L15.75 7.25"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M8.25 12.75L15.75 16.75"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default ShareIcon
