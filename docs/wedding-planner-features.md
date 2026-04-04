# Funcionalidades de um Planner de Casamento Completo

## 📋 Análise baseada em casamentos.com.br e melhores práticas

Este documento lista todas as funcionalidades essenciais e complementares que um sistema de planejamento de casamento deve ter, baseado em referências do mercado e necessidades reais dos noivos.

---

## ✅ Funcionalidades Já Implementadas

### 1. **Gestão de Convidados** ✅
- [x] Cadastro de convidados
- [x] Grupos (Família, Amigos, Trabalho, Outros)
- [x] Informações de contato (email, telefone)
- [x] Código de convite único
- [x] Notas por convidado

### 2. **Lista de Presentes** ✅
- [x] Cadastro de presentes
- [x] Categorias
- [x] Links de referência
- [x] Imagens
- [x] Status (disponível, reservado)

### 3. **Planejamento de Tarefas** ✅
- [x] Tarefas por categoria
- [x] Prioridades
- [x] Status (concluído/pendente)
- [x] Fornecedor/contato
- [x] Custo
- [x] Observações

### 4. **Checklists** ⚠️ (Parcial)
- [x] Checklists em markdown
- [ ] Checkboxes interativos
- [ ] Persistência de estado
- [ ] Progresso por checklist

### 5. **Configurações Básicas** ✅
- [x] Data do casamento
- [x] Nomes do casal
- [x] Localização (cerimônia e recepção)

---

## 🎯 Funcionalidades Essenciais (Alta Prioridade)

### 1. **Orçamento/Finanças** 💰
**Status:** ❌ Não implementado  
**Prioridade:** 🔴 CRÍTICA

#### Funcionalidades:
- **Orçamento Total**
  - Definir orçamento geral do casamento
  - Estimativa automática por categoria (opcional)
  - Ajustes manuais por categoria

- **Controle de Gastos**
  - Registrar despesas por categoria
  - Acompanhar gasto vs. orçamento
  - Alertas quando próximo do limite
  - Histórico de pagamentos

- **Categorias de Orçamento:**
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

- **Relatórios e Gráficos:**
  - Gráfico de pizza por categoria
  - Gráfico de barras (orçado vs. gasto)
  - Percentual de orçamento utilizado
  - Saldo restante

- **Pagamentos:**
  - Registrar pagamentos
  - Parcelas e vencimentos
  - Status (pago, pendente, atrasado)
  - Lembretes de vencimento

**Integração:** Conectar com Planning Items (tarefas que têm custo)

---

### 2. **Fornecedores/Vendors** 🏢
**Status:** ❌ Não implementado  
**Prioridade:** 🔴 CRÍTICA

#### Funcionalidades:
- **Cadastro de Fornecedores**
  - Nome da empresa/profissional
  - Categoria (Fotógrafo, DJ, Buffet, etc.)
  - Contatos (telefone, email, WhatsApp)
  - Endereço
  - Site/Redes sociais
  - Avaliação/Nota (1-5 estrelas)

- **Status do Fornecedor:**
  - Favorito (em consideração)
  - Contratado
  - Contratado e pago
  - Descartado

- **Gestão de Contratos:**
  - Upload de contratos (PDF)
  - Valor do contrato
  - Data de assinatura
  - Vencimento do contrato
  - Condições de pagamento

- **Acompanhamento:**
  - Notas pessoais sobre o fornecedor
  - Histórico de contatos
  - Comparação entre fornecedores
  - Próximos passos/lembretes

- **Integração:**
  - Vincular fornecedor a tarefas do planejamento
  - Vincular fornecedor a itens do orçamento

**Referência casamentos.com.br:**
- Buscar fornecedores por categoria
- Ver fotos e portfólio
- Ler avaliações
- Salvar favoritos
- Comparar fornecedores
- Criar notas pessoais

---

### 3. **Timeline/Cronograma** 📅
**Status:** ❌ Não implementado  
**Prioridade:** 🔴 CRÍTICA

#### Funcionalidades:
- **Linha do Tempo Visual**
  - Timeline horizontal/vertical
  - Marcos importantes destacados
  - Tarefas posicionadas por data
  - Visualização mensal/semanal

