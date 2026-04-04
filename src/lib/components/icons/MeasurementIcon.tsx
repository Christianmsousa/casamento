import * as React from 'react'
import { IconProps } from '.'

function MeasurementIcon({
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
        {/* Contorno da régua */}
        <rect x="3" y="9" width="18" height="6" rx="1" />

        {/* Marcações da régua - grandes */}
        <path d="M6 9V13" />
        <path d="M12 9V15" />
        <path d="M18 9V13" />

        {/* Marcações da régua - médias */}
        <path d="M9 9V12" />
        <path d="M15 9V12" />

        {/* Marcações da régua - pequenas */}
        <path d="M4.5 9V11" />
        <path d="M7.5 9V11" />
        <path d="M10.5 9V11" />
        <path d="M13.5 9V11" />
        <path d="M16.5 9V11" />
        <path d="M19.5 9V11" />
      </g>
    </svg>
  )
}

export default MeasurementIcon
