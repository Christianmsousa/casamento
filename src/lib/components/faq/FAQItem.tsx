'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Icon } from '@/lib/components/icons'
import { FAQItem as FAQItemType } from './types'
import { accordionItemWrapper, accordionHeader } from './styles'
import { cn } from '@/lib/utils/cn'

interface FAQItemProps {
  item: FAQItemType
  index: number
  isOpen: boolean
  onToggle: () => void
}

const handleKeyDown = (event: React.KeyboardEvent, onToggle: () => void) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onToggle()
  }
}

export function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className={cn(accordionItemWrapper({ isOpen }))}>
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => handleKeyDown(e, onToggle)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className={cn(accordionHeader({ isOpen }))}
      >
        <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 pr-4 md:pr-6 flex-1">
          {item.question}
        </h3>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Icon.ChevronDown
            width="1.5rem"
            height="1.5rem"
            className={`text-terracota-600 transition-transform duration-200 ${
              isOpen ? '-rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </div>
      <div
        id={`faq-answer-${index}`}
        className={`
          grid transition-[grid-template-rows] duration-300 ease-in-out
          ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-4 sm:pb-6 md:pb-8">
            <div className="border-t border-gray-200 pt-4 sm:pt-6 md:pt-8">
              <div className="prose prose-sm md:prose-base max-w-none text-sm sm:text-base md:text-lg prose-headings:text-gray-900 prose-headings:text-sm sm:prose-headings:text-base md:prose-headings:text-lg prose-p:text-gray-700 prose-p:text-sm sm:prose-p:text-base md:prose-p:text-lg prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ul:text-sm sm:prose-ul:text-base md:prose-ul:text-lg prose-li:text-gray-700 prose-li:text-sm sm:prose-li:text-base md:prose-li:text-lg prose-p:leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {item.answer}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

