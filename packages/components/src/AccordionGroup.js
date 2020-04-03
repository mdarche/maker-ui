import React, { useState, useContext } from 'react'
import { Box } from 'theme-ui'

const AccordionContext = React.createContext()
const AccordionUpdateContext = React.createContext()

const AccordionGroup = ({
  children,
  icon = true,
  customIcons = { expand: null, collapse: null },
  defaultKey = 0,
  showSingle = false,
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
    throw new Error('Accordion must be used within an AccordionGroup component')
  }

  return [state, setState]
}

export default AccordionGroup
