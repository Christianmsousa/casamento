export interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  spent: number
  color: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  categoryId: string
  date: string
  taskId?: string
  vendorId?: string
}

export interface Budget {
  totalBudgeted: number
  totalSpent: number
  categories: BudgetCategory[]
  expenses: Expense[]
}

export const mockBudget: Budget = {
  totalBudgeted: 50000,
  totalSpent: 18500,
  categories: [
    {
      id: 'venue',
      name: 'Local/Cerimônia',
      budgeted: 15000,
      spent: 15000,
      color: '#D15F42',
    },
    {
      id: 'catering',
      name: 'Buffet/Alimentação',
      budgeted: 12000,
      spent: 0,
      color: '#10B981',
    },
    {
      id: 'decoration',
      name: 'Decoração',
      budgeted: 8000,
      spent: 2500,
      color: '#F59E0B',
    },
    {
      id: 'photography',
      name: 'Fotografia/Vídeo',
      budgeted: 6000,
      spent: 1000,
      color: '#3B82F6',
    },
    {
      id: 'music',
      name: 'Música/DJ',
      budgeted: 3000,
      spent: 0,
      color: '#8B5CF6',
    },
    {
      id: 'attire',
      name: 'Vestimenta',
      budgeted: 4000,
      spent: 0,
      color: '#EC4899',
    },
    {
      id: 'flowers',
      name: 'Flores',
      budgeted: 2000,
      spent: 0,
      color: '#F472B6',
    },
  ],
  expenses: [
    {
      id: 'exp-1',
      description: 'Sinal do local',
      amount: 5000,
      categoryId: 'venue',
      date: '2025-01-15',
    },
    {
      id: 'exp-2',
      description: 'Pagamento final do local',
      amount: 10000,
      categoryId: 'venue',
      date: '2025-06-01',
    },
    {
      id: 'exp-3',
      description: 'Decoração da cerimônia',
      amount: 2000,
      categoryId: 'decoration',
      date: '2025-05-20',
    },
    {
      id: 'exp-4',
      description: 'Sinal do fotógrafo',
      amount: 1000,
      categoryId: 'photography',
      date: '2025-02-10',
    },
    {
      id: 'exp-5',
      description: 'Arranjos de mesa',
      amount: 500,
      categoryId: 'decoration',
      date: '2025-05-25',
    },
  ],
}

