'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils/cn'

interface CountdownProps {
  targetDate: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!targetDate) {
      console.log('Countdown: No target date provided')
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      return
    }

    console.log('Countdown: Target date received:', targetDate)

    const calculateTimeLeft = () => {
      try {
        // Cria a data alvo - se for formato ISO (YYYY-MM-DD), adiciona hora
        let target: Date
        
        if (targetDate.includes('T')) {
          // Já tem hora
          target = new Date(targetDate)
        } else {
          // Formato YYYY-MM-DD, define para meia-noite no timezone local
          const dateParts = targetDate.split('-')
          if (dateParts.length === 3) {
            const [year, month, day] = dateParts.map(Number)
            // Cria a data no timezone local para meia-noite
            target = new Date(year, month - 1, day, 0, 0, 0, 0)
          } else {
            // Tenta parse direto
            target = new Date(targetDate)
          }
        }
        
        // Verifica se a data é válida
        if (isNaN(target.getTime())) {
          console.error('Countdown: Invalid target date:', targetDate)
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          return
        }

        // Usa a data/hora atual no mesmo timezone
        const now = new Date()
        
        // Ajusta para comparar no mesmo timezone (ambos no timezone local)
        const targetTime = target.getTime()
        const nowTime = now.getTime()
        const difference = targetTime - nowTime

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          
          setTimeLeft({ days, hours, minutes, seconds })
        } else {
          // Data já passou
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      } catch (error) {
        console.error('Countdown: Error calculating time left:', error)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calcula imediatamente
    calculateTimeLeft()
    
    // Atualiza a cada segundo
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const timeUnits = [
    { label: 'Dias', value: timeLeft.days, shortLabel: 'D' },
    { label: 'Horas', value: timeLeft.hours, shortLabel: 'H' },
    { label: 'Minutos', value: timeLeft.minutes, shortLabel: 'M' },
    { label: 'Segundos', value: timeLeft.seconds, shortLabel: 'S' },
  ]


  return (
    <div
      className={cn(
        'flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10',
        className
      )}
    >
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="contents">
          <div className="flex flex-col items-center">
            <div 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-terracota-600 mb-1 md:mb-2 lg:mb-2 tabular-nums transition-all duration-300"
            >
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[0.6875rem] sm:text-xs md:text-sm lg:text-sm text-gray-500 uppercase tracking-wider font-medium">
              {unit.label}
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <div className="hidden sm:block text-terracota-300/60 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-light self-center">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

