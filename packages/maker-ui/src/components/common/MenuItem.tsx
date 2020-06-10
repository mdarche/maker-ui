import React, { useState } from 'react'

import { Box, Link } from './Box'
import { ExpandButton } from './ExpandButton'
import { MenuProps } from '../props'

interface Props {
  data: MenuProps
  caret?: boolean
  menuControls?: any
  pathname?: string
  isHeader?: boolean
  depth?: number
  parentControls?: object
}

const defaultProps = {
  caret: false,
  isHeader: false,
  depth: 0,
}

const getAttributes = (depth, parentControls, isHeader, submenu, controls) =>
  depth > 0 && isHeader
    ? {
        onFocus: e => parentControls.set(true),
        onBlur: e => parentControls.set(false),
        onClick: e => parentControls.set(false),
      }
    : depth === 0 && isHeader
    ? {
        onFocus: submenu && (e => controls.set(true)),
        onBlur: submenu && (e => controls.set(false)),
        'aria-expanded': submenu ? (controls.show ? 'true' : 'false') : null,
      }
    : null

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
  depth,
  parentControls,
}: Props) => {
  const [show, set] = useState(openNested)

  return (
    <Box
      as="li"
      className={`menu-item ${classes}`}
      onMouseEnter={submenu && isHeader ? e => set(true) : undefined}
      onMouseLeave={submenu && isHeader ? e => set(false) : undefined}
      sx={
        isHeader
          ? {
              position: 'relative',
              display: 'inline-flex',
              '&:hover, &:focus': {
                '> .sub-menu': {
                  variant: 'mui_submenu.active',
                },
              },
              '.menu-text:after': {
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
        {...getAttributes(depth, parentControls, isHeader, submenu, {
          show,
          set,
        })}>
        {icon && <span className="menu-icon">{icon}</span>}
        <span className="menu-text">{label}</span>
      </Link>
      {submenu && (
        <React.Fragment>
          {!isHeader && <ExpandButton set={set} show={show} />}
          {isHeader || (!isHeader && show) ? (
            <Box
              as="ul"
              variant={isHeader ? 'header.submenu' : 'accordion'}
              className={`sub-menu ${show ? 'active' : ''}`}
              sx={
                isHeader
                  ? {
                      variant: 'mui_submenu',
                      '&.active': {
                        variant: 'mui_submenu.active',
                      },
                    }
                  : {}
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
                  parentControls={{ show, set }}
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
