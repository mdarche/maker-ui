/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState } from 'react'

import { Link } from './Primitives'
import { useOptions } from '../../context/OptionContext'
import { ExpandButton } from './ExpandButton'
import {
  caretStyles,
  dropdownStyles,
  getStyles,
} from '../../utils/styles-submenu'
import { MenuProps, MakerOptions } from '../types'

interface MenuItemProps {
  data: MenuProps
  caret?: boolean
  menuControls?: any
  pathname?: string
  isHeader?: boolean
  linkFunction?: MakerOptions['linkFunction']
  depth?: number
}

/**
 * Returns a menu item and nested children for `NavMenu` or `AccordionMenu`
 * components.
 *
 * @remark This component uses recursion to build nested menus
 *
 */

export const MenuItem = ({
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
      className={`menu-item${classes && ' ' + classes}`}
      //@ts-ignore
      sx={
        isHeader && {
          position: 'relative',
          display: 'inline-flex',
          '&:focus-within > .submenu, &:hover > .submenu': {
            ...dropdownStyles(header.dropdown.transition),
          },
          '> a .menu-text:after': submenu && caret && caretStyles,
        }
      }>
      {linkFunction ? (
        linkFunction(path, label, attributes, icon)
      ) : (
        <Link href={path} {...attributes}>
          {icon && <span className="menu-icon">{icon}</span>}
          <span className="menu-text">{label}</span>
        </Link>
      )}
      {submenu && (
        <Fragment>
          {!isHeader && <ExpandButton set={setNested} show={showNested} />}
          {isHeader || (!isHeader && showNested) ? (
            <ul
              className={submenuClass}
              role="menu"
              aria-label="submenu"
              sx={{
                ...getStyles(isHeader, header.dropdown.transition, depth),
                variant: isHeader ? 'header.submenu' : 'accordion',
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
