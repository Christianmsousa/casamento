import { LocationMap } from '@/lib/components/location/location-map'
import { cn } from '@/lib/utils/cn'
import { LocationSectionContentProps } from './types'

export function LocationSectionDesktop({
  location,
  formattedLocation,
  omitEventHeading = false,
}: LocationSectionContentProps) {
  if (!location) return null

  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-12">
      {/* Detalhes do evento — 2 colunas */}
      <div className="grid grid-cols-2 gap-8 xl:gap-12">

        {/* Cerimônia / só endereço */}
        <div className="flex flex-col gap-4">
          {!omitEventHeading && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-px h-8 bg-gold-400" />
                <p className="text-[0.65rem] font-medium tracking-[0.2em] text-gold-600 uppercase">
                  Cerimônia & Recepção
                </p>
              </div>
              <p className="font-serif text-charcoal-800 text-2xl xl:text-3xl leading-snug">
                Um único lugar,<br />duas celebrações
              </p>
            </>
          )}
          <div
            className={cn(
              'text-base text-charcoal-500 font-light leading-relaxed whitespace-pre-line',
              !omitEventHeading && 'mt-1',
            )}
          >
            {formattedLocation}
          </div>
        </div>

        {/* Mapa */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-cream-200 h-64 xl:h-72">
          <LocationMap location={location} title="Local do evento" />
        </div>
      </div>
    </div>
  )
}
