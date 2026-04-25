'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'

interface FAQItem {
  q: string
  a: string
}

interface Props {
  items: FAQItem[]
}

export default function TrustCenterFAQ({ items }: Props) {
  return (
    <div className="tc-faq__items">
      <AccordionPrimitive.Root type="single" collapsible>
        {items.map((item, i) => (
          <AccordionPrimitive.Item
            key={i}
            value={`item-${i}`}
            className="tc-faq__item"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="tc-faq__q">
                <span className="tc-faq__q-text">{item.q}</span>
                <span className="tc-faq__icon" aria-hidden="true" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="tc-faq__answer-wrap">
              <p className="tc-faq__a">{item.a}</p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  )
}
