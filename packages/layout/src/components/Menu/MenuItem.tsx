import React, { useState, memo, isValidElement } from 'react'

import { ExpandButton } from './ExpandButton'
import { MakerOptions } from '../../types'
import { mergeSelectors } from '../../utils/helper'

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
  caret?: MakerOptions['header']['dropdown']['caret']
  menuControls?: any
  pathname?: string
  isHeader?: boolean
  linkFunction?: MakerOptions['linkFunction']
  depth?: number
}

/**
 * Returns a menu item and nested children for `NavMenu` or `CollapsibleMenu`
 * components. This component uses recursion to create nested menus.
 *
 * @internal usage only
 *
 */

export const MenuItem = memo(
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
    },
    caret = false,
    menuControls,
    pathname,
    isHeader = false,
    linkFunction,
    depth = 0,
  }: MenuInternalProps) => {
    const [showNested, setNested] = useState(openNested)

    const attributes = {
      className: pathname === path ? 'current' : undefined,
      target: newTab ? '_blank' : undefined,
      rel: newTab ? 'noopener noreferrer' : undefined,
      'aria-label': icon ? label : undefined,
      'aria-haspopup': isHeader && submenu ? 'true' : undefined,
      'aria-current': pathname === path ? 'page' : undefined,
      ...menuControls,
    }

    return (
      <li
        className={mergeSelectors([
          'menu-item',
          submenu ? 'has-submenu' : undefined,
          submenu && isHeader && caret === 'default' ? 'caret' : undefined,
          className,
        ])}>
        <ConditionalWrapper
          condition={!isHeader && submenu ? true : false}
          wrapper={(children) => <div className="flex">{children}</div>}>
          <>
            {linkFunction && path ? (
              linkFunction(path, label, attributes, icon)
            ) : !isHeader && divider ? (
              label
            ) : !isHeader && isExpandButton && submenu ? (
              <button onClick={() => setNested(!showNested)}>{label}</button>
            ) : (
              <a href={path} {...attributes}>
                {icon ? <span className="menu-icon">{icon}</span> : undefined}
                <span className="menu-text">{label}</span>
                {submenu && caret && isValidElement(caret) ? caret : null}
              </a>
            )}
            {!isHeader && submenu ? (
              <ExpandButton set={setNested} show={showNested} />
            ) : null}
          </>
        </ConditionalWrapper>
        {submenu && (
          <>
            {isHeader || (!isHeader && showNested) ? (
              <ul
                className={mergeSelectors(['submenu', `depth-${depth}`])}
                role="menu"
                aria-label="submenu">
                {submenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    data={item}
                    caret={caret}
                    menuControls={menuControls}
                    pathname={pathname}
                    isHeader={isHeader}
                    depth={depth + 1}
                  />
                ))}
              </ul>
            ) : null}
          </>
        )}
      </li>
    )
  }
)

MenuItem.displayName = 'MenuItem'

interface ConditionalWrapperProps {
  condition: boolean
  wrapper: (children: React.ReactNode) => React.ReactElement
  children: React.ReactElement
}
const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps): React.ReactElement =>
  condition ? wrapper(children) : children
