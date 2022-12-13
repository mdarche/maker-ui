import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { TopbarOptions } from '@/types'
import styles from './Topbar.module.css'
import { stickyClass } from '../Header/Header'

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
        stickyClass(sticky, stickyOnMobile),
        hideOnMobile ? 'm-hide' : '',
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
