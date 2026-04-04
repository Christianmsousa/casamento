import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import type { Settings } from '@/lib/types'

const DATA_DIR = join(process.cwd(), 'data')
const SETTINGS_FILE = join(DATA_DIR, 'settings.json')

const defaultSettings: Settings = {
  wedding_date: '',
  ceremony_location: '',
  reception_location: '',
  couple_names: {
    person1: '',
    person2: '',
  },
}

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

export async function getSettings(): Promise<Settings> {
  try {
    await ensureDataDir()
    if (!existsSync(SETTINGS_FILE)) {
      await writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), 'utf-8')
      return defaultSettings
    }
    const data = await readFile(SETTINGS_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    // Normalize to snake_case
    return {
      wedding_date: parsed.wedding_date || parsed.weddingDate || '',
      // Suporta tanto string (legado) quanto objeto LocationDetails
      ceremony_location: parsed.ceremony_location || parsed.ceremonyLocation || '',
      reception_location: parsed.reception_location || parsed.receptionLocation || '',
      couple_names: {
        person1: parsed.couple_names?.person1 || parsed.coupleNames?.person1 || '',
        person2: parsed.couple_names?.person2 || parsed.coupleNames?.person2 || '',
      },
    }
  } catch (error) {
    console.error('Error reading settings:', error)
    return defaultSettings
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await ensureDataDir()
    await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving settings:', error)
    throw error
  }
}

