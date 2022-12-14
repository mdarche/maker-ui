'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useLayout, useMenu } from '../Provider'
import styles from './MenuButton.module.css'

interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  close?: boolean
  jsx?: (active?: boolean, attrs?: object) => React.ReactNode
}

/**
 * The `MenuButton` controls opening / closing the `MobileMenu`. It is included
 * inside the Navbar component but can be used anywhere inside your layout.
 *
 * @link https://maker-ui.com/docs/layout/buttons/#menuButton
 */
export const MenuButton = ({
  className,
  jsx,
  close = false,
  children,
  ...props
}: MenuButtonProps) => {
  const {
    options: { sideNav, mobileMenu },
  } = useLayout()
  const { active, setMenu } = useMenu()
  const positions = mobileMenu?.closeButtonPosition?.split('-')

  const conditionalAttributes = sideNav.isPrimaryMobileNav
    ? {
        'aria-expanded': active?.sideNav ? true : false,
        onClick: toggleSideMenu,
      }
    : {
        'aria-expanded': active?.menu ? true : false,
        onClick: toggleMobileMenu,
      }

  function toggleMobileMenu() {
    setMenu('menu', !active?.menu)
  }

  function toggleSideMenu() {}

  const attributes = {
    title: 'Menu',
    className: cn([
      styles.btn_menu,
      close ? 'mkr_btn_close fixed' : undefined,
      ...(positions || []),
      className,
    ]),
    'aria-label': 'Toggle Menu',
    ...conditionalAttributes,
    ...props,
  }

  return jsx ? (
    <>
      {jsx(
        sideNav.isPrimaryMobileNav ? active?.sideNav : active?.menu,
        attributes
      )}
    </>
  ) : (
    <button {...attributes}>
      {children || (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={cn([styles.btn_menu_icon, close ? 'close' : undefined])}>
          {close ? (
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
