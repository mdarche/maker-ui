'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { forwardRef, Fragment } from 'react'

import type { MobileMenuOptions } from '@/types'
import { CollapseMenu, MenuButton } from '../Menu'
import { Overlay } from '../Overlay'
import { useMenu } from '../../temp/ActionContext'

interface MobileMenuProps
  extends MobileMenuOptions,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'mobileMenu'
}

/* Utility for mobile nav transitions that require a full-width window */
const fullWidth = ['fade', 'fade-up', 'fade-down']

/**
 * The `MobileMenu` component lets you customize a responsive overlay menu for mobile navigation.
 *
 * @link https://maker-ui.com/docs/layout/mobile-menu
 */
export const MobileMenu = (props: MobileMenuProps) => {
  const [show, toggleMenu] = useMenu()
  const {
    id,
    closeButton = mobileMenu.closeButton,
    closeButtonPosition = 'top-right',
    width,
    transition = mobileMenu.transition,
    menu = [],
    pathname,
    header,
    footer,
    className,
    css,
    children,
    ...rest
  } = props
  const cssValues = background || width || css

  return (
    <Fragment>
      {mobileMenu.closeOnBlur && !fullWidth.includes(transition) ? (
        <Overlay className="mobile-overlay" show={show} toggle={toggleMenu} />
      ) : null}
      <div
        ref={ref}
        id={cn(['mobile-menu', id])}
        className={cn([
          show ? 'active' : undefined,
          center ? 'center' : undefined,
          fullWidth.includes(transition) ? 'full-width' : undefined,
          `close-${closeButtonPosition}`,
          transition,
          className,
        ])}
        css={
          typeof cssValues !== 'undefined'
            ? {
                background,
                width,
                ...(css as object),
              }
            : undefined
        }
        {...rest}>
        {mobileMenu.showCloseButton || closeButton ? (
          // @ts-ignore
          <MenuButton customButton={closeButton} isCloseButton />
        ) : null}
        {header ? header : null}
        {children || (
          <CollapseMenu menu={menu} menuType="mobile" pathname={pathname} />
        )}
        {footer ? footer : null}
      </div>
    </Fragment>
  )
}

MobileMenu.displayName = 'MobileMenu'
