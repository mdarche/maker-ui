import * as React from 'react'
import { cn, Conditional } from '@maker-ui/utils'
import type { MenuItemProps } from '@maker-ui/layout-server'
import Link from 'next/link'

/**
 * `MenuItemProp` is the menu structure for all menu-compatible Maker UI components. Create a
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
 * const menu: MenuItemProps[] = [
 *  { label: 'Home', path: '/' },
 *  { label: 'About', path: '/about', submenu:
 *    [
 *      { label: 'Team', path: '/about/team' },
 *      { label: 'History', path: '/about/history' },
 *    ]
 *  },
 * ]
 */

export type ExpandButtonProps =
  | boolean
  | React.ReactElement
  | ((
      show: boolean,
      attrs: React.HTMLAttributes<HTMLButtonElement>
    ) => React.ReactElement)

interface MenuInternalProps {
  data: MenuItemProps
  caret?: boolean | React.ReactElement
  expandButton?: ExpandButtonProps
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
    expandButton,
    pathname,
    isHeader = false,
    depth = 0,
  }: MenuInternalProps) => {
    const [show, set] = React.useState(openNested)
    const isLocal = path && path?.startsWith('/')

    const linkAttrs = {
      className: cn([
        pathname === path ? 'current' : undefined,
        caret ? 'inline-flex' : undefined,
      ]),
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

    const title = `${show ? 'Collapse' : 'Expand'} Section`
    const buttonAttrs: React.HTMLAttributes<HTMLButtonElement> = submenu
      ? {
          title,
          className: cn([
            expandButton ? undefined : 'mkui-btn-expand',
            'submenu-toggle',
            show ? 'expanded' : undefined,
          ]),
          'aria-expanded': show ? 'true' : 'false',
          'aria-label': title,
          onClick: () => set(!show),
        }
      : {}

    const InnerLink = () => (
      <>
        {icon ? <span className="menu-icon">{icon}</span> : undefined}
        <span className="menu-text">{label}</span>
        {submenu && caret && React.isValidElement(caret) ? caret : null}
      </>
    )

    return (
      <li
        className={cn([
          'menu-item',
          megamenu || submenu ? 'has-submenu' : undefined,
          // submenu ? 'has-submenu' : undefined,
          (megamenu || submenu) && isHeader && !caret
            ? 'mkui-caret'
            : undefined,
          show ? 'expanded' : undefined,
          className,
        ])}
        {...liAttributes}>
        <Conditional
          condition={!isHeader && submenu ? true : false}
          trueWrapper={(children) => <div className="flex">{children}</div>}>
          <>
            {!isHeader && divider ? (
              label
            ) : !isHeader && isExpandButton && submenu ? (
              <button onClick={() => set(!show)}>{label}</button>
            ) : isLocal ? (
              <Link href={path} {...linkAttrs}>
                <InnerLink />
              </Link>
            ) : (
              <a href={path} {...linkAttrs}>
                <InnerLink />
              </a>
            )}
            {!isHeader && submenu ? (
              <>
                {expandButton && typeof expandButton === 'function' ? (
                  expandButton(show, buttonAttrs)
                ) : (
                  <button {...buttonAttrs}>
                    {React.isValidElement(expandButton) ? (
                      expandButton
                    ) : (
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
                    )}
                  </button>
                )}
              </>
            ) : null}
          </>
        </Conditional>
        {submenu || (isHeader && megamenu) ? (
          <>
            {megamenu ? (
              <div
                className={cn(['megamenu', 'submenu', `depth-${depth}`])}
                role="menu"
                aria-label="submenu">
                {megamenu}
              </div>
            ) : isHeader || (!isHeader && show) ? (
              <ul
                className={cn(['submenu', `depth-${depth}`])}
                role="menu"
                aria-label="submenu">
                {submenu &&
                  submenu.map((item, index) => (
                    <MenuItem
                      {...{
                        key: index,
                        data: item,
                        caret,
                        expandButton,
                        pathname,
                        isHeader,
                        depth: depth + 1,
                      }}
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
