import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import type { Gift } from '@/lib/types/gift'

const DATA_DIR = join(process.cwd(), 'data')
const GIFTS_FILE = join(DATA_DIR, 'gifts.json')

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
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
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading gifts:', error)
    return []
  }
}

export async function saveGifts(gifts: Gift[]): Promise<void> {
  try {
    await ensureDataDir()
    await writeFile(GIFTS_FILE, JSON.stringify(gifts, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving gifts:', error)
    throw error
  }
}

export async function getGiftById(id: string): Promise<Gift | null> {
  try {
    const gifts = await getGifts()
    return gifts.find(gift => gift.id === id) || null
  } catch (error) {
    console.error('Error getting gift by id:', error)
    return null
  }
}

