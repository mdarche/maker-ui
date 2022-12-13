import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { HeaderOptions } from '@/types'

export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<HeaderOptions> {
  /** Replaces the Navbar logo-slot grid area with your own custom component.    */
  logoSlot?: React.ReactNode
  /** Replaces the Navbar widget-slot grid area with your own custom component.    */
  widgetSlot?: React.ReactNode
  /** Replaces the Navbar menu-slot grid area with your own custom component.    */
  menuSlot?: React.ReactNode
  /** Renders the second menu for "split" nav types   */
  menuSplitSlot?: React.ReactNode
  /** Replaces the Navbar button-slot grid area with your own custom component.    */
  menuButton?: React.ReactNode
  _mobileMenu?: React.ReactNode
  _type: 'header'
}

export function stickyClass(d?: boolean, m?: boolean) {
  return d && m ? 'sticky' : d ? 'd-sticky' : m ? 'm-sticky' : undefined
}

/**
 * The `Header` component stores your site logo, primary menu, mobile menu,
 * and any necessary navigation elements.
 *
 * @link https://maker-ui.com/docs/layout/header
 */
export const Header = ({
  className,
  absolute,
  navType = 'basic',
  mobileNavType = 'basic',
  sticky,
  stickyOnMobile,
  stickyUpScroll,
  scrollClass,
  logoSlot,
  widgetSlot,
  menuSlot,
  menuSplitSlot,
  menuButton,
  breakpoint,
  _mobileMenu,
  _type = 'header',
  children,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={cn([
        'mkr_header',
        stickyClass(sticky, stickyOnMobile),
        absolute ? 'width-100' : undefined,
        className,
      ])}
      role="banner"
      {...props}>
      <div
        className={cn(['mkr_nav', navType, `m-${mobileNavType}`, className])}>
        <div className="nav-area button-slot">{menuButton}</div>
        {navType === 'split' ? (
          <div className="nav-area menu-slot split">{menuSlot}</div>
        ) : null}
        <div className="nav-area logo-slot">{logoSlot}</div>
        <div className="nav-area menu-slot">
          {navType === 'split' ? menuSplitSlot : menuSlot}
        </div>
        <div className="nav-area widget-slot">{widgetSlot}</div>
      </div>
      {_mobileMenu ?? null}
    </header>
  )
}

Header.displayName = 'Header'
Header.defaultProps = { _type: 'header' }
