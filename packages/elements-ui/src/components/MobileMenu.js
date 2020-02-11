import React from 'react'
import { Box } from 'theme-ui'

import { AccordionMenu } from './AccordionMenu'
import { Overlay } from './common'
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

// TODO - Add default close button

export const MobileMenu = React.forwardRef((props, ref) => {
  const [show, toggleMenu] = useMenu()
  const { mobileMenu } = useOptions()

  const {
    bg = 'bg_mobileMenu',
    variant = 'mobileMenu',
    width = mobileMenu.width,
    transition = mobileMenu.transition,
    menu = [],
    location,
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
          transition: 'all ease .3s',
          ...getTransition(show, transition, width),
        }}>
        {children || <AccordionMenu menu={menu} location={location} />}
      </Box>
    </React.Fragment>
  )
})
