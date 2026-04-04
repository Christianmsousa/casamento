import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import DatePicker, {
  ReactDatePickerCustomHeaderProps,
  registerLocale,
} from 'react-datepicker'
import { ptBR } from 'date-fns/locale/pt-BR'
import type { Month } from 'date-fns'
import { forwardRef, useState } from 'react'
import { Input } from '../input'
import 'react-datepicker/dist/react-datepicker.css'
import { Icon } from '../icons'

registerLocale('pt-BR', ptBR)

type FormDateInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  icon?: React.ReactNode
  infoIcon?: React.ReactNode
  error?: FieldError
  disabled?: boolean
  maxDate?: Date
  minDate?: Date
}

const CustomDateInput = forwardRef<
  HTMLButtonElement,
  {
    value?: string
    onClick?: () => void
    placeholder?: string
    icon?: React.ReactNode
    isClearable?: boolean
  }
>(({ value, onClick, placeholder, icon, isClearable }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="flex h-full w-full items-center text-left transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
  >
    {icon && <Input.Icon>{icon}</Input.Icon>}
    <span
      className={`flex-1 px-4 py-3 text-body2 font-medium ${
        isClearable && value ? 'pr-10' : ''
      }`}
    >
      {value || (
        <span className="text-body2 font-normal text-neutral-light-500">
          {placeholder}
        </span>
      )}
    </span>
  </button>
))
CustomDateInput.displayName = 'CustomDateInput'

