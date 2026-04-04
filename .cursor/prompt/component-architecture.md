# Arquitetura de componentes: padrões e estrutura

Este documento descreve como os componentes são organizados, estruturados e exportados no projeto, estabelecendo os padrões que garantem consistência, manutenibilidade e reutilização ao longo do código.

## Estrutura de diretórios

Os componentes são organizados em uma estrutura hierárquica dentro de `src/lib/components/`, onde cada componente ocupa seu próprio diretório. Essa organização permite que componentes complexos sejam decompostos em sub-componentes e arquivos auxiliares sem poluir o namespace global ou criar dependências circulares.

A estrutura padrão segue este formato:

```
src/lib/components/
├── [component-name]/
│   ├── index.tsx (ou index.ts) - Ponto de entrada e exportação principal
│   ├── [ComponentName].tsx - Implementação do componente principal
│   ├── types.ts - Definições de tipos TypeScript (quando necessário)
│   ├── README.md - Documentação do componente (para componentes complexos)
│   └── [sub-components].tsx - Sub-componentes relacionados
```

Essa estrutura permite que cada componente seja um módulo autocontido, facilitando a localização de código relacionado e reduzindo a complexidade cognitiva ao navegar pelo projeto. Quando um componente precisa de múltiplos arquivos, todos ficam agrupados no mesmo diretório, tornando explícita a relação entre eles.

## Padrões de exportação

O projeto adota três padrões principais de exportação, escolhidos conforme a complexidade e o uso do componente.

### Exportação simples

Para componentes únicos e autossuficientes, a exportação ocorre diretamente no arquivo `index.tsx`:

```typescript
// src/lib/components/card/index.tsx
import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const cardVariant = tv({
  variants: {
    variant: {
      default: 'rounded-lg border border-neutral-200 bg-white p-6',
      primary: 'group flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 font-medium leading-5 gap-8 p-8',
    },
  },
})

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'primary'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  return <div className={cardVariant({ variant, className })}>{children}</div>
}
```

Esse padrão é ideal para componentes que não precisam de sub-componentes ou lógica auxiliar complexa. O componente é importado diretamente: `import { Card } from '@/lib/components/card'`.

### Exportação de compound components

Quando um componente precisa de múltiplos sub-componentes que trabalham juntos, adotamos o padrão de compound components, exportando um objeto que agrupa todos os sub-componentes:

```typescript
// src/lib/components/input/index.tsx
import { InputButton } from './InputButton'
import { InputField } from './InputField'
import { InputHelpText } from './InputHelpText'
import { InputIcon } from './InputIcon'
import { InputLabel } from './InputLabel'
import { InputRequirements } from './InputRequirements'
import { InputRoot } from './InputRoot'
import { InputTagField } from './InputTagField'
import { InputWrapper } from './InputWrapper'

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Wrapper: InputWrapper,
  Field: InputField,
  TagField: InputTagField,
  Button: InputButton,
  Icon: InputIcon,
  HelpText: InputHelpText,
  Requirements: InputRequirements,
}
```

Esse padrão permite composição flexível: `import { Input } from '@/lib/components/input'` e uso como `<Input.Root><Input.Label>...</Input.Label></Input.Root>`. Cada sub-componente mantém sua própria responsabilidade, mas a API pública é unificada através do objeto exportado.

### Exportação com barrel exports

Para componentes que têm múltiplas exportações relacionadas mas não seguem o padrão de compound components, usamos barrel exports em arquivos `index.ts`:

```typescript
// src/lib/components/entity-card/index.ts
export { EntityCard } from './EntityCard'
export { EntityAvatarCircle } from './EntityAvatarCircle'
```

Isso permite importações seletivas: `import { EntityCard, EntityAvatarCircle } from '@/lib/components/entity-card'`, mantendo a API limpa e permitindo tree-shaking eficiente.

## Padrão de composition

O projeto adota extensivamente o padrão de composition, onde componentes complexos são decompostos em sub-componentes menores e especializados que trabalham juntos. Esse padrão permite que desenvolvedores componham interfaces flexíveis usando apenas os sub-componentes necessários, sem precisar de props monolíticas ou configurações complexas.

### Princípios do composition pattern

O composition pattern funciona através da exportação de múltiplos sub-componentes como propriedades de um objeto principal. Cada sub-componente tem uma responsabilidade específica e pode ser usado independentemente ou em conjunto com outros sub-componentes. Isso permite que a API do componente seja flexível e extensível, enquanto mantém cada parte do componente focada em uma única responsabilidade.

