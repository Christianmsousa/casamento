import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { Input } from '../input'

interface ToggleOption<T = any> {
  value: T
  label: string
}

interface FormToggleButtonsProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  control: Control<T>
  options: ToggleOption[]
  error?: FieldError
  disabled?: boolean
  className?: string
}

export function FormToggleButtons<T extends FieldValues>({
  name,
  label,
  control,
  options,
  error,
  disabled = false,
  className = '',
}: FormToggleButtonsProps<T>) {
  return (
    <div className={className}>
      <Input.Root>
        {label && (
          <Input.Label htmlFor={`${name}-group`} error={!!error}>
            {label}
          </Input.Label>
        )}

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div
              id={`${name}-group`}
              role="group"
              aria-label={`Seleção de ${label || name}`}
              className="flex space-x-2"
            >
              {options.map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => !disabled && field.onChange(option.value)}
                  disabled={disabled}
                  className={`rounded-lg border px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    field.value === option.value
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  } ${
                    disabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        />

        {error && <span className="text-sm text-red-500">{error.message}</span>}
      </Input.Root>
    </div>
  )
}
