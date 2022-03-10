import * as React from 'react'
import { mergeSelectors } from '@maker-ui/utils'

import { useOptions } from '../../context/OptionContext'
import { useMenu, useSideNav } from '../../context/ActionContext'

interface MenuButtonProps {
  isCloseButton?: boolean
  customButton?:
    | 'default'
    | React.ReactNode
    | ((isOpen?: string, attributes?: object) => React.ReactNode)
  visibleOnDesktop?: boolean
}

/**
 * The `MenuButton` controls opening / closing the `MobileMenu`. It is included
 * inside the Navbar component but can be used anywhere inside your layout.
 *
 * @link https://maker-ui.com/docs/layout/buttons/#menuButton
 */

export const MenuButton = ({
  customButton,
  visibleOnDesktop,
  isCloseButton,
  ...props
}: MenuButtonProps) => {
  const [menu, toggleMenu] = useMenu()
  const [sideMenu, toggleSideMenu] = useSideNav()
  const { header, sideNav } = useOptions()

  /** Use custom button from props or check header / mobileMenu options */
  const menuButton = customButton || header?.menuButton

  const conditionalAttributes = sideNav?.isPrimaryMobileNav
    ? { 'aria-expanded': sideMenu ? true : false, onClick: toggleSideMenu }
    : { 'aria-expanded': menu ? true : false, onClick: toggleMenu }

  const attributes = {
    title: 'Menu',
    className: mergeSelectors([
      'menu-button',
      visibleOnDesktop ? 'desktop-visible' : undefined,
    ]),
    'aria-label': 'Toggle Menu',
    ...conditionalAttributes,
    ...props,
  }

  return typeof menuButton === 'function' ? (
    menuButton(sideNav.isPrimaryMobileNav ? sideMenu : menu, attributes)
  ) : (
    <button {...attributes}>
      {menuButton || (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={mergeSelectors([
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
