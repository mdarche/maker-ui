import React, { useState, useRef, useEffect } from 'react'
import { Button, Span, Link, Div, DivProps } from 'maker-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure } from '../_hooks'
import { useTreeData } from './TreeContext'

function usePrevious(value: any): any {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export interface TreeItemProps extends DivProps {
  text?: string
  link?: string
  newTab?: boolean
  open?: boolean
}

/**
 * The `TreeBranch` component is a direct child of `TreeMenu` and is used to wrap text, links,
 * or custom React components.
 *
 * @see https://maker-ui.com/docs/components/tree-menu
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
    } = useTreeData()

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
        className="tree-branch"
        sx={{
          display: link && 'flex',
          alignItems: link && 'center',
          position: 'relative',
          pt: '10px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          '.tree-branch-inner': {
            pl: indentation,
          },
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
          {clickableText && !link ? (
            <Span
              className="tree-text"
              sx={{ variant: `${variant}.text`, fontSize: 2 }}>
              {text}
            </Span>
          ) : null}
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
        <a.div
          className="tree-branch-inner"
          style={{
            overflow: 'hidden',
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}>
          <div {...bind}>{children}</div>
        </a.div>
      </Div>
    )
  }
)
