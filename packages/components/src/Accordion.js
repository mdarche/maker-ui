import React, { useState } from 'react'
import { Box } from 'theme-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure, generateId } from './helper'

const Accordion = React.forwardRef(
  (
    {
      title,
      open = false,
      indicator = false,
      variant = 'accordion',
      borderColor = '#dedede',
      children,
      ...props
    },
    ref
  ) => {
    const [show, set] = useState(open)
    const [bind, { height: viewHeight }] = useMeasure()
    const buttonId = generateId()
    const panelId = generateId()

    const { height } = useSpring({
      from: { height: 0 },
      to: {
        height: show ? viewHeight : 0,
      },
    })

    return (
      <Box
        ref={ref}
        variant={variant}
        {...props}
        __css={{ border: `1px solid ${borderColor}` }}>
        <Box
          as="button"
          title={`${show ? 'Collapse' : 'Expand'} content`}
          id={buttonId}
          aria-expanded={show ? 'true' : 'false'}
          aria-controls={panelId}
          className="accordion-toggle"
          variant={`${variant}.toggle`}
          onClick={() => set(!show)}
          sx={{
            display: 'flex',
            justifyContent: indicator ? 'space-between' : 'flex-start',
            alignItems: 'center',
            width: '100%',
            border: 'none',
            p: 3,
            cursor: 'pointer',
          }}>
          <span>{title}</span>
          {indicator && (
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
                stroke-miterlimit="10"
                stroke-width="2"
                d="M21 8.5l-9 9-9-9"
              />
            </Box>
          )}
        </Box>
        <a.div
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
        </a.div>
      </Box>
    )
  }
)

export default Accordion
