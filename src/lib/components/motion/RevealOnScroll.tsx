'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  /** Atraso da transição (ms), útil para efeito em cascata nos cards */
  delayMs?: number
}

/**
 * Revela o conteúdo ao entrar no viewport (fade + leve translateY).
 * Respeita `prefers-reduced-motion`: sem animação, conteúdo visível de imediato.
 */
export function RevealOnScroll({ children, className, delayMs = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { root: null, rootMargin: '32px 0px -5% 0px', threshold: 0.04 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn('reveal-on-scroll', isVisible && 'reveal-on-scroll-in', className)}
      style={
        isVisible && delayMs > 0
          ? ({ transitionDelay: `${delayMs}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  )
}
