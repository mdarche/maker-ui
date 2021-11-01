import * as React from 'react'
import {
  Div,
  DivProps,
  Button,
  generateId,
  useMeasure,
  mergeSelectors,
  MakerProps,
} from 'maker-ui'
import { useSpring, animated } from '@react-spring/web'

import { useAccordion } from './AccordionContext'
import { CaretIcon } from '../icons'

const AnimatedDiv = animated(Div)

export interface AccordionPanelProps extends Omit<DivProps, 'title'> {
  title?: string | React.ReactElement
  open?: boolean
  eventKey?: string
  _css?: MakerProps['css']
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
      className = '',
      _css,
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

    const { height } = useSpring({
      initial: { height: show ? viewHeight : 0 },
      from: { height: 0 },
      to: {
        height: show ? viewHeight : 0,
      },
      config: state.spring,
    })

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

    return (
      <Div
        ref={ref}
        className={mergeSelectors([
          `${show ? 'expanded ' : ''}accordion`,
          className,
        ])}
        css={{ border: '1px solid', ...(css as object) }}
        {...props}>
        <Button
          className={`${show ? 'active ' : ''}accordion-toggle`}
          title={`${show ? 'Collapse' : 'Expand'} content`}
          id={buttonId}
          aria-expanded={show ? 'true' : 'false'}
          aria-controls={panelId}
          onClick={setActive}
          css={{
            display: 'flex',
            justifyContent: state.icon ? 'space-between' : 'flex-start',
            alignItems: 'center',
            width: '100%',
            border: 'none',
            padding: '15px',
            cursor: 'pointer',
            ...(_css as object),
          }}>
          <div>
            {React.isValidElement(title) ? title : <span>{title}</span>}
          </div>
          {renderIcon()}
        </Button>
        <AnimatedDiv
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          style={{
            overflow: 'hidden',
            height,
          }}>
          <Div
            ref={measureRef}
            className="accordion-panel"
            css={{
              borderTop: `1px solid`,
            }}>
            {children}
          </Div>
        </AnimatedDiv>
      </Div>
    )
  }
)

AccordionPanel.displayName = 'AccordionPanel'
