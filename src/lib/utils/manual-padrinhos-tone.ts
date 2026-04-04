import type { ManualLineTone } from '@/lib/types/manual-padrinhos'

/** Mesmas classes do destaque de cor no `ManualPadrinhosSection`. */
export function manualPadrinhosToneClass(tone: ManualLineTone | undefined): string {
  switch (tone) {
    case 'terracota':
      return 'font-semibold text-terracota-600'
    case 'navy':
      return 'font-semibold text-navy-700'
    case 'body':
      return ''
    default:
      return ''
  }
}
