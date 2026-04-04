/**
 * Remove todos os caracteres não numéricos de uma string
 * @param text Texto para remover a pontuação
 * @returns Texto apenas com números
 */
export function removePunctuation(text: string): string {
  return text.replace(/[^\d]/g, '')
}

/**
 * Remove acentos de uma string
 * @param str String para remover acentos
 * @returns String sem acentos
 */
export function removeAccents(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
}

/**
 * Lista de palavras que devem permanecer em minúsculo
 */
const lowercaseWords = [
  'de',
  'da',
  'do',
  'das',
  'dos',
  'e',
  'em',
  'no',
  'na',
  'nos',
  'nas',
  'para',
  'por',
  'com',
  'sem',
  'sob',
  'sobre',
  'entre',
  'após',
  'até',
  'desde',
  'durante',
  'mediante',
  'segundo',
  'conforme',
  'exceto',
  'salvo',
  'menos',
  'além',
  'aquém',
  'ante',
  'perante',
  'trás',
]

/**
 * Formata um nome para ter a primeira letra de cada palavra em maiúsculo,
 * exceto preposições e artigos que permanecem em minúsculo
 * @param text Texto para formatar
 * @returns Texto formatado com primeira letra maiúscula, respeitando preposições e artigos
 */
export function formatName(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !lowercaseWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return word
    })
    .join(' ')
}

