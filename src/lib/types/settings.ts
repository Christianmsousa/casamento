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
  /** Chave PIX (celular, e-mail, etc.). Preferir informar aqui; o copia-e-cola é gerado no app. */
  pix_key?: string
  pix_merchant_name?: string // Nome no QR (máx. 25 caracteres)
  pix_merchant_city?: string // Cidade no QR (máx. 15 caracteres)
  /** Legado: se `pix_key` existir, o app ignora e gera de novo. */
  pix_copy_paste?: string
  /** Legado: QR agora é gerado no navegador a partir do copia-e-cola. */
  pix_qr_image?: string
  pix_note?: string
}

