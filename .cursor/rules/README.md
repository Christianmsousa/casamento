# Taxonomia de Rules

Este diretório contém as regras organizadas por taxonomia para facilitar a manutenção e aplicação pelo Cursor AI.

## Estrutura Taxonômica

### 🎨 **styling/** - Estilização
- `tailwind-css.mdc` - Uso do Tailwind CSS
- `tailwind-variants.mdc` - Variantes com class-variance-authority
- `css-modules.mdc` - CSS Modules e CSS Global

### 📝 **markdown/** - Processamento de Markdown
- `react-markdown.mdc` - Renderização simples de markdown
- `mdx.mdc` - MDX para componentes React no markdown
- `plugins.mdc` - Plugins remark/rehype

### 🧩 **components/** - Componentes React
- `ui-components.mdc` - Componentes UI reutilizáveis
- `markdown-components.mdc` - Componentes específicos de markdown
- `layout-components.mdc` - Componentes de layout
- `utility-components.mdc` - Componentes utilitários

### 🪝 **hooks/** - React Hooks
- `custom-hooks.mdc` - Custom hooks em `lib/hooks/`
- `react-hooks.mdc` - Hooks nativos do React

### 📦 **state-management/** - Gerenciamento de Estado
- `useState.mdc` - Estado local simples
- `context.mdc` - Context API com useReducer
- `zustand.mdc` - Zustand para estado global

### 🗂️ **routing/** - Roteamento Next.js
- `app-router.mdc` - App Router
- `route-groups.mdc` - Route Groups
- `dynamic-routes.mdc` - Rotas dinâmicas

### 🔧 **utils/** - Funções Utilitárias
- `general-utils.mdc` - Utilitários gerais
- `markdown-utils.mdc` - Utilitários de markdown

### 📝 **typescript/** - TypeScript
- `shared-types.mdc` - Types compartilhados
- `inline-types.mdc` - Types inline

### 🖼️ **assets/** - Assets e Imagens
- `images.mdc` - next/image
- `svg.mdc` - SVG como componente

### 🎯 **seo/** - SEO
- `metadata.mdc` - Metadata API do Next.js

### 📱 **responsive/** - Responsividade
- `tailwind-breakpoints.mdc` - Breakpoints do Tailwind
- `css-media-queries.mdc` - Media Queries CSS

### 🎨 **animations/** - Animações
- `tailwind-transitions.mdc` - Transições do Tailwind

### 💾 **storage/** - Persistência de Dados
- `localStorage.mdc` - localStorage
- `cookies.mdc` - Cookies

### 🧪 **testing/** - Testes
- `jest.mdc` - Jest e React Testing Library
- `e2e.mdc` - Testes E2E (Playwright/Cypress)

### 📚 **Arquivos Gerais**
- `decision-checklist.mdc` - Checklist de decisão rápida
- `general-best-practices.mdc` - Melhores práticas gerais
- `libraries.mdc` - Bibliotecas recomendadas

## Metadados dos Arquivos

Cada arquivo `.mdc` contém metadados estruturados:

```yaml
---
description: Descrição da regra
tags: [tag1, tag2, tag3]
globs: ["**/pattern/**/*.tsx"]  # Opcional - quando aplicar
alwaysApply: true/false
---
```

## Como Usar

O Cursor AI automaticamente lê e aplica essas regras baseado em:
- **tags**: Categorização para busca
- **globs**: Padrões de arquivos onde aplicar
- **alwaysApply**: Se deve aplicar sempre ou apenas quando relevante

## Adicionando Novas Rules

1. Escolha a categoria apropriada (ou crie uma nova)
2. Crie o arquivo `.mdc` com metadados estruturados
3. Adicione tags relevantes
4. Defina globs se a regra for específica de certos arquivos
5. Documente a regra de forma clara e concisa

