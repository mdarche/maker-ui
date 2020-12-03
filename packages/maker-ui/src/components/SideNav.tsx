/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { MakerProps, MakerOptions } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import { MenuProps } from './Menu'
import { Button } from './Primitives'

import { CollapsibleMenu } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import { setBreakpoint, format } from '../utils/helper'
import { useLayout } from '../context/LayoutContext'

const Container = ({ isHeader, ...props }) =>
  isHeader ? <header {...props} /> : <div {...props} />

interface SideNavProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  bg?: string | string[]
  toggleButton?: MakerOptions['sideNav']['toggleButton']
  menu?: MenuProps[]
  pathname?: string
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * The `SideNav` component creates a side navigation panel alongside the page's main
 * content. It can be toggled open or closed on mobile or it can serve as the page's
 * primary <header> tag.
 *
 * @see https://maker-ui.com/docs/layout/sidenav
 */

export const SideNav = forwardRef<HTMLElement, SideNavProps>(
  (
    {
      bg = 'bg_sideNav',
      background,
      toggleButton,
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
    const [layout] = useLayout('content')
    const { sideNav } = useOptions()

    const bp = sideNav.breakIndex
    const customButton = toggleButton || sideNav.toggleButton

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
      <ErrorBoundary errorKey="sideNav">
        {sideNav.closeOnBlur ? (
          <Overlay
            show={active}
            toggle={setActive}
            type="sideNav"
            bp={sideNav.breakIndex}
          />
        ) : null}
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
            transition: sideNav.easingCurve || 'transform ease .3s',
          }}
          {...props}>
          {header ? header : null}
          {children || menu ? (
            <CollapsibleMenu
              menu={menu}
              menuType="sideNav"
              pathname={pathname}
            />
          ) : null}
          {footer ? footer : null}
        </Container>
        {typeof customButton === 'function' ? (
          customButton(active, toggleAttributes)
        ) : sideNav.showToggleOnMobile ? (
          <Button
            {...toggleAttributes}
            sx={{
              variant: `${variant}.toggle`,
              position: 'fixed',
              display: setBreakpoint(bp, ['inline-block', 'none']),
              bottom: 30,
              zIndex: 100,
            }}>
            {customButton === 'default'
              ? active
                ? 'close'
                : 'open'
              : customButton}
          </Button>
        ) : null}
      </ErrorBoundary>
    )
  }
)

SideNav.displayName = 'SideNav'
