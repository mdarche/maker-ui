import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'

const fullWidth = ['fade', 'fadeInUp', 'fadeInDown']

const getTransition = (active, type, width) => {
  const opacity = type.includes('fade') ? (active ? 1 : 0) : null
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

export const MobileNav = React.forwardRef((props, ref) => {
  const [menu, toggleMenu] = useMenu()
  const { mobileMenu } = useOptions()

  const {
    bg = 'bg_mobilenav',
    variant = 'mobile-nav',
    width = mobileMenu.width,
    animation = mobileMenu.animation,
  } = props

  return (
    <Box
      ref={ref}
      id="mobile-nav"
      variant={variant}
      // onClick={toggleMenu}
      {...props}
      __css={{
        position: 'fixed',
        bg,
        top: 0,
        bottom: 0,
        overflowY: 'scroll',
        transition: 'all ease .3s',
        ...getTransition(menu, animation, width),
      }}
    />
  )
})
