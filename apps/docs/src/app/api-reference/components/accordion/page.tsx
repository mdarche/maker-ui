'use client'

import { Section } from 'maker-ui/layout'
import { Accordion } from 'maker-ui/accordion'
import { Demo } from '@/components'
import Example1 from './_examples/example-1.mdx'

export default function AccordionPage() {
  return (
    <Section className="demo-section">
      <h2>Demo</h2>
      <Demo
        topic="Animated accordion with custom styles"
        markdown={<Example1 />}
        component={
          <Accordion
            showSingle
            animate="height ease-in-out 0.2s"
            styles={{
              button: {
                color: 'var(--color-primary',
                colorActive: 'var(--color-secondary)',
                bg: 'var(--color-gray-100)',
                border: '1px solid var(--color-border-200)',
              },
            }}>
            <Accordion.Panel title="Button #1">Panel text</Accordion.Panel>
            <Accordion.Panel title="Button #2">Panel text</Accordion.Panel>
            <Accordion.Panel title="Button #3">Panel text</Accordion.Panel>
          </Accordion>
        }
      />
    </Section>
  )
}
