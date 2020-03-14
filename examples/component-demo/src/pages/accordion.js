import React from 'react'
import { Accordion } from '@elements-ui/components'

const IndexPage = () => (
  <React.Fragment>
    <Accordion
      title="Accordion Title"
      open
      indicator
      sx={{ '.accordion-panel': { p: 100 } }}>
      Yo!
    </Accordion>
  </React.Fragment>
)

export default IndexPage
