import type { GiftCategory, PriceRange } from '@/lib/types/gift'

export interface GiftFiltersProps {
  filters: {
    category?: GiftCategory
    priceRange?: PriceRange
    search?: string
  }
  onFiltersChange: (filters: {
    category?: GiftCategory
    priceRange?: PriceRange
    search?: string
  }) => void
}

