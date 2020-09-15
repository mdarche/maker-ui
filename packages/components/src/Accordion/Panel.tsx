import React, { useState, useEffect } from 'react'
import { Div, DivProps, Button, generateId } from 'maker-ui'
import { useSpring, animated } from 'react-spring'

import { useAccordion } from './Accordion'
import { useMeasure } from '../helper'

export interface PanelProps extends DivProps {
  title?: string
  open?: boolean
  eventKey?: string
  borderColor?: string | string[]
}

/**
 * The `Panel` component wraps your collapsible accordion content.
 *
 * @todo - Refactor this by registering with context. Make event keys optional for hook control
 * @todo - Move all click and focus event handlers to functions outside of render
 *
 * @see https://maker-ui.com/docs/components/accordion-panel
 */

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
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
    const [state, setState] = useAccordion()
    const [show, set] = useState(
      state.showSingle && state.index === eventKey ? true : open
    )
    const [buttonId] = useState(generateId())
    const [panelId] = useState(generateId())
    const [bind, { height: viewHeight }] = useMeasure()

    useEffect(() => {
      if (state.showSingle) {
        return state.activeKey !== eventKey ? set(false) : set(true)
      }
    }, [state, eventKey, set])

    const { height } = useSpring({
      from: { height: 0 },
      to: {
        height: show ? viewHeight : 0,
      },
    })

    const setActive = () =>
      !show && state.showSingle
        ? setState(s => ({ ...s, activeKey: eventKey }))
        : set(!show)

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
          <span>{title}</span>
          {state.icon && (
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
          )}
        </Button>
        <animated.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          style={{
            willChange: 'height',
            overflow: 'hidden',
            height,
          }}>
          <div {...bind}>
            <Div
              className="accordion-panel"
              sx={{
                variant: `${variant}.panel`,
                borderTop: `1px solid ${borderColor}`,
              }}>
              {children}
            </Div>
          </div>
        </animated.div>
      </Div>
    )
  }
)
