'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { TabView, type TabViewItem } from '@/lib/components/tab-bar'
import { EventInfoTab } from './tabs/EventInfoTab'
import { GiftsTab } from './tabs/GiftsTab'
import type { Settings } from '@/lib/types'

export function SettingsPageClient() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get('tab') || 'event'

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async (updatedSettings: Partial<Settings>): Promise<boolean> => {
    if (!settings) return false

    setSaving(true)
    try {
      const newSettings = { ...settings, ...updatedSettings }
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      })

      if (response.ok) {
        const saved = await response.json()
        setSettings(saved)
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleTabChange = (tabId: string) => {
    const url = new URL(window.location.href)

    if (tabId === 'event') {
      url.searchParams.delete('tab')
    } else {
      url.searchParams.set('tab', tabId)
    }

    router.push(url.pathname + url.search, { scroll: false })
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="text-center text-xs text-gray-600">Carregando...</div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="text-center text-xs text-red-600">Erro ao carregar configurações</div>
      </div>
    )
  }

  const tabs: TabViewItem[] = [
    {
      id: 'event',
      label: 'Evento',
      content: (
        <EventInfoTab
          settings={settings}
          saving={saving}
          onSaveDate={(date) => handleSaveSettings({ wedding_date: date })}
          onSaveLocation={(ceremony, reception) =>
            handleSaveSettings({
              ceremony_location: ceremony,
              reception_location: reception,
            })
          }
        />
      ),
    },
    {
      id: 'gifts',
      label: 'Lista de Presentes',
      content: <GiftsTab />,
    },
  ]

  return (
    <>
      <div className="mb-3">
        <h1 className="text-base font-semibold text-gray-900">Configurações do Casamento</h1>
        <p className="mt-0.5 text-sm text-gray-600">
          Gerencie as informações exibidas na landing page
        </p>
      </div>

      <div className="space-y-3">
        <TabView tabs={tabs} activeTab={currentTab} onChange={handleTabChange} />
      </div>
    </>
  )
}
