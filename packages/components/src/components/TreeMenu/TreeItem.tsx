import * as React from 'react'
import { Button, Span, Link, Div, DivProps, useMeasure } from 'maker-ui'
import { useSpring, animated } from 'react-spring'

import { useTreeData } from './TreeContext'

function usePrevious(value: any): any {
  const ref = React.useRef()
  React.useEffect(() => void (ref.current = value), [value])
  return ref.current
}

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
 * @see https://maker-ui.com/docs/components/tree-menu
 */

export const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  ({ text, link, newTab, open = false, sx, children, ...props }, ref) => {
    const [isOpen, setOpen] = React.useState(open)
    const {
      clickableText,
      collapse,
      expand,
      neutral,
      indentation,
      springConfig,
    } = useTreeData()

    const previous = usePrevious(isOpen)
    const [bind, { height: viewHeight }] = useMeasure()

    const { height } = useSpring({
      from: { height: 0 },
      to: {
        height: isOpen ? viewHeight : 0,
      },
      config: springConfig,
    })

    return (
      <Div
        ref={ref}
        aria-expanded={isOpen}
        className="tree-item"
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
            display: !link && 'flex',
            alignItems: !link && 'center',
            background: 'none',
            border: 'none',
            padding: 0,
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
              marginRight: clickableText && !link ? '10px' : undefined,
            }}>
            {children ? (isOpen ? collapse : expand) : neutral}
          </Span>
          {clickableText && !link ? (
            <Span className="tree-text" sx={{ fontSize: '1em' }}>
              {text}
            </Span>
          ) : null}
        </Button>
        {link ? (
          <Link href={link} target={newTab && '_blank'} sx={{ ...sx }}>
            {text}
          </Link>
        ) : (
          <Span sx={{ ...sx }} {...props}>
            {!clickableText && text}
          </Span>
        )}
        <animated.div
          className="tree-branch-inner"
          style={{
            overflow: 'hidden',
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}>
          <div {...bind}>{children}</div>
        </animated.div>
      </Div>
    )
  }
)

TreeItem.displayName = 'TreeItem'
