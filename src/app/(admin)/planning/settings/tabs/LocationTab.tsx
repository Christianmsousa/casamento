'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/lib/components/ui/card'
import { LocationForm } from '@/lib/components/settings/location-form'
import type { Settings, LocationDetails } from '@/lib/types'

interface LocationTabProps {
  settings: Settings
  saving: boolean
  onSave: (ceremony: string | LocationDetails, reception: string | LocationDetails) => Promise<boolean>
}

export function LocationTab({ settings, saving, onSave }: LocationTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Localização</CardTitle>
      </CardHeader>
      <CardContent>
        <LocationForm
          ceremonyLocation={settings.ceremony_location}
          receptionLocation={settings.reception_location}
          onSave={onSave}
          saving={saving}
        />
      </CardContent>
    </Card>
  )
}

