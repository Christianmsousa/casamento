import { IconProps } from './types'

export const ActionIcon = ({
  width = '1.5rem',
  height = '1.5rem',
  className,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3H19C20.105 3 21 3.895 21 5V19C21 20.105 20.105 21 19 21H5C3.895 21 3 20.105 3 19V5C3 3.895 3.895 3 5 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 3V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3H19C20.105 3 21 3.895 21 5V19C21 20.105 20.105 21 19 21H12V3Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
