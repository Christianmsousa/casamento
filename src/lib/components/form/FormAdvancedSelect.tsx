import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { useState, useRef, useEffect } from 'react'
import { Icon } from '../icons'
import { Input } from '../input'
import { removeAccents } from '@/lib/utils/text'
import { MultiSelectAvatar } from '../multi-select/MultiSelectAvatar'

export interface SelectOption {
  id: string | number
  value: string
  label: string
  description?: string
  avatarUrl?: string
  canSelect?: boolean
}

type FormAdvancedSelectProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  options: SelectOption[]
  icon?: React.ReactNode
  infoIcon?: React.ReactNode
  error?: FieldError
  disabled?: boolean
  avatar?: boolean
  searchPlaceholder?: string
  externalSearch?: {
    searchTerm: string
    onSearchChange: (value: string) => void
    isLoading?: boolean
  }
  useExternalSearch?: boolean
}

export function FormAdvancedSelect<T extends FieldValues>({
  name,
  label,
  placeholder = 'Selecione uma opção',
  control,
  options,
  icon,
  infoIcon,
  error,
  disabled = false,
  avatar = false,
  searchPlaceholder = 'Buscar...',
  externalSearch,
  useExternalSearch = false,
}: FormAdvancedSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalSearchTerm, setInternalSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const searchTerm = useExternalSearch
    ? externalSearch?.searchTerm || ''
    : internalSearchTerm
  const onSearchChange = useExternalSearch
    ? externalSearch?.onSearchChange
    : setInternalSearchTerm
  const isLoading = externalSearch?.isLoading || false

  const filteredOptions = useExternalSearch
    ? options
    : options.filter((option) => {
        const term = searchTerm.toLowerCase()
        const termNoAccents = removeAccents(term)
        const label = option.label.toLowerCase()
        const value = option.value.toLowerCase()
        const description = option.description?.toLowerCase() || ''
        const labelNoAccents = removeAccents(label)
        const valueNoAccents = removeAccents(value)
        const descriptionNoAccents = removeAccents(description)
        return (
          label.includes(term) ||
          value.includes(term) ||
          description.includes(term) ||
          labelNoAccents.includes(termNoAccents) ||
          valueNoAccents.includes(termNoAccents) ||
          descriptionNoAccents.includes(termNoAccents)
        )
      })

  const sortedOptions = useExternalSearch
    ? filteredOptions
    : filteredOptions.sort((a, b) => {
        const term = searchTerm.toLowerCase()

        // 1. Prioriza matches exatos no value
        if (a.value.toLowerCase() === term) return -1
        if (b.value.toLowerCase() === term) return 1

        // 2. Prioriza matches que começam com o termo no label
        if (
          a.label.toLowerCase().startsWith(term) &&
          !b.label.toLowerCase().startsWith(term)
        )
          return -1
        if (
          !a.label.toLowerCase().startsWith(term) &&
          b.label.toLowerCase().startsWith(term)
        )
          return 1

        // 3. Ordem alfabética
        return a.label.localeCompare(b.label)
      })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        if (!useExternalSearch) {
          setInternalSearchTerm('')
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [useExternalSearch])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

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

      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <div className="relative" ref={dropdownRef}>
            <Input.Wrapper error={!!error}>
              {icon && <Input.Icon>{icon}</Input.Icon>}

              <button
                ref={ref}
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className="block w-full px-3 py-2 text-body2 text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    {field.value &&
                      avatar &&
                      (() => {
                        const selectedOption = options.find(
                          (option) => option.value === field.value,
                        )
                        return (
                          selectedOption && (
                            <MultiSelectAvatar
                              name={selectedOption.label}
                              avatarUrl={selectedOption.avatarUrl}
                              size="sm"
                              className="!gap-0"
                            />
                          )
                        )
                      })()}
                    <span
                      className={`truncate ${
                        field.value
                          ? 'text-neutral-900'
                          : 'text-neutral-light-500'
                      }`}
                    >
                      {field.value
                        ? options.find((option) => option.value === field.value)
                            ?.label
                        : placeholder}
                    </span>
                  </div>
                  <Icon.ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-neutral-light-600 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
            </Input.Wrapper>

            {/* Link para limpar seleção */}
            {field.value && (
              <button
                type="button"
                onClick={() => {
                  field.onChange('')
                  if (!useExternalSearch) {
                    setInternalSearchTerm('')
                  }
                }}
                className="mt-2 text-body3 text-neutral-light-600 underline transition-colors duration-150 hover:text-neutral-700"
              >
                Limpar seleção
              </button>
            )}

            {/* Dropdown com busca */}
            {isOpen && !disabled && (
              <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-neutral-light-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                {/* Campo de busca */}
                <div className="border-b border-neutral-light-100 p-4">
                  <div className="relative">
                    <Icon.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-light-500" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="w-full rounded-lg border border-neutral-light-200 bg-neutral-light-50 py-3 pl-10 pr-3 text-sm text-neutral-900 transition-all duration-200 placeholder:text-neutral-light-500 focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                    />
                    {isLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-light-200 border-t-brand-blue-500"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lista de opções */}
                <div className="max-h-64 overflow-y-auto">
                  {sortedOptions.length > 0 ? (
                    sortedOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          if (option.canSelect !== false) {
                            field.onChange(option.value)
                            setIsOpen(false)
                            if (!useExternalSearch) {
                              setInternalSearchTerm('')
                            }
                          }
                        }}
                        className={`flex w-full items-start justify-between px-4 py-3 text-left transition-all duration-150 ${
                          option.canSelect === false
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-neutral-light-50 active:bg-neutral-light-100'
                        } ${
                          field.value === option.value
                            ? 'border-l-4 border-l-brand-blue-500 bg-brand-blue-50 text-brand-blue-700'
                            : 'border-l-4 border-l-transparent text-neutral-900'
                        }`}
                        disabled={option.canSelect === false}
                      >
                        <div className="flex flex-1 items-center gap-3">
                          {avatar && (
                            <MultiSelectAvatar
                              name={option.label}
                              avatarUrl={option.avatarUrl}
                              size="sm"
                              className="!gap-0"
                            />
                          )}
                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <span className="truncate text-sm font-medium leading-5">
                              {option.label}
                            </span>
                            {option.description && (
                              <span className="break-words text-xs leading-4 text-neutral-700">
                                {option.description}
                              </span>
                            )}
                          </div>
                        </div>
                        {option.canSelect === false && (
                          <Icon.Lock
                            width="1rem"
                            height="1rem"
                            className="text-neutral-dark-950"
                          />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-light-100">
                        <Icon.Search className="h-5 w-5 text-neutral-light-500" />
                      </div>
                      <p className="mb-1 text-sm font-medium text-neutral-700">
                        {isLoading
                          ? 'Carregando...'
                          : 'Nenhum resultado encontrado'}
                      </p>
                      <p className="text-xs text-neutral-light-600">
                        {isLoading
                          ? 'Buscando na base de dados...'
                          : 'Tente ajustar os termos de busca'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      />

      {error && (
        <div className="mt-1 flex items-center gap-1 text-sm text-semantic-error">
          <span>{error.message}</span>
        </div>
      )}
    </Input.Root>
  )
}
