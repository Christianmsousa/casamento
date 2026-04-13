import { Suspense } from 'react'
import { Navbar } from '@/lib/components/layout/navbar'
import { ScrollToTop } from '@/lib/components/ui/scroll-to-top'
import { HashScrollHandler } from '@/lib/components/layout/hash-scroll-handler'
import { InviteContent } from '@/lib/pages/invite'
import { useInviteData } from '@/lib/hooks/useInviteData'

export default async function InvitePage() {
  const { settings, faq } = await useInviteData()

  return (
    <div className="relative min-h-screen bg-white pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="relative z-10">
      <Suspense fallback={null}>
        <HashScrollHandler />
      </Suspense>
      <Navbar />
      <ScrollToTop />
      <InviteContent settings={settings} faq={faq} />
      </div>
    </div>
  )
}
