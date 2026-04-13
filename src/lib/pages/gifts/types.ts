import type { Gift, GiftFilters } from '@/lib/types/gift'

export interface PixSettings {
  copyPaste?: string
  qrImage?: string
  note?: string
}

export interface GiftsPageProps {
  whatsappPhone?: string
  pixSettings?: PixSettings
}

export interface GiftsPageContentProps {
  gifts: Gift[]
  loading: boolean
  filters: GiftFilters
  filteredGifts: Gift[]
  onFiltersChange: (filters: GiftFilters) => void
  onReserve: ((giftId: string) => Promise<void>) | undefined
  whatsappPhone?: string
  pixSettings?: PixSettings
}
