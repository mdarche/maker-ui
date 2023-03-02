import React, { useState, useEffect, useContext, createContext } from 'react'
import { cn, merge, generateId } from '@maker-ui/utils'
import { Style, type MakerCSS } from '@maker-ui/style'

import { AccordionPanel } from './AccordionPanel'

interface AccordionClasses {
  /** Root Accordion component container */
  group?: string
  /** Accordion panel outer wrapper. This class handles the collapsing functionality. */
  panel?: string
  /** Accordion panel inner wrapper. This wraps your `Accordion.Panel` child content. */
  panelInner?: string
  /** The outermost wrapper for the `Accordion.Panel` component. */
  panelGroup?: string
  /** The `Accordion.Panel` button. */
  button?: string
}

export interface AccordionProps
  extends MakerCSS,
    React.HtmlHTMLAttributes<HTMLDivElement> {
  /** If true, the Accordion button will render an icon that shows expand / collapse status.
   * @default true
   */
  icon?: boolean
  /** An optional icon, set of icons, or callback function that can be used to supply a custom
   * accordion toggle icon.
   */
  customIcon?:
    | React.ReactElement
    | {
        expand: React.ReactElement
        collapse: React.ReactElement
      }
    | ((isExpanded: boolean) => React.ReactNode)
  /** A custom class name to apply to the accordion button when it is active.
   * @default 'expanded'
   */
  activeClass?: string
  /** The currently active accordion panel key if controlled by an external or parent component.
   * Make sure the key exists as an `eventKey` prop on a nested `<Accordion.Panel>`.
   */
  activeKey?: number | string
  /** If true, the accordion will only display one open panel at a time.
   * @default false
   */
  showSingle?: boolean
  /** If true or if you supply a configuration object, the accordion will add a
   * CSS transition to the accordion panel's height. NOTE: Animating height will force a repaint
   * that may affect your app's performance.
   * @default false
   */
  animate?: boolean | string
  /** Custom class selectors for all accordion HTML elements. */
  classNames?: AccordionClasses
  /** Nested AccordionPanel children. */
  children?: React.ReactElement[] | React.ReactNode
}

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
  css = {},
  breakpoints,
  mediaQuery,
  animate = false,
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

  useEffect(() => {
    setState((state) => ({ ...state, activeKey }))
  }, [activeKey])

  return (
    <AccordionContext.Provider value={{ state, setState }}>
      <Style
        root={state.id}
        breakpoints={breakpoints}
        mediaQuery={mediaQuery}
        css={merge(
          {
            button: {
              border: 'none',
              cursor: 'pointer',
            },
            '.mkui-accordion-panel': {
              overflow: 'hidden',
              willChange: animate ? 'height' : undefined,
              transition:
                animate && typeof animate === 'string'
                  ? animate
                  : animate
                  ? 'height 0.3s ease 0s'
                  : undefined,
            },
          },
          css
        )}
      />
      <div
        className={cn([
          'mkui-accordion-group',
          state.classNames?.group,
          state.id,
          className,
        ])}
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
