# Análise: Tarefas vs Checklists

## 📋 Situação Atual

### Tarefas (Planning Items) ✅
- **Status:** Implementado e funcional
- **Características:**
  - CRUD completo
  - Categoria, prioridade, data, custo, fornecedor
  - Integração com orçamento e fornecedores
  - Flexível e personalizável
  - Cada tarefa é independente

### Checklists ⚠️
- **Status:** Parcial (markdown estático)
- **Características:**
  - Arquivos markdown em `content/checklist/`
  - Templates pré-definidos (6 meses, 3 meses, 1 mês, dia)
  - Checkboxes não funcionais
  - Apenas visualização
  - Sem persistência

---

## 🤔 Análise: Precisamos das Duas?

### Argumentos para MANTER ambas:

1. **Checklists = Templates/Guia**
   - Templates pré-definidos por fase do planejamento
   - Guia passo a passo para noivos
   - Organização por fases (6 meses, 3 meses, etc.)

2. **Tarefas = Personalização**
   - Tarefas específicas do casal
   - Integração com outras funcionalidades
   - Mais detalhadas (custo, fornecedor, etc.)

### Argumentos para UNIFICAR:

1. **Redundância**
   - Ambos são listas de tarefas
   - Checklists poderiam ser templates que geram Tarefas
   - Evita confusão do usuário

2. **Manutenção**
   - Menos código para manter
   - Uma única fonte de verdade
   - Mais simples de entender

3. **Funcionalidade**
   - Checklists estáticos não são úteis
   - Tarefas já fazem tudo que Checklists deveriam fazer

---

## 💡 Proposta: Unificar em Tarefas com Templates

### Solução Recomendada:

**Manter apenas Tarefas, mas adicionar:**
1. **Templates de Tarefas**
   - Templates pré-definidos (6 meses, 3 meses, 1 mês, dia)
   - Ao selecionar template, cria múltiplas tarefas automaticamente
   - Usuário pode personalizar depois

2. **Agrupamento por Fase**
   - Filtrar tarefas por fase (6 meses antes, 3 meses, etc.)
   - Visualização agrupada
   - Progresso por fase

### Benefícios:
- ✅ Uma única funcionalidade
- ✅ Checklists viram templates que geram tarefas
- ✅ Tarefas mantêm toda funcionalidade (custo, fornecedor, etc.)
- ✅ Menos confusão para o usuário
- ✅ Mais fácil de manter

---

## 🎯 Implementação Sugerida

### Opção 1: Remover Checklists, Adicionar Templates em Tarefas
- Remover página de Checklists
- Adicionar seção "Templates" na página de Tarefas
- Templates criam tarefas automaticamente
- Usuário pode editar/personalizar depois

### Opção 2: Checklists viram "Templates de Tarefas"
- Manter estrutura de Checklists
- Ao abrir checklist, opção "Aplicar como Tarefas"
- Cria todas as tarefas do checklist
- Remove necessidade de manter markdown

### Opção 3: Manter Checklists como Guia (Read-only)
- Checklists viram apenas referência/guia
- Não interativo, apenas visualização
- Link para "Criar tarefas a partir deste checklist"
- Tarefas continuam sendo a funcionalidade principal

---

## ✅ Recomendação Final

**Opção 1: Remover Checklists, Adicionar Templates em Tarefas**

**Motivos:**
1. Simplifica a interface
2. Uma única funcionalidade para manter
3. Templates podem ser mais ricos (com categorias, prioridades, etc.)
4. Melhor experiência do usuário

**Implementação:**
- Remover `/planning/checklist`
- Adicionar botão "Usar Template" na página de Tarefas
- Templates criam tarefas com dados pré-preenchidos
- Usuário pode editar depois

---

## 📊 Comparação

| Aspecto | Tarefas | Checklists | Unificado (Tarefas + Templates) |
|---------|---------|------------|--------------------------------|
| Funcionalidade | ✅ Completa | ⚠️ Estática | ✅ Completa + Templates |
| Persistência | ✅ Sim | ❌ Não | ✅ Sim |
| Integração | ✅ Sim | ❌ Não | ✅ Sim |
| Templates | ❌ Não | ✅ Sim | ✅ Sim |
| Complexidade | Média | Baixa | Média |
| Manutenção | Média | Baixa | Baixa |

---

## 🎯 Decisão

**Recomendação:** Unificar em Tarefas com Templates

**Ações:**
1. Remover página de Checklists
2. Adicionar seção de Templates na página de Tarefas
3. Templates criam tarefas automaticamente
4. Manter arquivos markdown como fonte dos templates (opcional)

---

*Documento criado em: 2026-01-03*
*Análise baseada em: wedding-planner-features.md*

