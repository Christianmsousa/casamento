export interface Guest {
  id: string
  name: string
  email?: string
  phone?: string
  group: 'family' | 'friends' | 'work' | 'others'
  invite_code: string
  notes?: string
}

