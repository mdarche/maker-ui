/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, Fragment } from 'react'

import { LayoutProps, MenuProps, MaybeElement } from './types'
import { Box, Button } from './common'
import { AccordionMenu } from './AccordionMenu'
import { Overlay } from './common'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import { setBreakpoint } from '../utils/helper'

const format = value => (isNaN(value) ? value : `${value}px`)

interface SideNavProps
  extends LayoutProps,
    React.HTMLAttributes<HTMLDivElement> {
  toggleVariant?: string | string[]
  background?: string | string[]
  customToggle: MaybeElement
  menu?: MenuProps[]
  pathname?: string
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * Use the `SideNav` component for `content-sidenav` or `sidenav-content` layouts.
 * Add it inside the `Content` component alongside the `Main` component.
 *
 * @see https://maker-ui.com/docs/sidenav
 */

export const SideNav = forwardRef<HTMLElement, SideNavProps>(
  (
    {
      bg = 'bg_sideNav',
      background,
      toggleVariant = 'sideNav.toggle',
      customToggle = 'Toggle',
      variant = 'sideNav',
      menu,
      pathname,
      header,
      footer,
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
      const shift = layout === 'sidenav-content' ? `-${w}` : w
      return active ? `translateX(0)` : `translateX(${format(shift)})`
    }

    return (
      <Fragment>
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
          as={sideNav.isHeader && 'header'}
          id="side-nav"
          sx={{
            bg,
            background,
            variant,
            position: setBreakpoint(bp, ['fixed', 'relative']),
            top: 0,
            bottom: 0,
            zIndex: setBreakpoint(bp, [100, 0]),
            width: t => t.sizes.width_sideNav,
            willChange: 'transform',
            transform: t =>
              setBreakpoint(bp, [getTransform(t.sizes.width_sideNav), 'none']),
            transition: 'transform ease .3s',
          }}
          {...props}>
          {header && header}
          {children || (
            <AccordionMenu menu={menu} menuType="sideNav" pathname={pathname} />
          )}
          {footer && footer}
        </Box>
        {sideNav.floatingToggle ? (
          <Button
            id="toggle-sidenav"
            title="Toggle SideNav"
            aria-label="Toggle side navigation"
            onClick={setActive}
            sx={{
              variant: toggleVariant,
              position: 'fixed',
              display: setBreakpoint(bp, ['inline-block', 'none']),
              bottom: 30,
              zIndex: 100,
            }}>
            {customToggle}
          </Button>
        ) : null}
      </Fragment>
    )
  }
)
