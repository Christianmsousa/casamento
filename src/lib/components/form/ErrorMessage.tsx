interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className="text-body3 text-red-500">{message}</span>
}
