import { GiftsPageContentProps } from './types'
import { GiftGrid, GiftFilters } from '@/lib/components/gifts'
import { Icon } from '@/lib/components/icons'

export function GiftsPageDesktop({
  gifts,
  loading,
  filters,
  filteredGifts,
  onFiltersChange,
  onReserve,
}: GiftsPageContentProps) {
  return (
    <div className="hidden lg:block">
      <section className="bg-cream pt-28 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 lg:mb-14">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-terracota-100 mb-6">
              <Icon.Gift width="1.75rem" height="1.75rem" className="text-terracota-500" />
            </div>

            <p className="text-xs font-medium tracking-[0.25em] text-gold-600 uppercase mb-4">
              Para vocês
            </p>

            <h1
              className="font-serif text-charcoal-800 mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Lista de Presentes
            </h1>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <div className="h-px w-12 bg-gold-400" />
            </div>

            <p className="text-base lg:text-lg text-charcoal-500 font-light leading-relaxed max-w-2xl mx-auto">
              Sua presença é o maior presente. Se desejar nos presentear além disso, temos essas sugestões e ficaremos muito felizes.
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8 lg:mb-10">
            <GiftFilters filters={filters} onFiltersChange={onFiltersChange} />
          </div>

          {/* Contador */}
          {!loading && (
            <div className="mb-6 text-sm text-charcoal-500">
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
