import * as React from 'react'

import { SVG, Button } from '../Primitives'
import { MakerProps, MakerOptions, MaybeElement } from '../types'
import { useOptions } from '../../context/OptionContext'
import { useMenu, useSideNav } from '../../context/ActionContext'
import { setBreakpoint } from '../../utils/helper'

interface MenuButtonProps extends MakerProps {
  closeIcon?: boolean
  buttonInner?: MaybeElement
  customButton?: MakerOptions['header']['customMenuButton']
  visibleOnDesktop?: boolean
  'aria-expanded'?: boolean
}

export const MenuButton = (props: MenuButtonProps) => {
  const [menu, toggleMenu] = useMenu()
  const [sideMenu, toggleSideMenu] = useSideNav()
  const { mobileMenu, header, sideNav } = useOptions()

  const {
    buttonInner,
    customButton,
    visibleOnDesktop = mobileMenu.visibleOnDesktop,
    closeIcon,
    sx,
  } = props

  // Use custom button from props or check header options
  const menuButton = customButton || header.customMenuButton

  const visibility = visibleOnDesktop
    ? !sideNav.isPrimaryMobileNav
      ? { display: 'block' }
      : { display: 'none' }
    : { display: setBreakpoint(header.breakIndex, ['block', 'none']) }

  const conditionalAttributes = sideNav.isPrimaryMobileNav
    ? { 'aria-expanded': sideMenu ? true : false, onClick: toggleSideMenu }
    : { 'aria-expanded': menu ? true : false, onClick: toggleMenu }

  const attributes = {
    title: 'Menu',
    className: 'menu-button',
    'aria-label': 'Toggle Menu',
    ...conditionalAttributes,
  }

  return menuButton ? (
    menuButton(sideNav.isPrimaryMobileNav ? sideMenu : menu, attributes)
  ) : (
    <Button
      {...attributes}
      sx={{
        variant: 'header.menuButton',
        ...visibility,
        m: '0 auto',
        border: 'none',
        background: 'none',
        svg: { m: '0 auto' },
        ...sx,
      }}>
      {buttonInner || (
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
