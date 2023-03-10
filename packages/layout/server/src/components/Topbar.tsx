import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { TopbarOptions } from '@/types'

export interface TopbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<TopbarOptions> {
  _type: 'topbar'
}

function stickyClass(d?: boolean, m?: boolean) {
  return d && m ? 'sticky' : d ? 'd-sticky' : m ? 'm-sticky' : undefined
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
        'mkui-topbar',
        stickyClass(sticky, stickyOnMobile),
        hideOnMobile ? 'mobile-hide' : '',
        className,
      ])}>
      <div className="mkui-container" {...props}>
        {children}
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
Topbar.defaultProps = { _type: 'topbar' }
