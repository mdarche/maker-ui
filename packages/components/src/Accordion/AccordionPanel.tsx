import * as React from 'react'
import { Div, DivProps, Button, generateId } from 'maker-ui'
import { useSpring, animated as a } from 'react-spring'

import { useAccordion } from './AccordionContext'
import { useMeasure } from '../_hooks'

const AnimatedDiv = a(Div)

export interface AccordionPanelProps extends Omit<DivProps, 'title'> {
  title?: string | React.ReactElement
  open?: boolean
  eventKey?: string
  borderColor?: string | string[]
}

/**
 * The `AccordionPanel` component wraps all collapsible accordion content.
 *
 * @see https://maker-ui.com/docs/components/accordion-panel
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
      variant = 'accordion',
      borderColor = '#dedede',
      children,
      className = '',
      sx,
      ...props
    },
    ref
  ) => {
    const { state, registerPanel, setActivePanel } = useAccordion()
    const [show, set] = React.useState(
      state.showSingle && state.index === eventKey ? true : open
    )
    const [buttonId] = React.useState(generateId())
    const [panelId] = React.useState(generateId())
    const [panelKey] = React.useState(() =>
      eventKey ? eventKey : generateId()
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
      from: { height: 0 },
      to: {
        height: show ? viewHeight : 0,
      },
    })

    const setActive = () =>
      !show && state.showSingle ? setActivePanel(panelKey) : set(!show)

    return (
      <Div
        ref={ref}
        className={`${show ? 'expanded ' : ''}accordion ${className}`}
        sx={{ variant, border: '1px solid', ...sx }}
        {...props}>
        <Button
          title={`${show ? 'Collapse' : 'Expand'} content`}
          id={buttonId}
          aria-expanded={show ? 'true' : 'false'}
          aria-controls={panelId}
          className={`${show ? 'active ' : ''}accordion-toggle`}
          variant={`${variant}.toggle`}
          onClick={setActive}
          sx={{
            display: 'flex',
            justifyContent: state.icon ? 'space-between' : 'flex-start',
            alignItems: 'center',
            width: '100%',
            border: 'none',
            p: 3,
            cursor: 'pointer',
          }}>
          {React.isValidElement(title) ? title : <span>{title}</span>}
          {state.icon ? (
            <span>
              {state.customIcons.expand !== null ? (
                show ? (
                  state.customIcons.collapse
                ) : (
                  state.customIcons.expand
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
            // @ts-ignore
            willChange: 'height',
            overflow: 'hidden',
            height,
          }}>
          <div {...bind}>
            <Div
              className="accordion-panel"
              sx={{
                borderTop: `1px solid ${borderColor}`,
                variant: `${variant}.panel`,
              }}>
              {children}
            </Div>
          </div>
        </AnimatedDiv>
      </Div>
    )
  }
)

AccordionPanel.displayName = 'AccordionPanel'
