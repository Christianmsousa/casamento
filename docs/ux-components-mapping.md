# Mapeamento de Componentes - Referências e Implementação

## 📱 Componentes Identificados nas Pesquisas

### Material Design Components (Google)
Baseado nas pesquisas, identifiquei componentes do Material Design que se adequam perfeitamente ao nosso fluxo:

---

## 🎯 Mapeamento por Funcionalidade

### 1. ORÇAMENTO 💰

#### Componentes Necessários:

**BudgetSummary (Resumo)**
- **Referência:** Material Design Cards + Stats
- **Padrão:** 3 cards lado a lado (Total, Gasto, Restante)
- **Mobile:** Stack vertical
- **Desktop:** 3 colunas
- **Elementos:**
  - Número grande (valor)
  - Label descritivo
  - Ícone contextual
  - Cor por tipo (verde/vermelho/neutro)

**BudgetPieChart (Gráfico Pizza)**
- **Referência:** Material Design Charts
- **Padrão:** Gráfico circular interativo
- **Mobile:** Full width, altura reduzida
- **Desktop:** Lado a lado com lista
- **Elementos:**
  - Legenda clicável
  - Tooltip ao hover
  - Cores por categoria
  - Percentual visível

**BudgetCategoryCard (Card de Categoria)**
- **Referência:** Material Design Cards + Progress Bar
- **Padrão:** Card com barra de progresso
- **Elementos:**
  - Nome da categoria
  - Valor orçado vs. gasto
  - Barra de progresso colorida
  - Percentual utilizado
  - Botão "Ver detalhes"

**ExpenseForm (Formulário de Despesa)**
- **Referência:** Material Design Text Fields + Date Picker
- **Padrão:** Formulário em modal/drawer
- **Mobile:** Full screen drawer
- **Desktop:** Modal centralizado
- **Elementos:**
  - Input de valor (currency)
  - Select de categoria
  - Date picker
  - Textarea para descrição
  - Link para vincular tarefa

**ExpenseList (Lista de Despesas)**
- **Referência:** Material Design Lists
- **Padrão:** Lista com ações
- **Elementos:**
  - Item com valor + categoria + data
  - Ações (editar, excluir)
  - Filtros (data, categoria)

---

### 2. FORNECEDORES 🏢

#### Componentes Necessários:

**VendorCard (Card de Fornecedor)**
- **Referência:** Material Design Cards + Avatar
- **Padrão:** Card com foto/avatar + informações
- **Elementos:**
  - Avatar/Logo (circular)
  - Nome da empresa
  - Categoria (badge)
  - Status (badge colorido)
  - Rating (estrelas)
  - Ações rápidas (contato, ver detalhes)

**VendorList (Lista de Fornecedores)**
- **Referência:** Material Design Lists/Grid
- **Padrão:** Grid responsivo
- **Mobile:** 1 coluna (lista)
- **Tablet:** 2 colunas
- **Desktop:** 3 colunas
- **Elementos:**
  - Filtros persistentes
  - Busca rápida
  - Ordenação (nome, categoria, status)

**VendorDetail (Detalhes do Fornecedor)**
- **Referência:** Material Design Detail Views
- **Padrão:** Página/Modal com tabs
- **Tabs:**
  - Informações
  - Contratos
  - Tarefas vinculadas
  - Notas
- **Elementos:**
  - Header com foto + nome
  - Informações de contato (chips clicáveis)
  - Lista de contratos
  - Formulário de notas

**VendorForm (Formulário de Fornecedor)**
- **Referência:** Material Design Forms
- **Padrão:** Formulário multi-step (opcional)
- **Elementos:**
  - Dados básicos
  - Contatos (telefone, email, WhatsApp)
  - Endereço (com mapa)
  - Categoria (select)
  - Status (radio buttons)
  - Avaliação (slider 1-5)

