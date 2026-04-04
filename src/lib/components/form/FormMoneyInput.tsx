import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { Input } from '../input'

const moneyMasks = [
  '0,00',
  '00,00',
  '000,00',
  '0.000,00',
  '00.000,00',
  '000.000,00',
  '0.000.000,00',
  '00.000.000,00',
  '000.000.000,00',
  '0.000.000.000,00',
]

type FormMoneyInputProps<T extends FieldValues> = {
  name: Path<T>
  prefix?: string
  label?: string
  placeholder?: string
  control: Control<T>
  error?: any
}

export function FormMoneyInput<T extends FieldValues>({
  name,
  label,
  prefix = 'R$ ',
  placeholder,
  control,
  error,
}: FormMoneyInputProps<T>) {
  return (
    <Input.Root>
      {label && <Input.Label htmlFor={name}>{label}</Input.Label>}

      <Input.Wrapper error={!!error}>
        <Input.Button position="right" type="button">
          {prefix}
        </Input.Button>

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <IMaskInput
              mask={moneyMasks}
              lazy={false}
              overwrite={false}
              onAccept={(unmasked) => {
                onChange(unmasked)
              }}
              value={String(value || '')}
              inputRef={ref}
              placeholder={placeholder || '0,00'}
              id={name}
              className="box-border h-full w-full flex-1 border-none bg-transparent px-3 py-2 text-body2 tracking-[0em] text-neutral-dark-950 outline-none placeholder:text-neutral-light-500"
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
