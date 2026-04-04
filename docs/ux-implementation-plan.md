# Plano de Implementação - UX Wedding Planner

## 📋 Resumo Executivo

Este documento apresenta o plano de implementação do novo UX mobile-first para o Wedding Planner, baseado em referências de Notion, Todoist, Asana, Mint e outras ferramentas de planejamento.

---

## 🎯 Objetivos

1. **Criar fluxo intuitivo** para todas as funcionalidades
2. **Implementar mobile-first** com experiência otimizada
3. **Organizar por prioridade** (Fase 1, 2, 3)
4. **Manter consistência visual** em todos os módulos

---

## 📊 Estrutura de Navegação

### Navegação Principal
- **Mobile:** Bottom Navigation (5 itens)
  - Início (Dashboard)
  - Tarefas
  - Convidados
  - Checklists
  - Mais (Settings + outras)

- **Desktop:** Sidebar Lateral
  - Dashboard
  - Tarefas
  - Convidados
  - Orçamento
  - Fornecedores
  - Timeline
  - Checklists
  - Presentes
  - Configurações

---

## 🔴 FASE 1 - Essencial (Implementar Primeiro)

### 1. Dashboard Melhorado ✅ (Já iniciado)
- [x] Header com contador de dias
- [x] Cards de estatísticas
- [x] Widgets de progresso
- [x] Próximas tarefas
- [ ] Quick actions melhorados
- [ ] Cards de acesso rápido organizados

### 2. Orçamento 💰 (NOVO)
**Prioridade:** CRÍTICA

**Telas:**
1. **Lista de Orçamento**
   - Resumo (Total, Gasto, Restante)
   - Gráfico de pizza (categorias)
   - Lista de categorias com progresso

2. **Detalhes da Categoria**
   - Despesas da categoria
   - Gráfico de barras (orçado vs. gasto)
   - Adicionar despesa

3. **Formulário de Despesa**
   - Valor
   - Categoria
   - Data
   - Descrição
   - Vincular tarefa (opcional)

**Componentes:**
- `BudgetSummary`
- `BudgetPieChart`
- `BudgetCategoryCard`
- `ExpenseForm`
- `ExpenseList`

**Integração:**
- Planning Items (tarefas com custo)
- Fornecedores (contratos)

---

### 3. Fornecedores 🏢 (NOVO)
**Prioridade:** CRÍTICA

**Telas:**
1. **Lista de Fornecedores**
   - Grid/Lista de cards
   - Filtros (Categoria, Status)
   - Busca

2. **Detalhes do Fornecedor**
   - Informações de contato
   - Contratos (lista)
   - Avaliações
   - Notas
   - Tarefas vinculadas

3. **Formulário de Fornecedor**
   - Dados básicos
   - Contatos
   - Categoria
   - Status

4. **Gestão de Contrato**
   - Upload PDF
   - Valor
   - Datas
   - Condições de pagamento

**Componentes:**
- `VendorCard`
- `VendorList`
- `VendorDetail`
- `VendorForm`
- `ContractUpload`
- `VendorFilters`

**Integração:**
- Planning Items
- Orçamento

---

### 4. Timeline 📅 (NOVO)
**Prioridade:** CRÍTICA

**Telas:**
1. **Timeline View**
   - Linha do tempo horizontal/vertical
   - Marcos importantes
   - Tarefas posicionadas por data
   - Filtros (Mensal/Semanal)

2. **Adicionar Marco**
   - Data
   - Descrição
   - Tipo (casamento, ensaio, etc.)

**Componentes:**
- `TimelineView`
- `TimelineItem`
- `TimelineMilestone`
- `TimelineControls`

**Integração:**
- Planning Items
- Orçamento (vencimentos)
- Fornecedores (contratos)

---

## 🟡 FASE 2 - Importante (Próximos Passos)

### 5. RSVP Completo 📝
- Formulário público de confirmação
- Estatísticas de confirmação
- Lembretes automáticos

### 6. Checklists Interativos ✅
- Migrar de markdown para sistema dinâmico
- Persistência de estado
- Progresso por checklist

### 7. Organizador de Mesas 🪑
- Mapa visual
- Drag and drop
- Exportar PDF

### 8. Documentos 📄
- Upload de arquivos
- Organização por categoria
- Busca

---

## 🎨 Padrões de Design

### Cores
- Primary: Terracota (#AE4D35)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Error: Red (#EF4444)

### Espaçamento
- Mobile: 16px base
- Desktop: 24px base

### Tipografia
- Mobile: 14px base
- Desktop: 16px base

---

## 📱 Componentes Reutilizáveis

### Já Criados ✅
- `StatCard`
- `ProgressWidget`
- `QuickAccessCard`
- `UpcomingTasks`
- `QuickActions`

### A Criar 🔴
- `BudgetSummary`
- `BudgetPieChart`
- `BudgetCategoryCard`
- `VendorCard`
- `VendorList`
- `TimelineView`
- `TimelineItem`

---

## 🔄 Integrações

### Orçamento ↔ Tarefas
- Tarefas com custo aparecem no orçamento
- Criar despesa a partir de tarefa

### Fornecedores ↔ Tarefas
- Vincular fornecedor a tarefa
- Ver tarefas do fornecedor

### Timeline ↔ Tarefas
- Tarefas com data aparecem na timeline
- Criar tarefa a partir de marco

---

## 📅 Cronograma Sugerido

### Semana 1
- [ ] Orçamento (básico)
  - Lista de categorias
  - Adicionar despesa
  - Resumo

### Semana 2
- [ ] Fornecedores (básico)
  - Lista de fornecedores
  - Cadastro
  - Detalhes

### Semana 3
- [ ] Timeline (básico)
  - Visualização
  - Adicionar marcos
  - Integração com tarefas

### Semana 4
- [ ] Melhorias e integrações
  - Conectar módulos
  - Testes
  - Ajustes

---

## ✅ Checklist de Implementação

### Orçamento
- [ ] Criar tipos (Budget, Expense, Category)
- [ ] Criar API routes
- [ ] Criar componentes
- [ ] Criar páginas
- [ ] Integrar com tarefas

### Fornecedores
- [ ] Criar tipos (Vendor, Contract)
- [ ] Criar API routes
- [ ] Criar componentes
- [ ] Criar páginas
- [ ] Upload de contratos

### Timeline
- [ ] Criar tipos (Milestone, TimelineItem)
- [ ] Criar componentes de timeline
- [ ] Criar página
- [ ] Integrar com tarefas

---

## 🎯 Próximos Passos Imediatos

1. **Revisar documentos criados**
   - `ux-flow-analysis.md`
   - `ux-components-reference.md`
   - `ux-implementation-plan.md` (este)

2. **Validar fluxos** com usuários

3. **Começar implementação** da Fase 1
   - Orçamento
   - Fornecedores
   - Timeline

4. **Testar** cada módulo antes de avançar

---

*Documento criado em: 2026-01-03*
*Status: Análise completa, pronto para implementação*

