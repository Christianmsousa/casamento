import { GiftsSectionProps } from './types'

export function GiftsSection({}: GiftsSectionProps) {
  return (
    <section
      id="presentes"
      className="scroll-mt-16 border-t border-gold-200/45 bg-cream-50 py-24 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-7">

        {/* Ícone decorativo */}
        <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-terracota-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-terracota-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>

        <p className="text-[0.65rem] sm:text-xs font-medium tracking-[0.25em] text-gold-600 uppercase">
          Lista de presentes
        </p>

        <h2
          className="font-serif text-charcoal-800 leading-snug"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          Sua presença<br />é o maior presente
        </h2>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gold-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <div className="h-px w-12 bg-gold-400" />
        </div>

        <p className="text-sm sm:text-base text-charcoal-500 font-light leading-relaxed max-w-sm">
          Se desejar nos presentear além da sua companhia, preparamos com carinho uma lista de sugestões.
        </p>

        <a
          href="/gifts"
          className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-terracota-600 text-white rounded-xl font-medium text-sm sm:text-base hover:bg-terracota-700 active:bg-terracota-800 transition-all duration-200 shadow-md hover:shadow-lg mt-2"
        >
          Ver lista de presentes
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>

      </div>
    </section>
  )
}
