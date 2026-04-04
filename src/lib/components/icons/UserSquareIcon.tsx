import * as React from 'react'
import { IconProps } from '.'

function UserSquaredIcon({
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
        <path d="M18.939 20.002a5.193 5.193 0 00-4.826-3.273H9.887a5.19 5.19 0 00-3.552 1.405v0a5.193 5.193 0 00-1.273 1.868l-.228.57" />
        <rect x={8.99805} y={7.47461} width={6.0025} height={6.50271} rx={3} />
        <rect x={2.99609} y={3.72266} width={18.0075} height={18.0075} rx={5} />
      </g>
    </svg>
  )
}

export default UserSquaredIcon
