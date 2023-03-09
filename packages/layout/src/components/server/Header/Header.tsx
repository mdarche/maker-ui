import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'
import { type MakerCSS } from '@maker-ui/style'
import type { HeaderOptions } from '@/types'
import Link from 'next/link'

type Style = string | number | (string | number)[]

interface LogoProps extends MakerCSS {
  image?: React.ReactNode | string
  path?: string
  height?: Style
  width?: Style
  margin?: Style
  padding?: Style
  fill?: Style
  stroke?: Style
  renderProps?: () => React.ReactNode | React.ReactNode
}

export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<HeaderOptions> {
  /** Replaces the Navbar logo-slot grid area with your own custom component.    */
  logo?: LogoProps
  /** Replaces the Navbar widget-slot grid area with your own custom component.    */
  widgets?: React.ReactNode
  /** Replaces the Navbar menu-slot grid area with your own custom component.    */
  menu?: React.ReactNode
  /** Renders the second menu for "split" nav types   */
  menuSplit?: React.ReactNode
  /** Replaces the Navbar button-slot grid area with your own custom component.    */
  menuButton?: React.ReactNode
  _mobileMenu?: React.ReactNode
  _type: 'header'
}

function stickyClass(d?: boolean, m?: boolean) {
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
  navTypeMobile = 'basic',
  sticky,
  stickyOnMobile,
  stickyUpScroll,
  scrollClass,
  logo,
  widgets,
  menu,
  menuSplit,
  menuButton,
  breakpoint,
  _mobileMenu,
  _type = 'header',
  children,
  ...props
}: HeaderProps) => {
  const logoSettings = merge({ path: '/' }, logo || {})
  return (
    <header
      className={cn([
        'mkui-header',
        stickyUpScroll ? 'sticky-scroll' : stickyClass(sticky, stickyOnMobile),
        absolute ? 'abs width-100' : undefined,
        className,
      ])}
      role="banner"
      {...props}>
      <div
        className={cn(['mkui-nav', navType, `m-${navTypeMobile}`, className])}>
        <div className="nav-area button-slot">{menuButton}</div>
        {navType === 'split' ? (
          <div className="nav-area menu-slot split">{menu}</div>
        ) : null}
        <div className="nav-area logo-slot">
          {logo?.renderProps ? (
            logo.renderProps()
          ) : (
            <Link href={logoSettings.path}>{logo?.image || null}</Link>
          )}
        </div>
        <div className="nav-area menu-slot">
          {navType === 'split' ? menuSplit : menu}
        </div>
        <div className="nav-area widget-slot">{widgets}</div>
      </div>
      {_mobileMenu ?? null}
    </header>
  )
}

Header.displayName = 'Header'
Header.defaultProps = { _type: 'header' }
