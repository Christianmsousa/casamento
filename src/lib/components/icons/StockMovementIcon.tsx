import * as React from 'react'
import { IconProps } from '.'

function StockMovementIcon({
  width = '1.5rem',
  height = '1.5rem',
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M7.95898 9.66797L12 12.001L16.041 9.66797"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12V16.67"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.165 13.8717V10.1307C16.165 9.79973 15.989 9.49473 15.702 9.32873L12.462 7.45773C12.176 7.29273 11.823 7.29273 11.536 7.45773L8.29601 9.32873C8.01001 9.49373 7.83301 9.79973 7.83301 10.1307V13.8717C7.83301 14.2027 8.00901 14.5077 8.29601 14.6737L11.536 16.5447C11.822 16.7097 12.175 16.7097 12.462 16.5447L15.702 14.6737C15.989 14.5077 16.165 14.2017 16.165 13.8717Z"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.7363 4.53711V7.53711H17.7363H20.7363"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.198 7.53797C18.615 4.63697 15.538 2.66797 12 2.66797C6.84499 2.66797 2.66699 6.84697 2.66699 12.001C2.66699 17.155 6.84499 21.334 12 21.334C17.155 21.334 21.333 17.155 21.333 12.001"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default StockMovementIcon
