import { Suspense } from 'react'
import { SettingsPageClient } from './SettingsPageClient'

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="text-center text-xs text-gray-600">Carregando...</div>
        </div>
      }
    >
      <SettingsPageClient />
    </Suspense>
  )
}
