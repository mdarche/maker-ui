import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'

const format = value => {
  return isNaN(value) ? value : `${value}px`
}

export const SideNav = React.forwardRef(
  (
    {
      bg = 'bg_sidenav',
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
      <>
        <Box
          ref={ref}
          id="side-nav"
          role="navigation"
          {...props}
          __css={{
            bg,
            width: 'width_sidenav',
            position: ['fixed', 'relative'],
            top: 0,
            bottom: 0,
            zIndex: 100,
            transform: t => [getTransform(t.sizes.width_sidenav), 'none'],
            transition: 'transform ease .3s',
          }}>
          {children}
        </Box>
        <Box
          as="button"
          id="toggle-sidenav"
          title="Toggle SideNav"
          aria-label="Toggle side navigation"
          onClick={setActive}
          variant={buttonVariant}
          __css={{
            position: 'fixed',
            display: ['inline-block', 'none'],
            bottom: 30,
          }}>
          {buttonToggle}
        </Box>
      </>
    )
  }
)
