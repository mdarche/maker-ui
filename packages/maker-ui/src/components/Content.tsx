/** @jsx jsx */
import { jsx } from 'theme-ui'

import { ErrorBoundary } from './ErrorBoundary'
import { ContentError } from './Errors'
import { MakerProps } from './types'
import { useOptions } from '../context/OptionContext'
import { useLayoutDetector } from '../context/LayoutContext'
import { useLayoutStyles } from '../hooks/useLayoutStyles'

interface ContentProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * The `Content` component is a wrapper that reads the contents of its
 * child nodes and updates the LayoutProvider for valid layouts or throws a development error.
 *
 * Use it to wrap everything between your `Header` and `Footer` components.
 *
 * @see https://maker-ui.com/docs/layout/content
 */

export const Content = ({ variant, sx, children, ...props }: ContentProps) => {
  const { framework } = useOptions()
  const { layout, showError, initialRender } = useLayoutDetector(
    'content',
    children
  )
  const layoutStyles = useLayoutStyles(layout)

  return (
    <div
      id="site-inner"
      sx={{
        variant,
        position: 'relative',
        visibility: framework === 'gatsby' && initialRender && ['hidden'],
        ...layoutStyles,
        ...sx,
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
