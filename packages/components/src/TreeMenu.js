import React, { useState, useContext } from 'react'
import { Box } from 'theme-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure, usePrevious } from './helper'
import { MinusIcon, PlusIcon, ExIcon } from './icons'

// TODO - reduce class generation by moving styles to variant

const TreeContext = React.createContext()

export const TreeItem = React.forwardRef(
  ({ text, link, newTab, open = false, children, ...props }, ref) => {
    const [isOpen, setOpen] = useState(open)
    const {
      clickableText,
      variant,
      collapse,
      expand,
      neutral,
      indentation,
    } = useContext(TreeContext)
    const previous = usePrevious(isOpen)
    const [bind, { height: viewHeight }] = useMeasure()

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
          display: link && 'flex',
          alignItems: link && 'center',
          position: 'relative',
          pt: '10px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
        }}>
        <Box
          as="button"
          onClick={() => setOpen(!isOpen)}
          variant={`${variant}.button`}
          aria-label={text}
          aria-expanded={isOpen ? 'true' : 'false'}
          sx={{
            display: !link && 'flex',
            alignItems: !link && 'center',
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
          }}>
          <Box
            as="span"
            variant={`${variant}.icon`}
            className="tree-icon"
            sx={{
              mr: clickableText && !link ? '10px' : undefined,
            }}>
            {children ? (isOpen ? collapse : expand) : neutral}
          </Box>
          {clickableText && !link && (
            <Box
              as="span"
              variant={`${variant}.text`}
              className="tree-text"
              sx={{ fontSize: 2 }}>
              {text}
            </Box>
          )}
        </Box>
        <Box
          as={link ? 'a' : 'span'}
          variant={`${variant}.text`}
          href={link && link}
          target={link && newTab && '_blank'}
          {...props}>
          {(!clickableText || link) && text}
        </Box>
        <a.div
          style={{
            willChange: 'height',
            paddingLeft: indentation,
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
      indentation = '20px', // Note for Docs - can be responsive array
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
      indentation,
      variant,
    })
    return (
      <TreeContext.Provider value={state}>
        <Box ref={ref} variant={variant} {...props} />
      </TreeContext.Provider>
    )
  }
)
