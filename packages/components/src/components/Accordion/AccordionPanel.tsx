import * as React from 'react'
import {
  Div,
  DivProps,
  Button,
  generateId,
  useMeasure,
  setClassName,
} from 'maker-ui'
import { useSpring, animated } from 'react-spring'

import { useAccordion } from './AccordionContext'

const AnimatedDiv = animated(Div)

export interface AccordionPanelProps extends Omit<DivProps, 'title'> {
  title?: string | React.ReactElement
  open?: boolean
  eventKey?: string
  borderColor?: string | string[]
}

/**
 * The `AccordionPanel` component wraps all collapsible accordion content.
 *
 * @link https://maker-ui.com/docs/components/accordion-panel
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
      borderColor = '#dedede',
      children,
      className = '',
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
    const [show, set] = React.useState(
      state.showSingle && state.activeKey === eventKey ? true : open
    )
    const [bind, { height: viewHeight }] = useMeasure()

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
      config: state.springConfig,
    })

    const setActive = () =>
      !show && state.showSingle ? setActivePanel(panelKey) : set(!show)

    return (
      <Div
        ref={ref}
        className={setClassName(
          `${show ? 'expanded ' : ''}accordion`,
          className
        )}
        css={{ border: '1px solid', ...(css as object) }}
        {...props}>
        <Button
          title={`${show ? 'Collapse' : 'Expand'} content`}
          id={buttonId}
          aria-expanded={show ? 'true' : 'false'}
          aria-controls={panelId}
          className={`${show ? 'active ' : ''}accordion-toggle`}
          onClick={setActive}
          css={{
            display: 'flex',
            justifyContent: state.icon ? 'space-between' : 'flex-start',
            alignItems: 'center',
            width: '100%',
            border: 'none',
            padding: '15px',
            cursor: 'pointer',
          }}>
          {React.isValidElement(title) ? title : <span>{title}</span>}
          {state.icon ? (
            <span>
              {state.customIcons?.expand !== undefined ? (
                show ? (
                  state.customIcons?.collapse
                ) : (
                  state?.customIcons?.expand
                )
              ) : (
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
              )}
            </span>
          ) : null}
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
            {...bind}
            className="accordion-panel"
            css={{
              borderTop: `1px solid ${borderColor}`,
            }}>
            {children}
          </Div>
        </AnimatedDiv>
      </Div>
    )
  }
)

AccordionPanel.displayName = 'AccordionPanel'
