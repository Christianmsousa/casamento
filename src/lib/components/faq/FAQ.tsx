'use client'

import { useState } from 'react'
import { FAQItem } from './FAQItem'
import { parseFAQ } from './parseFAQ'
import { FAQProps } from './types'

export function FAQ({ content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null) // Todos os itens fechados por padrão
  
  if (!content) return null
  
  const faqItems = parseFAQ(content)
  
  if (faqItems.length === 0) return null
  
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
      {faqItems.map((item, index) => (
        <FAQItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  )
}

