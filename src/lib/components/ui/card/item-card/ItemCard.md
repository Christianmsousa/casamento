# ItemCard

Componente reutilizável para exibir itens com ações personalizáveis.

## Uso Básico

```tsx
import { ItemCard } from '@/lib/components/card'

function MyComponent() {
  return (
    <ItemCard
      title="Nome do Item"
      description="Descrição opcional do item"
      actions={[
        {
          icon: 'Edit',
          tooltip: 'Editar item',
          onClick: () => console.log('Editar'),
        },
        {
          icon: 'Trash',
          tooltip: 'Excluir item',
          onClick: () => console.log('Excluir'),
        },
      ]}
    />
  )
}
```

## Props

### ItemCardProps

| Prop          | Tipo                     | Padrão      | Descrição                    |
| ------------- | ------------------------ | ----------- | ---------------------------- |
| `title`       | `string`                 | -           | Título do item (obrigatório) |
| `description` | `string`                 | -           | Descrição opcional do item   |
| `actions`     | `ItemAction[]`           | `[]`        | Array de ações disponíveis   |
| `variant`     | `'default' \| 'primary'` | `'primary'` | Variante visual do card      |
| `className`   | `string`                 | `''`        | Classes CSS adicionais       |
| `avatarUrl`   | `string`                 | -           | URL do avatar (exibe iniciais se não fornecido) |
| `icon`        | `React.ReactNode`         | -           | Ícone customizado à esquerda (prioridade sobre avatar) |
| `size`        | `'sm' \| 'md' \| 'lg'`   | `'sm'`      | Tamanho do avatar/ícone      |

### ItemAction

| Prop              | Tipo                | Descrição                                   |
| ----------------- | ------------------- | ------------------------------------------- |
| `icon`            | `keyof typeof Icon` | Nome do ícone (ex: 'Edit', 'Trash', 'Info') |
| `tooltip`         | `string`            | Texto do tooltip                            |
| `onClick`         | `() => void`        | Função executada ao clicar                  |
| `className`       | `string`            | Classes CSS adicionais para o botão         |
| `disabled`        | `boolean`           | Se a ação está desabilitada                 |
| `disabledTooltip` | `string`            | Tooltip específico quando desabilitado      |

## Exemplos

### Categoria com ações desabilitadas

```tsx
<ItemCard
  title="Categoria 1"
  description="Descrição da categoria 1"
  actions={[
    {
      icon: 'Trash',
      tooltip: 'Excluir categoria',
      disabledTooltip: 'Não é possível excluir esta categoria',
      onClick: handleDelete,
      disabled: true, // Ação desabilitada
    },
    {
      icon: 'ChevronRight',
      tooltip: 'Ver detalhes',
      onClick: handleView,
    },
  ]}
/>
```

### Categoria

```tsx
<ItemCard
  title="Categoria 1"
  description="Descrição da categoria 1"
  actions={[
    {
      icon: 'Trash',
      tooltip: 'Excluir categoria',
      onClick: handleDelete,
    },
    {
      icon: 'ChevronRight',
      tooltip: 'Ver detalhes',
      onClick: handleView,
    },
  ]}
/>
```

### Produto

```tsx
<ItemCard
  title="Produto A"
  description="Descrição do produto A - R$ 29,90"
  actions={[
    {
      icon: 'Edit',
      tooltip: 'Editar produto',
      onClick: handleEdit,
    },
    {
      icon: 'Trash',
      tooltip: 'Excluir produto',
      onClick: handleDelete,
    },
    {
      icon: 'Info',
      tooltip: 'Ver detalhes',
      onClick: handleView,
    },
  ]}
/>
```

### Marca

```tsx
<ItemCard
  title="Marca X"
  description="Fabricante de produtos eletrônicos"
  variant="default"
  actions={[
    {
      icon: 'Edit',
      tooltip: 'Editar marca',
      onClick: handleEdit,
    },
    {
      icon: 'Trash',
      tooltip: 'Excluir marca',
      onClick: handleDelete,
    },
  ]}
/>
```

### Produto com múltiplas ações desabilitadas

```tsx
<ItemCard
  title="Produto Premium"
  description="Produto com restrições especiais"
  actions={[
    {
      icon: 'Edit',
      tooltip: 'Editar produto',
      disabledTooltip: 'Produto bloqueado para edição',
      onClick: handleEdit,
      disabled: true,
    },
    {
      icon: 'Trash',
      tooltip: 'Excluir produto',
      disabledTooltip: 'Produto não pode ser excluído',
      onClick: handleDelete,
      disabled: true,
    },
    {
      icon: 'Info',
      tooltip: 'Ver detalhes',
      onClick: handleView,
    },
  ]}
/>
```

### Item com avatar

```tsx
<ItemCard
  title="João Silva"
  description="joao@example.com"
  avatarUrl="https://example.com/avatar.jpg"
  actions={[
    {
      icon: 'ChevronRight',
      tooltip: 'Ver detalhes',
      onClick: handleView,
    },
  ]}
/>
```

### Item com ícone customizado

```tsx
<ItemCard
  title="Fornecedor ABC"
  description="Fornecedor de materiais"
  icon={<Icon.Market width="1.5rem" height="1.5rem" />}
  actions={[
    {
      icon: 'Edit',
      tooltip: 'Editar fornecedor',
      onClick: handleEdit,
    },
  ]}
/>
```

## Ícones Disponíveis

O componente aceita qualquer ícone da biblioteca de ícones do projeto. Alguns exemplos:

- `Edit` - Editar
- `Trash` - Excluir
- `Info` - Informações
- `ChevronRight` - Ver mais
- `Settings` - Configurações
- `Copy` - Copiar
- `Upload` - Upload
- `Download` - Download

Consulte `src/lib/components/icons/index.tsx` para ver todos os ícones disponíveis.
