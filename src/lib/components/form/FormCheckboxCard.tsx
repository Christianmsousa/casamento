import { Control, FieldValues, Path } from 'react-hook-form'
import CustomCheckbox from '@/lib/components/custom-check-box'

interface FormCheckboxCardProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  title: string
  description: string
  disabled?: boolean
  className?: string
}

export function FormCheckboxCard<T extends FieldValues>({
  control,
  name,
  title,
  description,
  className = '',
}: FormCheckboxCardProps<T>) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      <div className="group relative overflow-hidden rounded-lg border border-gray-200/60 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-3 transition-all duration-300 ease-out hover:border-blue-400/50 hover:shadow-md hover:shadow-blue-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-indigo-100/15 to-slate-100/10 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"></div>
        <div className="absolute inset-0 bg-white/40 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"></div>

        <div className="relative z-10">
          <CustomCheckbox control={control} name={name}>
            <div className="ml-1">
              <div>
                <span className="text-sm font-semibold text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                  {title}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 transition-colors duration-200 group-hover:text-gray-700">
                {description}
              </p>
            </div>
          </CustomCheckbox>
        </div>
      </div>
    </div>
  )
}
