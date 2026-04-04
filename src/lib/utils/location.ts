import type { LocationDetails } from '@/lib/types/settings'

/**
 * Constrói uma string de endereço otimizada para geocodificação
 * Prioriza: Nome do Local, Rua + Número, Bairro, CEP, Cidade - Estado
 */
export function buildLocationString(location: string | LocationDetails | undefined): string {
  if (!location) return ''
  
  // Se for string simples, retorna como está (retrocompatibilidade)
  if (typeof location === 'string') {
    return location
  }
  
  // Se for objeto LocationDetails, constrói o endereço completo
  const parts: string[] = []
  
  // Nome do local (se houver)
  if (location.address) {
    parts.push(location.address)
  }
  
  // CEP (prioridade alta para geocodificação)
  if (location.cep) {
    parts.push(location.cep)
  }
  
  // Cidade e Estado
  const cityState: string[] = []
  if (location.city) {
    cityState.push(location.city)
  }
  if (location.state) {
    cityState.push(location.state)
  }
  if (cityState.length > 0) {
    parts.push(cityState.join(' - '))
  }
  
  return parts.join(', ')
}

/**
 * Constrói uma string de endereço formatada para exibição
 */
export function formatLocationForDisplay(location: string | LocationDetails | undefined): string {
  if (!location) return ''
  
  // Se for string simples, retorna como está
  if (typeof location === 'string') {
    return location
  }
  
  // Se for objeto, formata de forma mais legível
  const parts: string[] = []
  
  if (location.address) {
    parts.push(location.address)
  }
  
  if (location.cep) {
    parts.push(`CEP: ${location.cep}`)
  }
  
  const cityState: string[] = []
  if (location.city) {
    cityState.push(location.city)
  }
  if (location.state) {
    cityState.push(location.state)
  }
  if (cityState.length > 0) {
    parts.push(cityState.join(' - '))
  }
  
  return parts.join('\n')
}

