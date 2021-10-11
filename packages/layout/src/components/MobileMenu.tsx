/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { forwardRef, Fragment } from 'react'

import { MakerOptions } from '../types'
import { CollapsibleMenu, MenuButton, MenuItemProps } from './Menu'
import { ErrorContainer } from './Errors'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'
import { mergeSelectors } from '../utils/helper'

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

/* Utility for mobile nav transitions that require a full-width window */
const fullWidth = ['fade', 'fade-up', 'fade-down']

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
      background,
      center,
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
          <Overlay show={show} toggle={toggleMenu} />
        ) : null}
        <div
          ref={ref}
          id={mergeSelectors(['mobile-menu', id])}
          className={mergeSelectors([
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
          <ErrorContainer errorKey="mobileMenu">
            {mobileMenu.showCloseButton || closeButton ? (
              <MenuButton customButton={closeButton} isCloseButton />
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
          </ErrorContainer>
        </div>
      </Fragment>
    )
  }
)

MobileMenu.displayName = 'MobileMenu'
