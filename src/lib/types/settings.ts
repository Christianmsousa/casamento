export interface LocationDetails {
  address?: string // Endereço completo para exibição
  cep?: string // CEP (formato: 12345-678)
  city?: string // Cidade
  state?: string // Estado (UF)
  coordinates?: {
    lat: number // Latitude
    lng: number // Longitude
  }
}

export interface Settings {
  wedding_date: string
  ceremony_location: string | LocationDetails // Suporta string (legado) ou objeto detalhado
  reception_location: string | LocationDetails // Suporta string (legado) ou objeto detalhado
  couple_names: {
    person1: string
    person2: string
  }
}

