'use client'

import { useState, useEffect } from 'react'
import { ItemCard, type ItemAction } from '@/lib/components/ui/card'
import { Button } from '@/lib/components/ui/button'
import { GiftsManager } from '@/lib/components/settings/gifts-manager'
import { Icon } from '@/lib/components/icons'
import type { Gift } from '@/lib/types/gift'

export function GiftsTab() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [showManager, setShowManager] = useState(false)
  const [editingGift, setEditingGift] = useState<Gift | null>(null)

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

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este presente?')) return

    try {
      const response = await fetch(`/api/gifts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadGifts()
      }
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

  if (loading) {
    return (
      <div className="text-center py-4 text-sm text-gray-600">
        Carregando presentes...
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Lista de Presentes
          </h3>
          <p className="mt-0.5 text-xs text-gray-600">
            {gifts.length === 0
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

      {/* Lista de Presentes */}
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
            // Monta a descrição com metadados
            const metadataParts: string[] = []
            if (gift.price) {
              metadataParts.push(`R$ ${gift.price.toFixed(2)}`)
            }
            if (gift.priceRange) {
              metadataParts.push(
                `Faixa: ${gift.priceRange.charAt(0).toUpperCase() + gift.priceRange.slice(1)}`
              )
            }
            if ((gift.priority ?? 0) > 0) {
              metadataParts.push(`Prioridade: ${gift.priority}`)
            }

            const categoryLabel =
              gift.category.charAt(0).toUpperCase() + gift.category.slice(1)
            const statusLabel =
              gift.status === 'reserved'
                ? ' • Reservado'
                : gift.status === 'purchased'
                  ? ' • Comprado'
                  : ''

            const description = [
              gift.description,
              categoryLabel + statusLabel,
              metadataParts.length > 0 ? metadataParts.join(' • ') : null,
            ]
              .filter(Boolean)
              .join('\n')

            // Monta as ações
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
    </div>
  )
}