export function FormDateInput<T extends FieldValues>({
  name,
  label,
  placeholder = 'dd/mm/aaaa',
  control,
  icon,
  infoIcon,
  error,
  disabled = false,
  maxDate,
  minDate,
}: FormDateInputProps<T>) {
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)

  const formatISO = (date: Date) => {
    // Criar data no fuso horário local para evitar problemas
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    const years = Array.from(
      { length: new Date().getFullYear() - 1949 },
      (_, i) => 1950 + i,
    ).reverse()
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthName =
        ptBR.localize?.month(i as Month, { width: 'wide' }) ?? ''
      return monthName.charAt(0).toUpperCase() + monthName.slice(1)
    })

    const currentYear = new Date(date).getFullYear()
    const currentMonth = months[new Date(date).getMonth()]

    const handleYearChange = (year: number) => {
      changeYear(year)
      setYearDropdownOpen(false)
    }

    const handleMonthChange = (monthIndex: number) => {
      changeMonth(monthIndex as Month)
      setMonthDropdownOpen(false)
    }

    const toggleYearDropdown = () => {
      setMonthDropdownOpen(false)
      setYearDropdownOpen(!yearDropdownOpen)
    }

    const toggleMonthDropdown = () => {
      setYearDropdownOpen(false)
      setMonthDropdownOpen(!monthDropdownOpen)
    }

    return (
      <div className="flex items-center justify-between px-2 py-1">
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="custom-navigation-button"
        >
          <Icon.ChevronRight className="h-5 w-5 rotate-180" />
        </button>

        <div className="flex items-center gap-2">
          {/* Month Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleMonthDropdown}
              className="custom-select-button"
            >
              {currentMonth}
              <Icon.ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {monthDropdownOpen && (
              <div className="custom-dropdown">
                {months.map((month, index) => (
                  <div
                    key={month}
                    onClick={() => handleMonthChange(index)}
                    className="custom-dropdown-item"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleMonthChange(index)
                    }
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleYearDropdown}
              className="custom-select-button"
            >
              {currentYear}
              <Icon.ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {yearDropdownOpen && (
              <div className="custom-dropdown">
                {years.map((year) => (
                  <div
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className="custom-dropdown-item"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleYearChange(year)
                    }
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="custom-navigation-button"
        >
          <Icon.ChevronRight className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <Input.Root>
      {label && (
        <div className="flex items-center gap-1">
          <Input.Label htmlFor={name}>{label}</Input.Label>
          {infoIcon}
        </div>
      )}

      <Input.Wrapper error={!!error}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={
                field.value ? new Date(field.value + 'T00:00:00') : null
              }
              onChange={(date: Date | null) => {
                field.onChange(date ? formatISO(date) : null)
              }}
              onCalendarClose={() => {
                setMonthDropdownOpen(false)
                setYearDropdownOpen(false)
              }}
              dateFormat="dd/MM/yyyy"
              isClearable={true}
              locale="pt-BR"
              maxDate={maxDate}
              minDate={minDate}
              disabled={disabled}
              placeholderText={placeholder}
              showPopperArrow={false}
              popperClassName="datepicker-popper"
              popperPlacement="bottom-start"
              renderCustomHeader={CustomHeader}
              customInput={<CustomDateInput icon={icon} isClearable />}
            />
          )}
        />
      </Input.Wrapper>

      {error && (
        <div className="mt-1 flex items-center gap-1 text-sm text-red-500">
          <span>{(error as FieldError).message}</span>
        </div>
      )}

      <style jsx global>{`
        /* Wrapper do react-datepicker para ocupar 100% */
        .react-datepicker-wrapper,
        .react-datepicker__input-container {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* Estilos do Calendário */
        .datepicker-popper {
          z-index: 9999;
        }

        .react-datepicker--no-popper-arrow .react-datepicker__triangle {
          display: none;
        }

        .react-datepicker {
          font-family: inherit;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.5rem;
          box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 1rem;
          background: white;
          min-width: 280px;
          max-width: 320px;
        }

        .react-datepicker__header {
          background-color: transparent;
          border-bottom: none;
          padding: 0;
          margin-bottom: 0.5rem;
        }

        /* Esconde a navegação padrão e estiliza a customizada */
        .react-datepicker__navigation {
          display: none;
        }

        .custom-navigation-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 9999px;
          transition: all 0.2s ease;
          color: rgb(107 114 128);
        }
        .custom-navigation-button:hover:not(:disabled) {
          background-color: rgb(243 244 246);
          color: rgb(37 99 235);
        }
        .custom-navigation-button:disabled {
          color: rgb(209 213 219);
          cursor: not-allowed;
        }

        /* Dropdowns de Mês/Ano customizados */
        .custom-select-button {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid rgb(209 213 219);
          font-weight: 600;
          font-size: 0.875rem;
          background: white;
          color: rgb(17 24 39);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .custom-select-button:hover {
          border-color: rgb(37 99 235);
          background-color: rgb(248 250 252);
        }
        .custom-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.25rem;
          background-color: white;
          border-radius: 0.375rem;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid rgb(229 231 235);
          max-height: 200px;
          overflow-y: auto;
          z-index: 10;
        }
        .custom-dropdown-item {
          padding: 0.5rem 1.5rem;
          cursor: pointer;
          font-size: 0.875rem;
        }
        .custom-dropdown-item:hover {
          background-color: rgb(243 244 246);
        }

        /* Esconde os elementos antigos */
        .react-datepicker__month-select,
        .react-datepicker__year-select {
          display: none;
        }

        .react-datepicker__current-month {
          display: none;
        }

        .react-datepicker__day-names {
          margin: 0.5rem 0 0.25rem 0;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.125rem;
        }

        .react-datepicker__day-name {
          color: rgb(107 114 128);
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.25rem 0;
          text-align: center;
        }

        .react-datepicker__month {
          margin: 0;
        }

        .react-datepicker__month-container {
          width: 100%;
        }

        .react-datepicker__week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.125rem;
          margin: 0.125rem 0;
        }

        .react-datepicker__day {
          color: rgb(17 24 39);
          border-radius: 0.375rem;
          margin: 0;
          line-height: 2.25rem;
          width: 2.25rem;
          height: 2.25rem;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .react-datepicker__day:hover {
          background-color: rgb(243 244 246);
          color: rgb(17 24 39);
          border-color: rgb(209 213 219);
        }

        .react-datepicker__day--selected {
          background-color: rgb(37 99 235);
          color: white;
          border-color: rgb(37 99 235);
          font-weight: 600;
        }

        .react-datepicker__day--selected:hover {
          background-color: rgb(29 78 216);
          border-color: rgb(29 78 216);
        }

        .react-datepicker__day--keyboard-selected {
          background-color: rgb(37 99 235);
          color: white;
          border-color: rgb(37 99 235);
        }

        .react-datepicker__day--disabled {
          color: rgb(209 213 219);
          cursor: not-allowed;
          background-color: transparent;
        }

        .react-datepicker__day--disabled:hover {
          background-color: transparent;
          border-color: transparent;
        }

        .react-datepicker__day--outside-month {
          color: rgb(156 163 175);
        }

        .react-datepicker__day--today {
          background-color: rgb(239 246 255);
          color: rgb(37 99 235);
          border-color: rgb(191 219 254);
          font-weight: 600;
        }

        .react-datepicker__day--today:hover {
          background-color: rgb(219 234 254);
          border-color: rgb(191 219 254);
        }

        .react-datepicker__day--today.react-datepicker__day--selected {
          background-color: rgb(37 99 235);
          color: white;
          border-color: rgb(37 99 235);
        }

        /* Melhorias no campo de entrada */
        .react-datepicker__input-container input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        /* Estilização do botão de limpar (isClearable) */
        .react-datepicker__close-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          background-color: transparent;
          border: none;
          padding: 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          outline: none;
        }

        .react-datepicker__close-icon::after {
          content: '✕';
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          width: 1.25rem;
          height: 1.25rem;
          background-color: rgb(229 231 235);
          color: rgb(107 114 128);
          font-size: 0.75rem;
          font-weight: bold;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .react-datepicker__close-icon:hover::after {
          background-color: rgb(239 68 68);
          color: white;
        }

        .react-datepicker__navigation .icon {
          height: 1.25rem;
          width: 1.25rem;
        }
      `}</style>
    </Input.Root>
  )
}
