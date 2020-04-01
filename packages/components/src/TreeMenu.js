import React, { useState, useContext } from 'react'
import { Box } from 'theme-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure, usePrevious } from './helper'
import { MinusIcon, PlusIcon, ExIcon } from './icons'

const TreeContext = React.createContext()

export const TreeItem = React.forwardRef(
  ({ text, link, newTab, open = false, children, ...props }, ref) => {
    const [isOpen, setOpen] = useState(open)
    const state = useContext(TreeContext)
    const previous = usePrevious(isOpen)
    const [bind, { height: viewHeight }] = useMeasure()

    console.log(state)

    const { height } = useSpring({
      from: { height: 0 },
      to: {
        height: isOpen ? viewHeight : 0,
      },
    })

    return (
      <Box
        ref={ref}
        className="tree-item"
        sx={{
          position: 'relative',
          pt: '5px',
          pl: '5px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
        }}>
        <Box
          as="button"
          onClick={() => setOpen(!isOpen)}
          aria-label={text}
          aria-expanded={isOpen ? 'true' : 'false'}
          sx={{
            background: 'none',
            border: 'none',
            p: 0,
            mr: '10px',
            cursor: 'pointer',
            color: 'primary',
            svg: {
              height: '16px',
              fill: 'currentColor',
            },
            verticalAlign: 'middle',
          }}>
          <Box as="span" className="tree-icon">
            {children
              ? isOpen
                ? state.collapse
                : state.expand
              : state.neutral}
          </Box>
          {state.clickableText && !link && (
            <Box as="span" className="tree-text">
              {text}
            </Box>
          )}
        </Box>
        <Box
          as={link ? 'a' : 'span'}
          href={link && link}
          target={link && newTab && '_blank'}
          {...props}>
          {(!state.clickableText || link) && text}
        </Box>
        <a.div
          style={{
            willChange: 'height',
            paddingLeft: 10,
            overflow: 'hidden',
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}>
          <Box {...bind}>{children}</Box>
        </a.div>
      </Box>
    )
  }
)

export const TreeMenu = React.forwardRef(
  (
    {
      variant = 'tree',
      buttons = {
        expand: <PlusIcon />,
        collapse: <MinusIcon />,
        neutral: <ExIcon />,
      },
      clickableText = false,
      ...props
    },
    ref
  ) => {
    const [state] = useState({
      expand: buttons.expand,
      collapse: buttons.collapse,
      neutral: buttons.neutral,
      clickableText,
    })
    return (
      <TreeContext.Provider value={state}>
        <Box ref={ref} variant={variant} {...props} />
      </TreeContext.Provider>
    )
  }
)
