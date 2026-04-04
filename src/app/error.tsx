'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-terracota-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Algo deu errado!</h1>
        <p className="text-gray-600">{error.message || 'Ocorreu um erro inesperado'}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-terracota-500 text-white rounded-md hover:bg-terracota-600 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
