import * as React from 'react'
import { cn } from '@maker-ui/utils'

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  _type?: 'sidebar'
  primary?: boolean
  secondary?: boolean
}

/**
 * The `Sidebar` component shows complementary content alongside the `Main` component..
 *
 * @link https://maker-ui.com/docs/layout/sidebar
 */
export const Sidebar = ({
  primary,
  secondary,
  className,
  children,
  _type,
  ...props
}: SidebarProps) => {
  return (
    <div
      className={cn([
        'mkr_sidebar',
        primary ? 'primary' : secondary ? 'secondary' : undefined,
        className,
      ])}
      role="complementary"
      {...props}>
      {children}
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
Sidebar.defaultProps = { _type: 'sidebar' }
