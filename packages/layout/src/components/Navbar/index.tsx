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
  type?: MakerOptions['header']['navType']
  mobileType?: MakerOptions['header']['mobileNavType']
  logo?: React.ReactElement | string
  menu?: MenuItemProps[]
  colorButton?: MakerOptions['header']['colorButton']
  menuButton?: MakerOptions['header']['menuButton']
  logoSlot?: React.ReactNode
  widgetSlot?: React.ReactNode
  menuSlot?: React.ReactNode
  pathname?: string
  maxWidth?: ResponsiveScale
  className?: string
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

export const Navbar = (props: NavProps) => {
  const { header, mobileMenu, breakpoints } = useOptions()
  const [layout, setLayout] = useLayout('nav')
  const [mobileLayout, setMobileLayout] = useLayout('mobileNav')

  const bpArray = setBreakpoint(header.breakpoint, breakpoints)

  const {
    type,
    mobileType,
    logo = 'Logo',
    menu,
    logoSlot,
    widgetSlot,
    menuSlot,
    menuButton,
    colorButton,
    maxWidth = 'var(--maxWidth_header)',
    className,
    id,
    css,
  } = props

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
        '.menu-slot': {
          display: ['none', 'flex'],
        },
        '.button-slot': {
          display: [
            mobileEdge.includes(mobileLayout) ? 'flex' : 'none',
            edge.includes(layout) ? 'flex' : 'none',
          ],
        },
        '.nav-widgets': {
          display: header.hideWidgetsOnMobile ? ['none', 'flex'] : 'flex',
        },
        ...(css as object),
      }}>
      {edge.includes(layout) || mobileEdge.includes(mobileLayout) ? (
        <div className="nav-area button-slot">
          <MenuButton
            breakpoints={bpArray}
            customButton={menuButton}
            visibleOnDesktop
          />
        </div>
      ) : null}
      {layout === 'split' ? (
        <div className="nav-area menu-slot split">
          {menuSlot ? null : <NavMenu menuItems={menu?.slice(0, mid)} />}
        </div>
      ) : null}
      <div className="nav-area logo-slot">
        {logoSlot ? logoSlot : <Logo>{logo}</Logo>}
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
        <MenuButton
          customButton={menuButton}
          breakpoints={bpArray}
          css={{
            display: [
              mobileEdge.includes(mobileLayout) ? 'none' : 'block',
              layout === 'minimal' || mobileMenu.visibleOnDesktop
                ? 'block'
                : 'none',
            ],
          }}
        />
        <ColorButton isHeaderButton customButton={colorButton} />
      </div>
    </Grid>
  )
}

Navbar.displayName = 'Navbar'
