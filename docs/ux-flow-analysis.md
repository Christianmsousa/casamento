# Análise de UX e Fluxo - Wedding Planner

## 📋 Análise das Funcionalidades

### Funcionalidades Implementadas ✅
1. **Gestão de Convidados** - CRUD completo
2. **Lista de Presentes** - CRUD com categorias
3. **Planejamento de Tarefas** - CRUD com prioridades
4. **Checklists** - Markdown estático (precisa interatividade)
5. **Configurações Básicas** - Data, nomes, localização

### Funcionalidades Críticas (Fase 1) 🔴
1. **Orçamento/Finanças** - Controle financeiro completo
2. **Fornecedores/Vendors** - Gestão de contratos
3. **Timeline/Cronograma** - Visualização temporal

### Funcionalidades Importantes (Fase 2) 🟡
4. **RSVP/Confirmações** - Sistema completo
5. **Checklists Interativos** - Migrar de markdown
6. **Organizador de Mesas** - Layout visual
7. **Documentos** - Upload e organização

---

## 🎯 Fluxo de Navegação Principal

### Estrutura de Navegação Mobile-First

```
┌─────────────────────────────────┐
│     DASHBOARD (Home)            │
│  - Visão geral                  │
│  - Estatísticas rápidas         │
│  - Próximas tarefas             │
│  - Progresso geral              │
└─────────────────────────────────┘
           │
           ├─── TAREFAS ────────────────┐
           │                             │
           ├─── CONVIDADOS ──────────────┤
           │                             │
           ├─── ORÇAMENTO ───────────────┤
           │                             │
           ├─── FORNECEDORES ────────────┤
           │                             │
           ├─── TIMELINE ────────────────┤
           │                             │
           ├─── CHECKLISTS ──────────────┤
           │                             │
           ├─── PRESENTES ──────────────┤
           │                             │
           └─── CONFIGURAÇÕES ──────────┘
```

---

## 📱 Fluxos Detalhados por Funcionalidade

### 1. DASHBOARD (Home)

**Objetivo:** Visão geral do planejamento

**Componentes:**
- Header com contador de dias
- Cards de estatísticas (4 principais)
- Widget de progresso (tarefas, convidados)
- Lista de próximas tarefas (5 itens)
- Quick actions (Nova Tarefa, Adicionar Convidado)
- Cards de acesso rápido às seções

**Fluxo:**
```
Dashboard
  ├─ Ver estatísticas
  ├─ Ver progresso
  ├─ Ver próximas tarefas → [Tarefas]
  ├─ Nova tarefa → [Formulário Tarefa]
  ├─ Adicionar convidado → [Formulário Convidado]
  └─ Acessar seção → [Seção específica]
```

**Estados:**
- Loading: Skeleton cards
- Vazio: Mensagem + CTA
- Com dados: Cards preenchidos

---

### 2. TAREFAS (Planning Items)

**Objetivo:** Gerenciar todas as tarefas do casamento

**Componentes:**
- Filtros (Categoria, Prioridade, Status)
- Lista/Grid de tarefas
- Formulário de criação/edição
- Detalhes da tarefa (modal ou página)

**Fluxo:**
```
Tarefas
  ├─ Listar tarefas
  │   ├─ Filtrar por categoria
  │   ├─ Filtrar por prioridade
  │   ├─ Filtrar por status
  │   └─ Buscar
  │
  ├─ Criar tarefa
  │   └─ Formulário → Salvar → [Lista atualizada]
  │
  ├─ Editar tarefa
  │   └─ Abrir detalhes → Editar → Salvar
  │
  ├─ Marcar como concluída
  │   └─ Toggle → Atualizar status
  │
  └─ Excluir tarefa
      └─ Confirmar → Remover
```

**Campos do Formulário:**
- Título (obrigatório)
- Descrição
- Categoria (dropdown)
- Prioridade (low/medium/high)
- Data de vencimento
- Fornecedor (link para fornecedores)
- Custo (link para orçamento)
- Notas

**Visualizações:**
- Lista (mobile)
- Grid (tablet/desktop)
- Por categoria (agrupado)
- Por prioridade (agrupado)

---

### 3. CONVIDADOS (Guests)

**Objetivo:** Gerenciar lista de convidados

**Componentes:**
- Lista de convidados
- Filtros (Grupo, Status RSVP)
- Formulário de criação/edição
- Detalhes do convidado

**Fluxo:**
```
Convidados
  ├─ Listar convidados
  │   ├─ Filtrar por grupo
  │   ├─ Filtrar por RSVP
  │   └─ Buscar
  │
  ├─ Adicionar convidado
  │   └─ Formulário → Salvar
  │
  ├─ Editar convidado
  │   └─ Abrir detalhes → Editar
  │
  ├─ Ver RSVP
  │   └─ Status: Pendente/Confirmado/Negado
  │
  └─ Excluir convidado
      └─ Confirmar → Remover
```