- **Marcos Importantes:**
  - Data do casamento
  - Ensaio fotográfico
  - Degustação do buffet
  - Prova do vestido
  - Envio de convites
  - Confirmação de fornecedores
  - Customizáveis

- **Lembretes e Notificações:**
  - Alertas de tarefas próximas
  - Lembretes de vencimentos
  - Notificações de marcos importantes

- **Integração:**
  - Sincronizar com Planning Items
  - Sincronizar com Orçamento (vencimentos)
  - Sincronizar com Fornecedores (contratos)

---

### 4. **RSVP/Confirmações** 📝
**Status:** ⚠️ Parcial (apenas WhatsApp)  
**Prioridade:** 🟡 ALTA

#### Funcionalidades:
- **Confirmação de Presença**
  - Link de confirmação por convidado
  - Formulário online de RSVP
  - Confirmação via WhatsApp (já implementado)
  - Status: Confirmado, Não confirmado, Pendente

- **Acompanhamento:**
  - Lista de confirmados
  - Lista de não confirmados
  - Lista de pendentes
  - Estatísticas (% de confirmação)
  - Gráfico de confirmações

- **Informações Adicionais:**
  - Número de acompanhantes
  - Restrições alimentares
  - Preferências musicais
  - Mensagem do convidado

- **Lembretes:**
  - Enviar lembrete para não confirmados
  - Prazo para confirmação

**Referência casamentos.com.br:**
- Confirmação pelo site do casamento
- Sincronização automática com lista de convidados
- Estatísticas de presença

---

## 📊 Funcionalidades Importantes (Média Prioridade)

### 5. **Organizador de Mesas** 🪑
**Status:** ❌ Não implementado  
**Prioridade:** 🟡 MÉDIA

#### Funcionalidades:
- **Mapa Visual de Mesas**
  - Criar layout de mesas
  - Definir número de mesas
  - Capacidade por mesa
  - Arrastar e soltar convidados

- **Organização:**
  - Agrupar por família/amigos
  - Considerar relacionamentos
  - Balancear mesas
  - Visualização prévia

- **Exportação:**
  - Imprimir mapa de mesas
  - Exportar PDF
  - Compartilhar com fornecedores

**Referência casamentos.com.br:**
- Visualizar mapa de mesas
- Adicionar convidados à lista
- Reunir convidados onde escolher

---

### 6. **Documentos** 📄
**Status:** ❌ Não implementado  
**Prioridade:** 🟡 MÉDIA

#### Funcionalidades:
- **Upload e Organização**
  - Upload de arquivos (PDF, imagens)
  - Categorização (Contratos, Certidões, Recibos, etc.)
  - Tags personalizadas
  - Busca por nome/categoria

- **Tipos de Documentos:**
  - Contratos de fornecedores
  - Certidão de casamento
  - Recibos e comprovantes
  - Orçamentos
  - Fotos de referência
  - Outros

- **Gestão:**
  - Download rápido
  - Visualização prévia
  - Data de upload
  - Tamanho do arquivo
  - Exclusão

---

### 7. **Checklists Interativos** ✅
**Status:** ⚠️ Parcial (markdown estático)  
**Prioridade:** 🟡 MÉDIA

#### Funcionalidades:
- **Checklists Dinâmicos**
  - Checkboxes funcionais
  - Persistência de estado
  - Progresso por checklist
  - Progresso geral

- **Organização:**
  - Checklists por categoria
  - Seções dentro do checklist
  - Ordenação personalizada
  - Duplicar checklist

- **Templates:**
  - Checklist pré-casamento (6 meses, 3 meses, 1 mês)
  - Checklist do dia do casamento
  - Checklists customizados

**Referência casamentos.com.br:**
- Personalizar tarefas
- Marcar como concluídas
- Consultar progresso
- Sincronizar com orçamento e fornecedores

---

## 🎨 Funcionalidades Complementares (Baixa Prioridade)

### 8. **Inspirações/Moodboard** 🎨
**Status:** ❌ Não implementado  
**Prioridade:** 🟢 BAIXA

#### Funcionalidades:
- **Galeria de Inspirações**
  - Upload de imagens
  - Organização por categoria (Decoração, Vestido, Bolo, etc.)
  - Tags e descrições
  - Favoritos

