/** @jsx jsx */
import { jsx } from '@maker-ui/css'
import { Link } from '@maker-ui/primitives'
import { Fragment, useState, memo, isValidElement } from 'react'

import { useOptions } from '../../context/OptionContext'
import { ExpandButton } from './ExpandButton'
import {
  caretStyles,
  dropdownStyles,
  getStyles,
} from '../../utils/styles-submenu'
import { MakerOptions } from '../../types'
import { mergeSelector } from '../../utils/helper'

export interface MenuProps {
  label: string
  path: string
  classes?: string
  icon?: React.ReactElement
  newTab?: boolean
  submenu?: MenuProps[]
  openNested?: boolean
}

interface MenuItemProps {
  data: MenuProps
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
      classes = '',
      icon,
    },
    caret = false,
    menuControls,
    pathname,
    isHeader = false,
    linkFunction,
    depth = 0,
  }: MenuItemProps) => {
    const { header } = useOptions()
    const [showNested, setNested] = useState(openNested)
    const submenuClass: string = `submenu depth-${depth}`

    const attributes = {
      className: pathname === path ? 'current' : undefined,
      target: newTab && '_blank',
      rel: newTab && 'noopener noreferrer',
      'aria-label': icon && label,
      'aria-haspopup': submenu && 'true',
      'aria-current': pathname === path && 'page',
      ...menuControls,
    }

    return (
      <li
        className={mergeSelector('menu-item', classes)}
        css={
          isHeader
            ? {
                position: 'relative',
                display: 'inline-flex',
                '&:focus-within > .submenu, &:hover > .submenu': {
                  ...dropdownStyles(header.dropdown.transition),
                },
                '> a .menu-text:after':
                  submenu && caret === 'default' && caretStyles,
              }
            : undefined
        }>
        <ConditionalWrapper
          condition={!isHeader && submenu ? true : false}
          wrapper={children => <div css={{ display: 'flex' }}>{children}</div>}>
          <Fragment>
            {linkFunction ? (
              linkFunction(path, label, attributes, icon)
            ) : (
              <Link href={path} {...attributes}>
                {icon ? <span className="menu-icon">{icon}</span> : undefined}
                <span className="menu-text">{label}</span>
                {submenu && caret && isValidElement(caret) ? caret : null}
              </Link>
            )}
            {!isHeader && submenu ? (
              <ExpandButton set={setNested} show={showNested} />
            ) : null}
          </Fragment>
        </ConditionalWrapper>
        {submenu && (
          <Fragment>
            {isHeader || (!isHeader && showNested) ? (
              <ul
                className={submenuClass}
                role="menu"
                aria-label="submenu"
                css={{
                  ...getStyles(isHeader, header.dropdown.transition, depth),
                }}>
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
          </Fragment>
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
