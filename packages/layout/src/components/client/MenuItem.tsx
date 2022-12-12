'use client'

import * as React from 'react'
import { cn, Conditional } from '@maker-ui/utils'
import Link from 'next/link'

export interface MenuItemProps {
  label: string
  path?: string
  className?: string
  icon?: React.ReactElement | string
  newTab?: boolean
  submenu?: MenuItemProps[]
  openNested?: boolean
  divider?: boolean
  isExpandButton?: boolean
  megamenu?: React.ReactElement
  liAttributes?: object
}

/**
 * `MakerMenu` is the menu structure for all menu-compatible Maker UI components. Create a
 * deeply nested array of menu items that include:
 *
 * @param {string} label The menu item label
 * @param {string} path The relative path or off-site URL
 * @param {string?} className Custom class selectors for the menu item
 * @param {React.ReactElement?} icon A React element to be rendered before the label
 * @param {boolean} newTab A boolean that specifies whether the link should open in a new tab
 * @param {MenuItem[]} submenu A nested array of additional MenuItems
 * @param {boolean} openNested A boolean that hides or displays the nested submenu
 *
 * @example
 * const menu: MakerMenu = [
 *  { label: 'Home', path: '/' },
 *  { label: 'About', path: '/about', submenu:
 *    [
 *      { label: 'Team', path: '/about/team' },
 *      { label: 'History', path: '/about/history' },
 *    ]
 *  },
 * ]
 */
export type MakerMenu = MenuItemProps[]

interface MenuInternalProps {
  data: MenuItemProps
  caret?: boolean | React.ReactElement
  pathname?: string | null
  isHeader?: boolean
  depth?: number
}

/**
 * Returns a menu item and nested children for `NavMenu` or `CollapsibleMenu`
 * components. This component uses recursion to create nested menus.
 *
 * @internal
 *
 */

export const MenuItem = React.memo(
  ({
    data: {
      label,
      path,
      newTab,
      submenu,
      openNested = false,
      className = '',
      icon,
      divider,
      isExpandButton,
      megamenu,
      liAttributes,
    },
    caret = false,
    pathname,
    isHeader = false,
    depth = 0,
  }: MenuInternalProps) => {
    const [showNested, setNested] = React.useState(openNested)
    const isLocal = !!(path && !path?.startsWith('/'))

    const attributes = {
      className: pathname === path ? 'current' : undefined,
      target: newTab ? '_blank' : undefined,
      rel: newTab ? 'noopener noreferrer' : undefined,
      'aria-label': icon ? label : undefined,
      'aria-haspopup':
        isHeader && submenu
          ? ('true' as 'true')
          : isHeader && megamenu
          ? ('true' as 'true')
          : undefined,
      'aria-current': pathname === path ? ('page' as 'page') : undefined,
    }

    return (
      <li
        className={cn([
          'menu-item',
          megamenu ? 'has-megamenu' : undefined,
          submenu ? 'has-submenu' : undefined,
          submenu && isHeader ? 'caret' : undefined,
          showNested ? 'expanded' : undefined,
          className,
        ])}
        {...liAttributes}>
        <Conditional
          condition={!isHeader && submenu ? true : false}
          wrapper={(children) => <div className="flex">{children}</div>}>
          <>
            {!isHeader && divider ? (
              label
            ) : !isHeader && isExpandButton && submenu ? (
              <button onClick={() => setNested(!showNested)}>{label}</button>
            ) : (
              <Conditional
                condition={isLocal}
                wrapper={(children) => (
                  <Link href={path as string} legacyBehavior>
                    {children}
                  </Link>
                )}>
                <a href={isLocal ? undefined : path} {...attributes}>
                  {icon ? <span className="menu-icon">{icon}</span> : undefined}
                  <span className="menu-text">{label}</span>
                  {submenu && caret && React.isValidElement(caret)
                    ? caret
                    : null}
                </a>
              </Conditional>
            )}
            {!isHeader && submenu ? (
              <ExpandButton set={setNested} show={showNested} />
            ) : null}
          </>
        </Conditional>
        {megamenu && isHeader ? (
          <div className={cn(['megamenu'])} role="menu">
            <div className="container">{megamenu}</div>
          </div>
        ) : submenu ? (
          <>
            {isHeader || (!isHeader && showNested) ? (
              <ul
                className={cn(['submenu', `depth-${depth}`])}
                role="menu"
                aria-label="submenu">
                {submenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    data={item}
                    caret={caret}
                    pathname={pathname}
                    isHeader={isHeader}
                    depth={depth + 1}
                  />
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </li>
    )
  }
)

MenuItem.displayName = 'MenuItem'

interface ExpandButtonProps {
  show: boolean
  set: (show: boolean) => void
}

/**
 * The `ExpandButton` is used in collapsible menus to open or close the
 * next group of nested menu items.
 *
 * @internal
 * @todo add custom button support
 *
 */
export const ExpandButton = ({ show, set }: ExpandButtonProps) => {
  return (
    <button
      title="Expand Section"
      className={cn(['submenu-toggle', show ? 'expanded' : undefined])}
      aria-expanded={show ? 'true' : 'false'}
      aria-label="Expand Section"
      onClick={() => set(!show)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className={show ? 'rotate' : undefined}>
        <path
          stroke="currentcolor"
          strokeWidth="2"
          fill="none"
          d="M14 6 L8 12 L2 6"
        />
      </svg>
    </button>
  )
}

ExpandButton.displayName = 'ExpandButton'
