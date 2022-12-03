import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { TopbarOptions } from '@/types'

interface TopbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TopbarOptions {}

/**
 * The `Topbar` component displays content like announcements, social media icons,
 * or promotions above the page header.
 *
 * @link https://maker-ui.com/docs/layout/topbar
 */
export const Topbar = (props: TopbarProps) => {
  const {
    id,
    sticky,
    stickyOnMobile,
    hideOnMobile,
    className,
    children,
    ...rest
  } = props

  return (
    <aside
      id={id}
      className={cn([
        'mkr-topbar',
        sticky ? 'sticky' : '',
        stickyOnMobile ? 'sticky-mobile' : '',
        hideOnMobile ? 'hide-mobile' : '',
        className,
      ])}>
      <div className="container" {...rest}>
        {children}
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
