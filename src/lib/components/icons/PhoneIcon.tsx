import * as React from 'react'
import { IconProps } from '.'

function PhoneIcon({
  width = '1.5rem',
  height = '1.5rem',
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 21.7852H8C6.895 21.7852 6 20.8902 6 19.7852V5.78516C6 4.68016 6.895 3.78516 8 3.78516H16C17.105 3.78516 18 4.68016 18 5.78516V19.7852C18 20.8902 17.105 21.7852 16 21.7852Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.999 18.0352C11.861 18.0352 11.749 18.1472 11.75 18.2852C11.75 18.4232 11.862 18.5352 12 18.5352C12.138 18.5352 12.25 18.4232 12.25 18.2852C12.25 18.1472 12.138 18.0352 11.999 18.0352"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 6.78516H13.25"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PhoneIcon
