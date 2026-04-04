import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { Input } from '../input'
import { IconName } from '../icons'
import { formatName } from '@/lib/utils/text'

type FormTextInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  icon?: React.ReactNode
  // Opções de ajuda flexíveis:
  helpText?: string | React.ReactNode // Conteúdo do tooltip (texto ou JSX)
  helpIcon?: IconName // Nome do ícone (seguindo padrão da sidebar)
  error?: any
  type?: string
  formatName?: boolean
  disabled?: boolean
  autoComplete?: string
  actionLink?: ActionLinkProps
  defaultValue?: any
  maxLength?: number
}

interface ActionLinkProps {
  label: string
  onClick: () => void
}

export function FormTextInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  icon,
  helpText,
  helpIcon,
  error,
  type = 'text',
  formatName: shouldFormatName = false,
  disabled = false,
  autoComplete,
  actionLink,
  defaultValue,
  maxLength,
}: FormTextInputProps<T>) {
  return (
    <Input.Root>
      {label && (
        <div className="flex items-center gap-1">
          <Input.Label error={!!error} htmlFor={name}>
            {label}
          </Input.Label>
          {helpText && <Input.HelpText content={helpText} icon={helpIcon} />}
        </div>
      )}

      <Input.Wrapper error={!!error}>
        {icon && <Input.Icon>{icon}</Input.Icon>}

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input.Field
              {...field}
              id={name}
              type={type}
              value={field.value ?? ''}
              autoComplete={autoComplete}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              onChange={(e) => {
                let value = e.target.value

                if (shouldFormatName) {
                  value = formatName(value)
                }

                field.onChange(value)
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
