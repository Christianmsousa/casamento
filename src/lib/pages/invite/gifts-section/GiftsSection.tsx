import Image from 'next/image'
import { GiftsSectionProps } from './types'
import { PixBlock } from '@/lib/components/gifts/pix-block'
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp'

const WHATSAPP_MESSAGE =
  'Olá! Vi o convite e gostaria de combinar um presente com vocês. 💕'

export function GiftsSection({ pixSettings, whatsappPhone }: GiftsSectionProps) {
  const whatsappHref = whatsappPhone
    ? buildWhatsAppUrl(whatsappPhone, WHATSAPP_MESSAGE)
    : undefined

  return (
    <section
      id="presentes"
      className="scroll-mt-16 border-t border-gold-200/45 bg-cream-50 px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 text-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
          <Image
            src="/images/undraw-gift-mtlf.svg"
            alt=""
            width={930}
            height={610}
            className="mx-auto h-auto w-full max-h-[160px] object-contain object-center min-[400px]:max-h-[180px] sm:max-h-[200px]"
            unoptimized
          />
        </div>

        <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-gold-600 sm:text-xs">
          Presentes
        </p>

        <h2
          className="font-serif leading-snug text-charcoal-800"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          Sua presença
          <br />
          é o maior presente
        </h2>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gold-400" />
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          <div className="h-px w-12 bg-gold-400" />
        </div>

        <div className="max-w-md space-y-4 text-pretty sm:max-w-lg sm:space-y-5">
          <p className="text-base font-light leading-relaxed text-charcoal-600 sm:text-lg">
            Este convite é para viver o grande dia ao nosso lado. Ter vocês na cerimônia e na festa
            é o que mais importa para nós.
          </p>
          <p className="text-base font-light leading-relaxed text-charcoal-600 sm:text-lg">
            Já moramos juntos e adiantamos a casa, pela correria e pelas voltas da vida. O lar está
            pronto e o essencial já está com a gente. Por isso não há lista de enxoval.
          </p>
          <p className="text-base font-light leading-relaxed text-charcoal-500 sm:text-lg">
            Depois da celebração vem a lua de mel, a viagem que estamos planejando para comemorar o
            sim. Se quiserem contribuir com ela, ficamos felizes com qualquer gesto, no tempo e no
            valor que fizer sentido para vocês.
          </p>
        </div>

        {pixSettings && <PixBlock pix={pixSettings} variant="primary" className="w-full" />}

        {whatsappHref && (
          <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-charcoal-500">
            Prefere combinar outro tipo de presente?{' '}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-terracota-600 underline decoration-terracota-300/80 underline-offset-2 transition-colors hover:text-terracota-700"
            >
              Fale conosco no WhatsApp
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
