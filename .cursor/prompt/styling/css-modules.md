# Como Usar CSS Modules

Use CSS Modules apenas quando Tailwind não for suficiente ou quando o usuário explicitamente pedir.

## Aplicação:

1. **Primeiro tente com Tailwind** - só use CSS Modules se realmente necessário
2. **Crie arquivo `.module.css`** na mesma pasta do componente
3. **Importe e use** as classes no componente

## Exemplo de aplicação:

Se o usuário pedir algo muito complexo que Tailwind não cobre, ou pedir explicitamente CSS:

```tsx
// Button.module.css
.button {
  /* Estilos complexos que Tailwind não cobre */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

```tsx
// Button.tsx
import styles from './Button.module.css'

export const Button = ({ children }) => {
  return <button className={styles.button}>{children}</button>
}
```

## Quando usar:

- Animações keyframes complexas
- Estilos que Tailwind não cobre
- Quando o usuário pedir explicitamente CSS custom



