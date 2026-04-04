# Tooltip Component

Um componente de tooltip acessível e customizável para exibir informações adicionais.

## Features

- Múltiplas posições (top, right, bottom, left)
- Delay configurável para exibição/ocultação
- Suporte a conteúdo rico (não apenas texto)
- Posicionamento automático
- Acessível via teclado e leitores de tela
- Animações suaves
- Estilização consistente com o design system

## Uso

```tsx
import { Tooltip } from '@/lib/components/tooltip'

function MyComponent() {
  return (
    <Tooltip content="Informação adicional">
      <button>Hover me</button>
    </Tooltip>
  )
}
```

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| content | `ReactNode` | Conteúdo do tooltip |
| children | `ReactNode` | Elemento que ativa o tooltip |
| position | `'top' \| 'right' \| 'bottom' \| 'left'` | Posição do tooltip |
| delay | `number` | Delay em ms para exibir/ocultar |
| className | `string` | Classes CSS adicionais |
| disabled | `boolean` | Desabilita o tooltip |

## Posições

- `top` (padrão): Acima do elemento
- `right`: À direita do elemento
- `bottom`: Abaixo do elemento
- `left`: À esquerda do elemento

## Exemplos

### Tooltip Básico
```tsx
<Tooltip content="Dica útil">
  <button>Hover me</button>
</Tooltip>
```

### Tooltip com Posição Customizada
```tsx
<Tooltip
  content="Aparece à direita"
  position="right"
>
  <button>Hover me</button>
</Tooltip>
```

### Tooltip com Delay
```tsx
<Tooltip
  content="Aparece após 500ms"
  delay={500}
>
  <button>Hover me</button>
</Tooltip>
```

### Tooltip com Conteúdo Rico
```tsx
<Tooltip
  content={
    <div>
      <h3 className="font-bold">Título</h3>
      <p>Descrição detalhada</p>
    </div>
  }
>
  <button>Hover me</button>
</Tooltip>
```

## Acessibilidade

O componente segue as melhores práticas de acessibilidade:

- Usa `role="tooltip"`
- Suporte a navegação por teclado
- Atributos ARIA apropriados
- Contraste adequado
- Tempo suficiente para leitura 