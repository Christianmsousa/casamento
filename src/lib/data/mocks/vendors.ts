export type VendorStatus = 'favorite' | 'hired' | 'paid' | 'discarded'
export type VendorCategory = 
  | 'photography'
  | 'music'
  | 'catering'
  | 'decoration'
  | 'venue'
  | 'flowers'
  | 'attire'
  | 'transport'
  | 'other'

export interface Vendor {
  id: string
  name: string
  category: VendorCategory
  status: VendorStatus
  rating: number
  phone?: string
  email?: string
  whatsapp?: string
  address?: string
  website?: string
  notes?: string
  contractValue?: number
  contractDate?: string
  createdAt: string
}

export const mockVendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Fotografia & Cia',
    category: 'photography',
    status: 'hired',
    rating: 5,
    phone: '(11) 98765-4321',
    email: 'contato@fotografiaecia.com.br',
    whatsapp: '5511987654321',
    address: 'São Paulo, SP',
    website: 'https://fotografiaecia.com.br',
    notes: 'Ótimo profissional, muito atencioso',
    contractValue: 6000,
    contractDate: '2025-02-10',
    createdAt: '2025-01-05',
  },
  {
    id: 'vendor-2',
    name: 'DJ Sound',
    category: 'music',
    status: 'favorite',
    rating: 4,
    phone: '(11) 91234-5678',
    email: 'contato@djsound.com.br',
    whatsapp: '5511912345678',
    address: 'São Paulo, SP',
    website: 'https://djsound.com.br',
    notes: 'Aguardando orçamento',
    createdAt: '2025-01-10',
  },
  {
    id: 'vendor-3',
    name: 'Buffet Sabor & Arte',
    category: 'catering',
    status: 'hired',
    rating: 5,
    phone: '(11) 99876-5432',
    email: 'contato@saborearte.com.br',
    whatsapp: '5511998765432',
    address: 'São Paulo, SP',
    notes: 'Fizemos degustação, muito bom!',
    contractValue: 12000,
    contractDate: '2025-03-15',
    createdAt: '2025-01-20',
  },
  {
    id: 'vendor-4',
    name: 'Decoração Elegante',
    category: 'decoration',
    status: 'favorite',
    rating: 4,
    phone: '(11) 97654-3210',
    email: 'contato@decoracaoelegante.com.br',
    address: 'São Paulo, SP',
    notes: 'Comparando com outros fornecedores',
    createdAt: '2025-02-01',
  },
  {
    id: 'vendor-5',
    name: 'Flores do Campo',
    category: 'flowers',
    status: 'hired',
    rating: 5,
    phone: '(11) 96543-2109',
    email: 'contato@floresdocampo.com.br',
    whatsapp: '5511965432109',
    address: 'São Paulo, SP',
    contractValue: 2000,
    contractDate: '2025-04-01',
    createdAt: '2025-02-15',
  },
  {
    id: 'vendor-6',
    name: 'Ateliê de Noivas',
    category: 'attire',
    status: 'favorite',
    rating: 4,
    phone: '(11) 95432-1098',
    email: 'contato@atelienoivas.com.br',
    address: 'São Paulo, SP',
    notes: 'Agendado prova do vestido para março',
    createdAt: '2025-02-20',
  },
]

export const vendorCategoryLabels: Record<VendorCategory, string> = {
  photography: 'Fotografia',
  music: 'Música/DJ',
  catering: 'Buffet',
  decoration: 'Decoração',
  venue: 'Local',
  flowers: 'Flores',
  attire: 'Vestimenta',
  transport: 'Transporte',
  other: 'Outros',
}

export const vendorStatusLabels: Record<VendorStatus, string> = {
  favorite: 'Favorito',
  hired: 'Contratado',
  paid: 'Pago',
  discarded: 'Descartado',
}

export const vendorStatusColors: Record<VendorStatus, string> = {
  favorite: 'bg-blue-100 text-blue-700',
  hired: 'bg-amber-100 text-amber-700',
  paid: 'bg-green-100 text-green-700',
  discarded: 'bg-gray-100 text-gray-700',
}

