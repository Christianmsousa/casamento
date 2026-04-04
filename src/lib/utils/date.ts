import { format, isValid, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

/**
 * `wedding_date` em settings: "YYYY-MM-DD" ou ISO com hora.
 * Evita `new Date("YYYY-MM-DD")`, que o JS interpreta como meia-noite UTC
 * e em fusos como America/Sao_Paulo vira o dia anterior às 21:00.
 */
export function parseEventDateSetting(value: string): Date {
  const s = value.trim()
  if (!s) return new Date(NaN)
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return parseISO(s)
  }
  const fromIso = parseISO(s)
  if (isValid(fromIso)) return fromIso
  return new Date(s)
}

export function eventSettingHasTime(value: string): boolean {
  return /\d{4}-\d{2}-\d{2}T/.test(value.trim())
}

/** Horário da cerimónia para textos (ex.: convite) — mesmo critério que o label completo da data no evento. */
const DEFAULT_CEREMONY_CLOCK = '16:00'

export function getCeremonyClockLabel(weddingDateSetting: string): string {
  if (!weddingDateSetting.trim()) return DEFAULT_CEREMONY_CLOCK
  const date = parseEventDateSetting(weddingDateSetting)
  if (Number.isNaN(date.getTime())) return DEFAULT_CEREMONY_CLOCK
  if (!eventSettingHasTime(weddingDateSetting)) {
    return DEFAULT_CEREMONY_CLOCK
  }
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/** Ex.: "14 de novembro" — para textos corridos no convite. */
export function formatWeddingDayMonthLong(weddingDateSetting: string): string {
  const date = parseEventDateSetting(weddingDateSetting)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
  })
}

/** Ex.: "16h" ou "16h30" — alinhado a `getCeremonyClockLabel`. */
export function getCeremonyTimeSpokenLabel(weddingDateSetting: string): string {
  const clock = getCeremonyClockLabel(weddingDateSetting)
  const parts = clock.split(':')
  const h = Number.parseInt(parts[0] ?? '', 10)
  const m = Number.parseInt(parts[1] ?? '0', 10)
  if (Number.isNaN(h)) return '16h'
  if (m === 0) return `${h}h`
  return `${h}h${String(m).padStart(2, '0')}`
}

// Formatação de datas - sempre horário local do usuário
export function formatDateTime(dateString: string): string {
  try {
    const date = parseISO(dateString)
    // Detecta timezone do usuário automaticamente
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // Converte para horário local do usuário
    const localDate = new Date(
      date.toLocaleString('en-US', { timeZone: userTimezone }),
    )
    return format(localDate, 'dd/MM/yyyy HH:mm')
  } catch {
    return 'Data inválida'
  }
}

// Formatação amigável - "03 de julho às 00:48"
export function formatDateTimeFriendly(dateString: string): string {
  try {
    const date = parseISO(dateString)
    // Detecta timezone do usuário automaticamente
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // Converte para horário local do usuário
    const localDate = new Date(
      date.toLocaleString('en-US', { timeZone: userTimezone }),
    )
    return format(localDate, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })
  } catch {
    return 'Data inválida'
  }
}

// Formatação apenas da data (sem hora)
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const localDate = new Date(
      date.toLocaleString('en-US', { timeZone: userTimezone }),
    )
    return format(localDate, 'dd/MM/yyyy')
  } catch {
    return 'Data inválida'
  }
}

// Formatação apenas da hora
export function formatTime(dateString: string): string {
  try {
    const date = parseISO(dateString)
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const localDate = new Date(
      date.toLocaleString('en-US', { timeZone: userTimezone }),
    )
    return format(localDate, 'HH:mm')
  } catch {
    return 'Hora inválida'
  }
}

// Formatação de data com idade - "23 anos - 06/09/2001"
export function formatDateWithAge(dateString: string): string {
  try {
    const birthDate = parseISO(dateString)
    const today = new Date()

    // Calcula a idade
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    // Ajusta a idade se ainda não chegou o aniversário este ano
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    // Formata a data
    const formattedDate = format(birthDate, 'dd/MM/yyyy')

    return `${age} anos - ${formattedDate}`
  } catch {
    return 'Data inválida'
  }
}

// Formatação de idade com mês ou ano - "23 anos e 3 meses" ou "23 anos"
export function formatAgeWithMonthOrYear(dateString: string): string {
  try {
    const startDate = parseISO(dateString)
    const today = new Date()

    // Calcula a diferença em anos e meses
    let years = today.getFullYear() - startDate.getFullYear()
    let months = today.getMonth() - startDate.getMonth()

    // Ajusta se ainda não chegou o aniversário/mês
    if (months < 0 || (months === 0 && today.getDate() < startDate.getDate())) {
      years--
      months += 12
    }

    // Formata a saída
    if (years === 0) {
      if (months === 0) {
        return 'Menos de 1 mês'
      }
      return `${months} ${months === 1 ? 'mês' : 'meses'}`
    } else if (months === 0) {
      return `${years} ${years === 1 ? 'ano' : 'anos'}`
    } else {
      return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`
    }
  } catch {
    return 'Data inválida'
  }
}

