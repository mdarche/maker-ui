'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type {
  CustomButtonProps,
  HeaderOptions,
  MobileMenuOptions,
  SideNavOptions,
} from '@/types'

interface MenuButtonProps {
  header: HeaderOptions
  sideNav: SideNavOptions
  mobileMenu: MobileMenuOptions
  isCloseButton?: boolean
  jsx?: CustomButtonProps
}

/**
 * The `MenuButton` controls opening / closing the `MobileMenu`. It is included
 * inside the Navbar component but can be used anywhere inside your layout.
 *
 * @link https://maker-ui.com/docs/layout/buttons/#menuButton
 */
export const MenuButton = ({
  jsx,
  header,
  mobileMenu,
  sideNav,
  isCloseButton,
  ...props
}: MenuButtonProps): React.ReactNode => {
  const [mobileActive, setMobileActive] = React.useState(false)
  const [sideActive, setSideActive] = React.useState(false)

  const conditionalAttributes = sideNav?.isPrimaryMobileNav
    ? { 'aria-expanded': sideActive ? true : false, onClick: toggleSideMenu }
    : {
        'aria-expanded': mobileActive ? true : false,
        onClick: toggleMobileMenu,
      }

  function toggleMobileMenu() {}

  function toggleSideMenu() {}

  const attributes = {
    title: 'Menu',
    className: cn([
      'menu-button',
      mobileMenu?.visibleOnDesktop ? 'desktop-visible' : undefined,
    ]),
    'aria-label': 'Toggle Menu',
    ...conditionalAttributes,
    ...props,
  }

  return typeof jsx === 'function' ? (
    (jsx(
      sideNav.isPrimaryMobileNav ? sideActive : mobileActive,
      attributes
    ) as React.ReactNode)
  ) : (
    <button {...attributes}>
      {jsx || (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={cn([
            'menu-button-icon',
            isCloseButton ? 'close-button-icon' : undefined,
          ])}>
          {isCloseButton ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          )}
        </svg>
      )}
    </button>
  )
}

MenuButton.displayName = 'MenuButton'
