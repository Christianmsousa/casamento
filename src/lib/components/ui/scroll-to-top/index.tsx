'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@/lib/components/icons'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 md:bottom-6 right-6 z-40 p-2.5 bg-white/60 backdrop-blur-md border border-terracota-200/50 rounded-full shadow-sm hover:shadow-md hover:bg-white/80 hover:border-terracota-300/60 transition-all duration-300 group opacity-0 animate-fade-in"
      aria-label="Voltar ao topo"
    >
      <Icon.ArrowUp width="1rem" height="1rem" className="text-terracota-500/70 group-hover:text-terracota-600 transition-colors duration-300" />
    </button>
  )
}

