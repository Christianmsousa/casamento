import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-terracota-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="text-gray-600">Página não encontrada</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-terracota-500 text-white rounded-md hover:bg-terracota-600 transition-colors"
        >
          Recarregar página
        </Link>
      </div>
    </div>
  )
}

