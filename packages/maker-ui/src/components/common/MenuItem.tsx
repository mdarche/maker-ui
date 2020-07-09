import React, { useState } from 'react'

import { Box, Link } from './Box'
import { ExpandButton } from './ExpandButton'
import { MenuProps } from '../types'

interface Props {
  data: MenuProps
  caret?: boolean
  menuControls?: any
  pathname?: string
  isHeader?: boolean
  depth?: number
  rootControls?: any
  menuInfo?: { index: number; length: number }
}

const defaultProps = {
  caret: false,
  isHeader: false,
  depth: 0,
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
  caret,
  menuControls,
  pathname,
  isHeader,
  rootControls,
  depth,
  menuInfo,
}: Props) => {
  // For nested accordion menus
  const [showNested, setNested] = useState(openNested)
  // For header navigation menus
  const [rootFocus, setRootFocus] = useState(
    rootControls ? rootControls.rootFocus : false
  )

  const submenuClass: string = `submenu depth-${depth}${
    rootFocus ? ' active' : ''
  }`

  /**
   * Uses current state, parent menu state, and sibling information to manage
   * focus and aria attributes
   *
   * @todo fix aria-expanded triggers for root and nested dropdowns
   *
   */
  const getAttributes = () =>
    depth > 0 && isHeader // Nested Header Menus
      ? {
          onFocus: e => {
            setRootFocus(true)
            rootControls.setRootFocus(true)
          },
          onBlur: e =>
            menuInfo.index === menuInfo.length - 1 &&
            rootControls.setRootFocus(false),
          onMouseLeave: e => setRootFocus(false),
          'aria-expanded': submenu ? (rootFocus ? 'true' : 'false') : null,
        }
      : depth === 0 && isHeader // Root Header Menu
      ? {
          onFocus: submenu && (e => setRootFocus(true)),
          onBlur: submenu && (e => setRootFocus(false)),
          onMouseEnter: submenu && (e => setRootFocus(true)),
          onMouseLeave: submenu && (e => setRootFocus(false)),
          'aria-expanded': submenu ? (rootFocus ? 'true' : 'false') : null,
        }
      : null

  return (
    <Box
      as="li"
      className={`menu-item${classes && ' ' + classes}`}
      sx={
        isHeader
          ? {
              position: 'relative',
              display: 'inline-flex',
              '&:hover, &:focus': {
                '> .submenu': {
                  variant: 'mui_submenu.active',
                },
              },
              '> a .menu-text:after': {
                variant: submenu && caret && 'mui_caret',
              },
            }
          : {}
      }>
      <Link
        href={path}
        className={pathname === path ? 'current' : undefined}
        target={newTab && '_blank'}
        rel={newTab && 'noopener noreferrer'}
        aria-label={icon ? label : undefined}
        aria-current={pathname === path ? 'page' : undefined}
        {...menuControls}
        {...getAttributes()}>
        {icon && <span className="menu-icon">{icon}</span>}
        <span className="menu-text">{label}</span>
      </Link>
      {submenu && (
        <React.Fragment>
          {!isHeader && <ExpandButton set={setNested} show={showNested} />}
          {isHeader || (!isHeader && showNested) ? (
            <Box
              as="ul"
              variant={isHeader ? 'header.submenu' : 'accordion'}
              className={submenuClass}
              sx={
                isHeader && {
                  variant: 'mui_submenu',
                  '&.active': {
                    variant: 'mui_submenu.active',
                  },
                }
              }>
              {submenu.map((item, index) => (
                <MenuItem
                  key={index}
                  data={item}
                  caret={caret}
                  menuControls={menuControls}
                  pathname={pathname}
                  isHeader={isHeader}
                  depth={depth + 1}
                  rootControls={
                    depth === 0 ? { rootFocus, setRootFocus } : rootControls
                  }
                  menuInfo={{
                    index,
                    length: submenu.length,
                  }}
                />
              ))}
            </Box>
          ) : null}
        </React.Fragment>
      )}
    </Box>
  )
}

MenuItem.defaultProps = defaultProps
