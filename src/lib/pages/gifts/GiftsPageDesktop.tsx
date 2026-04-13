import { GiftsPageContentProps } from './types'
import { GiftGrid, GiftFilters } from '@/lib/components/gifts'
import { PixBlock } from '@/lib/components/gifts/pix-block'
import { RevealOnScroll } from '@/lib/components/motion'
import { GiftsPageHero } from './GiftsPageHero'

export function GiftsPageDesktop({
  gifts,
  loading,
  filters,
  filteredGifts,
  onFiltersChange,
  onReserve,
  pixSettings,
}: GiftsPageContentProps) {
  return (
    <div className="hidden lg:block">
      <section className="border-t border-gold-200/45 bg-cream-50 px-6 pt-28 pb-16 sm:px-8 lg:px-12 lg:pb-24 xl:py-28">
        <div className="max-w-7xl mx-auto">

          <GiftsPageHero />

          {/* Filtros */}
          <RevealOnScroll className="mb-8 block lg:mb-10">
            <GiftFilters filters={filters} onFiltersChange={onFiltersChange} />
          </RevealOnScroll>

          {/* Contador */}
          {!loading && (
            <RevealOnScroll className="mb-6 block">
              <div className="text-base font-medium text-charcoal-600">
                {filteredGifts.length === 1
                  ? '1 presente encontrado'
                  : `${filteredGifts.length} presentes encontrados`}
              </div>
            </RevealOnScroll>
          )}

          {/* Grid */}
          <GiftGrid gifts={filteredGifts} onReserve={onReserve} loading={loading} />

          {/* Bloco PIX */}
          {pixSettings && (
            <RevealOnScroll className="mt-12 block lg:mt-14">
              <PixBlock pix={pixSettings} />
            </RevealOnScroll>
          )}
        </div>
      </section>
    </div>
  )
}
