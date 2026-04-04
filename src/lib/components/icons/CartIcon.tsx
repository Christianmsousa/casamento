import { IconProps } from './index'

function CartIcon({
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
        d="M3 3H4.5C5.194 3 5.7879 3.4684 5.94 4.146L6.3 5.77M6.3 5.77L7.8 13.5C7.9521 14.1776 8.546 14.646 9.24 14.646H17.7C18.394 14.646 18.988 14.1776 19.14 13.5L20.7 6.75C20.8521 6.0724 20.2582 5.604 19.5642 5.604H6.9C6.6968 5.604 6.4956 5.6224 6.3 5.77Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9.25"
        cy="19.25"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="17.25"
        cy="19.25"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default CartIcon
