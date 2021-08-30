import * as React from 'react'
import {
  Button,
  Span,
  Link,
  Div,
  DivProps,
  useMeasure,
  mergeSelectors,
} from 'maker-ui'
import { useSpring, animated } from '@react-spring/web'

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
 * @link https://maker-ui.com/docs/elements/tree-menu
 */

export const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    { className, text, link, newTab, open = false, css, children, ...props },
    ref
  ) => {
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
    const [measureRef, { height: viewHeight }] = useMeasure()

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
        className={mergeSelectors(['tree-item', className])}
        css={{
          display: link && 'flex',
          alignItems: link && 'center',
          position: 'relative',
          paddingTop: 10,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          '.tree-item-container': {
            paddingLeft: indentation,
          },
        }}>
        <Button
          onClick={() => setOpen(!isOpen)}
          aria-label={text}
          aria-expanded={isOpen ? 'true' : 'false'}
          css={{
            display: !link ? 'flex' : undefined,
            alignItems: !link ? 'center' : undefined,
            background: 'none',
            border: 'none',
            padding: 0,
            marginRight: 10,
            cursor: 'pointer',
            color: 'primary',
            svg: {
              height: 16,
              fill: 'currentColor',
            },
          }}>
          <Span
            className="tree-icon"
            css={{
              marginRight: clickableText && !link ? '10px' : undefined,
            }}>
            {children ? (isOpen ? collapse : expand) : neutral}
          </Span>
          {clickableText && !link ? (
            <Span className="tree-text" css={{ fontSize: '1em' }}>
              {text}
            </Span>
          ) : null}
        </Button>
        {link ? (
          <Link
            href={link}
            target={newTab ? '_blank' : undefined}
            css={{ ...(css as object) }}>
            {text}
          </Link>
        ) : (
          <Span css={{ ...(css as object) }} {...props}>
            {!clickableText && text}
          </Span>
        )}
        <animated.div
          className="tree-item-container"
          style={{
            overflow: 'hidden',
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}>
          <div ref={measureRef}>{children}</div>
        </animated.div>
      </Div>
    )
  }
)

TreeItem.displayName = 'TreeItem'
