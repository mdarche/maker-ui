/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { LayoutProps } from './types'

interface SidebarProps
  extends LayoutProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
}

/**
 * Use the `Sidebar` component for `content-sidebar` or `sidebar-content` layouts.
 * Add it inside the `Content` component and alongside the `Main` component.
 *
 * @see https://maker-ui.com/docs/sidebar
 */

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      id = 'primary-sidebar',
      bg,
      background,
      variant = 'sidebar',
      sx,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id={id}
        role="complementary"
        sx={{ bg, background, variant, ...sx }}
        {...props}
      />
    )
  }
)
