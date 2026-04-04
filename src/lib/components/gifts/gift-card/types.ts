import type { Gift } from '@/lib/types/gift'

export interface GiftCardProps {
  gift: Gift
  onReserve?: (giftId: string) => void
}

