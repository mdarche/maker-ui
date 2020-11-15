/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, Fragment } from 'react'

import { ResponsiveScale, MakerProps, MakerOptions } from './types'
import { CollapsibleMenu, MenuButton, MenuProps } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'
import { getTransition, fullWidth } from '../utils/helper'

interface MobileMenuProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  transition?: MakerOptions['mobileMenu']['transition']
  background?: string | string[]
  bg?: string | string[]
  width?: ResponsiveScale
  menu?: MenuProps[]
  pathname?: string
  closeButton?: MakerOptions['mobileMenu']['customCloseButton']
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * Use the `MobileMenu` component to customize a responsive overlay menu for mobile navigation.
 *
 * @todo calcluate default fill color of the close button with an accessibility color picker
 *
 * @see https://maker-ui.com/docs/mobile-menu
 */

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  (props, ref) => {
    const [show, toggleMenu] = useMenu()
    const { mobileMenu } = useOptions()

    const {
      bg = 'bg_mobileMenu',
      variant = 'mobileMenu',
      background,
      closeButton,
      width = mobileMenu.width,
      transition = mobileMenu.transition,
      menu = [],
      pathname,
      header,
      footer,
      children,
      sx,
      ...rest
    } = props
    const customButton = closeButton || mobileMenu.customCloseButton

    return (
      <Fragment>
        {mobileMenu.closeOnBlur && !fullWidth.includes(transition) ? (
          <Overlay show={show} toggle={toggleMenu} />
        ) : null}
        <div
          ref={ref}
          id="mobile-menu"
          sx={{
            position: 'fixed',
            bg,
            background,
            variant,
            top: 0,
            bottom: 0,
            zIndex: 100,
            willChange: 'transform opacity',
            transition: 'all ease .3s',
            ...getTransition(show, transition, width),
            ...sx,
          }}
          {...rest}>
          {mobileMenu.defaultCloseButton || customButton ? (
            <MenuButton
              customButton={customButton}
              sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
              closeIcon
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
        </div>
      </Fragment>
    )
  }
)

MobileMenu.displayName = 'MobileMenu_MakerUI'
