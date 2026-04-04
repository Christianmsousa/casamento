# TabBar

Um componente de barra de abas (tabs) semelhante ao Jira, com suporte a ícones, indicador ativo animado e efeitos de hover.

## Características

- Indicador animado de aba selecionada
- Suporte a ícones
- Contador numérico para cada aba (ideal para dashboards)
- Efeitos de hover e transições suaves
- Opções de layout (largura total, alinhamento)
- Versão compacta disponível
- Estados desabilitados
- Acessibilidade com roles e atributos ARIA

## Uso básico

```tsx
import { useState } from 'react'
import { TabBar } from '@/lib/components/tab-bar'
import type { TabItem } from '@/lib/components/tab-bar'

export default function MyComponent() {
  const [activeTab, setActiveTab] = useState('tab1')
  
  const tabs: TabItem[] = [
    { id: 'tab1', label: 'Visão Geral', icon: 'house', count: 5 },
    { id: 'tab2', label: 'Detalhes', icon: 'info', count: 12 },
    { id: 'tab3', label: 'Relatórios', icon: 'analytique', count: 3 },
  ]
  
  return (
    <div className="p-4">
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      
      {/* Conteúdo da tab selecionada */}
      <div className="mt-4 p-4">
        {activeTab === 'tab1' && <div>Conteúdo da aba Visão Geral</div>}
        {activeTab === 'tab2' && <div>Conteúdo da aba Detalhes</div>}
        {activeTab === 'tab3' && <div>Conteúdo da aba Relatórios</div>}
      </div>
    </div>
  )
}
```

## Componente TabView

Para facilitar o uso, também exportamos um componente `TabView` que combina o TabBar com o conteúdo das abas:

```tsx
import { TabView } from '@/lib/components/tab-bar'
import type { TabViewItem } from '@/lib/components/tab-bar'

export default function MyComponent() {
  const tabs: TabViewItem[] = [
    { 
      id: 'tab1', 
      label: 'Visão Geral', 
      icon: 'house',
      count: 24,
      content: <div className="p-4">Conteúdo da aba Visão Geral</div>
    },
    { 
      id: 'tab2', 
      label: 'Detalhes', 
      icon: 'info',
      count: 7,
      content: <div className="p-4">Conteúdo da aba Detalhes</div>
    },
    { 
      id: 'tab3', 
      label: 'Relatórios', 
      icon: 'analytique',
      count: 0,
      content: <div className="p-4">Conteúdo da aba Relatórios</div>
    },
  ]
  
  return (
    <div className="p-4">
      <TabView
        tabs={tabs}
        defaultTab="tab1"
        onChange={(tabId) => console.log(`Tab alterada para: ${tabId}`)}
        contentClassName="bg-white rounded-lg shadow-sm min-h-[200px]"
      />
    </div>
  )
}
```

## Props

### TabBar Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `tabs` | `TabItem[]` | - | Array de objetos de tabs a serem renderizados |
| `activeTab` | `string` | - | ID da tab atualmente selecionada |
| `onChange` | `(tabId: string) => void` | - | Função chamada quando uma tab é selecionada |
| `variant` | `'default' \| 'compact'` | `'default'` | Variante de tamanho da barra de tabs |
| `fullWidth` | `boolean` | `false` | Se verdadeiro, as tabs ocupam toda a largura disponível |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alinhamento horizontal das tabs |

### TabView Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `tabs` | `TabViewItem[]` | - | Array de objetos de tabs com conteúdo |
| `defaultTab` | `string` | primeira tab | ID da tab inicialmente selecionada |
| `onChange` | `(tabId: string) => void` | - | Callback opcional quando uma tab é selecionada |
| `variant` | `'default' \| 'compact'` | `'default'` | Variante de tamanho da barra de tabs |
| `fullWidth` | `boolean` | `false` | Se verdadeiro, as tabs ocupam toda a largura disponível |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alinhamento horizontal das tabs |
| `className` | `string` | `''` | Classes CSS adicionais para o container |
| `contentClassName` | `string` | `''` | Classes CSS adicionais para o conteúdo |

### Interface TabItem

```ts
interface TabItem {
  id: string;       // ID único da tab
  label: string;    // Texto a ser exibido
  icon?: IconName;  // Nome do ícone opcional
  disabled?: boolean; // Se a tab está desabilitada
  count?: number;   // Contador numérico opcional (99+ para valores acima de 99)
}
```

### Interface TabViewItem

```ts
interface TabViewItem extends TabItem {
  content: ReactNode; // Conteúdo a ser renderizado quando a tab estiver ativa
}
```

## Exemplos

### Tabs com contadores

```tsx
const tabs: TabItem[] = [
  { id: 'tab1', label: 'Pendentes', count: 12 },
  { id: 'tab2', label: 'Em andamento', count: 5 },
  { id: 'tab3', label: 'Concluídas', count: 28 },
]

<TabBar
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

### Tabs com largura total

```tsx
<TabBar
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  fullWidth
/>
```

### Tabs compactas

```tsx
<TabBar
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="compact"
/>
```

### Tabs centralizadas

```tsx
<TabBar
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  align="center"
/>
```

### Tabs com tabs desabilitadas

```tsx
const tabs: TabItem[] = [
  { id: 'tab1', label: 'Aba 1' },
  { id: 'tab2', label: 'Aba 2', disabled: true, count: 3 },
  { id: 'tab3', label: 'Aba 3' },
]

<TabBar
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

## Exemplo com Páginas Inteiras

Você pode utilizar o TabBar para navegação entre páginas inteiras, similar ao Jira. Abaixo está um exemplo de implementação usando Next.js:

```tsx
// src/app/(private)/projetos/[id]/layout.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { TabBar } from '@/lib/components/tab-bar'

export default function ProjetoLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const pathname = usePathname()
  const router = useRouter()
  const projetoId = params.id
  
  // Simular contadores para cada seção
  const tabs = [
    { 
      id: `/projetos/${projetoId}/visao-geral`, 
      label: 'Visão Geral',
      icon: 'house',
      count: 0  // Sem contador
    },
    { 
      id: `/projetos/${projetoId}/tarefas`, 
      label: 'Tarefas',
      icon: 'box',
      count: 23  // 23 tarefas pendentes
    },
    { 
      id: `/projetos/${projetoId}/calendario`, 
      label: 'Calendário',
      icon: 'calendar',
      count: 5  // 5 eventos hoje
    },
    { 
      id: `/projetos/${projetoId}/relatorios`, 
      label: 'Relatórios',
      icon: 'analytique',
      count: 2  // 2 novos relatórios
    },
  ]
  
  const handleTabChange = (tabId: string) => {
    router.push(tabId)
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-white shadow-sm">
        <h1 className="text-h3 font-semibold mb-4">Nome do Projeto</h1>
        
        <TabBar
          tabs={tabs}
          activeTab={pathname}
          onChange={handleTabChange}
          variant="default"
        />
      </div>
      
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  )
}
```

A estrutura de arquivos seria:

```
src/app/(private)/projetos/[id]/
├── layout.tsx       # Layout compartilhado com TabBar
├── page.tsx         # Redireciona para visao-geral
├── visao-geral/
│   └── page.tsx     # Conteúdo da visão geral
├── tarefas/
│   └── page.tsx     # Conteúdo da lista de tarefas
├── calendario/
│   └── page.tsx     # Conteúdo do calendário
└── relatorios/
    └── page.tsx     # Conteúdo dos relatórios
```

Este padrão é muito similar ao Jira, onde as tabs permanecem visíveis enquanto o usuário navega entre as diferentes seções de um projeto. 