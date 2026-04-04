export interface HeroSectionProps {
  coupleName: string
  weddingDate?: string
  /** Data/hora formatada (ex.: convite); no desktop integra-se no hero */
  formattedDate?: string
}

export interface HeroSectionContentProps {
  coupleName: string
  hasWeddingDate: boolean
  formattedDate?: string
}

