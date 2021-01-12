/** @jsx jsx */
import { jsx } from '@emotion/react'

import { MakerProps } from '../types'
import { ErrorBoundary } from './Errors'

interface SidebarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
}

/**
 * The `Sidebar` component shows complementary content alongside the `Main` component..
 *
 * @see https://maker-ui.com/docs/layout/sidebar
 */

export const Sidebar = ({
  background,
  children,
  css,
  ...props
}: SidebarProps) => {
  return (
    <div
      className="sidebar"
      role="complementary"
      css={{ background, ...(css as object) }}
      {...props}>
      <ErrorBoundary errorKey="sidebar">{children}</ErrorBoundary>
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
