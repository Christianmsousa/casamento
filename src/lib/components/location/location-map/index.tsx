'use client'

import { useState } from 'react'
import { buildLocationString } from '@/lib/utils/location'
import type { LocationDetails } from '@/lib/types/settings'

interface LocationMapProps {
  location: string | LocationDetails
  title: string
}

export function LocationMap({ location, title }: LocationMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Constrói o endereço otimizado para geocodificação
  const locationString = buildLocationString(location)
  
  // Codifica o endereço para URL do Google Maps
  const encodedLocation = encodeURIComponent(locationString)
  
  // URL para embed do Google Maps
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed&hl=pt-BR`
  
  // URL para abrir no Google Maps app (navegação)
  const googleMapsNavigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`
  
  // URL para abrir no Google Maps (visualização)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
  
  // URL para abrir no Waze
  const wazeUrl = `https://waze.com/ul?q=${encodedLocation}&navigate=yes`

  const handleStartNavigation = () => {
    // Abre no Google Maps com navegação
    window.open(googleMapsNavigationUrl, '_blank')
  }

  return (
    <div className="w-full space-y-4">
      {/* Mapa */}
      <div className="relative w-full h-64 md:h-80 lg:h-72 xl:h-80 rounded-xl lg:rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-100">
        {!isMapLoaded && (
          <div className="absolute inset-0 bg-gray-100 z-10 animate-pulse">
            {/* Skeleton do mapa */}
            <div className="w-full h-full relative">
              {/* Fundo base */}
              <div className="absolute inset-0 bg-gray-200"></div>
              
              {/* Elementos decorativos do skeleton */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Ícone de localização centralizado */}
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Linhas de grade simulando o mapa */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-300"></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-300"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-300"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-300"></div>
              </div>
            </div>
          </div>
        )}
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsMapLoaded(true)}
          className="w-full h-full"
          title={`Mapa - ${title}`}
        />
      </div>

      {/* Botões de Navegação */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        <button
          onClick={handleStartNavigation}
          className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-terracota-600 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-terracota-700 active:bg-terracota-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>Google Maps</span>
        </button>
        <a
          href={wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-terracota-500 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-terracota-600 active:bg-terracota-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6 0 5.302-4.298 9.6-9.6 9.6-5.302 0-9.6-4.298-9.6-9.6 0-5.302 4.298-9.6 9.6-9.6zm0 1.92c-4.234 0-7.68 3.446-7.68 7.68 0 4.234 3.446 7.68 7.68 7.68 4.234 0 7.68-3.446 7.68-7.68 0-4.234-3.446-7.68-7.68-7.68zM9.6 7.2v9.6l7.68-4.8L9.6 7.2z"/>
          </svg>
          <span>Waze</span>
        </a>
      </div>
    </div>
  )
}

