import { Section } from 'maker-ui/layout'
import { Accordion, AccordionPanel as Panel } from 'maker-ui/accordion'
import 'maker-ui/accordion.css'

export default function SocialPage() {
  return (
    <Section>
      <Accordion
        showSingle
        animate="height ease-in-out 0.2s"
        styles={{ button: { bg: 'gainsboro' } }}>
        <Panel title="Button info">Sample test</Panel>
        <Panel title="Second info">Test test</Panel>
        <Panel title="Another info">Test test</Panel>
      </Accordion>
    </Section>
  )
}
