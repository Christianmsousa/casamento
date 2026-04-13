'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Icon } from '@/lib/components/icons'
import { cn } from '@/lib/utils/cn'

const SITE_LOGO_SRC = '/images/monogram.png'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const spyRafRef = useRef(0)
  
  /** Rota do convite completo (seções com hash) */
  const isInviteRoute = pathname === '/invite'
  const isGiftsRoute = pathname === '/gifts'

  const navItemIsActive = (itemId: string) =>
    (isInviteRoute && activeSection === itemId) ||
    (pathname === '/' && itemId === 'home') ||
    (isGiftsRoute && itemId === 'presentes')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /** Scrollspy em /invite: getBoundingClientRect + linha de ativação (navbar fixa no desktop; topo da viewport no mobile). */
  useEffect(() => {
    if (pathname !== '/invite') {
      setActiveSection('home')
      return
    }

    const sections = document.querySelectorAll('section[id]')
    if (sections.length === 0) return

    const computeActiveSection = () => {
      spyRafRef.current = 0
      const isDesktopNav = window.matchMedia('(min-width: 768px)').matches
      const offset = isDesktopNav ? 96 : Math.min(140, window.innerHeight * 0.22)
      const y = window.scrollY + offset

      const firstId = sections[0]?.getAttribute('id')
      let currentId = firstId ?? 'home'
      sections.forEach((section) => {
        const el = section as HTMLElement
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= y) {
          const id = el.getAttribute('id')
          if (id) currentId = id
        }
      })

      setActiveSection((prev) => (prev === currentId ? prev : currentId))
    }

    const scheduleSpy = () => {
      if (spyRafRef.current) return
      spyRafRef.current = requestAnimationFrame(computeActiveSection)
    }

    computeActiveSection()
    window.addEventListener('scroll', scheduleSpy, { passive: true })
    window.addEventListener('resize', scheduleSpy)

    return () => {
      window.removeEventListener('scroll', scheduleSpy)
      window.removeEventListener('resize', scheduleSpy)
      if (spyRafRef.current) cancelAnimationFrame(spyRafRef.current)
    }
  }, [pathname])

  // Determina o href do link "Início" baseado na página atual
  const getHomeHref = () => {
    if (pathname === '/') {
      return '/'
    }
    if (isInviteRoute) {
      return '#home'
    }
    return '/invite#home'
  }

  // Função helper para gerar href baseado na página atual
  const getSectionHref = (sectionId: string) => {
    if (isInviteRoute) {
      return `#${sectionId}`
    }
    return `/invite#${sectionId}`
  }

  const desktopNavLinkClass = (active: boolean) =>
    cn(
      'relative py-1 text-sm font-medium tracking-[0.02em] transition-colors duration-200',
      active
        ? 'text-charcoal-900'
        : 'text-charcoal-600 hover:text-charcoal-900',
    )

  /** Mesma ordem do convite (InviteContent): início → local → padrinhos → dúvidas → presentes. Usado no desktop e na barra inferior mobile. */
  const menuItems: Array<{
    href: string
    label: string
    id: string
    isExternal?: boolean
    icon: React.ReactNode
  }> = [
    {
      href: getHomeHref(),
      label: 'Início',
      id: 'home',
      icon: <Icon.NavHome width="1.5rem" height="1.5rem" className="h-6 w-6" />,
    },
    {
      href: getSectionHref('cerimonia'),
      label: 'Localização',
      id: 'cerimonia',
      icon: <Icon.Location width="1.5rem" height="1.5rem" className="h-6 w-6" />,
    },
    {
      href: getSectionHref('padrinhos'),
      label: 'Padrinhos',
      id: 'padrinhos',
      icon: <Icon.Users width="1.5rem" height="1.5rem" className="h-6 w-6" />,
    },
    {
      href: getSectionHref('faq'),
      label: 'Dúvidas',
      id: 'faq',
      icon: <Icon.QuestionMark width="1.5rem" height="1.5rem" className="h-6 w-6" />,
    },
    {
      href: '/gifts',
      label: 'Presentes',
      id: 'presentes',
      isExternal: false,
      icon: <Icon.Heart width="1.5rem" height="1.5rem" className="h-6 w-6" />,
    },
  ]

  return (
    <>
      {/* Desktop Navbar - Top */}
      <nav
        className={cn(
          'fixed left-0 right-0 top-0 z-50 hidden transition-all duration-300 md:block',
          scrolled
            ? 'border-b border-gold-300/50 bg-cream-50/95 shadow-[0_4px_28px_-6px_rgba(46,36,36,0.09)] backdrop-blur-md'
            : 'border-b border-gold-200/45 bg-cream-50/85 backdrop-blur-md',
        )}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href={
                  pathname === '/'
                    ? '/'
                    : isInviteRoute
                      ? '#home'
                      : '/invite#home'
                }
                className="relative block h-9 w-9 transition-opacity hover:opacity-90 md:h-11 md:w-11"
              >
                <Image
                  src={SITE_LOGO_SRC}
                  alt="Julia e Christian"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 40px, 48px"
                  priority
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => {
                const isActive = navItemIsActive(item.id)
                const linkProps = item.isExternal 
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}

                // Mesma página /invite: âncoras #secção — <a> nativo (next/link não faz scroll)
                if (isInviteRoute && item.href.startsWith('#')) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={desktopNavLinkClass(isActive)}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold-500 shadow-[0_1px_2px_rgba(201,169,110,0.45)]"
                          aria-hidden
                        />
                      )}
                    </a>
                  )
                }
                
                // Se for link interno (começa com /) e não for externo, usar Link do Next.js
                if (item.href.startsWith('/') && !item.isExternal) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={desktopNavLinkClass(isActive)}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold-500 shadow-[0_1px_2px_rgba(201,169,110,0.45)]"
                          aria-hidden
                        />
                      )}
                    </Link>
                  )
                }
                
                // Se for link com hash (âncora), usar Link do Next.js para navegação entre páginas
                if (item.href.includes('#') && !item.isExternal) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={desktopNavLinkClass(isActive)}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold-500 shadow-[0_1px_2px_rgba(201,169,110,0.45)]"
                          aria-hidden
                        />
                      )}
                    </Link>
                  )
                }
                
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    {...linkProps}
                    className={desktopNavLinkClass(isActive)}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold-500 shadow-[0_1px_2px_rgba(201,169,110,0.45)]"
                        aria-hidden
                      />
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white/95 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden pb-[env(safe-area-inset-bottom)]"
        aria-label="Navegação principal"
      >
        <div className="mx-auto flex max-w-full items-stretch justify-around px-1 py-2 min-h-[5.25rem]">
          {menuItems.map((item) => {
            const isActive = navItemIsActive(item.id)
            const linkProps = item.isExternal 
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}

            const mobileLinkClass = `flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 px-0.5 py-1 transition-all duration-200 active:opacity-90 ${
              isActive ? 'text-terracota-600' : 'text-gray-500'
            }`

            // Mesma página /invite: âncoras — <a> nativo para o browser fazer scroll até #cerimonia etc.
            if (isInviteRoute && item.href.startsWith('#')) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={mobileLinkClass}
                >
                  <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                    {item.icon}
                  </div>
                  <span
                    className={`max-w-[4.5rem] text-center text-[0.7rem] font-semibold leading-tight tracking-tight sm:max-w-none sm:text-xs ${isActive ? 'text-terracota-600' : 'text-gray-500'}`}
                  >
                    {item.label}
                  </span>
                </a>
              )
            }
            
            // Se for link interno (começa com /) ou contém hash, usar Link do Next.js
            if ((item.href.startsWith('/') || item.href.includes('#')) && !item.isExternal) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 px-0.5 py-1 transition-all duration-200 active:opacity-90 ${
                    isActive ? 'text-terracota-600' : 'text-gray-500'
                  }`}
                >
                  <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                    {item.icon}
                  </div>
                  <span
                    className={`max-w-[4.5rem] text-center text-[0.7rem] font-semibold leading-tight tracking-tight sm:max-w-none sm:text-xs ${isActive ? 'text-terracota-600' : 'text-gray-500'}`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            }
            
            return (
              <a
                key={item.id}
                href={item.href}
                {...linkProps}
                className={`flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 px-0.5 py-1 transition-all duration-200 active:opacity-90 ${
                  isActive && !item.isExternal ? 'text-terracota-600' : 'text-gray-500'
                }`}
              >
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </div>
                <span
                  className={`max-w-[4.5rem] text-center text-[0.7rem] font-semibold leading-tight tracking-tight sm:max-w-none sm:text-xs ${isActive ? 'text-terracota-600' : 'text-gray-500'}`}
                >
                  {item.label}
                </span>
              </a>
            )
          })}
        </div>
      </nav>
    </>
  )
}

