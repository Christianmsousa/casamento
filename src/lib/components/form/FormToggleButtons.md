# FormToggleButtons Component

Um componente de botões toggle para seleção única em formulários, integrado com `react-hook-form`.

## Features

- ✅ Integração completa com `react-hook-form`
- ✅ Validação automática com exibição de erros
- ✅ Suporte a acessibilidade (ARIA labels, roles)
- ✅ Estados visuais (selecionado, hover, disabled)
- ✅ Tipagem TypeScript completa
- ✅ Customização de estilos

## Uso

```tsx
import { FormToggleButtons } from '@/lib/components/form/FormToggleButtons'

function MyForm() {
  const { control } = useForm({
    defaultValues: {
      isMain: false,
      personType: 'fisica'
    }
  })

  return (
    <FormToggleButtons
      name="isMain"
      label="Loja matriz"
      control={control}
      options={[
        { value: true, label: 'Sim' },
        { value: false, label: 'Não' }
      ]}
    />
  )
}
```

## Props

| Prop | Tipo | Descrição | Obrigatório |
|------|------|-----------|-------------|
| `name` | `Path<T>` | Nome do campo no formulário | ✅ |
| `control` | `Control<T>` | Control do react-hook-form | ✅ |
| `options` | `ToggleOption[]` | Array de opções disponíveis | ✅ |
| `label` | `string` | Label do campo | ❌ |
| `error` | `FieldError` | Erro de validação | ❌ |
| `disabled` | `boolean` | Desabilita o componente | ❌ |
| `className` | `string` | Classes CSS adicionais | ❌ |

### ToggleOption

```typescript
interface ToggleOption<T = any> {
  value: T    // Valor da opção (qualquer tipo)
  label: string  // Texto exibido
}
```

## Exemplos

### Seleção Sim/Não
```tsx
<FormToggleButtons
  name="isMain"
  label="Loja matriz"
  control={control}
  options={[
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' }
  ]}
/>
```

### Seleção de Tipo de Pessoa
```tsx
<FormToggleButtons
  name="personType"
  label="Tipo pessoa"
  control={control}
  options={[
    { value: 'fisica', label: 'Pessoa física' },
    { value: 'juridica', label: 'Pessoa jurídica' }
  ]}
/>
```

### Com Validação
```tsx
<FormToggleButtons
  name="status"
  label="Status"
  control={control}
  options={[
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' }
  ]}
  error={errors.status}
/>
```

### Desabilitado
```tsx
<FormToggleButtons
  name="role"
  label="Função"
  control={control}
  options={[
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuário' }
  ]}
  disabled={true}
/>
```

## Estilos

O componente usa classes Tailwind CSS e segue o design system do projeto:

- **Selecionado**: `border-blue-500 bg-blue-500 text-white`
- **Não selecionado**: `border-gray-300 bg-white text-gray-700`
- **Hover**: `hover:border-gray-400`
- **Disabled**: `opacity-50 cursor-not-allowed`
- **Focus**: `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`

## Acessibilidade

- ✅ Labels associados corretamente
- ✅ Roles ARIA apropriados (`group`)
- ✅ Navegação por teclado
- ✅ Suporte a screen readers
- ✅ Estados visuais claros

