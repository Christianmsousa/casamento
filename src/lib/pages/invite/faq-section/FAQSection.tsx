import { FAQSectionProps } from './types'
import { FAQ } from '@/lib/components/faq'

export function FAQSection({ content }: FAQSectionProps) {
  if (!content) return null

  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-gold-200/45 bg-cream py-20 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-3xl xl:max-w-4xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[0.65rem] sm:text-xs font-medium tracking-[0.25em] text-gold-600 uppercase mb-4">
            Dúvidas?
          </p>
          <h2
            className="font-serif text-charcoal-800 mb-5"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Perguntas frequentes
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <div className="h-px w-12 bg-gold-400" />
          </div>
        </div>

        <FAQ content={content} />
      </div>
    </section>
  )
}
