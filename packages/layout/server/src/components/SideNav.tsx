import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { SideNavOptions } from '@/types'

export interface SideNavProps
  extends Partial<SideNavOptions>,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'sideNav'
}

/**
 * The **SideNav** component creates a side navigation panel as a sibling to the page's main
 * content. It can be toggled open or closed on both desktop and mobile or it can serve as
 * the page's primary <header> tag.
 *
 * @link https://maker-ui.com/docs/layout/sidenav
 */
export const SideNav = ({
  id,
  isHeader = false,
  isPrimaryMobileNav,
  closeOnBlur,
  closeOnRouteChange,
  showCollapseOnMobile,
  collapse,
  menuButton,
  cssTransition,
  className,
  breakpoint,
  children,
  _type,
  ...props
}: SideNavProps) => {
  return (
    <>
      <div
        className="mkui-overlay mkui-overlay-s"
        role={closeOnBlur ? 'button' : undefined}
      />
      {React.createElement(
        isHeader ? 'header' : 'div',
        { className: cn(['mkui-sn mkui-layout-init', className]), ...props },
        <div className={cn(['mkui-sn-inner', 'container'])}>{children}</div>
      )}
      {menuButton}
    </>
  )
}

SideNav.displayName = 'SideNav'
SideNav.defaultProps = { _type: 'sideNav' }
