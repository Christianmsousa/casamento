import React from 'react'
import { useController, Control, FieldPath, FieldValues } from 'react-hook-form'

export interface MultiSelectOption {
  value: string
  label: string
  description?: string
}

interface FormMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  control: Control<TFieldValues>
  options: MultiSelectOption[]
  label?: string
  placeholder?: string
  className?: string
  gridCols?: 1 | 2 | 3 | 4
  required?: boolean
}

export function FormMultiSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  options,
  label,
  placeholder = 'Selecione as opções',
  className,
  gridCols = 2,
  required = false,
}: FormMultiSelectProps<TFieldValues, TName>) {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleToggleOption = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? (value as string[]) : []
    const isSelected = currentValues.includes(optionValue)

    if (isSelected) {
      // Remove da seleção
      onChange(currentValues.filter((v) => v !== optionValue))
    } else {
      // Adiciona à seleção
      onChange([...currentValues, optionValue])
    }
  }

  const isSelected = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? (value as string[]) : []
    return currentValues.includes(optionValue)
  }

  const getGridClass = () => {
    switch (gridCols) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-2'
      case 3:
        return 'grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-2'
    }
  }

  return (
    <div className={`space-y-2 ${className || ''}`}>
      {label && (
        <label className="block text-sub2 font-medium text-neutral-dark-950">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className={`grid gap-3 ${getGridClass()}`}>
        {options.map((option) => {
          const selected = isSelected(option.value)
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleToggleOption(option.value)}
              className={`rounded-lg border-2 p-4 text-left transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                selected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="space-y-1">
                <h3
                  className={`text-sub2 font-medium ${
                    selected ? 'text-blue-900' : 'text-gray-900'
                  }`}
                >
                  {option.label}
                </h3>
                {option.description && (
                  <p
                    className={`text-body2 ${
                      selected ? 'text-blue-700' : 'text-gray-500'
                    }`}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}

      {value.length === 0 && placeholder && !error && (
        <p className="mt-1 text-sm text-gray-500">{placeholder}</p>
      )}
    </div>
  )
}
