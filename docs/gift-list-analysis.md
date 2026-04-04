# Análise: Estrutura para Lista de Presentes

## 📊 Análise da Situação Atual

### Estrutura Existente:
- ✅ Sistema de convidados (`Guest`) com API funcional
- ✅ Landing page com seção "Presentes" (placeholder)
- ✅ Navbar com link para `#presentes`
- ✅ Estrutura de dados em JSON (`data/guests.json`)

### Estado Atual da Seção:
- Apenas mensagem: "Em breve disponibilizaremos nossa lista de presentes"
- Não há funcionalidade implementada
- Link na navbar aponta para âncora na mesma página

---

## 🎯 Recomendação: **PÁGINA SEPARADA**

### ✅ Vantagens de Página Separada:

1. **Escalabilidade**
   - Lista pode ter dezenas/centenas de itens
   - Não sobrecarrega a landing page
   - Melhor performance (lazy loading, paginação)

2. **UX Superior**
   - Espaço dedicado para navegação
   - Filtros por categoria (Casa, Cozinha, Decoração, etc.)
   - Busca de itens
   - Visualização em grid/lista
   - Detalhes de cada presente

3. **Funcionalidades Avançadas**
   - Rastreamento: quem escolheu qual presente
   - Status: disponível, reservado, comprado
   - Links externos (Amazon, Magazine Luiza, etc.)
   - Fotos dos itens
   - Valores/faixas de preço

4. **Organização**
   - Categorias bem definidas
   - Ordenação (preço, popularidade, categoria)
   - Favoritos

5. **Manutenção**
   - Código separado e organizado
   - Fácil adicionar/remover itens
   - Admin pode gerenciar via `/planning/gifts`

### ⚠️ Desvantagens:
- Requer navegação adicional (mas navbar já resolve)
- Mais uma página para manter

---

## 🏗️ Estrutura Proposta

### Opção 1: Página Separada (RECOMENDADA) ⭐

```
src/app/(public)/
  ├── invite/
  │   └── page.tsx          # Landing page (mantém card simples)
  └── gifts/
      └── page.tsx          # Página completa da lista

src/lib/
  ├── types/
  │   └── gift.ts           # Interface Gift
  ├── data/
  │   └── gifts.ts           # getGifts(), saveGifts()
  └── components/
      └── gifts/
          ├── GiftCard.tsx
          ├── GiftGrid.tsx
          ├── GiftFilters.tsx
          └── GiftReservation.tsx

src/app/api/
  └── gifts/
      ├── route.ts          # GET, POST
      └── [id]/
          └── route.ts      # GET, PUT, DELETE

data/
  └── gifts.json            # Lista de presentes

src/app/(admin)/planning/
  └── gifts/
      └── page.tsx          # Admin: gerenciar presentes
```

**Na Landing Page:**
- Card simples com botão "Ver Lista de Presentes" → `/gifts`
- Mantém mensagem elegante atual

**Na Página `/gifts`:**
- Grid de presentes
- Filtros por categoria
- Busca
- Detalhes e reserva

---

### Opção 2: Seção Expandida na Landing (Alternativa)

```
src/app/(public)/invite/page.tsx
  └── Seção "Presentes" expandida com:
      - Grid de presentes
      - Filtros inline
      - Modal para detalhes
```

**Vantagens:**
- Tudo em um lugar
- Menos navegação

**Desvantagens:**
- Landing page fica muito longa
- Performance pior (carrega tudo)
- Difícil organizar muitos itens
- UX confusa com muitos elementos

---

## 📋 Estrutura de Dados Proposta

```typescript
// src/lib/types/gift.ts
export interface Gift {
  id: string
  name: string
  description?: string
  category: 'casa' | 'cozinha' | 'decoracao' | 'eletrodomesticos' | 'outros'
  price?: number
  priceRange?: 'baixo' | 'medio' | 'alto'
  imageUrl?: string
  storeUrl?: string
  storeName?: string
  status: 'available' | 'reserved' | 'purchased'
  reservedBy?: {
    guestId: string
    guestName: string
    reservedAt: string
  }
  priority?: number // Para ordenação
  createdAt: string
  updatedAt: string
}
```

---

## 🎨 Componentes Necessários

### 1. **GiftCard** - Card individual do presente
- Imagem
- Nome
- Categoria
- Preço/faixa
- Status (disponível/reservado)
- Botão "Reservar" ou "Ver Detalhes"

### 2. **GiftGrid** - Grid responsivo
- Layout: 1 col (mobile) → 2 col (tablet) → 3-4 col (desktop)
- Lazy loading
- Skeleton loading

### 3. **GiftFilters** - Filtros e busca
- Busca por nome
- Filtro por categoria
- Filtro por faixa de preço
- Ordenação (preço, nome, popularidade)

### 4. **GiftReservation** - Modal/form de reserva
- Confirmar reserva
- Associar ao convidado (se logado)
- Ou apenas marcar como reservado

### 5. **GiftDetail** - Modal com detalhes
- Imagem grande
- Descrição completa
- Link para loja
- Botão de reserva

---

## 🚀 Implementação Sugerida

### Fase 1: Estrutura Básica
1. Criar tipos (`gift.ts`)
2. Criar data layer (`gifts.ts`)
3. Criar API routes
4. Criar página `/gifts` básica

### Fase 2: Componentes
1. `GiftCard` simples
2. `GiftGrid` básico
3. Integrar na página

### Fase 3: Funcionalidades
1. Filtros e busca
2. Reserva de presentes
3. Admin para gerenciar

### Fase 4: Melhorias
1. Fotos dos itens
2. Links para lojas
3. Notificações de reserva

---

## 💡 Recomendação Final

**PÁGINA SEPARADA (`/gifts`)** porque:
- ✅ Melhor escalabilidade
- ✅ UX superior
- ✅ Código mais organizado
- ✅ Permite funcionalidades avançadas
- ✅ Não sobrecarrega a landing page

**Na landing page:**
- Manter card elegante atual
- Adicionar botão "Ver Lista Completa" → `/gifts`
- Atualizar navbar para apontar para `/gifts` ao invés de `#presentes`

---

## 📝 Próximos Passos

1. Decidir: Página separada ou seção expandida?
2. Definir estrutura de dados final
3. Criar tipos e data layer
4. Implementar página básica
5. Adicionar componentes gradualmente

