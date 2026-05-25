import Image from 'next/image'

/**
 * Hero da lista de presentes — ilustração undraw (cor terracota no SVG) + título.
 * @see https://undraw.co — licença undraw (uso livre com atribuição à artista no SVG).
 */
export function GiftsPageHero() {
  return (
    <div className="mb-10 sm:mb-12 lg:mb-14">
      <div className="mx-auto grid max-w-7xl items-center gap-y-10 gap-x-10 sm:gap-y-12 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div className="gifts-hero-reveal gifts-hero-reveal-text order-2 text-center lg:order-1 lg:text-left">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-gold-600 sm:text-sm sm:tracking-[0.26em] lg:mb-4">
            Para vocês
          </p>

          <h1
            className="mb-3 font-serif text-charcoal-800 sm:mb-4 lg:mb-5"
            style={{ fontSize: 'clamp(2.25rem, 6.5vw, 3.75rem)' }}
          >
            Lista de Presentes
          </h1>

          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 lg:mb-6 lg:justify-start">
            <div className="h-px w-12 bg-gold-400/90 sm:w-14 lg:w-16" />
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
            <div className="h-px w-12 bg-gold-400/90 sm:w-14 lg:w-16" />
          </div>

          <div className="mx-auto max-w-md space-y-3.5 text-pretty sm:max-w-lg sm:space-y-4 lg:mx-0 lg:max-w-2xl">
            <p className="text-lg font-normal leading-snug text-charcoal-700 sm:text-xl sm:leading-relaxed lg:text-2xl lg:leading-snug">
              Sua presença é o maior presente.
            </p>
            <p className="text-base font-light leading-relaxed text-charcoal-500 sm:text-lg lg:text-xl lg:leading-relaxed">
              Nosso lar já está prontinho. Se quiserem nos presentear além disso, qualquer ajudinha para a
              lua de mel será recebida com muito carinho — pelo botão abaixo ou pelo PIX.
            </p>
          </div>
        </div>

        <div className="gifts-hero-reveal gifts-hero-reveal-illu order-1 flex w-full justify-center lg:order-2 lg:justify-end">
          <div className="relative w-full max-w-[min(100%,520px)] sm:max-w-[560px] lg:max-w-[min(100%,540px)]">
            <Image
              src="/images/undraw-gift-mtlf.svg"
              alt=""
              width={930}
              height={610}
              className="h-auto w-full max-h-[240px] object-contain object-center min-[400px]:max-h-[280px] sm:max-h-[320px] md:max-h-[360px] lg:max-h-[420px] xl:max-h-[460px]"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  )
}
