/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { MakerProps } from './types'
import { ErrorBoundary } from './ErrorBoundary'

interface SidebarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  bg?: string | string[]
}

/**
 * The `Sidebar` component shows complementary content alongside the `Main` component..
 *
 * @see https://maker-ui.com/docs/layout/sidebar
 */

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ bg, background, variant = 'sidebar', sx, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="sidebar"
        role="complementary"
        sx={{ bg, background, variant, ...sx }}
        {...props}>
        <ErrorBoundary errorKey="sidebar">{children}</ErrorBoundary>
      </div>
    )
  }
)

Sidebar.displayName = 'Sidebar'
