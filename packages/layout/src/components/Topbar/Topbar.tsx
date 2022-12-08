import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { TopbarOptions } from '@/types'
import styles from './Topbar.module.css'

export interface TopbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<TopbarOptions> {
  _type: 'topbar'
}

/**
 * The `Topbar` component displays content like announcements, social media icons,
 * or promotions above the page header.
 *
 * @link https://maker-ui.com/docs/layout/topbar
 */
export const Topbar = ({
  id,
  sticky,
  stickyOnMobile,
  hideOnMobile,
  className,
  children,
  _type,
  ...props
}: TopbarProps) => {
  return (
    <aside
      id={id}
      className={cn([
        styles.topbar,
        sticky ? 'sticky' : '',
        stickyOnMobile ? 'sticky-mobile' : '',
        hideOnMobile ? 'hide-mobile' : '',
        className,
      ])}>
      <div className="container" {...props}>
        {children}
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
Topbar.defaultProps = { _type: 'topbar' }
