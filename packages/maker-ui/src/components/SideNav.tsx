/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, Fragment } from 'react'

import { MakerProps, MaybeElement } from './types'
import { MenuProps } from './Menu'
import { Box, Button } from './Primitives'

import { CollapsibleMenu } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import { setBreakpoint } from '../utils/helper'

const format = value => (isNaN(value) ? value : `${value}px`)

interface SideNavProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  toggleVariant?: string | string[]
  background?: string | string[]
  bg?: string | string[]
  buttonInner?: MaybeElement
  customToggle?(isOpen?: boolean, attributes?: object): React.ReactElement
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
      buttonInner = 'Toggle',
      customToggle,
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
    const customButton = customToggle || sideNav.customToggle

    const getTransform = width => {
      const w = Array.isArray(width) ? width[bp] : width
      const shift = layout === 'sidenav-content' ? `-${w}` : w
      return active ? `translateX(0)` : `translateX(${format(shift)})`
    }

    const toggleAttributes = {
      id: 'toggle-sidenav',
      title: 'Toggle side navigation',
      'aria-label': 'Toggle side navigation',
      onClick: setActive,
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
            <CollapsibleMenu
              menu={menu}
              menuType="sideNav"
              pathname={pathname}
            />
          )}
          {footer && footer}
        </Box>
        {customButton ? customButton(active, toggleAttributes) : null}
        {sideNav.floatingToggle && !customButton ? (
          <Button
            {...toggleAttributes}
            sx={{
              variant: toggleVariant,
              position: 'fixed',
              display: setBreakpoint(bp, ['inline-block', 'none']),
              bottom: 30,
              zIndex: 100,
            }}>
            {buttonInner}
          </Button>
        ) : null}
      </Fragment>
    )
  }
)

SideNav.displayName = 'SideNav_MakerUI'
