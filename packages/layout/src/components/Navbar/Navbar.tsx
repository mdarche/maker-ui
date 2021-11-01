/** @jsx jsx */
import { jsx, ResponsiveScale, MakerProps } from '@maker-ui/css'
import { Grid } from '@maker-ui/primitives'
import { useEffect } from 'react'

import { MakerOptions } from '../../types'
import { useOptions } from '../../context/OptionContext'
import { useLayout } from '../../context/LayoutContext'
import { Logo } from './Logo'
import { ColorButton } from './ColorButton'
import { NavMenu, MenuButton, MenuItemProps } from '../Menu'
import { gridStyles } from './styles'
import { setBreakpoint, mergeSelectors } from '../../utils/helper'

export interface NavProps extends MakerProps {
  /** Overrides the `header.navType` from Maker UI options. */
  type?: MakerOptions['header']['navType']
  /** Overrides the `header.mobileNavType` from Maker UI options. */
  mobileType?: MakerOptions['header']['mobileNavType']
  /** A custom logo component that is wrapped in an anchor tag that leads to the home page. */
  logo?: React.ReactElement | string
  /** Lets you supply a `MakerMenu` that renders a fully responsive and accessible menu complete with nested dropdowns. */
  menu?: MenuItemProps[]
  /** Overrides `header.colorButton` from Maker UI options. */
  colorButton?: MakerOptions['header']['colorButton']
  /** Overrides `header.menuButton` from Maker UI options. */
  menuButton?: MakerOptions['header']['menuButton']
  /** Replaces the Navbar logo-slot grid area with your own custom component.    */
  logoSlot?: React.ReactNode
  /** Replaces the Navbar widget-slot grid area with your own custom component.    */
  widgetSlot?: React.ReactNode
  /** Replaces the Navbar menu-slot grid area with your own custom component.    */
  menuSlot?: React.ReactNode
  /** Lets you supply your app's current path to add a `.current` class and `aria-current` to the active menu item. This feature is only useful if you use the `menu` prop. */
  pathname?: string
  /** Overrides `header.maxWidth` from Maker UI options. */
  maxWidth?: ResponsiveScale
  /** Class selector */
  className?: string
  /** ID selector */
  id?: string
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
  type,
  mobileType,
  logo,
  menu,
  logoSlot,
  widgetSlot,
  menuSlot,
  menuButton,
  colorButton,
  maxWidth,
  className,
  id,
  css,
}: NavProps) => {
  const { header, mobileMenu, breakpoints } = useOptions()
  const [layout, setLayout] = useLayout('nav')
  const [mobileLayout, setMobileLayout] = useLayout('mobileNav')

  const bpArray = setBreakpoint(header.breakpoint, breakpoints)

  const mid = menu && Math.ceil(menu.length / 2)

  useEffect(() => {
    /** Update layout context if current desktop layout is different */
    if (type !== undefined && type !== layout) {
      setLayout(type)
    }

    /** Update layout context if current mobile layout is different */
    if (mobileType !== undefined && mobileType !== mobileLayout) {
      setMobileLayout(mobileType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, mobileType, layout, mobileLayout])

  return (
    <Grid
      id={id}
      className={mergeSelectors([
        `nav-grid layout-${layout}`,
        `m-layout-${mobileLayout}`,
        header.menuOverflow === 'scroll' ? 'menu-scroll' : undefined,
        className,
      ])}
      breakpoints={bpArray}
      css={{
        maxWidth,
        ...gridStyles(layout, mobileLayout),
        gridTemplateRows: ['1fr', layout !== 'center' ? '1fr' : '1fr 1fr'],
        '.menu-slot': {
          display: ['none', 'flex'],
        },
        '&.layout-minimal .menu-slot, &.layout-minimal-left .menu-slot, &.layout-minimal-center .menu-slot':
          {
            display: 'none',
          },
        '.widget-slot .menu-button': {
          display: [
            mobileEdge.includes(mobileLayout) ? 'none' : 'block',
            layout === 'minimal' || mobileMenu.visibleOnDesktop
              ? 'block'
              : 'none',
          ],
        },
        '.nav-widgets': {
          display: header.showWidgetsOnMobile ? 'flex' : ['none', 'flex'],
        },
        '&.m-layout-logo-center-alt .button-slot': {
          justifyContent: ['flex-end', 'flex-start'],
        },
        '&.layout-split .widget-slot, &.layout-center .widget-slot': {
          position: ['relative', 'absolute'],
        },
        ...(css as object),
      }}>
      {edge.includes(layout) || mobileEdge.includes(mobileLayout) ? (
        <div className="nav-area button-slot">
          <MenuButton customButton={menuButton} visibleOnDesktop />
        </div>
      ) : null}
      {layout === 'split' ? (
        <div className="nav-area menu-slot split">
          {menuSlot ? null : <NavMenu menuItems={menu?.slice(0, mid)} />}
        </div>
      ) : null}
      <div className="nav-area logo-slot">
        {logoSlot ? logoSlot : <Logo>{logo || 'Add Logo'}</Logo>}
      </div>
      <div className="nav-area menu-slot">
        {menuSlot ? (
          menuSlot
        ) : (
          <NavMenu menuItems={layout === 'split' ? menu?.slice(mid) : menu} />
        )}
      </div>
      <div className="nav-area widget-slot">
        <div className="nav-widgets">{widgetSlot}</div>
        <MenuButton customButton={menuButton} />
        <ColorButton isHeaderButton customButton={colorButton} />
      </div>
    </Grid>
  )
}

Navbar.displayName = 'Navbar'
