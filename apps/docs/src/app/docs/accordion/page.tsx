'use client'

import { Accordion } from 'maker-ui/accordion'

export default function AccordionPage() {
  return (
    <>
      <Accordion
        showSingle
        animate="height ease-in-out 0.2s"
        styles={{ button: { background: 'gainsboro' } }}>
        <Accordion.Panel title="Button info">Sample test</Accordion.Panel>
        <Accordion.Panel title="Second info">Test test</Accordion.Panel>
        <Accordion.Panel title="Another info">Test test</Accordion.Panel>
      </Accordion>
    </>
  )
}
