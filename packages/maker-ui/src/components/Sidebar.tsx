/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MakerProps } from '../types'
import { ErrorBoundary } from './Errors'

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

export const Sidebar = ({
  bg,
  background,
  variant = 'sidebar',
  sx,
  children,
  ...props
}: SidebarProps) => {
  return (
    <div
      className="sidebar"
      role="complementary"
      sx={{ bg, background, variant, ...sx }}
      {...props}>
      <ErrorBoundary errorKey="sidebar">{children}</ErrorBoundary>
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
