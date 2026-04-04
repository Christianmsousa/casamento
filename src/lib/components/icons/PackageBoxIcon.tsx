import * as React from 'react'
import { IconProps } from '.'

function PackageBoxIcon({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.0036 8.08721V19.0028C21.0036 20.1078 20.1078 21.0036 19.0028 21.0036H4.99693C3.8919 21.0036 2.9961 20.1078 2.9961 19.0028V8.08721C2.99572 7.81591 3.05052 7.54735 3.15716 7.29789L4.47771 4.2076C4.79346 3.47214 5.51711 2.99561 6.31748 2.99609H17.6822C18.4833 2.99609 19.2072 3.47397 19.522 4.2106L20.8425 7.29789C20.949 7.5474 21.0038 7.81592 21.0036 8.08721Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.99609 7.99826H20.9936"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0001 2.99609L15.0005 7.99818V11.2245C14.9758 11.6756 14.5914 12.022 14.1402 11.9998H9.85841C9.4072 12.022 9.02282 11.6756 8.99805 11.2245V7.99818L9.99846 2.99609"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.99805 18.0022H7.99888"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PackageBoxIcon
