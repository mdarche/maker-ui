import React from 'react'
import { Box } from 'theme-ui'

import { AccordionMenu } from './AccordionMenu'
import { Overlay } from './common'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import setBreak from '../config/breakpoint'

const format = value => (isNaN(value) ? value : `${value}px`)

export const SideNav = React.forwardRef(
  (
    {
      bg = 'bg_sideNav',
      toggleVariant,
      customToggle = 'Toggle',
      variant = 'sideNav',
      menu,
      location,
      children,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = useSideNav()
    const { layout, sideNav } = useOptions()

    const bp = sideNav.breakIndex

    const getTransform = width => {
      const w = Array.isArray(width) ? width[bp] : width
      const shift = layout === 'sidenav-content' ? -w : w
      return active ? `translateX(0)` : `translateX(${format(shift)})`
    }

    return (
      <React.Fragment>
        {sideNav.closeOnBlur && <Overlay show={active} toggle={setActive} />}
        <Box
          ref={ref}
          variant={variant}
          id="side-nav"
          role="navigation"
          {...props}
          __css={{
            bg,
            position: setBreak(bp, ['fixed', 'relative']),
            top: 0,
            bottom: 0,
            zIndex: setBreak(bp, [100, 0]),
            width: t => t.sizes.width_sideNav,
            transform: t =>
              setBreak(bp, [getTransform(t.sizes.width_sideNav), 'none']),
            transition: 'transform ease .3s',
          }}>
          {children || <AccordionMenu menu={menu} location={location} />}
        </Box>
        {sideNav.floatingToggle ? (
          <Box
            as="button"
            id="toggle-sidenav"
            title="Toggle SideNav"
            aria-label="Toggle side navigation"
            onClick={setActive}
            variant={toggleVariant}
            sx={{
              position: 'fixed',
              display: setBreak(bp, ['inline-block', 'none']),
              bottom: 30,
            }}>
            {customToggle}
          </Box>
        ) : null}
      </React.Fragment>
    )
  }
)
