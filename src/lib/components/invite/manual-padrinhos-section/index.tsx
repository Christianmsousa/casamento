import Image from 'next/image'
import type { ManualLine, ManualPadrinhosData } from '@/lib/types/manual-padrinhos'
import { manualPadrinhosToneClass } from '@/lib/utils/manual-padrinhos-tone'

export type { ManualPadrinhosData } from '@/lib/types/manual-padrinhos'

interface ManualPadrinhosSectionProps {
  data: ManualPadrinhosData
  sectionId?: string | false
  layout?: 'full' | 'compact'
}

const outfitImages = {
  terracota: '/images/madrinha-exemplo.png',
  navy: '/images/padrinho-exemplo.png',
}

function RichParagraph({
  parts,
  className,
}: {
  parts: ManualLine
  className?: string
}) {
  return (
    <p className={className}>
      {parts.map((part, i) => (
        <span key={i} className={manualPadrinhosToneClass(part.tone)}>
          {part.text}
        </span>
      ))}
    </p>
  )
}

function OutfitPhoto({ color }: { color: 'terracota' | 'navy' }) {
  const border = color === 'terracota' ? 'border-terracota-200' : 'border-navy-600/20'
  const alt = color === 'terracota' ? 'Exemplo look madrinha' : 'Exemplo look padrinho'

  return (
    <div
      className={`relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl border-2 lg:max-w-none ${border}`}
    >
      <Image src={outfitImages[color]} alt={alt} fill className="object-cover object-top" />
    </div>
  )
}

function InfoBlock({
  label,
  title,
  lines,
  accent,
}: {
  label: string
  title: string
  lines: ManualLine[]
  accent: 'terracota' | 'navy'
}) {
  const accentBar = accent === 'terracota' ? 'bg-terracota-400' : 'bg-navy-600'
  const accentDot = accent === 'terracota' ? 'bg-terracota-300' : 'bg-navy-600/60'
  const accentText = accent === 'terracota' ? 'text-terracota-600' : 'text-navy-700'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-px ${accentBar}`} />
        <p className={`text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:text-xs ${accentText}`}>
          {label}
        </p>
      </div>

      <h3
        className="font-serif leading-snug text-charcoal-800"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
      >
        {title}
      </h3>

      <ul className="flex flex-col gap-3">
        {lines.map((parts, lineIndex) => (
          <li
            key={lineIndex}
            className="flex items-start gap-3 text-sm font-light leading-relaxed text-charcoal-500 sm:text-base"
          >
            <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentDot}`} />
            <span>
              {parts.map((part, partIndex) => (
                <span key={partIndex} className={manualPadrinhosToneClass(part.tone)}>
                  {part.text}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ManualPadrinhosSection({
  data,
  sectionId = 'padrinhos',
  layout = 'full',
}: ManualPadrinhosSectionProps) {
  if (layout === 'compact') {
    return (
      <section
        {...(sectionId ? { id: sectionId } : {})}
        className="mt-6 rounded-xl border border-terracota-100/80 bg-white/90 px-4 py-6 sm:px-6 sm:py-8"
      >
        <div className="space-y-4">
          <h2 className="font-serif text-xl text-charcoal-800">Manual dos padrinhos</h2>
          {data.intro.map((parts, i) => (
            <RichParagraph
              key={`intro-compact-${i}`}
              parts={parts}
              className="text-sm leading-relaxed text-charcoal-500"
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      {...(sectionId ? { id: sectionId } : {})}
      aria-labelledby="manual-padrinhos-heading"
      className="scroll-mt-16 border-t border-gold-200/45 bg-white px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:gap-24 xl:max-w-7xl">
        <div className="text-center">
          <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-gold-600 sm:text-xs">
            Para os nossos
          </p>
          <h2
            id="manual-padrinhos-heading"
            className="mb-5 font-serif text-charcoal-800"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Manual dos padrinhos
          </h2>
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            <div className="h-px w-12 bg-gold-400" />
          </div>
          <div className="mx-auto flex max-w-2xl flex-col gap-2">
            {data.intro.map((parts, i) => (
              <RichParagraph
                key={`intro-${i}`}
                parts={parts}
                className="text-sm font-light leading-relaxed text-charcoal-500 sm:text-base"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16 xl:gap-24">
          <div className="mx-auto w-full max-w-[220px] flex-shrink-0 lg:mx-0 lg:max-w-[260px] xl:max-w-[300px]">
            <OutfitPhoto color="terracota" />
          </div>
          <div className="flex-1">
            <InfoBlock
              label="Madrinhas"
              title={data.dress.title}
              lines={data.dress.lines}
              accent="terracota"
            />
          </div>
        </div>

        <div className="mx-auto h-px w-full max-w-sm bg-cream-200" />

        <div className="flex flex-col items-center gap-10 lg:flex-row-reverse lg:gap-16 xl:gap-24">
          <div className="mx-auto w-full max-w-[220px] flex-shrink-0 lg:mx-0 lg:max-w-[260px] xl:max-w-[300px]">
            <OutfitPhoto color="navy" />
          </div>
          <div className="flex-1">
            <InfoBlock
              label="Padrinhos"
              title={data.suit.title}
              lines={data.suit.lines}
              accent="navy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
