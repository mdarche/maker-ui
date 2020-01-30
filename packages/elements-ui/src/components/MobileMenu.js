import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'

const fullWidth = ['fade', 'fadeInUp', 'fadeInDown']

// TODO - Tighten up this format function

const getTransition = (active, type, width) => {
  const opacity = type.includes('fade') ? (active ? 1 : 0) : 1
  const visibility = active ? 'visible' : 'hidden'

  const directionX = type.includes('Right')
    ? { right: 0, width, transform: active ? null : 'translateX(100%)' }
    : { left: 0, width, transform: active ? null : 'translateX(-100%)' }

  const directionY = () => {
    if (type !== 'fade') {
      const sign = type === 'fadeInUp' ? '' : '-'
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

const MenuOverlay = ({ menu, toggleMenu, type }) =>
  fullWidth.includes(type) ? null : (
    <Box
      id="menu-overlay"
      role="presentation"
      onClick={toggleMenu}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.2)',
        visibility: menu ? 'visible' : 'hidden',
        opacity: menu ? 1 : 0,
        transition: 'all ease .4s',
      }}
    />
  )

export const MobileMenu = React.forwardRef((props, ref) => {
  const [menu, toggleMenu] = useMenu()
  const { mobileMenu } = useOptions()

  const {
    bg = 'bg_mobileMenu',
    variant = 'mobileMenu',
    width = mobileMenu.width,
    transition = mobileMenu.transition,
  } = props

  return (
    <React.Fragment>
      <MenuOverlay type={transition} menu={menu} toggleMenu={toggleMenu} />
      <Box
        ref={ref}
        id="mobile-nav"
        variant={variant}
        {...props}
        __css={{
          position: 'fixed',
          bg,
          top: 0,
          bottom: 0,
          transition: 'all ease .3s',
          ...getTransition(menu, transition, width),
        }}
      />
    </React.Fragment>
  )
})
