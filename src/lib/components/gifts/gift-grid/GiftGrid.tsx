'use client'

import { GiftGridProps } from './types'
import { GiftCard } from '../gift-card'
import { Icon } from '@/lib/components/icons'
import { RevealOnScroll } from '@/lib/components/motion'

export function GiftGrid({
  gifts,
  onReserve,
  loading = false,
}: GiftGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-7">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 md:h-52 lg:h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-8 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (gifts.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 lg:py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-terracota-50 mb-4 md:mb-6">
          <Icon.GiftOutline width="2.5rem" height="2.5rem" className="text-terracota-400" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
          Nenhum presente encontrado
        </h3>
        <p className="text-gray-600">
          Tente ajustar os filtros ou buscar por outro termo.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-7">
      {gifts.map((gift, index) => (
        <RevealOnScroll key={gift.id} delayMs={Math.min(index * 45, 400)}>
          <GiftCard gift={gift} onReserve={onReserve} />
        </RevealOnScroll>
      ))}
    </div>
  )
}

