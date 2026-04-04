import { HeroSectionProps } from './types'
import { HeroOverlay } from './HeroOverlay'

export function HeroSection({
  coupleName,
  weddingDate,
  formattedDate,
}: HeroSectionProps) {
  const contentProps = {
    coupleName,
    hasWeddingDate: !!weddingDate,
    formattedDate: formattedDate ?? '',
  }

  return (
    <section
      id="home"
      className="relative scroll-mt-16 bg-cream"
    >
      <HeroOverlay {...contentProps} />
    </section>
  )
}
