import { ReactNode } from 'react'

interface InputRootProps {
  children: ReactNode
}

export function InputRoot({ children }: InputRootProps) {
  return <div className="flex flex-1 flex-col gap-2">{children}</div>
}
