import React from 'react'
import { Box } from 'theme-ui'

import { AccordionMenu } from './AccordionMenu'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'

const format = value => (isNaN(value) ? value : `${value}px`)

export const SideNav = React.forwardRef(
  (
    {
      bg = 'bg_sideNav',
      buttonVariant,
      buttonToggle = 'Toggle',
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

    const getTransform = width => {
      const w = Array.isArray(width) ? width[0] : width
      const shift = layout === 'sidenav-content' ? -w : w
      return active ? `translateX(0)` : `translateX(${format(shift)})`
    }

    return (
      <React.Fragment>
        <Box
          ref={ref}
          variant={variant}
          id="side-nav"
          role="navigation"
          {...props}
          __css={{
            bg,
            position: ['fixed', 'relative'],
            top: 0,
            bottom: 0,
            zIndex: [100, 0],
            width: t => t.sizes.width_sideNav,
            transform: t => [getTransform(t.sizes.width_sideNav), 'none'],
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
            variant={buttonVariant}
            sx={{
              position: 'fixed',
              display: ['inline-block', 'none'],
              bottom: 30,
            }}>
            {buttonToggle}
          </Box>
        ) : null}
      </React.Fragment>
    )
  }
)
