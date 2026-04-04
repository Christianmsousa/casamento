import { LocationDetails } from '@/lib/types'

export interface LocationSectionProps {
  location: string | LocationDetails | undefined
}

export interface LocationSectionContentProps {
  location: string | LocationDetails | undefined
  formattedLocation: string
  /** Não mostrar “Cerimônia & Recepção” + título (já exibidos na secção acima). */
  omitEventHeading?: boolean
}

