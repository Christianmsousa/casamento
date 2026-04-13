import { Suspense } from 'react'
import { Navbar } from '@/lib/components/layout/navbar'
import { HashScrollHandler } from '@/lib/components/layout/hash-scroll-handler'
import { GiftsPage } from '@/lib/pages/gifts'
import { getSettings } from '@/lib/data/settings'

export default async function GiftsPageRoute() {
  const settings = await getSettings()

  const pixSettings =
    settings.pix_copy_paste || settings.pix_qr_image
      ? {
          copyPaste: settings.pix_copy_paste,
          qrImage: settings.pix_qr_image,
          note: settings.pix_note,
        }
      : undefined

  return (
    <div className="relative min-h-screen bg-white">
      <div className="relative z-10">
        <Suspense fallback={null}>
          <HashScrollHandler />
        </Suspense>
        <Navbar />
        <GiftsPage whatsappPhone={settings.gifts_whatsapp} pixSettings={pixSettings} />
      </div>
    </div>
  )
}
