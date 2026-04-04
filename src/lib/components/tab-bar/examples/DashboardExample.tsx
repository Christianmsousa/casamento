'use client'

import { TabView } from '../index'
import type { TabViewItem } from '../index'

// Componentes de exemplo para cada aba
const PendingOrdersContent = () => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-h4 font-semibold text-neutral-900">
      Pedidos Pendentes
    </h2>
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
        >
          <div>
            <p className="font-medium text-neutral-900">
              Pedido #{10230 + index}
            </p>
            <p className="text-sm text-neutral-600">Cliente: João Silva</p>
          </div>
          <div className="rounded-full bg-brand-blue-50 px-3 py-1 text-sm font-medium text-brand-blue-600">
            Aguardando pagamento
          </div>
        </div>
      ))}
    </div>
  </div>
)

const DeliveryContent = () => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-h4 font-semibold text-neutral-900">
      Entregas Agendadas
    </h2>
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
        >
          <div>
            <p className="font-medium text-neutral-900">
              Pedido #{10350 + index}
            </p>
            <p className="text-sm text-neutral-600">
              Endereço: Rua das Flores, 123
            </p>
          </div>
          <div className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
            Saindo para entrega
          </div>
        </div>
      ))}
    </div>
  </div>
)

const CompletedOrdersContent = () => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-h4 font-semibold text-neutral-900">
      Pedidos Concluídos
    </h2>
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
        >
          <div>
            <p className="font-medium text-neutral-900">
              Pedido #{10100 + index}
            </p>
            <p className="text-sm text-neutral-600">
              Data: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
            Concluído
          </div>
        </div>
      ))}
    </div>
  </div>
)

const CancelledOrdersContent = () => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-h4 font-semibold text-neutral-900">
      Pedidos Cancelados
    </h2>
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
        >
          <div>
            <p className="font-medium text-neutral-900">
              Pedido #{10050 + index}
            </p>
            <p className="text-sm text-neutral-600">
              Motivo: Produto indisponível
            </p>
          </div>
          <div className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
            Cancelado
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function DashboardExample() {
  // Definir as abas com contadores
  const tabs: TabViewItem[] = [
    {
      id: 'pending',
      label: 'Pendentes',
      icon: 'box',
      count: 5,
      content: <PendingOrdersContent />,
    },
    {
      id: 'delivery',
      label: 'Em entrega',
      icon: 'house',
      count: 3,
      content: <DeliveryContent />,
    },
    {
      id: 'completed',
      label: 'Concluídos',
      icon: 'analytique',
      count: 8,
      content: <CompletedOrdersContent />,
    },
    {
      id: 'cancelled',
      label: 'Cancelados',
      icon: 'close',
      count: 2,
      content: <CancelledOrdersContent />,
    },
  ]

  return <TabView tabs={tabs} defaultTab="pending" />
}