**Campos do Formulário:**
- Nome (obrigatório)
- Grupo (Família/Amigos/Trabalho/Outros)
- Email
- Telefone
- Código de convite (gerado automaticamente)
- Notas

**Estatísticas:**
- Total por grupo
- Total confirmados
- Total pendentes

---

### 4. ORÇAMENTO (Budget) 🔴 NOVO

**Objetivo:** Controlar gastos do casamento

**Componentes:**
- Resumo do orçamento (total, gasto, restante)
- Gráfico de pizza (por categoria)
- Gráfico de barras (orçado vs. gasto)
- Lista de categorias com progresso
- Formulário de despesa

**Fluxo:**
```
Orçamento
  ├─ Ver resumo geral
  │   ├─ Total orçado
  │   ├─ Total gasto
  │   ├─ Saldo restante
  │   └─ % utilizado
  │
  ├─ Ver por categoria
  │   ├─ Lista de categorias
  │   ├─ Progresso por categoria
  │   └─ Detalhes da categoria
  │
  ├─ Adicionar despesa
  │   └─ Formulário → Vincular categoria → Salvar
  │
  ├─ Editar orçamento
  │   └─ Ajustar valores por categoria
  │
  └─ Ver pagamentos
      ├─ Lista de pagamentos
      ├─ Status (pago/pendente/atrasado)
      └─ Vencimentos próximos
```

**Categorias:**
- Local/Cerimônia
- Buffet/Alimentação
- Decoração
- Fotografia/Vídeo
- Música/DJ
- Vestimenta
- Flores
- Transporte
- Convites
- Lua de Mel
- Outros

**Integração:**
- Vincular com Planning Items (tarefas com custo)
- Vincular com Fornecedores (contratos)

---

### 5. FORNECEDORES (Vendors) 🔴 NOVO

**Objetivo:** Gerenciar fornecedores e contratos

**Componentes:**
- Lista de fornecedores
- Filtros (Categoria, Status)
- Formulário de cadastro
- Detalhes do fornecedor
- Upload de contratos

**Fluxo:**
```
Fornecedores
  ├─ Listar fornecedores
  │   ├─ Filtrar por categoria
  │   ├─ Filtrar por status
  │   └─ Buscar
  │
  ├─ Adicionar fornecedor
  │   └─ Formulário → Salvar
  │
  ├─ Ver detalhes
  │   ├─ Informações de contato
  │   ├─ Contratos
  │   ├─ Avaliações
  │   └─ Notas
  │
  ├─ Gerenciar contrato
  │   ├─ Upload PDF
  │   ├─ Valor
  │   ├─ Datas (assinatura/vencimento)
  │   └─ Condições de pagamento
  │
  └─ Comparar fornecedores
      └─ Selecionar 2+ → Ver comparação
```

**Status:**
- Favorito (em consideração)
- Contratado
- Contratado e pago
- Descartado

**Campos:**
- Nome/empresa
- Categoria
- Contatos (telefone, email, WhatsApp)
- Endereço
- Site/Redes sociais
- Avaliação (1-5 estrelas)
- Notas

**Integração:**
- Vincular com Planning Items
- Vincular com Orçamento

---

### 6. TIMELINE (Cronograma) 🔴 NOVO

**Objetivo:** Visualizar cronograma do casamento

**Componentes:**
- Timeline visual (horizontal/vertical)
- Marcos importantes
- Tarefas posicionadas por data
- Filtros (Mensal/Semanal)

**Fluxo:**
```
Timeline
  ├─ Ver timeline geral
  │   ├─ Marcos importantes
  │   ├─ Tarefas por data
  │   └─ Vencimentos
  │
  ├─ Adicionar marco
  │   └─ Formulário → Data + Descrição → Salvar
  │
  ├─ Ver detalhes
  │   └─ Clicar em item → Ver detalhes
  │
  └─ Filtrar visualização
      ├─ Mensal
      ├─ Semanal
      └─ Por categoria
```

**Marcos Padrão:**
- Data do casamento
- Ensaio fotográfico
- Degustação do buffet
- Prova do vestido
- Envio de convites
- Confirmação de fornecedores

**Integração:**
- Sincronizar com Planning Items
- Sincronizar com Orçamento (vencimentos)
- Sincronizar com Fornecedores (contratos)

---

### 7. CHECKLISTS

**Objetivo:** Checklists interativos de planejamento

**Componentes:**
- Lista de checklists
- Checklist individual (com seções)
- Checkboxes interativos
- Barra de progresso

**Fluxo:**
```
Checklists
  ├─ Listar checklists
  │   ├─ Templates (6 meses, 3 meses, 1 mês, dia)
  │   └─ Customizados
  │
  ├─ Abrir checklist
  │   ├─ Ver seções
  │   ├─ Marcar/desmarcar itens
  │   └─ Ver progresso
  │
  ├─ Criar checklist customizado
  │   └─ Formulário → Adicionar seções → Salvar
  │
  └─ Duplicar checklist
      └─ Copiar → Editar → Salvar
```

