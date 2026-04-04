import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Label } from './Label'
import { ErrorMessage } from './ErrorMessage'

interface FormTextAreaProps<T extends FieldValues> {
  label: string
  name: Path<T>
  placeholder?: string
  control: Control<T>
  error?: string
  autoComplete?: string
  rows?: number
  max?: number
}

export function FormTextArea<T extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  error,
  autoComplete = 'off',
  rows = 6,
  max,
}: FormTextAreaProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={name}>{label}</Label>
        {max && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <span className="text-body3 text-neutral-400">
                {field.value?.length || 0}/{max}
              </span>
            )}
          />
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            rows={rows}
            maxLength={max}
            className="min-h-[8rem] w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-body2 text-neutral-dark-950 placeholder:text-neutral-light-500 focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
          />
        )}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
