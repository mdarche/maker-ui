/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { mergeSelector } from '../utils/helper'

import { ErrorBoundary } from './Errors'

interface SidebarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
}

/**
 * The `Sidebar` component shows complementary content alongside the `Main` component..
 *
 * @link https://maker-ui.com/docs/layout/sidebar
 */

export const Sidebar = ({
  background,
  className,
  css,
  children,
  ...props
}: SidebarProps) => {
  return (
    <div
      className={mergeSelector('sidebar', className)}
      role="complementary"
      css={{ background, ...(css as object) }}
      {...props}>
      <ErrorBoundary errorKey="sidebar">{children}</ErrorBoundary>
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
