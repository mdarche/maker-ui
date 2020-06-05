import React, { useState } from 'react'

import { Box, Link } from './Box'
import { MenuProps } from '../props'
import { Dropdown } from './Dropdown'

interface Props {
  data: MenuProps
  caret: boolean
  menuControls?: any
  pathname: string
  isHeader: boolean
}

const defaultProps = {
  caret: false,
  isHeader: false,
}

const getAttributes = (isHeader, submenu, show, set) =>
  isHeader
    ? {
        onFocus: submenu && (e => set(true)),
        onBlur: submenu && (e => set(false)),
        'aria-expanded': submenu ? (show ? 'true' : 'false') : null,
      }
    : null

export const MenuItem = ({
  data: { label, path, newTab, submenu, classes = '', icon },
  caret,
  menuControls,
  pathname,
  isHeader,
}: Props) => {
  const [show, set] = useState(false)

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
              '&:hover': {
                '.sub-menu': {
                  variant: 'eui_submenu.active',
                },
              },
              '.menu-text:after':
                submenu && caret
                  ? {
                      content: '""',
                      display: 'inline-block',
                      width: 0,
                      height: 0,
                      ml: '.4em',
                      verticalAlign: '.25em',
                      borderTop: '.25em solid',
                      borderRight: '.25em solid transparent',
                      borderLeft: '.25em solid transparent',
                    }
                  : null,
            }
          : {}
      }>
      <Link
        href={path}
        className={pathname === path ? 'current' : undefined}
        target={newTab && '_blank'}
        rel={newTab && 'noopener noreferrer'}
        aria-label={icon ? label : null}
        aria-current={pathname === path ? 'page' : undefined}
        {...menuControls}
        {...getAttributes(isHeader, submenu, show, set)}>
        {icon && <span className="menu-icon">{icon}</span>}
        <span className="menu-text">{label}</span>
      </Link>
      {submenu ? (
        <Dropdown
          submenu={submenu}
          active={show}
          set={set}
          isHeader={isHeader}
          menuControls={menuControls}
          pathname={pathname}
        />
      ) : null}
    </Box>
  )
}

MenuItem.defaultProps = defaultProps
