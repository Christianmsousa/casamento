'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { cn } from '@/lib/utils/cn'

interface PixQrCodeProps {
  payload: string
  className?: string
}

export function PixQrCode({ payload, className }: PixQrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function generate() {
      try {
        const url = await QRCode.toDataURL(payload, {
          errorCorrectionLevel: 'M',
          margin: 2,
          width: 280,
          color: { dark: '#2e2424', light: '#ffffff' },
        })
        if (!cancelled) {
          setDataUrl(url)
          setFailed(false)
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    setDataUrl(null)
    setFailed(false)
    void generate()

    return () => {
      cancelled = true
    }
  }, [payload])

  if (failed) {
    return (
      <p className="text-sm text-charcoal-500">
        Não foi possível gerar o QR Code. Use o código copia e cola abaixo.
      </p>
    )
  }

  return (
    <div className={cn('flex justify-center', className)}>
      <div className="flex h-48 w-48 items-center justify-center rounded-xl border border-cream-200 bg-white p-3 shadow-sm">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dataUrl}
            alt="QR Code PIX"
            width={280}
            height={280}
            className="h-full w-full object-contain"
          />
        ) : (
          <div
            className="h-40 w-40 animate-pulse rounded-lg bg-cream-100"
            aria-hidden
          />
        )}
      </div>
    </div>
  )
}
