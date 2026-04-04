import { useState, useRef } from 'react'
import { Input } from '../input'
import { StatusTag } from '../status-tag'
import { Icon } from '../icons'

interface FormTagInputProps {
  label?: string
  placeholder?: string
  values: string[]
  onAddValue: (value: string) => void
  onRemoveValue: (index: number) => void
  disabled?: boolean
  error?: boolean
}

export function FormTagInput({
  label,
  placeholder = 'Digite um valor e pressione Tab ou Enter',
  values = [],
  onAddValue,
  onRemoveValue,
  disabled = false,
  error = false,
}: FormTagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Adicionar nova tag com Tab ou Enter
    if ((e.key === 'Tab' || e.key === 'Enter') && inputValue.trim()) {
      e.preventDefault()
      e.stopPropagation()

      const newValue = inputValue.trim()

      // Adicionar valor se não existir
      if (!values.includes(newValue)) {
        onAddValue(newValue)
      }

      setInputValue('')

      // Manter o foco no input após criar a tag
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
      return
    }

    // Remover última tag com Backspace quando input está vazio
    if (e.key === 'Backspace' && !inputValue && values.length > 0) {
      e.preventDefault()
      onRemoveValue(values.length - 1)
    }
  }

  return (
    <Input.Root>
      {label && <Input.Label error={error}>{label}</Input.Label>}

      <Input.Wrapper error={error} flexible={true}>
        <div className="flex w-full flex-wrap items-center gap-2 overflow-y-auto p-3">
          {/* Tags existentes */}
          {values.map((value, index) => (
            <StatusTag
              key={index}
              status="tertiary"
              showDot={false}
              rounded="rounded-lg"
              size="md"
              textTransform="capitalize"
            >
              {value}
              <button
                type="button"
                onClick={() => onRemoveValue(index)}
                className="ml-1 rounded-full p-0.5 transition-colors hover:bg-blue-200"
                disabled={disabled}
              >
                <Icon.Close className="h-2.5 w-2.5" />
              </button>
            </StatusTag>
          ))}

          {/* Input inline - sempre presente */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={values.length > 0 ? '' : placeholder}
            className="min-w-[7.5rem] flex-1 border-none bg-transparent px-1 py-1 text-body2 text-neutral-900 placeholder:text-neutral-light-500 focus:outline-none disabled:text-neutral-light-500 disabled:placeholder:text-neutral-light-400"
            disabled={disabled}
          />
        </div>
      </Input.Wrapper>
    </Input.Root>
  )
}
