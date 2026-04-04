# Como Criar Componentes de Layout

Quando o usuário pedir componentes de layout (Header, Footer, Navigation, etc.), coloque em `components/layout/`.

## Aplicação:

1. **Crie em `components/layout/[Nome].tsx`**
2. **Use para componentes compartilhados** entre páginas
3. **Use em layouts do Next.js**

## Exemplo de aplicação:

```tsx
// components/layout/Header.tsx
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Casamento
          </Link>
          <div className="flex gap-4">
            <Link href="/checklist">Checklist</Link>
            <Link href="/lista">Lista</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
```

```tsx
// components/layout/Footer.tsx
export const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-600">
        <p>© 2024 Casamento</p>
      </div>
    </footer>
  )
}
```

```tsx
// app/layout.tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

## Quando usar:

- Header, Footer, Navigation
- Sidebar, Container
- Componentes compartilhados entre páginas



