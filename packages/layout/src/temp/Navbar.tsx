import * as React from 'react'
import { cn } from '@maker-ui/utils'
import Link from 'next/Link'

import type {
  HeaderOptions,
  ColorButtonProps,
  CustomButtonProps,
} from '@/types'
import { ColorButton } from '../components/client/ColorButton'
import { MenuButton } from '../components/client/MenuButton/MenuButton'
import { NavMenu } from '../components/client/NavMenu/NavMenu'
import styles from './Header.module.css'
// import { gridStyles } from './styles'

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  header: HeaderOptions
  /** A custom logo component that is wrapped in an anchor tag that leads to the home page. */
  logo?: React.ReactElement | string
  /** Lets you supply a `MakerMenu` that renders a fully responsive and accessible menu complete with nested dropdowns. */
  /** Overrides `header.colorButton` from Maker UI options. */
  colorButton?: ColorButtonProps
  /** Overrides `header.menuButton` from Maker UI options. */
  menuButton?: CustomButtonProps
  /** Replaces the Navbar logo-slot grid area with your own custom component.    */
  logoSlot?: React.ReactNode
  /** Replaces the Navbar widget-slot grid area with your own custom component.    */
  widgetSlot?: React.ReactNode
  /** Replaces the Navbar menu-slot grid area with your own custom component.    */
  menuSlot?: React.ReactNode
  /** Overrides `header.maxWidth` from Maker UI options. */
  maxWidth?: string
}

/** Special (edge) cases */
const edge = ['minimal-left', 'minimal-center']
const mobileEdge = ['basic-menu-left', 'logo-center', 'logo-center-alt']

/**
 * The `Navbar` component renders your layout's primary navigation in one of
 * 8 common styles or you can fully customize it with the `navArea`, `logoArea`, and
 * `menuArea` props.
 *
 * @link https://maker-ui.com/components/layout/navbar
 */
export const Navbar = ({
  id,
  className,
  header: { navType, mobileNavType },
  logo,
  menu,
  logoSlot,
  widgetSlot,
  menuSlot,
  menuButton,
  colorButton,
  maxWidth,
}: NavbarProps) => {
  const mid = menu && Math.ceil(menu.length / 2)

  return (
    <div
      id={id}
      className={cn([
        styles.nav_grid,
        `${navType}`,
        `m-${mobileNavType}`,
        navType.includes('minimal') ? 'desktop-minimal' : undefined,
        className,
      ])}
      style={maxWidth ? { maxWidth } : undefined}>
      {/* css={{
        maxWidth,
        ...gridStyles(layout, mobileLayout),
        gridTemplateRows: ['1fr', layout !== 'center' ? '1fr' : '1fr 1fr'],
        '.menu-slot': {
          display: ['none', 'flex'],
        },
        '.widget-slot .menu-button': {
          display: [
            mobileEdge.includes(mobileLayout) ? 'none' : 'block',
            layout === 'minimal' || mobileMenu.visibleOnDesktop
              ? 'block'
              : 'none',
          ],
        },
        '&.desktop-minimal .menu-slot': {
          display: 'none',
        },
        '&:not(.desktop-minimal) .button-slot': {
          display: ['flex', 'none'],
        },
        '.nav-widgets': {
          display: header.showWidgetsOnMobile ? 'flex' : ['none', 'flex'],
        },
        // Handle multiple menu button layouts
        '&.m-layout-logo-center-alt .button-slot': {
          justifyContent: ['flex-end', 'flex-start'],
        },
        '&.layout-minimal.m-layout-logo-center-alt .button-slot, &.layout-minimal.m-layout-basic-menu-left .button-slot':
          {
            display: ['flex', 'none'],
          },
        '&.layout-minimal-left.m-layout-basic .button-slot': {
          display: ['none', 'flex'],
        },
        '&.layout-split .widget-slot, &.layout-center .widget-slot': {
          position: ['relative', 'absolute'],
        },
        ...(css as object),
      }} */}
      {edge.includes(navType) || mobileEdge.includes(mobileNavType) ? (
        <div className="nav-area button-slot">
          {/* @ts-ignore */}
          <MenuButton customButton={menuButton} visibleOnDesktop />
        </div>
      ) : null}
      {navType === 'split' ? (
        <div className="nav-area menu-slot split">
          {menuSlot ? null : <NavMenu menuItems={menu?.slice(0, mid)} />}
        </div>
      ) : null}
      <div className="nav-area logo-slot">
        {logoSlot ? logoSlot : <Link href="/">{logo || 'Add Logo'}</Link>}
      </div>
      <div className="nav-area menu-slot">
        {menuSlot ? (
          menuSlot
        ) : (
          <NavMenu menuItems={navType === 'split' ? menu?.slice(mid) : menu} />
        )}
      </div>
      <div className="nav-area widget-slot">
        <div className="nav-widgets">{widgetSlot}</div>
        {/* @ts-ignore */}
        <MenuButton customButton={menuButton} />
        {/* @ts-ignore */}
        <ColorButton isHeaderButton customButton={colorButton} />
      </div>
    </div>
  )
}

Navbar.displayName = 'Navbar'
