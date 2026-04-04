import type { Gift, GiftCategory, PriceRange } from '@/lib/types/gift'

export interface GiftsPageProps {}

export interface GiftsPageContentProps {
  gifts: Gift[]
  loading: boolean
  filters: {
    category?: GiftCategory
    priceRange?: PriceRange
    search?: string
  }
  filteredGifts: Gift[]
  onFiltersChange: (filters: {
    category?: GiftCategory
    priceRange?: PriceRange
    search?: string
  }) => void
  onReserve: (giftId: string) => Promise<void>
}

