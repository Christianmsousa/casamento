export type GiftCategory = 
  | 'casa' 
  | 'cozinha' 
  | 'decoracao' 
  | 'eletrodomesticos' 
  | 'quarto' 
  | 'banheiro' 
  | 'outros'

export type GiftStatus = 'available' | 'reserved' | 'purchased'

export type PriceRange = 'baixo' | 'medio' | 'alto'

export interface Gift {
  id: string
  name: string
  description?: string
  category: GiftCategory
  price?: number
  priceRange?: PriceRange
  imageUrl?: string
  storeUrl?: string
  storeName?: string
  referenceUrl?: string // Link de referência/dica (ex: link de afiliado, sugestão de produto)
  referenceImageUrl?: string // Imagem do produto de referência
  status: GiftStatus
  reservedBy?: {
    guestId: string
    guestName: string
    reservedAt: string
  }
  priority?: number // Para ordenação (quanto maior, mais importante)
  createdAt: string
  updatedAt: string
}

export interface GiftFilters {
  category?: GiftCategory
  priceRange?: PriceRange
  status?: GiftStatus
  search?: string
}

