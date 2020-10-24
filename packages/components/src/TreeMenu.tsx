import React, { useState, useContext } from 'react'
import {
  Div,
  DivProps,
  Span,
  Link,
  Button,
  MaybeElement,
  ResponsiveScale,
} from 'maker-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure, usePrevious } from './helper'
import { MinusIcon, PlusIcon, ExIcon } from './icons'

const TreeContext = React.createContext(null)

export interface TreeItemProps extends DivProps {
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

export const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  ({ text, link, newTab, open = false, sx, children, ...props }, ref) => {
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
      <Div
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
        <Button
          onClick={() => setOpen(!isOpen)}
          aria-label={text}
          aria-expanded={isOpen ? 'true' : 'false'}
          sx={{
            variant: `${variant}.button`,
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
          <Span
            className="tree-icon"
            sx={{
              variant: `${variant}.icon`,
              mr: clickableText && !link ? '10px' : undefined,
            }}>
            {children ? (isOpen ? collapse : expand) : neutral}
          </Span>
          {clickableText && !link && (
            <Span
              className="tree-text"
              sx={{ variant: `${variant}.text`, fontSize: 2 }}>
              {text}
            </Span>
          )}
        </Button>
        {link ? (
          <Link
            href={link}
            target={newTab && '_blank'}
            sx={{ variant: `${variant}.text`, ...sx }}>
            {text}
          </Link>
        ) : (
          <Span sx={{ variant: `${variant}.text`, ...sx }} {...props}>
            {!clickableText && text}
          </Span>
        )}
        {/* <Box
          as={link ? 'a' : 'span'}
          variant={`${variant}.text`}
          href={link && link}
          target={link && newTab && '_blank'}
          {...props}>
          {(!clickableText || link) && text}
        </Box> */}
        <a.div
          style={{
            // willChange: 'height',
            paddingLeft: indentation,
            overflow: 'hidden',
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}>
          <div {...bind}>{children}</div>
        </a.div>
      </Div>
    )
  }
)

export interface TreeMenuProps extends DivProps {
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

export const TreeMenu = React.forwardRef<HTMLDivElement, TreeMenuProps>(
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
      sx,
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
        <Div ref={ref} sx={{ variant, ...sx }} {...props} />
      </TreeContext.Provider>
    )
  }
)
