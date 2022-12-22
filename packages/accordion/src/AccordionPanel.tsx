import * as React from 'react'
import { generateId, useMeasure, cn } from '@maker-ui/utils'

import { useAccordion } from './Accordion'

export interface AccordionPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** A title string or custom React element that will be used as the Accordion Button
   * for this panel.
   */
  title?: string | React.ReactElement
  /** If true, the panel will be open by default
   * @default false
   */
  open?: boolean
  /** A unique key that can toggle the panel open and close from an external component. */
  eventKey?: string
}

/**
 * The `AccordionPanel` component wraps all collapsible accordion content.
 *
 * @link https://maker-ui.com/docs/elements/accordion-panel
 */
export const AccordionPanel = React.forwardRef<
  HTMLDivElement,
  AccordionPanelProps
>(({ title, open = false, eventKey, children, className, ...props }, ref) => {
  const [buttonId] = React.useState(generateId())
  const [panelId] = React.useState(generateId())
  const [panelKey] = React.useState(() => (eventKey ? eventKey : generateId()))
  const { state, registerPanel, setActivePanel } = useAccordion()

  /**
   * @todo - Add default support for an initial `open` when showSingle is active too
   * @todo - Support `eventKey` in any scenario, not just showSingle
   */
  const [show, set] = React.useState(
    state.showSingle && state.activeKey === eventKey ? true : open
  )
  const [measure, { height: viewHeight }] = useMeasure()

  React.useEffect(() => {
    registerPanel(panelKey)
  }, [registerPanel, panelKey])

  React.useEffect(() => {
    if (state.showSingle) {
      return state.activeKey !== panelKey ? set(false) : set(true)
    }
  }, [state, eventKey, panelKey, set])

  const setActive = () =>
    !show && state.showSingle ? setActivePanel(panelKey) : set(!show)

  function renderIcon() {
    if (state.icon) {
      if (React.isValidElement(state.customIcon)) {
        return state.customIcon
      }

      if (typeof state.customIcon === 'object') {
        return show ? state.customIcon?.collapse : state.customIcon?.expand
      }

      if (typeof state.customIcon === 'function') {
        return state.customIcon(show)
      }

      return <CaretIcon show={show} />
    }
    return null
  }

  const isAnimated = state.animate

  return (
    <div
      ref={ref}
      className={cn([
        show ? 'expanded ' : undefined,
        'mkui_accordion',
        className,
      ])}
      {...props}>
      <button
        className={cn([
          'mkui_accordion_btn',
          'flex align-center width-100',
          state.icon ? 'justify-between' : undefined,
          show ? 'active' : undefined,
        ])}
        title={`${show ? 'Collapse' : 'Expand'} content`}
        id={buttonId}
        aria-expanded={show ? 'true' : 'false'}
        aria-controls={panelId}
        onClick={setActive}>
        <div>{React.isValidElement(title) ? title : <span>{title}</span>}</div>
        {renderIcon()}
      </button>
      <div
        id={panelId}
        role="region"
        className="mkui_accordion_panel"
        aria-labelledby={buttonId}
        style={{
          height: show ? (isAnimated ? viewHeight : '100%') : 0,
        }}>
        <div ref={measure} className="mkui_accordion_inner">
          {children}
        </div>
      </div>
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'

/**
 * Default Caret Icon for the accordion
 */
const CaretIcon = ({ show }: { show: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{
      width: 15,
      transition: 'all ease .3s',
      transform: !show ? 'rotate(0)' : 'rotate(180deg)',
    }}>
    <path
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M21 8.5l-9 9-9-9"
    />
  </svg>
)
