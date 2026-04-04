import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { Input } from '../input'

const unitMasks = [
  '0',
  '00',
  '000',
  '0.000',
  '00.000',
  '000.000',
  '0.000.000',
  '00.000.000',
  '000.000.000',
  '0.000.000.000',
]

type FormUnitInputProps<T extends FieldValues> = {
  name: Path<T>
  prefix?: string
  label?: string
  placeholder?: string
  control: Control<T>
  error?: any
}

export function FormUnitInput<T extends FieldValues>({
  name,
  label,
  prefix,
  placeholder,
  control,
  error,
}: FormUnitInputProps<T>) {
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
              mask={unitMasks}
              lazy={false}
              overwrite={false}
              onAccept={(unmasked) => {
                const value = unmasked ? Number(unmasked) : 0
                onChange(value)
                if (onChange) {
                  onChange(value)
                }
              }}
              value={String(value || '')}
              inputRef={ref}
              placeholder={placeholder || '0'}
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
