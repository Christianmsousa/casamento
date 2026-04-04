import { GiftsPageContentProps } from './types'
import { GiftGrid, GiftFilters } from '@/lib/components/gifts'
import { Icon } from '@/lib/components/icons'

export function GiftsPageMobile({
  gifts,
  loading,
  filters,
  filteredGifts,
  onFiltersChange,
  onReserve,
}: GiftsPageContentProps) {
  return (
    <div className="lg:hidden">
      <section className="bg-cream pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-terracota-100 mb-5">
              <Icon.Gift width="1.75rem" height="1.75rem" className="text-terracota-500" />
            </div>

            <p className="text-[0.65rem] sm:text-xs font-medium tracking-[0.25em] text-gold-600 uppercase mb-3">
              Para vocês
            </p>

            <h1
              className="font-serif text-charcoal-800 mb-4"
              style={{ fontSize: 'clamp(1.8rem, 8vw, 2.8rem)' }}
            >
              Lista de Presentes
            </h1>

            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold-400" />
              <div className="w-1 h-1 rounded-full bg-gold-500" />
              <div className="h-px w-10 bg-gold-400" />
            </div>

            <p className="text-sm sm:text-base text-charcoal-500 font-light leading-relaxed max-w-lg mx-auto">
              Sua presença é o maior presente. Se desejar nos presentear além disso, temos essas sugestões e ficaremos muito felizes.
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-7 sm:mb-8">
            <GiftFilters filters={filters} onFiltersChange={onFiltersChange} />
          </div>

          {/* Contador */}
          {!loading && (
            <div className="mb-5 text-sm text-charcoal-500">
              {filteredGifts.length === 1
                ? '1 presente encontrado'
                : `${filteredGifts.length} presentes encontrados`}
            </div>
          )}

          {/* Grid */}
          <GiftGrid gifts={filteredGifts} onReserve={onReserve} loading={loading} />
        </div>
      </section>
    </div>
  )
}
