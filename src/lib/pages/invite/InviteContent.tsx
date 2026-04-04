import { manualPadrinhos } from '@/lib/data/manual-padrinhos'
import { ManualPadrinhosSection } from '@/lib/components/invite/manual-padrinhos-section'
import { CouplePhotosSection } from '@/lib/components/invite/couple-photos-section'
import { formatLocationForDisplay } from '@/lib/utils/location'
import { GuestLocationSection } from './guest-location-section'
import {
  parseEventDateSetting,
  eventSettingHasTime,
  formatWeddingDayMonthLong,
  getCeremonyTimeSpokenLabel,
} from '@/lib/utils/date'
import { HeroSection } from './hero-section'
import { FAQSection } from './faq-section'
import { GiftsSection } from './gifts-section'

/** Horário da cerimónia quando `wedding_date` vem só como data (YYYY-MM-DD). */
const DEFAULT_CEREMONY_TIME = '16:00'

function formatWeddingDateLabel(dateString: string): string {
  if (!dateString) return ''
  try {
    const date = parseEventDateSetting(dateString)
    if (Number.isNaN(date.getTime())) return dateString
    const datePart = date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    if (!eventSettingHasTime(dateString)) {
      return `${datePart} · ${DEFAULT_CEREMONY_TIME} · cerimônia`
    }
    const timePart = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    return `${datePart} às ${timePart}h · cerimônia`
  } catch {
    return dateString
  }
}

interface InviteContentProps {
  settings: {
    wedding_date: string
    ceremony_location: string | { address?: string; cep?: string; city?: string; state?: string }
    reception_location: string | { address?: string; cep?: string; city?: string; state?: string }
    couple_names: { person1: string; person2: string }
  }
  faq: string
}

export function InviteContent({ settings, faq }: InviteContentProps) {
  const coupleName = settings.couple_names.person1 && settings.couple_names.person2
    ? `${settings.couple_names.person1} & ${settings.couple_names.person2}`
    : 'Julia & Christian'

  const primaryLocation =
    settings.ceremony_location || settings.reception_location

  const formattedLocation = primaryLocation
    ? formatLocationForDisplay(primaryLocation)
    : ''

  const formattedDate = settings.wedding_date
    ? formatWeddingDateLabel(settings.wedding_date)
    : ''

  const weddingDayMonthLabel = settings.wedding_date
    ? formatWeddingDayMonthLong(settings.wedding_date)
    : ''

  const ceremonyTimeSpoken = settings.wedding_date
    ? getCeremonyTimeSpokenLabel(settings.wedding_date)
    : '16h'

  return (
    <>
      {/* 1. Hero — foto de fundo + nome */}
      <HeroSection
        coupleName={coupleName}
        weddingDate={settings.wedding_date}
        formattedDate={formattedDate}
      />

      {/* 2. Mensagem aos convidados + data/horário + local (secção única) */}
      {(settings.wedding_date || primaryLocation) && (
        <GuestLocationSection
          hasWeddingDate={Boolean(settings.wedding_date)}
          weddingDayMonthLabel={weddingDayMonthLabel}
          ceremonyTimeSpoken={ceremonyTimeSpoken}
          location={primaryLocation}
          formattedLocation={formattedLocation}
        />
      )}

      {/* 3. Gallery — zig-zag: nossa história em fotos */}
      <CouplePhotosSection />

      {/* 4. Dress Code — madrinhas e padrinhos, alternado */}
      <ManualPadrinhosSection data={manualPadrinhos} />

      {/* 5. FAQ */}
      {faq && <FAQSection content={faq} />}

      {/* 6. CTA Presentes */}
      <GiftsSection />
    </>
  )
}
