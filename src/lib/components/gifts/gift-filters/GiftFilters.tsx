'use client'

import { useState, useEffect, useMemo } from 'react'
import { GiftFiltersProps } from './types'
import type { GiftCategory, PriceRange, OfferingType } from '@/lib/types/gift'
import { Icon } from '@/lib/components/icons'
import { cn } from '@/lib/utils/cn'

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

const offeringTypes: Array<{ value: OfferingType; label: string }> = [
  { value: 'unique', label: 'Presente único' },
  { value: 'repeatable', label: 'Vários podem presentear' },
]

function labelForCategory(v: GiftCategory) {
  return categories.find((c) => c.value === v)?.label ?? v
}

function labelForPrice(v: PriceRange) {
  return priceRanges.find((p) => p.value === v)?.label ?? v
}

function labelForOffering(v: OfferingType) {
  return offeringTypes.find((o) => o.value === v)?.label ?? v
}

export function GiftFilters({ filters, onFiltersChange }: GiftFiltersProps) {
  const [search, setSearch] = useState(filters.search || '')
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    setSearch(filters.search || '')
  }, [filters.search])

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

  const handleOfferingTypeChange = (offeringType: OfferingType | undefined) => {
    onFiltersChange({ ...filters, offeringType })
  }

  const clearFilters = () => {
    setSearch('')
    onFiltersChange({})
  }

  const clearStructuralOnly = () => {
    onFiltersChange({
      ...filters,
      category: undefined,
      priceRange: undefined,
      offeringType: undefined,
    })
  }

  const hasSearch = Boolean(filters.search?.trim())
  const hasStructural =
    Boolean(filters.category) || Boolean(filters.priceRange) || Boolean(filters.offeringType)
  const hasActiveFilters = hasSearch || hasStructural

  const structuralCount = useMemo(
    () => [filters.category, filters.priceRange, filters.offeringType].filter(Boolean).length,
    [filters.category, filters.priceRange, filters.offeringType],
  )

  const filterButtonBase =
    'inline-flex min-h-[2.5rem] items-center justify-center rounded-full border px-3.5 py-2 text-sm font-medium transition-all sm:min-h-0 sm:px-4'
  const filterButtonInactive =
    'border-stone-200 bg-white text-charcoal-600 hover:border-terracota-300 hover:text-terracota-600'
  const filterButtonActive = 'border-terracota-600 bg-terracota-600 text-white'

  const activeChipClass =
    'inline-flex max-w-full items-center gap-1 rounded-full border border-terracota-200 bg-terracota-50 py-1 pl-3 pr-1 text-sm font-medium text-terracota-800'

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Busca + abrir painel */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative min-w-0 flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Icon.Search width="1.25rem" height="1.25rem" className="text-charcoal-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar nome, marca ou palavra-chave..."
            className="block min-h-[3rem] w-full rounded-xl border border-stone-200 bg-white py-3 pl-12 pr-4 text-base text-charcoal-800 shadow-sm placeholder:text-charcoal-400 transition-colors focus:border-terracota-400 focus:outline-none focus:ring-2 focus:ring-terracota-400/35"
          />
        </div>

        <button
          type="button"
          id="gift-filters-toggle"
          aria-expanded={panelOpen}
          aria-controls="gift-filters-panel"
          onClick={() => setPanelOpen((o) => !o)}
          className={cn(
            'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all sm:min-w-[8.5rem]',
            panelOpen
              ? 'border-terracota-400 bg-terracota-50 text-terracota-800'
              : 'border-stone-200 bg-white text-charcoal-700 shadow-sm hover:border-terracota-300 hover:text-terracota-700',
          )}
        >
          <Icon.Filter width="1.125rem" height="1.125rem" className="shrink-0" />
          <span>Filtros</span>
          {structuralCount > 0 && (
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-terracota-600 px-1.5 text-xs font-bold text-white">
              {structuralCount}
            </span>
          )}
        </button>
      </div>

      {/* Chips dos filtros ativos (categoria, preço, tipo) */}
      {hasStructural && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.category && (
            <button
              type="button"
              onClick={() => handleCategoryChange(undefined)}
              className={activeChipClass}
              aria-label={`Remover filtro: ${labelForCategory(filters.category)}`}
            >
              <span className="truncate">{labelForCategory(filters.category)}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-terracota-600 hover:bg-terracota-100">
                <Icon.Close width="0.875rem" height="0.875rem" aria-hidden />
              </span>
            </button>
          )}
          {filters.priceRange && (
            <button
              type="button"
              onClick={() => handlePriceRangeChange(undefined)}
              className={activeChipClass}
              aria-label={`Remover filtro: ${labelForPrice(filters.priceRange)}`}
            >
              <span className="truncate">{labelForPrice(filters.priceRange)}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-terracota-600 hover:bg-terracota-100">
                <Icon.Close width="0.875rem" height="0.875rem" aria-hidden />
              </span>
            </button>
          )}
          {filters.offeringType && (
            <button
              type="button"
              onClick={() => handleOfferingTypeChange(undefined)}
              className={activeChipClass}
              aria-label={`Remover filtro: ${labelForOffering(filters.offeringType)}`}
            >
              <span className="truncate">{labelForOffering(filters.offeringType)}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-terracota-600 hover:bg-terracota-100">
                <Icon.Close width="0.875rem" height="0.875rem" aria-hidden />
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={clearStructuralOnly}
            className="text-sm font-medium text-charcoal-500 underline-offset-2 hover:text-terracota-600 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Painel completo (oculto por defeito) */}
      {panelOpen && (
      <div
        id="gift-filters-panel"
        role="region"
        aria-labelledby="gift-filters-toggle"
        className="overflow-hidden rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <p className="mb-3 text-xs font-medium text-charcoal-500">Categoria</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() =>
                handleCategoryChange(filters.category === cat.value ? undefined : cat.value)
              }
              className={cn(
                filterButtonBase,
                filters.category === cat.value ? filterButtonActive : filterButtonInactive,
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="mb-3 text-xs font-medium text-charcoal-500">Faixa de preço</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() =>
                handlePriceRangeChange(
                  filters.priceRange === range.value ? undefined : range.value,
                )
              }
              className={cn(
                filterButtonBase,
                filters.priceRange === range.value ? filterButtonActive : filterButtonInactive,
              )}
            >
              {range.label}
            </button>
          ))}
        </div>

        <p className="mb-3 text-xs font-medium text-charcoal-500">Tipo de presente</p>
        <div className="flex flex-wrap gap-2">
          {offeringTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() =>
                handleOfferingTypeChange(
                  filters.offeringType === type.value ? undefined : type.value,
                )
              }
              className={cn(
                filterButtonBase,
                filters.offeringType === type.value ? filterButtonActive : filterButtonInactive,
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-3 border-t border-stone-100 pt-4">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                clearFilters()
                setPanelOpen(false)
              }}
              className="text-sm font-medium text-charcoal-500 hover:text-terracota-600"
            >
              Limpar tudo
            </button>
          )}
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="rounded-lg bg-terracota-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-terracota-700"
          >
            Fechar
          </button>
        </div>
      </div>
      )}
    </div>
  )
}
