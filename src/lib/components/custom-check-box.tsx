'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

interface CustomCheckboxProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  children: React.ReactNode
}

export default function CustomCheckbox<T extends FieldValues>({
  control,
  name,
  children,
}: CustomCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={Boolean(field.value)}
            onChange={(e) => field.onChange(e.target.checked)}
            onBlur={field.onBlur}
            ref={field.ref}
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          {children}
        </label>
      )}
    />
  )
}
