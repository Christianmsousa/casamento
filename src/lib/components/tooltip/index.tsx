'use client'

import {
  useFloating,
  offset,
  shift,
  FloatingPortal,
  arrow,
  Placement,
} from '@floating-ui/react'
import { useState, useRef, useEffect } from 'react'

interface TooltipProps {
  content: string | React.ReactNode
  children: React.ReactNode
  delay?: number
  placement?: Placement
  forceClose?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Tooltip({
  content,
  children,
  delay = 200,
  placement = 'top',
  forceClose = false,
  size = 'md',
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const { refs, floatingStyles, middlewareData } = useFloating({
    placement,
    middleware: [offset(8), shift(), arrow({ element: arrowRef })],
  })

  // Fecha o tooltip quando forceClose é true ou quando há mudanças de contexto
  useEffect(() => {
    if (forceClose && isOpen) {
      clearTimeout(timeoutRef.current)
      setIsOpen(false)
    }
  }, [forceClose, isOpen])

  useEffect(() => {
    const handleDocumentClick = () => {
      if (isOpen) {
        clearTimeout(timeoutRef.current)
        setIsOpen(false)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden && isOpen) {
        clearTimeout(timeoutRef.current)
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isOpen])

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(true), delay)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current)
    setIsOpen(false)
  }

  // Sempre envolve em <span> para garantir ref e handlers
  const child = (
    <span
      ref={refs.setReference}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
      data-tooltip="true"
    >
      {children}
    </span>
  )

  return (
    <>
      {child}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              zIndex: 99999,
            }}
          >
            <div
              className={`relative whitespace-normal break-words rounded bg-black px-3 py-2 text-body3 font-medium leading-relaxed text-white shadow-lg ${
                size === 'sm'
                  ? 'max-w-xs'
                  : size === 'lg'
                    ? 'max-w-md'
                    : 'max-w-sm'
              }`}
            >
              {content}
              <div
                ref={arrowRef}
                className="absolute h-2 w-2 -translate-y-1 rotate-45 bg-black"
                style={{
                  left:
                    middlewareData.arrow?.x != null
                      ? `${middlewareData.arrow.x}px`
                      : '',
                  top: '100%',
                }}
              />
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
