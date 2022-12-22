'use client'
import { Section } from '@maker-ui/layout'
import { Accordion } from '@maker-ui/accordion'

export default function SocialPage() {
  return (
    <Section>
      <Accordion>
        <Accordion.Panel title="Button info">Sample test</Accordion.Panel>
      </Accordion>
      {/* <div className="accordion">
        <details>
          <summary>Panel</summary>
          <p>Here is the content that is open by default!</p>
        </details>
        <details>
          <summary>Panel</summary>
          <p>Here is the content that is open by default!</p>
        </details>
        <details>
          <summary>Panel</summary>
          <p>Here is the content that is open by default!</p>
        </details>
      </div> */}
    </Section>
  )
}
