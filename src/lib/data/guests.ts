import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import type { Guest } from '@/lib/types'

const DATA_DIR = join(process.cwd(), 'data')
const GUESTS_FILE = join(DATA_DIR, 'guests.json')

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

export async function getGuests(): Promise<Guest[]> {
  try {
    await ensureDataDir()
    if (!existsSync(GUESTS_FILE)) {
      await writeFile(GUESTS_FILE, '[]', 'utf-8')
      return []
    }
    const data = await readFile(GUESTS_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    // Ensure all guests have invite_code in snake_case
    return parsed.map((guest: any) => ({
      ...guest,
      invite_code: guest.invite_code || guest.inviteCode || '',
    }))
  } catch (error) {
    console.error('Error reading guests:', error)
    return []
  }
}

export async function saveGuests(guests: Guest[]): Promise<void> {
  try {
    await ensureDataDir()
    await writeFile(GUESTS_FILE, JSON.stringify(guests, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving guests:', error)
    throw error
  }
}

export async function getGuestByCode(code: string): Promise<Guest | null> {
  const guests = await getGuests()
  return guests.find(g => g.invite_code === code) || null
}

