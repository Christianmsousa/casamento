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
  gifts_whatsapp?: string // Só dígitos E.164 sem '+', ex: 551998949240
  pix_copy_paste?: string // Código PIX copia-e-cola
  pix_qr_image?: string // Path local (/images/...) ou URL externa da imagem QR
  pix_note?: string // Nota exibida junto ao PIX (ex: "Nome no PIX: Julia e Christian")
}

