/**
 * Conteúdo de `src/lib/data/manual-padrinhos.json`.
 * Cada linha da lista é um array de partes; use `tone` para destacar trechos (cor).
 */
export type ManualLineTone = 'body' | 'terracota' | 'navy'

export interface ManualLinePart {
  text: string
  /** Omitir = texto normal (corpo). */
  tone?: ManualLineTone
}

export type ManualLine = ManualLinePart[]

export interface ManualOutfitBlock {
  title: string
  lines: ManualLine[]
}

export interface ManualPadrinhosData {
  /** Cada parágrafo = sequência de partes (`tone` opcional para grifar). */
  intro: ManualLine[]
  dress: ManualOutfitBlock
  suit: ManualOutfitBlock
}
