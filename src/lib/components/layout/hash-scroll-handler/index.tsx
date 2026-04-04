'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function HashScrollHandler() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Aguarda um pouco para garantir que a página carregou completamente
    const timer = setTimeout(() => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          // Aguarda mais um pouco para garantir que o layout está estável
          setTimeout(() => {
            const elementPosition = (element as HTMLElement).offsetTop
            // Offset para navbar fixa (desktop: ~64px, mobile: navbar no bottom)
            const offset = window.innerWidth >= 768 ? 80 : 0
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth'
            })
          }, 50)
        }
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return null
}

