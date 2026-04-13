'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/lib/components/ui/button'
import { Card as FormCard, ItemCard, type ItemAction } from '@/lib/components/ui/card'
import { FormTextInput } from '@/lib/components/form/FormTextInput'
import { FormTextArea } from '@/lib/components/form/FormTextArea'
import { FormSelect, type SelectOption } from '@/lib/components/form/FormSelect'
import { FormNumberInput } from '@/lib/components/form/FormNumberInput'
import { FormMoneyInput } from '@/lib/components/form/FormMoneyInput'
import { Icon } from '@/lib/components/icons'
import type { Gift, GiftCategory, PriceRange, OfferingType } from '@/lib/types/gift'

interface GiftFormData {
  name: string
  description: string
  category: GiftCategory
  offeringType: OfferingType
  price: string // FormMoneyInput retorna string formatada
  priceRange: PriceRange | ''
  imageUrl: string
  storeUrl: string
  storeName: string
  referenceUrl: string
  referenceImageUrl: string
  priority: string
}

interface GiftsManagerProps {
  initialGift?: Gift | null
  onClose?: () => void
}

export function GiftsManager(props: GiftsManagerProps = {}) {
  const { initialGift = null, onClose } = props
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [editingGift, setEditingGift] = useState<Gift | null>(initialGift)
  const [showForm, setShowForm] = useState(!!initialGift)

  const { control, handleSubmit, reset, watch } = useForm<GiftFormData>({
    defaultValues: {
      name: '',
      description: '',
      category: 'outros',
      offeringType: 'repeatable',
      price: '',
      priceRange: '',
      imageUrl: '',
      storeUrl: '',
      storeName: '',
      referenceUrl: '',
      referenceImageUrl: '',
      priority: '0',
    },
  })

  useEffect(() => {
    loadGifts()
  }, [])

  useEffect(() => {
    if (initialGift) {
      setEditingGift(initialGift)
      setShowForm(true)
      reset({
        name: initialGift.name,
        description: initialGift.description || '',
        category: initialGift.category,
        offeringType: initialGift.offeringType ?? 'repeatable',
        price: initialGift.price ? Math.round(initialGift.price * 100).toString() : '',
        priceRange: initialGift.priceRange || '',
        imageUrl: initialGift.imageUrl || '',
        storeUrl: initialGift.storeUrl || '',
        storeName: initialGift.storeName || '',
        referenceUrl: initialGift.referenceUrl || '',
        referenceImageUrl: initialGift.referenceImageUrl || '',
        priority: (initialGift.priority || 0).toString(),
      })
    }
  }, [initialGift, reset])

  const loadGifts = async () => {
    try {
      const response = await fetch('/api/gifts')
      if (response.ok) {
        const data = await response.json()
        setGifts(data)
      }
    } catch (error) {
      console.error('Erro ao carregar presentes:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: GiftFormData) => {
    try {
      const giftData = {
        name: data.name,
        description: data.description || undefined,
        category: data.category,
        offeringType: data.offeringType,
        price: data.price ? Number(data.price) / 100 : undefined,
        priceRange: data.priceRange || undefined,
        imageUrl: data.imageUrl || undefined,
        storeUrl: data.storeUrl || undefined,
        storeName: data.storeName || undefined,
        referenceUrl: data.referenceUrl || undefined,
        referenceImageUrl: data.referenceImageUrl || undefined,
        priority: Number(data.priority) || 0,
      }

      if (editingGift) {
        const response = await fetch(`/api/gifts/${editingGift.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(giftData),
        })
        if (response.ok) {
          await loadGifts()
          resetForm()
          onClose?.()
        }
      } else {
        const response = await fetch('/api/gifts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(giftData),
        })
        if (response.ok) {
          await loadGifts()
          resetForm()
          onClose?.()
        }
      }
    } catch (error) {
      console.error('Erro ao salvar presente:', error)
    }
  }

  const handleEdit = (gift: Gift) => {
    setEditingGift(gift)
    reset({
      name: gift.name,
      description: gift.description || '',
      category: gift.category,
      offeringType: gift.offeringType ?? 'repeatable',
      price: gift.price ? Math.round(gift.price * 100).toString() : '',
      priceRange: gift.priceRange || '',
      imageUrl: gift.imageUrl || '',
      storeUrl: gift.storeUrl || '',
      storeName: gift.storeName || '',
      referenceUrl: gift.referenceUrl || '',
      referenceImageUrl: gift.referenceImageUrl || '',
      priority: (gift.priority || 0).toString(),
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este presente?')) return
    try {
      const response = await fetch(`/api/gifts/${id}`, { method: 'DELETE' })
      if (response.ok) await loadGifts()
    } catch (error) {
      console.error('Erro ao excluir presente:', error)
    }
  }

  const resetForm = () => {
    setEditingGift(null)
    setShowForm(false)
    reset({
      name: '',
      description: '',
      category: 'outros',
      offeringType: 'repeatable',
      price: '',
      priceRange: '',
      imageUrl: '',
      storeUrl: '',
      storeName: '',
      referenceUrl: '',
      referenceImageUrl: '',
      priority: '0',
    })
    onClose?.()
  }

  const categoryOptions: SelectOption[] = [
    { value: 'casa', label: 'Casa' },
    { value: 'cozinha', label: 'Cozinha' },
    { value: 'decoracao', label: 'Decoração' },
    { value: 'eletrodomesticos', label: 'Eletrodomésticos' },
    { value: 'quarto', label: 'Quarto' },
    { value: 'banheiro', label: 'Banheiro' },
    { value: 'outros', label: 'Outros' },
  ]

  const offeringTypeOptions: SelectOption[] = [
    { value: 'repeatable', label: 'Vários podem presentear' },
    { value: 'unique', label: 'Presente único' },
  ]

  const priceRangeOptions: SelectOption[] = [
    { value: 'baixo', label: 'Baixo (até R$ 100)' },
    { value: 'medio', label: 'Médio (R$ 100–500)' },
    { value: 'alto', label: 'Alto (acima de R$ 500)' },
  ]

  // watch não usado mas mantido para compatibilidade futura
  void watch

  if (loading) {
    return <div className="text-center py-4 text-xs text-neutral-600">Carregando presentes...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Lista de Presentes</h3>
          <p className="mt-1 text-xs text-neutral-600">
            {gifts.length === 0
              ? 'Nenhum presente cadastrado'
              : `${gifts.length} ${gifts.length === 1 ? 'presente cadastrado' : 'presentes cadastrados'}`}
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          variant="primary"
          size="sm"
          text="+ Adicionar Presente"
        />
      </div>

      {/* Formulário de Adicionar/Editar */}
      {showForm && (
        <FormCard className="p-4">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-neutral-900">
              {editingGift ? 'Editar Presente' : 'Adicionar Novo Presente'}
            </h4>
            <p className="mt-1 text-xs text-neutral-600">
              {editingGift
                ? 'Atualize as informações do presente abaixo'
                : 'Preencha os dados do presente que deseja adicionar'}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <FormTextInput
                  name="name"
                  label="Nome do Presente"
                  control={control}
                  placeholder="Ex: Jogo de Pratos"
                  icon={<Icon.Gift width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
                />
              </div>

              <div className="md:col-span-2">
                <FormTextArea
                  name="description"
                  label="Descrição"
                  control={control}
                  placeholder="Descreva o presente..."
                  rows={4}
                />
              </div>

              <FormSelect
                name="category"
                label="Categoria"
                control={control}
                options={categoryOptions}
                icon={<Icon.Category width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />

              <FormSelect
                name="offeringType"
                label="Tipo de presente"
                control={control}
                options={offeringTypeOptions}
                icon={<Icon.Gift width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />

              <FormNumberInput
                name="priority"
                label="Prioridade"
                control={control}
                placeholder="0"
                min={0}
                icon={<Icon.Filter width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />

              <FormMoneyInput
                name="price"
                label="Preço"
                control={control}
                placeholder="0,00"
                prefix="R$ "
              />

              <FormSelect
                name="priceRange"
                label="Faixa de Preço"
                control={control}
                options={priceRangeOptions}
                placeholder="Selecione..."
              />

              <FormTextInput
                name="storeName"
                label="Nome da Loja"
                control={control}
                placeholder="Ex: Magazine Luiza"
                icon={<Icon.Store width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />

              <FormTextInput
                name="storeUrl"
                label="URL da Loja"
                control={control}
                type="url"
                placeholder="https://..."
                icon={<Icon.ExternalLink width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />

              <FormTextInput
                name="imageUrl"
                label="URL da foto (card)"
                control={control}
                type="url"
                placeholder="https://..."
                icon={<Icon.Upload width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />

              <FormTextInput
                name="referenceUrl"
                label="URL de Referência (sugestão)"
                control={control}
                type="url"
                placeholder="https://..."
                icon={<Icon.ExternalLink width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />

              <FormTextInput
                name="referenceImageUrl"
                label="URL da imagem de referência (fallback)"
                control={control}
                type="url"
                placeholder="https://..."
                icon={<Icon.Upload width="1.25rem" height="1.25rem" className="text-neutral-light-600" />}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" text={`${editingGift ? 'Atualizar' : 'Adicionar'} Presente`} />
              <Button type="button" variant="outline" onClick={resetForm} text="Cancelar" />
            </div>
          </form>
        </FormCard>
      )}

      {/* Lista de Presentes */}
      <div className="space-y-3">
        {gifts.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
            <p className="text-xs text-neutral-500">Nenhum presente cadastrado ainda.</p>
            <p className="mt-1 text-xs text-neutral-400">
              Clique em "Adicionar Presente" para começar
            </p>
          </div>
        ) : (
          gifts.map((gift) => {
            const metadataParts: string[] = []
            if (gift.price) metadataParts.push(`R$ ${gift.price.toFixed(2)}`)
            if (gift.priceRange)
              metadataParts.push(
                `Faixa: ${gift.priceRange.charAt(0).toUpperCase() + gift.priceRange.slice(1)}`
              )
            if ((gift.priority ?? 0) > 0) metadataParts.push(`Prioridade: ${gift.priority}`)

            const categoryLabel = gift.category.charAt(0).toUpperCase() + gift.category.slice(1)
            const statusLabel =
              gift.status === 'reserved'
                ? ' • Reservado'
                : gift.status === 'purchased'
                  ? ' • Comprado'
                  : ''
            const offeringLabel =
              gift.offeringType === 'unique' ? ' • Presente único' : ' • Vários podem presentear'

            const description = [
              gift.description,
              categoryLabel + statusLabel + offeringLabel,
              metadataParts.length > 0 ? metadataParts.join(' • ') : null,
            ]
              .filter(Boolean)
              .join('\n')

            const actions: ItemAction[] = [
              {
                icon: 'Edit',
                tooltip: 'Editar presente',
                onClick: () => handleEdit(gift),
              },
              {
                icon: 'Trash',
                tooltip: 'Excluir presente',
                onClick: () => handleDelete(gift.id),
              },
            ]

            return (
              <ItemCard
                key={gift.id}
                title={gift.name}
                description={description}
                actions={actions}
                variant="primary"
                icon={<Icon.Gift width="1.5rem" height="1.5rem" />}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
