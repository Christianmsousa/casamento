'use client'

import { GiftCardProps } from './types'
import { giftCardVariants } from './styles'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/lib/components/ui/button'
import { Icon } from '@/lib/components/icons'
import Image from 'next/image'

const categoryLabels: Record<string, string> = {
  casa: 'Casa',
  cozinha: 'Cozinha',
  decoracao: 'Decoração',
  eletrodomesticos: 'Eletrodomésticos',
  quarto: 'Quarto',
  banheiro: 'Banheiro',
  outros: 'Outros',
}

const priceRangeLabels: Record<string, string> = {
  baixo: 'Até R$ 100',
  medio: 'R$ 100 - R$ 500',
  alto: 'Acima de R$ 500',
}

const statusConfig = {
  available: {
    label: 'Disponível',
    badge: 'bg-cream text-terracota-700 border border-terracota-200',
  },
  reserved: {
    label: 'Reservado',
    badge: 'bg-gold-100 text-gold-700 border border-gold-300',
  },
  purchased: {
    label: 'Comprado',
    badge: 'bg-cream-200 text-charcoal-500 border border-cream-200',
  },
}

export function GiftCard({ gift, onReserve }: GiftCardProps) {
  const handleReserve = (e: React.MouseEvent) => {
    e.stopPropagation()
    onReserve?.(gift.id)
  }

  const status = statusConfig[gift.status]

  return (
    <div className={cn(giftCardVariants({ status: gift.status }))}>

      {/* Imagem */}
      <div className="relative w-full h-48 md:h-52 bg-cream-100 overflow-hidden">
        {gift.referenceImageUrl ? (
          <Image
            src={gift.referenceImageUrl}
            alt={gift.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : gift.imageUrl ? (
          <Image
            src={gift.imageUrl}
            alt={gift.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-200">
            <Icon.Heart width="3.5rem" height="3.5rem" className="text-terracota-200" />
          </div>
        )}

        {/* Badge status */}
        <div className="absolute top-3 right-3">
          <span className={cn('px-2 py-1 rounded-full text-[10px] font-medium', status.badge)}>
            {status.label}
          </span>
        </div>

        {/* Badge categoria */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-full text-[10px] font-medium tracking-wide bg-white/90 backdrop-blur-sm text-charcoal-600 border border-cream-200">
            {categoryLabels[gift.category] || gift.category}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-sm font-semibold text-charcoal-800 mb-1.5 line-clamp-2 leading-snug">
          {gift.name}
        </h3>

        {gift.description && (
          <p className="text-xs text-charcoal-500 mb-2 line-clamp-2 flex-1 leading-relaxed">
            {gift.description}
          </p>
        )}

        {/* Preço */}
        <div className="mb-3">
          {gift.price ? (
            <p className="text-sm font-semibold text-terracota-600">
              R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          ) : gift.priceRange ? (
            <p className="text-xs text-terracota-600 font-medium">
              {priceRangeLabels[gift.priceRange]}
            </p>
          ) : null}
        </div>

        {/* Reservado por */}
        {gift.status === 'reserved' && gift.reservedBy && (
          <p className="text-[10px] text-charcoal-400 mb-3">
            Reservado por {gift.reservedBy.guestName}
          </p>
        )}

        {/* Botões */}
        <div className="flex flex-col gap-2 mt-auto">
          {gift.status === 'available' && onReserve && (
            <Button
              text="Presentear"
              onClick={handleReserve}
              className="w-full text-xs py-2"
              variant="primary"
            />
          )}
          {gift.referenceUrl && (
            <Button
              text="Ver Dica"
              iconLeft={
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              onClick={(e) => {
                e.stopPropagation()
                window.open(gift.referenceUrl, '_blank', 'noopener,noreferrer')
              }}
              variant="outline"
              className="w-full text-xs py-1.5"
            />
          )}
        </div>
      </div>
    </div>
  )
}
