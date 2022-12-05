import * as React from 'react'
import { cn } from '@maker-ui/utils'

import type { MobileMenuOptions } from '@/types'
import { CollapseMenu, MenuButton, type MenuItemProps } from '../Menu'
import { Overlay } from '../Overlay'
import styles from './MobileMenu.module.css'

export interface MobileMenuProps
  extends MobileMenuOptions,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'mobileMenu'
  header?: React.ReactNode
  footer?: React.ReactNode
  menu?: MenuItemProps[]
}

/* Utility for mobile nav transitions that require a full-width window */
const fullWidth = ['fade', 'fade-up', 'fade-down']

/**
 * The `MobileMenu` component lets you customize a responsive overlay menu for mobile navigation.
 *
 * @link https://maker-ui.com/docs/layout/mobile-menu
 */
export const MobileMenu = ({
  _type = 'mobileMenu',
  className,
  header,
  footer,
  menu = [],
  closeButton,
  closeButtonPosition = 'top-right',
  showCloseButton,
  closeOnBlur,
  center,
  transition,
  children,
  ...props
}: MobileMenuProps) => {
  return (
    <>
      {closeOnBlur && !fullWidth.includes(transition) ? (
        <Overlay className="mobile-menu" />
      ) : null}
      <div
        className={cn([
          styles.mobile_menu,
          center ? 'center' : undefined,
          fullWidth.includes(transition) ? 'full-width' : undefined,
          `close-${closeButtonPosition}`,
          transition,
          className,
        ])}
        {...props}>
        {showCloseButton || closeButton ? (
          // @ts-ignore
          <MenuButton customButton={closeButton} isCloseButton />
        ) : null}
        {header ? header : null}
        {children || <CollapseMenu menu={menu} />}
        {footer ? footer : null}
      </div>
    </>
  )
}

MobileMenu.displayName = 'MobileMenu'
