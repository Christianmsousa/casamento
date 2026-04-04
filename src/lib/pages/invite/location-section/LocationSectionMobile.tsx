import { LocationSectionContentProps } from './types'
import { LocationMap } from '@/lib/components/location/location-map'

export function LocationSectionMobile({
  location,
  formattedLocation,
  omitEventHeading = false,
}: LocationSectionContentProps) {
  if (!location) return null

  return (
    <div className="lg:hidden flex flex-col gap-8">

      {!omitEventHeading && (
        <>
          {/* Eyebrow + título */}
          <div className="text-center">
            <p className="text-[0.65rem] sm:text-xs font-medium tracking-[0.2em] text-gold-600 uppercase mb-3">
              Cerimônia & Recepção
            </p>
            <h2
              className="font-serif text-charcoal-800 mb-4"
              style={{ fontSize: 'clamp(1.6rem, 7vw, 2.5rem)' }}
            >
              Um único lugar,<br />duas celebrações
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gold-400" />
              <div className="w-1 h-1 rounded-full bg-gold-500" />
              <div className="h-px w-10 bg-gold-400" />
            </div>
          </div>
        </>
      )}

      {/* Endereço */}
      <p className="text-center text-sm sm:text-base text-charcoal-500 font-light leading-relaxed whitespace-pre-line">
        {formattedLocation}
      </p>

      {/* Mapa */}
      <div className="rounded-2xl overflow-hidden shadow-md border border-cream-200 h-56 sm:h-64">
        <LocationMap location={location} title="Local do evento" />
      </div>
    </div>
  )
}
