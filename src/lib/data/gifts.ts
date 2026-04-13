import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import type { Gift } from '@/lib/types/gift'

const DATA_DIR = join(process.cwd(), 'src', 'lib', 'data')
const GIFTS_FILE = join(DATA_DIR, 'gifts.json')

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deserializeGift(raw: any): Gift {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    keywords: Array.isArray(raw.keywords) ? raw.keywords.map(String) : undefined,
    category: raw.category,
    offeringType: raw.offering_type ?? raw.offeringType ?? 'repeatable',
    price: raw.price,
    priceRange: raw.price_range ?? raw.priceRange,
    imageUrl: raw.image_url ?? raw.imageUrl,
    storeUrl: raw.store_url ?? raw.storeUrl,
    storeName: raw.store_name ?? raw.storeName,
    referenceUrl: raw.reference_url ?? raw.referenceUrl,
    referenceImageUrl: raw.reference_image_url ?? raw.referenceImageUrl,
    status: raw.status ?? 'available',
    reservedBy: raw.reserved_by
      ? {
          guestId: raw.reserved_by.guest_id ?? raw.reserved_by.guestId,
          guestName: raw.reserved_by.guest_name ?? raw.reserved_by.guestName,
          reservedAt: raw.reserved_by.reserved_at ?? raw.reserved_by.reservedAt,
        }
      : raw.reservedBy,
    priority: raw.priority,
    createdAt: raw.created_at ?? raw.createdAt,
    updatedAt: raw.updated_at ?? raw.updatedAt,
  }
}

function serializeGift(gift: Gift): Record<string, unknown> {
  return {
    id: gift.id,
    name: gift.name,
    description: gift.description,
    keywords: gift.keywords?.length ? gift.keywords : undefined,
    category: gift.category,
    offering_type: gift.offeringType ?? 'repeatable',
    price: gift.price,
    price_range: gift.priceRange,
    image_url: gift.imageUrl,
    store_url: gift.storeUrl,
    store_name: gift.storeName,
    reference_url: gift.referenceUrl,
    reference_image_url: gift.referenceImageUrl,
    status: gift.status,
    reserved_by: gift.reservedBy
      ? {
          guest_id: gift.reservedBy.guestId,
          guest_name: gift.reservedBy.guestName,
          reserved_at: gift.reservedBy.reservedAt,
        }
      : undefined,
    priority: gift.priority,
    created_at: gift.createdAt,
    updated_at: gift.updatedAt,
  }
}

export async function getGifts(): Promise<Gift[]> {
  try {
    await ensureDataDir()
    if (!existsSync(GIFTS_FILE)) {
      await writeFile(GIFTS_FILE, '[]', 'utf-8')
      return []
    }
    const data = await readFile(GIFTS_FILE, 'utf-8')
    const raw = JSON.parse(data)
    return raw.map(deserializeGift)
  } catch (error) {
    console.error('Error reading gifts:', error)
    return []
  }
}

export async function saveGifts(gifts: Gift[]): Promise<void> {
  try {
    await ensureDataDir()
    const serialized = gifts.map(serializeGift)
    await writeFile(GIFTS_FILE, JSON.stringify(serialized, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving gifts:', error)
    throw error
  }
}

export async function getGiftById(id: string): Promise<Gift | null> {
  try {
    const gifts = await getGifts()
    return gifts.find((gift) => gift.id === id) || null
  } catch (error) {
    console.error('Error getting gift by id:', error)
    return null
  }
}
