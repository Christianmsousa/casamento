# Referências de Componentes e Padrões UX

## 📱 Componentes Baseados em Referências

### 1. Dashboard Cards (Estilo Notion)

**Referência:** Notion Dashboard Widgets

**Componentes:**
- **StatCard**: Número grande + label + ícone
- **ProgressWidget**: Barra de progresso + porcentagem
- **QuickActionCard**: Ícone + título + descrição + ação
- **UpcomingTasks**: Lista de itens com indicadores visuais

**Padrões:**
- Cards com hover sutil
- Espaçamento generoso
- Tipografia hierárquica
- Cores consistentes

---

### 2. Lista de Tarefas (Estilo Todoist/Asana)

**Referência:** Todoist, Asana, Linear

**Componentes:**
- **TaskItem**: Checkbox + título + metadata (prioridade, data, categoria)
- **TaskList**: Lista scrollável com agrupamento
- **TaskFilters**: Chips de filtro (categoria, prioridade, status)
- **TaskForm**: Formulário inline ou modal

**Padrões:**
- Checkbox grande (touch-friendly)
- Drag to reorder (opcional)
- Quick actions (swipe)
- Estados visuais claros (concluído, pendente, atrasado)

---

### 3. Orçamento (Estilo Mint/YNAB)

**Referência:** Mint, YNAB, PocketGuard

**Componentes:**
- **BudgetSummary**: Total, gasto, restante, %
- **BudgetChart**: Gráfico de pizza (categorias)
- **BudgetBarChart**: Orçado vs. gasto
- **BudgetCategoryCard**: Categoria + progresso + valor
- **ExpenseForm**: Formulário de despesa

**Padrões:**
- Cores por categoria
- Alertas visuais (próximo do limite)
- Gráficos interativos
- Formulário rápido (valor + categoria)

---

### 4. Fornecedores (Estilo Airtable/Notion Database)

**Referência:** Airtable, Notion Database, Monday.com

**Componentes:**
- **VendorCard**: Card com foto + nome + status + ações
- **VendorList**: Grid ou lista
- **VendorFilters**: Status, categoria
- **VendorDetail**: Modal ou página com todas as informações
- **ContractUpload**: Upload de PDF + preview

**Padrões:**
- Status badges coloridos
- Filtros persistentes
- Busca rápida
- Comparação side-by-side

---

### 5. Timeline (Estilo Timeline.js/Vis.js)

**Referência:** Timeline.js, Vis.js, Gantt charts

**Componentes:**
- **TimelineView**: Linha do tempo horizontal/vertical
- **TimelineItem**: Item posicionado na timeline
- **TimelineMilestone**: Marco importante destacado
- **TimelineControls**: Zoom, filtros, navegação

**Padrões:**
- Scroll horizontal (mobile)
- Zoom in/out
- Cores por tipo (tarefa, marco, vencimento)
- Tooltips com detalhes

---

### 6. Checklists (Estilo Notion/Checklist.com)

**Referência:** Notion checklists, Checklist.com

**Componentes:**
- **ChecklistItem**: Checkbox + texto + sub-itens
- **ChecklistSection**: Agrupamento de itens
- **ChecklistProgress**: Barra de progresso geral
- **ChecklistTemplate**: Template pré-definido

**Padrões:**
- Checkbox grande
- Animação ao marcar
- Progresso visual
- Persistência automática

---

### 7. Convidados (Estilo Contacts/CRM)

**Referência:** Contacts app, CRM tools

**Componentes:**
- **GuestCard**: Nome + grupo + status RSVP
- **GuestList**: Lista com agrupamento por grupo
- **GuestFilters**: Grupo, RSVP status
- **GuestDetail**: Modal com todas as informações
- **RSVPBadge**: Badge colorido (Confirmado/Pendente/Negado)

**Padrões:**
- Agrupamento visual
- Busca rápida
- Ações em massa
- Exportar lista

---

### 8. Mesas (Estilo Seating Chart)

**Referência:** Seating chart tools, event planning apps

**Componentes:**
- **TableCanvas**: Canvas para arrastar mesas
- **TableShape**: Forma da mesa (redonda, retangular)
- **GuestDragItem**: Item arrastável de convidado
- **TableInfo**: Informações da mesa (número, capacidade)

**Padrões:**
- Drag and drop
- Zoom e pan
- Visualização prévia
- Exportar imagem/PDF

---

## 🎨 Padrões de Design Mobile-First

### Espaçamento
- **Mobile:** 16px base
- **Tablet:** 20px base
- **Desktop:** 24px base

### Tipografia
- **Mobile:** 14px base, 16px body
- **Desktop:** 16px base, 18px body

### Cores
- **Primary:** Terracota (#AE4D35)
- **Success:** Green (#10B981)
- **Warning:** Amber (#F59E0B)
- **Error:** Red (#EF4444)
- **Info:** Blue (#3B82F6)

### Sombras
- **Card:** shadow-sm
- **Hover:** shadow-md
- **Modal:** shadow-xl

### Bordas
- **Cards:** rounded-lg (8px)
- **Buttons:** rounded-md (6px)
- **Inputs:** rounded-md (6px)

---

## 📐 Layout Patterns

### Dashboard
```
┌─────────────────────────────┐
│ Header (Gradient)           │
├─────────────────────────────┤
│ Quick Actions (Buttons)     │
├─────────────────────────────┤
│ Stats Grid (2x2 mobile)     │
├─────────────────────────────┤
│ Progress Widgets (2 cols)   │
├─────────────────────────────┤
│ Upcoming Tasks              │
├─────────────────────────────┤
│ Quick Access Cards          │
└─────────────────────────────┘
```

### Lista de Tarefas
```
┌─────────────────────────────┐
│ Header + Add Button         │
├─────────────────────────────┤
│ Filters (Chips)             │
├─────────────────────────────┤
│ Task Item                   │
│ Task Item                   │
│ Task Item                   │
│ ...                         │
└─────────────────────────────┘
```

### Orçamento
```
┌─────────────────────────────┐
│ Summary Cards (3 cols)       │
├─────────────────────────────┤
│ Chart (Pie)                  │
├─────────────────────────────┤
│ Categories List             │
│ - Category + Progress       │
│ - Category + Progress       │
│ ...                         │
└─────────────────────────────┘
```

---

## 🔄 Estados e Interações

### Loading States
- Skeleton loaders
- Spinner centralizado
- Progress bar

### Empty States
- Ilustração ou ícone
- Mensagem explicativa
- CTA para criar primeiro item

### Error States
- Mensagem de erro clara
- Botão para tentar novamente
- Link para suporte

### Success States
- Toast notification
- Confirmação visual
- Feedback imediato

---

## 📱 Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl, 2xl)

### Grid System
- **Mobile:** 1 coluna
- **Tablet:** 2 colunas
- **Desktop:** 3-4 colunas

---

## 🎯 Acessibilidade

### Touch Targets
- Mínimo 44x44px
- Espaçamento adequado entre elementos

### Contraste
- Texto: mínimo 4.5:1
- UI elements: mínimo 3:1

### Navegação
- Keyboard navigation
- Focus states visíveis
- Skip links

---

*Documento criado em: 2026-01-03*
*Referências: Notion, Todoist, Asana, Mint, Airtable, Timeline.js*

