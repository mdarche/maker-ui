/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, useEffect, useState } from 'react'

import { ErrorBoundary } from './ErrorBoundary'
import { ContentError } from './Errors'
import { MakerProps } from './types'
import { useOptions, useLayout } from '../context/OptionContext'
import {
  setBreakpoint,
  format,
  getLayoutType,
  layoutMatch,
} from '../utils/helper'
import { getLayoutStyles } from '../utils/styles-layout'

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
    const [layout, setLayout] = useLayout()
    const [debugMessage, setDebugMessage] = useState(false)

    // Sync JSX layout with Option Context
    useEffect(() => {
      const currentLayout = getLayoutType('content', children)
      const isValidLayout = layoutMatch('content', currentLayout)

      if (isValidLayout) {
        if (layout !== currentLayout) {
          setLayout(currentLayout)
        }
      } else {
        setDebugMessage(true)
      }
    }, [layout, setLayout, children])

    const sidebarPartial: object | null =
      layout === 'sidebar content'
        ? {
            gridTemplateColumns: t =>
              setBreakpoint(content.breakIndex, [
                `1fr`,
                `${format(t.sizes.width_sidebar)} 1fr`,
              ]),
          }
        : layout === 'content sidebar'
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
          ...getLayoutStyles(layout),
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
