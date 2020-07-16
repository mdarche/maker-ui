import React from 'react'

import { ResponsiveScale, MenuProps, BasicBoxProps } from './types'
import { AccordionMenu } from './AccordionMenu'
import { Box, Overlay, MenuButton } from './common'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'

interface Props extends BasicBoxProps {
  transition?: string
  width?: ResponsiveScale
  menu?: MenuProps[]
  pathname?: string
  header?: React.ReactElement
  footer?: React.ReactElement
}

const defaultProps = {
  bg: 'bg_mobileMenu',
  variant: 'mobileMenu',
  menu: [],
}

/**
 * Mobile nav transitions that require full-width screen
 */
const fullWidth: string[] = ['fade', 'fade-up', 'fade-down']

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
 * @see https://maker-ui.com/docs/mobile-menu
 */

export const MobileMenu = React.forwardRef<HTMLElement, Props>((props, ref) => {
  const [show, toggleMenu] = useMenu()
  const { mobileMenu } = useOptions()

  const {
    bg,
    variant,
    width = mobileMenu.width,
    transition = mobileMenu.transition,
    menu,
    pathname,
    header,
    footer,
    children,
  } = props

  return (
    <React.Fragment>
      {mobileMenu.closeOnBlur && !fullWidth.includes(transition) && (
        <Overlay show={show} toggle={toggleMenu} />
      )}
      <Box
        ref={ref}
        id="mobile-menu"
        variant={variant}
        {...props}
        base={{
          sx: {
            position: 'fixed',
            bg,
            top: 0,
            bottom: 0,
            zIndex: 100,
            willChange: 'transform opacity',
            transition: 'all ease .3s',
            ...getTransition(show, transition, width),
          },
        }}>
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
      </Box>
    </React.Fragment>
  )
})

MobileMenu.defaultProps = defaultProps
