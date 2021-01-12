/** @jsx jsx */
import { jsx } from '@emotion/react'

import { ErrorBoundary } from './Errors/ErrorBoundary'
import { ContentError } from './Errors/Errors'
import { MakerProps } from '../types'
import { useOptions } from '../context/OptionContext'
import { useLayoutDetector } from '../context/LayoutContext'
import { useLayoutStyles } from '../hooks/useLayoutStyles'

interface ContentProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'css'> {}

/**
 * The `Content` component is a wrapper that reads the contents of its
 * child nodes and updates the LayoutProvider for valid layouts or throws a development error.
 *
 * Use it to wrap everything between your `Header` and `Footer` components.
 *
 * @see https://maker-ui.com/docs/layout/content
 */

export const Content = ({ children, css, ...props }: ContentProps) => {
  const { framework } = useOptions()
  const { layout, showError, initialRender } = useLayoutDetector(
    'content',
    children
  )
  const layoutStyles = useLayoutStyles(layout)

  return (
    <div
      id="site-inner"
      css={{
        position: 'relative',
        visibility: framework === 'gatsby' && initialRender && ['hidden'],
        ...layoutStyles,
        ...(css as object),
      }}
      {...props}>
      {showError ? (
        <ContentError />
      ) : (
        <ErrorBoundary errorKey="content">{children}</ErrorBoundary>
      )}
    </div>
  )
}

Content.displayName = 'Content'
