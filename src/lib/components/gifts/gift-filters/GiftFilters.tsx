'use client'

import { useState } from 'react'
import { GiftFiltersProps } from './types'
import type { GiftCategory, PriceRange } from '@/lib/types/gift'

const categories: Array<{ value: GiftCategory; label: string }> = [
  { value: 'casa', label: 'Casa' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'decoracao', label: 'Decoração' },
  { value: 'eletrodomesticos', label: 'Eletrodomésticos' },
  { value: 'quarto', label: 'Quarto' },
  { value: 'banheiro', label: 'Banheiro' },
  { value: 'outros', label: 'Outros' },
]

const priceRanges: Array<{ value: PriceRange; label: string }> = [
  { value: 'baixo', label: 'Até R$ 100' },
  { value: 'medio', label: 'R$ 100 - R$ 500' },
  { value: 'alto', label: 'Acima de R$ 500' },
]

export function GiftFilters({ filters, onFiltersChange }: GiftFiltersProps) {
  const [search, setSearch] = useState(filters.search || '')

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFiltersChange({ ...filters, search: value || undefined })
  }

  const handleCategoryChange = (category: GiftCategory | undefined) => {
    onFiltersChange({ ...filters, category })
  }

  const handlePriceRangeChange = (priceRange: PriceRange | undefined) => {
    onFiltersChange({ ...filters, priceRange })
  }

  const clearFilters = () => {
    setSearch('')
    onFiltersChange({})
  }

  const hasActiveFilters = filters.category || filters.priceRange || filters.search

  const filterButtonBase =
    'px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap'
  const filterButtonInactive =
    'bg-white text-charcoal-600 border border-cream-200 hover:border-terracota-300 hover:text-terracota-600'
  const filterButtonActive = 'bg-terracota-600 text-white border border-terracota-600'

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Busca */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-charcoal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar presente..."
          className="block w-full pl-9 pr-3 py-2 border border-cream-200 rounded-lg text-sm text-charcoal-700 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-terracota-400/40 focus:border-terracota-400 transition-colors bg-white"
        />
      </div>

      {/* Filtros */}
      <div className="space-y-2">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                handleCategoryChange(filters.category === cat.value ? undefined : cat.value)
              }
              className={`${filterButtonBase} ${
                filters.category === cat.value ? filterButtonActive : filterButtonInactive
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Faixa de preço + limpar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2 flex-1">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() =>
                  handlePriceRangeChange(
                    filters.priceRange === range.value ? undefined : range.value
                  )
                }
                className={`${filterButtonBase} ${
                  filters.priceRange === range.value ? filterButtonActive : filterButtonInactive
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-charcoal-500 border border-cream-200 hover:border-terracota-300 hover:text-terracota-600 px-3 py-1 rounded-full transition-all whitespace-nowrap"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
