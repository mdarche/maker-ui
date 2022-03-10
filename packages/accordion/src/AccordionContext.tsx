import * as React from 'react'
import { AccordionProps } from './Accordion'

interface AccordionContextProps extends AccordionProps {
  children: React.ReactElement
}

interface AccordionState extends Omit<AccordionProps, 'children'> {
  panelKeys: string[]
}

const AccordionDataContext = React.createContext<Partial<AccordionState>>({})
const AccordionUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<AccordionState>>
>(() => {})

/**
 * Use the `Accordion` component to build and customize collapsible accordions.
 *
 * @internal usage only
 */

export const AccordionContext = ({
  icon,
  customIcon,
  activeKey,
  showSingle,
  animate,
  children,
}: AccordionContextProps) => {
  const [state, setState] = React.useState<AccordionState>({
    activeKey,
    panelKeys: [],
    icon,
    customIcon,
    showSingle,
    animate,
  })

  React.useEffect(() => {
    setState((state) => ({ ...state, activeKey }))
  }, [activeKey])

  return (
    <AccordionDataContext.Provider value={state}>
      <AccordionUpdateContext.Provider value={setState}>
        {children}
      </AccordionUpdateContext.Provider>
    </AccordionDataContext.Provider>
  )
}

AccordionContext.displayName = 'AccordionContext'

export function useAccordion() {
  const state = React.useContext(AccordionDataContext)
  const setState = React.useContext(AccordionUpdateContext)

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
