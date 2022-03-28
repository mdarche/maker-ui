import React, { createContext, useEffect, useState, useContext } from 'react'
import { AccordionProps } from './Accordion'

interface AccordionContextProps extends AccordionProps {
  children: React.ReactElement
}

interface AccordionState extends Omit<AccordionProps, 'children'> {
  panelKeys: string[]
}

const AccordionDataContext = createContext<{
  state: Partial<AccordionState>
  setState: React.Dispatch<React.SetStateAction<AccordionState>>
}>({ state: { panelKeys: [] }, setState: (b) => {} })

/**
 * Use the `Accordion` component to build and customize collapsible accordions.
 *
 * @internal
 */

export const AccordionContext = ({
  icon,
  customIcon,
  activeKey,
  showSingle,
  animate,
  children,
}: AccordionContextProps) => {
  const [state, setState] = useState<AccordionState>({
    activeKey,
    panelKeys: [],
    icon,
    customIcon,
    showSingle,
    animate,
  })

  useEffect(() => {
    setState((state) => ({ ...state, activeKey }))
  }, [activeKey])

  return (
    <AccordionDataContext.Provider value={{ state, setState }}>
      {children}
    </AccordionDataContext.Provider>
  )
}

AccordionContext.displayName = 'AccordionContext'

export function useAccordion() {
  const { state, setState } = useContext(AccordionDataContext)

  if (typeof state === undefined) {
    throw new Error('Panel must be used within an Accordion component')
  }

  function registerPanel(id: string) {
    const exists = state.panelKeys
      ? state.panelKeys.find((t) => t === id)
      : false

    if (!exists) {
      setState((s) => ({
        ...s,
        panelKeys: [...s.panelKeys, id],
      }))
    }
  }

  function setActivePanel(id: string) {
    setState((s) => ({ ...s, activeKey: id }))
  }

  return { state, registerPanel, setActivePanel }
}
