import type { LocationDetails } from '@/lib/types'
import { manualPadrinhosToneClass } from '@/lib/utils/manual-padrinhos-tone'
import { cn } from '@/lib/utils/cn'
import { LocationMap } from '@/lib/components/location/location-map'
import { LocationSectionMobile } from '../location-section/LocationSectionMobile'
import { LocationSectionDesktop } from '../location-section/LocationSectionDesktop'

export interface GuestLocationSectionProps {
  /** Há texto da cerimónia (data nas definições). */
  hasWeddingDate: boolean
  /** Ex.: "14 de novembro" */
  weddingDayMonthLabel: string
  /** Ex.: "16h" — horário da cerimónia (destaque terracota; navy só no manual dos padrinhos). */
  ceremonyTimeSpoken: string
  location: string | LocationDetails | undefined
  formattedLocation: string
}

const bodyProse =
  'text-sm font-light leading-relaxed text-charcoal-500 sm:text-base'

/**
 * Secção cerimónia + local. Destaque terracota só na data e no horário; navy só no manual (padrinhos).
 */
export function GuestLocationSection({
  hasWeddingDate,
  weddingDayMonthLabel,
  ceremonyTimeSpoken,
  location,
  formattedLocation,
}: GuestLocationSectionProps) {
  const showMessage = hasWeddingDate
  const showLocation = Boolean(location)

  const omitLocationHeading = showMessage && showLocation
  const dayPhrase = weddingDayMonthLabel.trim() || 'este dia'
  const t = manualPadrinhosToneClass

  /** Títulos “Cerimônia & Recepção” + “Um único lugar…” — mesmo markup em todos os estados (com/sem data). */
  const ceremonyHeadingsMarkup = (
    <div className="text-center lg:text-left">
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-3">
        <div className="hidden h-8 w-px shrink-0 bg-terracota-400 lg:block" aria-hidden />
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-terracota-600 sm:text-xs">
          Cerimônia & Recepção
        </p>
      </div>
      <h2
        className="mt-4 font-serif leading-snug text-charcoal-800 lg:mt-5"
        style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}
      >
        Um único lugar,
        <br />
        duas celebrações
      </h2>
      <div
        className="mx-auto mt-5 flex items-center justify-center gap-3 sm:mt-6 lg:mx-0 lg:justify-start"
        aria-hidden
      >
        <div className="h-px w-12 bg-gold-400" />
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
        <div className="h-px w-12 bg-gold-400" />
      </div>
    </div>
  )

  const ceremonyBody = showMessage && (
    <div className={cn('space-y-4 text-pretty lg:max-w-xl', bodyProse)}>
      <p>
        <span className={t('terracota')}>No dia {dayPhrase}</span>, a missão é simples… mas exige
        estratégia: arrume o cabelo com calma, escolha aquela roupa que você sabe que vai render
        elogios, passe aquele perfume especial, confira a localização e deixe tudo certo antes de
        sair.
      </p>
      <p>A ideia é chegar leve, tranquilo e pronto pra viver esse momento com a gente.</p>
      <p>
        Nossa cerimônia começa às <span className={t('terracota')}>{ceremonyTimeSpoken}</span> —{' '}
        <span className="italic text-charcoal-500">sem atraso, sem reprise.</span>
      </p>
      <p>
        Então venha com antecedência, encontre seu lugar, respire fundo… e aproveite cada detalhe
        desde o início.
      </p>
    </div>
  )

  /** Bloco completo (títulos + corpo) só quando há mensagem mas não há mapa na mesma secção em layout “simples”. */
  const messageBlockFull = showMessage && (
    <div className="flex min-w-0 flex-col gap-5">
      {ceremonyHeadingsMarkup}
      {ceremonyBody}
    </div>
  )

  const mapColumn =
    showLocation && (
      <div className="flex w-full flex-col gap-6 lg:sticky lg:top-28 lg:min-w-[min(100%,420px)] lg:max-w-[min(760px,52%)] lg:flex-[0_1_52%] lg:shrink-0 xl:min-w-[480px] xl:max-w-[min(820px,50%)]">
        <p
          className={cn(
            'text-center whitespace-pre-line sm:text-base lg:text-left',
            bodyProse,
          )}
        >
          {formattedLocation}
        </p>
        <div className="h-56 overflow-hidden rounded-2xl border border-cream-200 shadow-lg sm:h-64 lg:h-[min(24rem,52vh)] xl:h-[26rem]">
          <LocationMap location={location!} title="Local do evento" />
        </div>
      </div>
    )

  return (
    <section id="cerimonia" className="scroll-mt-16">
      <div className="border-t border-gold-200/45 bg-cream-50 px-6 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:py-28">
        {!showMessage && showLocation && (
          <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
            <LocationSectionMobile
              location={location}
              formattedLocation={formattedLocation}
              omitEventHeading={omitLocationHeading}
            />
            <LocationSectionDesktop
              location={location}
              formattedLocation={formattedLocation}
              omitEventHeading={omitLocationHeading}
            />
          </div>
        )}

        {showMessage && showLocation && (
          <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
            <div className="mb-10 w-full lg:mb-12">{ceremonyHeadingsMarkup}</div>

            <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
              <div className="min-w-0 flex-1">{ceremonyBody}</div>
              <div className="hidden lg:block">{mapColumn}</div>
            </div>

            <div className="mx-auto mt-10 w-full lg:hidden">
              <LocationSectionMobile
                location={location}
                formattedLocation={formattedLocation}
                omitEventHeading
              />
            </div>
          </div>
        )}

        {showMessage && !showLocation && (
          <div className="mx-auto w-full max-w-2xl lg:max-w-3xl">{messageBlockFull}</div>
        )}

        {!showMessage && !showLocation && (
          <div className="mx-auto w-full max-w-2xl text-center lg:text-left">
            {ceremonyHeadingsMarkup}
            <p className="mt-8 text-pretty text-sm font-light leading-relaxed text-charcoal-500 sm:text-base">
              Os detalhes da cerimônia e da recepção serão atualizados em breve — volte mais tarde ou
              confira o convite nas redes dos noivos.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
