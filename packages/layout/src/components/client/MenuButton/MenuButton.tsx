'use client'

import * as React from 'react'
import { useWindowSize } from '@maker-ui/hooks'
import { cn } from '@maker-ui/utils'
import { useLayout, useMenu } from '../Provider'
import styles from './MenuButton.module.css'

interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  close?: boolean
  sideNav?: boolean
  renderProps?: (active?: boolean, attrs?: object) => React.ReactNode
}

/**
 * The `MenuButton` controls opening / closing the `MobileMenu`. It is included
 * inside the Navbar component but can be used anywhere inside your layout.
 *
 * @link https://maker-ui.com/docs/layout/buttons/#menuButton
 */
export const MenuButton = ({
  className,
  renderProps,
  sideNav = false,
  close = false,
  children,
  ...props
}: MenuButtonProps) => {
  const {
    options: { sideNav: sn, mobileMenu: mm },
  } = useLayout()
  const { width } = useWindowSize()
  const { active, setMenu } = useMenu()
  const positions = mm?.closeButtonPosition?.split('-')

  const attrs = sideNav
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

  function toggleSideMenu() {
    if (width && width > sn.breakpoint && sn.collapse) {
      setMenu('collapse', !active?.sideNavCollapse)
    } else {
      setMenu('sidenav', !active?.sideNav)
    }
  }

  const attributes = {
    title: 'Menu',
    className: cn([
      styles.btn_menu,
      sideNav ? 'mkui_btn_collapse fixed' : undefined,
      sn.collapse ? 'collapsible' : undefined,
      !sideNav && close ? 'mkui_btn_close fixed' : undefined,
      ...(sideNav || close ? positions || [] : []),
      className,
    ]),
    'aria-label': 'Toggle Menu',
    ...attrs,
    ...props,
  }

  return renderProps ? (
    <>
      {renderProps(
        sideNav && sn.isPrimaryMobileNav ? active?.sideNav : active?.menu,
        attributes
      )}
    </>
  ) : (
    <button {...attributes}>
      {children || !sideNav ? (
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
      ) : null}
    </button>
  )
}

MenuButton.displayName = 'MenuButton'
