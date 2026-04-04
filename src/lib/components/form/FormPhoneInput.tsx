import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { Input } from '../input'

type FormPhoneInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  error?: any
  icon?: React.ReactNode
  disabled?: boolean
  autoComplete?: string
}

// Máscaras para telefones brasileiros
const phoneMasks = [
  { mask: '(00) 0000-0000' }, // Fixo: 10 dígitos
  { mask: '(00) 00000-0000' }, // Celular: 11 dígitos
]

export function FormPhoneInput<T extends FieldValues>({
  name,
  label,
  placeholder = '(00) 00000-0000',
  control,
  error,
  icon,
  disabled = false,
  autoComplete = 'tel',
}: FormPhoneInputProps<T>) {
  const errorClass = error ? 'border-[2px] border-semantic-error' : ''

  return (
    <Input.Root>
      {label && <Input.Label htmlFor={name}>{label}</Input.Label>}

      <Input.Wrapper className={errorClass}>
        {icon && <Input.Icon>{icon}</Input.Icon>}

        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...field } }) => (
            <IMaskInput
              {...field}
              id={name}
              mask={phoneMasks}
              autoComplete={autoComplete}
              placeholder={placeholder}
              unmask={false}
              inputRef={ref}
              disabled={disabled}
              onAccept={(value) => field.onChange(value)}
              className="box-border h-full w-full flex-1 border-none bg-transparent px-3 py-2 text-body2 tracking-[0em] text-neutral-900 outline-none placeholder:text-neutral-light-500"
            />
          )}
        />
      </Input.Wrapper>

      {error && (
        <div className="mt-1 flex items-center gap-1 text-sm text-semantic-error">
          <span>{(error as FieldError).message}</span>
        </div>
      )}
    </Input.Root>
  )
}
