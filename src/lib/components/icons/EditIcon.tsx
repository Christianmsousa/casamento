import { IconProps } from './index'

export function EditIcon({
  width = '1.5rem',
  height = '1.5rem',
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M21 11V19C21 20.105 20.105 21 19 21H5C3.895 21 3 20.105 3 19V5C3 3.895 3.895 3 5 3H13"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.707 6.12125L9.828 17.0002H7V14.1722L17.879 3.29325C18.27 2.90225 18.903 2.90225 19.293 3.29325L20.707 4.70725C21.098 5.09825 21.098 5.73125 20.707 6.12125Z"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0898 5.08984L18.9098 7.90984"
        stroke="#3B3F41"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