A composição acontece em dois níveis: primeiro, os sub-componentes são definidos como componentes React independentes, cada um com sua própria lógica e estilos. Depois, esses componentes são agrupados em um objeto exportado que serve como namespace, permitindo acesso organizado através de notação de ponto.

### Exemplo prático: componente Input

O componente `Input` demonstra como o composition pattern permite criar interfaces flexíveis:

```typescript
// src/lib/components/input/index.tsx
import { InputButton } from './InputButton'
import { InputField } from './InputField'
import { InputHelpText } from './InputHelpText'
import { InputIcon } from './InputIcon'
import { InputLabel } from './InputLabel'
import { InputRequirements } from './InputRequirements'
import { InputRoot } from './InputRoot'
import { InputTagField } from './InputTagField'
import { InputWrapper } from './InputWrapper'

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Wrapper: InputWrapper,
  Field: InputField,
  TagField: InputTagField,
  Button: InputButton,
  Icon: InputIcon,
  HelpText: InputHelpText,
  Requirements: InputRequirements,
}
```

Cada sub-componente tem uma responsabilidade específica: `InputRoot` gerencia o layout geral, `InputLabel` renderiza o rótulo, `InputWrapper` fornece o container estilizado, `InputField` é o campo de entrada propriamente dito, e assim por diante. O uso fica assim:

```typescript
import { Input } from '@/lib/components/input'

function MyForm() {
  return (
    <Input.Root>
      <Input.Label>Nome completo</Input.Label>
      <Input.Wrapper>
        <Input.Icon icon={Icon.User} />
        <Input.Field type="text" placeholder="Digite seu nome" />
      </Input.Wrapper>
      <Input.HelpText>Este campo é obrigatório</Input.HelpText>
    </Input.Root>
  )
}
```

Essa estrutura permite que diferentes combinações de sub-componentes sejam usadas conforme a necessidade. Um input simples pode usar apenas `Input.Root`, `Input.Label` e `Input.Field`, enquanto um input mais complexo pode incluir ícones, botões de ação, textos de ajuda e requisitos de validação.

### Composition com estado compartilhado

Alguns componentes que usam composition pattern precisam compartilhar estado entre sub-componentes. Nesses casos, o projeto utiliza Context API para gerenciar esse estado de forma centralizada:

```typescript
// src/lib/components/sidebar/context.tsx
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  // ... lógica de estado
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, ... }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
}
```

O componente `SideBar` então exporta tanto os sub-componentes quanto o provider:

```typescript
// src/lib/components/sidebar/index.tsx
import { SideBarRoot } from './SideBarContent'
import { SideBarHeader } from './SidebarHeader'
import { SidebarItems } from './sidebarItems'
import { SideBarSubItems } from './SideBarSubItems'

export const SideBar = {
  Root: SideBarRoot,
  Items: SidebarItems,
  SubItems: SideBarSubItems,
  Header: SideBarHeader,
}
```

O `SideBar.Root` atua como provider, envolvendo os sub-componentes e fornecendo o contexto necessário. Os outros sub-componentes consomem esse contexto através do hook `useSidebar`, permitindo que eles reajam ao estado compartilhado sem precisar de props drilling.

### Composition em componentes complexos

Componentes mais complexos, como `TableFilters`, demonstram como o composition pattern escala para funcionalidades extensas:

```typescript
// src/lib/components/table/core/filters/index.ts
import { TableFilterRoot } from './TableFilterRoot'
import { TableSearch } from './TableSearch'
import { TableDynamicFilter } from './TableDynamicFilter'
import { TableFilterTags } from './TableFilterTags'
import { TableCustomizerWrapper } from './TableCustomizerWrapper'
import {
  TableFiltersBar,
  TableFiltersLeft,
  TableFiltersRight,
} from './TableFiltersLayout'

const TableFilters = {
  Root: TableFilterRoot,
  Search: TableSearch,
  DynamicFilter: TableDynamicFilter,
  Tags: TableFilterTags,
  Customizer: TableCustomizerWrapper,
  Bar: TableFiltersBar,
  Left: TableFiltersLeft,
  Right: TableFiltersRight,
}

export default TableFilters
```

Aqui, `TableFilters.Root` gerencia o estado global dos filtros através de Context API, enquanto os outros sub-componentes (`Search`, `DynamicFilter`, `Tags`, etc.) são componentes especializados que podem ser compostos conforme necessário. O uso fica assim:

