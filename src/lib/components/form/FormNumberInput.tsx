import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { Input } from '../input'

// Função para formatar apenas números
function formatNumber(value: string): string {
  // Remove tudo que não é dígito
  return value.replace(/\D/g, '')
}

type FormNumberInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  icon?: React.ReactNode
  infoIcon?: React.ReactNode
  error?: any
  disabled?: boolean
  autoComplete?: string
  maxLength?: number
  min?: number
  max?: number
}

export function FormNumberInput<T extends FieldValues>({
  name,
  label,
  placeholder = '0',
  control,
  icon,
  infoIcon,
  error,
  disabled = false,
  autoComplete,
  maxLength,
  min,
  max,
}: FormNumberInputProps<T>) {
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

      <Input.Wrapper error={!!error} disabled={disabled}>
        {icon && <Input.Icon>{icon}</Input.Icon>}

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input.Field
              {...field}
              id={name}
              type="text"
              inputMode="numeric"
              value={field.value ?? ''}
              autoComplete={autoComplete === 'off' ? '-' : autoComplete}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className=""
              onChange={(e) => {
                const value = e.target.value
                const formattedValue = formatNumber(value)

                // Validações de min/max
                if (
                  min !== undefined &&
                  formattedValue &&
                  parseInt(formattedValue) < min
                ) {
                  return // Não atualiza se for menor que o mínimo
                }

                if (
                  max !== undefined &&
                  formattedValue &&
                  parseInt(formattedValue) > max
                ) {
                  return // Não atualiza se for maior que o máximo
                }

                field.onChange(formattedValue)
              }}
            />
          )}
        />
      </Input.Wrapper>

      {error && error.message && (
        <div className="flex flex-col gap-1">
          <span className="text-body3 text-semantic-error">
            {(error as FieldError).message}
          </span>
        </div>
      )}
    </Input.Root>
  )
}
