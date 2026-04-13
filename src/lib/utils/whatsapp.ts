/** Remove tudo que não for dígito */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

/** Monta URL wa.me com mensagem opcional */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const digits = sanitizePhone(phone)
  const base = `https://wa.me/${digits}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
