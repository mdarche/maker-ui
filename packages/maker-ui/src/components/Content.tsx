/** @jsx jsx */
import { jsx } from 'theme-ui'

import { ErrorBoundary } from './ErrorBoundary'
import { ContentError } from './Errors'
import { MakerProps } from './types'
import { useOptions } from '../context/OptionContext'
import { getLayoutStyles } from '../utils/styles-layout'
import { useLayoutDetector } from '../hooks/useLayoutDetector'
import { useMeasurements } from '../context/LayoutContext'

interface ContentProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * Use the `Content` component to wrap all content between your `Header`
 * and `Footer`.
 *
 * @see https://maker-ui.com/docs/content
 */

export const Content = ({ variant, sx, children, ...props }: ContentProps) => {
  const { content } = useOptions()
  const { measurements } = useMeasurements()
  const { layout, showError } = useLayoutDetector('content', children)

  return (
    <div
      id="site-inner"
      sx={{
        variant,
        position: 'relative',
        ...getLayoutStyles(layout, content.breakIndex, measurements),
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
