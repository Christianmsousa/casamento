import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import {
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  FloatingPortal,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react'
import { Input } from '../input'
import { Icon } from '../icons'

type FormTimeInputProps<T extends FieldValues> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value'
> & {
  name: Path<T>
  control: Control<T>
  label?: string
  error?: FieldError
}

export function FormTimeInput<T extends FieldValues>({
  name,
  control,
  label,
  error,
  ...rest
}: FormTimeInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TimePickerComponent
          id={name}
          label={label}
          error={error}
          value={value}
          onTimeChange={onChange}
          {...rest}
        />
      )}
    />
  )
}

type TimePickerComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: FieldError
  value?: string
  onTimeChange: (time: string | null | undefined) => void
}

const TimePickerComponent = ({
  label,
  error,
  id,
  value,
  onTimeChange,
  ...rest
}: TimePickerComponentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState('00')
  const [selectedMinute, setSelectedMinute] = useState('00')

  const hourListRef = useRef<HTMLUListElement>(null)
  const minuteListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const [hour, minute] = (value || '00h00').split('h')
    setSelectedHour(hour)
    setSelectedMinute(minute)
  }, [value])

  useEffect(() => {
    if (isOpen) {
      const hourElement = hourListRef.current?.querySelector(
        `[data-hour="${selectedHour}"]`,
      )
      hourElement?.scrollIntoView({ block: 'center' })

      const minuteElement = minuteListRef.current?.querySelector(
        `[data-minute="${selectedMinute}"]`,
      )
      minuteElement?.scrollIntoView({ block: 'center' })
    }
  }, [isOpen, selectedHour, selectedMinute])

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ])

  const handleConfirm = () => {
    onTimeChange(`${selectedHour}h${selectedMinute}`)
    setIsOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onTimeChange(undefined)
    setSelectedHour('00')
    setSelectedMinute('00')
  }

  return (
    <Input.Root>
      {label && <Input.Label htmlFor={id}>{label}</Input.Label>}
      <Input.Wrapper error={!!error}>
        <div
          ref={refs.setReference}
          {...getReferenceProps()}
          className="flex w-full cursor-pointer items-center"
        >
          <Input.Icon>
            <Icon.Clock
              className="text-neutral-light-600"
              width="1.5rem"
              height="1.5rem"
            />
          </Input.Icon>

          <input
            {...rest}
            id={id}
            value={value || ''}
            readOnly
            placeholder="00h00"
            className="w-full flex-1 cursor-pointer bg-transparent px-3 py-2 text-body2 text-neutral-dark-950 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
        {value && (
          <Input.Icon position="right">
            <button
              type="button"
              onClick={handleClear}
              className="text-neutral-light-600 hover:text-neutral-dark-950"
              aria-label="Limpar horário"
            >
              <Icon.Close width="1.5rem" height="1.5rem" />
            </button>
          </Input.Icon>
        )}
      </Input.Wrapper>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            className="z-[99999] w-56 rounded-md border border-neutral-light-300 bg-white shadow-lg"
          >
            <div className="flex h-48">
              <ul ref={hourListRef} className="flex-1 overflow-y-auto p-1">
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i.toString().padStart(2, '0')
                  const isSelected = hour === selectedHour
                  return (
                    <li key={hour}>
                      <button
                        type="button"
                        data-hour={hour}
                        onClick={() => setSelectedHour(hour)}
                        className={`w-full cursor-pointer rounded-md p-2 text-center ${
                          isSelected
                            ? 'bg-brand-blue-500 text-white'
                            : 'hover:bg-neutral-light-100'
                        }`}
                      >
                        {hour}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <ul ref={minuteListRef} className="flex-1 overflow-y-auto p-1">
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = i.toString().padStart(2, '0')
                  const isSelected = minute === selectedMinute
                  return (
                    <li key={minute}>
                      <button
                        type="button"
                        data-minute={minute}
                        onClick={() => setSelectedMinute(minute)}
                        className={`w-full cursor-pointer rounded-md p-2 text-center ${
                          isSelected
                            ? 'bg-brand-blue-500 text-white'
                            : 'hover:bg-neutral-light-100'
                        }`}
                      >
                        {minute}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="border-t border-neutral-light-200 p-2">
              <button
                onClick={handleConfirm}
                className="w-full rounded-md bg-brand-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2"
              >
                OK
              </button>
            </div>
          </div>
        </FloatingPortal>
      )}
      {error && (
        <div className="mt-1 flex items-center gap-1 text-sm text-semantic-error">
          <span>{error.message}</span>
        </div>
      )}
    </Input.Root>
  )
}
