'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PixSettings } from '@/lib/pages/gifts/types'
import { Icon } from '@/lib/components/icons'

interface PixBlockProps {
  pix: PixSettings
}

export function PixBlock({ pix }: PixBlockProps) {
  const [copied, setCopied] = useState(false)

  const qrSrc = pix.qrImage
  const hasPix = pix.copyPaste || qrSrc

  if (!hasPix) return null

  const handleCopy = async () => {
    if (!pix.copyPaste) return
    try {
      await navigator.clipboard.writeText(pix.copyPaste)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback silencioso
    }
  }

  return (
    <section className="mt-12 border-t border-stone-200 pt-10">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-gold-600 uppercase mb-2">
            Outra forma de presentear
          </p>
          <h2 className="font-serif text-xl text-charcoal-800">Prefere enviar um PIX?</h2>
          <p className="mt-2 text-sm text-charcoal-500 font-light leading-relaxed">
            Se preferir, você pode nos enviar um presente via PIX. Ficamos muito gratos!
          </p>
        </div>

        {qrSrc && (
          <div className="flex justify-center">
            <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-cream-200 shadow-sm bg-white p-2">
              <Image
                src={qrSrc}
                alt="QR Code PIX"
                fill
                className="object-contain"
                sizes="192px"
              />
            </div>
          </div>
        )}

        {pix.copyPaste && (
          <div className="space-y-2">
            <div className="relative">
              <textarea
                readOnly
                value={pix.copyPaste}
                rows={3}
                className="w-full text-xs text-charcoal-600 bg-cream-50 border border-cream-200 rounded-lg px-3 py-2 resize-none focus:outline-none font-mono"
              />
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-terracota-300 text-terracota-700 hover:bg-terracota-50 transition-colors"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Icon.CheckCircle width="0.875rem" height="0.875rem" aria-hidden />
                  Copiado!
                </>
              ) : (
                <>
                  <Icon.Copy width="0.875rem" height="0.875rem" aria-hidden />
                  Copiar chave PIX
                </>
              )}
            </button>
          </div>
        )}

        {pix.note && (
          <p className="text-xs text-charcoal-400 italic">{pix.note}</p>
        )}
      </div>
    </section>
  )
}
