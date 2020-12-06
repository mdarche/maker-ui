import * as React from 'react'

import { MakerOptions, MakerProps, ResponsiveScale } from '../types'
import { useOptions } from '../../context/OptionContext'
import { LayoutString, useLayout } from '../../context/LayoutContext'

import { Logo } from './Logo'
import { ColorButton } from './ColorButton'
import { NavMenu, MenuButton, MenuProps } from '../Menu'
import { WidgetArea } from './WidgetArea'
import { Grid, Flex } from '../Primitives'
import { gridStyles } from './styles'

const edgeCase = ['minimal-left', 'minimal-center']

export interface NavProps extends MakerProps {
  type?: MakerOptions['header']['navType']
  mobileType?: MakerOptions['header']['mobileNavType']
  logo?: React.ReactNode
  menu?: MenuProps[]
  colorButton?: MakerOptions['header']['colorButton']
  menuButton?: MakerOptions['header']['menuButton']
  navArea?: React.ReactNode
  grid?: MakerOptions['header']['grid']
  pathname?: string
  maxWidth?: ResponsiveScale
}

/**
 * The `Navbar` component renders your layout's primary navigation in one of
 * 8 conventional styles or you can fully customize it with the `grid` prop.
 *
 * @see https://maker-ui.com/components/layout/navbar
 */

export const Navbar = (props: NavProps) => {
  const { header } = useOptions()
  const [layout, setLayout] = useLayout('nav')
  const [mobileLayout, setMobileLayout] = useLayout('mobileNav')

  const {
    type,
    mobileType,
    logo,
    menu,
    navArea,
    menuButton,
    colorButton,
    grid = header.grid,
    maxWidth,
    variant = 'navbar',
    sx,
  } = props

  const mid = Math.ceil(menu.length / 2)

  React.useEffect(() => {
    if (type !== undefined && type !== layout) {
      setLayout(type)
    }

    if (mobileType !== undefined && mobileType !== mobileLayout) {
      setMobileLayout(mobileType as LayoutString) // TODO check this TS issue
    }
  }, [type, mobileType, layout, mobileLayout, setLayout, setMobileLayout])

  return (
    <Grid
      variant={variant}
      sx={{
        maxWidth: maxWidth || (t => t.sizes.maxWidth_header),
        mx: 'auto',
        position: 'relative',
        ...gridStyles(layout, mobileLayout, grid, header.bpIndex),
        ...sx,
      }}>
      {edgeCase.includes(layout) ? (
        <Flex
          align="center"
          className="button-area"
          sx={{ gridArea: 'button' }}>
          <MenuButton customButton={menuButton} visibleOnDesktop />
        </Flex>
      ) : null}
      {layout === 'split' ? (
        <Flex
          align="center"
          className="menu-area split"
          sx={{ gridArea: 'menu-split' }}>
          <NavMenu menuItems={menu.slice(0, mid)} />
        </Flex>
      ) : null}
      <Flex align="center" className="logo-area" sx={{ gridArea: 'logo' }}>
        <Logo>{logo}</Logo>
      </Flex>
      <Flex align="center" className="menu-area" sx={{ gridArea: 'menu' }}>
        <NavMenu menuItems={layout === 'split' ? menu.slice(mid) : menu} />
      </Flex>
      <Flex align="center" className="nav-area" sx={{ gridArea: 'nav' }}>
        <WidgetArea content={navArea} />
        {!edgeCase.includes(layout) ? (
          <MenuButton
            customButton={menuButton}
            visibleOnDesktop={layout.includes('minimal')}
          />
        ) : null}
        <ColorButton customButton={colorButton} />
      </Flex>
    </Grid>
  )
}

Navbar.displayName = 'Navbar'
