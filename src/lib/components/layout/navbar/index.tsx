'use client'

import { useState, useEffect } from 'react'
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
  
  /** Rota do convite completo (seções com hash) */
  const isInviteRoute = pathname === '/invite'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scrollspy: Detecta qual seção está visível
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id) {
            setActiveSection(id)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    // Fallback: Verifica a posição do scroll diretamente
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute('id')

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          if (sectionId) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScrollSpy)
    handleScrollSpy() // Verifica na carga inicial

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollSpy)
    }
  }, [])

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
      icon: <Icon.NavHome width="1.25rem" height="1.25rem" className="w-5 h-5" />,
    },
    {
      href: getSectionHref('cerimonia'),
      label: 'Localização',
      id: 'cerimonia',
      icon: <Icon.Location width="1.25rem" height="1.25rem" className="w-5 h-5" />,
    },
    {
      href: getSectionHref('padrinhos'),
      label: 'Padrinhos',
      id: 'padrinhos',
      icon: <Icon.Users width="1.25rem" height="1.25rem" className="w-5 h-5" />,
    },
    {
      href: getSectionHref('faq'),
      label: 'Dúvidas',
      id: 'faq',
      icon: <Icon.QuestionMark width="1.25rem" height="1.25rem" className="w-5 h-5" />,
    },
    {
      href: '/gifts',
      label: 'Presentes',
      id: 'presentes',
      isExternal: false,
      icon: <Icon.Heart width="1.25rem" height="1.25rem" className="w-5 h-5" />,
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
                const isActive =
                  (isInviteRoute && activeSection === item.id) ||
                  (pathname === '/' && item.id === 'home')
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around h-16 px-2 max-w-full">
          {menuItems.map((item) => {
            const isActive =
              (isInviteRoute && activeSection === item.id) ||
              (pathname === '/' && item.id === 'home')
            const linkProps = item.isExternal 
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}

            const mobileLinkClass = `flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
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
                  <div className={`mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[0.625rem] font-medium transition-colors leading-tight ${isActive ? 'text-terracota-600' : 'text-gray-500'}`}>
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
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                    isActive
                      ? 'text-terracota-600'
                      : 'text-gray-500'
                  }`}
                >
                  <div className={`mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[0.625rem] font-medium transition-colors leading-tight ${isActive ? 'text-terracota-600' : 'text-gray-500'}`}>
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
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                  isActive && !item.isExternal
                    ? 'text-terracota-600'
                    : 'text-gray-500'
                }`}
              >
                <div className={`mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-medium transition-colors leading-tight ${isActive ? 'text-terracota-600' : 'text-gray-500'}`}>
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

