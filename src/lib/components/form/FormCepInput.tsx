import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { Input } from '../input'

// Função para formatar CEP (00000-000)
function formatCep(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '')

  // Aplica a máscara 00000-000
  if (numbers.length <= 5) {
    return numbers
  } else {
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }
}

type FormCepInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  icon?: React.ReactNode
  infoIcon?: React.ReactNode
  error?: any
  disabled?: boolean
  autoComplete?: string
  actionLink?: ActionLinkProps
}

interface ActionLinkProps {
  label: string
  onClick: () => void
}

export function FormCepInput<T extends FieldValues>({
  name,
  label,
  placeholder = '00000-000',
  control,
  icon,
  infoIcon,
  error,
  disabled = false,
  autoComplete,
  actionLink,
}: FormCepInputProps<T>) {
  return (
    <Input.Root>
      {label && (
        <div className="flex items-center gap-1">
          <Input.Label error={!!error} htmlFor={name}>
            {label}
          </Input.Label>
          {infoIcon}
        </div>
      )}

      <Input.Wrapper error={!!error}>
        {icon && <Input.Icon>{icon}</Input.Icon>}

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input.Field
              {...field}
              id={name}
              type="text"
              value={field.value ?? ''}
              autoComplete={autoComplete === 'off' ? '-' : autoComplete}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={9} // 5 dígitos + hífen + 3 dígitos
              onChange={(e) => {
                const value = e.target.value
                const formattedValue = formatCep(value)
                field.onChange(formattedValue)
              }}
            />
          )}
        />
      </Input.Wrapper>

      {(actionLink || error) && (
        <div className="flex flex-col gap-1">
          {error && error.message && (
            <span className="text-body3 text-semantic-error">
              {(error as FieldError).message}
            </span>
          )}
          {actionLink && (
            <button
              type="button"
              onClick={actionLink.onClick}
              className="flex items-center gap-1 text-body3 text-neutral-light-600 underline transition-colors duration-150 hover:text-neutral-700"
            >
              {actionLink.label}
            </button>
          )}
        </div>
      )}
    </Input.Root>
  )
}
