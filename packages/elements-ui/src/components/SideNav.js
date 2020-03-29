import React from 'react'
import { Box } from 'theme-ui'

import AccordionMenu from './AccordionMenu'
import { Overlay } from './common'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import { setBreakpoint } from '../utils/helper'

const format = value => (isNaN(value) ? value : `${value}px`)

const SideNav = React.forwardRef(
  (
    {
      bg = 'bg_sideNav',
      toggleVariant,
      customToggle = 'Toggle',
      variant = 'sideNav',
      menu,
      pathname,
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
        {sideNav.closeOnBlur && (
          <Overlay
            show={active}
            toggle={setActive}
            type="sideNav"
            bp={sideNav.breakIndex}
          />
        )}
        <Box
          ref={ref}
          variant={variant}
          id="side-nav"
          role="navigation"
          {...props}
          __css={{
            bg,
            position: setBreakpoint(bp, ['fixed', 'relative']),
            top: 0,
            bottom: 0,
            zIndex: setBreakpoint(bp, [100, 0]),
            width: t => t.sizes.width_sideNav,
            willChange: 'transform',
            transform: t =>
              setBreakpoint(bp, [getTransform(t.sizes.width_sideNav), 'none']),
            transition: 'transform ease .3s',
          }}>
          {children || (
            <AccordionMenu menu={menu} menuType="sideNav" pathname={pathname} />
          )}
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
              display: setBreakpoint(bp, ['inline-block', 'none']),
              bottom: 30,
              zIndex: 100,
            }}>
            {customToggle}
          </Box>
        ) : null}
      </React.Fragment>
    )
  }
)

export default SideNav
