import React from 'react'

import { SVG, Button } from './Box'
import { BoxProps, MaybeElement } from '../props'
import { useOptions } from '../../context/OptionContext'
import { useMenu, useSideNav } from '../../context/ActionContext'
import { setBreakpoint } from '../../utils/helper'

interface Props extends BoxProps {
  closeIcon?: boolean
  custom?: MaybeElement
  visibleOnDesktop?: boolean
  'aria-expanded'?: boolean
}

const getAttributes = (
  menu,
  toggleMenu,
  sideMenu,
  toggleSideMenu,
  sideNavPrimary
) =>
  sideNavPrimary
    ? { 'aria-expanded': sideMenu ? true : false, onClick: toggleSideMenu }
    : { 'aria-expanded': menu ? true : false, onClick: toggleMenu }

export const MenuButton = (props: Props) => {
  const [menu, toggleMenu] = useMenu()
  const [sideMenu, toggleSideMenu] = useSideNav()
  const { mobileMenu, header, sideNav } = useOptions()

  const {
    custom,
    visibleOnDesktop = mobileMenu.visibleOnDesktop,
    closeIcon,
    ...rest
  } = props

  const visibility: React.CSSProperties = visibleOnDesktop
    ? !sideNav.isPrimaryMobileNav
      ? { display: 'block' }
      : { display: 'none' }
    : { display: setBreakpoint(header.breakIndex, ['block', 'none']) }

  return (
    <Button
      title="Menu"
      className="menu-toggle"
      aria-label="Toggle Menu"
      {...getAttributes(
        menu,
        toggleMenu,
        sideMenu,
        toggleSideMenu,
        sideNav.isPrimaryMobileNav
      )}
      {...rest}
      variant="header.menuButton"
      __css={{
        ...visibility,
        m: '0 auto',
        border: 'none',
        background: 'none',
        svg: { m: '0 auto' },
      }}>
      {custom || (
        <SVG
          viewBox="0 0 24 24"
          sx={{
            display: 'block',
            margin: 0,
            height: closeIcon ? 35 : 27,
          }}>
          {closeIcon ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          )}
        </SVG>
      )}
    </Button>
  )
}
