import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { useState } from 'react'
import { Input } from '../input'
import { Tooltip } from '../tooltip'
import { Icon } from '../icons'
import { useToast } from '../../hooks/shared/useToast'

type FormPasswordInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  control: Control<T>
  error?: any
  showPassword?: boolean
  onToggleShowPassword?: () => void
  icon?: React.ReactNode
  copyButton?: boolean
  disabled?: boolean
}

export function FormPasswordInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  error,
  icon,
  showPassword,
  onToggleShowPassword,
  copyButton = false,
  disabled = false,
}: FormPasswordInputProps<T>) {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false)
  const toast = useToast()

  const handleCopyPassword = async () => {
    try {
      const currentValue = control._formValues[name]
      if (currentValue) {
        await navigator.clipboard.writeText(currentValue)
        setShowCopiedTooltip(true)
        setTimeout(() => setShowCopiedTooltip(false), 2000) // Esconde após 2 segundos
      }
    } catch {
      toast({
        title: 'Erro ao copiar',
        description:
          'Não foi possível copiar a senha para a área de transferência',
        status: 'error',
      })
    }
  }

  return (
    <Input.Root>
      {label && (
        <Input.Label error={!!error} htmlFor={name}>
          {label}
        </Input.Label>
      )}

      <Input.Wrapper error={!!error}>
        {icon && <Input.Icon>{icon}</Input.Icon>}

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input.Field
              {...field}
              id={name}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder={placeholder}
              disabled={disabled}
              value={disabled ? control._formValues[name] : field.value}
              className={disabled ? 'text-neutral-light-500' : ''}
            />
          )}
        />

        {onToggleShowPassword && (
          <Input.Button type="button" onClick={onToggleShowPassword}>
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </Input.Button>
        )}

        {copyButton && (
          <Input.Button
            position="left"
            type="button"
            onClick={handleCopyPassword}
          >
            <Tooltip
              content={showCopiedTooltip ? 'Senha copiada!' : 'Copiar senha'}
            >
              <div className="flex items-center gap-2">
                <Icon.Copy width="1.5rem" height="1.5rem" />
                <span className="text-body2 text-neutral-dark-950">Copiar</span>
              </div>
            </Tooltip>
          </Input.Button>
        )}
      </Input.Wrapper>

      {error && (
        <div className="mt-1 flex items-center gap-1 text-body3 text-semantic-error">
          <span>{(error as FieldError).message}</span>
        </div>
      )}
    </Input.Root>
  )
}
