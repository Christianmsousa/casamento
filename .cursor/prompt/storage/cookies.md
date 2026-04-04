# Quando Usar Cookies

Use cookies quando dados precisam estar disponíveis no SSR.

## Aplicação:

```tsx
import { cookies } from 'next/headers'

// Server Component
export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value || 'light'
  
  return <div>Theme: {theme}</div>
}
```

Use para: preferências que precisam no servidor, dados enviados ao servidor.



