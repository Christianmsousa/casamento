'use client'

import { useState, useEffect, useMemo } from 'react'
import { GiftsPageProps, GiftsPageContentProps } from './types'
import { GiftsPageMobile } from './GiftsPageMobile'
import { GiftsPageDesktop } from './GiftsPageDesktop'
import type { Gift, GiftCategory, PriceRange } from '@/lib/types/gift'

export function GiftsPage({}: GiftsPageProps) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<{
    category?: GiftCategory
    priceRange?: PriceRange
    search?: string
  }>({})

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
      // Filtro por categoria
      if (filters.category && gift.category !== filters.category) {
        return false
      }

      // Filtro por faixa de preço
      if (filters.priceRange && gift.priceRange !== filters.priceRange) {
        return false
      }

      // Filtro por busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesName = gift.name.toLowerCase().includes(searchLower)
        const matchesDescription = gift.description?.toLowerCase().includes(searchLower)
        const matchesCategory = gift.category.toLowerCase().includes(searchLower)
        
        if (!matchesName && !matchesDescription && !matchesCategory) {
          return false
        }
      }

      return true
    })
  }, [gifts, filters])

  const handleReserve = async (giftId: string) => {
    const gift = gifts.find((g) => g.id === giftId)
    if (!gift) return

    // Formata a mensagem para o WhatsApp
    const priceText = gift.price 
      ? `R$ ${gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      : gift.priceRange 
        ? (gift.priceRange === 'baixo' ? 'Até R$ 100' : gift.priceRange === 'medio' ? 'R$ 100 - R$ 500' : 'Acima de R$ 500')
        : 'Valor a combinar'
    
    const message = `Olá! Gostaria de presentear com:\n\n*${gift.name}*\n${priceText}\n\n${gift.description ? `${gift.description}\n\n` : ''}Obrigado(a)! 💕`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5535988384599?text=${encodedMessage}`
    
    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const contentProps: GiftsPageContentProps = {
    gifts,
    loading,
    filters,
    filteredGifts,
    onFiltersChange: setFilters,
    onReserve: handleReserve,
  }

  return (
    <div className="min-h-screen bg-cream pb-16 md:pb-0">
      <GiftsPageMobile {...contentProps} />
      <GiftsPageDesktop {...contentProps} />
    </div>
  )
}

