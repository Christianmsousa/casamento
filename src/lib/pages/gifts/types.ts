import type { Gift, GiftFilters } from '@/lib/types/gift'

export type { PixSettings } from '@/lib/types/pix'
import type { PixSettings } from '@/lib/types/pix'

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
