/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MakerProps } from '../../types'
import { ErrorBoundary } from '../Errors'

export interface CanvasProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  bg?: string | string[]
  background?: string | string[]
}

/**
 * The `Canvas` component constitutes the main content area for the workspace layout.
 * It will display nested children that can access values set via `WorkspaceContext`.
 *
 */

export const Canvas = ({
  bg = 'background',
  background,
  variant,
  sx,
  children,
  ...props
}: CanvasProps) => {
  return (
    <div
      className="canvas"
      sx={{
        bg,
        background,
        gridArea: 'canvas',
        variant,
        ...sx,
      }}
      {...props}>
      <ErrorBoundary errorKey="canvas">
        <div className="container">{children}</div>
      </ErrorBoundary>
    </div>
  )
}

Canvas.displayName = 'Canvas'
