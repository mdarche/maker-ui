import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { type MakerCSS, Style } from '@maker-ui/style'
import type { LayoutButtonProps } from '@maker-ui/layout-server'

import { useMenu } from '../hooks'

interface MenuButtonProps
  extends MakerCSS,
    LayoutButtonProps,
    React.HTMLAttributes<HTMLButtonElement> {
  themes?: {
    default?: string | React.ReactElement
    active?: string | React.ReactElement
  }
}

/**
 * The `MenuButton` controls opening / closing all Maker UI layout menus including, the
 * MobileMenu and Panel components.
 *

 * @link https://maker-ui.com/docs/layout/header
 */
export const MenuButton = ({
  className,
  type = 'mobile-menu',
  icon,
  label,
  defaultIcon = 'menu',
  activeClassName = 'active',
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
  const [styleId] = React.useState(`mkui-btn-${type}`)
  const { active, setMenu } = useMenu()

  const attrs =
    type === 'mobile-menu'
      ? {
          'aria-expanded': active?.mobileMenu ? true : false,
          onClick: () => setMenu(!active?.mobileMenu, 'mobile-menu'),
        }
      : type === 'left-panel' || type === 'right-panel'
      ? {
          onClick: () => {
            if (type === 'left-panel') {
              console.log('Left panel clicked')
              setMenu(!active.leftPanel, 'left-panel')
            } else {
              setMenu(!active.rightPanel, 'right-panel')
            }
          },
        }
      : {}

  const attributes = {
    title: 'Menu',
    className: cn([
      'mkui-btn-menu',
      `mkui-btn-${type}`,
      styleId,
      fixed ? 'fixed' : absolute ? 'absolute' : sticky ? 'sticky' : undefined,
      type === 'mobile-menu' && active['mobileMenu']
        ? activeClassName
        : undefined,
      type === 'left-panel' && active['leftPanel']
        ? activeClassName
        : undefined,
      type === 'right-panel' && active['rightPanel']
        ? activeClassName
        : undefined,
      className,
    ]),
    'aria-label': label || 'Toggle Menu',
    ...attrs,
    ...props,
  }

  return (
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
