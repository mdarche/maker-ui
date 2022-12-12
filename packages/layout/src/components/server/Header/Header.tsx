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

/** Special (edge) cases */
export const edge = ['minimal-left', 'minimal-center']
export const mobileEdge = ['basic-menu-left', 'logo-center', 'logo-center-alt']

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
  _type,
  children,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={cn([
        sticky ? 'sticky' : undefined,
        stickyOnMobile ? 'sticky-mobile' : undefined,
        absolute ? 'width-100' : undefined,
        className,
      ])}
      role="banner"
      {...props}>
      <div
        className={cn([
          'mkr_nav',
          navType,
          `m-${mobileNavType}`,
          navType.includes('minimal') ? 'desktop-minimal' : undefined,
          className,
        ])}>
        {edge.includes(navType) || mobileEdge.includes(mobileNavType) ? (
          <div className="nav-area button-slot">{menuButton}</div>
        ) : null}
        {navType === 'split' ? (
          <div className="nav-area menu-slot split">{menuSlot}</div>
        ) : null}
        <div className="nav-area logo-slot">{logoSlot}</div>
        <div className="nav-area menu-slot">
          {navType === 'split' ? menuSplitSlot : menuSlot}
        </div>
        <div className="nav-area widget-slot">
          <div className="nav-widgets">
            <>{widgetSlot}</>
            <>{menuButton}</>
          </div>
        </div>
      </div>
      {_mobileMenu ?? null}
    </header>
  )
}

Header.displayName = 'Header'
Header.defaultProps = { _type: 'header' }
