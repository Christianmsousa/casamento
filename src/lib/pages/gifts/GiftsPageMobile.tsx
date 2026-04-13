import { GiftsPageContentProps } from './types'
import { GiftGrid, GiftFilters } from '@/lib/components/gifts'
import { PixBlock } from '@/lib/components/gifts/pix-block'
import { RevealOnScroll } from '@/lib/components/motion'
import { GiftsPageHero } from './GiftsPageHero'

export function GiftsPageMobile({
  gifts,
  loading,
  filters,
  filteredGifts,
  onFiltersChange,
  onReserve,
  pixSettings,
}: GiftsPageContentProps) {
  return (
    <div className="lg:hidden">
      <section className="border-t border-gold-200/45 bg-cream-50 px-6 pt-24 pb-14 sm:px-8 sm:pb-20">
        <div className="max-w-7xl mx-auto">

          <GiftsPageHero />

          {/* Filtros */}
          <RevealOnScroll className="mb-7 sm:mb-8 block">
            <GiftFilters filters={filters} onFiltersChange={onFiltersChange} />
          </RevealOnScroll>

          {/* Contador */}
          {!loading && (
            <RevealOnScroll className="mb-5 block">
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
            <RevealOnScroll className="mt-10 block sm:mt-12">
              <PixBlock pix={pixSettings} />
            </RevealOnScroll>
          )}
        </div>
      </section>
    </div>
  )
}
