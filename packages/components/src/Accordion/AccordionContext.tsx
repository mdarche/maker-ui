import React, { useState, useContext } from 'react'

const AccordionContext = React.createContext(null)
const AccordionUpdateContext = React.createContext(null)

interface AccordionContextProps {
  icon?: boolean
  customIcons?: {
    expand?: JSX.Element | null
    collapse?: JSX.Element | null
  }
  defaultKey?: number
  showSingle?: boolean
  children: React.ReactElement
}

/**
 * Use the `Accordion` component to build and customize collapsible accordions.
 *
 * @see https://maker-ui.com/docs/components/accordion
 */

export const Context = ({
  icon = true,
  customIcons = { expand: null, collapse: null },
  defaultKey = 0,
  showSingle = false,
  children,
  ...props
}: AccordionContextProps) => {
  const [state, setState] = useState({
    activeKey: defaultKey,
    icon,
    customIcons,
    showSingle,
  })

  return (
    <AccordionContext.Provider value={state}>
      <AccordionUpdateContext.Provider value={setState}>
        {children}
      </AccordionUpdateContext.Provider>
    </AccordionContext.Provider>
  )
}

export function useAccordion() {
  const state = useContext(AccordionContext)
  const setState = useContext(AccordionUpdateContext)

  if (typeof state === undefined) {
    throw new Error('Panel must be used within an Accordion component')
  }

  return [state, setState]
}
