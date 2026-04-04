'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/lib/components/ui/card'
import { Button } from '@/lib/components/ui/button'
import { WeddingDateForm } from '@/lib/components/settings/wedding-date-form'
import { LocationForm } from '@/lib/components/settings/location-form'
import { Icon } from '@/lib/components/icons'
import { formatDateTimeFriendly, formatDate, formatTime } from '@/lib/utils/date'
import type { Settings, LocationDetails } from '@/lib/types'

interface EventInfoTabProps {
  settings: Settings
  saving: boolean
  onSaveDate: (date: string) => Promise<boolean>
  onSaveLocation: (ceremony: string | LocationDetails, reception: string | LocationDetails) => Promise<boolean>
}

function isLocationDetails(loc: string | LocationDetails): loc is LocationDetails {
  return typeof loc === 'object' && loc !== null
}

export function EventInfoTab({ settings, saving, onSaveDate, onSaveLocation }: EventInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveDate = async (date: string) => {
    const success = await onSaveDate(date)
    if (success) {
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setIsEditing(false)
      }, 1500)
    }
    return success
  }

  const handleSaveLocation = async (ceremony: string | LocationDetails, reception: string | LocationDetails) => {
    const success = await onSaveLocation(ceremony, reception)
    if (success) {
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setIsEditing(false)
      }, 1500)
    }
    return success
  }

  const handleCancel = () => {
    setIsEditing(false)
    setSaved(false)
  }

  const ceremony = isLocationDetails(settings.ceremony_location)
    ? settings.ceremony_location
    : { address: settings.ceremony_location || '' }

  const reception = isLocationDetails(settings.reception_location)
    ? settings.reception_location
    : { address: settings.reception_location || '' }

  if (isEditing) {
    return (
      <div className="space-y-4">
        {/* Data e Hora */}
        <Card>
          <CardHeader>
            <CardTitle>Data e Hora do Casamento</CardTitle>
          </CardHeader>
          <CardContent>
            <WeddingDateForm
              weddingDate={settings.wedding_date}
              onSave={handleSaveDate}
              saving={saving}
            />
          </CardContent>
        </Card>

        {/* Localização */}
        <Card>
          <CardHeader>
            <CardTitle>Localização</CardTitle>
          </CardHeader>
          <CardContent>
            <LocationForm
              ceremonyLocation={settings.ceremony_location}
              receptionLocation={settings.reception_location}
              onSave={handleSaveLocation}
              saving={saving}
            />
          </CardContent>
        </Card>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            text="Cancelar"
            onClick={handleCancel}
          />
          {saved && (
            <span className="text-sm text-green-700 font-medium">✓ Alterações salvas!</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Data e Hora - Visualização */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Data e Hora do Casamento</CardTitle>
            <Button
              variant="transparentEdit"
              size="sm"
              text="Editar"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {settings.wedding_date ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <Icon.Calendar width="1.125rem" height="1.125rem" className="text-neutral-light-600" />
                <span className="font-medium text-neutral-900">
                  {formatDate(settings.wedding_date)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon.Clock width="1.125rem" height="1.125rem" className="text-neutral-light-600" />
                <span className="font-medium text-neutral-900">
                  {formatTime(settings.wedding_date)}
                </span>
              </div>
              <p className="text-sm text-neutral-600 mt-1.5">
                {formatDateTimeFriendly(settings.wedding_date)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-neutral-500">Data e hora não configuradas</p>
          )}
        </CardContent>
      </Card>

      {/* Localização - Visualização */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Localização</CardTitle>
            <Button
              variant="transparentEdit"
              size="sm"
              text="Editar"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Cerimônia */}
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-2">Cerimônia</h4>
              {ceremony.address ? (
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <Icon.Location width="1.125rem" height="1.125rem" className="text-neutral-light-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900">{ceremony.address}</p>
                      {(ceremony.city || ceremony.state) && (
                        <p className="text-sm text-neutral-600">
                          {[ceremony.city, ceremony.state].filter(Boolean).join(', ')}
                        </p>
                      )}
                      {ceremony.cep && (
                        <p className="text-sm text-neutral-600">CEP: {ceremony.cep}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-500">Localização da cerimônia não configurada</p>
              )}
            </div>

            {/* Recepção */}
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-2">Recepção</h4>
              {reception.address ? (
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <Icon.Location width="1.125rem" height="1.125rem" className="text-neutral-light-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900">{reception.address}</p>
                      {(reception.city || reception.state) && (
                        <p className="text-sm text-neutral-600">
                          {[reception.city, reception.state].filter(Boolean).join(', ')}
                        </p>
                      )}
                      {reception.cep && (
                        <p className="text-sm text-neutral-600">CEP: {reception.cep}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-500">Localização da recepção não configurada</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

