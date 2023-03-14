import * as React from 'react'
import { useWindowSize } from '@maker-ui/hooks'
import { cn, generateId } from '@maker-ui/utils'
import { type MakerCSS, Style } from '@maker-ui/style'
import type { LayoutButtonProps } from '@maker-ui/layout-server'

import { useLayout, useMenu } from '../hooks'

interface MenuButtonProps
  extends MakerCSS,
    LayoutButtonProps,
    React.HTMLAttributes<HTMLButtonElement> {
  /** A callback function that you can use to render your own menu button.
   * Note that this prop is incompatible with the LayoutButtonProps so you are
   * responsible for styling the button. */
  renderProps?: (active?: boolean, attrs?: object) => React.ReactNode
}

/**
 * The `MenuButton` controls opening / closing all Maker UI layout menus including, the
 * MobileMenu, SideNav, and Workspace panels.
 *
 * @link https://maker-ui.com/docs/layout/header
 */
export const MenuButton = ({
  className,
  renderProps,
  type = 'mobile-menu',
  icon,
  label,
  defaultIcon = 'menu',
  css,
  breakpoints,
  mediaQuery,
  position,
  fixed,
  absolute,
  sticky,
  height,
  width,
  margin,
  padding,
  fill,
  stroke,
  strokeWidth,
  children,
  ...props
}: MenuButtonProps) => {
  const [styleId] = React.useState(generateId())
  const {
    options: { sideNav, mobileMenu, workspace },
  } = useLayout()
  const { width: windowWidth } = useWindowSize()
  const { active, setMenu } = useMenu()

  const attrs =
    type === 'side-nav'
      ? {
          'aria-expanded':
            width && width > sideNav?.breakpoint
              ? active.sideNavDesktop
              : active.sideNavMobile,
          onClick: toggleSideNav,
        }
      : type === 'mobile-menu'
      ? {
          'aria-expanded': active?.mobileMenu ? true : false,
          onClick: () => setMenu(!active?.mobileMenu, 'mobile-menu'),
        }
      : type === 'ws-left' || type === 'ws-right'
      ? {
          onClick: () => {
            if (type === 'ws-left') {
              setMenu(!active.workspaceLeft, 'ws-left')
            } else {
              setMenu(!active.workspaceRight, 'ws-right')
            }
          },
        }
      : {}

  function toggleSideNav() {
    if (windowWidth && windowWidth > sideNav.breakpoint && sideNav.collapse) {
      console.log('collapsing here')
      setMenu(!active.sideNavDesktop, 'side-nav-desktop')
    } else {
      setMenu(!active.sideNavMobile, 'side-nav-mobile')
    }
  }

  const attributes = {
    title: 'Menu',
    className: cn([
      'mkui-btn-menu',
      `mkui-btn-${type}`,
      styleId,
      fixed ? 'fixed' : absolute ? 'absolute' : sticky ? 'sticky' : undefined,
      type === 'side-nav' && !sideNav.showCollapseOnMobile
        ? 'mobile-hide'
        : undefined,
      type === 'side-nav' && sideNav.collapse ? 'desktop' : undefined,
      type === 'ws-left' && active['workspaceLeft'] ? 'active' : undefined,
      type === 'ws-right' && active['workspaceRight'] ? 'active' : undefined,
      className,
    ]),
    'aria-label': label || 'Toggle Menu',
    ...attrs,
    ...props,
  }

  return renderProps ? (
    <>
      {renderProps(
        type === 'side-nav' && sideNav.isPrimaryMobileNav
          ? active?.sideNavMobile
          : active?.mobileMenu,
        attributes
      )}
    </>
  ) : (
    <button {...attributes}>
      <Style
        root={styleId}
        css={{
          padding,
          margin,
          ...(position || {}),
          svg: { height, width, fill, stroke, strokeWidth },
          ...css,
        }}
        breakpoints={breakpoints}
        mediaQuery={mediaQuery}
      />
      {icon ? (
        icon
      ) : children ? (
        children
      ) : defaultIcon ? (
        <DefaultIcon type={defaultIcon} />
      ) : null}
    </button>
  )
}

const DefaultIcon = ({ type }: { type: MenuButtonProps['defaultIcon'] }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(['mkui-btn-menu-icon'])}>
    {type === 'close' ? (
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    ) : (
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    )}
  </svg>
)

MenuButton.displayName = 'MenuButton'
