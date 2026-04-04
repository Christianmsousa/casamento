interface LabelProps {
  htmlFor: string
  children: React.ReactNode
}

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-neutral-dark-950"
    >
      {children}
    </label>
  )
}
