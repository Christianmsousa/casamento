'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/lib/components/ui/card'
import { WeddingDateForm } from '@/lib/components/settings/wedding-date-form'
import type { Settings } from '@/lib/types'

interface DateTabProps {
  settings: Settings
  saving: boolean
  onSave: (date: string) => Promise<boolean>
}

export function DateTab({ settings, saving, onSave }: DateTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data e Hora do Casamento</CardTitle>
      </CardHeader>
      <CardContent>
        <WeddingDateForm
          weddingDate={settings.wedding_date}
          onSave={onSave}
          saving={saving}
        />
      </CardContent>
    </Card>
  )
}

