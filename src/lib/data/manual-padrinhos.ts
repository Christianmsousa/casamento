import type { ManualPadrinhosData } from '@/lib/types/manual-padrinhos'
import raw from './manual-padrinhos.json'

/** Dados do manual dos padrinhos (fonte: `manual-padrinhos.json` nesta pasta). */
export const manualPadrinhos: ManualPadrinhosData = raw as ManualPadrinhosData