**ContractUpload (Upload de Contrato)**
- **Referência:** Material Design File Upload
- **Padrão:** Drag & drop + preview
- **Elementos:**
  - Área de drop
  - Preview do PDF
  - Campos do contrato (valor, datas)
  - Botão de upload

---

### 3. TIMELINE 📅

#### Componentes Necessários:

**TimelineView (Visualização da Timeline)**
- **Referência:** Material Design Timeline + Vis.js patterns
- **Padrão:** Linha do tempo horizontal/vertical
- **Mobile:** Vertical (scroll)
- **Desktop:** Horizontal (scroll)
- **Elementos:**
  - Linha central
  - Itens posicionados por data
  - Marcos destacados
  - Zoom in/out
  - Navegação (anterior/próximo)

**TimelineItem (Item da Timeline)**
- **Referência:** Material Design Timeline items
- **Padrão:** Card conectado à linha
- **Elementos:**
  - Data destacada
  - Título
  - Descrição
  - Tipo (badge)
  - Ações (ver detalhes)

**TimelineMilestone (Marco Importante)**
- **Referência:** Material Design Timeline milestones
- **Padrão:** Item maior e destacado
- **Elementos:**
  - Ícone grande
  - Data em destaque
  - Título grande
  - Descrição
  - Cor diferenciada

**TimelineControls (Controles)**
- **Referência:** Material Design Toolbars
- **Padrão:** Barra de controles fixa
- **Elementos:**
  - Filtro (Mensal/Semanal)
  - Zoom in/out
  - Botão "Adicionar marco"
  - Busca

---

## 🎨 Padrões de Design Identificados

### Material Design Patterns

#### 1. Cards
- **Elevation:** shadow-sm (hover: shadow-md)
- **Border radius:** 8px (rounded-lg)
- **Padding:** 16px mobile, 24px desktop
- **Hover:** Scale 1.02 + shadow

#### 2. Lists
- **Item height:** 64px mínimo (touch target)
- **Padding:** 16px horizontal
- **Divider:** border-b (1px)
- **Actions:** Swipe ou menu de 3 pontos

#### 3. Forms
- **Input height:** 56px
- **Label:** Flutuante (Material Design)
- **Error states:** Texto vermelho abaixo
- **Success states:** Check verde

#### 4. Navigation
- **Bottom nav:** 5 itens máximo
- **Icon size:** 24px
- **Label:** 12px font
- **Active state:** Cor primária + bold

#### 5. Progress Indicators
- **Linear:** Barra horizontal
- **Circular:** Spinner ou donut chart
- **Colors:** Primary para progresso, gray para background

---

## 📐 Layout Patterns por Tela

### Dashboard
```
┌─────────────────────────────┐
│ Header (Gradient)           │ ← Material App Bar
├─────────────────────────────┤
│ Quick Actions (Chips)       │ ← Material Chips
├─────────────────────────────┤
│ Stats Grid (Cards)          │ ← Material Cards
├─────────────────────────────┤
│ Progress Widgets            │ ← Material Progress
├─────────────────────────────┤
│ Upcoming Tasks (List)       │ ← Material List
├─────────────────────────────┤
│ Quick Access (Cards)        │ ← Material Cards
└─────────────────────────────┘
```

### Orçamento
```
┌─────────────────────────────┐
│ Summary Cards (3 cols)       │ ← Material Cards
├─────────────────────────────┤
│ Pie Chart                   │ ← Material Chart
├─────────────────────────────┤
│ Categories List             │ ← Material List + Progress
│ - Category Card             │
│ - Category Card             │
└─────────────────────────────┘
```

### Fornecedores
```
┌─────────────────────────────┐
│ Filters (Chips)             │ ← Material Chips
├─────────────────────────────┤
│ Vendor Grid                 │ ← Material Grid
│ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │Card │ │Card │ │Card │    │
│ └─────┘ └─────┘ └─────┘    │
└─────────────────────────────┘
```

