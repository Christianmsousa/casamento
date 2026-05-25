import { readFile } from 'fs/promises'
import { join } from 'path'
import { getSettings } from '@/lib/data/settings'
import type { PixSettings } from '@/lib/types/pix'
import { buildPixSettingsFromSiteSettings } from '@/lib/utils/pix-settings'

export interface InviteData {
  settings: {
    wedding_date: string
    ceremony_location: string | { address?: string; cep?: string; city?: string; state?: string }
    reception_location: string | { address?: string; cep?: string; city?: string; state?: string }
    couple_names: { person1: string; person2: string }
  }
  faq: string
  pixSettings?: PixSettings
  giftsWhatsapp?: string
}

export async function useInviteData(): Promise<InviteData> {
  let settings: InviteData['settings'] = {
    wedding_date: '',
    ceremony_location: '',
    reception_location: '',
    couple_names: { person1: '', person2: '' },
  }

  let faq = ''

  let pixSettings: PixSettings | undefined
  let giftsWhatsapp: string | undefined

  try {
    const loaded = await getSettings()
    settings = loaded
    giftsWhatsapp = loaded.gifts_whatsapp

    pixSettings = buildPixSettingsFromSiteSettings(loaded)

    // Load markdown files
    try {
      faq = await readFile(join(process.cwd(), 'content', 'invite', 'faq.md'), 'utf-8')
    } catch {
      faq = ''
    }
  } catch (error) {
    console.error('Error loading settings:', error)
  }

  return { settings, faq, pixSettings, giftsWhatsapp }
}


