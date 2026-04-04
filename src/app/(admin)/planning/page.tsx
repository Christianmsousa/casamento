import Link from 'next/link'
import { manualPadrinhos } from '@/lib/data/manual-padrinhos'
import { ManualPadrinhosSection } from '@/lib/components/invite/manual-padrinhos-section'

export default function PlanningDashboard() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-2">
          <h1 className="text-lg font-semibold text-charcoal-800 sm:text-xl">Planejamento</h1>
          <p className="mt-1 text-sm text-charcoal-500">Início</p>
        </header>

        <p className="mb-2 text-sm leading-relaxed text-charcoal-600">
          O mesmo manual abaixo aparece publicamente no{' '}
          <Link
            href="/invite#padrinhos"
            className="font-medium text-terracota-600 underline underline-offset-2 transition-colors hover:text-terracota-700"
          >
            site do convite
          </Link>{' '}
          (secção Padrinhos). Para alterar os textos, edite{' '}
          <code className="rounded bg-terracota-100/80 px-1.5 py-0.5 text-xs text-charcoal-700">
            src/lib/data/manual-padrinhos.json
          </code>
          .
        </p>

        <ManualPadrinhosSection data={manualPadrinhos} sectionId={false} layout="compact" />
      </div>
    </div>
  )
}