```typescript
import TableFilters from '@/lib/components/table/core/filters'

function MyTable() {
  return (
    <TableFilters.Root>
      <TableFilters.Bar>
        <TableFilters.Left>
          <TableFilters.Search />
          <TableFilters.Tags />
        </TableFilters.Left>
        <TableFilters.Right>
          <TableFilters.DynamicFilter fields={filterFields} />
          <TableFilters.Customizer />
        </TableFilters.Right>
      </TableFilters.Bar>
    </TableFilters.Root>
  )
}
```

Essa estrutura permite que diferentes tabelas usem diferentes combinações de filtros, mantendo a flexibilidade enquanto garante que o estado seja gerenciado de forma consistente através do `Root`.

### Vantagens do composition pattern

O composition pattern oferece várias vantagens sobre abordagens alternativas como props monolíticas ou componentes únicos com muitas opções:

Flexibilidade de composição permite que desenvolvedores usem apenas os sub-componentes necessários para cada caso de uso, evitando sobrecarga de props ou configurações complexas. Um input simples não precisa carregar a lógica de ícones, botões ou validação avançada se não for necessário.

Separação de responsabilidades torna cada sub-componente focado em uma única tarefa, facilitando manutenção, testes e compreensão do código. Alterações em um sub-componente não afetam outros, reduzindo o risco de regressões.

Extensibilidade permite adicionar novos sub-componentes sem quebrar código existente. Novos recursos podem ser introduzidos como novos sub-componentes opcionais, mantendo compatibilidade com implementações anteriores.

Reutilização de sub-componentes individuais é possível quando um sub-componente específico é útil em outro contexto. Por exemplo, `Input.Label` pode ser usado independentemente se necessário.

Type-safety é mantida porque cada sub-componente mantém seus próprios tipos TypeScript, permitindo que o editor forneça autocomplete e validação adequados para cada parte da composição.

### Trade-offs e considerações

O composition pattern não é adequado para todos os casos. Componentes muito simples que não precisam de múltiplas partes podem se beneficiar mais de uma API direta com props. A adição de sub-componentes adiciona complexidade à API pública, o que pode ser excessivo para casos de uso simples.

A curva de aprendizado inicial é maior porque desenvolvedores precisam entender quais sub-componentes usar e como compô-los. Documentação e exemplos são essenciais para mitigar isso.

Quando estado compartilhado é necessário, o uso de Context API adiciona uma camada de complexidade que precisa ser gerenciada cuidadosamente. O provider precisa ser usado corretamente, e hooks de contexto precisam tratar casos onde o contexto não está disponível.

### Quando usar composition pattern

O composition pattern é especialmente adequado quando um componente precisa de múltiplas partes que podem ser combinadas de forma flexível, quando diferentes casos de uso requerem diferentes combinações de funcionalidades, ou quando sub-componentes individuais podem ser reutilizados em outros contextos.

Para componentes simples com uma única responsabilidade e API direta, uma exportação simples com props bem definidas é mais apropriada. A decisão entre composition pattern e API simples deve considerar a complexidade atual e futura do componente, bem como a frequência de uso de diferentes combinações de funcionalidades.

## Uso de tailwind-variants

O projeto utiliza `tailwind-variants` para gerenciar estilos de componentes de forma type-safe e composável. Essa escolha permite que variantes sejam definidas de forma declarativa, com suporte a TypeScript para autocomplete e validação em tempo de desenvolvimento.

O padrão de uso segue esta estrutura:

```typescript
import { tv } from 'tailwind-variants'

const componentVariant = tv({
  base: 'classes-base-aqui',
  variants: {
    variant: {
      default: 'classes-para-variante-default',
      primary: 'classes-para-variante-primary',
    },
    size: {
      sm: 'classes-para-tamanho-sm',
      md: 'classes-para-tamanho-md',
      lg: 'classes-para-tamanho-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export function Component({ variant, size, ...props }) {
  return (
    <div className={componentVariant({ variant, size })}>
      {/* ... */}
    </div>
  )
}
```

A função `tv` gera uma função que combina classes base com variantes selecionadas, garantindo que apenas combinações válidas sejam usadas. Os `defaultVariants` eliminam a necessidade de valores padrão explícitos em cada uso do componente.

Para componentes com estados mais complexos, podemos usar `compoundVariants`:

```typescript
const accordionItemWrapper = tv({
  base: 'transition-all duration-200 ease-in-out border rounded-lg border-neutral-light-300 bg-white',
  variants: {
    isOpen: {
      true: 'border-brand-blue-500',
      false: 'hover:border-brand-blue-500',
    },
    hasError: {
      true: 'border-red-500 focus-within:border-red-500 hover:border-red-500',
      false: '',
    },
  },
  compoundVariants: [
    {
      isOpen: true,
      hasError: true,
      class: 'border-red-500',
    },
  ],
})
```