- **Referências:**
  - Cores do casamento
  - Estilo/Tema
  - Links externos (Pinterest, Instagram)
  - Notas sobre cada inspiração

---

### 9. **Contatos de Emergência** 📞
**Status:** ❌ Não implementado  
**Prioridade:** 🟢 BAIXA

#### Funcionalidades:
- **Lista de Contatos Importantes**
  - Fornecedores principais
  - Família e padrinhos
  - Contatos de emergência
  - Acesso rápido

- **Informações:**
  - Nome e telefone
  - Função/Relacionamento
  - WhatsApp direto
  - Email

---

### 10. **Notas Gerais** 📝
**Status:** ❌ Não implementado  
**Prioridade:** 🟢 BAIXA

#### Funcionalidades:
- **Anotações Livres**
  - Editor de texto rico
  - Organização por tags
  - Busca
  - Data de criação/edição

- **Tipos:**
  - Ideias gerais
  - Lembretes
  - Notas de reuniões
  - Referências

---

## 🔗 Funcionalidades de Integração (casamentos.com.br)

### 11. **Site de Casamento** 🌐
**Status:** ⚠️ Parcial (landing page existe)  
**Prioridade:** 🟡 MÉDIA

#### Funcionalidades (já parcialmente implementadas):
- ✅ Site personalizado (landing page)
- ✅ Informações do evento
- ✅ Localização com mapa
- ✅ FAQ
- ✅ Lista de presentes
- ✅ Contagem regressiva
- ⚠️ Confirmação de presença (apenas WhatsApp)
- ❌ Galeria de fotos dos convidados
- ❌ Questionários/Enquetes
- ❌ História do casal (removida)
- ❌ URL personalizada

**Referência casamentos.com.br:**
- Criar e personalizar site
- Manter convidados atualizados
- Pedir confirmação de presença
- Criar questionários e testes
- URL personalizada

---

## 📊 Resumo de Prioridades

### 🔴 Fase 1 - Essencial (Implementar Primeiro)
1. **Orçamento/Finanças** - Controle financeiro completo
2. **Fornecedores/Vendors** - Gestão de contratos e fornecedores
3. **Timeline/Cronograma** - Visualização temporal do planejamento

### 🟡 Fase 2 - Importante (Próximos Passos)
4. **RSVP/Confirmações** - Sistema completo de confirmação
5. **Checklists Interativos** - Migrar de markdown para sistema dinâmico
6. **Organizador de Mesas** - Layout visual de mesas
7. **Documentos** - Upload e organização de arquivos

### 🟢 Fase 3 - Complementar (Opcional)
8. **Inspirações/Moodboard** - Galeria de referências
9. **Contatos de Emergência** - Lista rápida de contatos
10. **Notas Gerais** - Editor de anotações

---

## 🎯 Recomendações de Implementação

### Prioridade Máxima:
1. **Orçamento** - Fundamental para controle financeiro
2. **Fornecedores** - Essencial para organização
3. **Timeline** - Visualização clara do cronograma

### Integrações Importantes:
- Orçamento ↔ Planning Items (tarefas com custo)
- Fornecedores ↔ Planning Items (tarefas com fornecedor)
- Timeline ↔ Planning Items (tarefas com data)
- RSVP ↔ Guests (confirmação de presença)

### Melhorias no Existente:
- Migrar Checklists de markdown para sistema interativo
- Melhorar RSVP (além do WhatsApp)
- Expandir Site de Casamento com mais funcionalidades

---

## 📝 Notas Finais

**Baseado em casamentos.com.br, as funcionalidades mais valorizadas são:**
1. Agenda de Tarefas (já temos como Planning Items)
2. Orçamento (FALTANDO - crítico)
3. Fornecedores (FALTANDO - crítico)
4. Lista de Convidados (já temos)
5. Organizador de Mesas (FALTANDO)
6. Site de Casamento (já temos parcialmente)

**Sincronização entre ferramentas** é um diferencial importante - todas as ferramentas devem estar conectadas para facilitar o planejamento.

---

*Documento criado em: 2026-01-03*  
*Referência: casamentos.com.br/organizador-casamento*

