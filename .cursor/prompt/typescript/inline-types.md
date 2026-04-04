# Quando Usar Types Inline

Quando o usuário pedir types que são específicos de um único componente ou simples, use types inline.

## Aplicação:

1. **Defina types diretamente no componente**
2. **Use para props locais** que não serão reutilizados
3. **Use para types simples** que não precisam ser compartilhados

## Exemplo de aplicação:

```tsx
// Types inline - específicos deste componente
interface CounterProps {
  initialValue?: number
  step?: number
}

export const Counter = ({ initialValue = 0, step = 1 }: CounterProps) => {
  const [count, setCount] = useState(initialValue)
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + step)}>+</button>
    </div>
  )
}
```

```tsx
// Types inline - simples e não reutilizados
export const Button = ({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode
  onClick: () => void 
}) => {
  return <button onClick={onClick}>{children}</button>
}
```

## Quando usar inline:

- Types específicos de um único componente
- Types simples que não serão reutilizados
- Props de componente local
- Types temporários ou de uso único

## Quando NÃO usar inline:

- Types que serão usados em múltiplos arquivos → `lib/types/`
- Interfaces de dados principais → `lib/types/`
- Types de API responses → `lib/types/`