### Timeline
```
┌─────────────────────────────┐
│ Controls (Toolbar)          │ ← Material Toolbar
├─────────────────────────────┤
│ Timeline (Horizontal)       │ ← Custom Timeline
│ ──●───●───●───●───●───     │
│  Item Item Item Item Item   │
└─────────────────────────────┘
```

---

## 🔧 Componentes Base a Criar

### 1. Base Components (Já temos alguns)
- ✅ `Card` - Material Design Card
- ✅ `Button` - Material Design Button
- ✅ `Input` - Material Design Text Field
- ✅ `Badge` - Material Design Chip
- ⚠️ `Progress` - Precisa melhorar
- ❌ `DatePicker` - Criar
- ❌ `Select` - Melhorar
- ❌ `Modal` - Criar
- ❌ `Drawer` - Criar (mobile)
- ❌ `Tabs` - Criar

### 2. Planning Components (Novos)
- ❌ `BudgetSummary`
- ❌ `BudgetPieChart`
- ❌ `BudgetCategoryCard`
- ❌ `VendorCard`
- ❌ `VendorList`
- ❌ `TimelineView`
- ❌ `TimelineItem`

---

## 📱 Responsividade

### Mobile (< 640px)
- **Cards:** Full width, stack vertical
- **Grids:** 1 coluna
- **Modals:** Full screen drawer
- **Navigation:** Bottom nav
- **Forms:** Labels acima dos campos

### Tablet (640px - 1024px)
- **Cards:** 2 colunas
- **Grids:** 2 colunas
- **Modals:** Centered, 80% width
- **Navigation:** Bottom nav ou sidebar
- **Forms:** Labels à esquerda

### Desktop (> 1024px)
- **Cards:** 3-4 colunas
- **Grids:** 3-4 colunas
- **Modals:** Centered, max-width
- **Navigation:** Sidebar
- **Forms:** Labels à esquerda, 2 colunas

---

## 🎯 Próximos Passos de Implementação

### Fase 1: Componentes Base
1. [ ] Criar `DatePicker` (Material Design)
2. [ ] Criar `Modal` (Material Design)
3. [ ] Criar `Drawer` (Material Design, mobile)
4. [ ] Criar `Tabs` (Material Design)
5. [ ] Melhorar `Select` (Material Design)
6. [ ] Melhorar `Progress` (Material Design)

### Fase 2: Componentes de Orçamento
1. [ ] `BudgetSummary`
2. [ ] `BudgetPieChart` (usar recharts ou similar)
3. [ ] `BudgetCategoryCard`
4. [ ] `ExpenseForm`
5. [ ] `ExpenseList`

### Fase 3: Componentes de Fornecedores
1. [ ] `VendorCard`
2. [ ] `VendorList`
3. [ ] `VendorDetail`
4. [ ] `VendorForm`
5. [ ] `ContractUpload`

### Fase 4: Componentes de Timeline
1. [ ] `TimelineView`
2. [ ] `TimelineItem`
3. [ ] `TimelineMilestone`
4. [ ] `TimelineControls`

---

## 📚 Bibliotecas Recomendadas

### Charts
- **recharts** - Gráficos React (pie, bar)
- **victory** - Alternativa
- **chart.js** - Se preferir vanilla

### Date Picker
- **react-datepicker** - Popular e customizável
- **@mui/x-date-pickers** - Material Design

### File Upload
- **react-dropzone** - Drag & drop
- **next-upload** - Integração Next.js

### Timeline
- **react-timeline** - Componente pronto
- **vis-timeline** - Mais completo
- **Custom** - Criar do zero (mais controle)

---

## ✅ Checklist de Validação

Antes de implementar cada componente:

- [ ] Verificar referência no Material Design
- [ ] Validar responsividade (mobile/tablet/desktop)
- [ ] Testar acessibilidade (keyboard, screen reader)
- [ ] Verificar estados (loading, error, empty)
- [ ] Testar interações (hover, active, focus)
- [ ] Validar integração com outros componentes

---

*Documento criado em: 2026-01-03*
*Baseado em: Material Design Guidelines + Pesquisas realizadas*

