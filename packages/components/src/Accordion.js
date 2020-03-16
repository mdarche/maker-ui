import React, { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { useSpring, animated } from 'react-spring'

import { useAccordion } from './AccordionGroup'
import { useMeasure, generateId } from './helper'

const Accordion = React.forwardRef(
  (
    {
      title,
      open = false,
      eventKey,
      variant = 'accordion',
      borderColor = '#dedede',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [state, setState] = useAccordion()
    const [show, set] = useState(
      state.single && state.index === eventKey ? true : open
    )
    const [bind, { height: viewHeight }] = useMeasure()
    const buttonId = generateId()
    const panelId = generateId()

    useEffect(() => {
      if (state.single) {
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
      !show && state.single
        ? setState(s => ({ ...s, activeKey: eventKey }))
        : set(!show)

    return (
      <Box
        ref={ref}
        variant={variant}
        className={`${show ? 'expanded ' : ''}accordion ${className}`}
        {...props}
        __css={{ border: `1px solid` }}>
        <Box
          as="button"
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
                <Box
                  as="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  sx={{
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
                </Box>
              )}
            </span>
          )}
        </Box>
        <animated.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          style={{
            willChange: 'height',
            overflow: 'hidden',
            height,
          }}>
          <Box {...bind}>
            <Box
              className="accordion-panel"
              variant={`${variant}.panel`}
              sx={{ borderTop: `1px solid ${borderColor}` }}>
              {children}
            </Box>
          </Box>
        </animated.div>
      </Box>
    )
  }
)

export default Accordion
