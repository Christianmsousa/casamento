'use client'

import { useState } from 'react'
import type { PixSettings } from '@/lib/types/pix'
import { Icon } from '@/lib/components/icons'
import { cn } from '@/lib/utils/cn'
import { PixQrCode } from './PixQrCode'

interface PixBlockProps {
  pix: PixSettings
  /** primary = destaque na landing; secondary = bloco abaixo da lista (página /gifts legada) */
  variant?: 'primary' | 'secondary'
  className?: string
}

const copyByVariant = {
  primary: {
    eyebrow: 'Lua de mel',
    title: 'Enviar um PIX',
    description:
      'Use a chave ou o QR Code abaixo. Qualquer valor nos ajuda na viagem, e agradecemos de coração.',
  },
  secondary: {
    eyebrow: 'Outra forma de presentear',
    title: 'Prefere enviar um PIX?',
    description: 'Se preferir, você pode nos enviar um presente via PIX. Ficamos muito gratos!',
  },
} as const

export function PixBlock({ pix, variant = 'primary', className }: PixBlockProps) {
  const [copied, setCopied] = useState(false)
  const copy = copyByVariant[variant]

  if (!pix.copyPaste) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pix.copyPaste)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback silencioso
    }
  }

  return (
    <section
      className={cn(
        variant === 'secondary' && 'mt-12 border-t border-stone-200 pt-10',
        variant === 'primary' && 'mt-8',
        className,
      )}
    >
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-xl text-charcoal-800">{copy.title}</h2>
          <p className="mt-2 text-sm font-light leading-relaxed text-charcoal-500">
            {copy.description}
          </p>
        </div>

        <PixQrCode payload={pix.copyPaste} />

        <div className="space-y-2">
          <div className="relative">
            <textarea
              readOnly
              value={pix.copyPaste}
              rows={3}
              className="w-full resize-none rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 font-mono text-xs text-charcoal-600 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-terracota-300 px-4 py-2 text-xs font-medium text-terracota-700 transition-colors hover:bg-terracota-50"
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
                Copiar código PIX
              </>
            )}
          </button>
        </div>

        {pix.note && <p className="text-xs italic text-charcoal-400">{pix.note}</p>}
      </div>
    </section>
  )
}
