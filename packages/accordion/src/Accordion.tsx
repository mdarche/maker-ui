import React, { useState, useEffect, useContext, createContext } from 'react'
import { cn, generateId, cleanObject, formatNumber } from '@maker-ui/utils'

import { AccordionPanel } from './AccordionPanel'
import type { AccordionProps } from './types'

interface AccordionState extends Omit<AccordionProps, 'children'> {
  id: string
  panelKeys: string[]
}

const AccordionContext = createContext<{
  state: Partial<AccordionState>
  setState: React.Dispatch<React.SetStateAction<AccordionState>>
}>({ state: { panelKeys: [] }, setState: (b) => {} })

/**
 * The `Accordion` shows collapsible panel content that can be toggled via
 * `activeKey` prop or the panel title buttle.
 *
 * @link https://maker-ui.com/docs/elements/accordion
 */
export const Accordion = ({
  icon = true,
  customIcon,
  activeKey = 0,
  activeClass = 'expanded',
  showSingle = false,
  className,
  classNames,
  animate = false,
  styles,
  children,
  ...props
}: AccordionProps) => {
  const [state, setState] = useState<AccordionState>({
    id: generateId(),
    activeKey,
    activeClass,
    classNames,
    panelKeys: [],
    icon,
    customIcon,
    showSingle,
    animate,
  })

  if (!children) {
    throw new Error(
      'Accordion must contain a nested Accordion.Panel component.'
    )
  }

  useEffect(() => {
    setState((state) => ({ ...state, activeKey }))
  }, [activeKey])

  const variables = cleanObject({
    // Button Styles
    '--accordion-btn-color': styles?.button?.color,
    '--accordion-btn-bg': styles?.button?.background,
    '--accordion-btn-border': styles?.button?.border,
    '--accordion-btn-padding': formatNumber(styles?.button?.padding),
    '--accordion-btn-font-size': formatNumber(styles?.button?.fontSize),
    '--accordion-btn-font-family': styles?.button?.fontFamily,
    '--accordion-btn-color-active': styles?.button?.colorActive,
    '--accordion-btn-bg-active': styles?.button?.backgroundActive,
    '--accordion-btn-border-active': styles?.button?.borderActive,
    '--accordion-icon-fill': styles?.icon?.fill,
    '--accordion-icon-fill-active': styles?.icon?.fillActive,
    '--accordion-icon-height': formatNumber(styles?.icon?.height),
    // Panel Styles
    '--accordion-panel-bg': styles?.panel?.background,
    '--accordion-panel-padding': formatNumber(styles?.panel?.padding),
    '--accordion-panel-font-size': formatNumber(styles?.panel?.fontSize),
  })

  return (
    <AccordionContext.Provider value={{ state, setState }}>
      <div
        className={cn([
          'mkui-accordion-group',
          state.classNames?.group,
          className,
        ])}
        style={variables}
        {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

Accordion.displayName = 'Accordion'
Accordion.Panel = AccordionPanel

export function useAccordion() {
  const { state, setState } = useContext(AccordionContext)

  if (typeof state === undefined) {
    throw new Error(
      'Accordion.Panel must be used within an Accordion component'
    )
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
