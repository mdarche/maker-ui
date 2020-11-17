/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as React from 'react'
import { forwardRef, useEffect, useState } from 'react'

import { ErrorBoundary } from './ErrorBoundary'
import { ContentError } from './Errors'
import { MakerProps } from './types'
import { useOptions, useLayout } from '../context/OptionContext'
import { setBreakpoint, format, getLayoutString } from '../utils/helper'
import { getLayoutStyles } from '../utils/styles-layout'

const regularLayouts = [
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
] as const

type Layout = typeof layoutTypes[number]

interface ContentProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  layout?: Layout
}

/**
 * Use the `Content` component to wrap all content between your `Header`
 * and `Footer`.
 *
 * @see https://maker-ui.com/docs/content
 */

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ layout, variant, sx, children, ...props }, ref) => {
    const { content } = useOptions()
    const [baseLayout, setLayout] = useLayout()
    const [debugMessage, setDebugMessage] = useState(false)

    // Sync JSX layout with Option Context
    useEffect(() => {
      let nodes: any[] = React.Children.toArray(children)

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

        if (regularLayouts.includes(currentLayout)) {
          if (baseLayout !== currentLayout) {
            setLayout(currentLayout)
          }
        } else {
          setDebugMessage(true)
        }
      } else {
        setDebugMessage(true)
      }
    }, [layout, baseLayout, setLayout, children])

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
