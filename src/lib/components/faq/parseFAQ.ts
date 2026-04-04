import { FAQItem } from './types'

export function parseFAQ(content: string): FAQItem[] {
  const items: FAQItem[] = []
  const lines = content.split('\n')
  
  let currentQuestion = ''
  let currentAnswer: string[] = []
  let inAnswer = false
  
  for (const line of lines) {
    // Ignora o título principal
    if (line.startsWith('# ')) continue
    
    // Detecta perguntas (## heading)
    if (line.startsWith('## ')) {
      // Salva o item anterior se existir
      if (currentQuestion && currentAnswer.length > 0) {
        items.push({
          question: currentQuestion,
          answer: currentAnswer.join('\n').trim()
        })
      }
      
      // Inicia nova pergunta
      currentQuestion = line.replace(/^##\s+/, '').trim()
      currentAnswer = []
      inAnswer = true
    } else if (inAnswer && line.trim()) {
      // Adiciona linha à resposta
      currentAnswer.push(line)
    }
  }
  
  // Adiciona o último item
  if (currentQuestion && currentAnswer.length > 0) {
    items.push({
      question: currentQuestion,
      answer: currentAnswer.join('\n').trim()
    })
  }
  
  return items
}

