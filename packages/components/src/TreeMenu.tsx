import React, { useState, useContext } from 'react'
import { Box, BasicBoxProps, MaybeElement, ResponsiveScale } from 'maker-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure, usePrevious } from './helper'
import { MinusIcon, PlusIcon, ExIcon } from './icons'

const TreeContext = React.createContext(null)

export interface TreeItemProps extends BasicBoxProps {
  text?: string
  link?: string
  newTab?: boolean
  open?: boolean
}

/**
 * The `TreeItem` component is a direct child of `TreeMenu` and is used to wrap text, links,
 * or custom React components.
 *
 * @see https://maker-ui.com/docs/components/tree-item
 */

export const TreeItem = React.forwardRef<HTMLElement, TreeItemProps>(
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

export interface TreeMenuProps extends BasicBoxProps {
  buttons?: {
    expand?: MaybeElement
    collapse?: MaybeElement
    neutral?: MaybeElement
  }
  indentation?: ResponsiveScale
  clickableText?: boolean
}

/**
 * The `TreeMenu` component is a Provider for that controls styles and behaviors
 * for all child `TreeItem` components.
 *
 * @see https://maker-ui.com/docs/components/tree-menu
 */

export const TreeMenu = React.forwardRef<HTMLElement, TreeMenuProps>(
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
