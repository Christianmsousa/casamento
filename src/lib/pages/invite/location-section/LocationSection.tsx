import { LocationSectionProps } from './types'
import { LocationSectionMobile } from './LocationSectionMobile'
import { LocationSectionDesktop } from './LocationSectionDesktop'
import { formatLocationForDisplay } from '@/lib/utils/location'

export function LocationSection({ location }: LocationSectionProps) {
  if (!location) return null

  const formattedLocation = formatLocationForDisplay(location)

  return (
    <>
      <LocationSectionMobile 
        location={location} 
        formattedLocation={formattedLocation} 
      />
      <LocationSectionDesktop 
        location={location} 
        formattedLocation={formattedLocation} 
      />
    </>
  )
}

