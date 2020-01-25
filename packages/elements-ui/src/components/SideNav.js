import React from 'react'
import { Box } from 'theme-ui'

import { useSideNav, useOptions } from '../context/ElementsContext'

const format = value => {
  return isNaN(value) ? value : `${value}px`
}

export const SideNav = React.forwardRef(
  (
    {
      bg = 'bg_sidenav',
      sx,
      buttonVariant,
      buttonToggle = 'Toggle',
      children,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = useSideNav()
    const { layout } = useOptions()

    const getTransform = width => {
      const direction = layout === 'sidenav-content' ? -width : width
      return active ? `translateX(0)` : `translateX(${format(direction)})`
    }

    return (
      <React.Fragment>
        <Box
          ref={ref}
          {...props}
          id="side-nav"
          role="navigation"
          sx={{
            bg,
            width: 'width_sidenav',
            position: ['fixed', 'relative'],
            top: 0,
            bottom: 0,
            zIndex: 100,
            transform: ({ sizes }) => [
              getTransform(sizes.width_sidenav),
              'none',
            ],
            transition: 'transform ease .3s',
            ...sx,
          }}>
          {children}
        </Box>
        <Box
          as="button"
          onClick={setActive}
          aria-label="Toggle side navigation"
          id="toggle-sidenav"
          sx={{
            position: 'fixed',
            display: ['inline-block', 'none'],
            bottom: 30,
          }}
          variant={buttonVariant}>
          {buttonToggle}
        </Box>
      </React.Fragment>
    )
  }
)