**Templates:**
- 6 meses antes
- 3 meses antes
- 1 mês antes
- Dia do casamento

**Persistência:**
- Salvar estado no localStorage
- Sincronizar com backend

---

### 8. PRESENTES (Gifts)

**Objetivo:** Gerenciar lista de presentes

**Componentes:**
- Grid de presentes
- Filtros (Categoria, Faixa de preço)
- Formulário de criação
- Detalhes do presente

**Fluxo:**
```
Presentes
  ├─ Listar presentes
  │   ├─ Filtrar por categoria
  │   ├─ Filtrar por preço
  │   └─ Buscar
  │
  ├─ Adicionar presente
  │   └─ Formulário → Salvar
  │
  └─ Ver reservas
      └─ Lista de reservados
```

---

### 9. RSVP (Confirmações) 🟡 MELHORAR

**Objetivo:** Gerenciar confirmações de presença

**Componentes:**
- Lista de convidados com status RSVP
- Filtros (Confirmado/Pendente/Negado)
- Formulário de confirmação (público)
- Estatísticas de confirmação

**Fluxo:**
```
RSVP (Admin)
  ├─ Ver lista de convidados
  │   ├─ Status: Confirmado/Pendente/Negado
  │   └─ Estatísticas (% confirmado)
  │
  ├─ Enviar lembrete
  │   └─ Selecionar convidados → Enviar
  │
  └─ Ver detalhes
      └─ Informações adicionais (acompanhantes, restrições)

RSVP (Público - Link)
  ├─ Acessar link único
  │   └─ Formulário de confirmação
  │
  └─ Confirmar presença
      ├─ Nome
      ├─ Acompanhantes
      ├─ Restrições alimentares
      └─ Mensagem
```

---

### 10. MESAS (Tables) 🟡 NOVO

**Objetivo:** Organizar layout de mesas

**Componentes:**
- Mapa visual de mesas
- Drag and drop de convidados
- Formulário de mesa

**Fluxo:**
```
Mesas
  ├─ Criar layout
  │   ├─ Definir número de mesas
  │   ├─ Capacidade por mesa
  │   └─ Posicionar mesas
  │
  ├─ Organizar convidados
  │   ├─ Arrastar e soltar
  │   ├─ Agrupar por família
  │   └─ Balancear mesas
  │
  └─ Exportar
      ├─ Imprimir
      ├─ PDF
      └─ Compartilhar
```

---

## 🎨 Padrões de Design Mobile-First

### Navegação
- **Mobile:** Bottom navigation (5 itens principais)
- **Desktop:** Sidebar lateral
- **Ambos:** Breadcrumbs em páginas profundas

### Cards
- **Mobile:** Full width, stack vertical
- **Tablet:** 2 colunas
- **Desktop:** 3-4 colunas

### Formulários
- **Mobile:** Full width, labels acima
- **Desktop:** Labels à esquerda, campos à direita

### Modais
- **Mobile:** Full screen
- **Desktop:** Centered modal

### Filtros
- **Mobile:** Drawer lateral
- **Desktop:** Sidebar ou top bar

---

## 🔄 Integrações entre Funcionalidades

### Orçamento ↔ Tarefas
- Tarefas com custo aparecem no orçamento
- Criar despesa a partir de tarefa

### Fornecedores ↔ Tarefas
- Vincular fornecedor a tarefa
- Ver tarefas do fornecedor

### Timeline ↔ Tarefas
- Tarefas com data aparecem na timeline
- Criar tarefa a partir de marco

### RSVP ↔ Convidados
- Status RSVP sincronizado
- Estatísticas atualizadas

---

## 📊 Priorização de Implementação

### Fase 1 - Essencial (Agora)
1. ✅ Dashboard melhorado
2. 🔴 Orçamento (básico)
3. 🔴 Fornecedores (básico)
4. 🔴 Timeline (básico)

### Fase 2 - Importante (Próximo)
5. 🟡 RSVP completo
6. 🟡 Checklists interativos
7. 🟡 Mesas
8. 🟡 Documentos

### Fase 3 - Complementar (Futuro)
9. 🟢 Inspirações
10. 🟢 Contatos de emergência
11. 🟢 Notas gerais

---

## 🎯 Próximos Passos

1. **Criar wireframes** para cada fluxo
2. **Definir componentes** reutilizáveis
3. **Implementar Fase 1** (Orçamento, Fornecedores, Timeline)
4. **Testar fluxos** com usuários
5. **Iterar** baseado em feedback

---

*Documento criado em: 2026-01-03*
*Baseado em: wedding-planner-features.md*

