import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { Input } from '../input'
import { tv } from 'tailwind-variants'

type Variant = 'cpf' | 'cnpj'

const variantConfig: Record<Variant, { mask: string; placeholder: string }> = {
  cpf: { mask: '000.000.000-00', placeholder: '000.000.000-00' },
  cnpj: { mask: '00.000.000/0000-00', placeholder: '00.000.000/0000-00' },
}

const formDocumentNumberVariants = tv({
  base: 'box-border h-full w-full flex-1 border-none bg-transparent px-3 py-2 text-body2 tracking-[0em] text-neutral-dark-950 outline-none placeholder:text-neutral-light-500',
  variants: {
    disabled: {
      true: 'bg-gray-100 cursor-not-allowed text-gray-500',
      false: '',
    },
    error: {
      true: 'border-[2px] border-semantic-error',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

type FormDocumentNumberProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  variant: Variant
  label?: string
  placeholder?: string
  error?: any
  icon?: React.ReactNode
  disabled?: boolean
}

export function FormDocumentNumber<T extends FieldValues>({
  name,
  control,
  variant,
  label,
  placeholder,
  error,
  icon,
  disabled,
}: FormDocumentNumberProps<T>) {
  const { mask, placeholder: defaultPl } = variantConfig[variant]

  return (
    <Input.Root>
      {label && (
        <div className="flex items-center gap-1">
          <Input.Label error={!!error} htmlFor={name}>
            {label}
          </Input.Label>
        </div>
      )}

      <Input.Wrapper error={!!error}>
        {icon && <Input.Icon>{icon}</Input.Icon>}

        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...field } }) => (
            <IMaskInput
              {...field}
              id={name}
              mask={mask}
              placeholder={placeholder ?? defaultPl}
              unmask={false}
              inputRef={ref}
              onAccept={(value) => field.onChange(value)}
              disabled={disabled}
              className={formDocumentNumberVariants({
                disabled,
                error,
              })}
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
