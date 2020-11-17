/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Children, forwardRef, useEffect, useState } from 'react'

import { ErrorBoundary } from './ErrorBoundary'
import { ContentError } from './Errors'
import { MakerProps } from './types'
import { useOptions, useLayout } from '../context/OptionContext'
import { setBreakpoint, format, getLayoutString } from '../utils/helper'
import { getLayoutStyles } from '../utils/styles-layout'

const layoutTypes = [
  'content sidebar',
  'content sidenav',
  'content',
  'sidebar content',
  'sidebar content sidebar',
  'sidenav content',
  'dock workspace',
  'workspace',
  'workspace dock',
  'page-transition',
]

interface ContentProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * Use the `Content` component to wrap all content between your `Header`
 * and `Footer`.
 *
 * @see https://maker-ui.com/docs/content
 */

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ variant, sx, children, ...props }, ref) => {
    const { content } = useOptions()
    const [baseLayout, setLayout] = useLayout()
    const [debugMessage, setDebugMessage] = useState(false)

    // Sync JSX layout with Option Context
    useEffect(() => {
      let nodes: any[] = Children.toArray(children)

      if (nodes) {
        const currentLayout = getLayoutString(
          nodes
            .map(child =>
              child.type.displayName
                ? child.type.displayName.toLowerCase()
                : 'unknown'
            )
            .join(' ')
        )

        if (layoutTypes.includes(currentLayout)) {
          if (baseLayout !== currentLayout) {
            setLayout(currentLayout)
          }
        } else {
          setDebugMessage(true)
        }
      } else {
        setDebugMessage(true)
      }
    }, [baseLayout, setLayout, children])

    const sidebarPartial: object | null =
      baseLayout === 'sidebar content'
        ? {
            gridTemplateColumns: t =>
              setBreakpoint(content.breakIndex, [
                `1fr`,
                `${format(t.sizes.width_sidebar)} 1fr`,
              ]),
          }
        : baseLayout === 'content sidebar'
        ? {
            gridTemplateColumns: t =>
              setBreakpoint(content.breakIndex, [
                `1fr`,
                `1fr ${format(t.sizes.width_sidebar)}`,
              ]),
          }
        : null

    return (
      <div
        ref={ref}
        id="site-inner"
        sx={{
          variant,
          ...getLayoutStyles(baseLayout),
          minHeight: '80vh',
          ...sidebarPartial,
          ...sx,
        }}
        {...props}>
        {debugMessage ? (
          <ContentError />
        ) : (
          <ErrorBoundary errorKey="content">{children}</ErrorBoundary>
        )}
      </div>
    )
  }
)

Content.displayName = 'Content'
