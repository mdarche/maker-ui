import React, { useState, useContext } from 'react'
import { Box } from 'theme-ui'

import AccordionPanel from './AccordionPanel'

const AccordionContext = React.createContext()
const AccordionUpdateContext = React.createContext()

const Accordion = ({
  icon = true,
  customIcons = { expand: null, collapse: null },
  defaultKey = 0,
  showSingle = false,
  children,
  ...props
}) => {
  const [state, setState] = useState({
    activeKey: defaultKey,
    icon,
    customIcons,
    showSingle,
  })

  return (
    <AccordionContext.Provider value={state}>
      <AccordionUpdateContext.Provider value={setState}>
        <Box {...props}>{children}</Box>
      </AccordionUpdateContext.Provider>
    </AccordionContext.Provider>
  )
}

export function useAccordion() {
  const state = useContext(AccordionContext)
  const setState = useContext(AccordionUpdateContext)

  if (typeof state === undefined) {
    throw new Error('AccordionPanel must be used within an Accordion component')
  }

  return [state, setState]
}

Accordion.Panel = AccordionPanel

export default Accordion