Isso permite estilos que dependem de múltiplas variantes simultaneamente, mantendo a lógica de estilo declarativa e fácil de entender.

## Definição de tipos TypeScript

Quando um componente precisa de tipos complexos ou quando queremos separar a definição de tipos da implementação, criamos um arquivo `types.ts` no diretório do componente:

```typescript
// src/lib/components/button/types.ts
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { VariantProps } from 'tailwind-variants'
import { buttonVariant } from '.'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariant> {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  text: string
}
```

O uso de `VariantProps<typeof buttonVariant>` garante que as props do componente incluam automaticamente todas as variantes definidas no `tv`, mantendo sincronia entre estilos e tipos. Isso elimina a necessidade de manter manualmente uma lista de variantes em dois lugares diferentes.

Para componentes que exportam tipos que serão usados externamente, exportamos explicitamente:

```typescript
// src/lib/components/status-tag/index.tsx
export type StatusType = keyof typeof statusStyles
```

Isso permite que outros componentes importem e usem esses tipos: `import type { StatusType } from '@/lib/components/status-tag'`.

## Nomenclatura e convenções

Os componentes seguem convenções de nomenclatura que facilitam a descoberta e o uso:

- Nomes de componentes: PascalCase (`Button`, `StatusTag`, `ContactLinks`)
- Nomes de variantes: camelCase (`variant`, `size`, `isOpen`)
- Arquivos de componentes: PascalCase com extensão `.tsx` (`Button.tsx`, `InputField.tsx`)
- Arquivos de tipos: camelCase com extensão `.ts` (`types.ts`)
- Arquivos de índice: `index.tsx` ou `index.ts` conforme o conteúdo

Essas convenções garantem consistência visual e facilitam a navegação no editor, onde arquivos são ordenados alfabeticamente e componentes são facilmente identificáveis.

## Exemplos práticos

### Componente simples com variantes

O componente `Button` demonstra como um componente simples pode ter múltiplas variantes bem definidas:

```typescript
// src/lib/components/button/index.tsx
import { tv } from 'tailwind-variants'
import { ButtonProps } from './types'

const buttonVariant = tv({
  base: 'flex items-center justify-center transition-all duration-200 gap-1 rounded-lg px-8 py-4 truncate font-semibold',
  variants: {
    variant: {
      transparent: '',
      transparentWithoutPadding: 'px-0 py-0',
      transparentEdit: 'text-neutral-light-600 bg-transparent border border-neutral-light-300 hover:text-neutral-dark-950 py-2 px-4 font-normal',
      primary: 'bg-brand-blue-700 text-brand-blue-50 border-4 border-transparent hover:bg-brand-blue-600 focus:outline-none focus:bg-brand-blue-600 focus:ring-4 focus:ring-brand-blue-200 active:bg-brand-blue-700 active:outline-none active:ring-0 h-14',
      // ... outras variantes
    },
    size: {
      xs: 'w-1/5 text-md',
      sm: 'px-4 py-2 text-sm h-10 w-auto',
      md: 'w-2/4 text-md',
      lg: 'w-full text-base leading-[1.125rem]',
    },
    disabled: {
      true: 'bg-neutral-50 text-neutral-500 border border-neutral-200 hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 focus:ring-0 active:bg-neutral-50 active:outline-none active:ring-0 cursor-not-allowed h-14',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
  },
})

export { buttonVariant }

export function Button({ iconLeft, iconRight, text, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariant({ variant, size, disabled: props.disabled })}
      {...props}
    >
      {iconLeft && <span>{iconLeft}</span>}
      {text}
      {iconRight && <span>{iconRight}</span>}
    </button>
  )
}
```

A variante `buttonVariant` é exportada separadamente para permitir que outros componentes possam reutilizar a lógica de estilos, se necessário. As variantes cobrem estados visuais (primary, secondary), tamanhos (xs, sm, md, lg) e estados interativos (disabled), garantindo que o componente seja flexível o suficiente para diferentes contextos de uso.

### Componente com estilos condicionais

O componente `StatusTag` mostra como combinar `tailwind-variants` com objetos de estilo para casos onde a lógica de estilo é mais complexa:

```typescript
// src/lib/components/status-tag/index.tsx
import { tv } from 'tailwind-variants'

const statusTagVariants = tv({
  base: 'inline-flex items-center gap-1 font-medium',
  variants: {
    size: {
      sm: 'p-1 px-1.5 text-xs',
      md: 'p-2 px-2.5 text-body3',
      lg: 'p-3 px-3.5 text-body2',
    },
    textTransform: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
      normal: 'normal-case',
    },
    rounded: {
      rounded: 'rounded',
      'rounded-md': 'rounded-md',
      'rounded-lg': 'rounded-lg',
      'rounded-xl': 'rounded-xl',
      'rounded-full': 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    textTransform: 'normal',
    rounded: 'rounded',
  },
})

const statusStyles = {
  active: {
    container: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
  },
  inactive: {
    container: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
  },
  // ... outros status
}

export function StatusTag({ status, size, textTransform, rounded, showDot = true }: StatusTagProps) {
  const normalizedStatus = status.toLowerCase() as StatusType
  const style = statusStyles[normalizedStatus] || statusStyles.default

  return (
    <span className={`${statusTagVariants({ size, textTransform, rounded })} ${style.container}`}>
      {showDot && <span className={`${dotVariants({ size })} ${style.dot}`} />}
      {children}
    </span>
  )
}
```

Aqui, `tailwind-variants` gerencia variantes estruturais (tamanho, transformação de texto, arredondamento), enquanto um objeto JavaScript simples (`statusStyles`) gerencia as cores e estilos específicos de cada status. Essa separação permite que variantes estruturais sejam type-safe através do TypeScript, enquanto estilos semânticos (como "active" ou "inactive") são mapeados de forma mais flexível.

### Componente com variantes simples

Alguns componentes têm variantes que não justificam o uso completo de `tailwind-variants`. Nesses casos, um objeto simples pode ser suficiente:

```typescript
// src/lib/components/contact-links/index.tsx
const variantClasses: Record<ContactLinksVariant, string> = {
  default: 'rounded-lg bg-white p-4 shadow-sm',
  outlined: 'rounded-lg border border-gray-200 bg-white p-4 shadow-none',
}

export function ContactLinks({ variant = 'default', ...props }: ContactLinksProps) {
  return (
    <div className={`flex flex-col gap-2 ${variantClasses[variant]}`}>
      {/* ... */}
    </div>
  )
}
```

Essa abordagem é adequada quando há poucas variantes e a lógica de combinação não é complexa. Para casos mais simples, essa solução é mais direta e fácil de manter do que configurar `tailwind-variants`.

## Decisões de arquitetura

A escolha por `tailwind-variants` em vez de soluções como CSS Modules ou styled-components foi feita para manter a consistência com o uso de Tailwind CSS no projeto, enquanto adiciona type-safety e composabilidade. A função `tv` permite que variantes sejam combinadas de forma declarativa, e o TypeScript garante que apenas combinações válidas sejam usadas.

A estrutura de diretórios por componente facilita a localização de código relacionado e permite que componentes complexos sejam decompostos sem criar dependências circulares. Cada componente é um módulo autocontido, o que facilita testes, refatoração e manutenção.

O padrão de compound components foi adotado para componentes como `Input` e `SideBar`, onde múltiplos sub-componentes precisam trabalhar juntos mas mantêm responsabilidades distintas. Isso permite composição flexível enquanto mantém a API pública organizada.

## Limitações e considerações futuras

A estrutura atual funciona bem para componentes de médio porte, mas pode se tornar verbosa para componentes muito simples que não precisam de variantes ou sub-componentes. Nesses casos, manter um único arquivo `index.tsx` é suficiente, e a estrutura de diretório pode parecer excessiva.

Para componentes que precisam de lógica de estado complexa ou efeitos colaterais, a estrutura atual não prescreve onde essa lógica deve viver. Alguns componentes mantêm hooks personalizados no mesmo diretório, enquanto outros podem beneficiar-se de uma separação mais explícita entre lógica e apresentação.

A documentação via `README.md` é opcional e inconsistente entre componentes. Para componentes complexos ou que têm APIs não óbvias, documentação mais sistemática ajudaria novos desenvolvedores a entenderem rapidamente como usar e estender esses componentes.

## Conclusão

A arquitetura de componentes do projeto prioriza organização, type-safety e reutilização através de uma estrutura de diretórios consistente, uso de `tailwind-variants` para estilos type-safe, e padrões de exportação que se adaptam à complexidade de cada componente. Essas decisões facilitam a manutenção e evolução do design system, permitindo que novos componentes sejam criados seguindo padrões estabelecidos sem necessidade de decisões arquiteturais adicionais.

