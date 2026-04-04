import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { useState } from 'react'
import { Icon } from '../icons'

export interface SelectOption {
  value: string
  label: string
}

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  options: SelectOption[]
  icon?: React.ReactNode
  infoIcon?: React.ReactNode
  error?: any
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  placeholder = 'Selecione uma opção',
  control,
  options,
  icon,
  infoIcon,
  error,
}: FormSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col gap-2">
      {label && (
        <div className="flex items-center gap-1">
          <label
            htmlFor={name}
            className="text-body3 font-medium text-neutral-dark-950"
          >
            {label}
          </label>
          {infoIcon}
        </div>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <div className="relative">
            <div
              className={`relative flex h-14 items-center rounded-lg border bg-white transition-all duration-200 ${
                error
                  ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100'
                  : 'border-neutral-light-300 focus-within:border-brand-blue-600 focus-within:ring-2 focus-within:ring-brand-blue-100'
              }`}
            >
              {icon && (
                <div className="flex items-center justify-center pl-4">
                  {icon}
                </div>
              )}

              <button
                ref={ref}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full items-center justify-between bg-transparent text-left text-neutral-dark-950 focus:outline-none ${
                  icon ? 'pl-2 pr-4' : 'px-4'
                }`}
              >
                <span
                  className={
                    field.value
                      ? 'text-neutral-dark-950'
                      : 'text-neutral-light-600'
                  }
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : placeholder}
                </span>
                <Icon.ChevronDown
                  className={`h-5 w-5 text-neutral-light-600 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
              <>
                {/* Overlay para fechar ao clicar fora */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsOpen(false)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Fechar seleção"
                />

                {/* Lista de opções */}
                <div className="absolute top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-neutral-light-300 bg-white shadow-lg">
                  <div className="max-h-60 overflow-y-auto">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          field.onChange(option.value)
                          setIsOpen(false)
                        }}
                        className={`flex w-full items-center px-4 py-3 text-left transition-colors hover:bg-neutral-50 ${
                          field.value === option.value
                            ? 'bg-brand-blue-50 text-brand-blue-700'
                            : 'text-neutral-dark-950'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      />

      {error && (
        <div className="flex items-center gap-1 text-sm text-red-500">
          <span>{(error as FieldError).message}</span>
        </div>
      )}
    </div>
  )
}
