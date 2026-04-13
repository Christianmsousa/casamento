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

const offeringTypeConfig = {
  unique: {
    label: 'Presente único',
    className: 'bg-terracota-50 text-terracota-700 border border-terracota-200',
  },
  repeatable: {
    label: 'Vários podem presentear',
    className: 'bg-cream-200 text-charcoal-600 border border-cream-300',
  },
}

export function GiftCard({ gift, onReserve }: GiftCardProps) {
  const handleReserve = (e: React.MouseEvent) => {
    e.stopPropagation()
    onReserve?.(gift.id)
  }

  const status = statusConfig[gift.status]
  // imageUrl é canónico; referenceImageUrl é fallback legado
  const imageSrc = gift.imageUrl ?? gift.referenceImageUrl
  const offeringType = gift.offeringType ?? 'repeatable'
  // "Ver sugestão" usa referenceUrl (dica/afiliado); storeUrl como fallback
  const suggestionUrl = gift.referenceUrl ?? gift.storeUrl

  return (
    <div className={cn(giftCardVariants({ status: gift.status }))}>

      {/* Imagem — object-contain para o produto aparecer inteiro; faixa creme nas “letterboxes” */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100">
        {imageSrc ? (
          <div className="absolute inset-2 sm:inset-3">
            <Image
              src={imageSrc}
              alt={gift.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-200">
            <Icon.Heart width="3.5rem" height="3.5rem" className="text-terracota-200" />
          </div>
        )}

        {/* Badge status */}
        <div className="absolute top-3 right-3">
          <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', status.badge)}>
            {status.label}
          </span>
        </div>

        {/* Badge categoria */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full border border-cream-200 bg-white/90 px-2.5 py-1 text-xs font-medium tracking-wide text-charcoal-600 backdrop-blur-sm">
            {categoryLabels[gift.category] || gift.category}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-charcoal-800">
          {gift.name}
        </h3>

        {gift.description && (
          <p className="mb-2 line-clamp-3 flex-1 text-sm leading-relaxed text-charcoal-600">
            {gift.description}
          </p>
        )}

        {/* Preço */}
        <div className="mb-2">
          {gift.price ? (
            <p className="text-base font-semibold text-terracota-600">
              R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          ) : gift.priceRange ? (
            <p className="text-sm font-semibold text-terracota-600">
              {priceRangeLabels[gift.priceRange]}
            </p>
          ) : null}
        </div>

        {/* Badge offeringType */}
        <div className="mb-3">
          <span
            className={cn(
              'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
              offeringTypeConfig[offeringType].className
            )}
          >
            {offeringTypeConfig[offeringType].label}
          </span>
        </div>

        {/* Reservado por */}
        {gift.status === 'reserved' && gift.reservedBy && (
          <p className="mb-3 text-xs text-charcoal-500">
            Reservado por {gift.reservedBy.guestName}
          </p>
        )}

        {/* Botões */}
        <div className="mt-auto flex flex-col gap-2.5">
          {gift.status === 'available' && (
            <Button
              text="Presentear"
              onClick={onReserve ? handleReserve : undefined}
              disabled={!onReserve}
              size="lg"
              variant="primary"
            />
          )}
          {suggestionUrl && (
            <Button
              text="Ver sugestão"
              iconLeft={<Icon.ExternalLink width="0.875rem" height="0.875rem" />}
              onClick={(e) => {
                e.stopPropagation()
                window.open(suggestionUrl, '_blank', 'noopener,noreferrer')
              }}
              size="lg"
              variant="outline"
            />
          )}
        </div>
      </div>
    </div>
  )
}
