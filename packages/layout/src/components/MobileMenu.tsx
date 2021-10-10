/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { forwardRef, Fragment } from 'react'

import { MakerOptions } from '../types'
import { CollapsibleMenu, MenuButton, MenuItemProps } from './Menu'
import { ErrorBoundary } from './Errors'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'
import { getTransition, fullWidth, mergeSelectors } from '../utils/helper'

interface MobileMenuProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  transition?: MakerOptions['mobileMenu']['transition']
  background?: string | string[]
  width?: ResponsiveScale
  menu?: MenuItemProps[]
  center?: boolean
  pathname?: string
  closeButton?: MakerOptions['mobileMenu']['closeButton']
  closeButtonPosition?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
  header?: React.ReactElement
  footer?: React.ReactElement
  className?: string
}

/**
 * The `MobileMenu` component lets you customize a responsive overlay menu for mobile navigation.
 *
 * @link https://maker-ui.com/docs/layout/mobile-menu
 */

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  (props, ref) => {
    const [show, toggleMenu] = useMenu()
    const { mobileMenu } = useOptions()

    const {
      id,
      background = 'var(--color-bg_mobileMenu)',
      center,
      closeButton = mobileMenu.closeButton,
      closeButtonPosition = 'top-right',
      width = 'var(--width_mobileMenu)',
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

    const centerStyles: object | undefined = center
      ? {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }
      : undefined

    const buttonX = closeButtonPosition.includes('right')
      ? { right: 0 }
      : { left: 0 }

    const buttonY = closeButtonPosition.includes('top')
      ? { top: 0 }
      : { bottom: 0 }

    return (
      <Fragment>
        {mobileMenu.closeOnBlur && !fullWidth.includes(transition) ? (
          <Overlay show={show} toggle={toggleMenu} />
        ) : null}
        <div
          ref={ref}
          id={mergeSelectors(['mobile-menu', id])}
          className={mergeSelectors([show ? 'active' : undefined, className])}
          css={{
            position: 'fixed',
            background,
            top: 0,
            bottom: 0,
            zIndex: 100,
            willChange: 'transform, opacity',
            transition: mobileMenu.cssTransition,
            ...getTransition(show, transition, width),
            ...centerStyles,
            ...(css as object),
          }}
          {...rest}>
          <ErrorBoundary errorKey="mobileMenu">
            {mobileMenu.showCloseButton || closeButton ? (
              <MenuButton
                customButton={closeButton}
                isCloseButton
                css={{ position: 'absolute', ...buttonY, ...buttonX }}
              />
            ) : null}
            {header ? header : null}
            {children || (
              <CollapsibleMenu
                menu={menu}
                menuType="mobile"
                pathname={pathname}
              />
            )}
            {footer ? footer : null}
          </ErrorBoundary>
        </div>
      </Fragment>
    )
  }
)

MobileMenu.displayName = 'MobileMenu'
