import type { Gift } from '@/lib/types/gift'

export interface GiftGridProps {
  gifts: Gift[]
  onReserve?: (giftId: string) => void
  loading?: boolean
}

