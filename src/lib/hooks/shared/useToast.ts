export type ToastPayload = {
  title: string
  description?: string
  status?: 'error' | 'success' | 'info'
}

/**
 * Stub mínimo para formulários (ex.: erro ao copiar). Substituir por um provider de toast quando existir UI global.
 */
export function useToast() {
  return (payload: ToastPayload) => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console -- feedback até haver toast visual
      console[payload.status === 'error' ? 'error' : 'log'](
        `[${payload.status ?? 'info'}] ${payload.title}`,
        payload.description ?? '',
      )
    }
  }
}
