/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, Fragment } from 'react'

import { MakerProps, MakerOptions, MaybeElement } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import { MenuProps } from './Menu'
import { Button } from './Primitives'

import { CollapsibleMenu } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import { setBreakpoint, format } from '../utils/helper'

const Container = ({ isHeader, ...props }) =>
  isHeader ? <header {...props} /> : <div {...props} />

interface SideNavProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  toggleVariant?: string | string[]
  background?: string | string[]
  bg?: string | string[]
  buttonInner?: MaybeElement
  customToggle?: MakerOptions['sideNav']['customToggle']
  menu?: MenuProps[]
  pathname?: string
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * Use the `SideNav` component for `content sidenav` or `sidenav content` layouts.
 * Add it inside `Content` alongside the `Main` component.
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
      const shift = layout === 'sidenav content' ? `-${w}` : w
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
        <Container
          isHeader={sideNav.isHeader}
          ref={ref}
          id="sidenav"
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
          <ErrorBoundary errorKey="sideNav">
            {header && header}
            {children || (
              <CollapsibleMenu
                menu={menu}
                menuType="sideNav"
                pathname={pathname}
              />
            )}
            {footer && footer}
          </ErrorBoundary>
        </Container>
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

SideNav.displayName = 'SideNav'
