/** TLV do payload PIX (EMV QR Code). */
function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

/** CRC16-CCITT-FALSE (padrão BACEN para PIX). */
function crc16Ccitt(payload: string): string {
  let crc = 0xffff
  const polynomial = 0x1021

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ polynomial) & 0xffff
      } else {
        crc = (crc << 1) & 0xffff
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function normalizePixField(value: string, maxLength: number): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .substring(0, maxLength)
    .toUpperCase()
}

export interface StaticPixPayloadInput {
  pixKey: string
  merchantName: string
  merchantCity: string
}

/**
 * Gera o código PIX copia-e-cola (BR Code estático, sem valor fixo).
 * @see https://www.bcb.gov.br/estabilidadefinanceira/pix
 */
export function buildStaticPixCopyPaste(input: StaticPixPayloadInput): string {
  const pixKey = input.pixKey.trim()
  const merchantName = normalizePixField(input.merchantName, 25)
  const merchantCity = normalizePixField(input.merchantCity, 15)

  const merchantAccount = tlv('00', 'br.gov.bcb.pix') + tlv('01', pixKey)
  const additionalData = tlv('62', tlv('05', '***'))

  const payloadWithoutCrc =
    tlv('00', '01') +
    tlv('26', merchantAccount) +
    tlv('52', '0000') +
    tlv('53', '986') +
    tlv('58', 'BR') +
    tlv('59', merchantName) +
    tlv('60', merchantCity) +
    additionalData +
    '6304'

  return payloadWithoutCrc + crc16Ccitt(payloadWithoutCrc)
}

/** Normaliza celular BR para chave PIX (+55DDD9XXXXXXXX). */
export function normalizePixPhoneKey(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('55') && digits.length >= 12) {
    return `+${digits}`
  }
  if (digits.length === 10 || digits.length === 11) {
    return `+55${digits}`
  }
  if (phone.startsWith('+')) {
    return `+${digits}`
  }
  return `+${digits}`
}
