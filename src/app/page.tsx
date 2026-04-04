import { Navbar } from '@/lib/components/layout/navbar'
import { HeroOverlay } from '@/lib/pages/invite/hero-section/HeroOverlay'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main id="home" className="relative">
        <HeroOverlay coupleName="Julia & Christian" hasWeddingDate={false} />
      </main>
    </div>
  )
}
