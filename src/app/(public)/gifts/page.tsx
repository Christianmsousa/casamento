import { Suspense } from 'react'
import { Navbar } from '@/lib/components/layout/navbar'
import { HashScrollHandler } from '@/lib/components/layout/hash-scroll-handler'
import { GiftsPage } from '@/lib/pages/gifts'

export default function GiftsPageRoute() {
  return (
    <div className="relative min-h-screen bg-cream">
      <div className="relative z-10">
        <Suspense fallback={null}>
          <HashScrollHandler />
        </Suspense>
        <Navbar />
        <GiftsPage />
      </div>
    </div>
  )
}
