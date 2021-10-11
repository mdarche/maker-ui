/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { mergeSelectors } from '../utils/helper'

import { ErrorBoundary } from './Errors'

interface SidebarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * The `Sidebar` component shows complementary content alongside the `Main` component..
 *
 * @link https://maker-ui.com/docs/layout/sidebar
 */

export const Sidebar = ({
  className,
  css,
  children,
  ...props
}: SidebarProps) => {
  return (
    <div
      className={mergeSelectors(['sidebar', className])}
      role="complementary"
      {...props}>
      <ErrorBoundary errorKey="sidebar">{children}</ErrorBoundary>
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
