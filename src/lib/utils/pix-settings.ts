import type { PixSettings } from '@/lib/types/pix'
import type { Settings } from '@/lib/types/settings'
import { buildStaticPixCopyPaste, normalizePixPhoneKey } from '@/lib/utils/pix-payload'

const DEFAULT_MERCHANT_NAME = 'Julia e Christian'
const DEFAULT_MERCHANT_CITY = 'Valinhos'

/**
 * Monta PixSettings a partir das settings do site.
 * Gera copia-e-cola na hora; QR é renderizado no cliente a partir do payload.
 */
export function buildPixSettingsFromSiteSettings(settings: Settings): PixSettings | undefined {
  const pixKeyRaw = settings.pix_key?.trim()
  const pixKey = pixKeyRaw
    ? normalizePixPhoneKey(pixKeyRaw)
    : settings.gifts_whatsapp
      ? normalizePixPhoneKey(settings.gifts_whatsapp)
      : undefined

  const copyPaste = pixKey
    ? buildStaticPixCopyPaste({
        pixKey,
        merchantName: settings.pix_merchant_name?.trim() || DEFAULT_MERCHANT_NAME,
        merchantCity: settings.pix_merchant_city?.trim() || DEFAULT_MERCHANT_CITY,
      })
    : settings.pix_copy_paste?.trim()

  if (!copyPaste) return undefined

  return {
    copyPaste,
    note: settings.pix_note,
  }
}
