'use client'

import { GiftGridProps } from './types'
import { GiftCard } from '../gift-card'

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
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-terracota-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
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
      {gifts.map((gift) => (
        <GiftCard
          key={gift.id}
          gift={gift}
          onReserve={onReserve}
        />
      ))}
    </div>
  )
}

