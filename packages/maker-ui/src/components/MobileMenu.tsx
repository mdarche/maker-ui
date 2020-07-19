/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, Fragment } from 'react'

import { ResponsiveScale, MenuProps, LayoutProps } from './types'
import { AccordionMenu } from './AccordionMenu'
import { Overlay, MenuButton } from './common'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'

interface MobileMenuProps
  extends LayoutProps,
    React.HTMLAttributes<HTMLDivElement> {
  transition?: string
  background?: string | string[]
  width?: ResponsiveScale
  menu?: MenuProps[]
  pathname?: string
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * Mobile nav transitions that require full-width screen
 */

const fullWidth: string[] = ['fade', 'fade-up', 'fade-down']

/**
 * Uses the nav's settings to build the appropriate transition and position.
 *
 * @param active - a boolean that determines whether or not the menu is active
 * @param type - the transition style (string)
 * @param width - the mobile menu's width specificed in the options configuration
 */

const getTransition = (active, type, width): React.CSSProperties => {
  const opacity = type.includes('fade') ? (active ? 1 : 0) : 1
  const visibility = active ? 'visible' : 'hidden'

  const directionX = type.includes('right')
    ? { right: 0, width, transform: active ? null : 'translateX(100%)' }
    : { left: 0, width, transform: active ? null : 'translateX(-100%)' }

  const directionY = () => {
    if (type !== 'fade') {
      const sign = type === 'fade-up' ? '' : '-'
      return { transform: !active ? `translateY(${sign}20px)` : null }
    }
    return null
  }

  const size = fullWidth.includes(type)
    ? { width: '100%', left: 0, ...directionY() }
    : directionX

  return {
    opacity,
    visibility,
    ...size,
  }
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
      width = mobileMenu.width,
      transition = mobileMenu.transition,
      menu = [],
      pathname,
      header,
      footer,
      children,
      ...rest
    } = props

    return (
      <Fragment>
        {mobileMenu.closeOnBlur && !fullWidth.includes(transition) && (
          <Overlay show={show} toggle={toggleMenu} />
        )}
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
          }}
          {...rest}>
          {mobileMenu.defaultCloseButton ? (
            <MenuButton
              sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
              closeIcon
            />
          ) : null}
          {header && header}
          {children || (
            <AccordionMenu menu={menu} menuType="mobile" pathname={pathname} />
          )}
          {footer && footer}
        </div>
      </Fragment>
    )
  }
)
