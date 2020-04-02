import React from 'react'
import { Box } from 'theme-ui'

import AccordionMenu from './AccordionMenu'
import { Overlay, MenuButton } from './common'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'

const fullWidth = ['fade', 'fade-up', 'fade-down']

const getTransition = (active, type, width) => {
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

const MobileMenu = React.forwardRef((props, ref) => {
  const [show, toggleMenu] = useMenu()
  const { mobileMenu } = useOptions()

  const {
    bg = 'bg_mobileMenu',
    variant = 'mobileMenu',
    width = mobileMenu.width,
    transition = mobileMenu.transition,
    menu = [],
    pathname,
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
        __css={{
          position: 'fixed',
          bg,
          top: 0,
          bottom: 0,
          zIndex: 100,
          willChange: 'transform opacity',
          transition: 'all ease .3s',
          ...getTransition(show, transition, width),
        }}>
        {mobileMenu.defaultCloseButton ? (
          <MenuButton
            sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
            closeIcon
          />
        ) : null}
        {children || (
          <AccordionMenu menu={menu} menuType="mobile" pathname={pathname} />
        )}
      </Box>
    </React.Fragment>
  )
})

export default MobileMenu
