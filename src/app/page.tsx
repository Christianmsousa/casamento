import Link from 'next/link'
import { Navbar } from '@/lib/components/layout/navbar'
import { HeroOverlay } from '@/lib/pages/invite/hero-section/HeroOverlay'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main id="home" className="relative">
        <HeroOverlay
          coupleName="Julia & Christian"
          hasWeddingDate={false}
          bottomSlot={
            <div className="flex max-w-md flex-col gap-6 lg:max-w-xl lg:gap-6">
              <p className="text-pretty text-base font-light leading-relaxed text-white/95 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] sm:text-lg lg:text-base lg:leading-relaxed lg:text-charcoal-600 lg:[text-shadow:none]">
                Bem-vindos ao nosso site: detalhes da festa, lista de presentes e
                tudo o que precisam saber sobre o grande dia.
              </p>
              <Link
                href="/invite"
                className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-sm bg-white px-10 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal-800 shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-cream-50 sm:w-auto sm:px-12 lg:min-h-[2.75rem] lg:bg-charcoal-800 lg:px-8 lg:text-sm lg:font-semibold lg:text-cream lg:shadow-none lg:hover:bg-charcoal-700"
              >
                Ver convite completo
              </Link>
            </div>
          }
        />
      </main>
    </div>
  )
}
