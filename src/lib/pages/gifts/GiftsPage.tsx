'use client'

import { useState, useEffect, useMemo } from 'react'
import { GiftsPageProps, GiftsPageContentProps } from './types'
import { GiftsPageMobile } from './GiftsPageMobile'
import { GiftsPageDesktop } from './GiftsPageDesktop'
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp'
import type { Gift, GiftFilters } from '@/lib/types/gift'
import { giftMatchesSearch } from '@/lib/utils/gift-search'

export function GiftsPage({ whatsappPhone, pixSettings }: GiftsPageProps) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<GiftFilters>({})

  useEffect(() => {
    loadGifts()
  }, [])

  const loadGifts = async () => {
    try {
      const res = await fetch('/api/gifts')
      const data = await res.json()
      setGifts(data)
    } catch (error) {
      console.error('Error loading gifts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      if (filters.category && gift.category !== filters.category) return false
      if (filters.priceRange && gift.priceRange !== filters.priceRange) return false
      if (filters.offeringType && gift.offeringType !== filters.offeringType) return false

      if (filters.search && !giftMatchesSearch(gift, filters.search)) return false

      return true
    })
  }, [gifts, filters])

  const handleReserve = async (giftId: string) => {
    if (!whatsappPhone) return
    const gift = gifts.find((g) => g.id === giftId)
    if (!gift) return

    const priceText = gift.price
      ? `R$ ${gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      : gift.priceRange
        ? gift.priceRange === 'baixo'
          ? 'Até R$ 100'
          : gift.priceRange === 'medio'
            ? 'R$ 100 - R$ 500'
            : 'Acima de R$ 500'
        : 'Valor a combinar'

    const isUnique = gift.offeringType === 'unique'

    const message = isUnique
      ? `Olá! Gostaria de me comprometer a presentear com:\n\n*${gift.name}*\n${priceText}${gift.description ? `\n\n${gift.description}` : ''}\n\nComo é um presente único, por favor confirme a disponibilidade. 💕`
      : `Olá! Gostaria de presentear com:\n\n*${gift.name}*\n${priceText}${gift.description ? `\n\n${gift.description}` : ''}\n\nObrigado(a)! 💕`

    window.open(buildWhatsAppUrl(whatsappPhone, message), '_blank', 'noopener,noreferrer')
  }

  const contentProps: GiftsPageContentProps = {
    gifts,
    loading,
    filters,
    filteredGifts,
    onFiltersChange: setFilters,
    onReserve: whatsappPhone ? handleReserve : undefined,
    whatsappPhone,
    pixSettings,
  }

  return (
    <div className="min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <GiftsPageMobile {...contentProps} />
      <GiftsPageDesktop {...contentProps} />
    </div>
  )
}
