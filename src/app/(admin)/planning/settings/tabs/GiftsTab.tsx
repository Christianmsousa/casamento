'use client'

import { useState, useEffect } from 'react'
import { ItemCard, type ItemAction } from '@/lib/components/ui/card'
import { Button } from '@/lib/components/ui/button'
import { GiftsManager } from '@/lib/components/settings/gifts-manager'
import { Icon } from '@/lib/components/icons'
import type { Gift, Settings } from '@/lib/types'

interface GiftsTabProps {
  settings: Settings
  saving: boolean
  onSaveSettings: (partial: Partial<Settings>) => Promise<boolean>
}

export function GiftsTab({ settings, saving, onSaveSettings }: GiftsTabProps) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [showManager, setShowManager] = useState(false)
  const [editingGift, setEditingGift] = useState<Gift | null>(null)
  const [whatsappPhone, setWhatsappPhone] = useState(settings.gifts_whatsapp ?? '')
  const [whatsappSaved, setWhatsappSaved] = useState(false)

  useEffect(() => {
    setWhatsappPhone(settings.gifts_whatsapp ?? '')
  }, [settings.gifts_whatsapp])

  useEffect(() => {
    loadGifts()
  }, [])

  const loadGifts = async () => {
    try {
      const response = await fetch('/api/gifts')
      if (response.ok) {
        const data = await response.json()
        setGifts(data)
      }
    } catch (error) {
      console.error('Erro ao carregar presentes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveWhatsapp = async () => {
    const onlyDigits = whatsappPhone.replace(/\D/g, '')
    const ok = await onSaveSettings({ gifts_whatsapp: onlyDigits })
    if (ok) {
      setWhatsappSaved(true)
      setTimeout(() => setWhatsappSaved(false), 2500)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este presente?')) return
    try {
      const response = await fetch(`/api/gifts/${id}`, { method: 'DELETE' })
      if (response.ok) await loadGifts()
    } catch (error) {
      console.error('Erro ao excluir presente:', error)
    }
  }

  if (showManager) {
    return (
      <div className="space-y-4">
        <Button
          onClick={() => {
            setShowManager(false)
            setEditingGift(null)
          }}
          variant="outline"
          size="sm"
          text="← Voltar para lista"
        />
        <GiftsManager
          initialGift={editingGift}
          onClose={() => {
            setShowManager(false)
            setEditingGift(null)
            loadGifts()
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* WhatsApp */}
      <div className="rounded-lg border border-neutral-200 bg-white p-4 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">WhatsApp dos Presentes</h3>
          <p className="mt-0.5 text-xs text-neutral-500">
            Número para onde os convidados enviarão a mensagem ao clicar em "Presentear".
          </p>
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Número (só dígitos, ex: 551998949240)
            </label>
            <input
              type="text"
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="551998949240"
              maxLength={15}
              className="block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-terracota-400/40 focus:border-terracota-400 transition-colors"
            />
          </div>
          <Button
            onClick={handleSaveWhatsapp}
            disabled={saving}
            variant="primary"
            size="sm"
            text={whatsappSaved ? 'Salvo!' : 'Salvar'}
          />
        </div>
      </div>

      {/* Lista de Presentes */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Lista de Presentes</h3>
            <p className="mt-0.5 text-xs text-gray-600">
              {loading
                ? 'Carregando...'
                : gifts.length === 0
                  ? 'Nenhum presente cadastrado'
                  : `${gifts.length} ${gifts.length === 1 ? 'presente cadastrado' : 'presentes cadastrados'}`}
            </p>
          </div>
          <Button
            onClick={() => setShowManager(true)}
            variant="primary"
            size="sm"
            text="+ Adicionar Presente"
          />
        </div>

        {!loading && (
          <div className="space-y-3">
            {gifts.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                <p className="text-sm text-gray-500">Nenhum presente cadastrado ainda.</p>
                <p className="mt-1 text-xs text-gray-400">
                  Clique em "Adicionar Presente" para começar
                </p>
              </div>
            ) : (
              gifts.map((gift) => {
                const metadataParts: string[] = []
                if (gift.price) metadataParts.push(`R$ ${gift.price.toFixed(2)}`)
                if (gift.priceRange)
                  metadataParts.push(
                    `Faixa: ${gift.priceRange.charAt(0).toUpperCase() + gift.priceRange.slice(1)}`
                  )
                if ((gift.priority ?? 0) > 0) metadataParts.push(`Prioridade: ${gift.priority}`)

                const categoryLabel =
                  gift.category.charAt(0).toUpperCase() + gift.category.slice(1)
                const statusLabel =
                  gift.status === 'reserved'
                    ? ' • Reservado'
                    : gift.status === 'purchased'
                      ? ' • Comprado'
                      : ''
                const offeringLabel =
                  gift.offeringType === 'unique' ? ' • Presente único' : ' • Vários podem presentear'

                const description = [
                  gift.description,
                  categoryLabel + statusLabel + offeringLabel,
                  metadataParts.length > 0 ? metadataParts.join(' • ') : null,
                ]
                  .filter(Boolean)
                  .join('\n')

                const actions: ItemAction[] = [
                  {
                    icon: 'Edit',
                    tooltip: 'Editar presente',
                    onClick: () => {
                      setEditingGift(gift)
                      setShowManager(true)
                    },
                  },
                  {
                    icon: 'Trash',
                    tooltip: 'Excluir presente',
                    onClick: () => handleDelete(gift.id),
                  },
                ]

                return (
                  <ItemCard
                    key={gift.id}
                    title={gift.name}
                    description={description}
                    actions={actions}
                    variant="primary"
                    icon={<Icon.Gift width="1.25rem" height="1.25rem" />}
                  />
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
