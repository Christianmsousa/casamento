/**
 * Atualiza pix_key / merchant no settings.json (copia-e-cola e QR são gerados no app).
 * Uso: node scripts/generate-pix.mjs
 */
import { readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createStaticPix, hasError } from 'pix-utils'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SETTINGS_PATH = join(__dirname, '..', 'src', 'lib', 'data', 'settings.json')

const PIX_KEY = '+551998949240'
const MERCHANT_NAME = 'Julia e Christian'
const MERCHANT_CITY = 'Valinhos'

const pix = createStaticPix({
  merchantName: MERCHANT_NAME,
  merchantCity: MERCHANT_CITY,
  pixKey: PIX_KEY,
})

if (hasError(pix)) {
  console.error('Erro ao validar PIX:', pix)
  process.exit(1)
}

const settings = JSON.parse(await readFile(SETTINGS_PATH, 'utf-8'))
settings.pix_key = '19998949240'
settings.pix_merchant_name = MERCHANT_NAME
settings.pix_merchant_city = MERCHANT_CITY
settings.pix_note = 'Chave PIX: celular (19) 99894-9240. Julia e Christian'
delete settings.pix_copy_paste
delete settings.pix_qr_image

await writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n', 'utf-8')

console.log('Settings atualizado (pix_key). QR e copia-e-cola são gerados no site.')
console.log('Payload de referência:', pix.toBRCode())
