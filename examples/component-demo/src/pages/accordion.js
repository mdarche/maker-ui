import React from 'react'
import { AccordionGroup, Accordion, CookieNotice } from '@maker-ui/components'

const AccordionPage = () => (
  <React.Fragment>
    <AccordionGroup
      single
      sx={{
        '.accordion': { borderColor: 'gainsboro' },
        '.accordion-toggle': {
          fontSize: 3,
          bg: '#efeded',
          '&.active': { bg: '#ecf9ff' },
        },
        '.accordion-panel': { p: 100 },
      }}>
      <Accordion title="Accordion Title" eventKey={0}>
        Yo!
      </Accordion>
      <Accordion title="Accordion Title" eventKey={1}>
        Yo 2!
      </Accordion>
      <Accordion title="Accordion Title" eventKey={2}>
        Yo 3!
      </Accordion>
    </AccordionGroup>
  </React.Fragment>
)

export default AccordionPage
