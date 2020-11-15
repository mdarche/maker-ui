/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { MakerProps } from './types'
import { ErrorBoundary } from './ErrorBoundary'

interface MainProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  bg?: string | string[]
}

/**
 * Use the `Main` component to wrap your layout's main content.
 *
 * @see https://maker-ui.com/docs/main
 */

export const Main = forwardRef<HTMLDivElement, MainProps>(
  ({ variant = 'main', background, bg, sx, children, ...props }, ref) => (
    <main
      ref={ref}
      id="content"
      role="main"
      sx={{ bg, background, variant, flex: 1, ...sx }}
      {...props}>
      <ErrorBoundary errorKey="main">{children}</ErrorBoundary>
    </main>
  )
)

Main.displayName = 'Main_MakerUI'
