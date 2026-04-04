import type { ManualPadrinhosData } from '@/lib/types/manual-padrinhos'
import raw from '../../../data/manual-padrinhos.json'

/** Dados do manual dos padrinhos (fonte: `data/manual-padrinhos.json`). */
export const manualPadrinhos: ManualPadrinhosData = raw as ManualPadrinhosData
