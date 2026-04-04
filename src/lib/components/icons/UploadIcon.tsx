import type { IconProps } from './types'

export function UploadIcon({
  width = '1rem',
  height = '1rem',
  className = '',
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
        d="M21.0036 9.99901V17.0019C21.0036 19.212 19.212 21.0036 17.0019 21.0036H6.99776C4.7877 21.0036 2.99609 19.212 2.99609 17.0019V6.99776C2.99609 4.7877 4.7877 2.99609 6.99776 2.99609H13.0003"
        stroke="#0672FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.99609 13.0002L4.29179 11.7045C4.74413 11.2522 5.35764 10.998 5.99734 10.998C6.63704 10.998 7.25055 11.2522 7.70288 11.7045L11.9998 16.0015"
        stroke="#0672FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.00098 21.0042L13.2988 14.7065C14.2407 13.7645 15.7679 13.7645 16.7099 14.7065L20.6507 18.6473"
        stroke="#0672FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.003 2.99609L15.502 5.49714"
        stroke="#0672FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.504 5.49714L18.0029 2.99609"
        stroke="#0672FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0022 2.99609V7.99818"
        stroke="#0672FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
