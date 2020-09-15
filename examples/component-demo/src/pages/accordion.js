import React from 'react'
import { Accordion, Panel } from '@maker-ui/components'

const AccordionPage = () => (
  <React.Fragment>
    <Accordion
      showSingle
      sx={{
        '.accordion': { borderColor: 'gainsboro' },
        '.accordion-toggle': {
          fontSize: 3,
          bg: '#efeded',
          '&.active': { bg: '#ecf9ff' },
        },
        '.accordion-panel': { p: 100 },
      }}>
      <Panel title="Accordion Title" eventKey={0}>
        Yo!
      </Panel>
      <Panel title="Accordion Title" eventKey={1}>
        Yo 2!
      </Panel>
      <Panel title="Accordion Title" eventKey={2}>
        Yo 3!
      </Panel>
    </Accordion>
  </React.Fragment>
)

export default AccordionPage
