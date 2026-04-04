'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/lib/components/ui/button'
import { FormTextInput } from '@/lib/components/form/FormTextInput'
import { FormCepInput } from '@/lib/components/form/FormCepInput'
import { Icon } from '@/lib/components/icons'
import type { LocationDetails } from '@/lib/types'

interface LocationFormProps {
  ceremonyLocation: string | LocationDetails
  receptionLocation: string | LocationDetails
  onSave: (ceremony: string | LocationDetails, reception: string | LocationDetails) => Promise<boolean>
  saving: boolean
}

function isLocationDetails(loc: string | LocationDetails): loc is LocationDetails {
  return typeof loc === 'object' && loc !== null
}

interface LocationFormData {
  ceremony_address: string
  ceremony_cep: string
  ceremony_city: string
  ceremony_state: string
  reception_address: string
  reception_cep: string
  reception_city: string
  reception_state: string
}

export function LocationForm({ ceremonyLocation, receptionLocation, onSave, saving }: LocationFormProps) {
  const [saved, setSaved] = useState(false)

  const ceremony = isLocationDetails(ceremonyLocation) 
    ? ceremonyLocation 
    : { address: ceremonyLocation || '', cep: '', city: '', state: '' }
  
  const reception = isLocationDetails(receptionLocation)
    ? receptionLocation
    : { address: receptionLocation || '', cep: '', city: '', state: '' }

  const { control, handleSubmit, reset } = useForm<LocationFormData>({
    defaultValues: {
      ceremony_address: ceremony.address || '',
      ceremony_cep: ceremony.cep || '',
      ceremony_city: ceremony.city || '',
      ceremony_state: ceremony.state || '',
      reception_address: reception.address || '',
      reception_cep: reception.cep || '',
      reception_city: reception.city || '',
      reception_state: reception.state || '',
    },
  })

  useEffect(() => {
    const ceremony = isLocationDetails(ceremonyLocation) 
      ? ceremonyLocation 
      : { address: ceremonyLocation || '', cep: '', city: '', state: '' }
    
    const reception = isLocationDetails(receptionLocation)
      ? receptionLocation
      : { address: receptionLocation || '', cep: '', city: '', state: '' }

    reset({
      ceremony_address: ceremony.address || '',
      ceremony_cep: ceremony.cep || '',
      ceremony_city: ceremony.city || '',
      ceremony_state: ceremony.state || '',
      reception_address: reception.address || '',
      reception_cep: reception.cep || '',
      reception_city: reception.city || '',
      reception_state: reception.state || '',
    })
  }, [ceremonyLocation, receptionLocation, reset])

  const onSubmit = async (data: LocationFormData) => {
    const ceremonyData: LocationDetails = {
      address: data.ceremony_address,
      cep: data.ceremony_cep,
      city: data.ceremony_city,
      state: data.ceremony_state,
    }

    const receptionData: LocationDetails = {
      address: data.reception_address,
      cep: data.reception_cep,
      city: data.reception_city,
      state: data.reception_state,
    }

    const success = await onSave(ceremonyData, receptionData)
    if (success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Localização da Cerimônia */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Cerimônia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <FormTextInput
              name="ceremony_address"
              label="Endereço"
              control={control}
              placeholder="Ex: Igreja Nossa Senhora da Paz, Rua das Flores, 123"
              icon={<Icon.Location width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
            />
          </div>
          <FormCepInput
            name="ceremony_cep"
            label="CEP"
            control={control}
            placeholder="00000-000"
          />
          <FormTextInput
            name="ceremony_city"
            label="Cidade"
            control={control}
            placeholder="São Paulo"
          />
          <FormTextInput
            name="ceremony_state"
            label="Estado (UF)"
            control={control}
            placeholder="SP"
            maxLength={2}
          />
        </div>
      </div>

      {/* Localização da Recepção */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Recepção</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <FormTextInput
              name="reception_address"
              label="Endereço"
              control={control}
              placeholder="Ex: Salão de Festas Jardim, Avenida Principal, 456"
              icon={<Icon.Location width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
            />
          </div>
          <FormCepInput
            name="reception_cep"
            label="CEP"
            control={control}
            placeholder="00000-000"
          />
          <FormTextInput
            name="reception_city"
            label="Cidade"
            control={control}
            placeholder="São Paulo"
          />
          <FormTextInput
            name="reception_state"
            label="Estado (UF)"
            control={control}
            placeholder="SP"
            maxLength={2}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={saving} text={saving ? 'Salvando...' : 'Salvar Localizações'} />
        {saved && (
          <span className="text-sm text-green-700 font-medium">✓ Salvo com sucesso!</span>
        )}
      </div>
    </form>
  )
}

