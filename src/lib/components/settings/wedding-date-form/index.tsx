'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/lib/components/ui/button'
import { FormDateInput } from '@/lib/components/form/FormDateInput'
import { FormTimeInput } from '@/lib/components/form/FormTimeInput'
import { Icon } from '@/lib/components/icons'

interface WeddingDateFormProps {
  weddingDate: string
  onSave: (date: string) => Promise<boolean>
  saving: boolean
}

interface DateFormData {
  date: string
  time: string
}

export function WeddingDateForm({ weddingDate, onSave, saving }: WeddingDateFormProps) {
  const [saved, setSaved] = useState(false)
  
  const { control, handleSubmit, reset, watch } = useForm<DateFormData>({
    defaultValues: {
      date: weddingDate.includes('T') ? weddingDate.split('T')[0] : weddingDate || '',
      time: weddingDate.includes('T') 
        ? (() => {
            const timePart = weddingDate.split('T')[1]?.split(':')
            return timePart ? `${timePart[0]}h${timePart[1] || '00'}` : '18h00'
          })()
        : '18h00',
    },
  })

  useEffect(() => {
    reset({
      date: weddingDate.includes('T') ? weddingDate.split('T')[0] : weddingDate || '',
      time: weddingDate.includes('T') 
        ? (() => {
            const timePart = weddingDate.split('T')[1]?.split(':')
            return timePart ? `${timePart[0]}h${timePart[1] || '00'}` : '18h00'
          })()
        : '18h00',
    })
  }, [weddingDate, reset])

  const onSubmit = async (data: DateFormData) => {
    // Converte hora do formato "18h00" para "18:00"
    const timeFormatted = data.time.replace('h', ':')
    const dateTime = data.date && data.time ? `${data.date}T${timeFormatted}:00` : data.date
    const success = await onSave(dateTime)
    if (success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormDateInput
          name="date"
          label="Data do Casamento"
          control={control}
          icon={<Icon.Calendar width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
          placeholder="dd/mm/aaaa"
        />

        <FormTimeInput
          name="time"
          label="Hora do Casamento"
          control={control}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={saving} text={saving ? 'Salvando...' : 'Salvar Data e Hora'} />
        {saved && (
          <span className="text-sm text-green-700 font-medium">✓ Salvo com sucesso!</span>
        )}
      </div>
    </form>
  )
}
