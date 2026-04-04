import Image from 'next/image'

interface PhotoRow {
  src?: string
  alt: string
  caption: string
  description: string
  /** true = foto à direita no desktop */
  reverse?: boolean
}

const rows: PhotoRow[] = [
  {
    src: '/images/beijo-noivado2.png',
    alt: 'Nosso beijo',
    caption: 'Nosso momento',
    description:
      'Cada detalhe daquele dia ficou gravado. O cheiro das flores, o calor das mãos dadas e a certeza de que esse era o caminho certo.',
    reverse: false,
  },
  {
    src: '/images/alianca.png',
    alt: 'Nossas alianças',
    caption: 'O começo',
    description:
      'Dois anéis, um buquê e uma escolha que mudou tudo. Foi assim que começou — com simplicidade, amor e muita alegria.',
    reverse: true,
  },
  {
    src: undefined,
    alt: 'Em breve',
    caption: 'Mais memórias',
    description:
      'Cada foto conta um pedaço da nossa história. Novas imagens serão adicionadas em breve.',
    reverse: false,
  },
]

const archStyle = { borderRadius: '50% 50% 10px 10px / 45% 45% 10px 10px' }
const archBorderStyle = { borderRadius: '50% 50% 14px 14px / 45% 45% 14px 14px' }

function PhotoBlock({ row }: { row: PhotoRow }) {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24 ${
        row.reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Foto */}
      <div className="flex-shrink-0 flex justify-center">
        <div className="relative">
          <div
            className="absolute -inset-4 bg-gold-200/20 blur-2xl"
            style={archBorderStyle}
          />
          <div
            className="absolute -inset-[4px] bg-gold-200/35"
            style={archBorderStyle}
          />
          <div
            className="relative overflow-hidden w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-[22rem]"
            style={archStyle}
          >
            {row.src ? (
              <Image
                src={row.src}
                alt={row.alt}
                fill
                unoptimized={row.src?.includes('beijo-noivado') ?? false}
                quality={row.src?.includes('beijo-noivado') ? 100 : 85}
                sizes="(max-width: 640px) 448px, (max-width: 1024px) 512px, 576px"
                className="object-cover object-top [transform:translateZ(0)]"
              />
            ) : (
              <div className="w-full h-full bg-cream-200 flex flex-col items-center justify-center gap-3 text-charcoal-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
                <span className="text-xs font-light tracking-widest uppercase">Em breve</span>
              </div>
            )}
          </div>
          <div
            className="absolute inset-[4px] border border-white/20 pointer-events-none"
            style={archStyle}
          />
        </div>
      </div>

      {/* Texto */}
      <div className="flex-1 text-center lg:text-left max-w-md lg:max-w-none">
        <p className="text-[0.65rem] sm:text-xs font-medium tracking-[0.2em] text-gold-600 uppercase mb-3">
          {row.caption}
        </p>
        <p className="font-serif text-charcoal-700 leading-relaxed text-base sm:text-lg lg:text-xl xl:text-2xl">
          {row.description}
        </p>
      </div>
    </div>
  )
}

export function CouplePhotosSection() {
  return null // temporariamente desabilitado
  // eslint-disable-next-line no-unreachable
  return (
    <section
      id="fotos"
      className="scroll-mt-16 border-t border-gold-200/45 bg-cream py-20 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[0.65rem] sm:text-xs font-medium tracking-[0.25em] text-gold-600 uppercase mb-4">
            Nossa história
          </p>
          <h2
            className="font-serif text-charcoal-800 mb-5"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Momentos especiais
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <div className="h-px w-12 bg-gold-400" />
          </div>
        </div>

        {/* Zig-Zag rows */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {rows.map((row) => (
            <PhotoBlock key={row.caption} row={row} />
          ))}
        </div>

      </div>
    </section>
  )
}
