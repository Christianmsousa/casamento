import type { GiftFilters } from '@/lib/types/gift'

export interface GiftFiltersProps {
  filters: GiftFilters
  onFiltersChange: (filters: GiftFilters) => void
}
