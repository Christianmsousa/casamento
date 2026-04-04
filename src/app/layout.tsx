import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Julia e Christian",
  description: "Casamento de Julia e Christian",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-cream text-charcoal-600 antialiased">{children}</body>
    </html>
  )
}

