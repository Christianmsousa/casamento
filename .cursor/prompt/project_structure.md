# Estrutura do Projeto - Casamento

## Opção 1 Melhorada: Estrutura Next.js App Router

```
casamento/
├── .next/                    # Build do Next.js (gerado automaticamente)
├── public/                   # Arquivos estáticos
│   ├── images/              # Imagens do casamento
│   │   ├── casamento/       # Fotos do casamento
│   │   └── assets/          # Assets gerais
│   ├── icons/               # Ícones SVG
│   └── favicon.ico
│
├── src/
│   ├── app/                 # App Router do Next.js
│   │   ├── (markdown)/      # Grupo de rotas para markdown
│   │   │   ├── checklist/   # Página de checklist
│   │   │   │   └── page.tsx
│   │   │   ├── lista/       # Página de lista de tarefas
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx   # Layout específico para markdown
│   │   │
│   │   ├── (landing)/       # Grupo de rotas para landing
│   │   │   ├── page.tsx     # Landing page principal
│   │   │   └── layout.tsx   # Layout específico para landing
│   │   │
│   │   ├── layout.tsx       # Layout raiz da aplicação
│   │   └── globals.css      # Estilos globais
│   │
│   ├── components/          # Componentes React
│   │   ├── ui/              # Componentes UI reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Checkbox.tsx
│   │   │
│   │   ├── markdown/        # Componentes para renderizar markdown
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   ├── Checklist.tsx
│   │   │   └── MarkdownContent.tsx
│   │   │
│   │   └── layout/          # Componentes de layout
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Navigation.tsx
│   │
│   ├── content/             # Arquivos markdown
│   │   ├── checklist.md
│   │   ├── lista-tarefas.md
│   │   ├── convidados.md
│   │   └── orcamento.md
│   │
│   ├── lib/                 # Biblioteca de utilitários e helpers
│   │   ├── components/      # Componentes utilitários/compartilhados
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── SEO.tsx
│   │   │
│   │   ├── markdown/        # Utilitários específicos de markdown
│   │   │   ├── parser.ts    # Parser de markdown
│   │   │   ├── processor.ts # Processador de markdown
│   │   │   └── types.ts     # Types relacionados a markdown
│   │   │
│   │   ├── utils/           # Funções utilitárias gerais
│   │   │   ├── format.ts    # Formatação de dados
│   │   │   ├── validation.ts # Validações
│   │   │   └── constants.ts  # Constantes
│   │   │
│   │   ├── hooks/           # Custom hooks
│   │   │   ├── useMarkdown.ts
│   │   │   └── useLocalStorage.ts
│   │   │
│   │   └── types/           # TypeScript types compartilhados
│   │       ├── markdown.ts
│   │       ├── checklist.ts
│   │       └── index.ts
│   │
│   └── styles/              # Estilos adicionais (se necessário)
│       └── components.css
│
├── .env.local               # Variáveis de ambiente
├── .env.example             # Exemplo de variáveis
├── .gitignore
├── next.config.js           # Configuração do Next.js
├── package.json
├── tailwind.config.ts       # Configuração do Tailwind
├── tsconfig.json            # Configuração do TypeScript
├── postcss.config.js        # Configuração do PostCSS
└── README.md
```

## Detalhamento da pasta `lib/`

### `lib/components/`
Componentes utilitários que podem ser usados em qualquer lugar:
- **Loading.tsx**: Componente de loading
- **ErrorBoundary.tsx**: Tratamento de erros
- **SEO.tsx**: Componente para meta tags SEO

### `lib/markdown/`
Toda lógica relacionada ao processamento de markdown:
- **parser.ts**: Funções para parsear markdown
- **processor.ts**: Processamento e transformação de markdown
- **types.ts**: Types específicos de markdown

### `lib/utils/`
Funções utilitárias gerais:
- **format.ts**: Formatação de datas, números, etc.
- **validation.ts**: Validações de formulários/dados
- **constants.ts**: Constantes da aplicação

### `lib/hooks/`
Custom React hooks:
- **useMarkdown.ts**: Hook para carregar/processar markdown
- **useLocalStorage.ts**: Hook para persistência local

### `lib/types/`
TypeScript types compartilhados:
- **markdown.ts**: Types relacionados a markdown
- **checklist.ts**: Types relacionados a checklist
- **index.ts**: Exportações centralizadas

## Vantagens desta estrutura:

✅ **Organização clara**: Cada tipo de código tem seu lugar
✅ **Escalável**: Fácil adicionar novas features
✅ **Manutenível**: Fácil encontrar e modificar código
✅ **Reutilizável**: Componentes e utilitários bem organizados
✅ **Type-safe**: Types bem estruturados

## Regras de organização:

- Sempre seguir esta estrutura ao criar novos arquivos
- Componentes reutilizáveis vão em `components/ui/`
- Componentes específicos de feature vão em `components/{feature}/`
- Utilitários gerais em `lib/utils/`
- Utilitários específicos em `lib/{feature}/`
- Custom hooks sempre em `lib/hooks/`
- Types compartilhados em `lib/types/`



