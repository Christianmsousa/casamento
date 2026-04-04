import type { ReactNode } from 'react'
import Image from 'next/image'
import heroImage from '../../../../../public/images/beijo-noivado3.png'
import { cn } from '@/lib/utils/cn'

export type HeroOverlayProps = {
  coupleName: string
  hasWeddingDate: boolean
  /** Texto já formatado (só coluna desktop) */
  formattedDate?: string
  /** Página /invite: mostra o parágrafo emotivo mesmo sem data (home não passa) */
  showInviteTagline?: boolean
  bottomSlot?: ReactNode
}

export function HeroOverlay({
  coupleName,
  hasWeddingDate,
  formattedDate,
  showInviteTagline = false,
  bottomSlot,
}: HeroOverlayProps) {
  return (
    <div className="relative bg-cream lg:flex lg:min-h-screen lg:flex-row">
      {/* clipPath só desktop */}
      <svg
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <defs>
          <clipPath id="hero-invite-wave-desktop" clipPathUnits="objectBoundingBox">
            <path d="M0.13,0 C0.02,0.18 0.2,0.36 0.08,0.54 C0.0,0.68 0.16,0.82 0.1,1 L1,1 L1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ─── Mobile: imagem/gradiente sem pointer-events — no iOS o fill da Image capturava o dedo e impedia scroll da página ─── */}
      <div className="relative isolate min-h-[100svh] w-full lg:hidden">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src={heroImage}
            alt=""
            priority
            fill
            fetchPriority="high"
            unoptimized
            sizes="100vw"
            className="object-cover object-[center_22%]"
            aria-hidden
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/25 to-black/15"
          aria-hidden
        />
        <div
          className="relative z-[2] flex min-h-[100svh] w-full flex-col justify-end px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.25rem))] pointer-events-none"
        >
          <header className="mx-auto w-full max-w-lg shrink-0 pb-2 text-center pointer-events-auto">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/85">
              O casamento de
            </p>
            <h1
              className="font-serif leading-[1.1] text-white"
              style={{
                fontSize: 'clamp(2.1rem, 9vw, 3.1rem)',
                textShadow:
                  '0 2px 28px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.35)',
              }}
            >
              {coupleName}
            </h1>

            {showInviteTagline && (
              <p className="mt-7 text-pretty text-base font-light leading-relaxed text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-lg">
                Mal podemos esperar para celebrar convosco — cada detalhe foi
                pensado com carinho para um dia que queremos guardar para sempre.
              </p>
            )}

            {!hasWeddingDate && bottomSlot && (
              <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:gap-6">{bottomSlot}</div>
            )}
          </header>
        </div>
      </div>

      {/* ─── Desktop: coluna texto + foto com onda ─── */}
      <div className="hidden min-h-screen flex-1 flex-col justify-center px-16 py-14 pt-14 xl:px-24 lg:order-1 lg:flex lg:px-16">
        <header className="mx-auto w-full max-w-xl lg:mx-0">
          <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold-600 sm:text-xs">
            O casamento de
          </p>

          <h1
            className="font-serif leading-[1.08] text-charcoal-800"
            style={{ fontSize: 'clamp(2.25rem, 4.8vw, 4.75rem)' }}
          >
            {coupleName}
          </h1>

          {hasWeddingDate && formattedDate ? (
            <p className="mt-5 max-w-lg text-pretty font-serif text-lg font-light italic leading-relaxed text-charcoal-500 sm:text-xl">
              {formattedDate}
            </p>
          ) : null}

          <div
            className={cn(
              'flex items-center gap-3',
              hasWeddingDate && formattedDate ? 'mt-8' : 'mt-7',
            )}
            aria-hidden
          >
            <span className="h-px w-12 bg-gold-400/90 sm:w-16" />
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500 shadow-sm ring-2 ring-gold-200/60" />
            <span className="h-px w-12 bg-gold-400/90 sm:w-16" />
          </div>

          {showInviteTagline && (
            <p className="mt-8 text-pretty text-lg font-light leading-relaxed text-charcoal-600 sm:text-xl sm:leading-relaxed">
              Mal podemos esperar para celebrar convosco — cada detalhe foi
              pensado com carinho para um dia que queremos guardar para sempre.
            </p>
          )}

          {!hasWeddingDate && bottomSlot && (
            <div className="mt-10 w-full max-w-xl">{bottomSlot}</div>
          )}
        </header>
      </div>

      <div className="relative hidden w-[52%] lg:order-2 lg:block lg:min-h-screen">
        <div className="hero-invite-photo relative h-full min-h-screen w-full">
          <Image
            src={heroImage}
            alt=""
            priority
            fill
            fetchPriority="high"
            unoptimized
            sizes="52vw"
            className="object-cover object-top"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}
