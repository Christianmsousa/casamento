'use client'
import {
  useRef,
  useEffect,
  useState,
  KeyboardEvent,
  ClipboardEvent,
} from 'react'
import { tv } from 'tailwind-variants'

interface VerificationCodeInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  error?: boolean
  autoFocus?: boolean
  className?: string
}

const inputVariants = tv({
  base: 'flex min-w-16 min-h-24 items-center justify-center rounded-lg border bg-white text-center font-medium transition-all focus:outline-none focus:ring-2 font-inter text-neutral-dark-950',
  variants: {
    error: {
      true: 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20',
      false:
        'border-neutral-light-300 focus:border-brand-blue-500 focus:ring-brand-blue-500/20 hover:border-neutral-light-400',
    },
    disabled: {
      true: 'cursor-not-allowed bg-neutral-light-100 opacity-60',
      false: '',
    },
  },
  compoundVariants: [
    {
      disabled: true,
      error: false,
      class: 'hover:border-neutral-light-300',
    },
  ],
  defaultVariants: {
    error: false,
    disabled: false,
  },
})

export function VerificationCodeInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = false,
  autoFocus = false,
  className,
}: VerificationCodeInputProps) {
  const [digits, setDigits] = useState<string[]>(
    Array(length)
      .fill('')
      .map((_, i) => value[i] || ''),
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Sincronizar com valor externo e auto focus
  useEffect(() => {
    const newDigits = Array(length)
      .fill('')
      .map((_, i) => value[i] || '')
    setDigits(newDigits)

    // Auto focus no primeiro campo apenas na primeira vez
    if (autoFocus && inputRefs.current[0] && !value) {
      inputRefs.current[0].focus()
    }
  }, [value, length, autoFocus])

  const handleChange = (index: number, inputValue: string) => {
    // Aceitar apenas números
    const numericValue = inputValue.replace(/\D/g, '')

    if (numericValue.length <= 1) {
      const newDigits = [...digits]
      newDigits[index] = numericValue
      setDigits(newDigits)

      const fullValue = newDigits.join('')
      onChange?.(fullValue)

      // Se preencheu um dígito e não é o último, focar no próximo
      if (numericValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }

      // Se completou todos os dígitos
      if (fullValue.length === length) {
        onComplete?.(fullValue)
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Se o campo atual está vazio, voltar para o anterior
        inputRefs.current[index - 1]?.focus()
      } else {
        // Limpar o campo atual
        const newDigits = [...digits]
        newDigits[index] = ''
        setDigits(newDigits)
        onChange?.(newDigits.join(''))
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '')

    if (pastedData.length <= length) {
      const newDigits = Array(length).fill('')
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i]
      }
      setDigits(newDigits)

      const fullValue = newDigits.join('')
      onChange?.(fullValue)

      // Focar no próximo campo vazio ou no último preenchido
      const nextEmpty = newDigits.findIndex((digit) => !digit)
      const targetIndex =
        nextEmpty !== -1 ? nextEmpty : Math.min(pastedData.length, length - 1)
      inputRefs.current[targetIndex]?.focus()

      if (fullValue.length === length) {
        onComplete?.(fullValue)
      }
    }
  }

  const handleFocus = (index: number) => {
    // Selecionar todo o conteúdo ao focar
    inputRefs.current[index]?.select()
  }

  return (
    <div className={`flex justify-center gap-3 ${className || ''}`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={inputVariants({ error, disabled })}
          style={
            {
              fontSize: '2.01975rem',
              lineHeight: '2.01975rem',
              leadingTrim: 'both',
              textEdge: 'cap',
              padding: '1rem',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
