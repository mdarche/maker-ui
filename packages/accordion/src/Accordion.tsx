import * as React from 'react'
import { cn, generateId } from '@maker-ui/utils'
import { Style, type Breakpoints, type ResponsiveCSS } from '@maker-ui/style'
import { AccordionPanel } from './AccordionPanel'

export interface AccordionProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  css?: ResponsiveCSS
  breakpoints?: Breakpoints
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
  animate?: boolean | { transition: string }
}

interface AccordionState extends Omit<AccordionProps, 'children'> {
  id: string
  panelKeys: string[]
}

const AccordionContext = React.createContext<{
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
  showSingle = false,
  className,
  css,
  breakpoints,
  animate = false,
  children,
  ...props
}: AccordionProps) => {
  const [state, setState] = React.useState<AccordionState>({
    id: generateId(),
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
    <AccordionContext.Provider value={{ state, setState }}>
      <Style
        root={state.id}
        breakpoints={breakpoints}
        css={{
          '.mkui_accordion_btn': {
            border: 'none',
            padding: 15,
            cursor: 'pointer',
          },
          '.mkui_accordion_panel': {
            overflow: 'hidden',
            willChange: animate ? 'height' : undefined,
            transition:
              animate && typeof animate === 'object'
                ? animate.transition
                : animate
                ? 'height 0.3s ease'
                : undefined,
          },
          ...css,
        }}
      />
      <div
        className={cn(['mkui_accordion_group', state.id, className])}
        {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

Accordion.displayName = 'Accordion'
Accordion.Panel = AccordionPanel

export function useAccordion() {
  const { state, setState } = React.useContext(AccordionContext)

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
