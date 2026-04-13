import type { Gift } from '@/lib/types/gift'

/** Remove acentos para comparar busca (ex.: "eletrico" encontra "elétrico"). */
function foldAccents(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}

/**
 * Verifica se o presente corresponde ao texto de busca.
 * - Várias palavras: todas devem aparecer em algum lugar (nome, descrição, categoria, loja, keywords).
 * - Comparação sem acentos.
 */
export function giftMatchesSearch(gift: Gift, searchRaw: string): boolean {
  const q = searchRaw.trim()
  if (!q) return true

  const tokens = q.split(/\s+/).filter(Boolean).map(foldAccents)
  if (tokens.length === 0) return true

  const haystack = foldAccents(
    [
      gift.name,
      gift.description,
      gift.category,
      gift.storeName,
      ...(gift.keywords ?? []),
    ]
      .filter(Boolean)
      .join(' '),
  )

  return tokens.every((t) => haystack.includes(t))
}
