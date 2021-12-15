import * as React from 'react'
import {
  Div,
  DivProps,
  Button,
  generateId,
  useMeasure,
  mergeSelectors,
  StyleObject,
} from 'maker-ui'

import { useAccordion } from './AccordionContext'
import { CaretIcon } from './icons'

export interface AccordionPanelProps extends Omit<DivProps, 'title'> {
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
  /** Optional styles for the accordion button */
  buttonCss?: StyleObject
}

/**
 * The `AccordionPanel` component wraps all collapsible accordion content.
 *
 * @link https://maker-ui.com/docs/elements/accordion-panel
 */

export const AccordionPanel = React.forwardRef<
  HTMLDivElement,
  AccordionPanelProps
>(
  (
    {
      title,
      open = false,
      eventKey,
      children,
      className,
      buttonCss,
      css,
      ...props
    },
    ref
  ) => {
    const [buttonId] = React.useState(generateId())
    const [panelId] = React.useState(generateId())
    const [panelKey] = React.useState(() =>
      eventKey ? eventKey : generateId()
    )
    const { state, registerPanel, setActivePanel } = useAccordion()

    /**
     * @todo - Add default support for an initial `open` when showSingle is active too
     * @todo - Support `eventKey` in any scenario, not just showSingle
     */

    const [show, set] = React.useState(
      state.showSingle && state.activeKey === eventKey ? true : open
    )
    const [measureRef, { height: viewHeight }] = useMeasure()

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
      <Div
        ref={ref}
        className={mergeSelectors([
          show ? 'expanded ' : undefined,
          'accordion',
          className,
        ])}
        css={{ border: '1px solid', ...(css as object) }}
        {...props}>
        <Button
          className={mergeSelectors([
            'accordion-toggle',
            show ? 'active' : undefined,
          ])}
          title={`${show ? 'Collapse' : 'Expand'} content`}
          id={buttonId}
          aria-expanded={show ? 'true' : 'false'}
          aria-controls={panelId}
          onClick={setActive}
          css={{
            display: 'flex',
            justifyContent: state.icon ? 'space-between' : undefined,
            alignItems: 'center',
            width: '100%',
            border: 'none',
            padding: '15px',
            cursor: 'pointer',
            ...(buttonCss as object),
          }}>
          <div>
            {React.isValidElement(title) ? title : <span>{title}</span>}
          </div>
          {renderIcon()}
        </Button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          style={{
            overflow: 'hidden',
            height: show ? viewHeight : 0,
            willChange: isAnimated ? 'height' : undefined,
            transition:
              isAnimated && typeof state.animate === 'object'
                ? state.animate.transition
                : isAnimated
                ? 'height 0.3s ease'
                : undefined,
          }}>
          <div ref={measureRef} className="accordion-panel">
            {children}
          </div>
        </div>
      </Div>
    )
  }
)

AccordionPanel.displayName = 'AccordionPanel'
